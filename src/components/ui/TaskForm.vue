<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="newTask" type="text" placeholder="Write a task"/>
        <button type="submit">add</button>
    </form>
</template>

<script>
import {ref} from "vue";
import {useTaskStore} from "@/stores/TaskStore.js";

export default {
    setup() {

        const taskStore = useTaskStore()
        const newTask = ref('')
        const handleSubmit = () => {
            if (newTask.value.length > 0) {
                taskStore.addTask({
                    title: newTask.value,
                    isCompleted: false,
                    id: taskStore.tasks.length + 1
                })
                newTask.value = ''
            }


        }
        return {newTask, handleSubmit}
    }
}
</script>
