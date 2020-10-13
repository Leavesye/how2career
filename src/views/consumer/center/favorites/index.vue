<template>
  <section>
    <h1 class="page-title">我的收藏</h1>
    <div class="container">
      <card-list :list="list"></card-list>
      <p class="no-favorite">暂无收藏</p>
    </div>
  </section>
</template>

<script>
import CardList from '@/components/CardList'
import { delFavorite, getFavorites } from '@/api/user'
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
    async query() {
      const res = await getFavorites()
      if (res.result) {
        const l = res.msg.list
        if (l) {
          this.list = l.map(o => {
            const { _id: id, publicInfo: { 
              nickName, avatarImage:avatar, evaluationCount, evaluationPoint,
              selfIntroduction,resume: { workExperience: work }
            } } = o
            const rate = evaluationCount? Math.floor(evaluationPoint/evaluationCount): 0
            return {
              id,
              nickName, avatar, rate, position: work[0].position,
              evaluationCount, selfIntroduction,
              btn: { name: '取消收藏', cb: this.handleUnFavorite.bind(this, id)}
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
