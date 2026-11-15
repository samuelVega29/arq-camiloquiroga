export const serviceImages = [
  'proyectos/p01.svg',
  'proyectos/p02.svg',
  'proyectos/p03.svg',
  'proyectos/p04.svg',
  'proyectos/p05.svg',
  'proyectos/p06.svg',
  'proyectos/p07.jpg',
]

export function imageForIndex(index) {
  return serviceImages[index % serviceImages.length]
}
