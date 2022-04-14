<template>
    <el-row
        class="description"
        v-html="description"
    >
    </el-row>
</template>

<script>
export default {
    name: "SettingDescription",
    props: {
        description: String
    }
}
</script>

<style scoped>
.description {
    font-size: 14px;
    color: #adadad;
}
</style>
