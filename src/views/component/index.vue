<template>
  <div class="dashboard-container">
    <el-button @click="m.isShow = true">点击模态框</el-button>
    <quick-form :model="form" :labelWidth="labelWidth" ref="form"></quick-form>
    <div id="chart"></div>
    <scheduler />
    <modal :m="m">
      <div @click="test">哈哈</div>
    </modal>
  </div>
</template>

<script>
import QuickForm from '@/components/QuickForm'
import { mapGetters } from 'vuex'
import Scheduler from '@/components/Scheduler'
import Modal from '@/components/Modal'


export default {
  name: 'Dashboard',
  components: {
    Scheduler,
    QuickForm,
    Modal
  },
  data () {
    let r = this.$rules
    let vm = this
    return {
      m: {
        isShow: false,
        confirm: () => this.m.isShow = true,
        cancel: () => this.m.isShow = false,
      },
      labelWidth: '150px',
      form: {
        hospitalCode: {
          type: 'select',
          value: (this.item && this.item.hospitalCode) || '',
          label: '医院名称',
          rules: [r.required(), r.G_FieldLength()],
          icon: 'icon iconfont icon-jiaose icon-yellow',
           props: { props: { label: 'text', value: 'value' } },
          options: this.hospitals || []
        },
        departmentName: {
          value: (this.item && this.item.departmentName) || '',
          label: '科室名称',
          rules: [r.required(), r.G_FieldLength()],
          icon: 'icon iconfont icon-mingcheng icon-blue',
        },
        departmentDesc: {
          value: (this.item && this.item.departmentDesc) || '',
          label: '科室介绍',
          rules: [r.required(), r.G_FieldLength()],
          icon: 'icon iconfont icon-mingcheng icon-blue',
        },
        departmentQrcodeUrl: {
          label: "科室二维码",
          type: "upload",
          value: '',
          icon: "icon iconfont icon-tuwen icon-blue",
          props: {
            accept: ".jpg,.png",
            action: `${process.env.BASE_API}aslkApi/picture/uploadImg/deptmentManage?`,
            limit: 1,
            disabled: false,
            "list-type": "picture",
            "file-list": (this.item && this.item.imgs) || [],
            "auto-upload": true,
             "before-upload": this.uploadBefore,
            "on-success": this.uploadSuccess,
          },
          render: () => {
            return (
              <div style="display: flex">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div style="margin-left: 10px;color: #ccc">文件大小不超过1M,只限上传PNG、JPG类型文件</div>
              </div>
            )
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    test() {
      alert(111)
    }
  },
  mounted() {
    const myChart = this.$echarts.init(document.getElementById('chart'))
        myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
  }
}
</script>

<style lang="scss" scoped>
#chart {
  height: 300px;
}
</style>
