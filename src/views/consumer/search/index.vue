<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange"
            :pannels="pannels"
            :selPannel="selPannel" css="search"></pannel>
    <el-card>
      <quick-form :model="form"
                  labelWidth="140px"
                  ref="form"></quick-form>
      <el-button size="large" class="search-btn" round plain type="success" >搜索</el-button>
    </el-card>
    <p class="title">搜索结果</p>
    <card-list :list="list"></card-list>
    <p class="title" style="margin-top: 0">经常查看的咨询师</p>
    <card-list :list="list"></card-list>
  </section>
</template>

<script>
import QuickForm from '@/components/QuickForm'
import Pannel from '@/components/Pannel'
import CardList from '@/components/CardList'
import form from './form'

export default {
  name: 'consumer-search',
  components: {
    QuickForm,
    Pannel,
    CardList
  },
  data () {
    return {
      form,
      datetime: '',
      isShow: false,
      selPannel: '',
      curTime: '',
      pannels: [
        { name: '向专业对象咨询', status: 1 },
        { name: '向人事咨询', status: 2 },
      ],
      list: [
        { id: '5f9004c9e7be443d069c1953', 
          avatar: '/upload/consultant/1603274113微信图片_20200731222259.jpg', 
          nickName: '马里奥', 
          rate: 3, 
          position: '高级专家', 
          rateCount: '234', 
          btn: { name: '预约', cb: this.handleOpenDetail }, 
          selfIntroduction: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
      ]
    }
  },
  created() {
    this.orderId = this.$route.query.orderId
  },
  methods: {
    handleOpenDetail (id) {
      this.$router.push(`/consumer/consultant-detail/5f9004c9e7be443d069c1953`)
    },
    handlePannelChange (item) {
      this.selPannel = item
    },
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding-bottom: 12px;
  border-bottom: 1px solid #edeeef;
}
.title {
  font-size: 16px;
  color: #36ae82;
  margin: 20px 0;
  font-weight: 600;
}
.search-btn {
  width: 180px;
  margin: 0 auto;
  display: block;
}
</style>
