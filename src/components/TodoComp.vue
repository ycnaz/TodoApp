<script setup>
    import { computed, defineAsyncComponent, watchEffect, ref } from 'vue';
    import { useLeftSidebarStore } from '@/stores/useLeftSideBar';
    import { useTodosStore } from '@/stores/useTodos';
    import { useRightBar } from '@/stores/useRightBar';
    import { useListStore } from '@/stores/useLists';
    import { useToast } from 'vue-toastification';
    const CrossComp = defineAsyncComponent(() => import('../assets/svg/cross-w.svg'))
    const HamBurger = defineAsyncComponent(() => import('../assets/svg/hamburger.svg'))

    const toast = useToast()

    const todosStore = useTodosStore()
    const todos = computed(() => todosStore.filteredTodos)

    const leftSideBar = useLeftSidebarStore();
    const leftSideBarStatus = computed(() => leftSideBar.isSidebarOpen)

    const capFilter = computed(() => {
        return todosStore.filter.charAt(0).toUpperCase() + todosStore.filter.slice(1)
    })
    
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
    const rightBarStatus = computed(() => rightBarStore.rightBarOpen)
    watchEffect(() => console.log(rightBarStatus.value))

    const editMode = computed(() => rightBarStore.editing)

    function toggleRightBar() {
        if (editMode.value !== true) {
            rightBarStore.toggleRightBar()
        }
        rightBarStore.editing = false
    }

    const listsStore = useListStore()
    const lists = computed(() => listsStore.lists)

    function getTodoColor(todo) {
        return lists.value.find(list => list.name === todo.list).color
    }

    function removeTodo(id) {
        todosStore.removeTodo(id)
        toast.success('To-do removed successfully')
    }

    function toggleTodo(id) {
        todosStore.toggleTodo(id)
    }

    function isBeforeToday(date) {
        const today = new Date();
        const givenDate = new Date(date);
        return givenDate < today.setHours(0, 0, 0, 0);
    }

    function getTodoStyle(todo) {
        const color = getTodoColor(todo);
        const opacity = isBeforeToday(todo.date) ? '0.75' : '1';
        return {
            backgroundColor: color,
            opacity: opacity
        };
    }

</script>

<template>
    <div class="p-3 flex grow justify-center">
        <div v-if="!showHamBurger" class="flex-none mr-auto">
            <HamBurger @click="toggleLeftSideBar" class="h-16 w-16 cursor-pointer"/>
        </div>
        <div class="flex flex-col flex-grow items-center gap-y-5">
            <button @click="toggleRightBar" class="w-96 h-10 bg-indigo-700 rounded-lg shadow-md text-white hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-600 transition-all">New to-do</button>
            <TransitionGroup tag="ul" name="fade" class="flex flex-col gap-y-1 relative list-none">
                <span v-if="todosStore.loading">Checking for to-do's...</span>
                <span class="text-4xl mb-5 dark:text-white" v-else>{{ todosStore.listFilter ? todosStore.listFilter : capFilter }}</span>
                <li v-for="todo in todos" :key="todo.id" @click="$emit('editTodo', todo)" :style="getTodoStyle(todo)" class="group flex flex-col w-96 py-3 px-5 rounded-lg shadow-lg transition-all cursor-pointer">
                    <div class="flex items-center">
                        <input :disabled="isBeforeToday(todo.date)" @click.stop="toggleTodo(todo.id)" type="checkbox" :checked="todo.completed" class="cursor-pointer w-4 h-4 border-none text-indigo-600 transition-all">
                        <span class="text-white pl-5">{{ todo.text }}</span>
                        <CrossComp @click.stop="removeTodo(todo.id)" class="opacity-0 h-5 w-5 ml-auto cursor-pointer rounded-full group-hover:opacity-100 transition-all duration-300"/>
                    </div>
                    <p :class="{ 'group-hover:mt-3': todo.desc }" class="text-gray-200 max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-96 group-focus:opacity-100 group-focus:max-h-96 transition-all">{{ todo.desc }}</p>
                </li>
                <h1 v-if="!todosStore.loading && !todos">You have no to-do's</h1>
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