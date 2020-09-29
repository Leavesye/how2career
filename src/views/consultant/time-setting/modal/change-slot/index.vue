<template>
<el-dialog
  title="Slot数量调整"
  :visible.sync="isShow"
  width="430px"
  center>
  <section class="modal-main">
    <div class="flex-hb item">
      <label for="">当前Slot数:</label>
      <div>06</div>
    </div>
    <div class="flex-hb item">
      <label for="">调整Slot数：</label>
      <el-input v-model="value" size="small"></el-input>
    </div>
    <div class="flex-hb item">
      <label for="">调整后，你还需支付：</label>
      <div>¥1200.00</div>
    </div>
  </section>
  <span slot="footer" class="flex-he">
    <el-button size="mini" type="primary">确定</el-button>
  </span>
</el-dialog>
</template>

<script>
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'

export default {
  name: 'room-status',
  components: {
    Avatar,
    CountDown,
  },
  props: ['isShow'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  margin: 0 auto;
}
.item {
  margin-bottom: 30px;
}
.item:last-child {
  margin-bottom: 0;
}
.item label {
  font-size: 14px;
  width: 200px;
}
.item div {
  font-size: 26px;
}
</style>
