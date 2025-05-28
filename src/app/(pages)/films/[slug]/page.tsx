import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import type { Film } from '../../../../payload/payload-types'

import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { generateMeta } from '../../../_utilities/generateMeta'
import { FilmClient } from './page.client'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Film({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let film: Film | null = null

  console.log(slug)
  try {
    film = await fetchDoc<Film>({
      collection: 'films',
      draft: isDraftMode,
      slug,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!film) {
    notFound()
  }

  return <FilmClient film={film} />
}

export async function generateStaticParams() {
  try {
    const films = await fetchDocs<Film>('films')
    return films?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let film: Film | null = null

  try {
    film = await fetchDoc<Film>({
      collection: 'films',
      draft: isDraftMode,
      slug,
    })
  } catch (error) {
    /* empty */
  }

  return generateMeta({ doc: film })
}
