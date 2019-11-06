import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Input, Button } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import moment from 'moment'
import { Preview } from '@components'
import { debounce, throttle } from '@utils'
import 'codemirror/keymap/sublime';
import 'codemirror/theme/eclipse.css';
import './md.less'
import './style.less'

const prefix = 'edit-wrapper'
function EditPage() {
  const [tit, setTit] = useState('')
  const [article, setArticle] = useState('')
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    setTit(moment().format('L'))
  }, [])

  function handleChange(editor) {
    setArticle(editor.getValue())
    handleEditorScroll(editor)
  }

  function handleEditorScroll(editor) {
    let { top, height, clientHeight } = editor.getScrollInfo()
    top = top === 0 ? 0.1 : top
    setScroll(top / (height - clientHeight))
  }

  return (
    <>
      <div className={'edit-title'}>
        <Input
        className={''}
        placeholder='请输入文章标题'
        onChange={e => setTit(e.target.value)}
        value={tit}
        maxLength={20}
        size='large'
        allowClear
        addonAfter={
        <div
          style={{
            width: '100px',
            height: '100%'
          }}
        >
          <Button type='primary'>发布</Button>
        </div>
      }
        />
      </div>
      <div className={prefix}>
        <div className={`${prefix}-editor`}>
          <CodeMirror
            style={{
              overflowX: 'none'
            }}
            suppressContentEditableWarning='true'
            options={{
              theme: 'eclipse',
              keyMap: 'sublime',
              mode: 'markdown',
              lineNumbers: true,
              scrollbarStyle: null,
              smartIndent: true,
              lineWrapping: true
            }}
            onChange={debounce(handleChange, 500)}
            onScroll={throttle(handleEditorScroll, 30)}
            onContextMenu={(_, event) => {
              event.preventDefault()
              return false
            }}
          />
        </div>
        <Preview article={article} scrollTop={scroll} />
      </div>
    </>
  )
}

export default withRouter(EditPage)
