import Vue from 'vue'
import TRTC from 'trtc-js-sdk'
import genTestUserSig from './GenerateTestUserSig'

const alert = Vue.prototype.alert
/* global $ TRTC getCameraId getMicrophoneId resetView isHidden shareUserId addMemberView removeView addVideoView */
export default class RtcClient {
  constructor(options) {
    const config = genTestUserSig(options.userId, process.env.VUE_APP_SKDAPPID, process.env.VUE_APP_USERSIG)
    this.sdkAppId_ = +process.env.VUE_APP_SKDAPPID
    this.userSig_ = config.userSig
    this.userId_ = options.userId
    this.roomId_ = options.roomId

    this.cameraId = ''
    this.micId = ''
    this.isJoined_ = false
    this.isPublished_ = false
    this.isAudioMuted = false
    this.isVideoMuted = false
    this.localStream_ = null
    this.remoteStreams_ = []
    this.members_ = new Map()

    // create a client for RtcClient
    this.client_ = TRTC.createClient({
      mode: 'rtc',
      sdkAppId: this.sdkAppId_,
      userId: this.userId_,
      userSig: this.userSig_
    })
    this.handleEvents()
    TRTC.checkSystemRequirements().then(result => {
      if (!result) {
        alert('您的浏览器不兼容此应用！\n建议下载最新版Chrome浏览器')
      }
    })

    // // populate camera options
    // TRTC.getCameras().then(devices => {
    //   devices.forEach(device => {
    //     if (!this.cameraId) {
    //       this.cameraId = device.deviceId
    //     }
    //   })
    // })

    // populate microphone options
    TRTC.getMicrophones().then(devices => {
      devices.forEach(device => {
        if (!this.micId) {
          this.micId = device.deviceId
        }
      })
    })
  }

  async join () {
    if (this.isJoined_) {
      console.warn('duplicate RtcClient.join() observed')
      return
    }
    try {
      // 加入房间
      await this.client_.join({
        roomId: this.roomId_
      })
      console.log('join room success')
      this.isJoined_ = true

      // create a local stream with audio/video from microphone/camera
      if (this.micId) {
        this.localStream_ = TRTC.createStream({
          audio: true,
          video: false,
          userId: this.userId_,
          // cameraId: this.cameraId,
          microphoneId: this.micId,
          // mirror: true
        })
      } else {
        // not to specify cameraId/microphoneId to avoid OverConstrainedError
        this.localStream_ = TRTC.createStream({
          audio: true,
          video: false,
          userId: this.userId_,
          mirror: false
        })
      }
      try {
        // initialize the local stream and the stream will be populated with audio/video
        await this.localStream_.initialize()
        console.log('initialize local stream success')

        this.localStream_.on('player-state-changed', event => {
          console.log(`local stream ${event.type} player is ${event.state}`)
        })

        // publish the local stream
        await this.publish()

        this.localStream_.play('main-video')
      } catch (e) {
        console.error('failed to initialize local stream - ' + e)
      }
    } catch (e) {
      console.error('join room failed! ' + e)
    }
    //更新成员状态
    let states = this.client_.getRemoteMutedState()
  }

  async leave () {
    if (!this.isJoined_) {
      console.warn('leave() - please join() firstly')
      return
    }
    // ensure the local stream is unpublished before leaving.
    await this.unpublish()

    // leave the room
    await this.client_.leave()

    this.localStream_.stop()
    this.localStream_.close()
    this.localStream_ = null
    this.isJoined_ = false
  }

  async publish () {
    if (!this.isJoined_) {
      console.warn('publish() - please join() firstly')
      return
    }
    if (this.isPublished_) {
      console.warn('duplicate RtcClient.publish() observed')
      return
    }
    try {
      await this.client_.publish(this.localStream_)
    } catch (e) {
      console.error('failed to publish local stream ' + e)
      this.isPublished_ = false
    }

    this.isPublished_ = true
  }

  async unpublish () {
    if (!this.isJoined_) {
      console.warn('unpublish() - please join() firstly')
      return
    }
    if (!this.isPublished_) {
      console.warn('RtcClient.unpublish() called but not published yet')
      return
    }

    await this.client_.unpublish(this.localStream_)
    this.isPublished_ = false
  }

  muteLocalAudio () {
    this.localStream_.muteAudio()
  }

