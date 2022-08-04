<template>
  <div>
    <div class="d-flex">
      <div class="col-4 bg-light rounded shadow m-3 p-3">
        <div class="h4">TODO</div>
        <div 
          v-for="task in tasks"
          :key="task.id"
          :id="'task-' + task.id"
          class="bg-white border shadow-sm rounded my-2 p-4"
          @click="handleShowTaskDetailModal(task)"
          >
          <span>{{ task.title }}</span>
        </div>
      </div>
    </div>
    <div class="text-center">
      <router-link :to="{ name: 'TopIndex' }" class="btn btn-dark mt-5">戻る</router-link>
    </div>

  <transition name="fade">
    <TaskModal
      v-if="isVisibleTaskModal" 
      @close-modal="handleCloseTaskModal"
      :task = "taskDetail"
    />
  </transition>
  </div>
</template>

<script>
import TaskModal from './components/TaskDetailModal.vue'

export default {
  name: "TaskIndex",
  data() {
    return {
      tasks: [],
      status: '',
      isVisibleTaskModal: false,
      taskDetail: {},
    }
  },
  created(){
    this.fetchTasks()
  },
  methods: {
    fetchTasks(){
      this.$axios.get("tasks")
      .then(res => this.tasks = res.data )
      .catch(err => console.log(err.status))
    },
    handleShowTaskDetailModal(task){
      this.isVisibleTaskModal = true
      this.taskDetail = task
    },
    handleCloseTaskModal(){
      this.isVisibleTaskModal = false
      this.taskDetail = {}
    }
  },
  components: {
    TaskModal
  }
}
</script>

<style scoped>
/* vueのtransitionを使わないなら不要 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>