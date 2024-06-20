import { defineStore } from "pinia";
import { ref } from 'vue';

export const useListStore = defineStore('listStore', () => {
    const lists = ref([
        {id: 1, name: 'Personal', color: '#eab308'},
        {id: 2, name: 'Work', color: '#ef4444'},
    ])

    function addList(list) {
        lists.value.push(list)
    }

    function removeList(id) {
        lists.value.filter(list => list.id !== id)
    }

    return { lists, addList, removeList }
})