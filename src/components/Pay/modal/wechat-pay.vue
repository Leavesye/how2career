<template>
<el-dialog
  custom-class="wechatpay-dialog"
  title="微信扫码支付"
  :visible.sync="isShow"
  :before-close="handleClose"
  append-to-body
  width="300px"
  center>
  <section class="modal-main">
    <div class="qrcode-box flex-cc">
      <div class="qrcode" ref="qrCodeUrl"></div>
    </div>
    <p class="tips">完成支付后请关闭此弹框</p>
  </section>
</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'

export default {
  props: ['isShow', 'url'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    isShow: function(n, o) {
      // 防重复生成
      if (this.$refs.qrCodeUrl) {
        return false
      }
      if (n) {
        this.$nextTick(() => {
          let q = new QRCode(this.$refs.qrCodeUrl, {
            text: this.url,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          })
          console.log(this.$refs.qrCodeUrl, 555)
        })
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
  }
};
</script>

<style>
.wechatpay-dialog {
  background: #2a8f3f;
}
.wechatpay-dialog .el-dialog__title,
.wechatpay-dialog .el-dialog__close {
  color: #fff;
}
</style>
<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  text-align: center;
  line-height: 20px;
}
.qrcode-box {
  width: 210px;
  height: 210px;
  background: #fff;
  margin: 0 auto;
}
.qrcode {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.tips {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #fff;
}
</style>
