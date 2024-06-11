<script setup>
    import { defineAsyncComponent } from 'vue'
    import { useToast } from 'vue-toastification'
    const GoogleSvg = defineAsyncComponent(() => import('../assets/svg/google.svg'))
    const FacebookSvg = defineAsyncComponent(() => import('../assets/svg/facebook.svg'))
    const LinkedinSvg = defineAsyncComponent(() => import('../assets/svg/linkedin.svg'))
    
    const toast = useToast()

    function socialsAlert() {
        toast.error("Isn't implemented")
    }
</script>

<template>
    <GoogleSvg @click="socialsAlert" class="w-12 h-12 hover:scale-125 hover:opacity-80 transition-all cursor-pointer"/>
    <FacebookSvg @click="socialsAlert" class="w-12 h-12 hover:scale-125 hover:opacity-80 transition-all cursor-pointer"/>
    <LinkedinSvg @click="socialsAlert" class="w-12 h-12 scale-125 hover:scale-150 hover:opacity-80 transition-all cursor-pointer"/>
</template>