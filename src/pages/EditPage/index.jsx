import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Input, Button } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import moment from 'moment'
import { Preview } from '@components'
import 'codemirror/keymap/sublime';
import 'codemirror/theme/eclipse.css';
import './md.less'
import './style.less'

const prefix = 'edit-wrapper'
function EditPage() {
  const [tit, setTit] = useState('')
  const [article, setArticle] = useState('')
  useEffect(() => {
    setTit(moment().format('L'))
  }, [])

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
        <div contentEditable={true} className={`${prefix}-editor`}>
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
              lineWrapping: true,
            }}
            onChange={editor => setArticle(editor.getValue())}
          />
        </div>
        <Preview article={article} />
      </div>
    </>
  )
}

export default withRouter(EditPage)