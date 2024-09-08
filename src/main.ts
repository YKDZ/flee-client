import { createApp } from 'vue'
import './style.css'
import 'floating-vue/dist/style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'

const pinia = createPinia()

// Font Awesome Icon
library.add(fas, far, fab)

createApp(App)
    .use(pinia)
    .use(FloatingVue)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
