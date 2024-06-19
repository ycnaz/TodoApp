import { defineStore } from "pinia";
import { ref } from "vue";

export const useLeftSidebarStore = defineStore('leftSidebarStore', () => {
    const isSidebarOpen = ref(true)
    
    function toggleSideBar() {
        isSidebarOpen.value = !isSidebarOpen.value
    }
    function closeSideBar() {
        isSidebarOpen.value = false
    }
    function openSideBar() {
        isSidebarOpen.value = true
    }
    return {isSidebarOpen, toggleSideBar, closeSideBar, openSideBar}
});