import React, { useState } from 'react'
import { Tree, Button, Modal, Input, Icon } from 'antd'
import TreeTitle from './TreeTitle'
import './style.less'

const prefix = 'catalogue-wrapper'
const { TreeNode, DirectoryTree } = Tree

const treeDatas = [
  {
    key: '0',
    title: 'java学习',
    children: [
      {
        key: '0-1',
        title: 'java学习1'
      },
      {
        key: '0-2',
        title: 'java学习1'
      }
    ]
  },
  {
    key: '1',
    title: '前端学习',
    children: [
      {
        key: '1-1',
        title: '前端学习1'
      },
      {
        key: '1-2',
        title: '前端学习2'
      }
    ]
  }
]

function Catalogue() {
  const [modalVisiable, setModalVisiable] = useState(false)
  // info[id, name]
  // selected item
  const [info, setInfo] = useState('')
  // new folder name
  const [folderName, setFolderName] = useState('')
  const [moveInfo, setMoveInfo] = useState({
    form: null,
    to: null
  })
  console.log(moveInfo);
  console.log(info);
  function handleSelect(key, _) {
    if (_.node.isLeaf()) {
      setInfo(key[0])
    }
  }


  return (
    <div className={`${prefix}`} >
      <Modal
        title={'请输入文件夹名称'}
        visible={modalVisiable}
        onOk={() => {
          setModalVisiable(false)
        }}
        onCancel={() => {
          setModalVisiable(false)
        }}
        okText='确认'
        cancelText='取消'
      >
        <Input
          placeholder='请输入'
          autoFocus
          onChange={(e) => {
            setFolderName(e.target.value)
          }}
          addonBefore={<Icon type='profile' />}
        />
      </Modal>
      <Button
        icon='folder-add'
        ghost
        shape='round'
        type='primary'
        style={{ marginBottom: '10px' }}
        onClick={() => {
          setModalVisiable(true)
        }}
      >
        添加文件夹
      </Button>
      <DirectoryTree
        multiple
        onSelect={handleSelect}
        className={`${prefix}-catalogue`}
        checkStrictly
        onRightClick={e => {
          e.event.preventDefault()
        }}
        draggable
        onDrop={obj => {
          const { dragNode, node } = obj
          const newMoveInfo = {
            from: dragNode.props.eventKey,
            to: node.props.eventKey
          }
          setMoveInfo(newMoveInfo)
        }}
      >
        {
          treeDatas.map(childs => (
            <TreeNode
              blockNode
              title={<TreeTitle title={childs.title} type='folder' id={childs.key} />}
              key={childs.key}
            >
              {
                childs.children.map(item => (
                  <TreeNode
                    blockNode
                    title={<TreeTitle title={item.title} id={`${item.key}`} />}
                    key={`${item.key}`}
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