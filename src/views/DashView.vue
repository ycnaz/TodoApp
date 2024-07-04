<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
const MoonComp = defineAsyncComponent(() => import('../assets/svg/moon.svg'))
const SunComp = defineAsyncComponent(() => import('../assets/svg/sun.svg'))

const rightSideBar = defineAsyncComponent(() => import('../components/RightBar.vue'))
const leftSideBar = defineAsyncComponent(() => import('../components/LeftBar.vue'))
const todoComp = defineAsyncComponent(() => import('../components/TodoComp.vue'))

const isDark = useDark()
const toggleDark = useToggle(isDark)
const todo = ref('')
</script>

<template>
    <div class="w-full h-full flex dark:bg-indigo-950 overflow-x-hidden">
        <leftSideBar>
            <div @click="toggleDark()" class="cursor-pointer w-fit p-2 border border-indigo-700 rounded-lg ml-auto dark:border-white">
                <MoonComp class="h-6 w-6" v-if="isDark"/>
                <SunComp class="h-6 w-6" v-else/>
            </div>
        </leftSideBar>
        <todoComp @edit-todo="(t) => todo = t" />
        <rightSideBar v-model="todo" />
    </div>
</template>