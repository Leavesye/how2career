<template>
<el-dialog
  title="密码修改"
  :visible.sync="isShow"
  width="560px"
  :before-close="handleClose"
  center>
  <section class="modal-main">
    <quick-form labelWidth="140px" :model="form" ref="form"></quick-form>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button style="width: 190px" :type="user.role=='consumer'?'success':'primary'" round plain @click="handleConfirm">确认修改</el-button>
  </span>
</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import QuickForm from '@/components/QuickForm'
import { updateUserInfo } from '@/api/user'
export default {
  props: ['isShow', 'account'],
  components: {QuickForm},
  data () {
    const r = this.$rules
    return {
      form: {
        oldPassWord: {
          value: '',
          label: '输入旧密码',
          props: {
            type: 'password'
          },
          rules: [r.required(), r.length(6, 12)],
          hide: false,
        },
        passWord: {
          value: '',
          label: '新密码',
          rules: [r.required(), r.length(6, 12)],
          props: {
            type: 'password'
          },
        },
        confirmPwd: {
          value: '',
          label: '再次输入新密码',
          rules: [r.required(), r.length(6, 12)],
          props: {
            type: 'password'
          },
        },
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleConfirm() {
      const formData = this.$refs.form.getFormData()
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (formData.passWord != formData.confirmPwd) {
            this.alert('两次输入密码不一致', 'warning')
            return false
          }
          const p = {
            account: this.account
          }
          console.log(p)
          p.account.oldPassWord = formData.oldPassWord
          p.account.passWord = formData.passWord
          updateUserInfo(p).then(res => {
            if (res.result) {
              this.alert('修改成功')
              this.$emit('close')
            }
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  text-align: center;
  font-size: 14px;
  color: #7C8EA5;
}

</style>
