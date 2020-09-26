<template>
  <a-config-provider :locale="locale">
    <a-calendar @panelChange="onPanelChange" />
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'rili',
  data() {
    return {
      locale: zhCN,
    };
  },
  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
  },
  mounted() {
    console.log(zhCN)
  }
};
</script>
