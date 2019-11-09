import React, { useState } from 'react'
import { Modal, Input, Icon, Tooltip } from 'antd'

const { confirm } = Modal

function TreeTitle(props) {
  const [menuVisiable, setMenuVisiable] = useState(false)
  const [modalVisiable, setModalVisiable] = useState(false)
  // new name
  const [fileName, setFileName] = useState('')

  const { title, type, id } = props
  function stopPropagation(e) {
    e.stopPropagation()
  }

  function handleOk(e) {
    stopPropagation(e)
    setModalVisiable(false)
  }

  function handleCancel(e) {
    stopPropagation(e)
    setModalVisiable(false)
  }

  function handleChange(e) {
    setFileName(e.target.value)
  }

  function handleClickEdit(e) {
    stopPropagation(e)
    setModalVisiable(true)
  }

  function handleClickDelete(e) {
    stopPropagation(e)
    confirm({
      title: `确认删除 《${title}》 吗?`,
      content: '注意: 一经删除,无法找回',
      okText: '确认',
      okType: 'danger',
      cancelText: '再想想',
      onOk() {
        // TODO
        console.log(`delete ${id}`);
      }
    });
  }

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      onMouseEnter={() => setMenuVisiable(true)}
      onMouseLeave={() => setMenuVisiable(false)}
    >
      <Modal
        title={'请输入新的名称'}
        visible={modalVisiable}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='确认'
        cancelText='取消'
      >
        <Input
          placeholder='请输入'
          autoFocus
          onChange={handleChange}
          addonBefore={<Icon type='profile' />}
        />
      </Modal>
      {title}
      {
        menuVisiable &&
        <span>
          {
            type === 'folder' &&
            <Tooltip placement='top' title='添加笔记'>
              <Icon
                type='file-add'
                style={{ marginRight: '5px' }}
                onClick={e => {
                  e.stopPropagation()
                  e.cancelable = true
                }}
              />
            </Tooltip>
          }
          <Tooltip placement='top' title='修改名称' >
            <Icon
              type='edit'
              style={{ marginRight: '5px' }}
              onClick={handleClickEdit}
            />
          </Tooltip>
          <Tooltip placement='top' title='删除'>
            <Icon
              type='delete'
              onClick={handleClickDelete}
            />
          </Tooltip>
        </span>
      }
    </div>
  )
}


export default TreeTitle