<template>
  <div id="register-form" class="container w-50 text-center">
    <div class="h3 mb-3">
      ユーザー登録
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
      <!-- メールアドレス -->
      <div class="form-group text-left">
        <label for="email">メールアドレス</label>
        <input 
          id="email"
          type="email"
          class="form-control"
          placeholder="test@example.com"
          v-model="user.email"
        >
      </div>
      <!-- パスワード -->
      <div class="form-group text-left">
        <label for="password">パスワード</label>
        <input 
          id="password"
          type="password"
          class="form-control"
          placeholder="password"
          v-model="user.password"
        >
      </div>
      <!-- パスワード (確認用)-->
      <div class="form-group text-left">
        <label for="password_confirmation">パスワード（確認）</label>
        <input 
          id="password_confirmation"
          type="password"
          class="form-control"
          placeholder="password"
          v-model="user.password_confirmation"
        >
      </div>

      <button 
        class="btn btn-primary"
        type="submit"
        @click="register"
        >
          登録
      </button>
  </div>
</template>

<script>
export default({
  name: "RegisterIndex",
  data(){
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    register(){
      this.$axios.post('/users', { user: this.user })
      .then(res => {
          // console.log(response.data)
          this.$router.push({ name: 'LoginIndex' });
        })
        .catch(err => {
          console.log('新規登録できんかった');
          console.log(err)
        });
    },
    
  },
})

</script>
