<template>
  <div id='app'>
    <ejs-schedule ref='schedule' currentView="Month" :popupOpen="onPopupOpen" :actionBegin="handleActionBegin" :selectedDate='selectedDate' :eventSettings='eventSettings'></ejs-schedule>
  </div>
</template>
<script>
import Vue from 'vue';
import zh from './zh.json'
import {L10n, setCulture, loadCldr} from '@syncfusion/ej2-base';
import { SchedulePlugin, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';

Vue.use(SchedulePlugin)
setCulture('zh')
L10n.load(zh)
loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/zh/ca-gregorian.json'),
    require('cldr-data/main/zh/numbers.json'),
    require('cldr-data/main/zh/timeZoneNames.json')
);

let data = [{
  Id: 2,
  EventName: 'Meeting',
  StartTime: new Date(2018, 1, 15, 10, 0),
  EndTime: new Date(2018, 1, 15, 12, 30),
  IsAllDay: false
}]
export default {
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda]
  },
  data () {
    return {
      selectedDate: new Date(2018, 1, 15),
      eventSettings: {
        dataSource: data,
        fields: {
          id: 'Id',
          subject: { default: '咨询可预约时间', isReadonly: 'true' },
          isAllDay: { name: 'IsAllDay' },
          startTime: { name: 'StartTime' },
          endTime: { name: 'EndTime' }
        }
      }
    }
  },
  methods: {
    // 新增 编辑 删除监听
    handleActionBegin(e) {
      
    },
    onPopupOpen(e) {
      console.log(e)
      if (e.type == 'QuickInfo') {
        document.querySelector('.e-subject.e-field.e-input').disabled ='disabled'
      } else if (e.type == 'Editor') {
        document.querySelector('.e-subject.e-field').disabled ='disabled'
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      console.log(this.$refs.schedule, this.$refs.schedule.getBlockEvents())
    })
  }
}
</script>
<style lang="scss">

</style>