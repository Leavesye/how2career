<template>
  <div style="padding: 30px">
    <section class="flex">
      <div class="field-box">
        <span>姓名:</span>
        <span>{{user.name}}</span>
      </div>
      <div class="field-box">
        <span>身份证:</span>
        <span>{{user.idCard}}</span>
      </div>
    </section>
    <section class="main">
      <div class="flex step-desc">
        <div><i class="iconfont iconSTEP"
             :style="{color: curStep>=0? '#15479e': '#D7D7D7'}"></i></div>
        <div><i class="iconfont iconSTEP"
             :style="{color: curStep>=1? '#15479e': '#D7D7D7'}"></i></div>
        <div><i class="iconfont iconSTEP"
             :style="{color: curStep>=2? '#15479e': '#D7D7D7'}"></i></div>
      </div>
      <el-steps align-center
                :active="curStep"
                finish-status="success"
                style="margin-bottom: 70px">
        <el-step title="身份证上传"></el-step>
        <el-step title="银行卡信息"></el-step>
        <el-step title="电签验证码"></el-step>
      </el-steps>
      <!-- 步骤一 -->
      <section v-if="curStep == 0">
        <div class="flex-hc">
          <el-upload style="margin-right:60px"
                     action="#"
                     :show-file-list="false"
                     accept=".jpg,.png"
                     name="UploadFiles"
                     :http-request="(data) =>{handleUpload(data, 1)}">
            <img v-if="front" class="idcard" :src="front" alt="" />
            <div v-else class="idcard bg1">
              <p class="plus">+</p>
              <p class="upload-text">身份证正面上传</p>
            </div>
          </el-upload>
          <el-upload style="margin-right:60px"
                     action="#"
                     :show-file-list="false"
                     accept=".jpg,.png"
                     name="UploadFiles"
                     :http-request="(data) =>{handleUpload(data, 2)}">
            <img v-if="back" class="idcard" :src="back" alt="" />
            <div v-else class="idcard bg2">
              <p class="plus">+</p>
              <p class="upload-text">身份证反面上传</p>
            </div>
          </el-upload>
        </div>
        <p class="tips">* 请确保此身份证照片和注册时候实名的一致</p>
      </section>
      <!-- 步骤二 -->
      <section class="step-2"
               v-if="curStep == 1">
        <p class="label"><span style="color:#FF5F5E">*</span> 收款银行卡号</p>
        <el-input size="medium"
                  v-model="account"
                  :maxlength="30"
                  placeholder="请输入内容"></el-input>
        <p class="tips">* 请确保此银行卡和注册时候的实名姓名以及身份证匹配</p>
      </section>
      <!-- 步骤三 -->
      <section class="step-3"
               v-if="curStep == 2">
        <p class="code-tips">电签验证码将发送到您注册时候填写的手机 <span style="color:#15479E">{{user.userName}}</span></p>
        <p class="label"><span style="color:#FF5F5E">*</span> 验证码</p>
        <div class="flex">
          <el-input style="flex: 1"
                    v-model="code"
                    :maxlength="10"
                    size="medium"
                    placeholder="请输入验证码"></el-input>
          <el-button style="width:120px;margin-left: 20px"
                     size="medium"
                     plain
                     @click="handleGetCode">获取验证码</el-button>
        </div>
        <div style="margin-top: 50px">
          <el-checkbox v-model="checked"
                       class="check-box">我已阅读条款 <el-link type="success">点击了解规则</el-link>
          </el-checkbox>
        </div>
      </section>
      <div class="flex-hc"
           style="margin-top: 60px">
        <el-button type="primary"
                  :loading="isLoading"
                   plain
                   round
                   size="large"
                   style="width: 180px;"
                   @click="handleStep">{{ 2 > curStep ? '下一步': '完成部署'}}</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { identity, syncInfo, getCode, sign } from '@/api/consultant'

