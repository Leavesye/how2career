<template>
  <section style="padding: 30px">
    <el-image :src="banner"
              class="banner"></el-image>
    <h1 class="title">加入好途职场，邀请好友有奖</h1>
    <div class="flex-hb">
      <div v-for="(item, i) in list"
           :key="i"
           class="flex-cc item">
        <el-image class="icon-img" :src="item.icon"></el-image>
        <p>你也可以设置您的服务时间以便通过审核</p>
      </div>
    </div>
    <div class="join-btn" @click="handleJoin">加入好友推荐计划</div>
    <div class="bottom-link">
      点击查看<el-link type="success">《好友推荐规则》</el-link>
    </div>
    <terms :isShow="isShow"
           @close="handleClose"></terms>
  </section>
</template>

<script>
import Terms from './modal/terms'
import { join } from '@/api/user'

export default {
  components: { Terms },
  data () {
    return {
      isShow: false,
      list: [
        { icon: require('@/assets/icon-1.png'), text: '你也可以设置您的服务时间以便通过审核' },
        { icon: require('@/assets/icon-2.png'), text: '你也可以设置您的服务时间以便通过审核' },
        { icon: require('@/assets/icon-3.png'), text: '你也可以设置您的服务时间以便通过审核' },
      ]
    }
  },
  computed: {
    banner: function () {
      return require('@/assets/invite.png')
    },
  },
  methods: {
    async handleJoin() {
      if (!this.isAgree) {
        this.isShow = true
        return false
      }
      const l = this.loading()
      const res = await join().catch(e=> l.close())
      if (res.result) {
        this.alert('加入成功')
        this.$emit('success')
      }
      l.close()
    },
    handleClose (checked) {
      this.isShow = false
      this.isAgree = checked
    }
  }
}
</script>
<style lang="scss" scoped>
$color: #36ae82;
.banner {
  height: 220px;
  margin-bottom: 50px;
  display: block;
  margin: 0 auto;
}
.title {
  font-size: 28px;
  font-weight: 600;
  color: #15479e;
  text-align: center;
  margin-bottom: 50px;
}
.item {
  flex: 1;
  height: 130px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-right: 20px;
}
.item:last-child {
  margin-right: 0;
}
.item > .icon-img {
  margin-right: 20px;
  width: 30px;
  height: 30px;
}
.item > p{
  width: 122px;
}
.join-btn {
  width: 200px;
  height: 48px;
  line-height: 48px;
  background: rgba(54, 174, 130, 0.2);
  border-radius: 24px;
  border: 1px solid #36ae82;
  color: #36ae82;
  font-size: 18px;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
}
.join-btn:hover {
  background: #36ae82;
  opacity: 0.89;
  border: 1px solid #36ae82;
  color: #fff;
}
.bottom-link {
  text-align: center;
  color: #7A7F84;
  font-size: 14px;
  margin-top: 20px;
}
</style>
