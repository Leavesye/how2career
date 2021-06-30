import TRTC from 'trtc-js-sdk'
export default {
  methods: {
    reOpen() {
      this.isShow = true
    },
    handleChatStart () {
      this.isShow = false
      // 加入聊天室
      this.initRtcClient(this.roomInfo)
    },
    async initRtcClient (info) {
      // 检测设备
      const res = await TRTC.checkSystemRequirements()
      if (!res) {
        this.alert('您的浏览器不兼容此应用！\n建议下载最新版Chrome浏览器', 'warning')
        return false
      }
      this.client = TRTC.createClient({
        mode: 'rtc',
        sdkAppId: process.env.VUE_APP_SKDAPPID,
        userId: info.userId,
        userSig: info.sign,
        streamId: info.orderId
      })
      // this.client.on('peer-leave', event => {
      //   console.log(`${event.userId}已经离开房间`)
      //   this.handlePeerLeave()
      // })
      //注册远程监听，要放在加入房间前--这里用了发布订阅模式
      this.subscribeStream(this.client)
      //初始化后才能加入房间
      this.joinRoom(this.client, info.roomId, info.userId)
    },
    //加入房间
    joinRoom (client, roomId, userId) {
      client.join({ roomId: parseInt(roomId) })
        .catch(error => {
          console.error('进房失败 ' + error);
        })
        .then(() => {
          console.log('进房成功');
          //创建本地流
          this.createStream(userId)
          //播放远端流
          this.playStream(this.client)
      });
    },
    
    //创建本地音视频流
    createStream (userId) {
      const localStream = TRTC.createStream({ userId, audio: true, video: false });
      this.localStream =localStream 
     
      localStream
        .initialize()
        .catch(error => {
          console.error('初始化本地流失败 ' + error);
          this.alert(error)
        })
        .then(() => {
          console.log('初始化本地流成功');
          // 创建好后才能播放 本地流播放 local_stream 是div的id
          localStream.play('local_stream');
          //创建好后才能发布
          this.publishStream(localStream, this.client)
        });
    },

    //发布本地音视频流
    publishStream (localStream, client) {
      client
        .publish(localStream)
        .catch(error => {
          console.error('本地流发布失败 ' + error);
        })
        .then(() => {
          console.log('本地流发布成功');
        });
     },
     
    //订阅远端流--加入房间之前
    subscribeStream (client) {
      client.on('stream-added', event => {
        const remoteStream = event.stream;
        console.log('远端流增加: ' + remoteStream.getId());
        //订阅远端流
        client.subscribe(remoteStream);
      });
    },

    //播放远端流
    playStream (client) {
      client.on('stream-subscribed', event => {
        const remoteStream = event.stream;
        console.log('远端流订阅成功：' + remoteStream.getId());
        // 创建远端流标签，因为id是动态的，所以动态创建，用了v-html
        remoteStream.on('player-state-changed', event => {
          console.log(`${event.type} player is ${event.state} because of ${event.reason}`)
          // PLAYING  STOPPED 对方说话状态
          this.playState = event.state
        })
        this.remoteStream = `<view id="${'remote_stream-' + remoteStream.getId()}"  ></view>`;
        
        //做了dom操作 需要使用$nextTick(),否则找不到创建的标签无法进行播放
        this.$nextTick(() => {
            //播放
          remoteStream.play('remote_stream-' + remoteStream.getId());
        })
      });
    },

    //退出音视频
    leaveRoom () {
      this.client
        .leave()
        .then(() => {
            console.log('退房成功')
          // 停止本地流，关闭本地流内部的音视频播放器
          this.localStream.stop();
          // 关闭本地流，释放摄像头和麦克风访问权限
          this.localStream.close();
          this.localStream = null;
          this.client = null
          // 退房成功，可再次调用client.join重新进房开启新的通话。
        })
        .catch(error => {
          console.error('退房失败 ' + error);
          // 错误不可恢复，需要刷新页面。
        });
    },
  }
}