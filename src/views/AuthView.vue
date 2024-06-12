<script setup>
    import { defineAsyncComponent, ref, watch, onMounted } from 'vue'
    import { RouterView, useRoute } from 'vue-router';
    const Svg = defineAsyncComponent(() => import('../assets/svg/completed.svg'))
    const Blob = defineAsyncComponent(() => import('../assets/svg/blob.svg'))
    const Blob2 = defineAsyncComponent(() => import('../assets/svg/blob2.svg'))

    const isRegisterActive = ref(false)
    const route = useRoute()
    watch(
        () => route.name,
        (newName) => {
            isRegisterActive.value = newName === 'register';
        }
    );

    onMounted(() => {
        isRegisterActive.value = route.name === 'register';
    });
</script>

<template>
    <div class="flex items-center justify-center h-full">
        <Blob class="absolute top-16 -left-48 w-[300px] h-[300px] scale-150" />
        <Blob2 class="absolute top-96 -right-48 w-[300px] h-[300px] scale-150" />
        <div class="flex w-[1200px] h-[600px] bg-white rounded-lg shadow-lg z-10">
            <div class="flex flex-col w-1/2 h-full items-center justify-center relative">
                <RouterLink class="absolute top-5 right-5" to="/dashboard">Skip</RouterLink>
                <div class="flex border border-black rounded-full absolute top-5">
                    <RouterLink
                        exact-active-class="active"
                        class="h-full w-1/2 py-2 px-7 rounded-s-full relative z-10"
                        :to="{ name: 'login' }"
                        >
                        Login
                    </RouterLink>
                    <RouterLink
                        exact-active-class="active"
                        class="h-full w-1/2 py-2 px-7 rounded-e-full relative z-10"
                        :to="{ name: 'register' }"
                        >
                        Register
                    </RouterLink>
                    <div class="absolute bg-indigo-600 h-full w-[50%] top-0 left-0 transition-all duration-300 ease-in-out" :class="[ isRegisterActive ? 'translate-x-full rounded-e-full' : 'rounded-s-full' ]"></div>
                </div>
                <router-view v-slot="{ Component, route }">
                    <transition :name="route.meta.transition" mode="out-in">
                        <component :is="Component"></component>
                    </transition>
                </router-view>
            </div>
            <div class="w-1/2 bg-indigo-700 flex items-center justify-center flex-col rounded-lg">
                <Svg class="scale-[.65]"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.active {
    color: white;
}

.slide-left-enter-active,
.slide-right-enter-active {
    @apply transition-all duration-200 ease-out
}

.slide-left-enter-from,
.slide-right-leave-to {
    @apply opacity-0 translate-x-[100px]
}

.slide-left-leave-to,
.slide-right-enter-from {
    @apply opacity-0 translate-x-[-100px]
}

.slide-left-leave-active,
.slide-right-leave-active {
    @apply transition-all duration-200 ease-in
}

</style>