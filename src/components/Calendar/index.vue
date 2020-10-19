<template>
  <el-row style="margin-top: 20px">
    <el-col :span="16">
      <scheduler v-if="isLoaded" @reload="handleReloadSchduler" @open-timepicker="openTimepicker"
                 mode="view" :events="events" :consultantId="order.consultantId"></scheduler>
    </el-col>
    <el-col :span="8">
      <div class="time-list">
        <div>
          <h1 style="margin-bottom: 10px">当前已选择时间</h1>
          <p v-for="(item, i) in selList"
             :key="i">
            {{item.selText}}
            <i @click="handleDelSelect(i, item)" :style="{color: user.role=='consumer'? '#36AE82':'#15479E',cursor: 'pointer'}"
               class="iconfont iconB_jian-01" />
          </p>
        </div>
        <!-- 预约生成订单按钮插槽 -->
        <slot></slot>
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
      <ul class="time-box">
        <li class="flex-hb time-item"
            v-for="(item, i) in usables"
            :key="i"
            @click="handleSelectTime(i, item)">
          <div>{{item.text}}</div>
          <div class="sel-btn"
               :class="[ user.role, {isActive: item.isActive}]">选择</div>
          <!-- <div class="sel-btn apointment">已预约</div> -->
        </li>
      </ul>
    </div>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Scheduler from '@/components/Scheduler'
import { getPublicInfo } from '@/api/user'

export default {
  name: 'calendar',
  props: ['order'],
  components: {
    Scheduler
  },
  data () {
    return {
      selectTime: '',
      isShow: false,
      usables: [],
      selList: [],
      isLoaded: false,
      events: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  async created() {
    this.init()
  },
  methods: {
    handleReloadSchduler(){
      this.init()
    },
    async init() {
      this.isLoaded = false
      const l = this.loading()
      const res = await getPublicInfo({ userId: this.order.consultantId }).catch(e=>{
        l.close()
        this.isLoaded = true
      })
      if (res.result) {
        const { publicInfo: { availableTime }} = res.msg
        this.events = availableTime
        this.$emit('init-data', res)
      }
      this.isLoaded = true
      l.close()
    },
    openTimepicker (list, selectDate) {
      this.isShow = true
      this.usables = list.map(o => {
        this.selList.find(v=>v.value==o.value) && (o.isActive = true)
        return o
      })
      this.selectTime = selectDate
    },
    handleCreateOrder () {
      this.$emit('create-order', this.selList)
    },
    handleSelectTime (i, item) {
      if (this.selList.length == 3) {
        this.alert('最多只能选择三个时间', 'warning')
        return false
      }
      item.isActive = !item.isActive
      this.usables = this.usables.map(o => {
        if (item.value==o.value) {
          o = item
        }
        return o
      })
      if (item.isActive) {
        this.selList.push(item)
      } else {
        this.selList = this.selList.filter(o => o.value != item.value)
      }
      this.$emit('set-time', this.selList)
    },
    handleDelSelect(i, item){
      this.selList.splice(i, 1)
      this.usables.forEach(o => {
        if (o.value == item.value) {
          o.isActive = false
        }
      })
      this.$emit('set-time', this.selList)
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
.time-box {
  padding: 15px;
}
.time-item {
  margin-bottom: 15px;
}
.time-item:last-child {
  margin-bottom: 0;
}
.sel-btn {
  width: 60px;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.sel-btn.consultant.isActive {
  background: #15479e;
  border: 1px solid #15479e;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  color: #fff;
}
.sel-btn.consumer.isActive {
  background: #36AE82;
  border: 1px solid #36AE82;
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
</style>
