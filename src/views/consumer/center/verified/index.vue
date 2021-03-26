<template>
  <section>
    <div class="flex-vc page-title">
      <div>实名认证（{{realVerified?'已认证':'未认证'}}）</div>
      <p>为保证服务质量，IntoCareer保证咨询师与求职者均为实名认证，请在服务开始前完成实名认证，以免影响服务正常进行</p>
    </div>
    <div class="container">
      <quick-form :model="form"
                  labelWidth="140px"
                  ref="form"></quick-form>
      <div class="flex-he" v-if="!realVerified">
        <el-button :loading="isLoading" style="width: 90px" type="success" size="small" @click="handleVerified">认证</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import QuickForm from '@/components/QuickForm'
import { realVerify, getUserInfo } from '@/api/user'

export default {
  components: {
    QuickForm
  },
  data () {
    const r = this.$rules
    return {
      isLoading: false,
      realVerified: false,
      form: {
        name: {
          value: '',
          label: '姓名',
          rules: [r.required(), r.maxLength(20)],
          props: {
            disabled: true
          }
        },
        phone: {
          value: '',
          label: '手机号码',
          rules: [r.required(), r.mobile()],
        },
        idCard: {
          value: '',
          label: '身份证号码',
          rules: [r.required(), r.idCard()], 
        },
      }
    }
  },
  async created() {
    const l = this.loading()
    const res = await getUserInfo().catch(e=> l.close())
    if (res.result) {
      const { realVerified, realVerify, basic: { name } } = res.msg
      this.realVerified = realVerified
      this.form.name.value = name
      this.form.phone.value = realVerify ? realVerify.phone : ''
      this.form.idCard.value = realVerify ? realVerify.idCard : ''
      if (this.realVerified) {
        this.form.phone.props.disabled =true
        this.form.idCard.props.disabled =true
      }
    }
    l.close()
  },
  methods: {
    handleVerified() {
      if (this.isLoading) return false
      const formData = this.$refs.form.getFormData()
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isLoading = true
          realVerify(formData).then(res => {
            if (res.result) {
              this.realVerified = true
              this.alert('认证成功')
            }
            this.isLoading = false
          }).catch(e=>this.isLoading = false)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-title {
  padding: 20px 30px;
  border-bottom: 1px solid #edeeef;
}
.page-title > div {
  font-size: 16px;
  font-weight: 600;
  color: #36ae82;
  margin-right: 30px;
}
.page-title > p {
  font-size: 14px;
  color: #7c8ea5;
}
.container {
  width: 600px;
  margin: 0 auto;
  margin-top: 40px;
  padding: 30px 110px;
}
</style>
