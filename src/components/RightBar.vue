<script setup>
import { useListStore } from '@/stores/useLists'
import { useRightBar } from '@/stores/useRightBar';
import { computed, ref, watch, onMounted, defineAsyncComponent, onUnmounted } from 'vue';
import { useTodosStore } from '@/stores/useTodos';
import { useToast } from 'vue-toastification';
import shortid from 'shortid';

const CrossComp = defineAsyncComponent(() => import('../assets/svg/cross.svg'))

const todosStore = useTodosStore()
const toast = useToast()

const model = defineModel()

const isSmallScreen = ref(false)

const newTodoText = ref('')
const newTodosList = ref('Personal')
const newTodosDate = ref(getCurrentDate())
const newTodoDesc = ref('')
const editTodoId = ref(null)

const todoMinDate = ref(getCurrentDate())

const rightBarStore = useRightBar()
const editMode = computed(() => rightBarStore.editing)

watch(model, () => {
    rightBarStore.editing = true
    newTodoText.value = model.value.text
    newTodosList.value = model.value.list
    newTodosDate.value = model.value.date
    newTodoDesc.value = model.value.desc
    editTodoId.value = model.value.id
    rightBarStore.openRightBar() 
})

const hide = () => {
    if (rightBarStore.rightBarOpen === false) {
        setTimeout(() => {
            return 'hidden'
        }, 300)
    } else {
        return 'block'
    }
}


const rightSideBarClass = computed(() => {
    if (isSmallScreen.value === true) {
        return rightBarStore.rightBarOpen ? 'right-0' : '-right-96'
    } else {
        return rightBarStore.rightBarOpen ? 'mr-0' : '-mr-96'
    }
})

const listsStore = useListStore()
const lists = computed(() => listsStore.lists)

function addNewTodo(){
    if (newTodoText.value.trim() && !editMode.value){
        todosStore.addTodo({
            id: shortid.generate(),
            text: newTodoText.value,
            list: newTodosList.value,
            date: newTodosDate.value,
            completed: false,
            desc: newTodoDesc.value.trim(),
        })
        newTodoText.value = ''
        newTodosList.value = 'Personal'
        newTodosDate.value = getCurrentDate()
        newTodoDesc.value = ''
        toast.success('To-do added successfully')
    } else if (editMode.value) {
        todosStore.updateTodo(editTodoId.value, {
            text: newTodoText.value,
            list: newTodosList.value,
            date: newTodosDate.value,
            completed: false,
            desc: newTodoDesc.value.trim(),
        })
        newTodoText.value = ''
        newTodosList.value = 'Personal'
        newTodosDate.value = getCurrentDate()
        newTodoDesc.value = ''
        toast.success('To-do edited successfully')
        rightBarStore.editing = false
    } else {
        toast.error('Please write your to-do')
    }
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

watch(() => rightBarStore.editing, (newValue) => {
    if (newValue === false) {
        newTodoText.value = '';
        newTodoDesc.value = '';
        newTodosDate.value = getCurrentDate();
        newTodosList.value = 'Personal';
    }
});

const updateScreenSize = () => {
    isSmallScreen.value = window.matchMedia('(max-width:1280px)').matches
}

const hideRightBar = () => {
    rightBarStore.closeRightBar()
    rightBarStore.editing = false
}

const removeTodo = (id) => {
    todosStore.removeTodo(id)
    toast.success('To-do removed successfully')
}

onMounted(() => {
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize)
})
</script>

<template>
    <div class="relative h-full z-30">
        <div :class="[rightSideBarClass, hide, 'h-full bg-indigo-200 w-96 ml-auto p-3 dark:bg-indigo-800 dark:text-white max-xl:absolute transition-all duration-300 ease-in-out']">
            <form @submit.prevent="addNewTodo" class="h-full flex flex-col gap-y-5">
                <div class="flex">
                    <h1 class="text-4xl">To-do:</h1>
                    <CrossComp @click="hideRightBar" class="ml-auto h-10 w-10 hidden max-xl:block" />
                </div>
                <input v-model="newTodoText" class="bg-indigo-200 w-full border border-gray-400 h-12 rounded-lg px-3 outline-none text-2xl focus:ring-indigo-500 focus:border-indigo500 dark:bg-indigo-500 dark:placeholder-gray-400 dark:border-none dark:ring-white transition-all" placeholder="To-do">
        
                <textarea v-model="newTodoDesc" placeholder="Description" class="outline-none bg-indigo-200 border border-gray-400 resize-y min-h-14 max-h-[480px] rounded-lg w-full h-32 p-3 focus:ring-indigo-500 focus:border-indigo500 dark:bg-indigo-500 dark:placeholder-gray-400 dark:border-none dark:ring-white transition-all"></textarea>
        
                <div class="flex gap-x-5 items-center">
                    <label for="list" class="w-24">List</label>
                    <select v-model="newTodosList" id="list" name="list" class="bg-indigo-200 border border-gray-400 rounded focus:outline-none focus:bg-indigo-300 py-2 focus:ring-indigo-500 focus:border-indigo500 dark:bg-indigo-500 dark:placeholder-gray-400 dark:border-none dark:ring-white transition-all">
                        <option v-for="list in lists" :key="list.id" :value="list.name">{{ list.name }}</option>
                    </select>
                </div>
    
                <div class="flex gap-x-5 items-center">
                    <label for="date" class="w-24">Due date</label>
                    <input v-model="newTodosDate" :min="todoMinDate" id="date" name="date" type="date" class="bg-indigo-200 border border-gray-400 rounded focus:outline-none focus:bg-indigo-300 py-1 focus:ring-indigo-500 focus:border-indigo500 dark:bg-indigo-500 dark:placeholder-gray-400 dark:border-none dark:ring-white transition-all">
                </div>

                <TransitionGroup tag="div" name="fade" class="mt-auto space-y-2">
                    <button type="submit" class="border border-gray-400 rounded-lg min-w-fit w-full bg-indigo-700 text-white py-4 px-7 hover:bg-indigo-500 focus:bg-indigo-600 active:bg-indigo-600 focus:outline-none dark:text-indigo-800 dark:bg-indigo-300 dark:focus:bg-indigo-500 dark:active:bg-indigo-500 dark:hover:bg-indigo-400 transition-all">{{ editMode ? 'Update To-Do' : 'Add To-Do' }}</button>
                    <button type="reset" v-if="editMode" @click="removeTodo(editTodoId)" class="border border-gray-400 rounded-lg min-w-fit w-full bg-indigo-700 text-white py-4 px-7 hover:bg-indigo-500 focus:bg-indigo-600 active:bg-indigo-600 focus:outline-none dark:text-indigo-800 dark:bg-indigo-300 dark:focus:bg-indigo-500 dark:active:bg-indigo-500 dark:hover:bg-indigo-400 transition-all">Delete To-do</button>
                </TransitionGroup>
            </form>
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