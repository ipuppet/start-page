import { createStore } from "vuex"

export default createStore({
    state: {
        darkMode: false,
        backgroundImage: ""
    },
    mutations: {
        SET_DARK_MODE(state, darkMode) {
            state.darkMode = darkMode
        },
        SET_BACKGROUND_IMAGE(state, backgroundImage) {
            state.backgroundImage = backgroundImage
        }
    },
    actions: {
    },
    modules: {
    }
})
