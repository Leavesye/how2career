<template>
<div class="flex info-box" v-if="true">
  <div class="head">
    <avatar :imgUrl="info.avatarImage"></avatar>
    <p class="role">咨询者</p>
    <p class="name">{{info.nickName}}</p>
  </div>
  <div class="info">
    <div class="info-item">
      <div class="title">最高学历</div>
      <p class="desc">{{ info.countryText + ' ' + info.schoolText + ' ' + info.disciplineText }}</p>
    </div>
    <div class="info-item">
      <div class="title">自我简介</div>
      <p class="desc">{{info.selfIntroduction || '暂无简介'}}</p>
    </div>
    <div class="info-item">
      <div class="title">咨询问题</div>
      <div v-if="info.question && info.question.length">
        <p class="desc" v-for="(item, i) in info.question" :key="i">{{item.v}}</p>
      </div>
      <p class="desc" v-else>暂无问题</p>
    </div>
  </div>
</div>
</template>

<script>
import Avatar from '@/components/Avatar'
import { queryConsumerByOrderId } from '@/api/order'
import { getDicts } from '@/api/user'

export default {
  props: ['order'],
  components: {
    Avatar
  },
  data () {
    return {
      info: {}
    }
  },
  methods: {
    async init() {
      const l = this.loading()
      const res = await Promise.all([
        getDicts(),
        queryConsumerByOrderId({ orderId: this.order.orderId })
      ]).catch(e => l.close())
      if (res[1].result) {
        const { nickName,avatarImage,highestEducation: { country, school, discipline }, selfIntroduction }  = res[1].msg.basic
        const {  countries, majors, degrees } = res[0].msg
        const f = countries.find(v => v.value == country)
        const countryText = f.text
        const schoolText = f.schools.find(v => v.value == school).text
        const disciplineText = majors.find(v => v.value == discipline).text
        this.info = { nickName, avatarImage,selfIntroduction, countryText, schoolText, disciplineText, question: this.order.question }
      }
      l.close()
    }
  },
  created() {
    this.init()
  },
};
</script>

<style lang="scss" scoped>
.info-box {
  padding-top: 30px;
  border-top: 1px solid #EDEEEF;
}
.head {
  margin-right: 34px;
  margin-left: 30px;
  text-align: center;
}
.head > div {
  margin-bottom: 10px;
}
.info {
  flex: 1;
  height: 200px;
  overflow: auto;
}
.info-item {
  margin-bottom: 15px;
}
.name {
  font-size: 16px;
  margin-bottom: 10px;
}
.title {
  font-weight: 600;
  color: #15479E;
  margin-bottom: 10px;
}
</style>
