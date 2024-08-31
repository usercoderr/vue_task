import {defineStore} from "pinia";
import axios from "axios";

export const useTaskStore = defineStore('2', {
    state: () => ({
        tasks: [],
        isLoading: false,
        error: ''
    }),
    getters: {
        favs() {
            return this.tasks.filter(r => r.isCompleted)
        },
        favCount() {
            return this.tasks.reduce((p, c) => {
                return c.isCompleted ? p + 1 : p
            }, 0)
        },
        totalCount: (state) => {
            return state?.tasks.length
        }
    },
    actions: {
        async getTasks() {
            this.isLoading = true
            const {data} = await axios.get('http://localhost:8000/tasks')
            this.tasks = data
            this.isLoading = false

        },
        async addTask(task) {
            const res = await axios.post('http://localhost:8000/tasks', task)

            if (res.error) {
                console.log(res.error)
            }
        },
        async deleteTask(id) {
            const res = await axios.delete('http://localhost:8000/tasks/' + id)
            await this.getTasks()
        },
        async toggleFav(id) {
            const task = this.tasks.find(task => task.id === id);
            const res = await axios.patch(`http://localhost:8000/tasks/${id}`, {isCompleted: !task.isCompleted})
            await this.getTasks()

        }
        // addTask(task) {
        //     this.tasks.push(task)
        // },
        // deleteTask(id) {
        //     this.tasks = this.tasks.filter(t => t.id !== id)
        // },
        // toggleFav(id) {
        //     const task = this.tasks.find(t => t.id === id)
        //     task.isCompleted = !task.isCompleted
        // }
    }
})
