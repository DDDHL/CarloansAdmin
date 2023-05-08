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
      menuList: [
        {
          name: "后台主页",
          icon: 'House',
          url: '/EchartsHome'
        },
        {
          name: "查询列表",
          icon: 'Document',
          url: '/List'
        },
        {
          name: '个人中心',
          icon: 'User',
          url: '/User'
        }
      ],
      role: '管理员',
      infoCount: 0,
      fullLoading: false,
      fullScreen: false,
      asideShow: false,
      breadList: [{
        name: '后台主页',
        url: '/EchartsHome',
        selectType: true
      }]
    }
  },
  actions: {
    // 侧边栏权限刷新
    menuListFlash() {
      switch (this.role) {
        case '管理员':
          this.menuList.push(
            {
              name: "新增订单",
              icon: 'Edit',
              url: '/AddPage'
            }, {
            name: '用户中心',
            icon: 'Avatar',
            url: '/UserList'
          })
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

