<template>
  <section>
    <h1 class="page-title">我的收藏</h1>
    <div class="container">
      <card-list :list="list"></card-list>
    </div>
  </section>
</template>

<script>
import CardList from '@/components/CardList'

export default {
  components: {
    CardList,
  },
  data () {
    return {
      list: [
         { id: '5f781c38b6e04a5e2a037f5f', img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleAppintment}, desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
         { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleAppintment},desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
         { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleAppintment},desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
         { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleAppintment},desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
         { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleAppintment},desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
         { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '订单详情', cb: this.handleAppintment},desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
      ]
    }
  },
  methods: {
 
  }
}
</script>
<style lang="scss" scoped>
.page-title {
  font-size: 16px;
  font-weight: 600;
  color: #36ae82;
  padding: 20px 30px;
  border-bottom: 1px solid #EDEEEF;
}
.container {
  padding: 30px;
}
</style>
