import moment from 'moment'

function getCountDown (target) { 
  if (!target) return false
  let str = ''
  // 倒计时时间计算
  if (target) {
      const countdown = target*1000 - moment().valueOf()
      if (countdown > 0) {
        let times = countdown/(3600*1000)
        let hours = Math.floor(times)
        let mintus = Math.ceil((times - hours)*60)
        str = `还有${hours}小时${mintus}分开始`
      } else {
        str = '已过期'
      }
  }
  return str
}
function getCondition(status) {
  const arr = status.split(',')
  let condition = ''
  arr.forEach((o, i) => {
    if (i == arr.length - 1) {
      condition += `status==${o}`
    } else {
      condition += `status==${o}:`
    }
  })
  return condition
}
function formatConsultantOrder (list) {
  return list.map(o => {
    const { avatar, name, readme } =  o.consultant
    // 倒计时时间计算
    let confirmCountDown = getCountDown(o.confirmTimeout)
    let serviceCountDown = getCountDown(o.startTime)
    
    return {
      orderId: o._id,
      avatar: process.env.VUE_APP_HOST_NAME + o.consumerAvatar,
      name: o.consumerNickName,
      cTime: moment(o.cTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
      confirmCountDown,
      serviceCountDown,
      startTime: o.startTime ? moment(o.startTime * 1000).format('YYYY-MM-DD HH:mm:ss'): '',
      consumerTime: o.consumerTime ? o.consumerTime.map(v => {
        // 秒转毫秒
        let ms = v*1000
        return {
          text: `${moment(ms).format('YYYY-MM-DD')} ${moment(ms).format('HH:mm:ss')}~${moment(ms).subtract(-90, 'minutes').format('HH:mm:ss')}`,
          value: v
        }
      }) : [],
      consultantTime: o.consultantTime ? o.consultantTime.map(v => {
         // 秒转毫秒
        let ms = v*1000
        return {
          text: `${moment(ms).format('YYYY-MM-DD')} ${moment(ms).format('HH:mm:ss')}~${moment(ms).subtract(-90, 'minutes').format('HH:mm:ss')}`,
          value: v
        }
      }) : [],
      price: o.price,
      status: o.status,
      rate: o.evaluation ? o.evaluation.point : 0,
      complaint: o.complaint ? o.complaint : {},
      evaluation: o.evaluation ? o.evaluation : {}
    }
  })
}
function formatConsumerOrder (list) {
  return list.map(o => {
    const { _id, roomId, cTime, startTime, consumerTime, consultantTime,
      price, status, evaluation, question, consultant } = o
    const { work, education } = consultant
    let rest = ''
    // 倒计时时间计算
    if (o.startTime) {
        const countdown = o.startTime*1000 - moment().valueOf()
        if (countdown > 0) {
          let times = countdown/(3600*1000)
          let hours = Math.floor(times)
          let mintus = Math.ceil((times - hours)*60)
          rest = `还有${hours}小时${mintus}分开始`
        } else {
          rest = '已过期'
        }
    }
    return {
      ...work,
      ...education,
      orderId: _id,
      avatar: process.env.VUE_APP_HOST_NAME + consultant.avatar,
      name: consultant.name,
      readme: consultant.readme,
      roomId,
      rest,
      startTime: moment(startTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
      cTime: moment(cTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
      consumerTime: consumerTime ? consumerTime.map(v => {
        // 秒转毫秒
        let ms = v * 1000
        return {
          text: `${moment(ms).format('YYYY-MM-DD')} ${moment(ms).format('HH:mm:ss')}~${moment(ms).subtract(-90, 'minutes').format('HH:mm:ss')}`,
          value: v
        }
      }) : [],
      consultantTime: consultantTime ? consultantTime.map(v => {
        // 秒转毫秒
        let ms = v * 1000
        return {
          text: `${moment(ms).format('YYYY-MM-DD')} ${moment(ms).format('HH:mm:ss')}~${moment(ms).subtract(-90, 'minutes').format('HH:mm:ss')}`,
          value: v
        }
      }) : [],
      price: price,
      status: status,
      rate: evaluation ? evaluation.point : 0,
      question: question ? question.map(v => {
        return {
          v,
        }
      }) : []
    }
  })
}
function formatStatus(status) {
  const arr = status.split(',')
  let condition = ''
  arr.forEach((o, i) => {
    if (i == arr.length - 1) {
      condition += `status==${o}`
    } else {
      condition += `status==${o}:`
    }
  })
  return condition
}
export default { 
  getCondition,
  formatConsultantOrder,
  formatConsumerOrder,
  formatStatus
}