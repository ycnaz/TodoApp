<script setup>
    import { RouterView } from 'vue-router';
</script>

<template>
    <div>
        <router-view name="leftSideBar" />
        <router-view name="mainTodo" />
        <router-view name="rightSideBar" />
        <router-view />
    </div>
</template>