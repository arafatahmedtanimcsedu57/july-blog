import React from 'react'

import './index.scss'

const Logo: React.FC = () => {
  return (
    <div className="wrap__logo">
      <img alt="MONSOON PROTEST ARCHIVES LOGO" className="logo" src="/assets/logo.png" />

      <p className="brand">MONSOON PROTEST ARCHIVES</p>
    </div>
  )
}

export const Icon: React.FC = () => {
  return (
    <div className="wrap__icon">
      <img alt="MONSOON PROTEST ARCHIVES LOGO" className="logo" src="/assets/logo.png" />
    </div>
  )
}

export default Logo
