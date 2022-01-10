<template>
    <div
        class="container"
        :style="{'background-image': `url(${$store.state.backgroundImage})`}"
    >
        <search-box />
        <bookmark />
        <setting class="setting" />
    </div>
</template>

<script>
import SearchBox from './components/SearchBox.vue'
import Bookmark from './components/Bookmark.vue'
import Setting from './components/Setting.vue'

export default {
    name: 'App',
    components: {
        SearchBox,
        Bookmark,
        Setting
    },
    data: () => ({
        darkMode: false
    }),
    methods: {},
    created() {
        if (this.$global.localData.get("darkMode") === null) {
            this.$global.localData.set("darkMode", false)
        }
        this.$store.commit("SET_DARK_MODE", this.$global.localData.get("darkMode") === "true")
        // 背景图片
        this.$global.getBase64ImageFromUrl(this.$global.backgroundImageApi, image => {
            this.$store.commit("SET_BACKGROUND_IMAGE", image)
        })
    }
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
html,
body {
    padding: 0;
    margin: 0;
    background: #000000;
}
.sr-only {
    display: none;
}
</style>

<style scoped>
.container {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
}

.setting {
    cursor: pointer;
    position: absolute;
    right: 60px;
    top: 60px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
}
</style>
