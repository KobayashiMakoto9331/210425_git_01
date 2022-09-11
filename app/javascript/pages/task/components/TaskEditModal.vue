<template>
  <div :id="'task-edit-modal-' + task.id">
    <!-- こっからモーダル要素 -->
    <div
      class="modal"
      @click.self="handleCloseModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- モーダル -->
          <div class="modal-body">
            <ValidationObserver v-slot="{handleSubmit}">
              <!-- タイトル -->
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:50"
                >
                  <label for="title">タイトル</label>
                  <input 
                    id="title"
                    v-model="task.title"
                    type="text"
                    class="form-control"
                    name="タイトル"
                  >
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <!-- 説明文 -->
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="max:500"
                >
                  <label for="description">説明文</label>
                  <textarea 
                    id="description"
                    v-model="task.description"
                    class="form-control"
                    rows="5"
                    name="説明文"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <!-- ステータス -->
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                >
                  <label for="status">ステータス</label>
                  <select 
                    id="status"
                    v-model="task.status"
                    class="form-control"
                    name="ステータス"
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
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
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
                  @click="handleSubmit(handleUpdateTask)"
                >
                  更新
                </button>
              </div>
            </ValidationObserver>
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
  name: 'TaskEditModal',
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
      },
      status: {
        type: String,
        required: true
      }
    }
  },
  methods: {
    // モーダルを閉じる
    handleCloseModal(){
      this.$emit("close-modal")
    },
    // 編集送信
    handleUpdateTask(){
      this.$emit("update-task", this.task)
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