<template>
  <div>
    <div class="d-flex">
      <div class="col-4 bg-light rounded shadow m-3 p-3">
        <!-- タイトル -->
        <div class="h4">TODO</div>
        <!-- タスク一覧 -->
        <div 
          v-for="task in tasks"
          :key="task.id"
          :id="'task-' + task.id"
          class="bg-white border shadow-sm rounded my-2 p-4"
          @click="handleShowTaskDetailModal(task)"
          >
          <span>{{ task.title }}</span>
        </div>
        <!-- タスク追加 -->
        <button 
          type="button"
          class="btn btn-secondary"
          @click="handleShowTaskCreateModal()"
          >タスクを追加
        </button>
      </div>
    </div>
    <div class="text-center">
      <router-link :to="{ name: 'TopIndex' }" class="btn btn-dark mt-5">戻る</router-link>
    </div>

  <!-- タスク詳細 -->
  <transition name="fade">
    <TaskModal
      v-if="isVisibleTaskModal" 
      @close-modal="handleCloseTaskModal"
      :task = "taskDetail"
    />
  </transition>

  <!-- 新規タスク -->
  <transition name="fade">
    <TaskCreateModal
      v-if="isVisibleTaskCreateModal" 
      @close-create-modal="handleCloseTaskCreateModal"
      @create-task-post="createTaskPost"
    />
  </transition>
  </div>
</template>

<script>
import TaskModal from './components/TaskDetailModal.vue'
import TaskCreateModal from './components/TaskCreateModal.vue'

export default {
  name: "TaskIndex",
  data() {
    return {
      tasks: [],
      status: '',
      isVisibleTaskModal: false,
      isVisibleTaskCreateModal: false,
      taskDetail: {},
    }
  },
  created(){
    this.fetchTasks()
  },
  methods: {
    // タスクの全情報取得
    fetchTasks(){
      this.$axios.get("/tasks")
      .then(res => this.tasks = res.data )
      .catch(err => console.log(err.status))
    },
    // タスク詳細
    handleShowTaskDetailModal(task){
      this.isVisibleTaskModal = true
      this.taskDetail = task
    },
    handleCloseTaskModal(){
      this.isVisibleTaskModal = false
      this.taskDetail = {}
    },
    // 新規タスク
    handleShowTaskCreateModal(){
      this.isVisibleTaskCreateModal = true
    },
    handleCloseTaskCreateModal(){
      this.isVisibleTaskCreateModal = false
    },
    createTaskPost(task){
      this.$axios.post('/tasks', {title: task.title, description: task.description})
      .then(res=>{
        console.log(res)
        this.handleCloseTaskCreateModal()
        this.fetchTasks()
      })
    },
  },
  computed: {
    
  },
  components: {
    TaskModal,
    TaskCreateModal
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