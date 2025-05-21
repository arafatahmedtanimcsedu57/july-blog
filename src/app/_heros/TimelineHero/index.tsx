import React, { Fragment } from 'react'

import type { Page } from '../../../payload/payload-types'

import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import classes from './index.module.scss'

export const TimelineHero: React.FC<{
  timeline: Page
}> = ({ timeline }) => {
  const { hero, meta: { image: metaImage } = {}, title } = timeline

  return (
    <Fragment>
      <Gutter className={classes.timelineHero}>
        <div className={metaImage ? classes.content : classes.contentFull}>
          <h1 className={classes.title}>{title}</h1>
          {hero && <RichText content={hero.richText} />}
        </div>
        {metaImage && (
          <div className={classes.media}>
            <div className={classes.mediaWrapper}>
              {!metaImage && <div className={classes.placeholder}>No image</div>}
              {metaImage && typeof metaImage !== 'string' && (
                <Media fill imgClassName={classes.image} priority resource={metaImage} />
              )}
            </div>
            {metaImage && typeof metaImage !== 'string' && metaImage?.caption && (
              <RichText className={classes.caption} content={metaImage.caption} />
            )}
          </div>
        )}
      </Gutter>
    </Fragment>
  )
}
