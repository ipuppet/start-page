<template>
    <div
        class="container"
        :style="{'background-image': `url(${$store.state.backgroundImage})`}"
    >
        <search-box />
        <bookmark-box />
        <setting-panel class="setting" />
    </div>
</template>

<script>
import SearchBox from "./components/SearchBox.vue"
import BookmarkBox from "./components/BookmarkBox.vue"
import SettingPanel from "./components/SettingPanel.vue"

export default {
    name: "App",
    components: {
        SearchBox,
        BookmarkBox,
        SettingPanel
    },
    data: () => ({
        darkMode: false
    }),
    methods: {},
    created() {
        // 初始化数据
        const setting = this.$global.localData.get("setting")
        if (setting) {
            this.$store.commit("SET_SETTING", setting)
        }

        if (this.$global.localData.get("darkMode") === null) {
            this.$global.localData.set("darkMode", false)
        }

        // 深色模式
        this.$store.commit("SET_DARK_MODE", this.$global.localData.get("darkMode") === "true")

        // 背景图片
        if (this.$store.state.setting.enableDownloadMode) {
            this.$global.getBase64ImageFromUrl(this.$store.state.setting.backgroundImageApi)
                .then(image => {
                    this.$store.commit("SET_BACKGROUND_IMAGE", image)
                })
        } else {
            this.$store.commit("SET_BACKGROUND_IMAGE", this.$store.state.setting.backgroundImageApi)
        }
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
    position: absolute;
    right: 60px;
    top: 60px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
}
</style>
