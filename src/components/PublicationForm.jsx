import { useRef, useState } from 'react'
import {
  ArrowLeft,
  ImagePlus,
  LoaderCircle,
  MapPin,
  Star,
  Trash2,
  UploadCloud,
} from 'lucide-react'
import { MAX_IMAGES, prepareImage, resolveImageUrl } from '../lib/images'

const inputClass =
  'w-full border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-4 py-3 text-sm text-[color:var(--color-fg)] placeholder:text-[color:var(--color-fg-muted)] transition-colors focus:border-white focus:outline-none'
const labelClass =
  'font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]'

export default function PublicationForm({ publication, categories, onSave, onCancel }) {
  const fileInputRef = useRef(null)
  const [values, setValues] = useState(() => ({
    title: publication?.title ?? '',
    category: publication?.category ?? categories[0] ?? 'Obras dirigidas',
    location: publication?.location ?? '',
    description: publication?.description ?? '',
    client: publication?.client ?? '',
    year: publication?.year ?? '',
    value: publication?.value ?? '',
    images: publication?.images ?? [],
  }))
  const [errors, setErrors] = useState({})
  const [imageError, setImageError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [dragging, setDragging] = useState(false)

  const updateField = (field) => (event) => {
    const { value } = event.target
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleFiles = async (fileList) => {
    if (uploading) return

    const files = Array.from(fileList ?? [])
    if (!files.length) return

    const available = MAX_IMAGES - values.images.length
    if (available <= 0) {
      setImageError(`Puedes agregar hasta ${MAX_IMAGES} fotos por publicación.`)
      return
    }

    const selected = files.slice(0, available)
    setImageError(
      files.length > available
        ? `Solo se agregarán ${available} de ${files.length} imágenes (máximo ${MAX_IMAGES}).`
        : '',
    )
    setUploading(true)

    try {
      const prepared = []
      for (const file of selected) {
        prepared.push(await prepareImage(file))
      }
      setValues((current) => ({ ...current, images: [...current.images, ...prepared] }))
      setErrors((current) => ({ ...current, images: undefined }))
    } catch (error) {
      setImageError(error?.message || 'No pudimos procesar las imágenes.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const removeImage = (index) => {
    setValues((current) => ({
      ...current,
      images: current.images.filter((_, imageIndex) => imageIndex !== index),
    }))
    setImageError('')
  }

  const makeCover = (index) => {
    setValues((current) => {
      const images = [...current.images]
      const [cover] = images.splice(index, 1)
      images.unshift(cover)
      return { ...current, images }
    })
  }

  const validate = () => {
    const nextErrors = {}
    if (!values.title.trim()) nextErrors.title = 'Escribe el nombre del servicio.'
    if (!values.category) nextErrors.category = 'Selecciona una categoría.'
    if (!values.location.trim()) nextErrors.location = 'Indica la ubicación del servicio.'
    if (!values.description.trim()) nextErrors.description = 'Agrega una descripción.'
    if (values.description.trim().length > 2500) {
      nextErrors.description = 'La descripción no puede superar los 2500 caracteres.'
    }
    if (!values.images.length) nextErrors.images = 'Sube al menos una foto.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (saving || uploading) return

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSaving(true)
    setSaveError('')

    try {
      await onSave({
        title: values.title.trim(),
        category: values.category,
        location: values.location.trim(),
        description: values.description.trim(),
        client: values.client.trim(),
        year: values.year.trim(),
        value: values.value.trim(),
        images: values.images,
      })
    } catch {
      setSaveError('No pudimos guardar la publicación. Revisa tu conexión e inténtalo de nuevo.')
      setSaving(false)
    }
  }

  const cover = resolveImageUrl(values.images[0])

  return (
    <section className="min-h-screen pb-24 pt-28 sm:pt-32">
      <div className="section-shell">
        <button
          type="button"
          onClick={onCancel}
          className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)] transition-colors hover:text-white"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Volver al portafolio
        </button>

        <div className="mt-8 flex flex-col justify-between gap-6 border-b border-[color:var(--color-line)] pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
              <span className="h-px w-8 bg-white" aria-hidden="true" />
              Admin / Publicaciones
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[0.94] tracking-[-0.05em]">
              {publication ? 'Editar' : 'Nueva'}{' '}
              <span className="italic text-[color:var(--color-fg-soft)]">publicación</span>
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
            {publication
              ? 'Actualiza los datos y las fotos del servicio. Los cambios se verán de inmediato en el mosaico.'
              : 'Agrega fotos, un nombre, una descripción y una ubicación. La publicación aparecerá en el mosaico de servicios.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <div>
              <label htmlFor="publication-title" className={labelClass}>
                Nombre del servicio
              </label>
              <input
                id="publication-title"
                type="text"
                value={values.title}
                onChange={updateField('title')}
                maxLength={90}
                placeholder="Ej. Construcción de vivienda campestre"
                className={`mt-2 ${inputClass}`}
              />
              {errors.title ? <p className="mt-2 text-xs text-red-300">{errors.title}</p> : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="publication-category" className={labelClass}>
                  Categoría
                </label>
                <select
                  id="publication-category"
                  value={values.category}
                  onChange={updateField('category')}
                  className={`mt-2 ${inputClass}`}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category ? (
                  <p className="mt-2 text-xs text-red-300">{errors.category}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="publication-location" className={labelClass}>
                  Ubicación
                </label>
                <input
                  id="publication-location"
                  type="text"
                  value={values.location}
                  onChange={updateField('location')}
                  maxLength={90}
                  placeholder="Ej. Boyacá, Colombia"
                  className={`mt-2 ${inputClass}`}
                />
                {errors.location ? (
                  <p className="mt-2 text-xs text-red-300">{errors.location}</p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="publication-client" className={labelClass}>
                  Cliente
                </label>
                <input
                  id="publication-client"
                  type="text"
                  value={values.client}
                  onChange={updateField('client')}
                  maxLength={90}
                  placeholder="Opcional"
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <div>
                <label htmlFor="publication-year" className={labelClass}>
                  Año
                </label>
                <input
                  id="publication-year"
                  type="text"
                  value={values.year}
                  onChange={updateField('year')}
                  maxLength={40}
                  placeholder="Ej. 2026"
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <div>
                <label htmlFor="publication-value" className={labelClass}>
                  Valor
                </label>
                <input
                  id="publication-value"
                  type="text"
                  value={values.value}
                  onChange={updateField('value')}
                  maxLength={60}
                  placeholder="Opcional"
                  className={`mt-2 ${inputClass}`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="publication-description" className={labelClass}>
                  Descripción
                </label>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[color:var(--color-fg-muted)]">
                  {values.description.length} / 2500
                </span>
              </div>
              <textarea
                id="publication-description"
                value={values.description}
                onChange={updateField('description')}
                rows={7}
                maxLength={2500}
                placeholder="Describe el servicio, el proceso y el resultado..."
                className={`mt-2 resize-y ${inputClass}`}
              />
              {errors.description ? (
                <p className="mt-2 text-xs text-red-300">{errors.description}</p>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[4/5] overflow-hidden border border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
                {cover ? (
                  <img
                    src={cover}
                    alt="Portada de la publicación"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[color:var(--color-fg-muted)]">
                    <ImagePlus className="h-8 w-8" strokeWidth={1.2} aria-hidden="true" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
                      Vista previa
                    </span>
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white/65">
                    <span>{values.category}</span>
                    {values.location ? (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {values.location}
                      </span>
                    ) : null}
                  </p>
                  <h2 className="mt-2 line-clamp-3 font-display text-3xl leading-tight tracking-[-0.02em] text-white">
                    {values.title || 'Nombre de tu servicio'}
                  </h2>
                </div>
              </div>

              <div
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault()
                  setDragging(false)
                  handleFiles(event.dataTransfer.files)
                }}
                className={`mt-4 border border-dashed px-5 py-7 text-center transition-colors ${
                  dragging
                    ? 'border-white bg-white/5'
                    : 'border-[color:var(--color-line)] hover:border-white/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  id="publication-images"
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  onChange={(event) => handleFiles(event.target.files)}
                  className="sr-only"
                />
                <label
                  htmlFor="publication-images"
                  className={`flex cursor-pointer flex-col items-center gap-3 ${
                    uploading ? 'pointer-events-none opacity-60' : ''
                  }`}
                >
                  {uploading ? (
                    <LoaderCircle className="h-7 w-7 animate-spin text-white" aria-hidden="true" />
                  ) : (
                    <UploadCloud className="h-7 w-7 text-[color:var(--color-fg-soft)]" aria-hidden="true" />
                  )}
                  <span className="text-sm text-[color:var(--color-fg)]">
                    {uploading ? 'Optimizando imágenes...' : 'Sube o arrastra tus fotos'}
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                    Hasta {MAX_IMAGES} imágenes · JPG, PNG o WebP
                  </span>
                </label>
              </div>

              {imageError ? (
                <p role="alert" className="mt-3 text-xs leading-relaxed text-red-300">
                  {imageError}
                </p>
              ) : null}
              {errors.images ? <p className="mt-3 text-xs text-red-300">{errors.images}</p> : null}

              {values.images.length > 0 ? (
                <div className="mt-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className={labelClass}>Fotos</p>
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[color:var(--color-fg-muted)]">
                      {values.images.length} / {MAX_IMAGES}
                    </span>
                  </div>
                  <ul className="mt-3 grid grid-cols-3 gap-2">
                    {values.images.map((image, index) => (
                      <li
                        key={`${image.slice(0, 32)}-${index}`}
                        className="group relative overflow-hidden border border-[color:var(--color-line)]"
                      >
                        <img
                          src={resolveImageUrl(image)}
                          alt={`Foto ${index + 1}`}
                          className="aspect-square h-full w-full object-cover"
                        />
                        {index === 0 ? (
                          <span className="absolute left-1.5 top-1.5 bg-white px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.14em] text-black">
                            Portada
                          </span>
                        ) : null}
                        <div className="absolute inset-x-1.5 bottom-1.5 flex items-center justify-between gap-1">
                          {index !== 0 ? (
                            <button
                              type="button"
                              onClick={() => makeCover(index)}
                              className="inline-flex h-7 w-7 items-center justify-center border border-white/40 bg-black/70 text-white/80 backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                              aria-label={`Usar foto ${index + 1} como portada`}
                            >
                              <Star className="h-3 w-3" aria-hidden="true" />
                            </button>
                          ) : (
                            <span />
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="inline-flex h-7 w-7 items-center justify-center border border-white/40 bg-black/70 text-white/80 backdrop-blur-sm transition-colors hover:border-red-300 hover:bg-red-400/30 hover:text-red-100"
                            aria-label={`Eliminar foto ${index + 1}`}
                          >
                            <Trash2 className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[color:var(--color-fg-muted)]">
                    La primera foto será la portada del mosaico.
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-12">
            {saveError ? (
              <p role="alert" className="mb-4 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {saveError}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-[color:var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="inline-flex items-center justify-center border border-[color:var(--color-line)] px-6 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-fg-soft)] transition-colors hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving || uploading}
                className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Guardando
                  </>
                ) : publication ? (
                  'Guardar cambios'
                ) : (
                  'Publicar servicio'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
