<script>
import {useTaskStore} from "@/stores/TaskStore.js";
import {ref} from "vue";
import TaskItem from "@/components/ui/TaskItem.vue";
import TaskForm from "@/components/ui/TaskForm.vue";
import {storeToRefs} from "pinia";

export default {
    components: {TaskForm, TaskItem},
    setup() {
        const taskStore = useTaskStore()
        const {tasks, favs, favCount, totalCount, isLoading} = storeToRefs(taskStore)
        taskStore.getTasks()
        const filter = ref('all')
        return {tasks, favs, favCount, totalCount, isLoading, filter}
    }
}
</script>
<template>
    <main>
        <h2>Hello</h2>
        <TaskForm/>
        <nav>
            <button @click="filter = 'all'">all tasks</button>
            <button @click="filter = 'favs'">favs tasks</button>
        </nav>

        <div v-if="isLoading">
            <h2>
                Loading....
            </h2>
        </div>
        <div v-if="filter ==='all'">
            <h3>You have {{ totalCount }} tasks</h3>
            <div v-for="task in tasks" :key="task.id">
                <TaskItem :task="task"/>
            </div>
        </div>
        <div v-if="filter ==='favs'">
            <h3>You have {{ favCount }} favs tasks</h3>
            <div v-for="task in favs" :key="task.id">
                <TaskItem :task="task"/>
            </div>
        </div>
    </main>
</template>

