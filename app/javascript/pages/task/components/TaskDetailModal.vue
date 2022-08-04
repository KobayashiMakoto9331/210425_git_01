<template>
  <div :id="'task-detail-modal-' + task.id">
    <!-- こっからモーダル要素 -->
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{task.title}}</h5>
            <button type="button" class="close" @click="handleCloseModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="task.description">
            <p>{{task.description}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="handleCloseModal">閉じる</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 背景 -->
    <div class="l-modal__bg" v-on:click="task_detail_modal=false"></div>
  </div>
</template>

<script>
export default ({
  name: 'TaskDetailModal',
  data(){
    return {
      task_detail_modal: false,
    }
  },
  props:{
    task: {
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
    handleCloseModal(){
      this.$emit("close-modal")
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