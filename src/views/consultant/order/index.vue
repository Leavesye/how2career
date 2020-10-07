<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange" :pannels="pannels" :selPannel="selPannel"></pannel>
     <!-- 订单列表 -->
    <component v-bind:is="selPannel.component" />
  </section>
</template>

<script>
import Pannel from '@/components/Pannel'
import WaitingConfirm from './components/waiting-confirm'
import WaitingService from './components/waiting-service'
import FinishOrder from './components/finish-order'
export default {
  name: 'consultant-order',
  components: {
    Pannel,
    WaitingConfirm,
    WaitingService,
    FinishOrder,
  },
  created() {

  },
  data () {
    return {
      selPannel: { name: '待确认订单', status: 3, component: 'waiting-confirm' },
      pannels: [
        { name: '待确认订单', status: 3, component: 'waiting-confirm' },
        { name: '待服务订单', status: 4, component: 'waiting-service' },
        { name: '已完成订单', status: 7, component: 'finish-order' },
      ],
    }
  },
  methods: {
    handleClose() {
      this.isShowDetail = false
    },
    handlePannelChange (item) {
      this.selPannel = item
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
