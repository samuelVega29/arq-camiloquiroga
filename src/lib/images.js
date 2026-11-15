export const MAX_IMAGES = 6

const MAX_EDGE = 1600
const MAX_FILE_SIZE = 20 * 1024 * 1024

export function resolveImageUrl(source) {
  if (!source) return ''
  if (/^(data:|blob:|https?:\/\/)/i.test(source)) return source

  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${source.replace(/^\/+/, '')}`
}

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('No pudimos leer una de las imágenes.'))
    image.src = source
  })
}

function renderImage(image, maxEdge) {
  const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight))
  const width = Math.max(1, Math.round(image.naturalWidth * scale))
  const height = Math.max(1, Math.round(image.naturalHeight * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) throw new Error('No se pudo procesar la imagen.')

  context.fillStyle = '#000000'
  context.fillRect(0, 0, width, height)
  context.drawImage(image, 0, 0, width, height)
  return canvas
}

function toDataUrl(canvas, quality) {
  const webp = canvas.toDataURL('image/webp', quality)
  if (webp.startsWith('data:image/webp')) return webp
  return canvas.toDataURL('image/jpeg', quality)
}

export async function prepareImage(file) {
  if (!file.type.startsWith('image/')) {
    throw new Error('El archivo debe ser una imagen.')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Cada imagen debe pesar menos de 20 MB.')
  }

  const source = URL.createObjectURL(file)
  try {
    const image = await loadImage(source)
    let canvas = renderImage(image, MAX_EDGE)
    let dataUrl = toDataUrl(canvas, 0.82)

    if (dataUrl.length > 900000) {
      canvas = renderImage(image, 1200)
      dataUrl = toDataUrl(canvas, 0.72)
    }

    if (!dataUrl || dataUrl.length < 32) {
      throw new Error('No pudimos procesar la imagen.')
    }

    return dataUrl
  } finally {
    URL.revokeObjectURL(source)
  }
}
