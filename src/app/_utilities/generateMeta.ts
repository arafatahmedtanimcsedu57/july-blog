import type { Metadata } from 'next'

import type { Film, Page, Post, Project } from '../../payload/payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: {
  doc: Page | Post | Project | Film
}): Promise<Metadata> => {
  const { doc } = args || {}

  const server_url = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    `${server_url}${doc.meta.image.url}`

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: doc?.meta?.title || 'Payload',
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title: doc?.meta?.title || 'Payload',
  }
}
