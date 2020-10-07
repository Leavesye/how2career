<template>
  <h1 class="title"
      :style="{ 
        fontSize: size || '14px',
        weight: weight || '600',
        color: user.role == 'consumer' ? '#36AE82':'#15479e'}">
        <slot></slot>
      </h1>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'h-title',
  props: ['size', 'weight'],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 600;
}
</style>
