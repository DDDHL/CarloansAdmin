import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

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
        path: '/AddPage',
        component: () => import('@/pages/AddPage.vue')
      },
      {
        path: '/List',
        component: () => import('@/pages/List.vue')
      },
      {
        path: '/User',
        component: () => import('@/pages/User.vue')
      },
    ]
  }, {
    // 定义404路由
    path: '/404',
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

// 导出路由
export default router;