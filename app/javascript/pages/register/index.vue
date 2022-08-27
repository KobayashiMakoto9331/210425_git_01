<template>
  <div id="register-form" class="container w-50 text-center">
    <div class="h3 mb-3">
      ユーザー登録
    </div>

      <ValidationObserver v-slot="{ handleSubmit }">
      <!-- ユーザー名 -->
      <div class="form-group text-left">
        <ValidationProvider mode="passive" rules="required" v-slot="{ errors }">
        <label for="name">ユーザー名</label>
        <input 
          id="name"
          type="text"
          class="form-control"
          placeholder="username"
          v-model="user.name"
          name="名前"
        >
        <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <!-- メールアドレス -->
      <div class="form-group text-left">
        <ValidationProvider mode="passive" rules="required|email" v-slot="{ errors }">
        <label for="email">メールアドレス</label>
        <input 
          id="email"
          type="email"
          class="form-control"
          placeholder="test@example.com"
          v-model="user.email"
          name="メールアドレス"
        >
        <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <!-- パスワード -->
      <div class="form-group text-left">
        <ValidationProvider mode="passive" rules="required|min:4" v-slot="{ errors }">
        <label for="password">パスワード</label>
        <input 
          id="password"
          type="password"
          class="form-control"
          placeholder="password"
          v-model="user.password"
          name="パスワード"
        >
        <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <!-- パスワード (確認用)-->
      <div class="form-group text-left">
        <ValidationProvider mode="passive" rules="required|min:4|password_confirmation:@password" v-slot="{ errors }">
        <label for="password_confirmation">パスワード（確認）</label>
        <input 
          id="password_confirmation"
          type="password"
          class="form-control"
          placeholder="password"
          v-model="user.password_confirmation"
          name="パスワード（確認）"
        >
        <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <button 
        class="btn btn-primary"
        type="submit"
        @click="handleSubmit(register)"
        >
          登録
      </button>
      </ValidationObserver>
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
