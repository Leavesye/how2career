<template>
  <div style="padding-bottom: 20px">
    <!-- 标题 -->
    <h1 class="title flex-vc">
      <p>服务时间设置</p>
      <div>通过添加服务时间,你可以设置多个自己可服务的时间段</div>
    </h1>
    <el-card style="margin: 0 30px">
      <!-- 数据面板 -->
      <ul class="slot-pannels flex-hbc">
        <li class>
          <p>当前Slot数</p>
          <div>04</div>
        </li>
        <li>
          <p>可用Slot数</p>
          <div>04</div>
        </li>
        <li>
          <p>停用Slot数</p>
          <div>04</div>
        </li>
      </ul>
      <p class="slot-desc">Slot数代表在一个自然周内,你可同时接的预约,你可以通过购买更多的slot来增加每周的同时预约数</p>
      <!-- 按钮组 -->
      <ul class="slot-btns flex-hc">
        <li v-for="(item, i) in btns"
            :key="i"
            @click="handleClickBtn(item, i)"
            :class="{active: current===i}">{{item.name}}</li>
      </ul>
      <!-- 日程表 -->
      <scheduler :eventSettings="eventSettings"
                 @create-event="createEvent"
                 @update-event="updateEvent"
                 @delete-event="deleteEvent"
                 ></scheduler>
    </el-card>
    <change-slot :isShow="isShow"></change-slot>
  </div>
</template>

<script>
import Vue from 'vue'
import ChangeSlot from './modal/change-slot'
import { getUserInfo, updateUserInfo } from '@/api/user'
import { getToken } from '@/utils/auth'
import Scheduler from '@/components/Scheduler'

