import Vue from 'vue'
import HTitle from '@/components/HTitle'

Vue.component('h-title', HTitle)
Vue.filter('num', function (value) {
  if (!value) return '0'
  var intPart = Number(value).toFixed(0) // 获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})