<template>
<el-dialog
  title="微信扫码支付"
  :visible.sync="isShow"
  :before-close="handleClose"
  append-to-body
  width="400px"
  center>
  <section class="modal-main">
    <div class="qrcode" ref="qrCodeUrl"></div>
  </section>
  <!-- <span slot="footer" class="dialog-footer">
    <el-button :type="user.role=='consultant'? 'primary': 'success'" @click="handlePay">立即支付</el-button>
    <el-button plain @click="handleFinish">已完成支付</el-button>
  </span> -->
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
        console.log(n, 6666, this.url)
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

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  text-align: center;
  line-height: 20px;
}
.qrcode {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
</style>
