<template>
<el-dialog
  title="评价详情"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="630px"
  center>
  <section class="modal-main">
    <ul>
      <li v-for="(item, i) in rateList" :key="i">
        <div class="flex-hbc">
          <el-rate disabled v-model="item.point"></el-rate>
          <p>评价时间：{{item.cTime}}</p>
        </div>
        <p class="rate-content">{{item.content}}</p>
        <p class="rate-replay" v-if="item.consultantReply">{{item.consultantReply}}</p>
      </li>
    </ul>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="handleClose">关闭</el-button>
  </span>
</el-dialog>
</template>

<script>

export default {
  props: ['isShow','rateList'],
  data () {
    return {
    }
  },
  methods: {
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
ul {
  max-height: 400px;
  overflow: auto;
}
ul > li {
  margin-bottom: 30px;
}
.rate-content {
  padding: 10px 0;
  border-bottom: 1px solid #EDEEEF;
}
.rate-replay {
  padding: 10px 0 30px 0;
  border-bottom: 1px solid #EDEEEF;
}
</style>
