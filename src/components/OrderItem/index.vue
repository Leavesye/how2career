<template>
<ul class="list-item flex-hbc" :style="{borderBottom: noBorder? 'none': '1px solid #edeeef'}">
  <li>
    <p style="margin-bottom: 10px">订单号：{{o.orderno}}</p>
    <div class="flex-vc">
      <el-avatar class="avatar"
                size="small"
                icon="el-icon-user-solid"></el-avatar>
      <div>{{o.name}}</div>
    </div>
  </li>
  <li>
    <p style="margin-bottom: 10px">创建时间：{{o.createTime}}</p>
    <div>开始时间：{{o.createTime}}</div>
  </li>
  <li class="flex-hbc" v-if="false">
    <p style="margin-right: 10px">评价</p>
    <el-rate v-model="value1"></el-rate>
  </li>
  <li v-if="true">
    <div style="margin-top:30px">还有12小时30分开始</div>
  </li>
  <li>{{o.rest}}</li>
  <li>
    <div style="margin-bottom: 10px; text-align: right">订单金额：{{o.amount}}</div>
    <div class="flex-he">
      <el-button type="primary" size="mini" @click="handelClickDetail">进入房间</el-button> 
      <el-button size="mini" @click="handelClickDetail">订单详情</el-button> 
    </div>
  </li>
</ul>
</template>

<script>
export default {
  name: 'order-item',
  props: ['o', 'noBorder'],
  data () {
    return {
      
    }
  },
  methods: {
    handelClickDetail() {
      this.o.cb && this.o.cb()
    }
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
  color: #7C8EA5;
  font-size: 14px;
  margin-bottom: 0;
}
.avatar {
  margin-right: 10px;
}
</style>
