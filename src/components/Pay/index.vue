<template>
<el-dialog
  title="选择支付方式"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="430px"s
  center>
  <section class="modal-main">
    <ul class="flex-hb pay-list">
      <li class="flex-cc" :class="{active: curPay === i}" v-for="(item, i) in pays" :key="i" @click="handleClickPay(item, i)">
        <el-image class="pay-img" :src="item.img"></el-image>
      </li>
    </ul>
  </section>
  <span slot="footer" class="dialog-footer">
     <el-button @click="handleConfirm" style="width: 180px" type="success" plain round>确认</el-button>
  </span>
</el-dialog>
</template>

<script>

export default {
  name: 'pays',
  components: {
  },
  props: ['isShow'],
  data () {
    return {
      curPay: '',
      pays: [
        {img: '', },
        {img: '', },
        {img: '', },
      ]
    }
  },
  methods: {
    handleClickPay(item, i) {
      this.curPay = i
    },
    handleConfirm() {
      this.$emit('confirm')
    },
    handleClose() {
      this.$emit('close')
    }
  },
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  margin: 0 auto;
}
.pay-list li {
  width: 100px;
  height: 100px;
}
.pay-list li.active {
  box-shadow: 0px 0px 4px 0px #36AE82;
  border-radius: 8px;
  border: 1px solid #36AE82;
}
.pay-img {
  display: block;
  width: 60px;
  height: 60px;
}
</style>
