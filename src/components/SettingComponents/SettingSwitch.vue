<template>
    <div>
        <el-row>
            <el-col :span="18">
                <setting-title :title="title" />
            </el-col>
            <el-col
                class="switch"
                :span="6"
            >
                <el-switch
                    v-model="status"
                    @change="onChange"
                />
            </el-col>
        </el-row>
        <setting-description :description="description" />
    </div>
</template>

<script>
import SettingTitle from "./SettingTitle.vue"
import SettingDescription from "./SettingDescription.vue"

export default {
    name: "SettingSwitch",
    components: {
        SettingTitle,
        SettingDescription
    },
    props: {
        title: String,
        description: String,
        settingKey: String
    },
    data: () => ({
        status: false
    }),
    methods: {
        onChange(status) {
            this.$emit("onChange", this.settingKey, status)
        }
    },
    created() {
        this.status = this.$store.state.setting[this.settingKey]
    }
}
</script>

<style scoped>
.switch {
    text-align: right;
}
</style>
