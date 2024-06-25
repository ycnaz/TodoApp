import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTodosStore = defineStore('todosStore', () => {

    // State
    const todos = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Actions
    const fetchTodos = async () => {
        loading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const data = JSON.parse(localStorage.getItem('ycnaz_todos')) || []
            todos.value = data
            error.value = null
        } catch (err) {
            error.value = err.message || "Failed to fetch to-do's"
        } finally {
            loading.value = false
        }
    }

    fetchTodos()

    const saveTodosToLocalStorage = () => {
        localStorage.setItem('ycnaz_todos', JSON.stringify(todos.value))
    }

    const addTodo = (todo) => {
        todos.value.push(todo)
        saveTodosToLocalStorage()
    }

    const removeTodo = (id) => {
        todos.value = todos.value.filter(todo => todo.id !== id)
        saveTodosToLocalStorage()
    }

    const toggleTodo = (id) => {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.completed = !todo.completed
            saveTodosToLocalStorage()
        }
    }

    const updateTodo = (id, updatedTodo) => {
        const index = todos.value.findIndex(todo => todo.id === id)
        if (index !== -1) {
            todos.value[index] = {...todos.value[index], ...updatedTodo}
            saveTodosToLocalStorage()
        }
    }

    // Getters
    const completedTodos = computed(() => todos.value.filter(todo => todo.completed === true))
    const todosInList = (list) => {
        return computed(() => todos.value.filter(todo => todo.list === list))
    }

    const todosBasedOnDate = (date) => {
        const today = new Date().setHours(0, 0, 0, 0)
        return todos.value.filter(todo => {
            const dueDate = new Date(todo.date).setHours(0, 0, 0, 0)
            if (date === 'today') {
                return dueDate === today
            } else {
                return dueDate > today
            }
        })
    }

    return {
        todos,
        loading,
        error,
        fetchTodos,
        saveTodosToLocalStorage,
        updateTodo,
        addTodo,
        removeTodo,
        toggleTodo,
        completedTodos,
        todosInList,
        todosBasedOnDate
    }
})