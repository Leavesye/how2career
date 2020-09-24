<template>
  <el-form-item v-if="!model.length && !model.hide" :label="model.label" :prop="prop+'.value'" v-bind="$attrs" :rules="model.rules || $attrs.rules || []" ref="form-item">
    <slot slot="label" name="label"></slot>
    <slot slot="error" name="error"></slot>
    <!-- 自定义 -->
    <ax-template v-if="model.template" :template="model.template" :data="model"></ax-template>
    <!--
    配置属性介绍
      label  -  别名
      value  -  绑定值
      type - 类型 （input | inputNumber | select | cascader | date | time | datetime | treeSelect）
      props - 参数（ 参考 element ui 对应组件 attrs)
      events - 事件 值可参考 elementUI 相应组件 event
      rules  -  规则（ 参考 element ui )
      options - ( select  和  cascader 所需属性 ) 选项组
      hide - 是否显示
    -->

    <!-- 未指定 type 默认为 input -->
    <!--
    input 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type: 'input',
      props : { type : 'textarea' , maxlength : 10 } ,
      events : { change(){ console.log(11) },blur(){ console.log(22) } },
      rules : [{ required : true , message : '必填' }] ,
    }
    -->
    <el-input v-else-if="model.type == 'input'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input" :ref="model.type">
      <ax-template v-if="model.renderPrefix" :template="model.renderPrefix" slot="prefix"></ax-template>
      <ax-template v-if="model.renderSuffix" :template="model.renderSuffix" slot="suffix"></ax-template>
      <ax-template v-if="model.renderPrepend" :template="model.renderPrepend" slot="prepend"></ax-template>
      <ax-template v-if="model.renderAppend" :template="model.renderAppend" slot="append"></ax-template>
    </el-input>
    <!--
    inputNumber 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'inputNumber',
      props : { type : 'textarea' , maxlength : 10 } ,
      events : { change(){ console.log(11) },blur(){ console.log(22) } },
      rules : [{ required : true , message : '必填' }]
    }
    -->
    <el-input-number v-else-if="model.type == 'inputNumber'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input" :ref="model.type">
    </el-input-number>
    <!--
    select 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'select',
      props : {},
      events : { change(){ console.log(11) },blur(){ console.log(22) } },
      rules : [{ required : true , message : '必填' }] ,
      options : [],
    }
    -->
    <el-select v-else-if="model.type == 'select'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input" :ref="model.type">
      <el-option v-for="o,i in (options || model.options)" :disabled="o.disabled || false" :label="o[ (model.props.props && model.props.props.label) || 'label']" :value="o[ (model.props.props && model.props.props.value) || 'value']" :key="i">
        <ax-template v-if="model.render" :template="model.render" :data="o"></ax-template>
      </el-option>
    </el-select>
    <!--
    cascader 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'cascader' ,
      props : {}
      events : { change(){ console.log(11) },blur(){ console.log(22) } },
      rules : [{ required : true , message : '必填' }] ,
      options : [],
    }
    -->
    <el-cascader v-else-if="model.type == 'cascader'" v-model="model.value" v-bind="model.props" :options="(options||model.options)" v-on="model.events" class="form-item-input" :ref="model.type">
    </el-cascader>
    <!--
    date 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'date',
      props : {},
      rules : [{ required : true , message : '必填' }] ,
      events : { change(){ console.log(11) },blur(){ console.log(22) } }
    }
    -->
    <el-date-picker v-else-if="model.type == 'date'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input" style="width:100%" :ref="model.type">
    </el-date-picker>
    <!--
    timePicker 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'timePicker'
      props : { type : 'textarea' , maxlength : 10 } ,
      rules : [{ required : true , message : '必填' }] ,
      events : { }
    }
    -->
    <el-time-picker v-else-if="model.type == 'timePicker'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input" style="width:100%" :ref="model.type">
    </el-time-picker>
    <!--
    time 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'time'
      props : { type : 'textarea' , maxlength : 10 } ,
      rules : [{ required : true , message : '必填' }] ,
      events : { change(){ console.log(11) },blur(){ console.log(22) } }
    }
    -->
    <el-time-select v-else-if="model.type =='time'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input" style="width:100%" :ref="model.type">
    </el-time-select>
    <!--
    datetime 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'datetime',
      props : { type : 'textarea' , maxlength : 10 } ,
      rules : [{ required : true , message : '必填' }] ,
      events : { change(){ console.log(11) },blur(){ console.log(22) } }
    }
    -->
    <el-date-picker v-else-if="model.type == 'datetime'" v-model="model.value" v-bind="model.props" type="datetime" v-on="model.events" class="form-item-input" style="width:100%" :ref="model.type">
    </el-date-picker>
    <!--
    radio 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'radio'
      props : { radioButton : true , label : 'label' , value : 'value' } ,
      rules : [{ required : true , message : '必选项' }] ,
      events : {},
    }
    -->
    <div v-else-if="model.type == 'radio'" class="form-item-input">
      <el-radio-group v-if="model.props.radioButton == true" v-model="model.value" v-bind="model.props" v-on="model.events" :ref="model.type">
        <el-radio-button v-for="o,i in (options||model.options)" :label="o[(model.props.props && model.props.props.value) || 'value']" :disabled="o.disabled" :key="i">{{ o[(model.props.props && model.props.props.label) || 'label'] }}</el-radio-button>
      </el-radio-group>
      <el-radio-group v-else v-model="model.value" v-bind="model.props" v-on="model.events" :ref="model.type">
        <el-radio v-for="o,i in (options||model.options)" :label="o[(model.props.props && model.props.props.value) || 'value']" :disabled="o.disabled" :key="i">{{ o[(model.props.props && model.props.props.label) || 'label'] }}</el-radio>
      </el-radio-group>
    </div>
    <!--
    radio 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'checkbox'
      props : { checkboxButton : true , label : 'label' , value : 'value' } ,
      rules : [{ required : true , message : '必选项' }] ,
      events : {},
    }
    -->
    <!-- 复选按钮 -->
    <div v-else-if="model.type == 'checkbox'" class="form-item-input">
      <el-checkbox-group v-if="model.props.checkboxButton == true" v-model="model.value" v-bind="model.props" v-on="model.events" :ref="model.type">
        <el-checkbox-button v-for="o,i in (options||model.options)" :label="o[(model.props.props && model.props.props.value) || 'value']" :disabled="o.disabled" :key="i">{{ o[(model.props.props && model.props.props.label) || 'label'] }}</el-checkbox-button>
      </el-checkbox-group>
      <!-- 普通复选 -->
      <el-checkbox-group v-else v-model="model.value" v-bind="model.props" v-on="model.events" :ref="model.type">
        <el-checkbox v-for="o,i in (options||model.options)" :label="o[(model.props.props && model.props.props.value) || 'value']" :disabled="o.disabled" :key="i">{{ o[(model.props.props && model.props.props.label) || 'label'] }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <!--
    switch 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'switch'
      props : { showCheckbox : true, nodeKey : 'value' , checkStrictly : false } ,
      rules : [{ required : true , message : '必填' }] ,
      events : { change(){} },
      data : {},
    }
    -->
    <el-switch v-else-if="model.type == 'switch'" v-model="model.value" v-bind="model.props" v-on="model.events">
    </el-switch>
    <!--
    slider 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'slider'
      props : { showCheckbox : true, nodeKey : 'value' , checkStrictly : false } ,
      rules : [{ required : true , message : '必填' }] ,
      events : { change(){} },
      data : {},
    }
    -->
    <el-slider v-else-if="model.type == 'slider'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input" ref="input">
    </el-slider>
    <!--
    transfer 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'transfer'
      props : { } ,
      rules : [{ required : true , message : '必填' }] ,
      events : { change(){} },
      data : {},
    }
    -->
    <el-transfer v-else-if="model.type == 'transfer'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input" :ref="model.type">
    </el-transfer>
    <!--
    rate 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'transfer'
      props : { } ,
      rules : [{ required : true , message : '必填' }] ,
      events : { change(){} },
      data : {},
    }
    -->
    <el-rate v-else-if="model.type == 'rate'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input form-rate" :ref="model.type">
    </el-rate>
    <!--
    color-picker 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'colorPicker'
      props : { } ,
      rules : [{ required : true , message : '必填' }] ,
      events : { change(){} },
      data : {},
    }
    -->
    <el-color-picker v-else-if="model.type == 'colorPicker'" v-model="model.value" v-bind="model.props" v-on="model.events" class="form-item-input" :ref="model.type">
    </el-color-picker>
    <!--
    upload 配置项参考
    {
      label : 'a' ,
      value : '' ,
      type : 'upload'
      props : { } ,
      rules : [{ required : true , message : '必填' }] ,
      events : { change(){} },
      data : {},
      render () { return <div></div> }
    }
    -->
    <el-upload v-else-if="model.type == 'upload'" v-bind="model.props" v-on="model.events" class="form-item-input" :ref="model.type">
      <ax-template :template="model.render"></ax-template>
    </el-upload>

  </el-form-item>
