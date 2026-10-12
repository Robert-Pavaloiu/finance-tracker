import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/home-screen.vue'
import Budget from '@/views/budget-screen.vue'
import Settings from '@/views/settings-screen.vue'
import SavingsTargets from '@/views/savings-targets-screen.vue'
import NotFoundView from '@/views/not-found-view.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/budgets', name: 'Budgets', component: Budget },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/savings-targets', name: 'SavingsTargets', component: SavingsTargets },
  {
  path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
