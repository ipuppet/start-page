import { createStore } from "vuex"

export default createStore({
    state: {
        darkMode: false,
        backgroundImage: "",
        setting: {}
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
        }
    },
    actions: {
    },
    modules: {
    }
})
