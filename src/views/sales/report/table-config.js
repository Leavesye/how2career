const common = {
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
export default {
  '1': {
    data: [],
    columns: [
      {
        label: '订单号',
        prop: 'orderId',
      },
      {
        label: '消费者',
        prop: 'consumerNickName',
      },
      {
        label: '销售深度',
        prop: 'salesDeep',
      },
      {
        label: '是否有效',
        prop: 'successFinish',
      },
      {
        label: '创建时间',
        prop: 'cTime',
      },
    ],
    ...common
  },
  '2': {
    data: [],
    columns: [
      {
        label: '姓名',
        prop: 'name',
      },
      {
        label: '手机号码',
        prop: 'phone',
      },
      {
        label: '产生订单',
        prop: 'orderNumber',
      },
      {
        label: '引入注册人数',
        prop: 'subRegNumber',
      },
      {
        label: '引入订单',
        prop: 'subRegNumber',
      },
      {
        label: '注册时间',
        prop: 'cTime',
      },
    ],
    ...common
  },
  '3': {
    data: [],
    columns: [
      {
        label: '昵称',
        prop: 'nickName',
      },
      {
        label: '注册时间',
        prop: 'cTime',
      },
      {
        label: '产生订单',
        prop: 'subOrderNumber',
      }
    ],
    ...common
  },
}