import Vue from 'vue'
import createPersistedState from "vuex-persistedstate";
import Vuex from 'vuex'
import { http } from '../services/api.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: {}
  },
  getters: {
  },
  mutations: {
    USUARIO_LOGADO(state, { token }) {
      state.token = token
    },
    DESLOGAR_USUARIO(state){
      state.token = null
    }
  },
  actions: {
    Login({ commit }, usuario) {
      return new Promise((resolve, reject) => {
        http.post('/login', usuario)
          .then(response => {
            commit('USUARIO_LOGADO', {
              token: response.data.access_token,

            })
            resolve(response.data)
          })
          .catch(erro => {
            reject(erro)
          })
      })
    },
    getUsers() {
      return new Promise((resolve, reject) => {
        http.get(`/users/list`)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})