import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
// import user from 'mock/user'

const state = {
  token: getToken(),
  userName: Cookies.get('userName'),
  nickName: Cookies.get('nickName'),
  name: Cookies.get('name'),
  idCard: Cookies.get('idCard'),
  completion: +Cookies.get('completion'),
  avatar: Cookies.get('avatar'),
  role: Cookies.get('role'),
  userId: Cookies.get('userId'),
  sales: Cookies.get('sales'),
  refer: Cookies.get('refer'),
  status: Cookies.get('status'),
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
    Cookies.set('userName', userName)
  },
  SET_NICKNAME: (state, nickName) => {
    state.nickName = nickName
    Cookies.set('nickName', nickName)
  },
  SET_IDCARD: (state, idCard) => {
    state.idCard = idCard
    Cookies.set('idCard', idCard)
  },
  SET_NAME: (state, name) => {
    state.name = name
    Cookies.set('name', name)
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
  },
  SET_SALES: (state, sales) => {
    state.sales = sales
    Cookies.set('sales', sales)
  },
  SET_REFER: (state, refer) => {
    state.refer = refer
    Cookies.set('refer', refer)
  },
  SET_STATUS: (state, status) => {
    state.status = status
    Cookies.set('status', status)
  },
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
          commit('SET_NAME', data.name)
          commit('SET_IDCARD', data.idCard)
          commit('SET_COMPLETION', data.completion)
          commit('SET_STATUS', data.backgroundVerifyStatus)
          if (data.refer) {
            commit('SET_REFER', data.refer)
          }
          if (data.sales) {
            commit('SET_SALES', data.sales)
          }
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
    // commit('SET_ROLE', '')
    commit('SET_USERNAME', '')
    commit('SET_NICKNAME', '')
    commit('SET_NAME', '')
    commit('SET_IDCARD', '')
    commit('SET_COMPLETION', '')
    commit('SET_AVATAR', '')
    commit('SET_USERID', '')
    commit('SET_SALES', '')
    commit('SET_STATUS', '')
    removeToken()
    Cookies.remove('token')
    Cookies.remove('userName')
    Cookies.remove('nickName')
    Cookies.remove('name')
    Cookies.remove('idCard')
    Cookies.remove('avatar')
    Cookies.remove('role')
    Cookies.remove('userId')
    Cookies.remove('completion')
    Cookies.remove('sales')
    Cookies.remove('status')
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
    info.idCard && commit('SET_IDCARD', info.idCard)
  },
  setQyuser({ commit }, info) {
    info.sales && commit('SET_SALES', info.sales)
    info.token && commit('SET_TOKEN', info.token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
