<template>
  <div class="home">
    <el-button type="info"
               @click="action(1)">登录</el-button>
    <el-button type="info"
               @click="action(2)">注册</el-button>
    <login @close="handleCloseLogin"
           :isShow="isShow"
           :type="type"></login>
  </div>
</template>

<script>

import { createOrder } from '@/api/order'
import { setToken } from '@/utils/auth'
import Login from './modal/login'

export default {
  name: 'home',
  components: {
    Login
  },
  data () {
    return {
      isShow: false,
      type: 1
    }
  },
  methods: {
    handleCloseLogin () {
      this.isShow = false
    },
    async action (type) {
      // const res = await login({
      //   "userName": "18602113265",
      //   "passWord": "123"
      // })
      // setToken(res.msg.token)
      // const ret = await getUserInfo()
      this.isShow = true
      this.type = type
    },
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>