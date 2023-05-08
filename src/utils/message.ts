import { usePublicStore } from '@/stores'
import router from "@/router";
// 统一消息弹窗
const message = (text: string = '消息通知', type: 'success' | 'warning' | 'error' | 'info' = 'success', grouping: boolean = false, showClose: boolean = false): void => {
  ElMessage({
    showClose,
    message: text,
    type,
    grouping,
    center: true,
  })
}

// 统一退出登录
const logOut = (msgText = '登录已过期，请重新登录') => {
  message(msgText, 'warning')
  usePublicStore().$reset()
  //localStorage.clear()
  router.push('/')
}

export {
  message,
  logOut
}