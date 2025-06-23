'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'

import type { Film } from '../../../../payload/payload-types'

import { Blocks } from '../../../_components/Blocks'
import { FilmHero } from '../../../_heros/FilmHero'

export const FilmClient: React.FC<{ film: Film }> = ({ film: initialFilm }) => {
  const server_url = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`

  const { data } = useLivePreview<Film>({
    depth: 1,
    initialData: initialFilm,
    serverURL: server_url,
  })

  return (
    <React.Fragment>
      <FilmHero film={data} />
      <Blocks blocks={data.layout} />
    </React.Fragment>
  )
}
