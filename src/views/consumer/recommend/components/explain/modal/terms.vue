<template>
<el-dialog
  title="How to Career 推广条款"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="630px"
  center>
  <section class="modal-main">
    2020 年 3 月 16 日发布。2020 年 4 月 16 日起生效。这些条款取代以前的所有版本。 下文第 14 节（争议解决）中的强制仲裁条款和集体诉讼豁免适用于争议解决。请仔细阅读这些条款。如果您不同意本条款中的强制仲裁条款和集体诉讼豁免，请不要使用服务或软件。 这些一般使用条款（以下简称“一般条款”）与任何适用的附加条款（请参见下面的第 1.2 节（附加条款））（以下统称“条款”）约束您对我们的网站、客户支持、论坛或其他交互区域或服务、Creative Cloud 等服务（以下统称“服务”）和作为服务的一部分随附的软件以及任何应用程序（包括移动应用程序）、示例文件和内容文件（定义见下文）、脚本、指令集和相关文档（以下统称“软件”）的访问和使用。如果您已同意订阅和取消条款，则此类条款也被视为条款的一部分。如果您通过 Adobe Value Incentive Plan（“VIP”）使用和访问服务及软件，则“订阅和取消条款”不适用于您，但这些条款的其余部分将约束您对服务及软件的使用和访问。如果您已就特定服务或软件与我们签订了其他协议，则在其他协议的条款与本条款发生冲突时，以其他协议的条款为准。 您必须年满 13 周岁才能注册个人 Adobe ID。参与中小学教育指定学生许可计划的学校可在遵循中小学教育附加条款的情况下，向未满 13 周岁的儿童发放企业级 Adobe ID。 1.您与 Adobe 达成的协议。 1.1 选择法律和合同实体。如果您居住在北美（包括美国、加拿大、墨西哥、包括美国领土及属地和美国在世界各地的军事基地），则您的协议对象为 Adobe Inc. 美国公司，且本条款受美国加利福尼亚州法律的约束，除非美国联邦法律优先，而不管是否与法律准则冲突。如果您居住在北美以外的地区，则您的协议对象为 Adobe Systems Software Ireland Limited，且本条款受爱尔兰法律的约束。对于位于澳大利亚的客户，Adobe Systems Software Ireland Limited 将作为 Adobe Systems Pty Ltd. 的授权代理，以 Adobe Systems Pty Ltd. 代理的身份签订本合同。您可能享有本地法律规定的其他权利。我们不会在法律明令禁止的情况下试图限制这些权利。
  </section>
  <div class="flex-hb">
     <el-checkbox v-model="checked">我已阅读条款</el-checkbox>
     <div>
       <el-button size="small">取消</el-button>
       <el-button size="small" type="primary">同意</el-button>
     </div>
  </div>
</el-dialog>
</template>

<script>
import { cancelOrder } from '@/api/order'

export default {
  props: ['isShow'],
  data () {
    return {
      isLoading: false,
      isRefuse: false
    }
  },
  watch: {
    'isShow': function(n, o) {
      if (!n) {
        this.isRefuse = false
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
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
