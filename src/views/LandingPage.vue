<script setup>
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { defineAsyncComponent } from 'vue';
const Tilt = defineAsyncComponent(() => import('../assets/svg/tilt.svg'))
const Welcome = defineAsyncComponent(() => import('../assets/svg/welcome.svg'))

const toast = useToast()
toast

</script>
<template>
    <div class="h-full">
        <div class="absolute left-0 top-0 w-full overflow-hidden leading-[0px]">
            <Tilt class="relative block w-custom-for-footer h-[189px]"/>
        </div>
        <div class="w-full h-full flex items-center justify-center">
            <div class="w-fit h-fit flex items-center justify-center gap-x-10">
                <div class="flex flex-col items-center h-fit gap-y-2">
                    <h1 class="text-6xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-5">To-do List App</h1>
                    <span class="mr-auto text-2xl">An app to manage your to-do's</span>
                    <span class="mr-auto text-2xl mb-10">Login to get started</span>
                    <RouterLink to="/auth" class="text-indigo-700 text-2xl border border-indigo-700 py-3 px-32 rounded hover:bg-indigo-700 hover:text-white mr-auto transition-all duration-300">Start</RouterLink>
                </div>
                <Welcome class="scale-75" />
            </div>
        </div>
        <div class="absolute left-0 bottom-0 w-full overflow-hidden leading-[0px] rotate-180">
            <Tilt class="relative block w-custom-for-footer h-[189px]"/>
        </div>
    </div>
</template>