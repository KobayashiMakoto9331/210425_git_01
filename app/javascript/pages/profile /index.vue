<template>
  <div id="login-form" class="container w-50 text-center">
    <div class="h3 mb-3">
      プロフィール編集
    </div>
    
    <!-- ユーザー名 -->
    <div class="form-group text-left">
      <label for="name">ユーザー名</label>
      <input
        id="name"
        type="text"
        class="form-control"
        placeholder="username"
        v-model="user.name"
      >
    </div>

    <!-- プロフィール画像 -->
    <div class="form-group text-left">
      <label for="image">プロフィール画像</label>
      <img :src="user.avatar_url" class="my-3" width="150px">
      <input 
        type="file"
        id="image"
        name="image"
        accept="image/png,image/jpeg"
        @change="handleChange" 
      />
    </div>

    <!-- ボタン -->
    <button 
      class="btn btn-primary"
      type="submit"
      @click="upload"
    >
      更新
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default({
  name: "ProfileIndex",
  data() {
    return {
      user: {
        name: "",
        avatar_url: ""
      },
      uploadAvatar: ""
    }
  },
  computed: {
    ...mapGetters('users', ["authUser"]),
  },

  created() {
    this.user = Object.assign({}, this.authUser)
  },
   methods: {
     ...mapActions('users', ['updateUser']),
    // 画像添付時に発火 
    // 定数に値を入れる
    handleChange(event) {
      console.log(event)
      // e.preventDefault();
      this.uploadAvatar = event.target.files[0];
    },
    // 送信
    upload() {
      const formData = new FormData();
      formData.append("user[name]", this.user.name);
      if (this.uploadAvatar) {
        formData.append("user[avatar]", this.uploadAvatar);
      }
      console.log('コンポーネントでアクションを叩く前')
      this.updateUser(formData);
      // this.resetForm();
    },
    // resetForm() {
    //   this.title = "";
    //   this.imageFile = null;
    // }
   }
})
</script>
