import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 设置路由规则
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/login.vue')
  }, {
    path: '/home',
    component: () => import('@/pages/home.vue')
  }, {
    // 定义404路由
    path: '/404',
    component: () => import('@/pages/notFound.vue')
  }, {
    // 匹配为定义路由然后重定向到404页面
    path: '/:pathMath(.*)',
    redirect: '/404'
  }
];

// 设置路由
const router = createRouter({
  routes,
  history: createWebHistory()
});

// 导出路由
export default router;