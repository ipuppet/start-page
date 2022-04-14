<template>
    <div>
        <setting-title
            class="title"
            :title="title"
        />
        <el-input
            class="setting-input"
            v-model="input"
            :placeholder="title"
        >
            <template #append>
                <el-button
                    type="primary"
                    @click="onSave"
                >
                    <i class="bi bi-check2"></i>
                </el-button>
            </template>
        </el-input>
        <setting-description :description="description" />
    </div>
</template>

<script>
import SettingTitle from "./SettingTitle.vue"
import SettingDescription from "./SettingDescription.vue"

export default {
    name: "SettingInput",
    components: {
        SettingTitle,
        SettingDescription
    },
    props: {
        title: String,
        settingKey: String,
        description: String
    },
    data: () => ({
        input: ""
    }),
    methods: {
        onSave() {
            this.input = this.input.trim()
            this.$store.commit("UPDATE_SETTING", [this.settingKey, this.input])
            this.$emit("onSave", this.input)
        }
    }
    ,
    created() {
        this.input = this.$store.state.setting[this.settingKey] ?? ""
    }
}
</script>

<style scoped>
.setting-input {
    margin: 5px 0;
}
</style>
