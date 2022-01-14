import { createApp } from "vue"
import App from "./App.vue"
import axios from "axios"
import cookie from "./utils/cookie"
import global from "./utils/global"
import store from "./store"
import "element-plus/dist/index.css"

const app = createApp(App).use(store)

// 全局变量
app.config.globalProperties.$axios = axios
app.config.globalProperties.$cookie = cookie
app.config.globalProperties.$global = global

app.mount("#app")
