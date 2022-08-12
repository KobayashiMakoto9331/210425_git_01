<template>
  <div>
    <div>
      タスク数: {{this.tasks.length}}
    </div>
    <!-- タスク一覧 -->
    <TaskList
      :tasks="this.todoList"
      @show-detail-modal="handleShowTaskDetailModal"
      id="todo-list"
    >
    TODO
    </TaskList>

    <TaskList
      :tasks="this.doingList"
      @show-detail-modal="handleShowTaskDetailModal"
      id="doing-list"
    >
    DOING
    </TaskList>

    <TaskList
      :tasks="this.doneList"
      @show-detail-modal="handleShowTaskDetailModal"
      id="done-list"
      >
    DONE
    </TaskList>

    <!-- タスク追加 -->
    <button 
      class="btn btn-secondary"
      @click="handleShowTaskCreateModal()"
      >タスクを追加
    </button>

    <!-- 戻る -->
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
import TaskList from './components/TaskList.vue'
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
    console.log('===========created')
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
    ...mapGetters(["tasks", "todoList", "doingList", "doneList"])
  },
  components: {
    TaskModal,
    TaskCreateModal,
    TaskEditModal,
    TaskList
  },
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