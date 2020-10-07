<template>
  <ul class="my-favorites">
    <li v-for="(item, i) in list"
        :key="i"
        @click="linkTo(item)">
      <avatar></avatar>
      <h1 class="user-name">{{item.name}}</h1>
      <el-rate class="user-rate"
               disabled
               v-model="item.rate"></el-rate>
      <div class="user-role">{{item.role}}</div>
      <p class="user-desc">{{item.desc}}</p>
      <div class="flex-hbc">
        <h1 class="rate-count">评价: {{item.rateCount}}</h1>
        <el-button size="mini"
                   plain
                   @click="handleClick(item.btn.cb)">{{item.btn.name}}</el-button>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'card-list',
  props: ['list'],
  components: {
    Avatar
  },
  data () {
    return {

    }
  },
  methods: {
    linkTo (item) {
      this.$router.push(`/consumer/consultant-detail/${item.id}`)
    },
    handleClick (cb) {
      cb && cb()
    }
  },
  mounted () {
  }
};
</script>

<style lang="scss" scoped>
.my-favorites {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.my-favorites:after {
  content: "";
  flex: auto;
}
.my-favorites li {
  padding: 30px 20px;
  width: 205px;
  height: 380px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  margin-right: 20px;
}
.my-favorites li:nth-child(4n) {
  margin-right: 0;
}
.my-favorites > li:hover {
  border: 1px solid #36ae82;
}
.user-name {
  text-align: center;
  color: #7c8ea5;
  font-size: 18px;
  font-weight: 400;
  margin-top: 25px;
}
.user-rate {
  text-align: center;
}
.user-role {
  color: #7c8ea5;
  font-size: 14px;
  font-weight: 400;
  margin: 20px 0;
  text-align: center;
}
.user-desc {
  color: #7c8ea5;
  margin-bottom: 25px;
  height: 38px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.rate-count {
  color: #7c8ea5;
  font-weight: 400;
}
</style>
