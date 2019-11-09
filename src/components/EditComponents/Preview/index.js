import React, { useRef, useEffect } from 'react'
import showdown from 'showdown'
import './style.less'

const prefix = 'preview-wrapper'

const converter = new showdown.Converter()
function Preview(props) {
  const { scrollTop, article } = props
  const dom = useRef(null)
  useEffect(() => {
    if (dom.current.scrollTop) {
      dom.current.scrollTo(0, scrollTop * (dom.current.scrollHeight + dom.current.clientHeight))
    }
  }, [dom, scrollTop])

  return (
    <div
      className={`${prefix}`}
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(article) }}
      ref={ref => dom.current = ref}
    />
  )
}

export default Preview