import { createRouter, createWebHistory } from 'vue-router'
import MainHome from '../views/home/MainHome.vue'
import WaitingRoom from '../views/room/WaitingRoom.vue'
import AddQuiz from '@/views/quiz/AddQuiz.vue'

import Signup from '@/views/member/Signup.vue'
import Login from '@/views/member/Login.vue'

import AdminPage from '@/views/admin/AdminPage.vue'
import QuizView from '@/views/quiz/QuizView.vue'

import CodeView from '@/views/code/CodeView.vue'
import Rank from '@/views/code/Rank.vue'

import MyPage from '@/views/member/MyPage.vue'

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
      path: '/admin/:viewName/:filter/:currentPage',
      // path: '/admin',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/quiz/:quizNo',
      name: 'QuizView',
      component: QuizView
    },
    {
      path: '/rank/:rankNo',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/profile/:viewName/:memberNo',
      name: 'MyPage',
      component: MyPage
    },
    {
      path: '/code/:memberNo/:quizNo',
      name: 'CodeView',
      component: CodeView
    }
  ]
})

export default router
