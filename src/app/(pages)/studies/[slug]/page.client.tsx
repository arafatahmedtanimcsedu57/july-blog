'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'

import type { Study } from '../../../../payload/payload-types'

import { Blocks } from '../../../_components/Blocks'
import { StudyHero } from '../../../_heros/StudyHero'

export const StudyClient: React.FC<{ study: Study }> = ({ study: initialStudy }) => {
  const { data } = useLivePreview<Study>({
    depth: 1,
    initialData: initialStudy,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  })

  return (
    <React.Fragment>
      <StudyHero study={data} />
      <Blocks blocks={data.layout} />
    </React.Fragment>
  )
}
