import Vue from "vue";

const r = Vue.prototype.$rules;
export default {
  position: {
    layout: { span: 20 },
    type: "select",
    value: [],
    label: "目标职业",
    props: {
      props: { label: "text", value: "value" },
      multiple: true,
      "multiple-limit": 3
    },
    options: [],
    rules: [r.required()]
  },
  industry: {
    layout: { span: 20 },
    type: "select",
    value: "",
    label: "目标行业",
    props: {
      props: { label: "text", value: "value" },
      multiple: true,
      "multiple-limit": 3
    },
    options: []
  },
  company: {
    layout: { span: 20 },
    type: "select",
    value: "",
    label: "目标公司",
    props: {
      props: { label: "text", value: "value" },
      multiple: true,
      filterable: true,
      remote: true,
      remoteMethod: null,
      loading: false
    },
    options: []
  }
};
