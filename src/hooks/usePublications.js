import { useCallback, useEffect, useRef, useState } from 'react'
import {
  deletePublicationImagePaths,
  deletePublicationImages,
  uploadPublicationImages,
} from '../lib/storage'
import { supabase, supabaseConfigError } from '../lib/supabase'

const TABLE = 'publications'
const LOAD_ERROR =
  'No pudimos cargar las publicaciones. Revisa la conexión e inténtalo de nuevo.'

function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description ?? '',
    location: row.location ?? '',
    client: row.client ?? '',
    year: row.year ?? '',
    value: row.value ?? '',
    images: Array.isArray(row.images) ? row.images : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function toRow(data) {
  return {
    title: data.title,
    category: data.category,
    description: data.description,
    location: data.location,
    client: data.client,
    year: data.year,
    value: data.value,
    images: data.images,
  }
}

async function fetchPublications() {
  if (!supabase) throw new Error(supabaseConfigError)

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapRow)
}

export default function usePublications() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(Boolean(supabase))
  const [error, setError] = useState(supabaseConfigError)
  const publicationsRef = useRef([])

  const refresh = useCallback(async () => {
    if (!supabase) {
      setLoading(false)
      setError(supabaseConfigError)
      return []
    }

    setLoading(true)
    setError('')

    try {
      const items = await fetchPublications()
      publicationsRef.current = items
      setPublications(items)
      return items
    } catch {
      setError(LOAD_ERROR)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const create = useCallback(async (data) => {
    if (!supabase) throw new Error(supabaseConfigError)

    const { urls, paths } = await uploadPublicationImages(data.images)
    const { data: row, error: insertError } = await supabase
      .from(TABLE)
      .insert(toRow({ ...data, images: urls }))
      .select()
      .single()

    if (insertError) {
      await deletePublicationImagePaths(paths)
      throw insertError
    }

    const item = mapRow(row)
    const items = [item, ...publicationsRef.current]
    publicationsRef.current = items
    setPublications(items)
    setError('')
    return item
  }, [])

  const update = useCallback(async (id, data) => {
    if (!supabase) throw new Error(supabaseConfigError)

    const previous = publicationsRef.current.find((item) => item.id === id)
    const { urls, paths } = await uploadPublicationImages(data.images)
    const { data: row, error: updateError } = await supabase
      .from(TABLE)
      .update(toRow({ ...data, images: urls }))
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      await deletePublicationImagePaths(paths)
      throw updateError
    }

    const item = mapRow(row)
    const items = publicationsRef.current.map((current) => (current.id === id ? item : current))
    publicationsRef.current = items
    setPublications(items)
    setError('')

    if (previous) {
      const removed = previous.images.filter((image) => !urls.includes(image))
      await deletePublicationImages(removed).catch(() => null)
    }

    return item
  }, [])

  const remove = useCallback(async (id) => {
    if (!supabase) throw new Error(supabaseConfigError)

    const previous = publicationsRef.current.find((item) => item.id === id)
    const { error: deleteError } = await supabase.from(TABLE).delete().eq('id', id)
    if (deleteError) throw deleteError

    const items = publicationsRef.current.filter((item) => item.id !== id)
    publicationsRef.current = items
    setPublications(items)
    setError('')

    if (previous) {
      await deletePublicationImages(previous.images).catch(() => null)
    }
  }, [])

  return { publications, loading, error, refresh, create, update, remove }
}
