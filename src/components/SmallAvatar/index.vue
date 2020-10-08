<template>
<el-image
    class="avatar"
    :src="url"></el-image>
</template>

<script>
export default {
  props: ['imgUrl'],
  data () {
    return {
      
    }
  },
  computed: {
    url: function() {
      return this.imgUrl || require('@/assets/default-avatar.png')
    },
  },
  methods: {
    
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
