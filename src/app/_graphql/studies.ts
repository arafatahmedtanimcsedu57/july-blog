import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, CONTENT_MEDIA, MEDIA_BLOCK } from './blocks'
import { MEDIA } from './media'
import { META } from './meta'

export const STUDIES = `
  query Studies {
    Studies(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const STUDY = `
  query Study($slug: String, $draft: Boolean) {
    Studies(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        categories {
          title
        }
        publishedDate,
        hero {
          richText
          ${MEDIA}
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${CONTENT_MEDIA}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        relatedStudies {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`
