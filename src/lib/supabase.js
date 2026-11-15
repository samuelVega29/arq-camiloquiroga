import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

export const SUPABASE_BUCKET = 'publication-images'

export let supabaseConfigError = ''

if (!supabaseUrl || !supabaseAnonKey) {
  supabaseConfigError =
    'Supabase no está configurado. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY al archivo .env.'
} else {
  try {
    new URL(supabaseUrl)
  } catch {
    supabaseConfigError = 'VITE_SUPABASE_URL no es una URL válida.'
  }
}

let client = null

if (!supabaseConfigError) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  } catch {
    supabaseConfigError = 'No pudimos inicializar Supabase. Revisa las variables de entorno.'
  }
}

export const supabase = client
