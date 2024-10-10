import { getPlaiceholder } from 'plaiceholder'

export const getImage = async (url: string) => {
  const response = await fetch(url)
  const buffer = Buffer.from(await response.arrayBuffer())

  const {
    metadata: { width, height },
    ...placeholder
  } = await getPlaiceholder(buffer, { size: 10 })

  return { image: { url, width, height }, ...placeholder }
}
