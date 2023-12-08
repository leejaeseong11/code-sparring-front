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
  faMagnifyingGlass,
  faUser,
  faLock,
  faCrown,
  faHouse
} from '@fortawesome/free-solid-svg-icons'
library.add(faMagnifyingGlass)
library.add(faUser)
library.add(faLock)
library.add(faCrown)
library.add(faHouse)

const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
app.config.globalProperties.backURL = 'http://192.168.3.113:8881/codesparring'
app.config.globalProperties.socketURL = 'ws://192.168.3.113:8881/codesparring/ws/session'
