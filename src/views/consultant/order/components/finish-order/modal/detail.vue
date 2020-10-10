<template>
<el-dialog
  title="订单详情"
  :visible.sync="isShowDetail"
  :before-close="handleClose"
  width="700px"
  center>
  <section class="modal-main">
    <div class="flex" style="margin-bottom: 10px">
      <p class="order-no">订单号：{{order.orderId}}</p>
      <div>创建时间:{{order.cTime}}</div>
    </div>
    <div v-if="order.complaintTitle">
      <div class="flex-vc rate">
        <p class="order-no">投诉: {{order.complaintTitle}}</p>
        <el-button size="small" @click="handleApply">申请仲裁</el-button>
      </div>
      <p class="desc-p">投诉说明：{{order.complaintContent}}</p>
    </div>
    <div v-if="order.point">
      <div class="flex-vc rate">
        <p style="margin-right: 10px">评价:</p>
        <el-rate style="margin-right: 40px" v-model="order.point" disabled></el-rate>
        <el-button size="small" @click="handleFeedback">评价反馈</el-button>
      </div>
      <p class="desc-p">评价说明：{{order.content}}</p>
    </div>
    <div class="flex info-box" v-if="true">
      <div class="head">
        <avatar :imgUrl="order.avatarImage"></avatar>
        <p class="role">咨询者</p>
        <p class="name">{{order.name}}</p>
      </div>
      <div class="info">
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">{{ order.country + ' ' + order.school + ' ' + order.discipline }}</p>
        </div>
        <div class="info-item">
          <div class="title">自我简介</div>
          <p class="desc">{{order.selfIntroduction}}</p>
        </div>
        <div class="info-item">
          <div class="title">咨询问题</div>
          <p class="desc" v-for="(item, i) in order.question" :key="i">{{item}}</p>
        </div>
      </div>
    </div>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" type="primary" @click="handleClose">关闭</el-button>
  </span>
</el-dialog>
</template>

<script>
import Avatar from '@/components/Avatar'
export default {
  props: ['isShowDetail', 'order'],
  components: {
    Avatar
  },
  data () {
    return {
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
.desc-p {
  padding: 15px;
  margin-bottom: 30px;
  background: #F6F6F6;
  border-radius: 4px;
}
.explain {
  margin-bottom: 10px;
}
</style>
