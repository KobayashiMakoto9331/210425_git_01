<template>
  <div>
    <div class="d-flex">
      <div class="col-4 bg-light rounded shadow m-3 p-3">
        <div class="h4">TODO</div>
        <div v-for="task in tasks" :key="task.id" class="bg-white border shadow-sm rounded my-2 p-4">
          <span>{{ task.title }}</span>
        </div>
      </div>
    </div>
    <div class="text-center">
      <router-link :to="{ name: 'TopIndex' }" class="btn btn-dark mt-5">戻る</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TaskIndex",
  data() {
    return {
      title: "タスク管理アプリ",
      tasks: [],
      status: '',
    }
  },
  created(){
    axios
    .get("/api/tasks")
    .then((response)=>{
      this.tasks = response.data
    })
    .catch(err => this.status = err)
  }
}
</script>

<style scoped>
</style>