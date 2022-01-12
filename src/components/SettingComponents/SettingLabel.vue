<template>
    <div>
        <span
            class="title"
            @click="onClick()"
        >
            {{ title }}
        </span>
        <br>
        <span class="description">
            {{ description }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'SettingLabel',
    props: {
        title: String,
        description: String,
        onClick: Function
    }
}
</script>

<style scoped>
.title {
    font-size: 16px;
    cursor: pointer;
}
.title:hover {
    color: darkcyan;
}
.description {
    font-size: 14px;
    color: #adadad;
}
</style>
