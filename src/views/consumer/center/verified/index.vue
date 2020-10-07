<template>
  <section>
    <h1 class="page-title">实名认证（未认证）</h1>
    <div class="container">
      <quick-form :model="form"
                  labelWidth="140px"
                  ref="form"></quick-form>
      <div class="flex-he">
        <el-button style="width: 90px" type="success" size="small">认证</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import QuickForm from '@/components/QuickForm'

export default {
  components: {
    QuickForm
  },
  data () {
    const r = this.$rules
    return {
      form: {
        passWord: {
          value: '',
          label: '姓名',
          rules: [r.required(), r.length(20)],
        },
        name: {
          value: '',
          label: '手机号码',
          rules: [r.required(), r.mobile()],
        },
        nickName: {
          value: '',
          label: '身份证号码',
          rules: [r.required(), r.idCard()], 
        },
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.page-title {
  font-size: 16px;
  font-weight: 600;
  color: #36ae82;
  padding: 20px 30px;
  border-bottom: 1px solid #edeeef;
}
.container {
  padding: 30px 110px;
}
</style>
