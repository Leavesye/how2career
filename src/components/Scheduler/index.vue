<template>
  <div id='app'>
    <ejs-schedule ref='schedule'
                  currentView="Month"
                  :popupOpen="onPopupOpen"
                  :actionBegin="handleActionBegin"
                  :eventSettings='eventSettings'></ejs-schedule>
  </div>
</template>
<script>
import Vue from 'vue'
import zh from './zh.json'
import { L10n, setCulture, loadCldr } from '@syncfusion/ej2-base'
import { SchedulePlugin, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule'

Vue.use(SchedulePlugin)
setCulture('zh')
L10n.load(zh)
loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/zh/ca-gregorian.json'),
  require('cldr-data/main/zh/numbers.json'),
  require('cldr-data/main/zh/timeZoneNames.json')
)
var data = [{
    Id: 1,
    Subject: 'Explosion of Betelgeuse Star',
    StartTime: new Date(2018, 1, 15, 9, 30),
    EndTime: new Date(2018, 1, 15, 11, 0),
    RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5',
    IsReadonly : true,
    IsAllDay: false,
}, {
    Id: 2,
    Subject: 'Thule Air Crash Report',
    StartTime: new Date(2018, 1, 14, 12, 0),
    EndTime: new Date(2018, 1, 14, 14, 0)
}];
export default {
  name: 'scheduler',
  props: ['eventSettings'],
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda]
  },
  data () {
    return {
    }
  },
  methods: {
    // 新增 编辑 删除监听
    handleActionBegin (e) {
      console.log(e)
      // 新增事件
      if (e.requestType == 'eventCreate') {
        this.$emit('create-event', e.addedRecords[0])
      }
      if (e.requestType == 'eventChange') {
        this.$emit('update-event', e)
      }
      if (e.requestType == 'eventRemove') {
        this.$emit('delete-event', e)
      }
    },
    onPopupOpen (e) {
      // console.log(e)
      if (e.type == 'QuickInfo') {
        //document.querySelector('.e-subject.e-field.e-input').disabled ='disabled'
      } else if (e.type == 'Editor') {
        document.querySelector('.e-subject.e-field').disabled = 'disabled'
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
</style>