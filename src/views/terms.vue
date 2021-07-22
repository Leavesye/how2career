<template>
  <section class="terms-box">
    <el-page-header style="margin-bottom: 10px;" @back="goBack" content=""></el-page-header>
    <pdf 
      ref="pdf"
      :src="url"
      v-for="i in numPages"
			:key="i"
      :page="i"
    >
    </pdf>
  </section>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components:{
      pdf
  },
  data() {
    return {
      url: '',
      numPages: 0,
    }
  },
  mounted() {
    this.vuePdf = require('vue-pdf') 
    this.pdfLoadTask() 
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    pdfLoadTask () { 
      const { url } = this.$route.query
      console.log(url, 999)
      this.url = this.vuePdf.default.createLoadingTask(url) 
      console.log(this.url, 777)
      this.url.promise.then(pdf => { 
          this.numPages = pdf.numPages 
      }) 
    }
  }
}
</script>
<style lang="scss" scoped>
.terms-box {
  padding: 0 10px;
}
</style>
