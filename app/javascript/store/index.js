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
    todoList: state => state.tasks.filter(task => task.status === 1),
    doingList: state => state.tasks.filter(task => task.status === 2),
    doneList: state => state.tasks.filter(task => task.status === 3),
  },
  mutations: {
    setTasks: (state, tasks)=>{
      console.log('=============setTasks')
      state.tasks = tasks

      // // リストの追加
      // tasks.forEach( task => {
      //   if(task.status == '1'){
      //     state.todoList.push(task)
      //   } else if(task.status == '2'){
      //     state.doingList.push(task)
      //   } else {
      //     state.doneList.push(task)
      //   }
      // })

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
        commit('setTasks', res.data)
        console.log('fetchしたよーーー')
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