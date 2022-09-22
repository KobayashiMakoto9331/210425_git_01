import axios from '../../plugins/axios'

const state = {
  authUser: null
}

const getters =  {
  authUser: state => state.authUser
}

const mutations = {
  setUser: (state, user) => {
    state.authUser = user
  }
}

const actions = {
  async loginUser({ commit }, user) {
    // ログイン
    const sessionsResponse = await axios.post('sessions', user)
    localStorage.auth_token = sessionsResponse.data.token
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.auth_token}`

    // ログインユーザー情報の取得
    const userResponse = await axios.get('users/me')
    commit('setUser', userResponse.data)
  },
  logoutUser({ commit }) {
    // ログアウト
    localStorage.removeItem('auth_token')
    axios.defaults.headers.common['Authorization'] = ''
    commit('setUser', null)
  },
  // 認証済みのユーザーを取得
  async fetchAuthUser({ commit, state }) {
    console.log('認証済みユーザーを取得')
    if (!localStorage.auth_token) return null
    if (state.authUser) return state.authUser

    const userResponse = await axios.get('users/me')
      .catch((err) => {
        return null
      })
    if (!userResponse) return null

    const authUser = userResponse.data
    if (authUser) {
      console.log(userResponse)
      commit('setUser', authUser)
      return authUser
    } else {
      commit('setUser', null)
      return null
    }
  },

  // プロフィール画像アップロード
  updateUser({ commit, state }, user){
    console.log('storeのアクションに入った')
    // axios.patch(`profile/${state.authUser.id}`, user)
    axios.patch(`profile`, user)
    .then(res => {
      console.log(res.data)
      commit(`setUser`, res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}