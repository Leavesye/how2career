<template>
  <el-dialog title="选择支付方式"
             :visible.sync="isShow"
             :before-close="handleClose"
             width="430px"
             center>
    <confirm-modal :isShow="isShowInner" @close="handleCloseConfirm" @finish="handleFinish" @pay="handlePay"></confirm-modal>
    <slot></slot>
    <section class="modal-main">
      <ul class="flex-hb pay-list">
        <li class="flex-cc"
            :class="{active: curPay.type === item.type}"
            v-for="(item, i) in pays"
            :key="i"
            @click="handleClickPay(item, i)">
          <el-image class="pay-img"
                    :src="item.img"></el-image>
        </li>
      </ul>
    </section>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleConfirm"
                 style="width: 180px"
                 :type="user.role=='consumer'?'success':'primary'"
                 plain
                 size="medium"
                 round>确认</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters }from 'vuex'
import { getAlipayUrl } from '@/api/pay'
import { getPayStatus } from '@/api/order'
import ConfirmModal from './modal/confirm'

export default {
  name: 'pays',
  props: ['isShow', 'payInfo'],
  components:{ ConfirmModal },
  data () {
    return {
      curPay: '',
      isShowInner: false,
      pays: [
        { type: 'wechat', img: require('@/assets/weixin.png') },
        { type: 'alipay', img: require('@/assets/zhifubao.png') },
        { type: 'paypal', img: require('@/assets/paypal.png') },
      ]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    'isShow': function(n, o) {
      this.curPay = ''
    }
  },
  methods: {
    async handleClickPay (item, i) {
      this.curPay = item
      if (item.type == 'alipay') {
        const res = await getAlipayUrl(this.payInfo)
        if (res.result) {
          console.log(decodeURIComponent(res.msg.payUrl))
          this.alipayReturnUrl = res.msg.payUrl
          this.serialNumber = res.msg.serialNumber
        }
      }
    },
    toPay () {
      // 支付宝支付
      if (this.curPay.type == 'alipay') {
        window.open(this.alipayReturnUrl, '_blank')
      }
    },
    handleConfirm () {
      // 跳转支付
      this.toPay()
      this.isShowInner = true
    },
    // 点击已完成支付
    async handleFinish() {
      this.isShowInner = false
      getPayStatus({ serialNumber: this.serialNumber }).then(res => {
          if (res.result) {
            // 已支付
            if (res.msg.payment) {
              this.$emit('confirm', true)
            } else {// 未支付
              this.$emit('confirm', false)
            }
          }
        }).catch(e=> console.log(e))
    },
    // 点击立即支付
    handlePay() {
      // 跳转支付
      this.toPay()
    },
    handleCloseConfirm () {
      this.isShowInner = false
    },
    handleClose () {
      this.$emit('close')
    }
  },
};
</script>

<style lang="scss" scoped>
.modal-main {
  font-size: 14px;
  color: #7c8ea5;
  margin: 0 auto;
}
.pay-list li {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.pay-list li.active {
  box-shadow: 0px 0px 4px 0px #36ae82;
  border-radius: 8px;
  border: 1px solid #36ae82;
}
.pay-img {
  display: block;
  width: 70px;
  height: 70px;
}
</style>
