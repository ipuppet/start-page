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
                :fill="true"
                :size="30"
            >
                <setting-input
                    title="Background image API"
                    description=""
                    settingKey="backgroundImageApi"
                    @onSave="setBackgroundImageAPI"
                />
                <setting-switch
                    title="Enable Download Mode"
                    description="Turning this on will allow the current background image to be saved.<br>Note that this is subject to the browser CORS policy, so please turn it off if you cannot display the background image."
                    settingKey="enableDownloadMode"
                />
                <setting-text-button
                    v-if="$store.state.setting.enableDownloadMode"
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
                />
            </el-space>
        </el-dialog>
    </div>
</template>

<script>
import { ElMessage } from "element-plus"
import SettingTextButton from "./SettingComponents/SettingTextButton.vue"
import SettingSwitch from "./SettingComponents/SettingSwitch.vue"
import SettingInput from "./SettingComponents/SettingInput.vue"

export default {
    name: "SettingPanel",
    components: {
        SettingTextButton,
        SettingSwitch,
        SettingInput
    },
    data: () => ({
        dialogSettingVisible: false,
    }),
    methods: {
        updateSetting(key, value) {
            this.$store.commit("UPDATE_SETTING", [key, value])
        },
        setBackgroundImageAPI(api = "") {
            if (api !== "") {
                if (this.$store.state.setting.enableDownloadMode) {
                    this.$global.getBase64ImageFromUrl(this.$store.state.setting.backgroundImageApi)
                        .then(image => {
                            this.$store.commit("SET_BACKGROUND_IMAGE", image)
                        })
                } else {
                    this.$store.commit("SET_BACKGROUND_IMAGE", api)
                }
            }
            ElMessage.success("Save success")
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
    }
}
</script>

<style scoped>
.setting-button {
    cursor: pointer;
}
</style>
