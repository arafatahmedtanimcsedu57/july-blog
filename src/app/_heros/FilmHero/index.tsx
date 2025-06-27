import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Category, Film } from '../../../payload/payload-types'

import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import { formatDateTime } from '../../_utilities/formatDateTime'
import classes from './index.module.scss'

export const FilmHero: React.FC<{
  film: Film
}> = ({ film }) => {
  const { id, categories, hero, meta: { image: metaImage } = {}, publishedDate, title } = film
  console.log(film)
  const videoLinkValue = film.hero?.videoLink

  return (
    <Fragment>
      <Gutter className={classes.filmHero}>
        <div className={classes.content}>
          <h1 className={classes.title}>{title}</h1>
          {hero && <RichText content={hero.richText} />}
        </div>

        {videoLinkValue && (
          <div className={classes.videoIframeContainer}>
            <iframe
              src={videoLinkValue}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Sample Vimeo"
              className={classes.videoIframe}
            />
          </div>
        )}
      </Gutter>
    </Fragment>
  )
}
