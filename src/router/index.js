import { createRouter, createWebHistory } from 'vue-router'
import MainHome from '../views/home/MainHome.vue'
import WaitingRoom from '../views/room/WaitingRoom.vue'
import AddQuiz from '@/views/quiz/AddQuiz.vue'

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
    },
    {
      path: '/quiz/add',
      name: 'addQuiz',
      component: AddQuiz
    }
  ]
})

export default router
