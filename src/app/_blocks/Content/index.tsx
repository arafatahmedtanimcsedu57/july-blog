import React from 'react'

import type { Page } from '../../../payload/payload-types'

import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'
import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  Props & {
    id?: string
    onlyContent?: boolean
  }
> = (props) => {
  const { columns, onlyContent } = props

  const Content = () => (
    <React.Fragment>
      {columns &&
        columns.length > 0 &&
        columns.map((col, index) => {
          const { enableLink, link, richText, size } = col

          return (
            <div className={[classes.column, classes[`column--${size}`]].join(' ')} key={index}>
              <RichText content={richText} />
              {enableLink && <CMSLink className={classes.link} {...link} />}
            </div>
          )
        })}
    </React.Fragment>
  )

  return onlyContent ? (
    <Content />
  ) : (
    <Gutter className={classes.content}>
      <div className={classes.grid}>
        <Content />
      </div>
    </Gutter>
  )
}
