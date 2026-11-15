import { SUPABASE_BUCKET, supabase, supabaseConfigError } from './supabase'

const DATA_URL_PATTERN = /^data:[^,]+,/i

function randomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function extensionFor(type) {
  if (type === 'image/webp') return 'webp'
  if (type === 'image/png') return 'png'
  return 'jpg'
}

function storagePathFromPublicUrl(url) {
  if (typeof url !== 'string') return null
  const marker = `/storage/v1/object/public/${SUPABASE_BUCKET}/`
  const index = url.indexOf(marker)
  if (index === -1) return null
  return decodeURIComponent(url.slice(index + marker.length).split('?')[0])
}

export async function deletePublicationImagePaths(paths) {
  if (!supabase || !Array.isArray(paths) || paths.length === 0) return

  try {
    await supabase.storage.from(SUPABASE_BUCKET).remove(paths)
  } catch {
    return
  }
}

export async function deletePublicationImages(images) {
  if (!Array.isArray(images) || images.length === 0) return
  const paths = images.map(storagePathFromPublicUrl).filter(Boolean)
  if (paths.length === 0) return
  await deletePublicationImagePaths(paths)
}

export async function uploadPublicationImages(images) {
  if (!supabase) throw new Error(supabaseConfigError)
  if (!Array.isArray(images) || images.length === 0) return { urls: [], paths: [] }

  const paths = []
  const urls = []

  try {
    for (const image of images) {
      if (typeof image !== 'string' || !DATA_URL_PATTERN.test(image)) {
        urls.push(image)
        continue
      }

      const response = await fetch(image)
      if (!response.ok) throw new Error('No pudimos preparar una de las imágenes.')

      const blob = await response.blob()
      const extension = extensionFor(blob.type)
      const path = `${new Date().toISOString().slice(0, 10)}/${randomId()}.${extension}`

      const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(path, blob, {
        contentType: blob.type || 'image/jpeg',
        cacheControl: '31536000',
        upsert: false,
      })

      if (error) throw error

      paths.push(path)
      const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path)
      urls.push(data.publicUrl)
    }

    return { urls, paths }
  } catch (error) {
    await deletePublicationImagePaths(paths)
    throw error
  }
}