// 日程插件动态数据必须同步加载才能渲染
let events = []
const l = Vue.prototype.loading()
const xhr = new XMLHttpRequest()
xhr.open('GET', process.env.VUE_APP_BASE_API + '/user/platform/consultant/user', false)
xhr.setRequestHeader("Authorization", getToken())  //设置请求头
xhr.send()
const res = JSON.parse(xhr.responseText)
let publicinfo = {}
if (res.result) {
  publicinfo = res.msg.publicInfo || {}
  publicinfo.availableTime =  publicinfo.availableTime || []
  events = publicinfo.availableTime
}
l.close()
export default {
  name: 'time-setting',
  components: {
    ChangeSlot,
    Scheduler
  },
  data () {
    return {
      isShow: false,
      current: 0,
      btns: [
        { name: '调整Slot数量' },
        { name: '补缴Slot费用' },
      ],
      eventSettings: { 
        dataSource: events,
         fields: {
            subject: { name: 'Subject', default: '咨询可预约时间' },
        }
      },
    }
  },
  mounted () {
    // publicinfo.availableTime = []
    // this.saveEvent({ publicInfo: publicinfo })
  },
  methods: {
    handleClickBtn (item, i) {
      this.current = i
      this.isShow = true
    },
    async saveEvent(p) {
      const l = this.loading()
      const res = await updateUserInfo(p).catch(e => l.close())
      if (res.result) {
        this.alert('保存成功')
      }
      l.close()
    },
    createEvent (event) {
      publicinfo.availableTime.push(event)
      const p = { publicInfo: publicinfo }
      this.saveEvent(p)
    },
    // 重复发生的事件
    // 在这种情况下，修改后的数据应包含一个附加字段，即RecurrenceID映射到其父定期事件的Id值。
    // 同样，此修改的事件将被视为Scheduler数据源中的新事件，在此它通过RecurrenceID字段值与其父事件链接。
    // 该saveEvent方法采用2个参数，第一个参数接受修改后的事件数据对象，第二个参数接受2个文本值-EditOccurrence或EditSeries。
    // 当第二个参数传递为时EditOccurrence，表示传递的事件数据是单个已修改的事件；而第二个参数传递为时EditSeries，
    // 则意味着修改后的数据需要作为一个整体进行编辑，因此没有新的事件对象将保留在Scheduler数据源中。
    // 在修改单个事件的情况下，还必须RecurrenceException与事件编辑一起更新父事件的字段。
    // 要了解有关如何设置RecurrenceException值的更多信息，请参阅重复事件主题。
    updateEvent (e) {
      let list = publicinfo.availableTime
      // 编辑重复发生事件中的单事件
      // 1.插入此单事件RecurrenceID关联到父  2.父事件加入RecurrenceException字段关联子
      const changeEvent = e.changedRecords[0]
      // 重复事件修改
      if (changeEvent.RecurrenceRule) {
        // 编辑事件系列中的单事件
        if (e.data.occurrence) {
          // 插入单事件
          list.push(changeEvent)
          // 更新父事件
          list = list.filter(o => o.Id != changeEvent.RecurrenceID)
          list.push(e.data.parent)
          console.log(list, 222)
        } else { // 编辑事件序列
          // 取消对此系列单个实例的修改
          if (!changeEvent.RecurrenceException) {
            // 1.删除子事件  2.更新父事件
            list = list.filter(o => o.RecurrenceID != changeEvent.Id).map(o => {
              if (changeEvent.Id == o.Id) return changeEvent
              return o
            })
          } else { // 保留单个实例修改
            // 直接update
            list = list.map(o => {
              if (o.Id == changeEvent.Id) return changeEvent
              return o
            })
          }
        }
      } else { // 普通单事件修改 直接update
        list = list.map(o => {
          if (o.Id == changeEvent.Id) return changeEvent
          return o
        })
      }
      publicinfo.availableTime = list
      const p = { publicInfo: publicinfo }
      this.saveEvent(p)
    },
    deleteEvent (e) {
      let list = publicinfo.availableTime
      const delRecords = e.deletedRecords
      let change = e.changedRecords[0]
      // 删除普通事件
      if (delRecords.length) {
        list = list.filter(o => o.Id != delRecords[0].Id)
      } else { // 重复事件 单事件删除
        let parent = e.data[0] && e.data[0].parent
        if (parent) {
          // 删除系列中的特殊事件
          if (change.RecurrenceException) {
            // 删除自身  更新父
            list = list.filter(o => o.Id != change.Id)
            list = list.map(o => {
              if (o.Id == parent.Id) return e.data[0].parent
              return o
            })
          } else {
            // 更新序列
            list = list.map(o => {
              if (o.Id == parent.Id) return parent
              return o
            })

          }
        } else { // 删除整个序列
          // 删除父事件
          list = list.filter(o => o.Id != change.Id)
          // 删除关联的子事件
          list = list.filter(o => o.RecurrenceID != change.Id)
        }
      }
      publicinfo.availableTime = list
      const p = { publicInfo: publicinfo }
      this.saveEvent(p)
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  padding: 20px 30px;
  border-bottom: 1px solid #edeeef;
  margin-bottom: 30px;
}
.title > p {
  font-size: 16px;
  color: #15479e;
  margin-right: 20px;
}
.title > div {
  font-size: 14px;
  color: #7c8ea5;
}
.slot-pannels {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}
.slot-pannels li p {
  font-size: 14px;
  color: #15479e;
  margin-bottom: 10px;
}
.slot-pannels li div {
  font-size: 26px;
  color: #7c8fa5;
}
.slot-desc {
  width: 620px;
  font-size: 14px;
  color: #7c8fa5;
  background: #f6f6f6;
  border-radius: 3px;
  margin: 10px auto 30px;
  text-align: center;
}
.slot-btns {
  margin-bottom: 30px;
}
.slot-btns li {
  width: 120px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 3px;
  font-size: 14px;
  color: #7c8fa5;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  margin-left: 20px;
}
.slot-btns li.active {
  background: #15479e;
  color: #fff;
}
</style>
