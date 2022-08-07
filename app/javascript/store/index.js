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
    },
    addTask: (state, task)=>{
      state.tasks.push(task)
    }
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
    }
  }
});
export default store;