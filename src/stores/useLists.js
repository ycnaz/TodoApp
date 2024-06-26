import { defineStore } from "pinia";
import { ref } from 'vue';
import { useTodosStore } from "./useTodos";

export const useListStore = defineStore('listStore', () => {
    // State
    const STORAGE_KEY = 'ycnaz-lists'
    const defaultLists = ref([
        {id: 1, name: 'Personal', color: '#eab308'},
        {id: 2, name: 'Work', color: '#ef4444'},
    ])
    const lists = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultLists)

    // Actions
    const updateLocalStorage = () => {
        localStorage.setItem((STORAGE_KEY), JSON.stringify(lists.value))
    }

    const addList = (list) => {
        lists.value.push(list)
        updateLocalStorage()
    }

    const removeList = (id) => {
        const removedList = lists.value.find(list => list.id === id)
        lists.value = lists.value.filter(list => list.id !== id)
        updateLocalStorage()

        const todoStore = useTodosStore()
        if (removedList) {
            todoStore.removeTodoWhenListDeleted(removedList)
        }
    }

    return { lists, addList, removeList }
})