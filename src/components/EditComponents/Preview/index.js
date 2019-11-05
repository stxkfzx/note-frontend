import React from 'react'
import showdown from 'showdown'
import './style.less'

const prefix = 'preview-wrapper'

const converter = new showdown.Converter()
function Preview(props) {
  return (
    <div
      className={`${prefix}`}
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.article) }}
    />
  )
}

export default Preview