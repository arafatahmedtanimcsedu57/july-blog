import React from 'react'

import LogoImg from './assets/logo.png'
import './index.scss'

const Logo: React.FC = () => {
  return (
    <div className="wrap__logo">
      <img alt="MONSOON PROTEST ARCHIVES LOGO" className="logo" src={LogoImg as any} />

      <p className="brand">MONSOON PROTEST ARCHIVES</p>
    </div>
  )
}

export const Icon: React.FC = () => {
  return (
    <div className="wrap__icon">
      <img alt="MONSOON PROTEST ARCHIVES LOGO" className="logo" src={LogoImg as any} />
    </div>
  )
}

export default Logo
