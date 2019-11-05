import React from 'react'
import { withRouter } from 'react-router-dom'
import { Login } from '@components'
import './style.less'

const prefix = 'stx-auth'



function AuthPage() {
  return (
    <div className={prefix}>
      <Login />
    </div>
  )
}

export default withRouter(AuthPage)