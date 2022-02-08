import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/public/:publicKey',
    name: 'PublicToDo',
    component: () => import('../views/PublicToDo.vue')
  },
  {
    path: '/404',
    name: 'PageNotFound',
    component: () => import('../views/NotFound.vue') 
  },
  { 
    path: '/:catchAll(.*)', 
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
