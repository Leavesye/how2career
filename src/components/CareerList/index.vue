<template>
  <ul class="more-select flex-hb">
    <li class="item" v-for="(item, i) in 3"
        :key="i">
      <div class="logo"></div>
      <h1>Google</h1>
      <p>由拉里·佩奇和谢尔盖·布林共同创建，被公认为全球最大的搜索引擎公司。谷歌是一家位于美国的跨国科技企业，业务包括互联网搜索…</p>
      <el-button class="learn-more"
                  plain>了解更多</el-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'career-list',
  data () {
    return {

    }
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.item {
 flex: 1;
 margin-right: 20px;
}
.item:last-child {
  margin-right: 0;
}
.item > .logo {
  height: 150px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.item > h1 {
  font-size: 16px;
  color: #7C8EA5;
  font-weight: 600;
  margin: 20px 0 10px 0;
}
.item > p {
  font-weight: 400;
  color: #7C8EA5;
  margin-bottom: 20px;
  display: -webkit-box;    
  -webkit-box-orient: vertical;    
  -webkit-line-clamp: 3;    
  overflow: hidden;
  font-size: 14px;
}
.learn-more {
  margin-left: 100px;
}
</style>
