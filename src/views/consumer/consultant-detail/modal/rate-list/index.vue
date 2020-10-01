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
          <el-rate disabled v-model="item.rate"></el-rate>
          <p>评价时间：{{item.time}}</p>
        </div>
        <p class="rate-content">{{item.content}}</p>
        <p class="rate-replay">{{item.replay}}</p>
      </li>
    </ul>
  </section>
</el-dialog>
</template>

<script>

export default {
  name: 'rate-list',
  components: {
  },
  props: ['isShow'],
  data () {
    return {
      rateList: [
        {rate: 4, time: '2002-01-20 12:08:20', content:'声音温柔，很有耐心，有问必答超级nice',replay: '咨询师回复：感谢您的肯定，很荣幸，希望继'},
        {rate: 4, time: '2002-01-20 12:08:20', content:'声音温柔，很有耐心，有问必答超级nice',replay: '咨询师回复：感谢您的肯定，很荣幸，希望继'},
        {rate: 4, time: '2002-01-20 12:08:20', content:'声音温柔，很有耐心，有问必答超级nice',replay: '咨询师回复：感谢您的肯定，很荣幸，希望继'},
        {rate: 4, time: '2002-01-20 12:08:20', content:'声音温柔，很有耐心，有问必答超级nice',replay: '咨询师回复：感谢您的肯定，很荣幸，希望继'},
        {rate: 4, time: '2002-01-20 12:08:20', content:'声音温柔，很有耐心，有问必答超级nice',replay: '咨询师回复：感谢您的肯定，很荣幸，希望继'},
      ]
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
  height: 500px;
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
