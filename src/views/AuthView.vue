<script setup>
    import { defineAsyncComponent } from 'vue'
    import LoginPage from '@/components/LoginPage.vue'
    import { useToast } from 'vue-toastification'
    const Svg = defineAsyncComponent(() => import('../assets/svg/completed.svg'))
    const GoogleSvg = defineAsyncComponent(() => import('../assets/svg/google.svg'))
    const FacebookSvg = defineAsyncComponent(() => import('../assets/svg/facebook.svg'))
    const LinkedinSvg = defineAsyncComponent(() => import('../assets/svg/linkedin.svg'))
    const Blob = defineAsyncComponent(() => import('../assets/svg/blob.svg'))
    const Blob2 = defineAsyncComponent(() => import('../assets/svg/blob2.svg'))

    const toast = useToast()

    function socialsAlert() {
        toast.error("Isn't implemented")
    }
</script>

<template>
    <div class="flex items-center justify-center h-full">
        <Blob class="absolute top-16 -left-48 w-[300px] h-[300px] scale-150" />
        <Blob2 class="absolute top-96 -right-48 w-[300px] h-[300px] scale-150" />
        <div class="flex w-[1200px] h-[600px] bg-white rounded-lg shadow-lg">
            <LoginPage>
                <GoogleSvg @click="socialsAlert" class="w-12 h-12 hover:scale-125 hover:opacity-80 transition-all cursor-pointer"/>
                <FacebookSvg @click="socialsAlert" class="w-12 h-12 hover:scale-125 hover:opacity-80 transition-all cursor-pointer"/>
                <LinkedinSvg @click="socialsAlert" class="w-12 h-12 scale-125 hover:scale-150 hover:opacity-80 transition-all cursor-pointer"/>
            </LoginPage>
            <div id="second-div" class="w-1/2 bg-indigo-700 flex items-center justify-center flex-col rounded-lg">
                <Svg class="scale-[.65]"/>
            </div>
        </div>
    </div>
</template>