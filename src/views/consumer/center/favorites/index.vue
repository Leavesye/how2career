<template>
  <section>
    <h1 class="page-title">我收藏的咨询师</h1>
    <div class="container">
      <card-list v-if="list.length" :list="list"></card-list>
      <p v-else class="no-favorite">暂无收藏</p>
    </div>
  </section>
</template>

<script>
import CardList from '@/components/CardList'
import { delFavorite, getFavorites, getDicts } from '@/api/user'
export default {
  components: {
    CardList,
  },
  data () {
    return {
      list: []
    }
  },
  created() {
    this.query()
  },
  methods: {
    handleAppintment (id) {
      this.$router.push(`/consumer/consultant-detail/${id}`)
    },
    async query() {
      const res = await Promise.all([getFavorites(), getDicts()])
      if (res[0].result) {
        const l = res[0].msg.list
        if (l) {
          this.list = l.map(o => {
            const { _id: id, publicInfo: { 
              nickName, avatarImage:avatar, evaluationCount, evaluationPoint,
              selfIntroduction,resume: { workExperience: work }
            } } = o
            const rate = evaluationCount? evaluationPoint/evaluationCount: 0
            return {
              id,
              nickName, avatar, rate, position: res[1].msg.position.find(v => v.value == work[0].position).text,
              evaluationCount, selfIntroduction,
              btnBook: { name: '预约', cb: this.handleAppintment.bind(this, id)},
              btn: { name: '取消收藏', cb: this.handleUnFavorite.bind(this, id)},
            }
          })
        } else {
          this.list = []
        }
      }
    },
    async handleUnFavorite(id) {
      const l = this.loading()
      const res = await delFavorite({ consultantId: id }).catch(e=> e.close())
      if (res.result) {
        this.alert('取消收藏成功')
        this.query()
      }
      l.close()
    }
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
.no-favorite {
  text-align: center;
  margin-top: 100px;
  font-size: 14px;
  color: #7c8ea5;
}
</style>
