<template>
  <div id='app'>
    <ejs-schedule ref='schedule'
                  currentView="Month"
                  :popupOpen="onPopupOpen"
                  :actionBegin="handleActionBegin"
                  :eventSettings="eventSettings"
                  :editorTemplate='editorTemplate'
                  :showQuickInfo="showQuickInfo"
                  :views="views"
                  :dataBound="onDataBound"
                  ></ejs-schedule>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
import zh from './zh.json'
import EventEdit from './modal/edit'
import { L10n, setCulture, loadCldr } from '@syncfusion/ej2-base'
import { SchedulePlugin, Day, Week, WorkWeek, Month, RecurrenceEditor } from '@syncfusion/ej2-vue-schedule'
import { DateTimePicker } from '@syncfusion/ej2-calendars'
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
export default {
  name: 'scheduler',
  props: ['mode', 'events', 'consultantId'],
  provide: {
    schedule: [Day, Week, WorkWeek, Month]
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
      editorTemplate: function (e) {
        return {
          template: EventEdit
        }
      },
      showQuickInfo: true,
      eventSettings: {
        dataSource: this.events,
        fields: {
          subject: { name: 'Subject', default: '咨询可预约时间' },
          startTime: { name: 'StartTime', validation: { required: [true, '请选择开始时间'] } },
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
    // 获取所有事件
    onDataBound: function (args){
      let event = this.$refs.schedule.ej2Instances.getEvents();
    },
    // 新增 编辑 删除监听
    handleActionBegin (e) {
      console.log(e, 'ActionBegin')
      e.data && (e.data.IsAllDay = false)
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
    isExist(v) {
      return !!this.events.find(o => moment(o.StartTime).valueOf()==moment(v).valueOf())
    },
    handleStartChange(v) {
      if (this.isExist(v.value)) {
        this.alert('该时间段已设置', 'warning')
        return false
      }
      this.endTimePicker.value = new Date(moment(v.value).subtract(-90, 'minutes').valueOf())
    },
    async onPopupOpen (args) {
      console.log(args, 'onPopupOpen')
      // 单击出编辑框处理
      if (args.type=='QuickInfo') {
        // 屏蔽快捷弹框
        args.cancel = true
        // 编辑
        let event = {}
        if (args.data.Id) {
          event = args.data
        } else {
          let start = new Date(moment(args.data.StartTime).startOf('day').subtract('-8','hours').valueOf())
          event = {
            startTime: start,
            endTime: new Date(moment(start).subtract('-90','minutes').valueOf()),
            isAllDay: false,
          }
        }
        this.$refs.schedule.openEditor(event, args.data.Id ? 'Save' : 'Add')
      }
      // 自定义编辑器空间处理
      if (args.type === 'Editor') {
        let startElement = args.element.querySelector('#StartTime')
        if (!startElement.classList.contains('e-datetimepicker')) {
          this.startTimePicker= new DateTimePicker(
            { 
              value: args.data.StartTime,
              step: 90,// 间隔90分钟
              allowEdit: false,// 禁用输入
              showClearButton: false,// 隐藏清空按钮
              change: this.handleStartChange
            },
            startElement,
          )
        }
        let endElement = args.element.querySelector('#EndTime')
        if (!endElement.classList.contains('e-datetimepicker')) {
          this.endTimePicker = new DateTimePicker(
            { 
              value: args.data.EndTime,
              enabled: false 
            },
            endElement
          )
        }
        // 重复事件编辑器设置
        let scheduleObj = this.$refs.schedule.ej2Instances
        console.log(scheduleObj, 'scheduleObj')
        let recurElement = args.element.querySelector('#RecurrenceEditor')
        if (!recurElement.classList.contains('e-recurrenceeditor')) {
          let recurrObject = new RecurrenceEditor({})
          recurrObject.appendTo(recurElement)
          scheduleObj.eventWindow.recurrenceEditor = recurrObject
        }
        //document.getElementById('RecurrenceEditor').style.display = (scheduleObj.currentAction == 'EditOccurrence') ? 'none' : 'block'
      }
      // 只读模式选择时间
      if (this.mode == 'view') {
        if (['EventContainer', 'Editor'].includes(args.type)) {
          // 禁用弹框
          args.cancel = true
          // 选值 弹自定义弹框
          if (args.data.Id || args.data.date) { // 单选/点击更多
            const currentDate = args.data.StartTime || args.data.date
            const start = moment().subtract(-7, 'day').startOf('day').valueOf()
            const end = moment().subtract(-14, 'day').endOf('day').valueOf()
            const current = moment(currentDate).valueOf()
            // 只能预约未来7-14天的服务
            if (current < start || current > end) {
              this.alert('只能预约未来7-14天的服务', 'warning')
              return false
            }
            const selectDate = moment(currentDate).format('YYYY-MM-DD')
            // 获取咨询师该天已经被预约的时间列表
            let ret = await getAppointmentedTimes({ userId: this.consultantId })
            let useds = ret.result ? (ret.msg || []) : []
            const selectDayUseds = useds.filter(o => moment(o).format('YYYY-MM-DD') == selectDate)
            let all = this.events.filter(o => moment(o.StartTime).format('YYYY-MM-DD') == selectDate)
            let usables = all.filter(o => !useds.includes(moment(o.StartTime).valueOf()/1000))
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
      } else { // 编辑模式
        if (args.type == 'QuickInfo' && !args.data.Id) {
          document.querySelector('.e-subject.e-field.e-input').readOnly = true
        }
      }
    },
    async saveEvent (p) {
      const l = this.loading()
      const res = await updateAvailableTime({ availableTime: p }).catch(e => l.close())
      if (res.result) {
        this.alert('保存成功')
        this.$emit('reload')
      }
      l.close()
    },
    createEvent (event) {
      if(this.isExist(event.StartTime)) {
        this.alert('该时间段已设置', 'warning')
        this.$emit('reload')
        return false
      }
      this.events.push(event)
      this.saveEvent(this.events)
    },
    updateEvent (e) {
      let list = this.events
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
      this.events = list
      this.saveEvent(this.events)
    },
    deleteEvent (e) {
      let list = this.events
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
      this.events = list
      this.saveEvent(this.events)
    },
  },
  mounted () {
  }
}
</script>
<style>
.e-schedule .e-date-header-wrap .e-schedule-table thead {
  display: none !important;
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