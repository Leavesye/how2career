<template>
  <div id='app'>
    <ejs-schedule ></ejs-schedule>
  </div>
</template>
<script>
import Vue from 'vue';
import { SchedulePlugin, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';

Vue.use(SchedulePlugin);
export default {
  provide: {
    schedule: [Day, Week, WorkWeek, Month, Agenda]
  }
}
</script>
<style lang="scss">
</style>