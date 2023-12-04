import { createRouter, createWebHistory } from 'vue-router'
import MainHome from '../views/home/MainHome.vue'
import WaitingRoom from '../views/room/WaitingRoom.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainHome',
      component: MainHome
    },
    {
      path: '/room/:roomNo',
      name: 'WaitingRoom',
      component: WaitingRoom
    }
  ]
})

export default router
