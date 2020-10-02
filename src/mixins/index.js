export default {
  methods: {
    uploadBefore (file) { 
      console.log(file, 2222)
      if (!this.checkFile(file)) return false
    },
    uploadSuccess (res, file, cb) {
      if (res.result) {
        // 回传链接地址到页面
        this.afterUpload(res.msg)
      }
    },
  }
}