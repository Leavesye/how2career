<template>
  <section>
    <div class="flex-vc page-title">
      <div>编辑个人信息</div>
      <p>成为咨询师需要认证简历信息,请先完成简历填写</p>
    </div>
    <p class="form-title">学历信息</p>
    <section class="form-box">
      <el-card class="quick-form">
        <quick-form :model="education" :labelWidth="labelWidth" ref="education"></quick-form>
      </el-card>
      <section class="flex-he">
        <div class="add-btn">+添加更多学历</div>
      </section>
    </section>
    <p class="line"></p>
    <p class="form-title">工作经历 (最近三段)</p>
    <section class="form-box">
      <el-card class="quick-form">
        <quick-form :model="experience" :labelWidth="labelWidth" ref="experience"></quick-form>
      </el-card>
      <section class="flex-he">
        <div class="add-btn">+添加更多工作经历</div>
      </section>
    </section>
    <quick-form :model="socialEcurity" labelWidth="216px" ref="socialEcurity"></quick-form>
    <p class="line"></p>
    <p class="form-title">执照与证书</p>
    <section class="form-box">
      <el-card class="quick-form">
        <quick-form :model="license" :labelWidth="labelWidth" ref="license"></quick-form>
      </el-card>
      <section class="flex-he">
        <div class="add-btn">+添加更多证书</div>
      </section>
    </section>
    <quick-form :model="callup" labelWidth="216px" ref="callup"></quick-form>
    <p class="line"></p>
    <!-- 添加语言 -->
    <section>
      <p class="form-title">语言</p>
      <el-row>
        <el-col :offset="7" :span="16">
          <el-input style="width: 460px;margin-right:20px" v-model="input" placeholder="请输入信息" size="small"></el-input>
          <el-button type="primary" size="mini">确认添加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="7" :span="17">
          <ul class="flex item-select">
            <li v-for="(o,i) in 3" :key="i">英语
              <i class="el-icon-close"></i>
            </li>
          </ul>
        </el-col>
      </el-row>
    </section>
    <p class="line"></p>
    <section>
      <p class="form-title">工作个人技能</p>
      <el-row>
        <el-col :offset="7" :span="16">
          <el-input style="width: 460px;margin-right:20px" v-model="input" placeholder="请输入信息" size="small"></el-input>
          <el-button type="primary" size="mini">确认添加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="7" :span="17">
          <ul class="flex item-select">
            <li v-for="(o,i) in 3" :key="i">java
              <i class="el-icon-close"></i>
            </li>
          </ul>
        </el-col>
      </el-row>
    </section>
    <div class="flex-he" style="margin: 60px 60px 70px 0">
      <el-button type="primary" size="mini">保存并提交审核</el-button>
      <el-button size="mini">保存</el-button>
    </div>
    <submit-finish :isShow="isShow" @close="handleClose"></submit-finish>
  </section>
</template>

<script>
import QuickForm from '@/components/QuickForm'
import SubmitFinish from './modal/submit-finish'
import form from './form'

console.log(form, 88)

export default {
  name: 'fill-info',
  components: {
    QuickForm,
    SubmitFinish
  },
  data () {
    const r = this.$rules
    return {
      isShow: false,
      labelWidth:  '140px',
      ...form,
    }
  },
  methods: {
    handleClose() {
      this.isShow = false
    },
  },
  mounted() {
    console.log(this._data, 111)
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  padding: 20px 30px;
  border-bottom: 1px solid #EDEEEF;
}
.page-title > div {
  font-size: 16px;
  font-weight: 600;
  color: #15479E;
  margin-right: 30px;
}
.page-title > p { 
  font-size: 14px;
  color: #7C8EA5;
}
.form-box {
  width: 800px;
  margin: 0 auto;
}
.form-title {
  font-size: 16px;
  color: #15479E;
  margin: 30px;
}
.add-btn {
  width: 120px;
  height: 32px;
  line-height: 32px;
  background: #FFFFFF;
  border-radius: 3px;
  border: 1px solid #15479E;
  color: #15479E;
  text-align:center;
  margin-top: 30px;
}
.line {
  height: 1px;
  background: #EDEEEF;
  margin: 50px 0;
}
.upload-box {
  padding: 0 70px;
}
.item-select {
  margin-top: 20px;
}
.item-select li {
  position: relative;
  width: 90px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #EDEEEF;
  border-radius: 4px;
  border: 1px solid #EDEEEF;
  margin-right: 18px;
}
.item-select li > i {
  position: absolute;
  top: -7px;
  right: -7px;
  width: 14px;
  height: 14px;
  line-height: 14px;
  border-radius: 50%;
  background: #7A7F84;
  color: #fff;
}
</style>
