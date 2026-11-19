import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import ServiceDetail from './components/ServiceDetail'
import Approach from './components/Approach'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import LoginModal from './components/LoginModal'
import PublicationForm from './components/PublicationForm'
import useAdmin from './hooks/useAdmin'
import usePublications from './hooks/usePublications'
import { publicationCategories } from './data/services'

const HOME_TITLE = 'Camilo Quiroga — Portafolio de Arquitectura'
const CREATE_HASH = '#/admin/nueva'
const EDIT_PREFIX = '#/admin/editar/'
const SERVICE_PREFIX = '#/servicio/'

function readRoute() {
  try {
    const hash = window.location.hash
    if (hash === CREATE_HASH) return { name: 'form', id: null }
    if (hash.startsWith(EDIT_PREFIX)) {
      const id = decodeURIComponent(hash.slice(EDIT_PREFIX.length))
      if (id) return { name: 'form', id }
    }
    if (hash.startsWith(SERVICE_PREFIX)) {
      const id = decodeURIComponent(hash.slice(SERVICE_PREFIX.length))
      if (id) return { name: 'service', id }
    }
  } catch {
    return { name: 'home' }
  }
  return { name: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const [loginOpen, setLoginOpen] = useState(false)
  const [pendingNewPublication, setPendingNewPublication] = useState(false)

  const { isAdmin, loading: adminLoading, configError, login, logout } = useAdmin()
  const {
    publications,
    loading,
    error,
    refresh,
    create,
    update,
    remove,
  } = usePublications()

  const activePublication =
    route.name === 'service'
      ? publications.find((publication) => publication.id === route.id) ?? null
      : null

  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (route.name === 'form') {
      document.title = route.id
        ? 'Editar publicación — Camilo Quiroga'
        : 'Nueva publicación — Camilo Quiroga'
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    if (route.name === 'service') {
      document.title = activePublication
        ? `${activePublication.title} — Camilo Quiroga`
        : HOME_TITLE
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    document.title = HOME_TITLE

    const id = window.location.hash.replace(/^#/, '')
    if (!id || id.startsWith('/')) return
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [route, activePublication])

  useEffect(() => {
    if (route.name === 'form' && !adminLoading && !isAdmin) {
      window.location.hash = '#inicio'
    }
  }, [route.name, isAdmin, adminLoading])

  const openNewPublication = useCallback(() => {
    if (!isAdmin) {
      setPendingNewPublication(true)
      setLoginOpen(true)
      return
    }
    window.location.hash = CREATE_HASH
  }, [isAdmin])

  const openLogin = useCallback(() => {
    setPendingNewPublication(false)
    setLoginOpen(true)
  }, [])

  const closeLogin = useCallback(() => {
    setLoginOpen(false)
    setPendingNewPublication(false)
  }, [])

  const handleLogin = useCallback(
    async (email, password) => {
      const result = await login(email, password)
      if (result.ok && pendingNewPublication) {
        setPendingNewPublication(false)
        window.location.hash = CREATE_HASH
      }
      return result
    },
    [login, pendingNewPublication],
  )

  const handleLogout = useCallback(() => {
    logout()
    setLoginOpen(false)
    if (route.name === 'form') window.location.hash = '#inicio'
  }, [logout, route.name])

  const editPublication = useCallback((id) => {
    window.location.hash = `${EDIT_PREFIX}${encodeURIComponent(id)}`
  }, [])

  const handleSavePublication = async (data) => {
    if (route.name !== 'form') return
    if (route.id) {
      await update(route.id, data)
    } else {
      await create(data)
    }
    window.location.hash = '#servicios'
  }

  const cancelForm = () => {
    window.location.hash = '#servicios'
  }

  const editingPublication =
    route.name === 'form' && route.id
      ? publications.find((publication) => publication.id === route.id)
      : null
  const formLoading = route.name === 'form' && Boolean(route.id) && loading
  const formError =
    route.name === 'form' && Boolean(route.id) && !loading && Boolean(error) && !editingPublication
  const formMissing =
    route.name === 'form' &&
    Boolean(route.id) &&
    !loading &&
    !error &&
    !editingPublication

  return (
    <>
      {route.name !== 'form' ? (
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-black"
        >
          Saltar al contenido
        </a>
      ) : null}

      <Navbar
        isAdmin={isAdmin}
        authLoading={adminLoading}
        onLogin={openLogin}
        onLogout={handleLogout}
        onNewPublication={openNewPublication}
      />

      {route.name === 'form' ? (
        <main className="min-h-screen pt-20">
          {adminLoading ? (
            <div className="section-shell py-32">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
                Verificando sesión...
              </p>
            </div>
          ) : !isAdmin ? (
            <div className="section-shell py-32">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
                Redirigiendo al inicio...
              </p>
            </div>
          ) : formLoading ? (
            <div className="section-shell py-32">
              <div className="h-8 w-48 animate-pulse bg-white/10" />
              <div className="mt-6 h-16 w-full max-w-2xl animate-pulse bg-white/5" />
              <div className="mt-10 grid gap-8 lg:grid-cols-12">
                <div className="h-96 animate-pulse border border-[color:var(--color-line)] lg:col-span-7" />
                <div className="h-96 animate-pulse border border-[color:var(--color-line)] lg:col-span-5" />
              </div>
            </div>
          ) : formError ? (
            <div className="section-shell py-32">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
                Error de conexión
              </p>
              <h1 className="mt-5 font-display text-4xl tracking-[-0.03em]">
                No pudimos cargar la publicación.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
                {error}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={refresh}
                  disabled={loading}
                  className="inline-flex bg-white px-6 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Reintentar
                </button>
                <a
                  href="#servicios"
                  className="inline-flex border border-white/40 px-6 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
                >
                  Volver a servicios
                </a>
              </div>
            </div>
          ) : formMissing ? (
            <div className="section-shell py-32">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
                Publicación no encontrada
              </p>
              <h1 className="mt-5 font-display text-4xl tracking-[-0.03em]">
                Esta publicación ya no existe.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
                Puede que haya sido eliminada o que el enlace esté incompleto.
              </p>
              <a
                href="#servicios"
                className="mt-8 inline-flex bg-white px-6 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)]"
              >
                Volver a servicios
              </a>
            </div>
          ) : (
            <PublicationForm
              key={editingPublication?.id ?? 'new'}
              publication={editingPublication}
              categories={publicationCategories}
              onSave={handleSavePublication}
              onCancel={cancelForm}
            />
          )}
        </main>
      ) : route.name === 'service' ? (
        loading ? (
          <main className="min-h-screen pt-20">
            <div className="section-shell py-32">
              <div className="h-8 w-48 animate-pulse bg-white/10" />
              <div className="mt-6 h-16 w-full max-w-2xl animate-pulse bg-white/5" />
              <div className="mt-10 grid gap-8 lg:grid-cols-12">
                <div className="h-96 animate-pulse border border-[color:var(--color-line)] lg:col-span-7" />
                <div className="h-96 animate-pulse border border-[color:var(--color-line)] lg:col-span-5" />
              </div>
            </div>
          </main>
        ) : activePublication ? (
          <ServiceDetail
            key={activePublication.id}
            service={activePublication}
            items={publications}
          />
        ) : (
          <main className="min-h-screen pt-20">
            <div className="section-shell py-32">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
                {error ? 'Error de conexión' : 'Servicio no encontrado'}
              </p>
              <h1 className="mt-5 font-display text-4xl tracking-[-0.03em]">
                {error ? 'No pudimos cargar esta ficha.' : 'Esta ficha ya no existe.'}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
                {error || 'Puede que haya sido eliminada o que el enlace esté incompleto.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {error ? (
                  <button
                    type="button"
                    onClick={refresh}
                    disabled={loading}
                    className="inline-flex bg-white px-6 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Reintentar
                  </button>
                ) : null}
                <a
                  href="#servicios"
                  className="inline-flex border border-white/40 px-6 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
                >
                  Volver a servicios
                </a>
              </div>
            </div>
          </main>
        )
      ) : (
        <main>
          <Hero />
          <Services
            publications={publications}
            loading={loading}
            error={error}
            isAdmin={isAdmin}
            onNewPublication={openNewPublication}
            onEditPublication={editPublication}
            onDeletePublication={remove}
            onRetry={refresh}
          />
          <Approach />
          <About />
          <Contact />
        </main>
      )}

      <Footer />
      <WhatsAppButton hidden={route.name === 'form'} />
      <LoginModal
        open={loginOpen}
        onClose={closeLogin}
        onLogin={handleLogin}
        configError={configError}
      />
    </>
  )
}
