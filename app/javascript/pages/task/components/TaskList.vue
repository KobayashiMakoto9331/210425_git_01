<template>
  <div class="d-flex">
      <div class="col-4 bg-light rounded shadow m-3 p-3">
        <!-- タイトル -->
        <div class="h4"><slot></slot></div>
        <!-- タスク一覧 -->
        <div 
          v-for="task in tasks"
          :key="task.id"
          :id="'task-' + task.id"
          class="bg-white border shadow-sm rounded my-2 p-4 d-flex align-items-center"
          @click="ShowTaskDetailModal(task)"
          >
          <span>{{ task.title }}</span>
        </div>
       
      </div>
    </div>
</template>

<script>

export default {
  props: {
    tasks: {
      type: Array
    }
  },
  methods: {
    // タスク詳細
    ShowTaskDetailModal(task){
      this.$emit("show-detail-modal", task)
    },
  },
}
</script>
