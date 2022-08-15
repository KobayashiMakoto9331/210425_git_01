import axios from "../../plugins/axios"


const state = {
  tasks: [],
}

const getters = {
  tasks: state => state.tasks,
}

const mutations = {
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
}

const actions = {
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


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}