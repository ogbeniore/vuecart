import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    response: {
      type: '',
      message: ''
    },
    token: ''
  },
  getters: {
    currentStatus: state => state.status,
    apiResponse: state => state.response,
    userToken: state => state.token
  },
  mutations: {
    changeStatus: (state, payload) => {
      state.status = payload
    },
    setResponse: (state, payload) => {
      state.response = {
        type: payload.type,
        message: payload.message
      }
    },
    saveToken: (state, payload) => {
      state.token = payload
    }
  },
  actions: {
    signUp({commit}, userData) {
      commit('changeStatus', 'pending')
      axios.post('https://guarded-tor-02806.herokuapp.com/api/user/signup', userData)
        .then(response => {
          let responseObject = {
            type: 'success',
            message: response.data.message
          }
          commit('setResponse', responseObject)
          commit('changeStatus', 'success')
        })
        .catch(error => {
          let responseObject = {
            type: 'failure',
            message: error.response.data.message
          }
          commit('setResponse', responseObject)
          commit('changeStatus', 'failure')
        })
    },
    loginAction({ commit }, userData) {
      commit('changeStatus', 'pending')
      axios.post('https://guarded-tor-02806.herokuapp.com/api/user/login', userData)
        .then(response => {
          let responseObject = {
            type: 'success',
            message: response.data.message
          }
          commit('setResponse', responseObject)
          commit('changeStatus', 'success')
          commit('saveToken', response.data.token)
        })
        .catch(error => {
          let responseObject = {
            type: 'failure',
            message: error.response.data.message
          }
          commit('setResponse', responseObject)
          commit('changeStatus', 'failure')
        })
    }
  },
  plugins: [vuexLocal.plugin]
})
