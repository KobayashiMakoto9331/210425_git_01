import Vue from "vue";
import Vuex from "vuex";
import tasks from "./modules/tasks"
import users from "./modules/users"

Vue.use(Vuex);

// Storeを生成
export default new Vuex.Store({
  modules: {
    tasks,
    users,
  }
});