<template>
    <div>
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
            <el-space
                alignment="flex-start"
                direction="vertical"
                size="large"
            >
                <setting-label
                    title="Download Background Image"
                    :onClick="downloadBackgroundImage"
                />
                <setting-label
                    title="Clear Bookmark Cache"
                    description="After clearing the cache, the bookmark information will be reloaded from the server."
                    :onClick="clearBookmarkCache"
                />
            </el-space>
        </el-dialog>
    </div>
</template>

<script>
import { ElMessage } from "element-plus"
import SettingLabel from "./SettingComponents/SettingLabel.vue"

export default {
    name: "Setting",
    components: {
        SettingLabel
    },
    data: () => ({
        dialogSettingVisible: false
    }),
    methods: {
        downloadBackgroundImage() {
            if (!this.$store.state.backgroundImage) return false
            const a = document.createElement("a")
            a.href = this.$store.state.backgroundImage
            a.download = `background-image.png`
            a.click()
            ElMessage("Downloading...")
        },
        clearBookmarkCache() {
            this.$global.localData.remove("bookmarks")
            ElMessage.success("Success")
        }
    }
}
</script>

<style scoped>
.setting-button {
    cursor: pointer;
}
</style>
