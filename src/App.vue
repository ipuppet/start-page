<template>
    <div
        class="container"
        :style="{'background-image': `url(${backgroundImage})`}"
    >
        <search-box />
        <bookmark />
        <div
            class="setting-button"
            @click="dialogSettingVisible = true"
        >
            <i class="bi bi-gear"></i>
        </div>
        <el-dialog
            v-model="dialogSettingVisible"
            title="Setting"
            width="50%"
        >
            <el-link
                type="primary"
                @click="downloadBackgroundImage()"
            >
                Download Background Image
            </el-link>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogSettingVisible = false">Cancel</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import SearchBox from './components/SearchBox.vue'
import Bookmark from './components/Bookmark.vue'

export default {
    name: 'App',
    components: {
        SearchBox,
        Bookmark
    },
    data: () => ({
        darkMode: false,
        imageApi: "",
        backgroundImage: "", // 背景图片，由 created 进行初始化
        dialogSettingVisible: false
    }),
    methods: {
        log(message) {
            console.log(message)
        },
        getBase64ImageFromUrl(url, callback) {
            if (typeof callback != "function") {
                callback = url => console.log(url)
            }
            this.$axios.get(url, { responseType: 'blob' }).then(response => {
                callback(window.URL.createObjectURL(response.data))
            })
        },
        downloadBackgroundImage() {
            if (!this.backgroundImage) return false
            const a = document.createElement("a")
            a.href = this.backgroundImage
            a.download = `background-image.png`
            a.click()
            this.log("Downloading...")
        },
        selectSearchEngine(engine) {
            this.searchEngine = engine
            this.$global.localData.set("searchEngine", engine)
        },
        search() {
            const kw = this.$refs.kw.value
            if (kw === "") {
                alert("没输入关键字哦")
            } else {
                window.open(this.searchEngine.query.replace("{}", encodeURI(kw)), "_blank")
            }
        }
    },
    created() {
        if (this.$global.localData.get("darkMode") === null) {
            this.$global.localData.set("darkMode", false)
        }
        this.$store.commit("SET_DARK_MODE", this.$global.localData.get("darkMode") === "true")
    },
    mounted() {
        // 背景图片
        if (!this.imageApi)
            this.imageApi = this.$global.backgroundImageApi
        this.getBase64ImageFromUrl(this.imageApi, image => {
            this.backgroundImage = image
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
.container {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
}
.setting-button {
    cursor: pointer;
    position: absolute;
    right: 60px;
    top: 60px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
}
</style>
