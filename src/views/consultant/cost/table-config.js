export default {
  data: [],
  columns: [
    {
      type: 'selection',
    },
    {
      prop: 'orderId',
      renderHeader() {
        return (
          <div class="flex-vc">
            <div style="margin-right: 14px">全选</div>
            <el-button size="mini">批量提现</el-button> 
          </div>
        )
      },
      render(h, scope) {
        return (
          <i>订单号:{scope.row.orderId}</i>
        )
      },
    },
    {
      label: '金额',
      prop: 'price'
    },
    {
      sortable: true,
      label: '申请提现时间',
      prop: 'cTime'
    },
    {
      label: '',
      prop: 'e',
      render() {
        return (
          <el-button size="mini">提现</el-button> 
        )
      }
    },
  ],
  props: {
    headerCellStyle: {
      background: '#EDEEEF',
      fontSize: '14px!important',
      color: '#7C8FA5!important',
      fontWeight: '200',
    },
    cellStyle: {
      fontSize: '14px!important',
      color: '#7C8FA5!important',
    }
  }
}