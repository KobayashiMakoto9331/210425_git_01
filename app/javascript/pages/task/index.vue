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
      @delete-modal="handleDeleteTaskModal"
      @edit-modal="handleEditTaskModal"
      :task = "taskDetail"
    />
  </transition>

  <!-- 新規タスク -->
  <transition name="fade">
    <TaskCreateModal
      v-if="isVisibleTaskCreateModal" 
      @close-create-modal="handleCloseTaskCreateModal"
      @create-task-post="handleCreateTaskPost"
    />
  </transition>

  <!-- 編集 -->
  <transition name="fade">
    <TaskEditModal
      v-if="isVisibleTaskEditModal" 
      @close-edit-modal="handleCloseTaskEditModal"
      @put-task-modal="handleEditTaskPut"
      :task = "taskDetail"
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
      status: '',
      isVisibleTaskModal: false,
      isVisibleTaskCreateModal: false,
      isVisibleTaskEditModal: false,      
      taskDetail: {},
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
    handleCloseTaskModal(){
      this.isVisibleTaskModal = false
      this.taskDetail = {}
    },
    // タスク削除
    async handleDeleteTaskModal(id){
      try{
        await this.deleteTask(id)
      } catch (error) {
        console.log(error)
      }
      this.handleCloseTaskModal()
    },
    // 新規タスク
    handleShowTaskCreateModal(){
      this.isVisibleTaskCreateModal = true
    },
    handleCloseTaskCreateModal(){
      this.isVisibleTaskCreateModal = false
    },
    async handleCreateTaskPost(task){
      try{
        await this.createTask(task)
        this.handleCloseTaskCreateModal()
      } catch (error) {
        console.log(error)
      }
    },
    // タスク編集
    handleEditTaskModal(task){
      this.handleCloseTaskModal()
      this.isVisibleTaskEditModal = true
      this.taskDetail = task
    },
    handleCloseTaskEditModal(){
      this.isVisibleTaskEditModal = false
      this.taskDetail = {}
    },
    // タスク更新
    async handleEditTaskPut(task){
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