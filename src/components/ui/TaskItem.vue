<template>
    <p>
        <span>{{ task.id }}</span>
        <span>{{ task.title }}</span>
        <span>{{ task.isCompleted }}</span>
        <button @click="taskStore.deleteTask(task.id)" >delete</button>
        <button @click="taskStore.toggleFav(task.id)">favs</button>
    </p>
</template>

<script>
import {useTaskStore} from "@/stores/TaskStore.js";

export default {
    setup(){
        const taskStore = useTaskStore()
        return{ taskStore}
    },
    props:['task']
}
</script>

<style lang="scss" scoped>

</style>
