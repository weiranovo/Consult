import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import 'vant/lib/index.css';
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import golbalComponents from "@/components";
const app = createApp(App)

app.use(router)
app.use(store)
app.use(golbalComponents)
app.mount('#app')
