import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router)

app.mount('#app')
app.config.globalProperties.backURL = 'http://192.168.1.58:8080/codesparring'
app.config.globalProperties.socketURL = 'ws://192.168.1.58:8080/codesparring/ws/session'
