import { useCallback, useEffect, useState } from 'react'
import { supabase, supabaseConfigError } from '../lib/supabase'

function getLoginError(error) {
  const message = String(error?.message ?? '')

  if (/invalid login credentials/i.test(message)) {
    return 'El correo o la contraseña no son correctos.'
  }
  if (/email not confirmed/i.test(message)) {
    return 'Debes confirmar tu correo antes de ingresar.'
  }
  if (/too many requests|rate limit/i.test(message)) {
    return 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.'
  }
  if (/network|fetch/i.test(message)) {
    return 'No pudimos conectar con el servidor. Revisa tu conexión.'
  }
  return 'No pudimos iniciar sesión. Inténtalo de nuevo.'
}

async function hasAdminAccess(userId) {
  if (!supabase || !userId) return false

  const { data, error } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  return Boolean(data)
}

export default function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return undefined
    }

    let active = true

    const syncSession = async (session) => {
      try {
        const admin = await hasAdminAccess(session?.user?.id)
        if (active) setIsAdmin(admin)
      } catch {
        if (active) setIsAdmin(false)
      } finally {
        if (active) setLoading(false)
      }
    }

    supabase.auth
      .getSession()
      .then(({ data }) => syncSession(data.session))
      .catch(() => {
        if (!active) return
        setIsAdmin(false)
        setLoading(false)
      })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => syncSession(session), 0)
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  const login = useCallback(async (email, password) => {
    if (!supabase) {
      return { ok: false, error: supabaseConfigError || 'Supabase no está configurado.' }
    }

    if (!email.trim() || !password) {
      return { ok: false, error: 'Ingresa tu correo y tu contraseña.' }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      if (error) return { ok: false, error: getLoginError(error) }

      let admin = false
      try {
        admin = await hasAdminAccess(data.user?.id)
      } catch {
        await supabase.auth.signOut()
        return {
          ok: false,
          error: 'No pudimos verificar los permisos. Revisa la configuración de Supabase.',
        }
      }

      if (!admin) {
        await supabase.auth.signOut()
        return { ok: false, error: 'Esta cuenta no tiene permisos de administrador.' }
      }

      setIsAdmin(true)
      setLoading(false)
      return { ok: true }
    } catch {
      return {
        ok: false,
        error: 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
      }
    }
  }, [])

  const logout = useCallback(async () => {
    setIsAdmin(false)
    if (!supabase) return
    await supabase.auth.signOut().catch(() => null)
  }, [])

  return { isAdmin, loading, configError: supabaseConfigError, login, logout }
}
