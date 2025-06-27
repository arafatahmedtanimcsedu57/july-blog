import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  description: 'Documenting the July Uprising in Bangladesh',
  images: [
    {
      url: '/logo.png',
    },
  ],
  siteName: 'MONSOON PROTEST ARCHIVE',
  title: 'MONSOON PROTEST ARCHIVE',
  type: 'website',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
