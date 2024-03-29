import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import room from './modules/room'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    room
  },
  getters
})

export default store
