(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-122fd082"],{"51d1":function(e,t,l){},"73a6":function(e,t,l){"use strict";var s=l("51d1"),a=l.n(s);a.a},"8c1f":function(e,t,l){},9855:function(e,t,l){"use strict";l.r(t);var s=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",[e._m(0),l("p",{staticClass:"form-title"},[e._v("学历信息")]),l("section",{staticClass:"form-box"},[l("el-card",{staticClass:"quick-form"},[l("quick-form",{ref:"form",attrs:{model:e.form1,labelWidth:e.labelWidth}})],1),e._m(1)],1),l("p",{staticClass:"line"}),l("p",{staticClass:"form-title"},[e._v("工作经历 (最近三段)")]),l("section",{staticClass:"form-box"},[l("el-card",{staticClass:"quick-form"},[l("quick-form",{ref:"form",attrs:{model:e.form2,labelWidth:e.labelWidth}})],1),e._m(2)],1),l("quick-form",{ref:"form",attrs:{model:e.form3,labelWidth:"216px"}}),l("p",{staticClass:"line"}),l("p",{staticClass:"form-title"},[e._v("执照与证书")]),l("section",{staticClass:"form-box"},[l("el-card",{staticClass:"quick-form"},[l("quick-form",{ref:"form",attrs:{model:e.form4,labelWidth:e.labelWidth}})],1),e._m(3)],1),l("quick-form",{ref:"form",attrs:{model:e.form5,labelWidth:"216px"}}),l("p",{staticClass:"line"}),l("section",[l("p",{staticClass:"form-title"},[e._v("语言")]),l("el-row",[l("el-col",{attrs:{offset:7,span:16}},[l("el-input",{staticStyle:{width:"460px","margin-right":"20px"},attrs:{placeholder:"请输入信息",size:"small"},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}}),l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("确认添加")])],1)],1),l("el-row",[l("el-col",{attrs:{offset:7,span:17}},[l("ul",{staticClass:"flex item-select"},e._l(3,(function(t,s){return l("li",{key:s},[e._v("英语 "),l("i",{staticClass:"el-icon-close"})])})),0)])],1)],1),l("p",{staticClass:"line"}),l("section",[l("p",{staticClass:"form-title"},[e._v("工作个人技能")]),l("el-row",[l("el-col",{attrs:{offset:7,span:16}},[l("el-input",{staticStyle:{width:"460px","margin-right":"20px"},attrs:{placeholder:"请输入信息",size:"small"},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}}),l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("确认添加")])],1)],1),l("el-row",[l("el-col",{attrs:{offset:7,span:17}},[l("ul",{staticClass:"flex item-select"},e._l(3,(function(t,s){return l("li",{key:s},[e._v("java "),l("i",{staticClass:"el-icon-close"})])})),0)])],1)],1),l("div",{staticClass:"flex-he",staticStyle:{margin:"60px 60px 70px 0"}},[l("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("保存并提交审核")]),l("el-button",{attrs:{size:"mini"}},[e._v("保存")])],1),l("submit-finish",{attrs:{isShow:e.isShow},on:{close:e.handleClose}})],1)},a=[function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"flex-vc page-title"},[l("div",[e._v("编辑个人信息")]),l("p",[e._v("成为咨询师需要认证简历信息,请先完成简历填写")])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:"flex-he"},[l("div",{staticClass:"add-btn"},[e._v("+添加更多学历")])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:"flex-he"},[l("div",{staticClass:"add-btn"},[e._v("+添加更多工作经历")])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:"flex-he"},[l("div",{staticClass:"add-btn"},[e._v("+添加更多证书")])])}],i=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("ax-form",{ref:"form",staticClass:"form",attrs:{model:e.model,disabled:e.disabled,"label-position":"right",size:"small","label-width":e.labelWidth||"110px"},nativeOn:{submit:function(e){e.preventDefault()}}},[l("el-row",{attrs:{gutter:20}},e._l(e.model,(function(t,s,a){return t.slot?e._e():l("el-col",e._b({key:s},"el-col",t.layout||e.layout,!1),[l("quick-form-item",{key:s,ref:s,refInFor:!0,attrs:{model:t,prop:s,"label-width":e.labelWidth||"110px"}})],1)})),1),e._t("default")],2)},r=[],o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return e.model?l("ax-form-item",{ref:"form-item",style:e.model.style,attrs:{model:e.model,prop:e.prop,"label-width":e.model.labelWidth}}):e._e()},u=[],n={props:["model","prop"],methods:{getInput:function(){return this.$refs["form-item"].getInput()}}},p=n,c=l("2877"),d=Object(c["a"])(p,o,u,!1,null,"cc251b36",null),f=d.exports,m={name:"quick-form",components:{quickFormItem:f},props:{model:{},layout:{default:function(){return{xs:24,sm:24,md:24,lg:24,xl:24}}},labelWidth:{},disabled:{default:function(){return!1}}},beforeDestroy:function(){this.resetFields()},methods:{validate:function(){return this.$refs.form.validate.apply(this,arguments)},validateField:function(){return this.$refs.form.validateField.apply(this,arguments)},resetFields:function(){return this.$refs.form.resetFields.apply(this,arguments)},clearValidate:function(){return this.$refs.form.clearValidate.apply(this,arguments)},getFormData:function(){return this.$refs.form.getFormData()},getFormItem:function(e){return this.$refs[e]?this.$refs[e][0].$refs["form-item"]:null},getInput:function(e){var t=this.getFormItem(e);return t?t.getInput():null}}},v=m,b=Object(c["a"])(v,i,r,!1,null,"3b6e680d",null),h=b.exports,x=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-dialog",{attrs:{title:"信息已经提交审核",visible:e.isShow,width:"430px",center:""},on:{"update:visible":function(t){e.isShow=t}}},[l("section",{staticClass:"modal-main"},[l("p",[e._v("如果你还未设置过您的服务时间 ")]),l("p",[e._v("可以通过下面按钮设置")]),l("p",[e._v("以便通过审核后立即开始接受订单")])]),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:e.handleConfirmTime}},[e._v("服务时间设置")])],1)])},g=[],y={name:"order-detail",props:["isShow"],data:function(){return{}},methods:{handleConfirmTime:function(){this.$emit("close")}}},_=y,q=(l("f644"),Object(c["a"])(_,x,g,!1,null,"75c4fc1e",null)),C=q.exports,w={name:"fill-info",components:{QuickForm:h,SubmitFinish:C},data:function(){var e=this,t=this.$createElement,l=this.$rules;return{isShow:!1,labelWidth:"140px",form1:{a:{type:"select",value:"",label:"国家",rules:[l.required()],props:{props:{label:"text",value:"value"}},options:[]},b:{type:"select",value:"",label:"学校",rules:[l.required()],props:{props:{label:"text",value:"value"}},options:[]},c:{type:"select",value:"",label:"专业",rules:[l.required()],props:{props:{label:"text",value:"value"}},options:[]},d:{type:"select",value:"",label:"GPA",rules:[l.required()],props:{props:{label:"text",value:"value"}},options:[],style:{width:"320px"}},e:{type:"select",value:"",label:"学位",rules:[l.required()],props:{props:{label:"text",value:"value"}},options:[],style:{width:"320px"}},f:{type:"date",value:"",label:"毕业时间",rules:[l.required()],style:{width:"320px"}},g:{text:"曾经参加学生组织",value:"",type:"checkbox",rules:[{required:!0,message:"必选项"}],events:{}},h:{text:"曾经获得奖项",isShow:!0,inputVal:"",inputPlace:"奖项描述（必填）",value:"",type:"checkbox",rules:[{required:!0,message:"必选项"}],events:{}},i:{text:"在校内有完成项目经历或发表文章",value:"",type:"checkbox",rules:[{required:!0,message:"必选项"}],events:{}},j:{label:"",value:"",props:{type:"textarea",rows:"6"},rules:[{required:!0,message:"必选项"}],events:{}},coverImg:{label:"毕业证/学位证或者 学信网学历认证报告",type:"upload",value:"",props:{accept:".pdf.jpg.jpeg.png.bmp",action:"",limit:1,disabled:!1,"list-type":"picture","file-list":[],"auto-upload":!0,"before-upload":function(t){return e.uploadBefore(t,!0)},"on-success":function(t,l){return e.uploadSuccess(t,l,"img")}},render:function(){return t("div",{class:"flex-vc"},[t("div",{class:"upload-btn"},[t("p",{style:"margin-top: 12px; height: 22px;"},[t("i",{class:"el-icon-plus"})]),t("div",{style:"color: #9B9B9B;font-size: 14px"},["上传证书"])]),t("div",{style:"margin-left: 10px;color: #9B9B9B;font-size: 14px"},["支持格式：pdf.jpg.jpeg.png.bmp,不大于2M"])])}}},form2:{a:{type:"select",value:"",label:"行业",rules:[l.required()],props:{props:{label:"text",value:"value"}},options:[]},b:{value:"",label:"企业",rules:[l.required()]},c:{type:"select",value:"",label:"公司规模",rules:[l.required()],props:{props:{label:"text",value:"value"}},options:[]},d:{value:"",label:"部门",rules:[l.required()]},f:{type:"select",value:"",label:"职位",rules:[l.required()],props:{props:{label:"text",value:"value"}},options:[]},g:{type:"select",value:"",label:"级别",rules:[l.required()],props:{props:{label:"text",value:"value"}},options:[]},h:{text:"是否在职",value:"",type:"checkbox",rules:[{required:!0,message:"必选项"}],events:{}},i:{label:"入职时间",value:"",type:"date",rules:[l.required()],layout:{sm:12,md:12,lg:12,xl:12}},j:{label:"离职时间",value:"",type:"date",rules:[l.required()],layout:{sm:12,md:12,lg:12,xl:12}},jg:{label:"主要工作内容与业绩",value:"",props:{type:"textarea",rows:"6"},rules:[l.required()],events:{}},jgg:{label:"奖励和荣誉",value:"",props:{type:"textarea",rows:"6"},rules:[l.required()],events:{}},hf:{text:"有带团队经历",isShow:!0,inputVal:"",inputPlace:"团队人数",value:"",type:"checkbox",rules:[{required:!0,message:"必选项"}],events:{}},jg11:{label:"主要成果",value:"",props:{type:"textarea",rows:"6"},rules:[l.required()],events:{}}},form3:{coverImg:{label:"上传现任公司社保证明",type:"upload",value:"",props:{accept:".pdf.jpg.jpeg.png.bmp",action:"",limit:1,disabled:!1,"list-type":"picture","file-list":[],"auto-upload":!0,"before-upload":function(t){return e.uploadBefore(t,!0)},"on-success":function(t,l){return e.uploadSuccess(t,l,"img")}},render:function(){return t("div",{class:"flex-vc"},[t("div",{class:"upload-btn"},[t("p",{style:"margin-top: 12px; height: 22px;"},[t("i",{class:"el-icon-plus"})]),t("div",{style:"color: #9B9B9B;font-size: 14px"},["上传证书"])]),t("div",{style:"margin-left: 10px;color: #9B9B9B;font-size: 14px"},["支持格式：pdf.jpg.jpeg.png.bmp,不大于2M"])])}}},form4:{d:{label:"拥有证书信息",value:"",rules:[l.required()],layout:{sm:10,md:10,lg:10}},f:{type:"date",label:"",value:"",rules:[l.required()],layout:{sm:7,md:7,lg:7},labelWidth:"0"},g:{label:"",value:"",rules:[l.required()],layout:{sm:7,md:7,lg:7},labelWidth:"0"},coverImg:{label:"",type:"upload",value:"",props:{accept:".pdf.jpg.jpeg.png.bmp",action:"",limit:1,disabled:!1,"list-type":"picture","file-list":[],"auto-upload":!0,"before-upload":function(t){return e.uploadBefore(t,!0)},"on-success":function(t,l){return e.uploadSuccess(t,l,"img")}},render:function(){return t("div",{class:"flex-vc"},[t("div",{class:"upload-btn"},[t("p",{style:"margin-top: 12px; height: 22px;"},[t("i",{class:"el-icon-plus"})]),t("div",{style:"color: #9B9B9B;font-size: 14px"},["上传证书"])]),t("div",{style:"margin-left: 10px;color: #9B9B9B;font-size: 14px"},["支持格式：pdf.jpg.jpeg.png.bmp,不大于2M"])])}}},form5:{h:{text:"有Gallup Certified证书",value:"",type:"checkbox",rules:[{required:!0,message:"必选项"}],events:{},layout:{sm:6,md:6,lg:6},labelWidth:"70px"},coverImg:{layout:{sm:18,md:18,lg:18},labelWidth:"20px",label:"",type:"upload",value:"",props:{accept:".pdf.jpg.jpeg.png.bmp",action:"",limit:1,disabled:!1,"list-type":"picture","file-list":[],"auto-upload":!0,"before-upload":function(t){return e.uploadBefore(t,!0)},"on-success":function(t,l){return e.uploadSuccess(t,l,"img")}},render:function(){return t("div",{class:"flex-vc"},[t("div",{class:"upload-btn"},[t("p",{style:"margin-top: 12px; height: 22px;"},[t("i",{class:"el-icon-plus"})]),t("div",{style:"color: #9B9B9B;font-size: 14px"},["上传证书"])]),t("div",{style:"margin-left: 10px;color: #9B9B9B;font-size: 14px"},["支持格式：pdf.jpg.jpeg.png.bmp,不大于2M"])])}}}}},methods:{handleClose:function(){this.isShow=!1}}},k=w,B=(l("73a6"),Object(c["a"])(k,s,a,!1,null,"08a1d1de",null));t["default"]=B.exports},f644:function(e,t,l){"use strict";var s=l("8c1f"),a=l.n(s);a.a}}]);