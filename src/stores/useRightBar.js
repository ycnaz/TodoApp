import { defineStore } from "pinia";
import { ref } from "vue";

export const useRightBar = defineStore('rightBarStore', () => {
    const rightBarOpen = ref(false)
    const editing = ref(false)

    function toggleRightBar() {
        rightBarOpen.value = !rightBarOpen.value
    }

    function openRightBar() {
        rightBarOpen.value = true
    }

    function closeRightBar() {
        rightBarOpen.value = false
    }

    return { rightBarOpen, editing, toggleRightBar, openRightBar, closeRightBar }
})