import type { Footer, Header, Settings } from '../../payload/payload-types'

import { FOOTER_QUERY, HEADER_QUERY, SETTINGS_QUERY } from '../_graphql/globals'

export async function fetchSettings(): Promise<Settings> {
  const server_url = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
  if (!server_url) throw new Error('not found')

  const settings = await fetch(`${server_url}/api/graphql`, {
    body: JSON.stringify({
      query: SETTINGS_QUERY,
    }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    ?.then((res) => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then((res) => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching settings')
      return res.data?.Settings
    })

  return settings
}

export async function fetchHeader(): Promise<Header> {
  const server_url = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
  if (!server_url) throw new Error('not found')

  const header = await fetch(`${server_url}/api/graphql`, {
    body: JSON.stringify({
      query: HEADER_QUERY,
    }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    ?.then((res) => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then((res) => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching header')
      return res.data?.Header
    })

  return header
}

export async function fetchFooter(): Promise<Footer> {
  const server_url = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
  if (!server_url) throw new Error('not found')

  const footer = await fetch(`${server_url}/api/graphql`, {
    body: JSON.stringify({
      query: FOOTER_QUERY,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then((res) => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching footer')
      return res.data?.Footer
    })

  return footer
}

export const fetchGlobals = async (): Promise<{
  footer: Footer
  header: Header
  settings: Settings
}> => {
  // initiate requests in parallel, then wait for them to resolve
  // this will eagerly start to the fetch requests at the same time
  // see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
  const settingsData = fetchSettings()
  const headerData = fetchHeader()
  const footerData = fetchFooter()

  const [settings, header, footer]: [Settings, Header, Footer] = await Promise.all([
    await settingsData,
    await headerData,
    await footerData,
  ])

  return {
    footer,
    header,
    settings,
  }
}
