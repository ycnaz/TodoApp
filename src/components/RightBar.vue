<script setup>
import { useListStore } from '@/stores/useLists'
import { useRightBar } from '@/stores/useRightBar';
import { computed, ref, watch } from 'vue';
import { useTodosStore } from '@/stores/useTodos';
import { useToast } from 'vue-toastification';
import shortid from 'shortid';

const todosStore = useTodosStore()
const toast = useToast()

const model = defineModel()

const newTodoText = ref('')
const newTodosList = ref('Personal')
const newTodosDate = ref(getCurrentDate())
const newTodoDesc = ref('')

const todoMinDate = ref(getCurrentDate())

const rightBarStore = useRightBar()
watch(model, () => {
    newTodoText.value = model.value.text
    newTodosList.value = model.value.list
    newTodosDate.value = model.value.date
    newTodoDesc.value = model.value.desc
    rightBarStore.openRightBar() 
})
const rightSideBarClass = computed(() => 
    rightBarStore.rightBarOpen ? 'mr-0' : '-mr-96'
)

const listsStore = useListStore()
const lists = computed(() => listsStore.lists)

function addNewTodo(){
    if (newTodoText.value.trim()){
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
</script>

<template>
    <div :class="[rightSideBarClass, 'h-full bg-indigo-200 w-96 ml-auto p-3 transition-all duration-300 ease-in-out']">
        <form @submit.prevent="addNewTodo" class="h-full flex flex-col gap-y-5">
            <h1 class="text-4xl">To-do:</h1>
            <input v-model="newTodoText" class="bg-indigo-200 w-full border border-gray-400 h-12 rounded-lg px-3 outline-none text-2xl focus:ring-indigo-500 focus:border-indigo500" placeholder="To-do">
    
            <textarea v-model="newTodoDesc" placeholder="Description" class="outline-none bg-indigo-200 border border-gray-400 resize-y min-h-14 max-h-[480px] rounded-lg w-full h-32 p-3 focus:ring-indigo-500 focus:border-indigo500"></textarea>
    
            <div class="flex gap-x-5 items-center">
                <label for="list" class="w-24">List</label>
                <select v-model="newTodosList" id="list" name="list" class="bg-indigo-200 border border-gray-400 rounded focus:outline-none focus:bg-indigo-300 py-2 focus:ring-indigo-500 focus:border-indigo500 transition-all">
                    <option v-for="list in lists" :key="list.id" :value="list.name">{{ list.name }}</option>
                </select>
            </div>

            <div class="flex gap-x-5 items-center">
                <label for="date" class="w-24">Due date</label>
                <input v-model="newTodosDate" :min="todoMinDate" id="date" name="date" type="date" class="bg-indigo-200 border border-gray-400 rounded focus:outline-none focus:bg-indigo-300 py-1 focus:ring-indigo-500 focus:border-indigo500 transition-all">
            </div>
    
            <button type="submit" class="mt-auto border border-gray-400 rounded-lg min-w-fit w-full bg-indigo-700 text-white py-4 px-7 hover:bg-indigo-500 focus:bg-indigo-600 active:bg-indigo-600 focus:outline-none transition-all">Add To-do</button>
        </form>
    </div>
</template>