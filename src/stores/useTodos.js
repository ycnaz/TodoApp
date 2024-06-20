import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodosStore = defineStore('todosStore', () => {
    const todos = ref([])

    function addTodo(todo) {
        todos.value.push(todo)
    }

    function removeTodo(id) {
        todos.value = todos.value.filter(todo => todo.id !== id) 
    }

    function toggleTodo(id) {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.completed = !todo.completed
        }
    }

    return {todos, addTodo, removeTodo, toggleTodo}
})