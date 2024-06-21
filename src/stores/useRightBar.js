import { defineStore } from "pinia";
import { ref } from "vue";

export const useRightBar = defineStore('rightBarStore', () => {
    const rightBarOpen = ref(false)

    function toggleRightBar() {
        rightBarOpen.value = !rightBarOpen.value
    }

    function openRightBar() {
        rightBarOpen.value = true
    }

    function closeRightBar() {
        rightBarOpen.value = false
    }

    return { rightBarOpen, toggleRightBar, openRightBar, closeRightBar }
})