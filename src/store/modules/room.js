const state = {
  room: {}
}

const mutations = {
  SET_ROOM: (state, room) => {
    state.room = room
  }
}

const actions = {
  setRoom ({ commit }, room) { 
    commit('SET_ROOM', room)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
