import { createStore } from "vuex"
import global from "../utils/global"

export default createStore({
    state: {
        darkMode: false,
        backgroundImage: "", // 此处需为 base64 图片，用来显示以及下载当前图片
        setting: {
            // 下载图片会触发跨域
            backgroundImageApi: global.getConfigFromURL("background", ""),
            enableDownloadMode: true
        }
    },
    mutations: {
        SET_DARK_MODE(state, darkMode) {
            state.darkMode = darkMode
        },
        SET_BACKGROUND_IMAGE(state, backgroundImage) {
            state.backgroundImage = backgroundImage
        },
        SET_SETTING(state, setting) {
            state.setting = setting
        },
        UPDATE_SETTING(state, [key, value]) {
            state.setting[key] = value
            global.localData.set("setting", state.setting)
            window.console.log(`Setting: ${key} -> ${value}`)
        }
    },
    actions: {
    },
    modules: {
    }
})
