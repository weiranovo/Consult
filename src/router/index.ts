import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
      meta: { title: '登陆' }
    },
    //tabBar
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/index.vue'),
      redirect:'/home',
      children: [
        { path: '/home', component: () => import('@/views/home/index.vue'),meta: { title: '首页' } },
        { path: '/article', component: () => import('@/views/article/index.vue'),meta: { title: '健康百科' } },
        { path: '/notify', component: () => import('@/views/notify/index.vue'),meta: { title: '消息通知' } },
        { path: '/user', component: () => import('@/views/user/index.vue'),meta: { title: '个人中心' } }
      ]
    },
    //ceshi
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/test/index.vue')
    },
    {
      path: '/user/patient',
      component: () => import('@/views/user/patientPage.vue'),
      meta: { title: '家庭档案' }
    }
  ]
})


router.beforeEach((to, from, next) => {
  document.title = `问诊-${(to.meta.title as string)}` || ''
  const whiteList = ['/login']
  if (store.getters.token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})


export default router
