<template>
    <el-row class="title">
        {{ title }}
    </el-row>
</template>

<script>
export default {
    name: "SettingTitle",
    props: {
        title: String
    }
}
</script>

<style scoped>
.title {
    word-wrap: break-word;
    font-size: 16px;
}
</style>
