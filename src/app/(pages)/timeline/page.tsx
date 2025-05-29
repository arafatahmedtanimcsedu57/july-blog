import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import type { Page } from '../../../payload/payload-types'

import { fetchDoc } from '../../_api/fetchDoc'
import { ContentBlock } from '../../_blocks/Content'
import { Gutter } from '../../_components/Gutter'
import { TimelineHero } from '../../_heros/TimelineHero'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import classes from './index.module.scss'

export const dynamic = 'force-dynamic'

export default async function Timeline({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let timeline: Page | null = null
  try {
    timeline = await fetchDoc<Page>({
      collection: 'pages',
      draft: isDraftMode,
      slug: 'timeline',
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!timeline) {
    notFound()
  }

  return (
    <React.Fragment>
      <TimelineHero timeline={timeline} />
      <Gutter>
        <div className={classes.timeline}>
          {timeline.layout?.map((doc, index) => {
            if (typeof doc === 'string') return null

            if (doc.blockType === 'content') {
              return (
                <div className={classes.timelineRow} key={index}>
                  {/* Left column: odd index */}
                  {index % 2 !== 0 ? (
                    <div className={classes.timelineContainer}>
                      <ContentBlock {...doc} onlyContent />
                    </div>
                  ) : (
                    <div />
                  )}
                  {/* Center column: dot */}
                  <div className={classes.timelineDotCol}>
                    <div className={classes.timelineDot} />
                  </div>
                  {/* Right column: even index */}
                  {index % 2 === 0 ? (
                    <div className={classes.timelineContainer}>
                      <ContentBlock {...doc} onlyContent />
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              )
            }

            return null
          })}
        </div>
      </Gutter>
    </React.Fragment>
  )
}

export const metadata: Metadata = {
  description: 'You have been logged out.',
  openGraph: mergeOpenGraph({
    title: 'Logout',
    url: '/logout',
  }),
  title: 'Logout',
}
