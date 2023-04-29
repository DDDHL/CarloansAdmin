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

export {
  message
}