import { createStore } from 'vuex'

export default createStore({
    state: {
        darkMode: false
    },
    mutations: {
        SET_DARK_MODE(state, darkMode) {
            state.darkMode = darkMode
        }
    },
    actions: {
    },
    modules: {
    }
})
