import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePublicStore } from '@/stores'

const customerConfig = ['/Login', '/', '/Home', '/EchartsHome', '/User', '/BorrowMoneyState', '/MortgageList', '/404']
const administratorConfig = ['/Login', '/', '/Home', '/EchartsHome', '/User', '/MortgageList', '/UserList', '/UserMortgageList', '/BorrowMoney', '/404']

// 设置路由规则
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/Login.vue')
  }, {
    path: '/Home',
    redirect: '/EchartsHome',
    component: () => import('@/pages/Home.vue'),
    children: [
      {
        path: '/EchartsHome',
        component: () => import('@/pages/EchartsHome.vue')
      },
      {
        path: '/User',
        component: () => import('@/pages/User.vue')
      },
      {
        path: '/UserList',
        component: () => import('@/pages/UserList.vue')
      },
      {
        path: '/MortgageList',
        component: () => import('@/pages/MortgageList.vue')
      },
      {
        path: '/BorrowMoneyState',
        component: () => import('@/pages/BorrowMoneyState.vue')
      },
      {
        path: '/UserMortgageList',
        component: () => import('@/pages/UserMortgageList.vue')
      },
      {
        path: '/BorrowMoney',
        component: () => import('@/pages/BorrowMoney.vue')
      },
    ]
  }, {
    // 定义404路由
    path: '/404',
    name: '404',
    component: () => import('@/pages/NotFound.vue')
  }, {
    // 匹配为定义路由然后重定向到404页面
    path: '/:pathMath(.*)',
    redirect: '/404'
  }
];

// 设置路由
const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
  console.log(from)
  if (usePublicStore().role === '管理员') {
    if (to.fullPath && !administratorConfig.includes(to.fullPath as string)) {
      next({ name: '404' })
      return
    }
  } else if (usePublicStore().role === '客户') {
    if (to.fullPath && !customerConfig.includes(to.fullPath as string)) {
      next({ name: '404' })
      return
    }
  }
  next()
})

// 导出路由
export default router;