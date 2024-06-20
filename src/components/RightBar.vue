<script setup>
import { useListStore } from '@/stores/useLists'

const listsStore = useListStore()

const lists = listsStore.lists
</script>

<template>
    <div class="h-full bg-indigo-200 w-96 ml-auto p-3">
        <form @submit.prevent="" class="h-full flex flex-col gap-y-5">
            <h1 class="text-4xl">To-do:</h1>
            <input class="bg-indigo-200 w-full border border-gray-400 h-12 rounded-lg px-3 outline-none text-2xl" placeholder="To-do">
    
            <textarea placeholder="Description" class="outline-none bg-indigo-200 border border-gray-400 resize-none rounded-lg w-full h-32 p-3"></textarea>
    
            <div class="flex gap-x-5 items-center">
                <label class="w-24">List</label>
                <select class="bg-indigo-200 border border-gray-400 rounded focus:outline-none focus:bg-indigo-300 py-2 transition-all">
                    <option v-for="list in lists" :key="list.id">{{ list.name }}</option>
                </select>
            </div>
    
            <div class="flex gap-x-5 items-center">
                <label class="w-24">Due date</label>
                <input type="date" class="bg-indigo-200 border border-gray-400 rounded focus:outline-none focus:bg-indigo-300 py-1 transition-all">
            </div>
    
            <div class="w-full flex justify-between mt-auto">
                <button class="border border-gray-400 rounded-lg w-fit py-4 px-7 hover:bg-indigo-300 focus:bg-indigo-400 active:bg-indigo-300 focus:outline-none transition-all">Delete To-do</button>
                <button class="border border-gray-400 rounded-lg w-fit bg-indigo-700 text-white py-4 px-7 hover:bg-indigo-500 focus:bg-indigo-600 active:bg-indigo-600 focus:outline-none transition-all">Save changes</button>
            </div>
        </form>
    </div>
</template>