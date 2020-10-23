export default {
  data: [],
  columns: [
    {
      type: 'selection',
    },
    {
      prop: 'orderId',
      width: '300',
      render(h, scope) {
        return (
          <i>订单号:{scope.row.orderId}</i>
        )
      },
    },
    {
      label: '金额',
      prop: 'amount',
      render(h, scope) {
        return (
          <i>{scope.row.amount} RMB</i>
        )
      },
    },
    {
      sortable: 'custom',
      label: '创建时间',
      prop: 'cTime',
    },
    {
      label: '',
      prop: '',
    },
  ],
  events: {
    'sort-change': null
  },
  props: {
    headerCellStyle: {
      background: '#F6F6F6',
      fontSize: '14px!important',
      color: '#7C8FA5!important',
      fontWeight: '200',
      textAlign: 'left',
    },
    cellStyle: {
      fontSize: '14px!important',
      color: '#7C8FA5!important',
      textAlign: 'left'
    }
  }
}