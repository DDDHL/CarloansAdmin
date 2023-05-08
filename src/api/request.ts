
import axios, { AxiosResponse } from 'axios'
import { logOut } from '@/utils'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  // 配置基础路径
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10 * 1000
})

//拦截器，设置token和进度条
requests.interceptors.request.use(
  config => {
    // 上传文件,修改请求头
    if (config.url === '/question/upload' || config.url === 'AI/question/upload') {
      config.headers!['Content-Type'] = 'multipart/form-data'
    }
    // 自动带token
    config.headers.accessToken = localStorage.getItem('accessToken') || ''
    NProgress.start()
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

// 对应拦截器
requests.interceptors.response.use((res: AxiosResponse) => {
  // 请求成功的回调函数
  NProgress.done()
  res.headers.accesstoken && localStorage.setItem('accessToken', res.headers.accesstoken)
  if (res.data.resultCode === 480) {
    logOut()
  }

  return res.data;
}, () => {
  // 请求失败的回调函数
  NProgress.done()
  return Promise.reject('fail')
})

// 对外暴露
export default requests;
