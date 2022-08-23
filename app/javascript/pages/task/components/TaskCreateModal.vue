<template>
  <div id="task-create-modal">
    <!-- こっからモーダル要素 -->
    <div
      class="modal"
      @click.self="handleCloseModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- モーダル -->
          <div class="modal-body">
            <!-- タイトル -->
            <div class="form-group">
              <label for="title">タイトル</label>
              <input 
                id="title"
                v-model="task.title"
                type="text"
                class="form-control"
              >
            </div>
            <!-- 説明文 -->
            <div class="form-group">
              <label for="description">説明文</label>
              <textarea 
                id="description"
                v-model="task.description"
                class="form-control"
                rows="5"
              />
            </div>
            <!-- ステータス -->
            <div class="form-group">
              <label for="status">ステータス</label>
              <select 
                id="status"
                v-model="task.status"
                class="form-control"
              >
                <option value="todo">
                  TODO
                </option>
                <option value="doing">
                  DOING
                </option>
                <option value="done">
                  DONE
                </option>
              </select>
            </div>
            <!-- ボタン -->
            <div class="d-flex justify-content-between">
              <button
                class="btn btn-secondary"
                @click="handleCloseModal"
              >
                閉じる
              </button>
              <button
                class="btn btn-success"
                @click="handleCreateTask"
              >
                追加
              </button>
            </div>
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
  name: 'TaskCreateModal',
  props: {
    authUserTaskId: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      task: {
        title: '',
        description: '',
        status: '',
        user_id: this.authUserTaskId
      },
    }
  },
  methods: {
    // モーダルを閉じる
    handleCloseModal(){
      this.$emit("close-create-modal")
    },
    // タスク送信
    handleCreateTask(){
      this.$emit("create-task-post", this.task)
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