<template>
  <div class="container-fluid">
    <!-- 検索機能 -->
    <div class="search" id="search-form">
      <label for="search">絞り込み</label>
      <input
        placeholder="タスク名を入力してください"
        class="form-control"
        id="search"
        type="text"
        v-model="searchTask"
        v-on:keyup="filterTasks"
      >
    </div>

    <!-- タスクリスト -->
    <div class="row">
      <TaskList
        :tasks="todoTasks"
        task-list-id="todo-list"
        @handleShowTaskDetailModal="handleShowTaskDetailModal"
      >
        <template v-slot:header>
          <div class="h4">
            TODO
          </div>
        </template>
      </TaskList>

      <TaskList
        :tasks="doingTasks"
        task-list-id="doing-list"
        @handleShowTaskDetailModal="handleShowTaskDetailModal"
      >
        <template v-slot:header>
          <div class="h4">
            DOING
          </div>
        </template>
      </TaskList>

      <TaskList
        :tasks="doneTasks"
        task-list-id="done-list"
        @handleShowTaskDetailModal="handleShowTaskDetailModal"
      >
        <template v-slot:header>
          <div class="h4">
            DONE
          </div>
        </template>
      </TaskList>
    </div>
    <!-- タスク一覧 -->
    

    <!-- ボタン -->
    <div class="text-center">
      <!-- タスク追加 -->
      <button 
        class="btn btn-secondary"
        @click="handleShowTaskCreateModal()"
      >
        タスクを追加
      </button>

      <!-- 戻る -->
      <div class="text-center">
        <router-link
          :to="{ name: 'TopIndex' }"
          class="btn btn-dark mt-5"
        >
          戻る
        </router-link>
      </div>
    </div>

    <!-- タスク詳細 -->
    <transition name="fade">
      <TaskDetailModal
        v-if="isVisibleTaskModal" 
        :task="taskDetail"
        :auth-user = "this.authUser"
        @close-modal="handleCloseTaskDetailModal"
        @delete-task="handleDeleteTask"
        @show-edit-modal="handleShowTaskEditModal"
      />
    </transition>


    <!-- 新規タスク -->
    <transition name="fade">
      <TaskCreateModal
        v-if="isVisibleTaskCreateModal" 
        :auth-user-task-id = "this.authUser.id"
        @close-create-modal="handleCloseTaskCreateModal"
        @create-task-post="handleCreateTask"
      />
    </transition>

    <!-- 編集 -->
    <transition name="fade">
      <TaskEditModal
        v-if="isVisibleTaskEditModal" 
        :task="taskEdit"
        @close-modal="handleCloseTaskEditModal"
        @update-task="handleUpdateTask"
      />
    </transition>
  </div>
</template>

<script>
import TaskDetailModal from './components/TaskDetailModal.vue'
import TaskCreateModal from './components/TaskCreateModal.vue'
import TaskEditModal from './components/TaskEditModal.vue'
import TaskList from './components/TaskList.vue'
import { mapGetters, mapActions } from "vuex"

export default {
  name: "TaskIndex",
   components: {
    TaskList,
    TaskDetailModal,
    TaskCreateModal,
    TaskEditModal,
  },
  data() {
    return {
      taskDetail: {},
      status: '',
      isVisibleTaskModal: false,
      isVisibleTaskCreateModal: false,
      isVisibleTaskEditModal: false,
      taskEdit: {},
      searchTask: '',
    }
  },
  computed: {
    ...mapGetters('tasks', ["tasks"]),
    ...mapGetters('users', ["authUser"]),
    
    todoTasks(){
      return this.tasks.filter(task => {
        return task.status == "todo"
      })
    },
    doingTasks(){
      return this.tasks.filter(task => {
        return task.status == "doing"
      })
    },
    doneTasks(){
      return this.tasks.filter(task => {
        return task.status == "done"
      })
    }
  },
  created(){
    console.log('===========created')
    this.fetchTasks()
    console.log(this.au)
  },
  methods: {
    // タスクの全情報取得
    ...mapActions('tasks', {
      fetchTasks: "fetchTasks",
      createTask: "createTask",
      deleteTask: "deleteTask",
      updateTask: "updateTask",
      filterTask: "filterTask"
    }),
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
    },

    // タスク検索
    filterTasks(){
      this.filterTask(this.searchTask)
    }
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
.search {
  margin-top: 20px;
}
</style>