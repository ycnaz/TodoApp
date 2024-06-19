<script setup>
import { defineAsyncComponent } from 'vue';

const rightSideBar = defineAsyncComponent(() => import('../components/RightBar.vue'))
const leftSideBar = defineAsyncComponent(() => import('../components/LeftBar.vue'))
const todoComp = defineAsyncComponent(() => import('../components/TodoComp.vue'))
</script>

<template>
    <div class="w-full h-full flex">
        <leftSideBar/>
        <todoComp />
        <rightSideBar />
    </div>
</template>