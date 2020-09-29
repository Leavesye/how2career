import Vue from 'vue'

export function loading () {
  return Vue.prototype.$loading({
    background: 'rgba(255, 255, 255, .3)'
  })
}

export function alert (message, type = 'success') {
  Vue.prototype.$message({
    message,
    type
  })
}