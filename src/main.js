import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
app.config.globalProperties.backURL = 'http://192.168.1.58:8080/codesparring'
app.config.globalProperties.socketURL = 'ws://192.168.1.58:8080/codesparring/ws/session'
