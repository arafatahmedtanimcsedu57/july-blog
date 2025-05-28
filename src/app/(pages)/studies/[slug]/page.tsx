import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import type { Study } from '../../../../payload/payload-types'

import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { generateMeta } from '../../../_utilities/generateMeta'
import { StudyClient } from './page.client'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Study({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let study: Study | null = null

  try {
    study = await fetchDoc<Study>({
      collection: 'studies',
      draft: isDraftMode,
      slug,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!study) {
    notFound()
  }

  return <StudyClient study={study} />
}

export async function generateStaticParams() {
  try {
    const studies = await fetchDocs<Study>('studies')
    return studies?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let study: Study | null = null

  try {
    study = await fetchDoc<Study>({
      collection: 'studies',
      draft: isDraftMode,
      slug,
    })
  } catch (error) {
    /* empty */
  }

  return generateMeta({ doc: study })
}
