<template>
    <div>
        <div @click="dialogSettingVisible = true">
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
import { ElMessage } from 'element-plus'

export default {
    name: 'Setting',
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
        }
    }
}
</script>

<style scoped>
</style>
