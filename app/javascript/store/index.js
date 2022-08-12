import Vue from "vue";
import Vuex from "vuex";
import axios from "../plugins/axios"

Vue.use(Vuex);

// Storeを生成
const store = new Vuex.Store({
  state: {
    tasks: [],
  },
  getters: {
    tasks: state => state.tasks,
    todoList: state => state.tasks.filter(task => task.status === 'todo'),
    doingList: state => state.tasks.filter(task => task.status === 'doing'),
    doneList: state => state.tasks.filter(task => task.status === 'done'),
  },
  mutations: {
    setTasks: (state, tasks)=>{
      console.log('=============setTasks')
      state.tasks = tasks
    },
    addTask: (state, task)=>{
      state.tasks.push(task)
    },
    deleteTask: (state, deleteTask) => {
      state.tasks = state.tasks.filter(task => {
        return task.id != deleteTask.id
      })
    },
    updateTask: (state, updateTask) => {
      const index = state.tasks.findIndex(task => {
        return task.id == updateTask.id
      })
      state.tasks.splice(index, 1, updateTask)
    },

  },
  actions: {
    fetchTasks({commit}){
      axios.get("/tasks")
      .then(res => {
        console.log('========fetchTasks')
        commit('setTasks', res.data)
      })
    },
    createTask({commit}, task){
      axios.post('/tasks', task)
      .then(res=> {
        commit('addTask', res.data)
      })
    },
    // 削除
    deleteTask({commit}, task){
      return axios.delete(`tasks/${task.id}`)      
      .then(res => {
        commit('deleteTask', res.data)
        console.log(res.data)
      })
    },
    // 編集
    updateTask({commit}, task){
      return axios.patch(`tasks/${task.id}`, task)
      .then(res => {
        commit('updateTask', res.data)
        console.log(res.data)
      })
    }

  }
});
export default store;