</template>

<script>
import abstractTemplate from "../abstractTemplate";
let axTemplate = abstractTemplate("upload-template");

export default {
  name: "axFormItem",
  // options 优先使用 attr中的属性
  props: ["model", "prop", "options"],
  components: { axTemplate },
  created() {
    if (Array.isArray(this.model)) {
      console.warn("model 不可为数组类型 >> @axFormItem");
      return;s
    }

    this.model.type = this.model.type || "input";
    this.model.props = this.model.props || {};

    if (this.model.props.placeholder == undefined) {
      let text =
        "input|inputNumber".indexOf(this.model.type) >= 0
          ? '请输入'
          : '请选择'
      this.model.props.placeholder = text + this.model.label;
    }

    if (this.model.props.type == "password") {
      this.model.props.autocomplete =
        this.model.props.autocomplete || "new-password";
    }

    if (this.model.props.clearable == undefined) {
      this.model.props.clearable = true;
    }

    if (this.model.value == undefined) {
      this.model.value = "";
    }

    if (this.model.type == "checkbox") {
      this.model.value = [].concat(this.model.value);
    }

    let valueFormat = "";

    switch (this.model.type) {
      case "date":
        valueFormat = "yyyy-MM-dd";
        break;
      case "time":
        valueFormat = "HH:mm:ss";
        break;
      case "datetime":
        valueFormat = "yyyy-MM-dd HH:mm:ss";
        break;
    }

    if (valueFormat) {
      this.model.props.valueFormat =
        this.model.props.valueFormat || valueFormat;
    }
  },
  mounted() {
    // if( this.quill ){
    //   this.quill.container.style.height = '300px';
    // }
  },
  methods: {
    resetField() {
      return this.$refs["form-item"].resetField();
    },
    clearValidate() {
      return this.$refs["form-item"].clearValidate();
    },
    getInput() {
      return this.$refs[this.model.type];
    }
  }
};
</script>

<style lang="scss" scoped>
.form-item-input {
  width: 100%;
}
.form-rate {
  padding-top: 5px;
}

.quill-editor {
  background: white;
  .ql-container {
    height: 150px;
  }
}
</style>
