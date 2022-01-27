<template>
    <div class="bookmark-container">
        <div
            v-for="bookmark in bookmarks"
            :key="bookmark.url"
            class="box"
            @click="openUrl(bookmark.url)"
        >
            <div class="icon">
                <img :src="getIcon(bookmark)">
            </div>
            <span class="icon-title">
                {{ bookmark.title }}
            </span>
        </div>
        <el-popover
            placement="top"
            :width="300"
            :visible="addBookmarkPopover"
        >
            <template #reference>
                <div
                    v-show="status"
                    class="box plus"
                    @click="addBookmarkPopover = !addBookmarkPopover"
                >
                    <i class="bi bi-plus"></i>
                </div>
            </template>
            <h3>Add new bookmark</h3>
            <el-form
                ref="editBookmark"
                :model="editBookmark"
                label-width="50px"
                label-position="left"
            >
                <el-form-item label="Title">
                    <el-input v-model="editBookmark.title" />
                </el-form-item>
                <el-form-item label="Url">
                    <el-input v-model="editBookmark.url" />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        :loading="editBookmarkButtonLoading"
                        @click="editBookmarkAction"
                    >
                        <i class="bi bi-check2"></i>
                    </el-button>
                </el-form-item>
            </el-form>
        </el-popover>

    </div>
</template>

<script>
import { ElNotification } from "element-plus"

export default {
    name: "Bookmark",
    data: () => ({
        status: false,
        bookmarks: [],
        addBookmarkPopover: false,
        editBookmarkButtonLoading: false,
        editBookmark: {
            title: "",
            url: ""
        }
    }),
    methods: {
        getIcon: bookmark => {
            if (bookmark.icon) {
                return bookmark.icon
            }
            if (!bookmark.url) {
                return ""
            }
            if (!bookmark.url.startsWith("http")) {
                bookmark.url = "http://" + bookmark.url
            }
            const url = new URL(bookmark.url)
            return `${url.protocol}//${url.hostname}/favicon.ico`
        },
        openUrl: url => {
            window.open(url, "_blank")
        },
        editBookmarkAction() {
            if (!this.$global.bookmarkApi) return
            const title = this.editBookmark.title.trim()
            const url = this.editBookmark.url.trim()
            if (title === "" || url === "") {
                ElNotification({
                    title: "Warning",
                    message: "Title 或 Url 不能为空",
                    type: "warning",
                })
            } else {
                const bookmarks = JSON.parse(JSON.stringify(this.bookmarks))
                bookmarks.push({
                    title, url
                })
                this.editBookmarkButtonLoading = true
                this.$axios.post(
                    this.$global.bookmarkApi,
                    { bookmarks }
                ).then(response => {
                    if (response.data === "Success") {
                        this.bookmarks = bookmarks
                        this.addBookmarkPopover = false
                        this.editBookmarkButtonLoading = false
                        this.editBookmark = {
                            title: "",
                            url: ""
                        }
                        this.$global.localData.set("bookmarks", bookmarks)
                    }
                })
            }
        }
    },
    created() {
        // 书签
        const bookmarks = this.$global.localData.get("bookmarks")
        if (bookmarks) {
            this.status = true
            this.bookmarks = bookmarks
        } else if (this.$global.bookmarkApi) {
            this.$axios.get(this.$global.bookmarkApi).then(response => {
                this.status = true
                this.bookmarks = response.data
                this.$global.localData.set("bookmarks", response.data)
            }).catch(() => {
                this.status = false
                ElNotification.error("Bookmark load field.")
            })
        }
    }
}
</script>

<style scoped>
.bookmark-container {
    position: absolute;
    width: 80vw;
    left: 10%;
    top: calc(80% - 80px);
    max-height: 165px;
    overflow: auto;
    text-align: center;
}
.box {
    display: inline-block;
    cursor: pointer;
    width: 104px;
    height: 80px;
    border-radius: 12px;
    overflow: hidden;
    text-align: center;
}
.box:hover {
    background: rgba(255, 255, 255, 0.3);
}
.icon {
    width: 44px;
    height: 44px;
    line-height: 44px;
    background: #ffffff;
    border-radius: 12px;
    margin: 5px 30px;
}
.icon img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
}
.icon-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
}
.plus {
    line-height: 80px;
    font-size: 32px;
    color: rgba(255, 255, 255, 0.6);
}
</style>
