import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/home-screen.vue'
import Budget from '@/views/budget-screen.vue'
import Settings from '@/views/settings-screen.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/budgets', name: 'Budgets', component: Budget },
  { path: '/settings', name: 'Settings', component: Settings },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
