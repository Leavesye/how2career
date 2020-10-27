<template>
<div class="flex info-box">
  <div class="head">
    <avatar :imgUrl="order.avatarImage"></avatar>
    <p class="role">咨询师</p>
    <p class="name">{{order.name}}</p>
  </div>
  <div class="info">
    <div class="info-item">
      <div class="title">自我介绍</div>
      <p class="desc">{{order.readme || '暂无介绍'}}</p>
    </div>
    <div class="info-item">
      <div class="title">咨询问题</div>
      <div v-if="order.question && order.question.length">
        <p class="desc" v-for="(item, i) in order.question" :key="i">{{item.v}}</p>
      </div>
      <p class="desc" v-else>暂无问题</p>
    </div>
  </div>
</div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  props: ['order'],
  components: {
    Avatar
  }
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
  width: 90px;
  height: 90px;
  background: #D8D8D8;
  box-shadow: 0px 2px 8px 0px rgba(21, 71, 159, 0.4);
  border: 6px solid #FFFFFF;
  border-radius: 50%;
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
  color: #36ae82;
  margin-bottom: 10px;
}
.desc {
  margin-bottom: 10px;
}
</style>
