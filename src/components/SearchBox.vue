<template>
    <div class="search-box">
        <label
            class="sr-only"
            for="kw"
        >Search</label>
        <input
            id="kw"
            ref="kw"
            :class="{dark: $store.state.darkMode}"
            class="search-box-input"
            placeholder="Search..."
            type="text"
            @keyup.enter="search"
        >
        <button
            :class="{dark: $store.state.darkMode}"
            class="search-button"
            @click="search"
        >
            <i class="bi bi-search"></i>
        </button>
        <div
            class="search-with"
            v-show="searchEngines"
        >
            <button
                v-for="engine in searchEngines"
                :key="engine.name"
                @click="selectSearchEngine(engine)"
                :class="{active: engine.name === searchEngine.name}"
            >
                <img
                    v-if="engine.icon"
                    style="width: auto; height: 100%"
                    :src="engine.icon"
                />
                <span v-else>{{ engine.name }}</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchBox",
    data: () => ({
        searchEngines: [
            {
                name: "Google",
                icon: "@assets/searchEngineIcons/google.png",
                query: "https://www.google.com/search?q={}"
            },
            {
                name: "Bing",
                icon: "@assets/searchEngineIcons/bing.png",
                query: "https://cn.bing.com/search?q={}"
            },
            {
                name: "Baidu",
                icon: "@assets/searchEngineIcons/baidu.png",
                query: "https://www.baidu.com/s?ie=utf-8&word={}"
            }
        ],
        searchEngine: {}
    }),
    methods: {
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
    mounted() {
        // 默认搜索引擎
        this.searchEngine = this.$global.localData.get("searchEngine", this.searchEngines[0])
    }
}
</script>

<style scoped>
.search-box {
    position: absolute;
    width: 100vw;
    top: 20%;
}
.search-box-input {
    background: rgba(255, 255, 255, 0.3);
    height: 46px;
    width: calc(50% - 20px);
    margin-left: calc(25% + 10px - 20px); /* 减去左右 padding */
    transition: 0.3s;
    padding: 0 20px 0 20px;
    border-radius: 23px;
    border: none;
}
.search-box-input:focus {
    outline: none;
    width: calc(50%);
    margin-left: calc(25% - 20px); /* 减去左右 padding */
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}
.search-button {
    cursor: pointer;
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    position: relative;
    right: 40px;
    opacity: 0.5;
    z-index: 999;
    outline: none;
}
.search-box-input.dark {
    border: 1px solid #505050;
    color: #adadad;
}
.search-box-input.dark:focus {
    box-shadow: 0 0 10px #505050;
}
.search-button.dark {
    color: #adadad;
}
.search-with {
    width: 100%;
    height: 34px;
    text-align: center;
    margin-top: 20px;
}
.search-with button {
    cursor: pointer;
    background-color: rgba(240, 240, 240, 0.3);
    border: none;
    display: inline-block;
    width: 80px;
    height: 34px;
    border-radius: 17px;
    font-size: 12px;
    margin: 0 10px 0 10px;
}
.search-with button.active {
    background-color: rgba(255, 255, 255, 0.8);
}
</style>
