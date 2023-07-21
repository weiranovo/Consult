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
    },
    {
      path: '/consult/fast',
      component:() => import('@/views/consult/consultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/dep',
      component:() => import('@/views/consult/consultDep.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/illness',
      component:() => import('@/views/consult/consultIllness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/consult/pay',
      component: () => import('@/views/consult/consultPay.vue'),
      meta: { title: '问诊支付' }
    },
    {
      path: '/room',
      component: () => import('@/views/room/index.vue'),
      meta: { title: '问诊室' },
      beforeEnter(to) {
        if (to.query.payResult === 'false') return '/user/consult'
      }
    },
    {
      path: '/user/consult',
      component: () => import('@/views/User/consultPage.vue'),
      meta: { title: '问诊记录' }
    },
    {
      path: '/user/consult/:id',
      component: () => import('@/views/user/consultDetail.vue'),
      meta: { title: '问诊详情' }
    },
    {
      path: '/order/pay',
      component: () => import('@/views/Order/OrderPay.vue'),
      meta: { title: '药品支付' }
    },
    {
      path: '/order/pay/result',
      component: () => import('@/views/Order/OrderPayResult.vue'),
      meta: { title: '药品支付结果' }
    },
    {
      path: '/order/:id',
      component: () => import('@/views/Order/OrderDetail.vue'),
      meta: { title: '药品订单详情' }
    },
    {
      path: '/order/logistics/:id',
      component: () => import('@/views/Order/OrderLogistics.vue'),
      meta: { title: '物流详情' }
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
