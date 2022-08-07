import Vue from "vue";
import Vuex from "vuex";
import axios from "../plugins/axios"

Vue.use(Vuex);

// Storeを生成
const store = new Vuex.Store({
  state: {
    tasks: []
  },
  getters: {
    tasks: state => state.tasks
  },
  mutations: {
    setTasks: (state, tasks)=>{
      state.tasks = tasks
      console.log('setTasks')
    },
    addTask: (state, task)=>{
      state.tasks.push(task)
    },

  },
  actions: {
    fetchTasks({commit}){
      axios.get("/tasks")
      .then(res => {
        console.log(res)
        commit('setTasks', res.data)
      })
      .catch(err => console.log(err.response))
    },
    createTask({commit}, task){
      axios.post('/tasks', task)
      .then(res=> {
        commit('addTask', res.data)
      })
    },
    // 削除
    deleteTask({commit}, task_id){
      axios.delete('tasks/' + task_id)      
      .then(res => {
        console.log('削除した')
        this.dispatch('fetchTasks')
      })
      .catch(err => console.log(err.response))
    },
    // 編集
    updateTask({commit}, task){
      axios.put('tasks/' + task.id, task)
      axios.get("/tasks")
      .then(res => {
        commit('setTasks', res.data)
      })
      .catch(err => console.log(err.response))
    }

  }
});
export default store;