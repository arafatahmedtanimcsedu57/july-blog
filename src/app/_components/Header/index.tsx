{
  /* eslint-disable @next/next/no-img-element */
}

import Link from 'next/link'
import React from 'react'

import type { Header } from '../../../payload/payload-types'

import { fetchHeader } from '../../_api/fetchGlobals'
import { Gutter } from '../Gutter'
import { HeaderNav } from './Nav'
import classes from './index.module.scss'

export async function Header() {
  let header: Header | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    // When deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // So swallow the error here and simply render the header without nav items if one occurs
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <React.Fragment>
      <header className={classes.header}>
        <Gutter className={classes.wrap}>
          <Link className={classes.wrap} href="/">
            <img alt="MONSOON PROTEST ARCHIVES LOGO" className={classes.logo} src="logo.png" />
            <p className={classes.brand}>MONSOON PROTEST ARCHIVES</p>
          </Link>
          <HeaderNav header={header} />
        </Gutter>
      </header>
    </React.Fragment>
  )
}
