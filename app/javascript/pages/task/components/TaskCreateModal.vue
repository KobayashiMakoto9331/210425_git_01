<template>
  <div id="task-create-modal">
    <!-- こっからモーダル要素 -->
    <div class="modal" @click.self="handleCloseModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- モーダル -->
          <div class="modal-body">
            <!-- タイトル -->
            <div class="form-group">
              <label for="title">タイトル</label>
              <input 
                type="text"
                class="form-control"
                id="title"
                v-model="task.title"
              >
            </div>
            <!-- 説明文 -->
            <div class="form-group">
              <label for="description">説明文</label>
              <textarea 
                class="form-control"
                id="description"
                rows="5"
                v-model="task.description"
              ></textarea>
            </div>
            <!-- ステータス -->
            <div class="form-group">
              <label for="status">ステータス</label>
              <select 
                class="form-control"
                id="status"
                v-model="task.status"
              >
                <option value="todo">TODO</option>
                <option value="doing">DOING</option>
                <option value="done">DONE</option>
              </select>
            </div>
            <!-- ボタン -->
            <div class="d-flex justify-content-between">
              <button class="btn btn-secondary" @click="handleCloseModal">閉じる</button>
              <button class="btn btn-success" @click="handleCreateTask">追加</button>
            </div>
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
      task: {
        title: '',
        description: '',
        status: ''
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