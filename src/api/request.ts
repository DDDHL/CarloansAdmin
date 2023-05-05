
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  // 配置基础路径
  baseURL: 'http://106.13.229.31:24000',
  timeout: 10 * 1000,
  // 请求头
  /* headers:{} */
})

// 配置拦截器
requests.interceptors.request.use(config => {
  // 请求带token
  /* config.headers.Authorization = window.sessionStorage.getItem('token') */
  NProgress.start()
  return config
})

// 对应拦截器
requests.interceptors.response.use((res) => {
  // 请求成功的回调函数
  NProgress.done()
  return res.data;
}, () => {
  // 请求失败的回调函数
  NProgress.done()
  return Promise.reject('fail')
})

// 对外暴露
export default requests;
