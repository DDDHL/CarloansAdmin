// 导入封装好的axios请求文件
import request from "./request";

// 登录接口
export const userLogin = (phone: string, password: string, code: string) => {
  return request({
    url: '/carLoan-api/login',
    method: 'POST',
    params: {
      phone,
      password,
      code
    }
  })
}

// 获取验证码
export const getPhoneCode = (phone: string) => {
  return request({
    url: '/carLoan-api/code/getCode',
    method: 'GET',
    params: { phone }
  })
}

// 获取用户信息
export const getUserInfo = (id: string) => {
  return request({
    url: '/carLoan-api/sys/account/get',
    method: 'GET',
    params: { id }
  })
}

// 获取用户列表
export const getUserList = (pageConfig: {
  pageSize: number, pageNo: number, pageCount: number,
  name: string, identifier: string, phone: string
}) => {
  return request({
    url: '/carLoan-api/sys/account/page',
    method: 'POST',
    data: {
      ...pageConfig
    }
  })
}