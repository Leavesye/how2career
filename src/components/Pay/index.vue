<template>
  <el-dialog title="选择支付方式"
             :visible.sync="isShow"
             :before-close="handleClose"
             width="430px"
             s
             center>
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
                 type="success"
                 plain
                 round>确认</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getAlipayUrl } from '@/api/pay'

export default {
  name: 'pays',
  components: {
  },
  props: ['isShow', 'order'],
  data () {
    return {
      curPay: '',
      pays: [
        { type: 'wechat', img: require('@/assets/weixin.png') },
        { type: 'alipay', img: require('@/assets/zhifubao.png') },
        { type: 'paypal', img: require('@/assets/paypal.png') },
      ]
    }
  },
  methods: {
    async handleClickPay (item, i) {
      this.curPay = item
      if (item.type == 'alipay') {
        const res = await getAlipayUrl({
          orderId: this.order._id,
          amount: this.order.price,
          subject: '测试商品',
          type: 'order'
        })
        if (res.result) {
          console.log(decodeURIComponent(res.msg))
          this.alipayReturnUrl = decodeURIComponent(res.msg)
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
      this.$confirm('支付完成前请不要关闭此窗口，完成支付后根据您的情况点击下面按钮', '请在新页面完成支付', {
        confirmButtonText: '已完成支付',
        cancelButtonText: '立即支付',
        type: 'warning'
      }).then(() => {// 已完成支付
        // 查询订单支付完成状态
        this.$emit('confirm')
      }).catch(() => {// 立即支付
        // 跳转支付
        this.toPay()
      })
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
