'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'

import type { Film } from '../../../../payload/payload-types'

import { Blocks } from '../../../_components/Blocks'
import { FilmHero } from '../../../_heros/FilmHero'

export const FilmClient: React.FC<{ film: Film }> = ({ film: initialFilm }) => {
  const { data } = useLivePreview<Film>({
    depth: 1,
    initialData: initialFilm,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  })

  return (
    <React.Fragment>
      <FilmHero film={data} />
      <Blocks
        blocks={[
          ...(data.layout as any),
          {
            blockName: 'Related Films',
            blockType: 'relatedPosts',
            docs: data.relatedFilms,
            introContent: [
              {
                children: [
                  {
                    text: 'Related films',
                  },
                ],
                type: 'h4',
              },
              {
                children: [
                  {
                    text: 'The films displayed here are individually selected for this page. Admins can select any number of related films to display here and the layout will adjust accordingly. Alternatively, you could swap this out for the "Archive" block to automatically populate films by category complete with pagination. To manage related films, ',
                  },
                  {
                    children: [
                      {
                        text: 'navigate to the admin dashboard',
                      },
                    ],
                    type: 'link',
                    url: `/admin/collections/films/${data.id}`,
                  },
                  {
                    text: '.',
                  },
                ],
                type: 'p',
              },
            ],
            relationTo: 'films',
          },
        ]}
      />
    </React.Fragment>
  )
}
