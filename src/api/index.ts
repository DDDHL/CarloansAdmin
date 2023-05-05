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
