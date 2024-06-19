<script setup>
    import { computed, defineAsyncComponent } from 'vue';
    import { useComponentStore } from '../stores/useCompStore';
    import today from '../components/TodayComp.vue'
    import upcoming from '../components/UpcomingComp.vue'
    import calendar from '../components/CalendarComp.vue'
    import { useLeftSidebarStore } from '@/stores/useLeftSideBar';
    const HamBurger = defineAsyncComponent(() => import('../assets/svg/hamburger.svg'))

    const components = {today, upcoming, calendar}
    const leftSideBar = useLeftSidebarStore();
    const leftSideBarStatus = computed(() => leftSideBar.isSidebarOpen)
    const compStore = useComponentStore();
    const currentComponent = computed(() => components[compStore.currentComponent]);
    
    function toggleLeftSideBar() {
        leftSideBar.toggleSideBar();

        // setTimeout(() => {
        //     timeOutLeft.value = !leftSideBarStatus.value;
        // }, 200)
    }
</script>

<template>
    <HamBurger @click="toggleLeftSideBar()" :class="{'scale-0': leftSideBarStatus}" class="h-16 w-16 cursor-pointer transition-all"/>
    <component class="p-4" :is="currentComponent">
        <form>
            <input class="bg-indigo-500">
        </form>
    </component>
</template>