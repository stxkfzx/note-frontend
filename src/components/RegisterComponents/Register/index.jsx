import React, {useState} from "react";
import {withRouter} from "react-router";
import { Form ,Input ,Icon ,Button ,Row, Col ,Cascader ,Tooltip ,Modal ,message} from 'antd'
import { post } from '../../../apis/requests'
import './index.less'

const FormItem = Form.Item
const prefix = 'stx-register'
const residences = [
  {
    value: '项目一部',
    label: '项目一部'
  },
  {
    value: '项目二部',
    label: '项目二部'
  },
  {
    value: '项目三部',
    label: '项目三部'
  },
  {
    value: '项目四部',
    label: '项目四部'
  },
  {
    value: '开发中心',
    label: '开发中心'
  },
]

function Register(props) {
  const { form } = props
  const { getFieldValue, validateFields } = form
  const [confirmDirty,setConfirmDirty] = useState(false)
  const [visible,setVisible] = useState(false)
  const [captcha,setCaptcha] = useState("获取验证码")
  const [disabledCaptcha,setDisabledCaptcha] = useState(false)
  const [registerTypeIcon,setRegisterTypeIcon] = useState("loading")
  const [registerTypeText,setRegisterTypeText] = useState("中")
  const postDemoFd = values => post('/user/register', values)

  function validateToNextPassword (rule, value, callback) {
    if (value && confirmDirty) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  }
  function compareToFirstPassword (rule, value, callback) {
    if (value && value !== getFieldValue('password')) {
      callback('您输入的密码不正确');
    } else {
      callback();
    }
  }
  //控制model的开关
  function registerLoadingOpen() {
    setVisible(true)
  }
  function registerLoadingClose() {
    setVisible(false)
  }
  //获取验证码后禁止再次获取直到60秒后
  function getCaptcha() {
    let second = 60
    setDisabledCaptcha(true)
    const timer = setInterval(()=>{
      setCaptcha(`${second}秒`)
      second--
    },1000)
    setTimeout(()=>{
      clearInterval(timer)
      setCaptcha(`获取验证码`)
      setDisabledCaptcha(false)
    },60000)
    message.success("验证码已发送！")
  }
  //判断不为空
  function handleConfirmBlur (e) {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value)
  }
  function handleSubmit(e){
    e.preventDefault()
    props.form.validateFields((err,values)=>{
      if(!err){
        //发送请求
        registerLoadingOpen()
        postDemoFd(values)
          .then(function (response) {
            setTimeout(()=>{
              setRegisterTypeIcon("check-circle")
              setRegisterTypeText("成功")
              setTimeout(registerLoadingClose,2000)
            },2000)
            setRegisterTypeIcon("loading")
            setRegisterTypeText("中")
            console.log(response);
          })
          .catch(function (error) {
            setTimeout(()=>{
              setRegisterTypeIcon("close-circle")
              setRegisterTypeText("失败")
              setTimeout(registerLoadingClose,2000)
            },2000)
            console.log(error);
            setRegisterTypeIcon("loading")
            setRegisterTypeText("中")
          });
        // setLoadingFlag(true)
        console.log(values)
      }else {
        console.log(err)
      }
    })
  }


  const {getFieldDecorator} = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return(

    <>
      <Form {...formItemLayout} className={prefix} onSubmit={handleSubmit}>
        <FormItem label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '请输入正确的邮箱!',
              },
              {
                required: true,
                message: '请输入您的邮箱!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入您的密码!',
              },
              {
                max:16,
                message: '您的密码长度超过最大限制'
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <FormItem label="确认密码" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请确认您的密码!',
              },

              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </FormItem>
        <FormItem
          label={
            <span>
              姓名&nbsp;
              <Tooltip title="请填写您的真实姓名">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [
              { required: true,
                message: '请输入您的真实姓名',
                whitespace: true
              }],
          })(<Input />)}
        </FormItem>
        <Form.Item label="所在部门">
          {getFieldDecorator('residence', {
            rules: [
              { type: 'array', required: true, message: '请选择你所在的部门!' },
            ],
          })(<Cascader options={residences} />)}
        </Form.Item>
        <Form.Item label="验证">
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入你获取的验证码!' }],
              })(<Input />)}
            </Col>
            <Col span={12}>
              <Button onClick={getCaptcha} disabled={disabledCaptcha}>{captcha}</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit"  >
            注册
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={visible}
        closable={false}
        footer={false}
        centered={true}
      >
        <Icon type={registerTypeIcon}/> 注册{registerTypeText}
      </Modal>
    </>
  )
}
export default Form.create({ name: 'register' })(withRouter(Register))
