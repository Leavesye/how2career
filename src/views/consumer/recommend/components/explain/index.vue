<template>
  <section style="padding: 30px">
    <el-image :src="banner"
              class="banner"></el-image>
    <div class="flex-hc content">
      <el-image class="content-img friends"
                :src="friends"></el-image>
      <div class="content-main" style="margin-left: 50px">
        <h1>邀请人奖励</h1>
        <p>邀请越多奖励越多</p>
        <section>聚焦企业高潜人才储备、人才梯队建设、岗位胜任力发展，基于已有数万家客户企业学习的数据洞察，结合市场需求，打造以提高胜任力、效能最大化为</section>
      </div>
    </div>
    <div class="flex-hc content">
      <div class="content-main" style="margin-right: 50px">
        <h1>被邀请好友奖励</h1>
        <p>注册有奖 成单第一笔也有奖励哟</p>
        <section>提供精准、高效、应用广泛的语音识别API，让用户的设备随时随地获得领跑业界的语音转文字能力，提高沟通效率、助力人机交互。</section>
      </div>
      <el-image class="content-img report"
                :src="report"></el-image>
    </div>
    <terms :isShow="isShow" @close="handleClose"></terms>
  </section>
</template>

<script>
import Terms from './modal/terms'
export default {
  components: {Terms},
  data () {
    return {
      isShow: true,
    }
  },
  computed: {
    banner: function() {
      return require('@/assets/invite.png')
    },
    friends: function() {
      return require('@/assets/friends.png')
    },
    report: function() {
      return require('@/assets/report.png')
    },
  },
  methods: {
    handleClose() {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
$color: #36ae82;
.banner {
  height: 220px;
  width: 100%;
  margin-bottom: 30px;
}
.content {
  margin-bottom: 100px;
  padding: 0 30px;
}
.content-img {
  width: 300px;
  height: 240px;
}
.content-main {
  flex: 1;
}
.content-main h1 {
  font-size: 32px;
  color: #15479e;
  font-weight: 600;
  margin-bottom: 10px;
}
.content-main p {
  font-size: 24px;
  color: #36ae82;
  font-weight: 400;
  margin-bottom: 40px
}
.content-main section {
  font-size: 18px;
  color: #434D57;;
  font-weight: 300;
}
.friends {
  width: 267px;
  height: 264px
}
.report {
  width: 355px;
  height: 267px
}
</style>
