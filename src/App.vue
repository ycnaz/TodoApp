<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-full h-full overflow-x-hidden">
    <router-view v-slot="{ Component, route }">
      <Transition :name="route.meta.transition" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </router-view>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-right-leave-active {
  @apply transition-all duration-300 ease-linear
}

.slide-left-enter-from,
.slide-right-leave-to, 
.slide-left-leave-to,
.slide-right-enter-from {
  @apply opacity-0 
}

.slide-left-enter-from,
.slide-right-leave-to {
  @apply translate-x-[300px]
}

.slide-left-leave-to,
.slide-right-enter-from {
  @apply translate-x-[-300px]
}
</style>