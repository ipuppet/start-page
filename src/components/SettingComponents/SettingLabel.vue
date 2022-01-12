<template>
    <div>
        <span class="title">
            {{ title }}
        </span>
        <span>
            {{ description }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'SettingLabel',
    props: {
        title: String,
        description: String
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
