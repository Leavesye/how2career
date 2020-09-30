<template>
  <div class="sider-bar" :style="{minHeight,background: type==1?'#36AE82':'#15479E'}">
    <el-menu
      :default-active="activeMenu"
      text-color="#fff"
      :style="{background: type==1?'#36AE82':'#15479E'}"
      active-text-color="#fff">
      <template v-for="(item, index) in menus">
        <el-menu-item :key="index" v-if="!item.children" :index="(index+1) + ''" @click="linkTo(item.path)">
          <i class="iconfont" :class="[item.icon]"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-submenu :key="index" v-else :index="(index+1) + ''">
          <template slot="title">
            <i class="iconfont" :class="[item.icon]"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="(subItem, sindex) in item.children" :key="sindex" class="sub-item" :index="(index+1)+ '-'+ (sindex+1)" @click="linkTo(subItem.path)">{{subItem.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <el-image class="room-btn" :src="roomBtn" @click="linkTo('/consultant/room')"></el-image>
    <div class="flex-hbc bottom-links">
      <el-link :underline="false" style="color: #fff">在线客服</el-link>
      <div>|</div>
      <el-link :underline="false" style="color: #fff">常见问题</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: ['menus', 'type'],
  data () {
    return {
      activeMenu: '1',
      minHeight: '700px',
    }
  },
  computed: {
    roomBtn: function() {
      return require('../../../assets/enter-room-btn.png')
    }
  },
  methods: {
    linkTo(path) {
      this.$router.push(path)
    },
  },
  mounted() {
    this.minHeight = document.body.clientHeight - (150+60+20*2) + 'px'
    // 刷新页面处理菜单高亮
    const path = this.$route.path
    for (let i =0 ; i < this.menus.length; i++) {
      const o = this.menus[i]
      if (o.path && path.includes(o.path)) {
        this.activeMenu = (i + 1).toString()
        return false
      } else {
        if (o.children) {
          const j = o.children.findIndex(c => path.includes(c.path))
          j > -1 && (this.activeMenu = `${i+1}-${j+1}`)
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.sider-bar {
  position: relative;
  width: 240px;
  padding-top: 28px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
i{
  color: #fff;
  width: 24px;
}
span {
  margin-left: 14px;
}
.sub-item {
  padding-left: 50px!important;
}
.room-btn {
  width: 180px;
  height: 50px;
  margin: 200px 0 50px 30px;
  cursor: pointer;
}
.bottom-links {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 154px;
  font-size: 14px;
  color: #fff;
}
</style>
