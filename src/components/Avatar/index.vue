<template>
<el-image
    class="avatar"
    :src="url"></el-image>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'avatar',
  props: ['imgUrl'],
  data () {
    return {
      
    }
  },
  computed: {
    url: function() {
      const logo = this.user.role == 'consumer' ? require('@/assets/g-logo.png') : require('@/assets/b-logo.png')
      return this.imgUrl ? process.env.VUE_APP_HOST_NAME + this.imgUrl : logo
    },
    ...mapGetters([
      'user'
    ])
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 90px;
  height: 90px;
  background: #D8D8D8;
  box-shadow: 0px 2px 8px 0px rgba(21, 71, 159, 0.4);
  border: 3px solid #FFFFFF;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}
</style>
