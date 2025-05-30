import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import type { Config } from '../../payload/payload-types'

import { FILM } from '../_graphql/films'
import { PAGE } from '../_graphql/pages'
import { POST } from '../_graphql/posts'
import { PROJECT } from '../_graphql/projects'
import { STUDY } from '../_graphql/studies'
import { payloadToken } from './token'

const queryMap = {
  films: {
    key: 'Films',
    query: FILM,
  },
  pages: {
    key: 'Pages',
    query: PAGE,
  },
  posts: {
    key: 'Posts',
    query: POST,
  },
  projects: {
    key: 'Projects',
    query: PROJECT,
  },
  studies: {
    key: 'Studies',
    query: STUDY,
  },
}

export const fetchDoc = async <T>(args: {
  collection: keyof Config['collections']
  draft?: boolean
  id?: string
  slug?: string
}): Promise<T> => {
  const { collection, draft, slug } = args || {}
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)

  let token: RequestCookie | undefined

  if (draft) {
    const { cookies } = await import('next/headers')
    token = cookies().get(payloadToken)
  }

  const doc: T = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/graphql`, {
    body: JSON.stringify({
      query: queryMap[collection].query,
      variables: {
        draft,
        slug,
      },
    }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value && draft ? { Authorization: `JWT ${token.value}` } : {}),
    },
    method: 'POST',
    next: { tags: [`${collection}_${slug}`] },
  })
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching doc')
      return res?.data?.[queryMap[collection].key]?.docs?.[0]
    })

  return doc
}
