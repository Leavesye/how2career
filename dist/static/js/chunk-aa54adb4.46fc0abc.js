(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aa54adb4"],{"05c2":function(e,t,n){},"7abe":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("el-button",{attrs:{type:"info"},on:{click:function(t){return e.action(1)}}},[e._v("登录")]),n("el-button",{attrs:{type:"info"},on:{click:function(t){return e.action(2)}}},[e._v("注册")]),n("login",{attrs:{isShow:e.isShow,type:e.type},on:{close:e.handleCloseLogin}})],1)},o=[],r=(n("96cf"),n("1da1")),a=(n("f8b7"),n("5f87"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{"show-close":!1,"before-close":e.handleClose,visible:e.isShow,width:"400px",center:""},on:{"update:visible":function(t){e.isShow=t}}},[n("section",{staticClass:"modal-main"},[n("el-image",{staticClass:"logo",attrs:{src:e.logo}}),n("ul",{staticClass:"flex tabs"},[e._l(e.tabs,(function(t,s){return n("li",{key:s,staticClass:"tab",style:{color:e.curTab==s?t.color:""},on:{click:function(n){return e.handleTabClick(t,s)}}},[e._v(" "+e._s(t.name)+" ")])})),n("div",{staticClass:"tab-slide",style:{left:e.tabs[e.curTab].left,backgroundColor:e.tabs[e.curTab].color}})],2),n("el-form",{ref:"form",attrs:{rules:e.rules,model:e.info,"label-width":"0"}},[n("el-form-item",{attrs:{label:"",prop:"userName"}},[n("el-input",{staticClass:"phone",attrs:{maxlength:11,size:"large",placeholder:"请输入手机号"},model:{value:e.info.userName,callback:function(t){e.$set(e.info,"userName",t)},expression:"info.userName"}},[n("template",{slot:"prepend"},[e._v("+86")])],2)],1),1==e.pageType?n("el-form-item",{attrs:{label:"",prop:"passWord"}},[n("el-input",{staticClass:"phone",attrs:{type:"password",maxlength:10,size:"large",placeholder:"请输入密码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleRegOrLogin(t)}},model:{value:e.info.passWord,callback:function(t){e.$set(e.info,"passWord",t)},expression:"info.passWord"}})],1):e._e(),2==e.pageType?n("el-form-item",{attrs:{label:"",prop:"vCode"}},[n("div",{staticClass:"flex-hb"},[n("el-input",{staticClass:"check-code",attrs:{maxlength:6,size:"large",placeholder:"请输入验证码"},model:{value:e.info.vCode,callback:function(t){e.$set(e.info,"vCode",t)},expression:"info.vCode"}}),n("el-button",{staticClass:"send-code",attrs:{plain:""},on:{click:e.handleSendCode}},[e._v(e._s(e.seconds>0?e.seconds+"s":"获取验证码"))])],1)]):e._e()],1),n("div",{staticClass:"login-bottom"},[n("el-button",{staticClass:"reg-btn",attrs:{size:"large",loading:e.isLoading,type:0==e.curTab?"success":"primary"},on:{click:e.handleRegOrLogin}},[e._v(e._s(2==e.pageType?"注册":"登录"))]),2==e.pageType?n("p",{staticClass:"tips"},[e._v("未注册手机验证后自动登录，注册即同意注册协议")]):e._e(),n("el-link",{staticClass:"to-login",attrs:{type:0==e.curTab?"success":"primary"},on:{click:e.handleLink}},[e._v(e._s(2==e.pageType?"登录已有账号":"注册"))])],1)],1)])}),i=[],c=(n("caad"),n("ac1f"),n("2532"),n("5319"),n("5530")),l=n("c24f"),u={1:[{name:"登录咨询者",color:"#36AE82",left:0},{name:"登录咨询师",color:"#15479E",left:"130px"}],2:[{name:"注册咨询者",color:"#36AE82",left:0},{name:"注册咨询师",color:"#15479E",left:"130px"}]},d={name:"login-modal",props:["isShow","type"],data:function(){var e=this.$rules;return this.role="consumer",{isLoading:!1,pageType:1,seconds:0,curTab:0,tabs:u["1"],info:{userName:"18566070441",passWord:"123456",vCode:""},rules:{userName:[e.required(),e.mobile()],passWord:[e.required()],vCode:[e.required()]}}},computed:{logo:function(){return n("cf05")}},watch:{type:function(e,t){console.log(e,t),this.pageType=e,this.tabs=u[this.pageType]}},methods:{handleClose:function(){this.$emit("close")},handleLink:function(){this.pageType=1==this.pageType?2:1,this.tabs=u[this.pageType]},handleTabClick:function(e,t){this.curTab=t,this.role=0==t?"consumer":"consultant",this.$refs.form.resetFields()},handleSendCode:function(){var e=this;if(this.seconds>0)return!1;this.$refs.form.validateField("userName",(function(t){t||Object(l["n"])({userName:e.info.userName}).then((function(t){console.log(t),e.seconds=60;var n=setInterval((function(){0!=e.seconds?e.seconds--:clearInterval(n)}),1e3)}))}))},checkUserFn:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isLoading){t.next=2;break}return t.abrupt("return",!1);case 2:return e.isLoading=!0,t.next=5,Object(l["a"])(e.info);case 5:n=t.sent,n.result&&(e.$store.dispatch("user/setUser",{role:e.role,userName:e.info.userName}),s="consultant"==e.role?"/register/consultant":"/register/consumer",e.$router.push(s)),e.isLoading=!1;case 8:case"end":return t.stop()}}),t)})))()},checkMobile:function(){var e=this;this.$refs.form.validate((function(t){t&&e.checkUserFn()}))},loginFn:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isLoading){t.next=2;break}return t.abrupt("return",!1);case 2:e.$refs.form.validate((function(t){if(t){e.isLoading=!0;var n=Object(c["a"])(Object(c["a"])({},e.info),{},{role:e.role});e.$store.dispatch("user/login",n).then((function(t){if(console.log(t,888),e.isLoading=!1,t.result){var n=t.msg.types,s=1==n.length&&!n.includes(e.role);if(s&&"consumer"==e.role)return e.$alert("该账号为咨询师账号,是否直接登录咨询师","登录角色错误",{confirmButtonText:"确定",callback:function(t){e.$store.dispatch("user/setRole","consultant"),"confirm"==t&&e.$router.replace("/consultant/index")}}),!1;if(s&&"consultant"==e.role)return e.$alert("该账号为咨询者账号,是否直接登录咨询者","登录角色错误",{confirmButtonText:"确定",callback:function(t){e.$store.dispatch("user/setRole","consumer"),"confirm"==t&&e.$router.replace("/consumer/index")}}),!1;console.log(3333);var o="consultant"==e.role?"/consultant/index":"/consumer/index";e.$router.replace(o)}e.isLoading=!1})).catch((function(t){return e.isLoading=!1}))}else e.isLoading=!1}));case 3:case"end":return t.stop()}}),t)})))()},handleRegOrLogin:function(){1==this.pageType?this.loginFn():this.checkMobile()}},mounted:function(){}},f=d,p=(n("8372"),n("2877")),h=Object(p["a"])(f,a,i,!1,null,"0b46b672",null),m=h.exports,g={name:"home",components:{Login:m},data:function(){return{isShow:!1,type:1}},methods:{handleCloseLogin:function(){this.isShow=!1},action:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.isShow=!0,t.type=e;case 2:case"end":return n.stop()}}),n)})))()}},mounted:function(){}},b=g,v=Object(p["a"])(b,s,o,!1,null,"2e0c180e",null);t["default"]=v.exports},8372:function(e,t,n){"use strict";var s=n("05c2"),o=n.n(s);o.a}}]);