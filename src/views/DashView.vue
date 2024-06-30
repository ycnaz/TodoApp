<script setup>
import { defineAsyncComponent, ref, watchEffect } from 'vue';

const rightSideBar = defineAsyncComponent(() => import('../components/RightBar.vue'))
const leftSideBar = defineAsyncComponent(() => import('../components/LeftBar.vue'))
const todoComp = defineAsyncComponent(() => import('../components/TodoComp.vue'))

const todo = ref('')
watchEffect(console.log(todo))
</script>

<template>
    <div class="w-full h-full flex">
        <leftSideBar/>
        <todoComp @edit-todo="(t) => todo = t" />
        <rightSideBar v-model="todo" />
    </div>
</template>