<template>
<el-dialog
  title="订单详情"
  :visible.sync="isShowDetail"
  :before-close="handleClose"
  width="700px"
  center>
  <section class="modal-main">
    <div class="flex">
      <p class="order-no">订单号: 12121212121212</p>
      <div>创建时间: 2020-12-11 20:13:12</div>
    </div>
    <div class="flex-vc">
      <p class="order-no">投诉: 未完成服务</p>
      <el-button size="small" @click="handleApply">申请仲裁</el-button>
    </div>
    <p class="desc">投诉说明：时间的价值远比年终奖宝贵，行动得越慢，决策成本越高。非常感谢老师！</p>
    <div class="flex-vc rate">
      <p style="margin-right: 10px">评价:</p>
      <el-rate style="margin-right: 40px" v-model="rate" disabled></el-rate>
      <el-button size="small" @click="handleFeedback">评价反馈</el-button>
    </div>
    <p class="desc">评价说明：时间的价值远比年终奖宝贵，行动得越慢，决策成本越高。非常感谢老师！</p>
    <div class="flex info-box" v-if="true">
      <div class="head">
        <div></div>
        <p class="role">咨询者</p>
        <p class="name">马里奥大叔</p>
      </div>
      <div class="info">
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
      </div>
    </div>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" type="primary" @click="handleConfirmTime">订单取消</el-button>
    <el-button size="small" type="primary" @click="handleConfirmTime">提交等待咨询者确认</el-button>
    <el-button size="small" type="primary" @click="handleConfirmTime">确认时间</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'confirm-order-detail',
  props: ['isShowDetail'],
  components: {
  },
  data () {
    return {
      rate: 3
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleConfirmTime() {
      this.$emit('confrim')
    },
    handleApply() {
      this.$emit('apply')
    },
    handleFeedback() {
      this.$emit('feedback')
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
}
.order-no {
  margin-right: 40px;
}
.time {
  margin-bottom: 15px;
}
.time-item {
  width: 200px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
}
.select-other {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #15479E;
  cursor: pointer;
}
.info-box {
  padding-top: 30px;
  border-top: 1px solid #EDEEEF;
}
.head {
  margin-right: 34px;
  margin-left: 30px;
  text-align: center;
}
.head > div {
  width: 90px;
  height: 90px;
  background: #D8D8D8;
  box-shadow: 0px 2px 8px 0px rgba(21, 71, 159, 0.4);
  border: 6px solid #FFFFFF;
  border-radius: 50%;
  margin-bottom: 10px;
}
.info {
  flex: 1;
  height: 200px;
  overflow: auto;
}
.info-item {
  margin-bottom: 15px;
}
.name {
  font-size: 16px;
  margin-bottom: 10px;
}
.title {
  color: #15479E;
}
.rate {
  margin-bottom: 15px;
}
.desc {
  padding: 15px;
  margin-bottom: 30px;
  background: #F6F6F6;
  border-radius: 4px;
}
.explain {
  margin-bottom: 10px;
}
</style>
