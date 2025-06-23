'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'

import type { Page } from '../../../payload/payload-types'

import { Blocks } from '../../_components/Blocks'
import { Hero } from '../../_components/Hero'

export const PageClient: React.FC<{
  page: Page
}> = ({ page: initialPage }) => {
  const server_url = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`

  const { data } = useLivePreview<Page>({
    depth: 1,
    initialData: initialPage,
    serverURL: server_url,
  })

  return (
    <React.Fragment>
      <Hero {...data.hero} />
      <Blocks
        blocks={data.layout}
        disableTopPadding={
          !data.hero || data.hero?.type === 'none' || data.hero?.type === 'lowImpact'
        }
      />
    </React.Fragment>
  )
}
