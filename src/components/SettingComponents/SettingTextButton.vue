<template>
    <div>
        <setting-title
            class="title"
            @click="onClick"
            :title="title"
        />
        <setting-description :description="description" />
    </div>
</template>

<script>
import SettingTitle from "./SettingTitle.vue"
import SettingDescription from "./SettingDescription.vue"

export default {
    name: "SettingTextButton",
    components: {
        SettingTitle,
        SettingDescription
    },
    props: {
        title: String,
        description: String
    },
    methods: {
        onClick() {
            // onClick 防止触发默认点击事件
            this.$emit("onClick")
        }
    }
}
</script>

<style scoped>
.title {
    cursor: pointer;
}
.title:hover {
    color: darkcyan;
}
</style>
