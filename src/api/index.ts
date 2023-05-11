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

// 获取抵押信息
export const getMortgageInfo = (id: string) => {
  return request({
    url: '/carLoan-api/mortgage/getMortgage',
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

// 获取抵押列表
export const getMortgageList = (pageConfig: {
  pageSize: number, pageNo: number, pageCount: number,
  name: string, identifier: string, phone: string
}) => {
  return request({
    url: '/carLoan-api/mortgage/page',
    method: 'POST',
    data: {
      ...pageConfig
    }
  })
}

// 修改用户信息
export const editUserInfo = (userInfo: {
  id: number,
  phone?: string,
  address?: string,
  gradeLevel?: string,
  marital?: string,
  political?: string,
  workingCondition?: number,
  nativePlace?: string,
  birthday?: string
}) => {
  return request({
    url: '/carLoan-api/sys/account/updateAccount',
    method: 'POST',
    data: { ...userInfo }
  })
}

// 审核账号
export const aduitAccount = (id: string, verifyStatus: 'VERIFIED' | 'UN_VERIFIED') => {
  return request({
    url: '/carLoan-api/sys/account/verify',
    method: 'GET',
    params: { id, verifyStatus }
  })
}

// 审核抵押单
export const aduitMortgage = (id: string, verifyStatus: 'VERIFIED' | 'UN_VERIFIED') => {
  return request({
    url: '/carLoan-api/mortgage/verify',
    method: 'GET',
    params: { id, verifyStatus }
  })
}

// 新增抵押单
export const addMortgage = (data = {}) => {
  return request({
    url: '/carLoan-api/mortgage/insertMortgage',
    method: 'POST',
    data
  })
}

// 修改个人密码
export const updatePassword = (password: string) => {
  return request({
    url: '/carLoan-api/sys/account/updatePassword',
    method: 'GET',
    params: { password }
  })
}

// 新增用户
export const addUser = (userInfo: {
  name: string,
  password: string,
  sex: number,
  phone: string,
  address: string,
  identifier: string,
  gradeLevel: string,
  marital: string,
  political: string,
  workingCondition: number,
  nativePlace: string,
  age: number
}) => {
  return request({
    url: '/carLoan-api/sys/account/insert',
    method: 'POST',
    data: { ...userInfo }
  })
}