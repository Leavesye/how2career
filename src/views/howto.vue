<template>
  <section style="padding: 30px">
    <h1 class="title">如何推荐好友</h1>
    <p class="desc">可以用以下的方法推荐给你的好友</p>
    <el-image class="mobile-icon" :src="mobileIcon"></el-image>
    <section class="flex-hb main">
      <div class="left">
        <section class="inner">
          <p>将此二维码分享给朋友</p>
          <p>朋友通过扫描此二维码进行注册</p>
          <div class="qrcode"
              ref="qrCodeUrl"></div>
        </section>
      </div>
      <div class="right">
        <section class="inner">
          <p>显示注册界面</p>
          <p>然后点击右上角分享给微信好友/朋友圈/QQ</p>
          <p>你用微信扫描自己的推荐码后</p>
        </section>
      </div>
    </section>
    <el-image  class="pc-icon" :src="pcIcon"></el-image>
    <el-card style="padding-bottom: 40px;">
      <p class="copy-desc">将此链接复制发送给你好友进行注册</p>
      <div class="flex-hvc">
        <input class="copy-input" id="copyInput" :value="url" readonly="readonly"/>
        <el-button style="width: 90px;" type="success" @click="handleCopy">复制</el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'
import tool from '@/utils/tool'

export default {
   computed: {
     url: function() {
      let query = ''
      const { path } = this.$route
      const { refer, sales, userId } = this.user
      // 咨询者分享
      if (path == '/consumer/howto') {
          query = tool.getShareQuery(refer, sales, userId)
       } else { // 销售分享
         query = `growth=${sales}`
       }
       return `${process.env.VUE_APP_HOST_NAME}/home?${query}`
     },
     pcIcon: function() {
       return require('@/assets/pc-icon.png')
     },
     mobileIcon: function() {
       return require('@/assets/m-icon.png')
     },
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
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
.title {
  font-size: 32px;
  color: #15479E;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
}
.desc {
  text-align: center;
  font-size: 18px;
  color: #36AE82;
  margin-bottom: 30px;
}
.mobile-icon,.pc-icon  {
  width: 80px;
  height: 80px;
  display: block;
  margin: 0 auto;
  margin-bottom: 30px;
}
.main {
  margin-bottom: 30px;
}
.left,
.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 430px;
  height: 894px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E0E0E0;
}
.left {
  background-image: url('../assets/howto-1.png');
}
.right {
  background-image: url('../assets/howto-2.png');
}
.left .inner,
.right .inner {
  font-size: 16px;
  color: #7C8EA5;
  margin: 0 auto;
  margin-top: 183px;
  text-align: center;
}
.right .inner {
  margin-top: 166px
}
.qrcode {
  width: 180px;
  height: 180px;
  margin: 0 auto;
  margin-top: 40px;
}
.copy-desc {
  text-align: center;
  font-size: 16px;
  color: #7C8EA5;
  margin-top: 10px;
  margin-bottom: 30px;
}
.copy-input {
  width: 540px;
  height: 40px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  margin-right: 20px;
  text-align: center;
}
.copy-input:focus {
  outline: none;
}
</style>