  unmuteLocalAudio () {
    this.localStream_.unmuteAudio()
  }

  muteLocalVideo () {
    this.localStream_.muteVideo()
  }

  unmuteLocalVideo () {
    this.localStream_.unmuteVideo()
  }

  resumeStreams () {
    this.localStream_.resume()
    for (let stream of this.remoteStreams_) {
      stream.resume()
    }
  }

  handleEvents () {
    this.client_.on('error', err => {
      console.error(err)
      alert(err)
      location.reload()
    })
    this.client_.on('client-banned', err => {
      console.error('client has been banned for ' + err)
      if (!isHidden()) {
        alert('您已被踢出房间')
        location.reload()
      } else {
        document.addEventListener(
          'visibilitychange',
          () => {
            if (!isHidden()) {
              alert('您已被踢出房间')
              location.reload()
            }
          },
          false
        )
      }
    })
    // 远端用户进房通知，只有主动推流的远端用户进房才会收到该通知。
    this.client_.on('peer-join', evt => {
      const userId = evt.userId
      console.log('peer-join ' + userId)
      // if (userId !== shareUserId) {
      //   addMemberView(userId)
      // }
    })
    // 远端用户退房通知，只有主动推流的远端用户退房才会收到该通知。
    this.client_.on('peer-leave', evt => {
      const userId = evt.userId
      removeView(userId)
      console.log('peer-leave ' + userId)
    })
    // 远端流添加事件，当远端用户发布流后会收到该通知
    this.client_.on('stream-added', evt => {
      const remoteStream = evt.stream
      const id = remoteStream.getId()
      const userId = remoteStream.getUserId()
      this.members_.set(userId, remoteStream)
      console.log(`remote stream added: [${userId}] ID: ${id} type: ${remoteStream.getType()}`)
      this.client_.subscribe(remoteStream)
    })
    // 远端流订阅成功事件，调用 subscribe() 成功后会触发该事件
    this.client_.on('stream-subscribed', evt => {
      const uid = evt.userId
      const remoteStream = evt.stream
      const id = remoteStream.getId()
      this.remoteStreams_.push(remoteStream)
      remoteStream.on('player-state-changed', event => {
        console.log(`${event.type} player is ${event.state}`)
      })
      addVideoView(id)
      // objectFit 为播放的填充模式，详细参考：https://trtc-1252463788.file.myqcloud.com/web/docs/Stream.html#play
      remoteStream.play(id, { objectFit: 'contain' })
      console.log('stream-subscribed ID: ', id)
    })
    // 远端流移除事件，当远端用户取消发布流后会收到该通知
    this.client_.on('stream-removed', evt => {
      const remoteStream = evt.stream
      const id = remoteStream.getId()
      remoteStream.stop()
      this.remoteStreams_ = this.remoteStreams_.filter(stream => {
        return stream.getId() !== id
      })
      removeView(id)
      console.log(`stream-removed ID: ${id}  type: ${remoteStream.getType()}`)
    })

    // 远端流更新事件，当远端用户添加、移除或更换音视频轨道后会收到该通知
    this.client_.on('stream-updated', evt => {
      const remoteStream = evt.stream
      let uid = this.getUidByStreamId(remoteStream.getId())
      console.log(
        'type: ' +
        remoteStream.getType() +
        ' stream-updated hasAudio: ' +
        remoteStream.hasAudio() +
        ' hasVideo: ' +
        remoteStream.hasVideo() +
        ' uid: ' +
        uid
      )
    })
    // 远端用户禁用音频通知
    this.client_.on('mute-audio', evt => {
      console.log(evt.userId + ' mute audio')
    })
    // 远端用户启用音频通知
    this.client_.on('unmute-audio', evt => {
      console.log(evt.userId + ' unmute audio')
    })
    // 远端用户禁用视频通知
    this.client_.on('mute-video', evt => {
      console.log(evt.userId + ' mute video')
    })
    // 远端用户启用视频通知
    this.client_.on('unmute-video', evt => {
      console.log(evt.userId + ' unmute video')
    })
  }

  showStreamState (stream) {
    console.log('has audio: ' + stream.hasAudio() + ' has video: ' + stream.hasVideo())
  }

  getUidByStreamId (streamId) {
    for (let [uid, stream] of this.members_) {
      if (stream.getId() == streamId) {
        return uid
      }
    }
  }
}
