<template>
  <el-row>
    <el-col :span="16">
      <scheduler @open-timepicker="openTimepicker"
                 mode="view"></scheduler>
    </el-col>
    <el-col :span="8">
      <div class="time-list">
        <div>
          <h1>当前已选择时间</h1>
          <p v-for="(item, i) in selList"
             :key="i">
            {{item.selText}}
            <i @click="handleDelSelect(i, item)" style="color: #15479E;cursor: pointer"
               class="iconfont iconB_jian-01" />
          </p>
        </div>
        <el-button class="appintment-btn"
                   size="small"
                   type="success"
                   @click="handleCreateOrder">预约单生成</el-button>
      </div>
    </el-col>
    <!-- 选时段 -->
    <div class="calendar-picker"
         v-if="isShow">
      <h1 class="flex-hbc">
        <span>{{selectTime}}</span>
        <i @click="handleCloseTime"
           class="el-icon-close"
           style="font-size: 22px;"></i>
      </h1>
      <ul>
        <li class="flex-hb time-item"
            v-for="(item, i) in usables"
            :key="i"
            @click="handleSelectTime(i, item)">
          <div>{{item.text}}</div>
          <div class="sel-btn"
               :class="{isActive: item.isActive}">选择</div>
          <!-- <div class="sel-btn apointment">已预约</div> -->
        </li>
      </ul>
    </div>
  </el-row>
</template>

<script>
import Scheduler from '@/components/Scheduler'

export default {
  name: 'calendar',
  components: {
    Scheduler
  },
  data () {
    return {
      selectTime: '',
      isShow: false,
      usables: [],
      selList: []
    }
  },
  methods: {
    openTimepicker (list, selectDate) {
      this.isShow = true
      console.log(list)
      this.usables = list
      this.selectTime = selectDate
    },
    handleCreateOrder () {
      this.$emit('create-order')
    },
    handleSelectTime (i, item) {
      item.isActive = !item.isActive
      if (item.isActive) {
        this.selList.push(item)
      } else {
        this.selList.splice(i, 1)
      }
    },
    handleDelSelect(i, item){
      this.selList.splice(i, 1)
      this.usables.forEach(o => {
        if (o.value == item.value) {
          o.isActive = false
        }
      })
    },
    handleCloseTime () {
      this.isShow = false
    },
  }
};
</script>

<style lang="scss" scoped>
.calender {
  border: 1px solid #f6f6f6;
  background: #fff;
  overflow: auto;
  height: 500px;
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
  background: #f6f6f6;
}
.time-item {
  padding: 5px 15px;
}
.sel-btn {
  width: 60px;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.sel-btn.isActive {
  background: #15479e;
  border: 1px solid #15479e;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  color: #fff;
}
.sel-btn.apointment {
  border: 1px solid #15479e;
  color: #15479e;
}
.time-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  flex: 1;
  overflow: auto;
  height: 427px;
  background: #f6f6f6;
}
.time-list > h1 {
  margin-bottom: 18px;
}
.time-list > p {
  margin-bottom: 15px;
}
.appintment-btn {
  margin-top: 40px;
}
</style>
