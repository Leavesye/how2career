<template>
  <section>
    <h1 class="title">基本信息</h1>
    <section class="form-box"
             style="margin-top: 30px">
      <el-card class="form-card">
        <quick-form :model="baseInfo"
                    :labelWidth="labelWidth"
                    ref="baseInfo"></quick-form>
      </el-card>
    </section>
    <h1 class="title bottom">最高学历</h1>
    <section class="form-box">
      <el-card class="form-card">
        <quick-form :model="education"
                    :labelWidth="labelWidth"
                    ref="education"></quick-form>
      </el-card>
    </section>
    <div class="flex-he"
         style="margin: 60px 60px 70px 0">
      <el-button type="primary"
                 size="mini">确认修改</el-button>
    </div>
  </section>
</template>

<script>
import QuickForm from '@/components/QuickForm'
import form from './form'

export default {
  name: 'consumer-baseinfo',
  components: {
    QuickForm,
  },
  data () {
    const r = this.$rules
    return {
      labelWidth: '140px',
      ...form,
    }
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 20px 30px;
  color: #15479e;
  font-size: 16px;
  border-bottom: 1px solid #edeeef;
}
.title.bottom {
  border-bottom: none;
  border-top: 1px solid #edeeef;
}
.form-card {
  margin-bottom: 50px;
  padding-top: 30px;
}
.form-box {
  width: 800px;
  margin: 0 auto;
}
.form-name {
  font-size: 14px;
  margin-bottom: 30px;
}
.form-name > label {
  color: #7c8ea5;
  width: 140px;
  text-align: right;
  padding-right: 10px;
  font-weight: 500;
}
.form-name > p {
  color: #434d57;
  margin-left: 10px;
}
</style>
