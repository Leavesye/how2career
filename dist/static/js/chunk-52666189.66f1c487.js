(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52666189"],{"1da1":function(e,t,r){"use strict";function n(e,t,r,n,o,i,a){try{var s=e[i](a),c=s.value}catch(u){return void r(u)}s.done?t(c):Promise.resolve(c).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(o,i){var a=e.apply(t,r);function s(e){n(a,o,i,s,c,"next",e)}function c(e){n(a,o,i,s,c,"throw",e)}s(void 0)}))}}r.d(t,"a",(function(){return o}))},"3f75":function(e,t,r){"use strict";var n=r("b2eb"),o=r.n(n);o.a},"7abe":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("el-button",{attrs:{type:"info"},on:{click:function(t){return e.action(1)}}},[e._v("登录")]),r("el-button",{attrs:{type:"info"},on:{click:function(t){return e.action(2)}}},[e._v("注册")]),r("el-button",{attrs:{type:"info"},on:{click:e.create}},[e._v("创建订单")]),r("login",{attrs:{isShow:e.isShow,type:e.type},on:{close:e.handleCloseLogin}})],1)},o=[],i=(r("96cf"),r("1da1")),a=r("c24f"),s=r("f8b7"),c=(r("5f87"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{"show-close":!1,"before-close":e.handleClose,visible:e.isShow,width:"400px",center:""},on:{"update:visible":function(t){e.isShow=t}}},[r("section",{staticClass:"modal-main"},[r("el-image",{staticClass:"logo",attrs:{src:e.logo}}),r("ul",{staticClass:"flex tabs"},[e._l(e.tabs,(function(t,n){return r("li",{key:n,staticClass:"tab",style:{color:e.curTab==n?t.color:""},on:{click:function(r){return e.handleTabClick(t,n)}}},[e._v(" "+e._s(t.name)+" ")])})),r("div",{staticClass:"tab-slide",style:{left:e.tabs[e.curTab].left,backgroundColor:e.tabs[e.curTab].color}})],2),r("el-form",{ref:"form",attrs:{rules:e.rules,model:e.info,"label-width":"0"}},[r("el-form-item",{attrs:{label:"",prop:"userName"}},[r("el-input",{staticClass:"phone",attrs:{maxlength:11,placeholder:"请输入手机号"},model:{value:e.info.userName,callback:function(t){e.$set(e.info,"userName",t)},expression:"info.userName"}},[r("template",{slot:"prepend"},[e._v("+86")])],2)],1),1==e.pageType?r("el-form-item",{attrs:{label:"",prop:"passWord"}},[r("el-input",{staticClass:"phone",attrs:{type:"password",maxlength:10,placeholder:"请输入密码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleRegOrLogin(t)}},model:{value:e.info.passWord,callback:function(t){e.$set(e.info,"passWord",t)},expression:"info.passWord"}})],1):e._e(),2==e.pageType?r("el-form-item",{attrs:{label:"",prop:"vCode"}},[r("div",{staticClass:"flex-hb"},[r("el-input",{staticClass:"check-code",attrs:{maxlength:6,placeholder:"请输入验证码"},model:{value:e.info.vCode,callback:function(t){e.$set(e.info,"vCode",t)},expression:"info.vCode"}}),r("el-button",{staticClass:"send-code",attrs:{plain:""},on:{click:e.handleSendCode}},[e._v(e._s(e.seconds>0?e.seconds+"s":"获取验证码"))])],1)]):e._e()],1),r("div",{staticClass:"login-bottom"},[r("el-button",{staticClass:"reg-btn",attrs:{loading:e.isLoading,type:0==e.curTab?"success":"primary"},on:{click:e.handleRegOrLogin}},[e._v(e._s(2==e.pageType?"注册":"登录"))]),2==e.pageType?r("p",{staticClass:"tips"},[e._v("未注册手机验证后自动登录，注册即同意注册协议")]):e._e(),r("el-link",{staticClass:"to-login",attrs:{type:0==e.curTab?"success":"primary"},on:{click:e.handleLink}},[e._v(e._s(2==e.pageType?"登录已有账号":"注册"))])],1)],1)])}),u=[],l=(r("caad"),r("ac1f"),r("2532"),r("5319"),r("5530")),f={1:[{name:"登录咨询者",color:"#36AE82",left:0},{name:"登录咨询师",color:"#15479E",left:"130px"}],2:[{name:"注册咨询者",color:"#36AE82",left:0},{name:"注册咨询师",color:"#15479E",left:"130px"}]},h={name:"login-modal",props:["isShow","type"],data:function(){var e=this.$rules;return this.role="consumer",{isLoading:!1,pageType:1,seconds:0,curTab:0,tabs:f["1"],info:{userName:"",passWord:"",vCode:""},rules:{userName:[e.required(),e.mobile()],passWord:[e.required()],vCode:[e.required()]}}},computed:{logo:function(){return r("cf05")}},watch:{type:function(e,t){console.log(e,t),this.pageType=e,this.tabs=f[this.pageType]}},methods:{handleClose:function(){this.$emit("close")},handleLink:function(){this.pageType=1==this.pageType?2:1,this.tabs=f[this.pageType]},handleTabClick:function(e,t){this.curTab=t,this.role=0==t?"consumer":"consultant",this.$refs.form.resetFields()},handleSendCode:function(){var e=this;if(this.seconds>0)return!1;this.$refs.form.validateField("userName",(function(t){t||Object(a["h"])({userName:e.info.userName}).then((function(t){console.log(t),e.seconds=60;var r=setInterval((function(){0!=e.seconds?e.seconds--:clearInterval(r)}),1e3)}))}))},checkUserFn:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isLoading){t.next=2;break}return t.abrupt("return",!1);case 2:return e.isLoading=!0,t.next=5,Object(a["a"])(e.info);case 5:r=t.sent,r.result&&(e.$store.dispatch("user/setUser",{role:e.role,userName:e.info.userName}),n="consultant"==e.role?"/register/consultant":"/register/consumer",e.$router.push(n)),e.isLoading=!1;case 8:case"end":return t.stop()}}),t)})))()},checkMobile:function(){var e=this;this.$refs.form.validate((function(t){t&&e.checkUserFn()}))},loginFn:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isLoading){t.next=2;break}return t.abrupt("return",!1);case 2:e.$refs.form.validate((function(t){if(t){e.isLoading=!0;var r=Object(l["a"])(Object(l["a"])({},e.info),{},{role:e.role});e.$store.dispatch("user/login",r).then((function(t){if(e.isLoading=!1,t.result){var r=t.msg.types,n=1==r.length&&!r.includes(e.role);if(n&&"consumer"==e.role)return e.$alert("该账号为咨询师账号,是否直接登录咨询师","登录角色错误",{confirmButtonText:"确定",callback:function(t){e.$store.dispatch("user/setRole","consultant"),"confirm"==t&&e.$router.replace("/consultant/index")}}),!1;if(n&&"consultant"==e.role)return e.$alert("该账号为咨询者账号,是否直接登录咨询者","登录角色错误",{confirmButtonText:"确定",callback:function(t){e.$store.dispatch("user/setRole","consumer"),"confirm"==t&&e.$router.replace("/consumer/index")}}),!1;console.log(3333);var o="consultant"==e.role?"/consultant/index":"/consumer/index";e.$router.replace(o)}e.isLoading=!1})).catch((function(t){return e.isLoading=!1}))}else e.isLoading=!1}));case 3:case"end":return t.stop()}}),t)})))()},handleRegOrLogin:function(){1==this.pageType?this.loginFn():this.checkMobile()}},mounted:function(){}},d=h,p=(r("3f75"),r("2877")),m=Object(p["a"])(d,c,u,!1,null,"550a46d4",null),g=m.exports,v={name:"home",components:{Login:g},data:function(){return{isShow:!1,type:1}},methods:{handleCloseLogin:function(){this.isShow=!1},action:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.isShow=!0,t.type=e;case 2:case"end":return r.stop()}}),r)})))()},reg:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return{result:!0,msg:{_id:"5f532bdb15d031b7520a493d",active:!1,available:!0,basic:{birthday:"出生年月",detailedIntroduction:"详细介绍",email:"联系信息-私人邮箱",firstName:"名",gender:"f/m",lastName:"姓",phone:"联系信息-手机号码",wechat:"联系信息-微信号"},cTime:"创建时间",publicInfo:{availableTime:[{period:"day",repeat:!0,time:"2020-10-10 20:00"},{period:"week",repeat:!0,time:"2020-10-10 18:00"}],avatarImage:"头像url",level:1,nickName:"昵称",resume:{education:[{GPA:"GPA成绩",country:"国家",degree:"学位",degreeCertificate:"学位证",discipline:"专业",getRewarded:!0,graduationTime:"毕业时间",organizationTitle:"职位",projectArticle:!0,projectArticleDescription:"项目文章经历描述",rewardDescription:"奖项描述",school:"毕业学校",studentOrganization:!0}],gallupCertified:!0,gallupCertifiedImage:"gallup图片",language:["english","french"],otherCertificates:[{certificateImage:"证书图片",comments:"备注",expireDate:"有效日期",name:"证书名称"}],skills:["java","golang"],socialInsuranceImage:"社保图片",workExperience:[{company:"公司",companySize:"公司规模",department:"部门",duty:"工作内容",entryTime:"2020-10",industry:"行业",level:"级别",onBoard:!0,position:"职位",resignationTime:"2023-01",reward:"奖励和荣誉",teamAchievement:"团队成果",teamManagement:!0,teamMember:10}]},selfIntroduction:"100字简介"},realVerified:!0,realVerify:{bankCard:"银行卡",idCard:"身份证",phone:"手机号码"},resumeVerified:!0,slots:[{_id:"1600191034",active:!0,cost:123,costLeft:123,expireTime:1700191034},{_id:"1600191035",active:!0,cost:123,costLeft:123,expireTime:1700191035},{_id:"1600191036",active:!0,cost:123,costLeft:123,expireTime:1700191036},{_id:"1600191037",active:!0,cost:123,costLeft:123,expireTime:1700191037}],slotsFee:-8667,suspendUntil:0,uTime:1600191034}},e.next=3,consultantReg({userName:"18566070441",passWord:"111111",basic:{firstName:"ye",lastName:"song",gender:"f",birthday:"1995-10-02",phone:"18566070441",wechat:"fdfgh",email:"43774888@qq.com",detailedIntroduction:"详细介绍"},realVerify:{phone:"手机号码",idCard:"身份证",bankCard:"银行卡"},publicInfo:{nickName:"leaves",level:1,avatarImage:"头像url",selfIntroduction:"100字简介"}});case 3:e.sent;case 4:case"end":return e.stop()}}),e)})))()},create:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["a"])({consultant:{_id:"5f532bdb15d031b7520a493d",name:"姓名",avatar:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",readme:"100字简介",education:{school:"毕业学校",discipline:"专业",degree:"学位",graduationTime:"毕业时间"},work:{industry:"行业",company:"公司",position:"职位",workingYears:"工作年限",duty:"工作内容",skills:"工作技能"}},startTime:"确认的开始时间",consumerTime:[1601880873,1601880874,1601880875]});case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))()}},mounted:function(){}},y=v,b=Object(p["a"])(y,n,o,!1,null,"0857cf34",null);t["default"]=b.exports},"96cf":function(e,t){!function(t){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag",u="object"===typeof e,l=t.regeneratorRuntime;if(l)u&&(e.exports=l);else{l=t.regeneratorRuntime=u?e.exports:{},l.wrap=w;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",m={},g={};g[a]=function(){return this};var v=Object.getPrototypeOf,y=v&&v(v(R([])));y&&y!==n&&o.call(y,a)&&(g=y);var b=_.prototype=k.prototype=Object.create(g);L.prototype=b.constructor=_,_.constructor=L,_[c]=L.displayName="GeneratorFunction",l.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===L||"GeneratorFunction"===(t.displayName||t.name))},l.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,_):(e.__proto__=_,c in e||(e[c]="GeneratorFunction")),e.prototype=Object.create(b),e},l.awrap=function(e){return{__await:e}},T(C.prototype),C.prototype[s]=function(){return this},l.AsyncIterator=C,l.async=function(e,t,r,n){var o=new C(w(e,t,r,n));return l.isGeneratorFunction(t)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},T(b),b[c]="Generator",b[a]=function(){return this},b.toString=function(){return"[object Generator]"},l.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){while(t.length){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=R,$.prototype={constructor:$,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(N),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,o){return s.type="throw",s.arg=e,t.next=n,o&&(t.method="next",t.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=o.call(a,"catchLoc"),u=o.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),N(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;N(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:R(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),m}}}function w(e,t,r,n){var o=t&&t.prototype instanceof k?t:k,i=Object.create(o.prototype),a=new $(n||[]);return i._invoke=E(e,r,a),i}function x(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(n){return{type:"throw",arg:n}}}function k(){}function L(){}function _(){}function T(e){["next","throw","return"].forEach((function(t){e[t]=function(e){return this._invoke(t,e)}}))}function C(e){function t(r,n,i,a){var s=x(e[r],e,n);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"===typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then((function(e){t("next",e,i,a)}),(function(e){t("throw",e,i,a)})):Promise.resolve(u).then((function(e){c.value=e,i(c)}),a)}a(s.arg)}var r;function n(e,n){function o(){return new Promise((function(r,o){t(e,n,r,o)}))}return r=r?r.then(o,o):o()}this._invoke=n}function E(e,t,r){var n=f;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return I()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var s=O(a,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=x(e,t,r);if("normal"===c.type){if(n=r.done?p:h,c.arg===m)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function O(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,O(e,t),"throw"===t.method))return m;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=x(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,m;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,m):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function j(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function N(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function $(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(j,this),this.reset(!0)}function R(e){if(e){var t=e[a];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function t(){while(++n<e.length)if(o.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return i.next=i}}return{next:I}}function I(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},b2eb:function(e,t,r){},f8b7:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r("b775");function o(e){return Object(n["a"])({url:"/order/platform/orders",method:"post",data:e})}}}]);