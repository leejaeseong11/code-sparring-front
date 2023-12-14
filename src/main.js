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
  faHouse,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'
library.add(faMagnifyingGlass)
library.add(faUser)
library.add(faLock)
library.add(faCrown)
library.add(faHouse)
library.add(faEye)
library.add(faEyeSlash)

const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

app.config.globalProperties.backURL = import.meta.env.VITE_BACK_URL
app.config.globalProperties.socketURL = import.meta.env.VITE_SOCKET_URL

