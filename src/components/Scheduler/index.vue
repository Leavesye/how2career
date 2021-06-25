<template>
  <div element-loading-spinner="el-icon-loading"
       v-loading="isLoading">
    <ejs-schedule ref='schedule'
                  currentView="Month"
                  :popupOpen="onPopupOpen"
                  :actionBegin="handleActionBegin"
                  :eventSettings="eventSettings"
                  :editorTemplate='editorTemplate'
                  :showQuickInfo="showQuickInfo"
                  :views="views"
                  :minDate="minDate"
                  :maxDate="maxDate"></ejs-schedule>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
import zh from './zh.json'
import EventEdit from './modal/edit'
import { L10n, setCulture, loadCldr, createElement } from '@syncfusion/ej2-base'
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
const start = moment().subtract(-7, 'day').startOf('day').valueOf()
const end = moment().subtract(-14, 'day').endOf('day').valueOf()
export default {
  name: 'scheduler',
  props: ['mode', 'events', 'consultantId'],
  provide: {
    schedule: [Day, Week, WorkWeek, Month]
  },
  data () {
    let views = ['Day', 'Week', 'WorkWeek', 'Month']
    let minDate = new Date(start)
    let maxDate = new Date(2050, 12, 31)
    // 查看模式显示月份视图
    if (this.mode == 'view') {
      views = ['Month']
      maxDate = new Date(end)
    }
    return {
      isLoading: false,
      views,
      editorTemplate: function (e) {
        return {
          template: EventEdit
        }
      },
      showQuickInfo: true,
      minDate,
      maxDate,
      eventSettings: {
        dataSource: this.events,
        fields: {
          // subject: { name: 'Subject', default: '咨询可预约时间' },
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
    isExist (v) {
      return !!this.events.find(o => moment(o.StartTime).valueOf() == moment(v).valueOf())
    },
    handleStartChange (v) {
      if (this.isExist(v.value)) {
        this.alert('该时间段已设置', 'warning')
        return false
      }
      this.endTimePicker.value = new Date(moment(v.value).subtract(-30, 'minutes').valueOf())
    },
    async onPopupOpen (args) {
      console.log(args, 'onPopupOpen')
      // 单击出编辑框处理
      if (args.type == 'QuickInfo') {
        // 屏蔽快捷弹框
        args.cancel = true
        // 编辑
        let event = {}
        if (args.data.Id) {
          event = args.data
        } else {
          let startTime = new Date(moment(args.data.StartTime).startOf('day').subtract('-9', 'hours').valueOf())
          event = {
            startTime,
            endTime: new Date(moment(startTime).subtract('-30', 'minutes').valueOf()),
            isAllDay: false,
          }
        }
        this.$refs.schedule.openEditor(event, args.data.Id ? 'Save' : 'Add')
      }
      // 自定义编辑器控件处理
      if (args.type === 'Editor') {
        let startElement = args.element.querySelector('#StartTime')
        if (!startElement.classList.contains('e-datetimepicker')) {
          this.startTimePicker = new DateTimePicker(
            {
              value: args.data.StartTime,
              step: 30,// 间隔30分钟
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
        console.log(scheduleObj, 'scheduleObj', scheduleObj.openEditor)
        let recurElement = args.element.querySelector('#RecurrenceEditor')
        if (!recurElement.classList.contains('e-recurrenceeditor')) {
          this.$nextTick(() => {
             let recurrenceEditorObj = args.element.querySelector('.e-recurrenceeditor').ej2_instances[0];
             recurrenceEditorObj.frequencies = ['none', 'daily', 'weekly'];
          })
          let recurrObject = new RecurrenceEditor({})
          recurrObject.appendTo(recurElement)
          scheduleObj.eventWindow.recurrenceEditor = recurrObject
        }
      }
      // 只读模式选择时间
      if (this.mode == 'view') {
        if (['EventContainer', 'Editor'].includes(args.type)) {
          // 禁用弹框
          args.cancel = true
          this.isLoading = true
          // 获取咨询师该天已经被预约的时间列表
          let ret = await getAppointmentedTimes({ userId: this.consultantId }).catch(e => this.isLoading = false)
          this.isLoading = false
          let useds = ret.result ? (ret.msg || []) : []
          let all = []
          let selectDate = ''
          // 选值 弹自定义弹框
          if (args.type == 'EventContainer') {// 点击更多
            all = args.data.event
            selectDate = moment(args.data.date).format('YYYY-MM-DD')
          } else { // 单击
            selectDate = moment(args.data.StartTime).format('YYYY-MM-DD')
            // all = this.events.filter(o => moment(o.StartTime).format('YYYY-MM-DD') == selectDate)
            all = [args.data]
            // 排除循环事件
            // all = all.filter(o => !o.RecurrenceRule)
            // if (args.data && args.data.RecurrenceRule) {
            //   all.push(args.data)
            // }
          }
          // 可使用的时间列表
          let usables = all.map(o => {
            let s = moment(o.StartTime).format('HH:mm')
            let e = moment(o.EndTime).format('HH:mm')
            let isUsed = useds.includes(moment(o.StartTime).valueOf() / 1000 + '')
            return {
              isUsed,
              text: `${s}-${e}`,
              selText: `${selectDate} ${s}-${e}`,
              value: moment(o.StartTime).valueOf(),
            }
          })
          usables.sort(function (a, b) {
            if (a.value < b.value) {
              return -1
            }
            if (a.value > b.value) {
              return 1
            }
            return 0
          })
          // 显示自定义时间段弹框
          this.$emit('open-timepicker', usables, moment(selectDate).format('YYYY年MM月DD日'))
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
      if (this.isExist(event.StartTime)) {
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
.e-header-date.e-navigate,
.e-block-indicator {
  display: none;
}
.e-schedule .e-month-view .e-work-cells.e-disable-dates {
  background-color: #fff;
}
.edit-row.el-row:first-child {
  display: none;
}
.e-interval, .e-end-on {
  display: none;
}
</style>