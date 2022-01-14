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
            width="60%"
        >
            <el-space
                alignment="flex-start"
                direction="vertical"
                :size="30"
            >
                <setting-text-button
                    title="Download background image"
                    @onClick="downloadBackgroundImage"
                />
                <setting-text-button
                    title="Clear bookmark cache"
                    description="After clearing the cache, the bookmark information will be reloaded from the server."
                    @onClick="clearBookmarkCache"
                />
                <setting-switch
                    title="Auto clear input box"
                    description="Automatically clear the content of the input box after triggering the search."
                    settingKey="autoClearInputBox"
                    @onChange="updateSetting"
                />
            </el-space>
        </el-dialog>
    </div>
</template>

<script>
import { ElMessage } from "element-plus"
import SettingTextButton from "./SettingComponents/SettingTextButton.vue"
import SettingSwitch from "./SettingComponents/SettingSwitch.vue"

export default {
    name: "Setting",
    components: {
        SettingTextButton,
        SettingSwitch
    },
    data: () => ({
        dialogSettingVisible: false,
    }),
    methods: {
        updateSetting(key, value) {
            this.$store.commit("UPDATE_SETTING", [key, value])
            this.$global.localData.set("setting", this.$store.state.setting)
            window.console.log(`Setting: ${key} -> ${value}`)
        },
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
    },
    created() {
        // 初始化数据
        this.$store.commit("SET_SETTING", this.$global.localData.get("setting", {}))
    }
}
</script>

<style scoped>
.setting-button {
    cursor: pointer;
}
</style>
