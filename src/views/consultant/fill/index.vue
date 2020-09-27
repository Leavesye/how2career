<template>
  <section>
    <div class="flex-vc page-title">
      <div>编辑个人信息</div>
      <p>成为咨询师需要认证简历信息,请先完成简历填写</p>
    </div>
    <p class="form-title">学历信息</p>
    <section class="form-box">
      <el-card class="quick-form">
        <quick-form :model="form1" :labelWidth="labelWidth" ref="form"></quick-form>
      </el-card>
      <section class="flex-he">
        <div class="add-btn">+添加更多学历</div>
      </section>
    </section>
    <p class="line"></p>
    <p class="form-title">工作经历 (最近三段)</p>
    <section class="form-box">
      <el-card class="quick-form">
        <quick-form :model="form2" :labelWidth="labelWidth" ref="form"></quick-form>
      </el-card>
      <section class="flex-he">
        <div class="add-btn">+添加更多工作经历</div>
      </section>
    </section>
    <quick-form :model="form3" labelWidth="216px" ref="form"></quick-form>
    <p class="line"></p>
    <p class="form-title">执照与证书</p>
    <section class="form-box">
      <el-card class="quick-form">
        <quick-form :model="form4" :labelWidth="labelWidth" ref="form"></quick-form>
      </el-card>
      <section class="flex-he">
        <div class="add-btn">+添加更多证书</div>
      </section>
    </section>
    <quick-form :model="form5" labelWidth="216px" ref="form"></quick-form>
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
          <div class="flex" style="margin-top:20px">
            <el-badge type="info" style="margin-right: 16px;" v-for="(o,i) in 3" :key="i" value="X" >
                <el-button size="small">英语</el-button>
              </el-badge>
          </div>
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
          <div class="flex" style="margin-top:20px">
            <el-badge type="info" style="margin-right: 16px;" v-for="(o,i) in 3" :key="i" value="X" >
                <el-button size="small">java</el-button>
              </el-badge>
          </div>
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
export default {
  name: 'fill-info',
  components: {
    QuickForm,
    SubmitFinish
  },
  data () {
    const r = this.$rules
    return {
      isShow: true,
      labelWidth:  '140px',
      form1: {
        a: {
          type: 'select',
          value: '',
          label: '国家',
          rules: [r.required()],
          props: { props: { label: 'text', value: 'value' } },
          options: []
        },
        b: {
          type: 'select',
          value: '',
          label: '学校',
          rules: [r.required()],
          props: { props: { label: 'text', value: 'value' } },
          options: []
        },
        c: {
          type: 'select',
          value: '',
          label: '专业',
          rules: [r.required()],
          props: { props: { label: 'text', value: 'value' } },
          options: []
        },
        d: {
          type: 'select',
          value: '',
          label: 'GPA',
          rules: [r.required()],
          props: { props: { label: 'text', value: 'value' } },
          options: [],
          style: {
            width: '320px'
          }
        },
        e: {
          type: 'select',
          value: '',
          label: '学位',
          rules: [r.required()],
          props: { props: { label: 'text', value: 'value' } },
          options: [],
          style: {
            width: '320px'
          }
        },
        f: {
          type: 'date',
          value: '',
          label: '毕业时间',
          rules: [r.required()],
          style: {
            width: '320px'
          }
        },
        g: {
          text : '曾经参加学生组织' ,
          value : '' ,
          type : 'checkbox',
          rules : [{ required : true , message : '必选项' }] ,
          events : {},
        },
        h: {
          text : '曾经获得奖项' ,
          isShow: true,
          inputVal: '',
          inputPlace: '奖项描述（必填）',
          value : '' ,
          type : 'checkbox',
          rules : [{ required : true , message : '必选项' }] ,
          events : {},
        },
        i: {
          text : '在校内有完成项目经历或发表文章' ,
          value : '' ,
          type : 'checkbox',
          rules : [{ required : true , message : '必选项' }] ,
          events : {},
        },
        j: {
          label: '',
          value : '' ,
          props: { type: 'textarea', rows: "6" },
          rules : [{ required : true , message : '必选项' }] ,
          events : {},
        },
        coverImg: {
          label: '毕业证/学位证或者 学信网学历认证报告',
          type: "upload",
          value: '',
          props: {
            accept: ".pdf.jpg.jpeg.png.bmp",
            action: '',
            limit: 1,
            disabled: false,
            "list-type": "picture",
            "file-list":  [],
            "auto-upload": true,
            "before-upload": (file) => this.uploadBefore(file, true),
            "on-success": (res, file) => this.uploadSuccess(res, file, 'img'),
          },
          render: () => {
            return (
              <div class="flex-vc">
                <div class="upload-btn">
                  <p style="margin-top: 12px; height: 22px;"><i class="el-icon-plus"></i></p>
                  <div style="color: #9B9B9B;font-size: 14px">上传证书</div>
                </div>
                <div style="margin-left: 10px;color: #9B9B9B;font-size: 14px">支持格式：pdf.jpg.jpeg.png.bmp,不大于2M</div>
              </div>
            )
          }
        },
      },
      form2: {
        a: {
          type: 'select',
          value: '',
          label: '行业',
          rules: [r.required()],
          props: { props: { label: 'text', value: 'value' } },
          options: []
        },
        b: {
          value: '',
          label: '企业',
          rules: [r.required()],
        },
        c: {
          type: 'select',
          value: '',
          label: '公司规模',
          rules: [r.required()],
          props: { props: { label: 'text', value: 'value' } },
          options: []
        },
        d: {
          value: '',
          label: '部门',
          rules: [r.required()],
        },
        f: {
          type: 'select',
          value: '',
          label: '职位',
          rules: [r.required()],
          props: { props: { label: 'text', value: 'value' } },
          options: []
        },
        g: {
          type: 'select',
          value: '',
          label: '级别',
          rules: [r.required()],
          props: { props: { label: 'text', value: 'value' } },
          options: []
        },
        h: {
          text : '是否在职' ,
          value : '' ,
          type : 'checkbox',
          rules : [{ required : true , message : '必选项' }] ,
          events : {},
        },
        i: {
          label : '入职时间' ,
          value : '' ,
          type : 'date',
          rules: [r.required()],
          layout: {sm : 12, md : 12, lg : 12, xl : 12}
        },
        j: {
          label : '离职时间' ,
          value : '' ,
          type : 'date',
          rules: [r.required()],
          layout: {sm : 12, md : 12, lg : 12, xl : 12}
        },
        jg: {
          label: '主要工作内容与业绩',
          value : '' ,
          props: { type: 'textarea', rows: "6" },
          rules : [r.required()],
          events : {},
        },
        jgg: {
          label: '奖励和荣誉',
          value : '' ,
          props: { type: 'textarea', rows: "6" },
          rules : [r.required()],
          events : {},
        },
        hf: {
          text : '有带团队经历' ,
          isShow: true,
          inputVal: '',
          inputPlace: '团队人数',
          value : '' ,
          type : 'checkbox',
          rules : [{ required : true , message : '必选项' }] ,
          events : {},
        },
        jg11: {
          label: '主要成果',
          value : '' ,
          props: { type: 'textarea', rows: "6" },
          rules : [r.required()],
          events : {},
        },
        
      },
      form3: {
         coverImg: {
          label: '上传现任公司社保证明',
          type: "upload",
          value: '',
          props: {
            accept: ".pdf.jpg.jpeg.png.bmp",
            action: '',
            limit: 1,
            disabled: false,
            "list-type": "picture",
            "file-list":  [],
            "auto-upload": true,
            "before-upload": (file) => this.uploadBefore(file, true),
            "on-success": (res, file) => this.uploadSuccess(res, file, 'img'),
          },
          render: () => {
            return (
              <div class="flex-vc">
                <div class="upload-btn">
                  <p style="margin-top: 12px; height: 22px;"><i class="el-icon-plus"></i></p>
                  <div style="color: #9B9B9B;font-size: 14px">上传证数</div>
                </div>
                <div style="margin-left: 10px;color: #9B9B9B;font-size: 14px">支持格式：pdf.jpg.jpeg.png.bmp,不大于2M</div>
              </div>
            )
          }
        },
      },
      form4: {
        d: {
          label: '拥有证书信息',
          value: '',
          rules: [r.required()],
          layout: {sm : 10, md : 10, lg : 10}
        },
        f: {
          type: 'date',
          label: '',
          value: '',
          rules: [r.required()],
          layout: {sm : 7, md : 7, lg : 7},
          labelWidth: '0'
        },
        g: {
          label: '',
          value: '',
          rules: [r.required()],
          layout: {sm : 7, md : 7, lg : 7},
          labelWidth: '0'
        },
        coverImg: {
          label: '',
          type: "upload",
          value: '',
          props: {
            accept: ".pdf.jpg.jpeg.png.bmp",
            action: '',
            limit: 1,
            disabled: false,
            "list-type": "picture",
            "file-list":  [],
            "auto-upload": true,
            "before-upload": (file) => this.uploadBefore(file, true),
            "on-success": (res, file) => this.uploadSuccess(res, file, 'img'),
          },
          render: () => {
            return (
              <div class="flex-vc">
                <div class="upload-btn">
                  <p style="margin-top: 12px; height: 22px;"><i class="el-icon-plus"></i></p>
                  <div style="color: #9B9B9B;font-size: 14px">上传证数</div>
                </div>
                <div style="margin-left: 10px;color: #9B9B9B;font-size: 14px">支持格式：pdf.jpg.jpeg.png.bmp,不大于2M</div>
              </div>
            )
          }
        },
      },
      form5: {
        h: {
          text : '有Gallup Certified证书' ,
          value : '' ,
          type : 'checkbox',
          rules : [{ required : true , message : '必选项' }] ,
          events : {},
          layout: {sm : 6, md : 6, lg : 6},
          labelWidth: '70px',
        },
        coverImg: {
          layout: {sm : 18, md : 18, lg : 18},
          labelWidth:'20px',
          label: '',
          type: "upload",
          value: '',
          props: {
            accept: ".pdf.jpg.jpeg.png.bmp",
            action: '',
            limit: 1,
            disabled: false,
            "list-type": "picture",
            "file-list":  [],
            "auto-upload": true,
            "before-upload": (file) => this.uploadBefore(file, true),
            "on-success": (res, file) => this.uploadSuccess(res, file, 'img'),
          },
          render: () => {
            return (
              <div class="flex-vc">
                <div class="upload-btn">
                  <p style="margin-top: 12px; height: 22px;"><i class="el-icon-plus"></i></p>
                  <div style="color: #9B9B9B;font-size: 14px">上传证数</div>
                </div>
                <div style="margin-left: 10px;color: #9B9B9B;font-size: 14px">支持格式：pdf.jpg.jpeg.png.bmp,不大于2M</div>
              </div>
            )
          }
        },
      },
    }
  },
  methods: {
    handleClose() {
      this.isShow = false
    },
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
.upload-btn {
  width: 80px;
  height: 80px;
  background: #F6F6F6;
  border-radius: 2px;
  border: 1px dashed #CCCCCC;
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
</style>
