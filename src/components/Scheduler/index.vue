<template>
  <div id='app'>
    <ejs-schedule ref='schedule'
                  currentView="Month"
                  :popupOpen="onPopupOpen"
                  :actionBegin="handleActionBegin"
                  :eventSettings='eventSettings'
                  :timeScale="timeScale"
                  :showQuickInfo="showQuickInfo"
                  :views="views"></ejs-schedule>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
import zh from './zh.json'
import { L10n, setCulture, loadCldr } from '@syncfusion/ej2-base'
import { SchedulePlugin, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule'
import { getUserInfoSync, getAppointmentedTimes } from '@/api/user'
import { updateAvailableTime } from '@/api/consultant'

Vue.use(SchedulePlugin)
setCulture('zh')
L10n.load(zh)
loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/zh/ca-gregorian.json'),
  require('cldr-data/main/zh/numbers.json'),
  require('cldr-data/main/zh/timeZoneNames.json')
)
let events = []
// 必须同步方式或许数据 否则无法回显
const res = getUserInfoSync()
if (res.result) {
  events =  (res.msg.publicInfo && res.msg.publicInfo.availableTime) || []
}
export default {
  name: 'scheduler',
  props: ['mode'],
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda]
  },
  // created() {
  //   publicinfo.availableTime = []
  //   this.saveEvent({ publicInfo: publicinfo })
  // },
  data () {
    let views = ['Day', 'Week', 'WorkWeek', 'Month']
    // 查看模式显示月份视图
    if (this.mode == 'view') {
      views = ['Month']
    }
    return {
      views,
      showQuickInfo: true,
      timeScale: {
        enable: true,
        interval: 90,
        slotCount: 1
      },
      eventSettings: { 
        dataSource: events,
         fields: {
            subject: { name: 'Subject', default: '咨询可预约时间' },
        },
      },
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    // 新增 编辑 删除监听
    handleActionBegin (e) {
      console.log(e)
      // 新增事件
      if (e.requestType == 'eventCreate') {
        this.createEvent(e.addedRecords[0])
      }
      if (e.requestType == 'eventChange') {
        this.updateEvent(e)
      }
      if (e.requestType == 'eventRemove') {
        this.deleteEvent(e)
      }
    },
    async onPopupOpen (args) {
      console.log(args)
      // 只读模式选择时间
      if (this.mode == 'view') {
        if (['EventContainer', 'QuickInfo', 'Editor'].includes(args.type)) {
          // 禁用弹框
          args.cancel = true
          // 选值 弹自定义弹框
          if (args.data.Id || args.data.date) { // 单选/点击更多
            // 选择的日期
            const selectDate = moment(args.data.StartTime || args.data.date).format('YYYY-MM-DD')
            // 咨询师 or 咨询者打开 取userId
            let id = this.user.role == 'consultant' ? this.user.userId : '搜索到的咨询师userId'
            // 获取咨询师该天已经被预约的时间列表
            let ret = await getAppointmentedTimes({ userId: id })
            let useds = ret.result ? (ret.msg || []) : []
            const selectDayUseds = useds.filter(o => moment(o).format('YYYY-MM-DD') == selectDate)
            let all = events.filter(o => moment(o.StartTime).format('YYYY-MM-DD') == selectDate)
            let usables = all.filter(o => !useds.includes(moment(o.StartTime).valueOf()))
            // 可使用的时间列表
            usables = usables.map(o => {
              let s = moment(o.StartTime).format('HH:mm')
              let e = moment(o.EndTime).format('HH:mm')
              return {
                text: `${s}-${e}`,
                selText: `${selectDate} ${s}-${e}`,
                value: moment(o.StartTime).valueOf(),
              }
            })
            // 显示自定义时间段弹框
            this.$emit('open-timepicker', usables, moment(selectDate).format('YYYY年MM月DD日'))
          }
        }
      } else {
        console.log(8888)
        // 编辑模式样式处理
        if (args.type == 'QuickInfo' && !args.data.Id) {
          document.querySelector('.e-subject.e-field.e-input').readOnly = true
        } else if (args.type == 'Editor') {
          document.querySelector('.e-subject.e-field').readOnly = true
        }
      }
    },
    async saveEvent(p) {
      const l = this.loading()
      const res = await updateAvailableTime({ availableTime: p }).catch(e => l.close())
      if (res.result) {
        this.alert('保存成功')
      }
      l.close()
    },
    createEvent (event) {
      events.push(event)
      this.saveEvent(events)
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
      let list = events
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
      events = list
      this.saveEvent(events)
    },
    deleteEvent (e) {
      let list = events
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
      events = list
      this.saveEvent(events)
    },
  },
  mounted () {
  }
}
</script>
<style>
.e-schedule .e-date-header-wrap .e-schedule-table thead {
  display: none!important;
}
.e-all-day-time-zone-row {
  display: none;
}
.e-location-container,
.e-description-container,
.e-header-date.e-navigate {
  display: none;
}
</style>