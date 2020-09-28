<template>
  <div class="calendar-box flex"
       v-if="isShowCalendar">
    <a-config-provider :locale="locale">
      <a-calendar :locale="locale.calendar"
                  class="calender"
                  @select="onSelect"
                  @panelChange="onPanelChange">
      </a-calendar>
    </a-config-provider>
    <div class="time-list">
      <h1>当前已选择时间</h1>
      <p v-for="(item, i) in currentTimeList"
         :key="i">{{item}}<i style="color: #15479E"
           class="iconfont iconB_jian-01" /></p>
    </div>
    <!-- 选时段 -->
    <div class="calendar-picker" v-if="isShow">
      <h1 class="flex-hbc">
        <span>{{selectTime}}</span>
        <i @click="handleCloseTime" class="el-icon-close" style="font-size: 22px;"></i>
      </h1>
      <ul>
        <li class="flex-hb time-item" v-for="(item, i) in canSelectTimes" :key="i" @click="handleSelectTime(i)">
          <div>{{item.v}}</div>
          <div class="sel-btn" :class="{isActive: currentTimeIndex === i}">选择</div>
          <!-- <div class="sel-btn apointment">已预约</div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Calendar, ConfigProvider } from 'ant-design-vue'

Vue.use(Calendar)
Vue.use(ConfigProvider)

export default {
  name: 'calendar',
  props: ['isShowCalendar'],
  data () {
    return {
      selectTime: '',
      currentTimeIndex: '',
      isShow: false,
      locale: zhCN,
      canSelectTimes: [
        {v: '18:30-19:30'},
        {v: '18:30-19:30'},
        {v: '18:30-19:30'},
        {v: '18:30-19:30'},
      ],
      currentTimeList: [
        '2020-10-23 18:30-19:30',
        '2020-10-23 17:30-18:30',
        '2020-10-23 17:30-18:30',
        '2020-10-23 17:30-18:30',
        '2020-10-23 17:30-18:30',
        '2020-10-23 17:30-18:30',
        '2020-10-23 17:30-18:30',
        '2020-10-23 17:30-18:30',
        '2020-10-23 17:30-18:30',
      ]
    }
  },
  methods: {
    handleSelectTime(i) {
      this.currentTimeIndex = i
    },
    handleCloseTime() {
      this.isShow = false
    },
    onSelect (value) {
      console.log(value.format('YYYY-MM-DD'))
      this.selectTime = value.format('YYYY年MM月DD日')
      this.isShow = true
    },
    onPanelChange (value, mode) {
      console.log(value, mode)
    },
  }
};
</script>

<style lang="scss" scoped>
.calendar-box {
  height: 370px;
  margin-top: 20px;
  background: #f6f6f6;
  position: relative;
}
.calender {
  width: 440px;
  border: 1px solid #f6f6f6;
  background: #fff;
  overflow: auto;
}
.calendar-picker {
  position: absolute;
  z-index: 100;
  left: 20%;
  top: 20%;
  width: 220px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  background: #fff;
}
.calendar-picker > h1 {
  padding: 0 15px;
  font-weight: 600;
  color: #262626;
  height: 50px;
  line-height: 50px;
  background: #F6F6F6;
}
.time-item {
  padding: 5px 15px;
}
.sel-btn {
  width: 60px;
  height: 22px;
  line-height: 22px;
  border-radius: 3px;
  border: 1px solid #E0E0E0;
  text-align: center;
}
.sel-btn.isActive {
  background: #15479E;
  border: 1px solid #15479E;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  color:#fff;
}
.sel-btn.apointment {
  border: 1px solid #15479E;
  color: #15479E;
}
.time-list {
  padding: 20px 15px;
  flex: 1;
  overflow: auto;
}
.time-list > h1 {
  margin-bottom: 18px;
}
.time-list > p {
  margin-bottom: 15px;
}
</style>
