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
        age: 23,
        avatarUrl: '',
        phone: '',
        password: '',
        address: "是的",
        gradeLevel: "大学本科",
        id: 1,
        identifier: "1",
        marital: "未婚",
        nativePlace: "广东珠海",
        political: "团员",
        status: 1,
        verifyStatus: "UN_VERIFIED",
        workingCondition: 1
      },
      menuList: [],
      role: '管理员',
      infoCount: 0,
      fullLoading: false,
      fullScreen: false,
      asideShow: false,
      breadList: [
        {
          name: '后台主页',
          url: '/EchartsHome',
          selectType: true
        },
      ]
    }
  },
  actions: {
    // 侧边栏权限刷新
    menuListFlash() {
      switch (this.role) {
        case '管理员':
          this.menuList = [
            {
              name: "后台主页",
              icon: 'House',
              url: '/EchartsHome',
              msgNum: 0
            },
            {
              name: "抵押列表",
              icon: 'Tickets',
              url: '/MortgageList',
              msgNum: 0
            },
            {
              name: "借款列表",
              icon: 'List',
              url: '/BorrowMoney',
              msgNum: 0
            },
            {
              name: "款后管理",
              icon: 'Notebook',
              url: '/UserMortgageList',
              msgNum: 0
            },
            {
              name: '用户列表',
              icon: 'Avatar',
              url: '/UserList',
              msgNum: 0
            },
            {
              name: '个人中心',
              icon: 'User',
              url: '/User',
              msgNum: 0
            },
          ]
          break;
        case '客户':
          this.menuList = [
            {
              name: "后台主页",
              icon: 'House',
              url: '/EchartsHome',
              msgNum: 0
            },
            {
              name: "抵押列表",
              icon: 'Tickets',
              url: '/MortgageList',
              msgNum: 0
            },
            {
              name: "借款状态",
              icon: 'Memo',
              url: '/BorrowMoneyState',
              msgNum: 0
            },
            {
              name: '个人中心',
              icon: 'User',
              url: '/User',
              msgNum: 0
            },
          ]
          break;
      }
    },
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