export default {
  props: ['step'],
  data () {
    return {
      curStep: this.step,
      account: '',
      code: '',
      checked: false,
      front: '',
      back: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([ 'user' ])
  },
  watch: {
    'step': function(n, o) {
      this.curStep = n
    }
  },
  methods: {
    async handleGetCode () {
      const res = await getCode()
      if (res.result) {
        this.code = res.msg
      }
    },
    async handleStep () {
      let res = null
      this.isLoading = true
      switch (this.curStep) {
        case 0:
          if (!this.front || !this.back) {
            this.alert('请上传身份证', 'warning')
            return false
          }
          res = await identity({
            identityFrontBase64: this.front,
            identityBackgroundBase64: this.back,
          }).catch(e=> this.isLoading = false)
          if (res.result) {
            this.curStep++
          }
          this.isLoading = false
          break
        case 1:
          if (!this.account) {
            this.alert('请输入银行卡号', 'warning')
            return false
          }
          res = await syncInfo({ salaryAccount: this.account }).catch(e=> this.isLoading = false)
          if (res.result) {
            this.curStep++
          }
          this.isLoading = false
          break
        case 2:
          if (!this.code) {
            this.alert('请输入验证码', 'warning')
            return false
          }
          if (!this.checked) {
            this.alert('请先阅读条款', 'warning')
            return false
          }
          res = await sign({ captcha: this.code }).catch(e=> this.isLoading = false)
          if (res.result) {
            this.$emit('finsh-sign')
          }
          this.isLoading = false
          break
      }
    },
    async handleUpload (data, type) {
      console.log(data, type)
      if (data.file.size > 2 * 1024 * 1024) {
        this.alert("上传图片不能超过2M")
        return false
      }
      if (!['image/png', 'image/jpeg'].includes(data.file.type)) {
        this.alert("请上传PNG、JPG类型文件")
        return false
      }
      const res = await this.getBase64(data.file)
      const base64 = 'data:image/jpeg;base64,' + res.split(',')[1]
      if (type==1) {
        this.front = base64
      } else {
        this.back = base64
      }
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ""
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    }
  }
}
</script>
<style>
.el-step__icon {
  width: 30px;
  height: 30px;
}
.el-step__head.is-success .el-step__icon.is-text,
.el-step__head.is-process .el-step__icon.is-text {
  border-color: #15479e;
  background-color: #15479e;
  color: #fff;
  font-size: 20px;
}
.el-step__head.is-wait .el-step__icon.is-text {
  border-color: #d7d7d7;
  background-color: #d7d7d7;
  color: #fff;
  font-size: 20px;
}
.el-step__title.is-process,
.el-step__title.is-success {
  color: #15479e;
  font-weight: 600;
}

.el-step__title.is-wait {
  color: #d7d7d7;
  font-weight: 600;
}
.el-step__head.is-success .el-step__line {
  border-color: #15479e;
  background: #15479e;
}
.el-step.is-horizontal .el-step__line {
  height: 5px;
}
</style>
<style lang="scss" scoped>
.field-box:first-child {
  margin-right: 50px;
}
.field-box > span:first-child {
  color: #15479e;
  font-size: 16px;
  font-weight: 600;
}
.field-box > span:last-child {
  color: #7c8ea5;
  font-size: 16px;
}
.main {
  margin-top: 26px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 30px 30px 60px 30px;
}
.step-desc {
  margin-bottom: 10px;
}
.step-desc > div {
  text-align: center;
  flex-basis: 33.33%;
}
.idcard {
  width: 180px;
  height: 110px;
  border-radius: 4px;
  border: 1px dashed #cecece;
}
.plus {
  font-size: 40px;
  line-height: 36px;
  color: #9b9b9b;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
}
.upload-text {
  font-size: 14px;
  color: #9b9b9b;
  text-align: center;
}
.bg1 {
  background: url(../../../assets/idcard-1.png) no-repeat 100% 100%;
}
.bg2 {
  background: url(../../../assets/idcard-2.png) no-repeat 100% 100%;
}
.tips {
  color: #999999;
  font-size: 16px;
  text-align: center;
  margin-top: 30px;
}
.step-2,
.step-3 {
  margin: 0 auto;
  width: 67%;
}
.label {
  font-size: 14px;
  color: #7c8ea5;
  margin-bottom: 20px;
}
.check-box {
  margin-right: 30px;
}
.code-tips {
  font-size: 16px;
  color: #999999;
  margin-bottom: 30px;
}
</style>
