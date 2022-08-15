<template>
  <div :id="'task-detail-modal-' + task.id">
    <!-- こっからモーダル要素 -->
    <div
      class="modal"
      @click.self="handleCloseModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ task.title }}
            </h5>
            <button
              type="button"
              class="close"
              @click="handleCloseModal"
            >
              <span>&times;</span>
            </button>
          </div>
          <div
            v-if="task.description"
            class="modal-body"
          >
            <p>{{ task.description }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success"
              @click="handleShowTaskEditModal"
            >
              編集
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="handleDeleteModal"
            >
              削除
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="handleCloseModal"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 背景 -->
    <div class="l-modal__bg" />
  </div>
</template>

<script>
export default ({
  name: 'TaskDetailModal',
  props:{
    task: {
      type: Object,
      required: true,
      id: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  },
  methods: {
    // 追加
    handleCloseModal(){
      this.$emit("close-modal")
    },
    // 削除
    handleDeleteModal(){
      this.$emit("delete-task", this.task)
    },
    // 編集
    handleShowTaskEditModal(){
      this.$emit("show-edit-modal", this.task)
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