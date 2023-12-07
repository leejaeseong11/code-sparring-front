import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCaretDown,
  faCaretUp,
  faMagnifyingGlass,
  faUser,
  faArrowsRotate,
  faLock,
  faCrown,
  faHouse,
  faRankingStar,
  faPowerOff
} from '@fortawesome/free-solid-svg-icons'
library.add(faCaretDown)
library.add(faCaretUp)
library.add(faMagnifyingGlass)
library.add(faUser)
library.add(faArrowsRotate)
library.add(faLock)
library.add(faCrown)
library.add(faHouse)
library.add(faRankingStar)
library.add(faPowerOff)

const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
app.config.globalProperties.backURL = 'http://192.168.3.113:8881/codesparring'
app.config.globalProperties.socketURL = 'ws://192.168.3.113:8881/codesparring/ws/session'
