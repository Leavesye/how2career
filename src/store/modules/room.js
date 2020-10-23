const state = {
  orderId: ''
}

const mutations = {
  SET_ROOM: (state, orderId) => {
    state.orderId = orderId
  }
}

const actions = {
  setRoom ({ commit }, orderId) { 
    commit('SET_ROOM', orderId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
