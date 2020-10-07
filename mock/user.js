const  consumer = require('./consumer.json')
const  consultant = require('./consultant.json')

module.exports = [
  // user login
  {
    url: '/user/platform/consumer/login',
    type: 'post',
    response: config => {
      console.log(config, '444')
      const { username } = config.body
      return {
        result: true,
        msg: {
          id: '123',
          toke: 'fhdkjhf',
          nickName: 'leaves',
          avatar: '/img.png',
          types: ['consumer', 'consultant']
        }
      }
    }
  },
  {
    url: '/user/platform/consultant/login',
    type: 'post',
    response: config => {
      console.log(config, '444')
      const { username } = config.body
      return {
        result: true,
        msg: {
          id: '123',
          toke: 'fhdkjhf',
          nickName: 'leaves',
          avatar: '/img.png',
          types: ['consumer', 'consultant']
        }
      }
    }
  },

  // get user info
  {
    url: '/user/platform/consumer/user',
    type: 'get',
    response: config => {
      return {
        result: true,
        msg: consumer
      } 
    }
  },
  {
    url: '/user/platform/consultant/user',
    type: 'get',
    response: config => {
      return {
        result: true,
        msg: consultant
      } 
    }
  },

]
