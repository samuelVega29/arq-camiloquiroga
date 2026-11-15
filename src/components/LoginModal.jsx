import { useEffect, useRef, useState } from 'react'
import { Eye, EyeOff, LoaderCircle, LockKeyhole, X } from 'lucide-react'

const inputClass =
  'w-full border border-[color:var(--color-line)] bg-black px-4 py-3 text-sm text-[color:var(--color-fg)] placeholder:text-[color:var(--color-fg-muted)] transition-colors focus:border-white focus:outline-none'

export default function LoginModal({ open, onClose, onLogin, configError }) {
  const dialogRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }

    if (!open && dialog.open) {
      dialog.close()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setPassword('')
      setError('')
      setSubmitting(false)
      setShowPassword(false)
    }
  }, [open])

  const handleBackdrop = (event) => {
    if (event.target === dialogRef.current) onClose()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitting) return

    setError('')
    setSubmitting(true)

    try {
      const result = await onLogin(email, password)
      if (!result.ok) {
        setError(result.error)
        setSubmitting(false)
        return
      }
      setEmail('')
      setPassword('')
      onClose()
    } catch {
      setError('No pudimos iniciar sesión. Inténtalo de nuevo.')
      setSubmitting(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdrop}
      aria-labelledby="login-title"
      className="m-auto w-[min(28rem,92vw)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-0 text-[color:var(--color-fg)] shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-[color:var(--color-line)] px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center border border-white/25">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">
              Acceso privado
            </p>
            <h2 id="login-title" className="font-display text-xl leading-tight tracking-[-0.02em]">
              Administrador
            </h2>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center border border-[color:var(--color-line)] text-[color:var(--color-fg-soft)] transition-colors hover:border-white hover:text-white"
          aria-label="Cerrar inicio de sesión"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6">
        <p className="text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
          Ingresa con tu cuenta de administrador para gestionar las publicaciones del portafolio.
        </p>

        {configError ? (
          <p
            role="alert"
            className="mt-5 border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
          >
            {configError}
          </p>
        ) : null}

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]"
            >
              Correo
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              autoFocus
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@ejemplo.com"
              className={`mt-2 ${inputClass}`}
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]"
            >
              Contraseña
            </label>
            <div className="relative mt-2">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Tu contraseña"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-[color:var(--color-fg-muted)] transition-colors hover:text-white"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-5 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              Ingresando
            </>
          ) : (
            'Ingresar'
          )}
        </button>

        <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.16em] text-[color:var(--color-fg-muted)]">
          Solo el administrador puede crear, editar o eliminar publicaciones.
        </p>
      </form>
    </dialog>
  )
}
