<template>
<el-dialog
  :visible.sync="isShow"
  :before-close="handleClose"
  width="60%"
  custom-class="terms-zindex"
  center>
  <section class="modal-main">
    <pdf 
      ref="pdf"
      :src="url"
    >
    </pdf>
  </section>
  <div class="flex-hb" v-show="isShowBtn">
     <el-checkbox v-model="checked">我已阅读条款</el-checkbox>
     <div>
       <el-button plain @click="handleClose">取消</el-button>
       <el-button type="success" @click="handleAgree">同意</el-button>
     </div>
  </div>
</el-dialog>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  props: {
    url: String,
    isShow: Boolean,
    isShowBtn: {
      type: Boolean,
      default: true
    }
  },
  components:{
      pdf
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('close', this.checked)
    },
    handleAgree() {
      if (!this.checked) {
        this.alert('请先同意条款', 'warning')
        return false
      }
      this.$emit('close', this.checked)
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  margin-bottom: 50px;
}

</style>
