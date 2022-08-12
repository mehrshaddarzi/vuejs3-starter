import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Load Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// Load Lodash
import lodash from 'lodash'

// Load Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"

// Load Style
// @see https://cli.vuejs.org/guide/css.html#css-modules
import './scss/app.module.scss'

// Load i18n
import { createI18n } from 'vue-i18n'
import en from './locale/en.json'
import fa from './locale/fa.json'

// Create App
const app = createApp(App)

// Check Language and RTL
app.config.globalProperties.$lang = document.documentElement.lang = localStorage.getItem('lang') || process.env.VUE_APP_LANGUAGE;
document.documentElement.dir = (app.config.globalProperties.$lang === "fa_IR" ? 'rtl' : 'ltr');

// Use Axios
//@see https://axios-http.com/docs/config_defaults
axios.defaults.baseURL =  process.env.VUE_APP_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
window.axios = axios

// Use Lodash
// @see https://lodash.com/docs/4.17.15
window._ = lodash

// Register i18n
// @see https://vue-i18n.intlify.dev/guide/advanced/optimization.html#how-to-configure
const i18n = createI18n({
    locale: app.config.globalProperties.$lang,
    messages: {
        en_US: en,
        fa_IR: fa
    }
})

// Use Router
app.use(router)

// Use i18n
app.use(i18n)

// Mount
app.mount('#app')
