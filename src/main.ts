import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { createPinia } from 'pinia'

library.add(fas)

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
