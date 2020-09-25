<template>
<div class="head">
  <el-image
    class="avatar"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
  <p class="name">马里奥大叔</p>
  <el-image
    class="micro"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
</div>
</template>

<script>
export default {
  name: 'avatar',
  data () {
    return {
      
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.head {
  width: 150px;
  text-align: center;
  position: relative;
  color: #7C8EA5;
}
.head > .avatar {
  width: 90px;
  height: 90px;
  background: #D8D8D8;
  box-shadow: 0px 2px 8px 0px rgba(21, 71, 159, 0.4);
  border: 6px solid #FFFFFF;
  border-radius: 50%;
  margin-bottom: 20px;
}
.micro {
  position: absolute;
  left: 60px;
  bottom: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
