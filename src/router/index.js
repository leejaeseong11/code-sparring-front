import { createRouter, createWebHistory } from 'vue-router'
import MainHome from '../views/home/MainHome.vue'
import WaitingRoom from '../views/room/WaitingRoom.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainHome',
      component: MainHome
    },
    {
      path: '/room/:roomNo',
      name: 'waitingRoom',
      component: WaitingRoom
    }
  ]
})

export default router
