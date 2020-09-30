<template>
  <div>
    <h1 class="page-title flex-hbc">
      <span>咨询师详情</span>
      <el-button plain size="mini" icon="el-icon-arrow-left" @click="goBack">返回</el-button>
    </h1>
    <section class="card-box">
      <div class="flex-hb">
        <el-card class="left">
          <avatar></avatar>
          <p class="name">Frank</p>
          <el-rate class="user-rate" disabled v-model="rate"></el-rate>
          <p class="rate-count">评价:234</p>
          <p class="motto">把你的问题交给我，让你拥有不同的人生与未</p>
          <p class="cost-item">咨询费用</p>
          <div class="flex-hc">
            <div class="num">1000</div>
            <div class="unit">RMB</div>
          </div>
        </el-card>
        <el-card class="right">
          <ul>
            <li class="flex-hbc info-item">
              <div>
                <h1>最高学历</h1>
                <p>上海交通大学 电子工程 博士 2015年毕业</p>
              </div>
              <el-button size="mini" plain>更多</el-button>
            </li>
            <li class="info-item flex-hbc">
              <div>
                <h1>工作信息</h1>
                <p style="margin-bottom: 10px">所属行业: 金融与保险</p>
                <p>公司名称: 中国平安</p>
              </div>
              <div>职位: 华东区总经理</div>
              <div>工作年限: 5年</div>
              <el-button size="mini" plain>更多</el-button>
            </li>
            <li class="info-item">
              <h1>主要工作内容</h1>
              <p>负责华东区所有市场和销售工作,考核员工业绩,对区域销售和市场结果负责</p>
            </li>
            <li class="info-item">
              <h1>工作个人技能</h1>
              <p>销售,管理,市场,营销分析</p>
            </li>
          </ul>
        </el-card>
      </div>
      <el-card class="calendar-card">
        <calendar></calendar>
      </el-card>
    </section>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Calendar from '@/components/Calendar'

export default {
  name: 'consultant-detail',
  components: {
    Avatar,
    Calendar
  },
  data () {
    return {
      rate: 4
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  padding: 18px 30px;
  font-weight: 600;
  font-size: 16px;
  color: #36AE82;
  border-bottom: 1px solid #EDEEEF;
}
.card-box {
  padding: 30px;
}
.left {
  width: 220px;
  color: #7C8EA5;
}
.right {
  width: 640px;
}
.name {
  font-size: 18px;
  text-align: center;
  margin: 18px 0;
}
.user-rate {
  text-align: center;
}
.rate-count {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 10px
}
.motto {
  font-size: 14px;
  margin-bottom: 40px;
}
.cost-item {
  font-size: 14px;
  color: #36AE82;
  text-align: center;
}
.num {
  font-size: 26px;
  margin-right: 10px;
}
.unit {
  font-size: 18px;
  margin-top: 7px;
}
.info-item {
  padding: 20px 0;
  font-size: 14px;
  color: #7C8EA5;
  border-bottom: 1px solid #EDEEEF;
  align-items: flex-end;
}
.info-item h1 {
  color:#36AE82;
  margin-bottom: 10px;
}
.calendar-card {
  margin-top: 20px;
}
</style>
