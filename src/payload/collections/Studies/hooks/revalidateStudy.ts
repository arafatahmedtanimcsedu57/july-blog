import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import { revalidate } from '../../../utilities/revalidate'

// Revalidate the study in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo studies
export const revalidateStudy: AfterChangeHook = ({ doc, req: { payload } }) => {
  if (doc._status === 'published') {
    void revalidate({ collection: 'studies', payload, slug: doc.slug })
  }

  return doc
}
