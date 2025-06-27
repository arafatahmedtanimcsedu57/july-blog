import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, CONTENT_MEDIA, MEDIA_BLOCK } from './blocks'
import { MEDIA } from './media'
import { META } from './meta'

export const FILMS = `
  query Films {
    Films(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const FILM = `
  query Film($slug: String, $draft: Boolean) {
    Films(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
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
          videoLink
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${CONTENT_MEDIA}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        relatedFilms {
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
