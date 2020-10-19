<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange"
            :pannels="pannels"
            :selPannel="selPannel"></pannel>
    <el-card>
      <quick-form :model="form"
                  labelWidth="140px"
                  ref="form"></quick-form>
      <el-button size="large" class="search-btn" round plain type="success" >搜索</el-button>
    </el-card>
    <p class="title">搜索结果</p>
    <card-list :list="list"></card-list>
    <p class="title">经常查看的咨询师</p>
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
        { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleOpenDetail }, desc: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
        { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleOpenDetail }, desc: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
        { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleOpenDetail }, desc: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
        { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleOpenDetail }, desc: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
        { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleOpenDetail }, desc: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
      ]
    }
  },
  created() {
    this.orderId = this.$route.query.orderId
    console.log(this.orderId)
  },
  methods: {
    handleOpenDetail () {
      this.alert('订单详情 ')
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
