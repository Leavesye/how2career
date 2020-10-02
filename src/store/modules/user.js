import Cookies from 'js-cookie'

const getDefaultState = () => { 
  const user = Cookies.get('user')
  return {
    nickName: (user && user.nickName) || '',
    avatar: (user && user.avatar) || '',
    mobile: (user && user.role) || '',
    role: (user && user.role) || 'consumer',
  }
}
const state = getDefaultState()

const mutations = {
  SET_USER: (state, user) => {
    state.role = user.role
    state.mobile = user.mobile
    Cookies.set('user', user)
  }
}

const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
