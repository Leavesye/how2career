(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8399bf1a"],{"56b3":function(e,r,t){},"6e89":function(e,r,t){"use strict";t.r(r);var i=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("section",[t("h1",{staticClass:"page-title"},[e._v("实名认证（"+e._s(e.realVerified?"已认证":"未认证")+"）")]),t("div",{staticClass:"container"},[t("quick-form",{ref:"form",attrs:{model:e.form,labelWidth:"140px"}}),e.realVerified?e._e():t("div",{staticClass:"flex-he"},[t("el-button",{staticStyle:{width:"90px"},attrs:{loading:e.isLoading,type:"success",size:"small"},on:{click:e.handleVerified}},[e._v("认证")])],1)],1)])},a=[],n=(t("b0c0"),t("96cf"),t("1da1")),s=t("4d06"),o=t("c24f"),c={components:{QuickForm:s["a"]},data:function(){var e=this.$rules;return{isLoading:!1,realVerified:!1,form:{name:{value:"",label:"姓名",rules:[e.required(),e.maxLength(20)],props:{disabled:!0}},phone:{value:"",label:"手机号码",rules:[e.required(),e.mobile()]},idCard:{value:"",label:"身份证号码",rules:[e.required(),e.idCard()]}}}},created:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var t,i,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t=e.loading(),r.next=3,Object(o["e"])().catch((function(e){return t.close()}));case 3:i=r.sent,i.result&&(e.realVerified=i.msg.realVerified,a=i.msg.realVerify,e.form.name.value=i.msg.basic.name,e.form.phone.value=a.phone,e.form.idCard.value=a.idCard,e.realVerified&&(e.form.phone.props.disabled=!0,e.form.idCard.props.disabled=!0)),t.close();case 6:case"end":return r.stop()}}),r)})))()},methods:{handleVerified:function(){var e=this;if(this.isLoading)return!1;var r=this.$refs.form.getFormData();console.log(r),this.$refs.form.validate((function(t){t&&(e.isLoading=!0,Object(o["h"])(r).then((function(r){r.result&&(e.realVerified=!0,e.alert("认证成功")),e.isLoading=!1})).catch((function(r){return e.isLoading=!1})))}))}}},l=c,u=(t("ff9c"),t("2877")),d=Object(u["a"])(l,i,a,!1,null,"6c51b7d6",null);r["default"]=d.exports},b0c0:function(e,r,t){var i=t("83ab"),a=t("9bf2").f,n=Function.prototype,s=n.toString,o=/^\s*function ([^ (]*)/,c="name";i&&!(c in n)&&a(n,c,{configurable:!0,get:function(){try{return s.call(this).match(o)[1]}catch(e){return""}}})},ff9c:function(e,r,t){"use strict";var i=t("56b3"),a=t.n(i);a.a}}]);