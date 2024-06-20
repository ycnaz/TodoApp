<script setup>
    import { computed, defineAsyncComponent, watchEffect, ref } from 'vue';
    import { useComponentStore } from '../stores/useCompStore';
    import today from '../components/TodayComp.vue'
    import upcoming from '../components/UpcomingComp.vue'
    import { useLeftSidebarStore } from '@/stores/useLeftSideBar';
    import { useTodosStore } from '@/stores/useTodos';
    import shortid from 'shortid';
    const HamBurger = defineAsyncComponent(() => import('../assets/svg/hamburger.svg'))

    const todosStore = useTodosStore() 

    const components = { today, upcoming }
    const leftSideBar = useLeftSidebarStore();
    const leftSideBarStatus = computed(() => leftSideBar.isSidebarOpen)
    const compStore = useComponentStore();
    const currentComponent = computed(() => components[compStore.currentComponent]);
    
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

    const newTodoText = ref('')

    function addNewTodo() {
        if (newTodoText.value.trim()) {
            todosStore.addTodo({
                id: shortid.generate(),
                text: newTodoText.value,
                completed: false
            })
            newTodoText.value = ''
        }
    }
</script>

<template>
    <div class="p-3 flex grow">
        <div v-if="!showHamBurger">
            <HamBurger @click="toggleLeftSideBar()" class="h-16 w-16 cursor-pointer"/>
        </div>
        <component :is="currentComponent">
            <form @submit.prevent="addNewTodo()" class="flex flex-col items-start justify-center w-full">
                <input v-model="newTodoText" class="bg-indigo-100 border border-gray-300 outline-none h-12 w-full text-2xl px-3 rounded-lg" placeholder="Add a to-do">
            </form>
        </component>
    </div>
</template>