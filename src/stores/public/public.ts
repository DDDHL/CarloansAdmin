import { publicStoreInterface } from '@/types/public'
import { message } from '@/utils'
import { defineStore } from 'pinia'
export const usePublicStore = defineStore(
  'PublicStore', {
  state: (): publicStoreInterface => {
    return {
      userInfo: {
        name: 'Leander',
        sex: 1,
        age: 23
      },
      fullLoading: false,
      fullScreen: false,
      asideShow: false,
      breadList: [{
        name: '后台主页',
        url: '/echartsHome',
        selectType: true
      }]
    }
  },
  actions: {
    breadSelect(index: number, type: 'select' | 'close' = 'select', isSelect: boolean = false) {
      switch (type) {
        case 'select':
          // 侧边栏选择
          this.breadList.forEach(item => {
            item.selectType = false
          })
          this.breadList[index].selectType = true
          break;
        case 'close':
          if (this.breadList.length <= 1) {
            message('不能删除全部导航哦~', 'warning')
            return
          }
          this.breadList.splice(index, 1)
          if (isSelect) {
            // 删自己
            this.breadList.forEach(item => {
              item.selectType = false
            })
            if (this.breadList[index - 1]) {
              this.breadList[index - 1].selectType = true
              return this.breadList[index - 1].url
            } else {
              this.breadList[index].selectType = true
              return this.breadList[index].url
            }
          }
      }
    }
  },
  persist: false
})

