import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
// import user from 'mock/user'

const state = {
  token: getToken(),
  userName: Cookies.get('userName'),
  nickName: Cookies.get('nickName'),
  completion: +Cookies.get('completion'),
  avatar: Cookies.get('avatar'),
  role: Cookies.get('role'),
  userId: Cookies.get('userId')
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
  SET_COMPLETION: (state, completion) => {
    state.completion = completion
    Cookies.set('completion', completion)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
    Cookies.set('avatar', avatar)
  },
  SET_ROLE: (state, role) => {
    state.role = role
    Cookies.set('role', role)
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
    Cookies.set('userId', userId)
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
      commit('SET_ROLE', role)
      login({ userName, passWord }).then(res => {
        if (res.result) { 
          const data = res.msg
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          commit('SET_USERNAME', userName)
          commit('SET_USERID', data.id)
          commit('SET_AVATAR', data.avatarImage)
          commit('SET_NICKNAME', data.nickName)
          commit('SET_COMPLETION', data.completion)
          
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
          commit('SET_AVATAR', data.avatarImage)
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
    commit('SET_COMPLETION', '')
    commit('SET_AVATAR', '')
    commit('SET_USERID', '')
    removeToken()
    Cookies.remove('token')
    Cookies.remove('userName')
    Cookies.remove('nickName')
    Cookies.remove('avatar')
    Cookies.remove('role')
    Cookies.remove('userId')
    Cookies.remove('completion')
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
    info.nickName && commit('SET_NICKNAME', info.nickName)
    info.avatar && commit('SET_AVATAR', info.avatar)
    info.userName && commit('SET_USERNAME', info.userName)
    info.role && commit('SET_ROLE', info.role)
    info.completion && commit('SET_COMPLETION', info.completion)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
