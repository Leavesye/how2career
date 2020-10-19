<template>
  <section style="padding: 30px">
    <h1>如何推荐好友</h1>
    <p>可以用以下的方法推荐给你的好友</p>
    <el-image src=""></el-image>
    <section class="flex-hb">
      <div class="left">
        <el-image src=""></el-image>
        <p>将此二维码分享给朋友</p>
        <p>朋友通过扫描此二维码进行注册</p>
        <div class="qrcode"
            ref="qrCodeUrl"></div>
        <el-image src=""></el-image>
      </div>
      <div class="right">
        <el-image src=""></el-image>
        <p>你用微信扫描自己的推荐码后</p>
        <p>显示注册界面</p>
        <p>然后点击右上角分享给微信好友/朋友圈/QQ</p>
        <el-image src=""></el-image>
      </div>
    </section>
    <el-image src=""></el-image>
    <el-card>
      <p>将此链接复制发送给你好友进行注册</p>
      <div class="flex">
        <input id="copyInput" :value="url" />
        <el-button type="success" @click="handleCopy">复制</el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'

export default {
   computed: {
     url: function() {
       return `${process.env.VUE_APP_HOST_NAME}register/consumer?refer=${this.user.userId}`
     },
    ...mapGetters([
      'user'
    ])
  },
  created() {
    const qrcode = new QRCode(this.$refs.qrCodeUrl, {
      text: this.url,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    })
  },
  methods: {
    handleCopy() {
      const obj = document.getElementById("copyInput")
      obj.select()
      document.execCommand("copy")
      setTimeout(() => {
        this.alert('复制链接成功！')
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
