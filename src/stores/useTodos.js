import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";

export const useTodosStore = defineStore('todosStore', () => {

    // State
    const todos = ref([])
    const loading = ref(false)
    const error = ref(null)
    const filter = ref('all')
    const listFilter = ref('')
    const query = ref('')
    const STORAGE_KEY = 'ycnaz-todos'

    // Actions
    const fetchTodos = async () => {
        loading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
            todos.value = data
            error.value = null
        } catch (err) {
            error.value = err.message || "Failed to fetch to-do's"
        } finally {
            loading.value = false
        }
    }

    fetchTodos()

    const changeFilter = (newFilter) => {
        listFilter.value = ''
        filter.value = newFilter
    }

    const changeListFilter = (newListFilter) => {
        listFilter.value = newListFilter
    }

    const filters = {
        'all': () => todos.value,
        'today': () => todosBasedOnDate('today'),
        'upcoming': () => todosBasedOnDate('upcoming'),
        'completed': () => completedTodos(),
        'expired': () => todosBasedOnDate('expired'),
    }

    const saveTodosToLocalStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
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

    const removeTodoWhenListDeleted = (list) => {
        todos.value = todos.value.filter(todo => todo.list !== list.name)
        saveTodosToLocalStorage()
    }

    const completedTodos = () => {
        return todos.value.filter(todo => todo.completed)
    }

    const todosInList = (list) => {
        return todos.value.filter(todo => todo.list === list)
    }

    //Getters
    const filteredTodos = computed(() => {
        let result = filters[filter.value] ? filters[filter.value]() : [];

        if (listFilter.value) {
            result = todos.value.filter(todo => todo.list === listFilter.value);
        }
        if (query.value) {
            result = todos.value.filter(todo => todo.text.toLowerCase().includes(query.value))
        }

        return result
    });


    const todosBasedOnDate = (date) => {
        const today = new Date().setHours(0, 0, 0, 0)
        return todos.value.filter(todo => {
            const dueDate = new Date(todo.date).setHours(0, 0, 0, 0)
            if (date === 'today') {
                return dueDate === today
            } else if (date === 'upcoming') {
                return dueDate > today
            } else {
                return dueDate < today
            }
        })
    }

    return {
        todos,
        filteredTodos,
        loading,
        filter,
        error,
        fetchTodos,
        query,
        filters,
        listFilter,
        saveTodosToLocalStorage,
        updateTodo,
        changeFilter,
        changeListFilter,
        removeTodoWhenListDeleted,
        addTodo,
        removeTodo,
        toggleTodo,
        completedTodos,
        todosInList,
        todosBasedOnDate
    }
})