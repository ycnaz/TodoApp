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
          component: () => import('../components/LoginPage.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../components/RegisterPage.vue')
        }
      ]
    },
  ]
})

export default router
