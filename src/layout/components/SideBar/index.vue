<template>
  <div class="sider-bar"
       :style="{minHeight,background: user.role=='consumer'?'#36AE82':'#15479E'}">
    <div v-if="isCollapse"><i :class="[isCollapse ? 'el-icon-s-unfold': 'el-icon-s-fold']"></i></div>
    <el-menu :collapse="isCollapse"
             @open="handleOpen"
             @close="handleClose"
             :default-active="activeMenu"
             text-color="#fff"
             :style="{background: user.role=='consumer'?'#36AE82':'#15479E', width: isCollapse? '': '240px'}"
             active-text-color="#fff">
      <template v-for="(item, index) in menus">
        <el-menu-item :key="index"
                      v-if="!item.children"
                      :index="(index+1) + ''"
                      @click="linkTo(item.path)">
          <i class="iconfont"
             :class="[item.icon]"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-submenu :key="index"
                    v-else
                    :index="(index+1) + ''">
          <template slot="title">
            <i class="iconfont"
               :class="[item.icon]"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="(subItem, sindex) in item.children"
                        :key="sindex"
                        class="sub-item"
                        :index="(index+1)+ '-'+ (sindex+1)"
                        @click="linkTo(subItem.path)">{{subItem.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <el-image v-if="!isCollapse"
              class="room-btn"
              :src="user.role=='consumer'?roomGreen:roomBlue"
              @click="linkTo('/'+user.role+'/room/5f81d4cada7549f9d3400abb')"></el-image>
    <section v-if="user.role=='consumer'">
      <p class="my-code">我的推荐码</p>
      <div class="flex-cc qrcode-box">
        <div class="qrcode"
            ref="qrCodeUrl"></div>
      </div>
      <div class="howto">如何推荐好友</div>
    </section>
    <div class="flex-hbc bottom-links"
         v-if="!isCollapse">
      <el-link :underline="false"
               style="color: #fff">在线客服</el-link>
      <div>|</div>
      <el-link :underline="false"
               style="color: #fff">常见问题</el-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'

export default {
  name: 'sidebar',
  props: ['menus'],
  data () {
    return {
      activeMenu: '1',
      minHeight: '700px',
      isCollapse: false,
    }
  },
  computed: {
    roomBlue: function () {
      return require('../../../assets/enter-room-btn.png')
    },
    roomGreen: function () {
      return require('../../../assets/enter-room-green.png')
    },
    ...mapGetters([
      'room',
      'user'
    ])
  },
  methods: {
    linkTo (path) {
      this.$router.push(path)
    },
    handleOpen () {

    },
    handleClose () {

    }
  },
  mounted () {
    if (this.user.role == 'consumer') {
      require('@/styles/consumer.scss')
      const qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: 'www.baidu.com',
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
    this.minHeight = document.body.clientHeight - (150 + 60 + 20 * 2) + 'px'
    // 刷新页面处理菜单高亮
    const path = this.$route.path
    for (let i = 0; i < this.menus.length; i++) {
      const o = this.menus[i]
      if (o.path && path.includes(o.path)) {
        this.activeMenu = (i + 1).toString()
        return false
      } else {
        if (o.children) {
          const j = o.children.findIndex(c => path.includes(c.path))
          j > -1 && (this.activeMenu = `${i + 1}-${j + 1}`)
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.sider-bar {
  position: relative;
  padding-top: 28px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
i {
  color: #fff;
  width: 24px;
}
span {
  margin-left: 14px;
}
.sub-item {
  padding-left: 50px !important;
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
.my-code {
  font-size: 14px;
  text-align: center;
  color: #fff;
}
.qrcode-box {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background: #fff;
}
.qrcode {
  width: 90px;
  height: 90px;
}
.howto {
  margin: 0 auto;
  margin-top: 10px;
  width: 90px;
  height: 20px;
  border-radius: 13px;
  border: 1px solid #ffffff;
  color: #fff;
  line-height: 19px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 60px;
}
</style>
