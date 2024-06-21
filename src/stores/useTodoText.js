import { defineStore } from "pinia";
import { ref } from 'vue';

export const useTodoTextStore = defineStore('todoTextStore', () => {
    const text = ref('')

    function updateText(newText) {
        text.value = newText
    }

    return { text, updateText }
})