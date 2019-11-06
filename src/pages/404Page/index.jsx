import React from 'react'
import { withRouter } from 'react-router-dom'
import { Result, Button } from 'antd';
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" ><Link to="/">Back Home</Link></Button>}
    />
  )
}

export default withRouter(NotFound)
