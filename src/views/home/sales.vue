<template>
  <div class="home">
    <svg-icon icon-class="logo" class="logo"></svg-icon>
    <div class="qr-code">
      <div id="wx_reg"></div>
    </div>
    <foot-bar class="footbar" />
  </div>
</template>

<script>
import FootBar from '@/layout/components/FootBar'

export default {
  components: { FootBar },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    // https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=wwe25bfa14f100edbe&agentid=1000004&redirect_uri=https://intocareer.cn/api/sales/qywx/returnLogin&state=STATE
    window.WwLogin({
      "id" : "wx_reg",  
      "appid" : "wwe25bfa14f100edbe",
      "agentid" : "1000004",
      "redirect_uri" : `${process.env.VUE_APP_SALES_HOST_NAME}/sales/qylogin`,
      "state" : "STATE",
      "href" : `${process.env.VUE_APP_SALES_HOST_NAME}/qy-reset.css`,
    });
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  background-image: linear-gradient(#3464ae, #41ab83);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
}
.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 125px;
  height: 40px;
  cursor: pointer;
}
.qr-code {
  margin-top: 100px;
  width: 300px;
  height: 400px;
  margin-top: 100px;
}
.impowerBox .title {
  color: #fff;
}
.footbar {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>