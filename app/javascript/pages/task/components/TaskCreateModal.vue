<template>
  <div id="task-create-modal">
    <!-- こっからモーダル要素 -->
    <div class="modal" @click.self="handleCloseModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <h5 class="modal-title">タイトル</h5>
          <textarea v-model="taskTitle"></textarea>
          <h5 class="modal-title">説明文</h5>
          <textarea v-model="taskDescription"></textarea>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="handleCloseModal">閉じる</button>
            <button type="button" class="btn btn-secondary" @click="createTask">追加</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 背景 -->
    <div class="l-modal__bg"></div>
  </div>
</template>

<script>
export default ({
  name: 'TaskCreateModal',
  data(){
    return {
      taskTitle: '',
      taskDescription: '',
    }
  },
  methods: {
    handleCloseModal(){
      this.$emit("close-create-modal")
    },
    createTask(){
      this.$emit("create-task-post", {
        title: this.taskTitle,
        description: this.taskDescription
        })
    }
  }
})
</script>

<style scoped>
 .modal {
  display: block;
}
.modal-dialog {
  z-index: 1;
}

/* 背景 */
.l-modal__bg {
width: 100%;
height: 100%;
background: rgba(89, 89, 89, 0.6);
position: fixed;
top: 0;
left: 0;
}
</style>