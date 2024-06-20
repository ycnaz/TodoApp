<script setup>
import { useTodosStore } from '@/stores/useTodos';

const todosStore = useTodosStore()

const todos = todosStore.todos
console.log(todos)
</script>

<template>
    <div class="flex flex-col w-full">
        <h1 class="text-6xl">Today</h1>
        <slot></slot>

        <ul>
            <li v-for="todo in todos" :key="todo.id">
                <span>{{ todo.text }}</span>
                <input type="checkbox" v-model="todo.completed">
            </li>
        </ul>
    </div>
</template>