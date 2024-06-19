import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useComponentStore = defineStore('componentStore', () => {
  const currentComponent = ref('today')

  function setComponent(comp) {
    currentComponent.value = comp
  }

  return { currentComponent, setComponent }
});