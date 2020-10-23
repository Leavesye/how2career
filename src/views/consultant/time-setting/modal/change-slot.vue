<template>
  <el-dialog title="Slot数量调整"
             :visible.sync="isShow"
             :before-close="handleClose"
             width="430px"
             center>
    <section class="modal-main">
      <div class="flex-hbc item">
        <label for="">当前Slot数:</label>
        <p class="num">06</p>
      </div>
      <div class="flex-hbc item">
        <label for="">调整Slot数：</label>
        <el-select v-model="value" class="item-input">
          <el-option v-for="item in 10"
                     :key="item"
                     :label="item"
                     :value="item"></el-option>
        </el-select>
      </div>
      <div class="flex-hbc item">
        <label for="">调整后，你还需支付：</label>
        <p class="num">¥1200.00</p>
      </div>
    </section>
    <span slot="footer"
          class="flex-he">
      <el-button size="mini"
                 type="primary">确定</el-button>
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
    handleClose () {
      this.$emit('close')
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-main {
  font-size: 14px;
  color: #7c8ea5;
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
.item > p {
  font-size: 26px;
}
</style>
