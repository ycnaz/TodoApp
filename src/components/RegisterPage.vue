<script setup>
    import { useToast } from 'vue-toastification';
    import SocialsAuth from '../components/SocialsAuth.vue'

    const toast = useToast()

    function register() {
        toast.success('We do be is')
    }
</script>

<template>
    <form class="flex flex-col items-center gap-y-3 mt-16" @submit.prevent="register">
        <div class="flex flex-col gap-y-8">
            <div class="relative flex flex-col">
                <input id="email" name="email" autocomplete="off" placeholder="Email" class="peer bg-indigo-200 h-14 w-96 rounded px-3 autofill:bg-indigo-200 outline-0 text-2xl placeholder-transparent shadow-md" type="email">
                <label class="mr-auto absolute peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-focus:text-xl peer-focus:-top-7 peer-focus:text-black peer-focus:left-0 transition-all" for="username">Email</label>
            </div>

            <div class="relative flex flex-col">
                <input id="username" name="username" autocomplete="off" placeholder="Username" class="peer bg-indigo-200 h-14 w-96 rounded px-3 autofill:bg-indigo-200 outline-0 text-2xl placeholder-transparent shadow-md" type="text">
                <label class="mr-auto absolute peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-focus:text-xl peer-focus:-top-7 peer-focus:text-black peer-focus:left-0 transition-all" for="username">Username</label>
            </div>
                
            <div class="relative flex flex-col">
                <input id="password" name="password" placeholder="Password" class="peer bg-indigo-200 h-14 w-96 rounded px-3 outline-0 text-2xl placeholder-transparent shadow-md" type="password">
                <label class="mr-auto absolute peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-2xl peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-focus:text-xl peer-focus:text-black peer-focus:-top-7 peer-focus:left-0 transition-all" for="password">Password</label>
            </div>

            <div class="relative flex flex-col">
                <input id="confirm-password" name="confirm-password" placeholder="Confirm Password" class="peer bg-indigo-200 h-14 w-96 rounded px-3 outline-0 text-2xl placeholder-transparent shadow-md" type="password">
                <label class="mr-auto absolute peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-2xl peer-placeholder-shown:top-3 peer-placeholder-shown:left-3 peer-focus:text-xl peer-focus:text-black peer-focus:-top-7 peer-focus:left-0 transition-all" for="confirm-password">Confirm Password</label>
            </div>
        </div>

        <button class="bg-indigo-700 text-white w-full h-10 rounded hover:bg-indigo-500 active:bg-indigo-600 transition-all focus:outline-none focus:bg-indigo-500">Login</button>
        <span>Don't have an account? Register</span>
        <div class="flex w-full items-center">
            <div class="w-full h-px border border-slate-300"></div>
            <span class="mx-2">OR</span>
            <div class="w-full h-px border border-slate-300"></div>
        </div>
    </form>
    <div class="flex gap-3 mt-4">
        <SocialsAuth />
    </div>
</template>