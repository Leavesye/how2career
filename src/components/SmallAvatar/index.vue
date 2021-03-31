<template>
<el-image
    class="avatar"
    :src="url"></el-image>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  props: ['imgUrl'],
  computed: {
    url: function() {
      const logo = this.user.role == 'consumer' ? require('@/assets/g-logo.png') : require('@/assets/b-logo.png')
      return this.imgUrl || logo
    },
    ...mapGetters([
      'user'
    ])
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
