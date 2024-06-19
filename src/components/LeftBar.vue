<script setup>
import { defineAsyncComponent, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useLeftSidebarStore } from '@/stores/useLeftSideBar';

const HamBurger = defineAsyncComponent(() => import('../assets/svg/hamburger.svg'));
const SearchComp = defineAsyncComponent(() => import('../assets/svg/search.svg'));
const ForwardComp = defineAsyncComponent(() => import('../assets/svg/forward.svg'));
const ListComp = defineAsyncComponent(() => import('../assets/svg/list.svg'));
const CalendarComp = defineAsyncComponent(() => import('../assets/svg/calendar.svg'));
const PlusComp = defineAsyncComponent(() => import('../assets/svg/plus.svg'));
const SignOut = defineAsyncComponent(() => import('../assets/svg/sign-out.svg'));
import { useComponentStore } from '../stores/useCompStore';

const componentStore = useComponentStore();
const leftSideBarStore = useLeftSidebarStore();

const leftSidebarClass = computed(() =>
  leftSideBarStore.isSidebarOpen ? 'ml-0 w-96' : '-ml-96 w-96'
);

function toggleSideBar() {
    leftSideBarStore.toggleSideBar()
}

function navigate(comp) {
    componentStore.setComponent(comp);
}
</script>

<template>
    <div :class="[leftSidebarClass, 'bg-indigo-200 h-full px-5 pb-5 flex flex-col sidebar-transition']">
        <div class="flex justify-between items-center h-16">
            <h1 class="text-3xl">Menu</h1>
            <HamBurger @click="toggleSideBar()" class="h-12 w-12 cursor-pointer hover:scale-105 transition-all" />
        </div>

        <form class="flex border border-gray-400 items-center rounded-lg">
            <SearchComp class="h-8 w-8" />
            <input type="search" class="bg-indigo-200 h-10 grow rounded-e-lg outline-none text-xl">
        </form>

        <div class="flex flex-col gap-y-3 mt-10">
            <h1>Tasks</h1>
            <button @click="navigate('today')" class="flex items-center gap-x-3">
                <ListComp class="h-6 w-6" />
                <span>Today</span>
            </button>
            <button @click="navigate('upcoming')" class="flex items-center gap-x-3">
                <ForwardComp class="h-6 w-6" />
                <span>Upcoming</span>
            </button>
            <button @click="navigate('calendar')" class="flex items-center gap-x-3">
                <CalendarComp class="h-6 w-6" />
                <span>Calendar</span>
            </button>
        </div>

        <div class="flex flex-col gap-y-3 mt-10">
            <h1>Lists</h1>
            <div class="flex gap-x-3">
                <div class="h-6 w-6 bg-red-500 rounded"></div>
                <span>Personal</span>
            </div>
            <div class="flex gap-x-3">
                <div class="h-6 w-6 bg-yellow-500 rounded"></div>
                <span>Work</span>
            </div>
            <div class="flex gap-x-3">
                <div class="h-6 w-6 bg-blue-500 rounded"></div>
                <span>List 1</span>
            </div>
            <div class="flex gap-x-3">
                <PlusComp class="h-6 w-6"/>
                <span>Add new list</span>
            </div>
        </div>

        <div class="flex gap-x-3 mt-auto">
            <SignOut class="w-6 h-6"/>
            <RouterLink to="/">Sign Out</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.sidebar-transition {
    transition: margin-left 0.3s ease-in-out;
}
</style>