<template>
  <div class="home">
    <el-button type="info"
               @click="action(1)">登录</el-button>
    <el-button type="info"
               @click="action(2)">注册</el-button>
    <login @close="handleCloseLogin"
           :isShow="isShow"
           :type="type"
           :refer="refer"
           :sales="sales"></login>
  </div>
</template>

<script>
import Login from './modal/login'

export default {
  name: 'home',
  components: {
    Login
  },
  data () {
    return {
      isShow: false,
      type: 1,
      refer: '',
      sales: ''
    }
  },
  methods: {
    handleCloseLogin () {
      this.isShow = false
    },
    async action (type) {
      this.isShow = true
      this.type = type
    },
  },
  created () {
    this.refer = this.$route.query.refer
    this.sales = this.$route.query.growth
    // 好友推荐注册过来显示注册弹框
    if (this.refer || this.sales) {
      this.isShow = true
      this.type = 2
    }
  }
}
</script>

<style lang="scss" scoped>
</style>