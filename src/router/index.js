import { createRouter, createWebHistory } from 'vue-router'
import MainHome from '../views/home/MainHome.vue'
import WaitingRoom from '../views/room/WaitingRoom.vue'
import AddQuiz from '@/views/quiz/AddQuiz.vue'

import Signup from '@/views/member/Signup.vue'
import Login from '@/views/member/Login.vue'

import AdminPage from '@/views/admin/adminPage.vue'
import QuizView from '@/views/quiz/QuizView.vue'

import Normal from '@/views/code/Normal.vue'

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
      name: 'AddQuiz',
      component: AddQuiz
    },

    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // path: '/admin/:viewName/:currentPage',
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/quiz',
      name: 'QuizView',
      component: QuizView
    },
    {
      path: '/normal/:roomNo',
      name: 'Normal',
      component: Normal
    }
  ]
})

export default router
