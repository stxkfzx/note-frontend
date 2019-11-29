import React from "react";
import {withRouter} from "react-router";
import { Register } from "@components"
import './style.less'

const prefix = 'stx-registe'

function RegisterPage() {
  return(
    <div className={prefix}>
      <Register/>
    </div>
  )
}

export default withRouter(RegisterPage)
