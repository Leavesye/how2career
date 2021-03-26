<template>
  <div class="sider-bar"
       :style="getStyle()">
    <div v-if="isCollapse"><i :class="[isCollapse ? 'el-icon-s-unfold': 'el-icon-s-fold']"></i></div>
    <el-menu :collapse="isCollapse"
             :default-active="activeMenu"
             text-color="#fff"
             :style="getStyle(1)"
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
    <div class="flex-hc" v-if="!isCollapse" style="margin-top: 100px">
      <el-image v-if="room.orderId" class="room-btn"
                :src="user.role=='consumer'?roomGreen:roomBlue"
                @click="linkTo('/'+user.role+'/room/'+ room.orderId)"></el-image>
    </div>
    <section class="bottom-content">
      <section v-show="user.role=='consumer' || user.sales">
        <p class="my-code">{{user.role=='consumer' ? '我的推荐码' : '我的销售码'}}</p>
        <div class="flex-cc qrcode-box">
          <div class="qrcode"
              ref="qrCodeUrl"></div>
        </div>
        <div class="howto" v-if="user.role=='consumer'" @click="linkTo('/consumer/howto')">如何推荐好友</div>
      </section>
      <div class="flex-hc bottom-links"
          v-if="!isCollapse">
        <el-link :underline="false"
                style="color: #fff">常见问题</el-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcodejs2'
import tool from '@/utils/tool'

export default {
  name: 'sidebar',
  props: ['menus'],
  data () {
    return {
      activeMenu: '1',
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
  watch: {
    'room.roomId': function(n, o) {
      console.log(n, o)
    }
  },
  methods: {
    linkTo (path) {
      this.$router.push(path)
    },
    getStyle (type) {
      const cfg = {
        'consumer': { background: '#36AE82' },
        'consultant': { background: '#15479E' },
        'sales': type == 1 ?{ background: 'transparent'} : { backgroundImage: 'linear-gradient(#3464ae, #41ab83)' },
      }
      let role = this.user.role ? this.user.role : this.user.sales ? 'sales' : ''
      return cfg[role]
    },
    createQrcode() {
      const { refer, sales, userId, role } = this.user
      if (role == 'consumer' || sales) {
        let url = `${process.env.VUE_APP_HOST_NAME}/register/consumer?`
        let query = ''
        if (role) {
          query = tool.getShareQuery(refer, sales, userId)
        } else { // 销售码
          query = `growth=${sales}`
        }
        url = `${url}${query}`
        new QRCode(this.$refs.qrCodeUrl, {
          text: url,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      }
    },
  },
  updated() {
    this.createQrcode()
  },
  mounted () {
    this.createQrcode()
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
  width: 240px;
  min-height: 920px;
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
.bottom-content {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
}
.room-btn {
  width: 180px;
  height: 50px;
  cursor: pointer;
  margin-bottom: 20px;
}

.my-code {
  font-size: 14px;
  text-align: center;
  color: #fff;
  margin-bottom: 5px;
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
  width: 100px;
  height: 20px;
  border-radius: 13px;
  border: 1px solid #ffffff;
  color: #fff;
  line-height: 19px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 22px;
  font-size: 12px;
}
.bottom-links {
  margin-top: 20px;
  width: 154px;
  font-size: 14px;
  color: #fff;
}
</style>
