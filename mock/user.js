const  consumer = require('./consumer.json')

module.exports = [
  // user login
  {
    url: '/user/platform/login',
    type: 'post',
    response: config => {
      console.log(config, '444')
      const { username } = config.body
      const token = tokens[username]
      return {
        result: true,
        msg: {
          id: '123',
          toke: 'fhdkjhf',
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
    url: '/user/platform/consumer/user?1',
    type: 'get',
    response: config => {
      return {
        result: true,
        msg: consumer
      } 
    }
  },

]
