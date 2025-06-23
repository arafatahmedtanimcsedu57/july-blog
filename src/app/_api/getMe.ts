import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '../../payload/payload-types'

import { ME_QUERY } from '../_graphql/me'

export const getMe = async (args?: {
  nullUserRedirect?: string
  userRedirect?: string
}): Promise<{
  token: string
  user: User
}> => {
  const { nullUserRedirect, userRedirect } = args || {}
  const cookieStore = cookies()
  const token = cookieStore.get('payload-token')?.value

  const server_url = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
  const meUserReq = await fetch(`${server_url}/api/graphql`, {
    body: JSON.stringify({
      query: ME_QUERY,
    }),
    cache: 'no-store',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  const {
    user,
  }: {
    user: User
  } = await meUserReq.json()

  if (userRedirect && meUserReq.ok && user) {
    redirect(userRedirect)
  }

  if (nullUserRedirect && (!meUserReq.ok || !user)) {
    redirect(nullUserRedirect)
  }

  return {
    token,
    user,
  }
}
