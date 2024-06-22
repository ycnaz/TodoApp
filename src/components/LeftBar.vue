<script setup>
import { defineAsyncComponent, computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useLeftSidebarStore } from '@/stores/useLeftSideBar';
import { useListStore } from '@/stores/useLists';
import shortid from 'shortid';

const HamBurger = defineAsyncComponent(() => import('../assets/svg/hamburger.svg'));
const SearchComp = defineAsyncComponent(() => import('../assets/svg/search.svg'));
const ForwardComp = defineAsyncComponent(() => import('../assets/svg/forward.svg'));
const ListComp = defineAsyncComponent(() => import('../assets/svg/list.svg'));
const PlusComp = defineAsyncComponent(() => import('../assets/svg/plus.svg'));
const SignOut = defineAsyncComponent(() => import('../assets/svg/sign-out.svg'));
const CrossComp = defineAsyncComponent(() => import('../assets/svg/cross.svg'));

const listsStore = useListStore()
const leftSideBarStore = useLeftSidebarStore();

const lists = computed(() => listsStore.lists)

const addingNewList = ref(false)

const leftSidebarClass = computed(() =>
  leftSideBarStore.isSidebarOpen ? 'ml-0' : '-ml-96'
);

function toggleSideBar() {
    leftSideBarStore.toggleSideBar()
}

const listName = ref('')
const listColor = ref('#4338ca')

function addNewList() {
    if (listName.value.trim()) {
        listsStore.addList({
            id: shortid.generate(),
            name: listName.value,
            color: listColor.value,
        })
        listName.value = ''
        listColor.value = '#4338ca'
        addingNewList.value = false
    }

}

function removeTheList(id){
    listsStore.removeList(id)
}
</script>

<template>
    <div :class="[leftSidebarClass, 'bg-indigo-200 h-full px-5 pb-5 flex flex-col w-96 sidebar-transition']">
        <div class="flex justify-between items-center h-16">
            <h1 class="text-3xl">Menu</h1>
            <HamBurger @click="toggleSideBar()" class="h-12 w-12 cursor-pointer hover:scale-105 transition-all" />
        </div>

        <form class="flex border border-gray-400 items-center rounded-lg">
            <SearchComp class="h-8 w-8" />
            <input type="search" class="bg-indigo-200 h-10 grow rounded-e-lg outline-none text-xl border-none focus:ring-indigo-500 focus:border-indigo500">
        </form>

        <div class="flex flex-col gap-y-3 mt-10">
            <h1>Tasks</h1>
            <button class="flex items-center gap-x-3">
                <ListComp class="h-6 w-6" />
                <span>Today</span>
            </button>
            <button class="flex items-center gap-x-3">
                <ForwardComp class="h-6 w-6" />
                <span>Upcoming</span>
            </button>
        </div>

        <div class="flex flex-col gap-y-3 mt-10">
            <h1>Lists</h1>
            <TransitionGroup tag="ul" name="fade2" class="space-y-3 relative list-none">
                <li v-for="list in lists" :key="list.id" class="flex gap-x-3 group">
                    <div class="h-6 w-6 rounded" :style="{ backgroundColor: list.color }"></div>
                    <span>{{ list.name }}</span>
                    <CrossComp @click="removeTheList(list.id)" class="hidden group-hover:block h-6 w-6 ml-auto cursor-pointer" />
                </li>
            </TransitionGroup>
            <Transition name="fade" mode="out-in">
                <div v-if="!addingNewList" class="flex gap-x-3">
                    <PlusComp class="h-6 w-6"/>
                    <button @click="addingNewList = !addingNewList">Add new list</button>
                </div>
                <div v-else class="flex gap-x-3 items-center">
                    <input type="color" v-model="listColor" class="appearance-none border-none h-6 w-6 scale-150 rounded bg-transparent cursor-pointer">
                    <input type="text" placeholder="New list" class="bg-indigo-200 border border-gray-400 rounded-lg px-2 w-24 flex flex-1 outline-none h-full" v-model="listName">
                    <CrossComp @click="addingNewList = false, listName = '', listColor = '#4338ca'" class="h-4 w-4 cursor-pointer rounded-full scale-150 bg-gray-400"/>
                    <button @click="addNewList()" class="py-2 px-5 bg-indigo-700 rounded text-white hover:bg-indigo-600 focus:bg-indigo-600 active:bg-indigo-500">Add</button>
                </div>
            </Transition>
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

.fade-enter-active,
.fade-leave-active {
    @apply transition-all ease-linear
}

.fade-enter-from,
.fade-leave-to {
    @apply opacity-0
}

.fade2-move,
.fade2-enter-active,
.fade2-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade2-enter-from,
.fade2-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade2-leave-active {
  position: absolute;
}
</style>