<script setup>
    import { computed, defineAsyncComponent, watchEffect, ref } from 'vue';
    import { useLeftSidebarStore } from '@/stores/useLeftSideBar';
    import { useTodosStore } from '@/stores/useTodos';
    import { useRightBar } from '@/stores/useRightBar';
    import { useListStore } from '@/stores/useLists';
    const CrossComp = defineAsyncComponent(() => import('../assets/svg/cross-w.svg'))
    const HamBurger = defineAsyncComponent(() => import('../assets/svg/hamburger.svg'))

    const todosStore = useTodosStore()
    const todos = computed(() => todosStore.todos)

    const leftSideBar = useLeftSidebarStore();
    const leftSideBarStatus = computed(() => leftSideBar.isSidebarOpen)
    
    const showHamBurger = ref(leftSideBarStatus.value)
    watchEffect(() => {
        if (!leftSideBarStatus.value) {
            setTimeout(() => {
                showHamBurger.value = false;
            }, 250);
        } else {
            showHamBurger.value = true;
        }
    })

    function toggleLeftSideBar() {
        leftSideBar.toggleSideBar();
    }

    const rightBarStore = useRightBar()

    function openRightBar() {
        rightBarStore.openRightBar()
    }

    const listsStore = useListStore()
    const lists = computed(() => listsStore.lists)

    function getTodoColor(todo) {
        return lists.value.find(list => list.name === todo.list).color
    }

    function removeTodo(id) {
        todosStore.removeTodo(id)
    }

</script>

<template>
    <div class="p-3 flex grow justify-center">
        <div v-if="!showHamBurger" class="absolute top-2 left-2">
            <HamBurger @click="toggleLeftSideBar" class="h-16 w-16 cursor-pointer"/>
        </div>
        <div class="flex flex-col gap-y-5">
            <button @click="openRightBar" class="w-96 h-10 bg-indigo-700 rounded-lg shadow-md text-white hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-600 transition-all">New to-do</button>
            <TransitionGroup tag="ul" name="fade" class="flex flex-col gap-y-1 relative list-none">
                <li v-for="todo in todos" :key="todo.id" :style="{ backgroundColor: getTodoColor(todo) }" class="flex items-center w-96 py-3 px-5 rounded-lg shadow-sm">
                    <input type="checkbox" v-model="todo.completed" class="cursor-pointer w-4 h-4 border-none text-indigo-600 transition-all">
                    <span class="text-white pl-5">{{ todo.text }}</span>
                    <CrossComp @click="removeTodo(todo.id)" class="h-5 w-5 ml-auto cursor-pointer rounded-full"/>
                </li>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>