import React, { useState } from 'react'
import { Tree, Button, Popover, Modal, Input, Icon } from 'antd'
import './style.less'

const prefix = 'catalogue-wrapper'
const { TreeNode, DirectoryTree } = Tree
const { confirm } = Modal

const treeDatas = [
  {
    catalogueTit: 'java学习',
    childs: [
      {
        title: '学习笔记1'
      },
      {
        title: '学习笔记2'
      }
    ]
  },
  {
    catalogueTit: '前端学习',
    childs: [
      {
        title: '学习笔记1'
      },
      {
        title: '学习笔记2'
      }
    ]
  }
]

function Catalogue() {
  const [pos, setPos] = useState([0, 0])
  const [popVisiable, setPopVisiable] = useState(false)
  // modalVisiable[visiable, type]
  // type 0: delete modal
  // type 1: add new modal
  const [modalVisiable, setModalVisiable] = useState([false, -1])
  // info[id, name]
  const [info, setInfo] = useState([null, null])
  // new filename
  const [fileName, setFileName] = useState('')
  console.log(fileName);
  function handleSelect(key, _) {
    setInfo([key[0], ''])
  }
  function handleExpand(e) {
    console.log(e, 'expand')
  }

  function showDeleteConfirm() {
    confirm({
      title: `确认删除《${info[1]}》吗?`,
      content: '注意: 一经删除,无法找回',
      okText: '确认',
      okType: 'danger',
      cancelText: '再想想',
      onOk() {
        // TODO
        console.log('OK');
      }
    });
  }

  return (
    <div
      className={`${prefix}`}
      onClick={() => {
        setPopVisiable(false)
      }}
    >
      <Modal
        title={modalVisiable[1] === 0 ? '请输入新的文件夹名称' : '请输入文件夹名称'}
        visible={modalVisiable[0]}
        onOk={() => {
          setModalVisiable([false, -1])
        }}
        onCancel={() => {
          setModalVisiable([false, -1])
        }}
        okText='确认'
        cancelText='取消'
      >
        <Input
          placeholder='请输入'
          autoFocus
          onChange={(e) => {
            setFileName(e.target.value)
          }}
          addonBefore={<Icon type='profile' />}
        />
      </Modal>
      <Popover
        visible={popVisiable}
        placement='bottomLeft'
        content={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              style={{ marginBottom: '10px' }}
              onClick={() => {
                setModalVisiable([true, 0])
              }}
            >
              修改文件夹
            </Button>
            <Button
              onClick={showDeleteConfirm}
            >
              删除文件夹
            </Button>
          </div>
        }
      >
        <div
          style={{ position: 'absolute', left: pos[0], top: pos[1] }}
        />
      </Popover>
      <Button
        icon='file-add'
        ghost
        shape='round'
        type='primary'
        style={{ marginBottom: '10px' }}
        onClick={() => {
          setModalVisiable([true, 1])
        }}
      >
        添加文件夹
      </Button>
      <DirectoryTree
        multiple
        onSelect={handleSelect}
        onExpand={handleExpand}
        className={`${prefix}-catalogue`}
        checkStrictly
        onRightClick={e => {
          e.event.preventDefault()
          setInfo([e.node.props.eventKey, e.node.props.title])
          setPos([e.event.clientX, e.event.clientY])
          setPopVisiable(true)
        }}
      >
        {
          treeDatas.map((childs, parentIndex) => (
            <TreeNode
              blockNode
              title={childs.catalogueTit}
              key={parentIndex}
            >
              {
                childs.childs.map((item, chiladIndex) => (
                  <TreeNode
                    blockNode
                    title={item.title}
                    key={`${parentIndex}-${chiladIndex}`}
                    isLeaf
                  />
                ))
              }
            </TreeNode>
          ))
        }
      </DirectoryTree>
    </div>
  )
}

export default Catalogue