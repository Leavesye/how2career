import Cookies from 'js-cookie'

const getDefaultState = () => { 
  return {
    name: '',
    avatar: '',
    role: Cookies.get('role') || 'consumer',
  }
}
const state = getDefaultState()

const mutations = {
  SET_ROLE: (state, role) => {
    state.role = role
    Cookies.set('role', role)
  }
}

const actions = {
  setRole({ commit }, role) {
    commit('SET_ROLE', role)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
