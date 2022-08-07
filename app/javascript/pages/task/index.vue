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
          class="bg-white border shadow-sm rounded my-2 p-4 d-flex align-items-center"
          @click="handleShowTaskDetailModal(task)"
          >
          <span>{{ task.title }}</span>
        </div>
        <!-- タスク追加 -->
        <button 
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
      @close-modal="handleCloseTaskDetailModal"
      @delete-task="handleDeleteTask"
      @show-edit-modal="handleShowTaskEditModal"
      :task = "taskDetail"
    />
  </transition>

  <!-- 新規タスク -->
  <transition name="fade">
    <TaskCreateModal
      v-if="isVisibleTaskCreateModal" 
      @close-create-modal="handleCloseTaskCreateModal"
      @create-task-post="handleCreateTask"
    />
  </transition>

  <!-- 編集 -->
  <transition name="fade">
    <TaskEditModal
      v-if="isVisibleTaskEditModal" 
      @close-modal="handleCloseTaskEditModal"
      @update-task="handleUpdateTask"
      :task = "taskEdit"
    />
  </transition>
  </div>
</template>

<script>
import TaskModal from './components/TaskDetailModal.vue'
import TaskCreateModal from './components/TaskCreateModal.vue'
import TaskEditModal from './components/TaskEditModal.vue'
import { mapGetters, mapActions } from "vuex"

export default {
  name: "TaskIndex",
  data() {
    return {
      taskDetail: {},
      status: '',
      isVisibleTaskModal: false,
      isVisibleTaskCreateModal: false,
      isVisibleTaskEditModal: false,      
      taskEdit: {}
    }
  },
  created(){
    this.fetchTasks()
  },
  methods: {
    // タスクの全情報取得
    ...mapActions([
      "fetchTasks",
      "createTask",
      "deleteTask",
      "updateTask"
    ]),
    // タスク詳細
    handleShowTaskDetailModal(task){
      this.isVisibleTaskModal = true
      this.taskDetail = task
    },
    handleCloseTaskDetailModal(){
      this.isVisibleTaskModal = false
      this.taskDetail = {}
    },
    // タスク削除
    async handleDeleteTask(task){
      try{
        await this.deleteTask(task)
        this.handleCloseTaskDetailModal()
      } catch (error) {
        console.log(error)
      }
    },
    // 新規タスク
    handleShowTaskCreateModal(){
      this.isVisibleTaskCreateModal = true
    },
    handleCloseTaskCreateModal(){
      this.isVisibleTaskCreateModal = false
    },
    async handleCreateTask(task){
      try{
        await this.createTask(task)
        this.handleCloseTaskCreateModal()
      } catch (error) {
        console.log(error)
      }
    },
    // タスク編集
    handleShowTaskEditModal(task){
      this.taskEdit = Object.assign({}, task)
      this.handleCloseTaskDetailModal()
      this.isVisibleTaskEditModal = true
    },
    handleCloseTaskEditModal(){
      this.isVisibleTaskEditModal = false
      this.taskEdit = {}
    },
    // タスク更新
    async handleUpdateTask(task){
      try{
        await this.updateTask(task)
        this.handleCloseTaskEditModal()
      } catch (error){
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters(["tasks"])
  },
  components: {
    TaskModal,
    TaskCreateModal,
    TaskEditModal
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