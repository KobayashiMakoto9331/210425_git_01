<template>
  <div id="login-form" class="container w-50 text-center">
    <div class="h3 mb-3">
      ログイン
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
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

    <div class="form-group text-left">
      <ValidationProvider rules="required|min:4" v-slot="{ errors }">
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
    <button 
      class="btn btn-primary"
      type="submit"
      @click="handleSubmit(login)"
    >
      ログイン
    </button>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default({
  name: "LoginIndex",
  data(){
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },

  methods: {
    ...mapActions("users", [
      "loginUser",
      "fetchUser",
    ]),
    async login(){
      try{
        await this.loginUser(this.user)
        this.$router.push({name: "TaskIndex"})
      }catch(err){
        console.log(err)
      }
    },
    
  },
})
</script>
