import moment from 'moment'

function getCountDown (target, text) { 
  if (!target) return false
  let str = ''
  // 倒计时时间计算
  if (target) {
      const countdown = target*1000 - moment().valueOf()
      if (countdown > 0) {
        let times = countdown/(3600*1000)
        let hours = Math.floor(times)
        let mintus = Math.ceil((times - hours)*60)
        str = `还有${hours}小时${mintus}分${text}`
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
    const { _id: consultantId } =  o.consultant
    // 倒计时时间计算
    let confirmCountDown = getCountDown(o.confirmTimeout, '超时')
    let serviceCountDown = getCountDown(o.startTime, '开始')
    
    return {
      consultantId,
      consumerId: o.consumer,
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
      rprice: o.rPrice,
      status: o.status,
      rate: o.evaluation ? o.evaluation.point : 0,
      complaint: o.complaint,
      evaluation: o.evaluation,
      question: o.question ? o.question.map(v => {
        return {
          v,
        }
      }) : []
    }
  })
}
function formatConsumerOrder (list) {
  return list.map(o => {
    const { _id, roomId, cTime, startTime, consumerTime, consultantTime,
      rPrice: rprice, price, status, evaluation, question, consultant:
      { name, readme, work, education, _id: consultantId, avatar } } = o
    let rest = getCountDown(o.startTime, '开始')
    return {
      ...work,
      ...education,
      orderId: _id,
      consultantId,
      avatarImage: avatar,
      avatar: process.env.VUE_APP_HOST_NAME + avatar,
      name,
      readme,
      roomId,
      rest,
      startTime: startTime ? moment(startTime * 1000).format('YYYY-MM-DD HH:mm:ss'):'',
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
      price, rprice,
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
function formatFavorites (list, btnName, cb, positions) { 
  return list.map(o => {
    const { _id: id, publicInfo: { 
      nickName, avatarImage: avatar, evaluationCount, evaluationPoint,
      selfIntroduction, resume = {} }} = o
    const { workExperience: work } = resume
    const rate = evaluationCount ? evaluationPoint/evaluationCount: 0
    const f = positions.find(v => v.value == (work && work.length? work[0].position: '-1'))
    let position = f ? f.text : ''
    return {
      id, nickName, avatar, rate,
      position,
      evaluationCount, selfIntroduction,
      btn: { name: btnName, cb: cb.bind(this, id)}
    }
  })
}

function getShareQuery(refer, sales, userId) {
  let query = ''
  // 如果这个人 又有sales又有refer, 那么这个人好友分享出去的,sales不传.   
  // 如果只有sales,那么他好友分享出去的有sales和refer
  // 销售分享带(sales) -> A用户分享(sales+refer) -> B用户分享(refer)
  if (refer && sales) {
    query = `refer=${userId}`
  } else if (!refer && sales) {
    query = `refer=${userId}&growth=${sales}`
  } else {
    query = `refer=${userId}`
  }
  return query
}
export default { 
  getCondition,
  formatConsultantOrder,
  formatConsumerOrder,
  formatStatus,
  formatFavorites,
  getShareQuery
}