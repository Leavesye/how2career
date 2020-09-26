<template>
  <div class="home">
    <el-button type="info" @click="login">登入/注册</el-button>
    <login :isShow="true"></login>
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
      
    }
  },
  methods: {
    login() {

    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>

</style>
