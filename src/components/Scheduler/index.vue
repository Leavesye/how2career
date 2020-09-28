<template>
  <div id='app'>
    <ejs-schedule></ejs-schedule>
  </div>
</template>
<script>
import Vue from 'vue';
import zh  from './zh.json'
import {L10n, setCulture} from '@syncfusion/ej2-base';
import { SchedulePlugin, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';

Vue.use(SchedulePlugin)
setCulture('en')
L10n.load({'en': {
  "schedule": {
      "day": "天",
      "week": "周",
      "workWeek": "工作周",
      "month": "月",
      "agenda": "议程",
      "weekAgenda": "周议程",
      "workWeekAgenda": "工作周议程",
      "monthAgenda": "月议程",
      "today": "今天",
      "noEvents": "没有活动",
      "emptyContainer": "这一天没有活动安排。",
      "allDay": "一整天",
      "start": "开始",
      "end": "结束",
      "more": "更多",
      "close": "关",
      "cancel": "取消",
      "noTitle": "（无标题）",
      "delete": "删除",
      "deleteEvent": "删除事件",
      "deleteMultipleEvent": "删除多个事件",
      "selectedItems": "选择的项目",
      "deleteSeries": "整个系列",
      "edit": "编辑",
      "editSeries": "整个系列",
      "editEvent": "这个事件",
      "createEvent": "创建",
      "subject": "学科",
      "addTitle": "添加标题",
      "moreDetails": "更多细节",
      "save": "保存",
      "editContent": "您想如何更改系列中的约会？",
      "deleteContent": "您确定要删除此事件吗？",
      "deleteMultipleContent": "您确定要删除所选事件吗？",
      "newEvent": "新事件",
      "title": "标题",
      "location": "位置",
      "description": "描述",
      "timezone": "时区",
      "startTimezone": "开始时区",
      "endTimezone": "结束时区",
      "repeat": "重複",
      "saveButton": "保存",
      "cancelButton": "取消",
      "deleteButton": "删除",
      "recurrence": "再发",
      "wrongPattern": "重複模式无效。",
      "seriesChangeAlert": "您是否要取消对此系列特定实例所做的更改，然后再次将其与整个系列匹配？",
      "createError": "事件的持续时间必须短于发生的频率。缩短持续时间，或在重複事件编辑器中更改重複模式。",
      "sameDayAlert": "同一事件的两次出现不能在同一天发生。",
      "editRecurrence": "编辑重複",
      "repeats": "重複",
      "alert": "警报",
      "startEndError": "所选的结束日期早于开始日期。",
      "invalidDateError": "输入的日期值无效。",
      "blockAlert": "无法在阻止的时间范围内安排事件。",
      "ok": "好",
      "yes": "是",
      "no": "没有",
      "occurrence": "发生",
      "series": "系列",
      "previous": "以前",
      "next": "下一个",
      "timelineDay": "时间轴日",
      "timelineWeek": "时间轴週",
      "timelineWorkWeek": "时间轴工作週",
      "timelineMonth": "时间轴月",
      "timelineYear": "时间轴年份",
      "editFollowingEvent": "后续活动",
      "deleteTitle": "删除活动",
      "editTitle": "编辑活动",
      "beginFrom": "从开始",
      "endAt": "结束于"
    }
  }
})

export default {
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda]
  }
}
</script>
<style lang="scss">
</style>