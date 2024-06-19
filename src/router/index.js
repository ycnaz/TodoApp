import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingPage.vue'),
    },
    {
      path: '/auth',
      component: () => import('../views/AuthView.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../components/LoginPage.vue'),
          meta: { transition: 'slide-right'},
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../components/RegisterPage.vue'),
          meta: { transition: 'slide-left'},
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashView.vue'),
    },
  ]
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').filter(segment => segment).length
  const fromDepth = from.path.split('/').filter(segment => segment).length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router
