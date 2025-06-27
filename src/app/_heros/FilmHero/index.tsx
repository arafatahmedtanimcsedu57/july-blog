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
          <div className={classes.leader}>
            <div className={classes.categories}>
              {publishedDate && formatDateTime(publishedDate)}
              &nbsp; &mdash; &nbsp;
              {categories?.map((category, index) => {
                const { title: categoryTitle } = category as Category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {titleToUse}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              })}
            </div>
          </div>
          <h1 className={classes.title}>{title}</h1>
          {hero && <RichText content={hero.richText} />}
          {/* <div>
            <p className={classes.description}>
              Disclaimer: This content is fabricated and for demonstration purposes only. To edit
              this film,&nbsp;
              <Link href={`${server_url}/admin/collections/films/${id}`}>
                navigate to the admin dashboard
              </Link>
              .
            </p>
          </div> */}
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
              className={ classes.videoIframe }

            />
          </div>
        )}
      </Gutter>
    </Fragment>
  )
}
