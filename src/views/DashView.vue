<script setup>
    import { RouterView } from 'vue-router';
</script>

<template>
    <div>
        <RouterView name="leftSideBar"/>
        <RouterView name="default"/>
        <RouterView name="rightSideBar"/>
    </div>
</template>