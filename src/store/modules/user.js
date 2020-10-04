import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
// import user from 'mock/user'

const state = {
  token: getToken(),
  userName: Cookies.get('userName'),
  nickName: Cookies.get('nickName'),
  avatar: Cookies.get('avatar'),
  role: Cookies.get('role')
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
    Cookies.set('userName', userName)
  },
  SET_NICKNAME: (state, nickName) => {
    state.nickName = nickName
    Cookies.set('nickName', nickName)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
    Cookies.set('avatar', avatar)
  },
  SET_ROLE: (state, role) => {
    state.role = role
    Cookies.set('role', role)
  }
}

const actions = {
  setUser ({ commit }, info) { 
    const { role, userName } = info
    commit('SET_ROLE', role)
    commit('SET_USERNAME', userName)
  },
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const { userName, passWord, role } = userInfo
      login({ userName, passWord }).then(res => {
        if (res.result) { 
          const data = res.msg
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          commit('SET_ROLE', role)
          commit('SET_USERNAME', userName)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        if (res.result) { 
          const { publicInfo } = res.msg
          const { nickName, avatarImage }  = publicInfo
          commit('SET_NICKNAME', nickName)
          commit('SET_AVATAR', `${process.env.VUE_APP_HOST_NAME}${avatarImage}`)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  loginout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLE', '')
    commit('SET_USERNAME', '')
    commit('SET_NICKNAME', '')
    commit('SET_AVATAR', '')
    removeToken()
    ['token', 'userName', 'nickName', 'avatar', 'role'].forEach(key => { 
      Cookies.remove(key)
    })
    location.href = '/'
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  setRole({ commit }, role) {
    commit('SET_ROLE', role)
  },
  setUser({ commit }, info) {
    commit('SET_NICKNAME', info.nickName)
    commit('SET_AVATAR', process.env.VUE_APP_HOST_NAME + info.avatar)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
