import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
// import user from 'mock/user'

const state = {
  token: getToken(),
  userName: Cookies.get('userName'),
  nickName: Cookies.get('nickName'),
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
      login({ userName, passWord }).then(res => {
        if (res.result) { 
          const data = res.msg
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          commit('SET_ROLE', role)
          commit('SET_USERNAME', userName)
          commit('SET_USERID', data.id)
          
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
    commit('SET_USERID', '')
    removeToken()
    Cookies.remove('token')
    Cookies.remove('userName')
    Cookies.remove('nickName')
    Cookies.remove('avatar')
    Cookies.remove('role')
    Cookies.remove('userId')
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
    info.avatar && commit('SET_AVATAR', process.env.VUE_APP_HOST_NAME + info.avatar)
    info.userName && commit('SET_USERNAME', info.userName)
    info.role && commit('SET_ROLE', info.role)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
