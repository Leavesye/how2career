<template>
  <div></div>
</template>

<script>
import { qyLogin } from '@/api/sales'
export default {
  async mounted() {
    const l = this.loading()
    const { code } = this.$route.query
    const res = await qyLogin({ code }).catch(e => l.close())
    if (res.result) {
      const { token, userId: sales } = res.msg
      this.$store.dispatch('user/setQyuser', { token, sales }).then(res => {
        this.$router.replace('/sales/index')
      })
    }
    l.close()
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
