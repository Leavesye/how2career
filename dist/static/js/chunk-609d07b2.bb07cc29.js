(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-609d07b2"],{1583:function(e,t,r){"use strict";var n=r("77f0"),a=r.n(n);a.a},"1b62":function(e,t,r){"use strict";t["a"]={methods:{uploadBefore:function(e){if(console.log(e,2222),!this.checkFile(e))return!1},uploadSuccess:function(e,t,r,n){e.result&&this.afterUpload(e.msg,r,n)},uploadRemove:function(e,t,r,n){this.onRemoveFile(r,n)}}}},"1da1":function(e,t,r){"use strict";function n(e,t,r,n,a,o,i){try{var u=e[o](i),c=u.value}catch(s){return void r(s)}u.done?t(c):Promise.resolve(c).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var i=e.apply(t,r);function u(e){n(i,a,o,u,c,"next",e)}function c(e){n(i,a,o,u,c,"throw",e)}u(void 0)}))}}r.d(t,"a",(function(){return a}))},"3ca3":function(e,t,r){"use strict";var n=r("6547").charAt,a=r("69f3"),o=r("7dd0"),i="String Iterator",u=a.set,c=a.getterFor(i);o(String,"String",(function(e){u(this,{type:i,string:String(e),index:0})}),(function(){var e,t=c(this),r=t.string,a=t.index;return a>=r.length?{value:void 0,done:!0}:(e=n(r,a),t.index+=e.length,{value:e,done:!1})}))},"77f0":function(e,t,r){},"96cf":function(e,t){!function(t){"use strict";var r,n=Object.prototype,a=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",u=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",s="object"===typeof e,l=t.regeneratorRuntime;if(l)s&&(e.exports=l);else{l=t.regeneratorRuntime=s?e.exports:{},l.wrap=x;var f="suspendedStart",d="suspendedYield",p="executing",h="completed",v={},g={};g[i]=function(){return this};var m=Object.getPrototypeOf,y=m&&m(m(G([])));y&&y!==n&&a.call(y,i)&&(g=y);var b=_.prototype=k.prototype=Object.create(g);I.prototype=b.constructor=_,_.constructor=I,_[c]=I.displayName="GeneratorFunction",l.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===I||"GeneratorFunction"===(t.displayName||t.name))},l.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,_):(e.__proto__=_,c in e||(e[c]="GeneratorFunction")),e.prototype=Object.create(b),e},l.awrap=function(e){return{__await:e}},L(E.prototype),E.prototype[u]=function(){return this},l.AsyncIterator=E,l.async=function(e,t,r,n){var a=new E(x(e,t,r,n));return l.isGeneratorFunction(t)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},L(b),b[c]="Generator",b[i]=function(){return this},b.toString=function(){return"[object Generator]"},l.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){while(t.length){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=G,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(N),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,a){return u.type="throw",u.arg=e,t.next=n,a&&(t.method="next",t.arg=r),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],u=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=a.call(i,"catchLoc"),s=a.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),N(r),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;N(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:G(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),v}}}function x(e,t,r,n){var a=t&&t.prototype instanceof k?t:k,o=Object.create(a.prototype),i=new S(n||[]);return o._invoke=O(e,r,i),o}function w(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(n){return{type:"throw",arg:n}}}function k(){}function I(){}function _(){}function L(e){["next","throw","return"].forEach((function(t){e[t]=function(e){return this._invoke(t,e)}}))}function E(e){function t(r,n,o,i){var u=w(e[r],e,n);if("throw"!==u.type){var c=u.arg,s=c.value;return s&&"object"===typeof s&&a.call(s,"__await")?Promise.resolve(s.__await).then((function(e){t("next",e,o,i)}),(function(e){t("throw",e,o,i)})):Promise.resolve(s).then((function(e){c.value=e,o(c)}),i)}i(u.arg)}var r;function n(e,n){function a(){return new Promise((function(r,a){t(e,n,r,a)}))}return r=r?r.then(a,a):a()}this._invoke=n}function O(e,t,r){var n=f;return function(a,o){if(n===p)throw new Error("Generator is already running");if(n===h){if("throw"===a)throw o;return R()}r.method=a,r.arg=o;while(1){var i=r.delegate;if(i){var u=j(i,r);if(u){if(u===v)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var c=w(e,t,r);if("normal"===c.type){if(n=r.done?h:d,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=h,r.method="throw",r.arg=c.arg)}}}function j(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,j(e,t),"throw"===t.method))return v;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var a=w(n,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,v;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,v):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,v)}function P(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function N(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(P,this),this.reset(!0)}function G(e){if(e){var t=e[i];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){while(++n<e.length)if(a.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return o.next=o}}return{next:R}}function R(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},a2c8:function(e,t,r){e.exports=r.p+"static/img/avatar-upload.80d54d4f.png"},b0c0:function(e,t,r){var n=r("83ab"),a=r("9bf2").f,o=Function.prototype,i=o.toString,u=/^\s*function ([^ (]*)/,c="name";n&&!(c in o)&&a(o,c,{configurable:!0,get:function(){try{return i.call(this).match(u)[1]}catch(e){return""}}})},b64b:function(e,t,r){var n=r("23e7"),a=r("7b0b"),o=r("df75"),i=r("d039"),u=i((function(){o(1)}));n({target:"Object",stat:!0,forced:u},{keys:function(e){return o(a(e))}})},c2e5:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",[r("h1",{staticClass:"title"},[e._v("基本信息")]),r("section",{staticClass:"form-box",staticStyle:{"margin-top":"30px"}},[r("el-card",{staticClass:"form-card"},[r("div",{staticClass:"flex-vc form-name"},[r("label",{attrs:{for:""}},[e._v("手机号")]),r("p",[e._v(e._s(e.user.userName))])]),e.isReg?e._e():r("div",{staticClass:"flex-vc form-name"},[r("label",{attrs:{for:""}},[e._v("密码")]),r("p",{staticStyle:{"margin-right":"30px"}},[e._v("**********")]),r("el-button",{attrs:{size:"small"},on:{click:e.handleClickChangePwd}},[e._v("修改密码")])],1),r("quick-form",{ref:"baseInfo",attrs:{model:e.baseInfo,labelWidth:"140px"}})],1)],1),r("h1",{staticClass:"title bottom"},[e._v("最高学历")]),r("section",{staticClass:"form-box"},[r("el-card",{staticClass:"form-card"},[r("quick-form",{ref:"education",attrs:{model:e.education,labelWidth:"140px"}})],1)],1),r("div",{staticClass:"flex-he",staticStyle:{margin:"60px 60px 70px 0"}},[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.handleSave}},[e._v("确定")])],1)])},a=[],o=(r("caad"),r("d81d"),r("b64b"),r("d3b7"),r("ac1f"),r("2532"),r("3ca3"),r("5319"),r("ddb0"),r("96cf"),r("1da1")),i=r("5530"),u=r("2f62"),c=r("4d06"),s=r("2b0e"),l=r("c1df"),f=r.n(l),d=s["default"].prototype.$rules,p={passWord:{value:"",label:"密码",rules:[d.required(),d.length(6,12)],props:{type:"password"}},name:{value:"",label:"姓名",rules:[d.required(),d.maxLength(20)]},nickName:{value:"",label:"昵称",rules:[d.required(),d.maxLength(10)]},gender:{label:"性别",value:"",type:"radio",props:{label:"label",value:"value"},options:[{label:"男",value:"m"},{label:"女",value:"f"}],rules:[d.required()]},birthday:{label:"出生年月",value:"",type:"date",rules:[d.required()],props:{style:{width:"200px"},"picker-options":{disabledDate:function(e){return e.getTime()>f()().valueOf()}}}},avatarImage:{label:"设置头像",rules:[d.required()],type:"upload",value:"",props:{action:"http://www.leavesyesong.xyz/api/user/platform/consumer/upload",accept:".jpg,.png,.gif",name:"UploadFiles",disabled:!1,"show-file-list":!1,"auto-upload":!0,"before-upload":null,"on-success":null},render:null}},h=s["default"].prototype.$rules,v={country:{type:"select",value:"",label:"国家",rules:[h.required()],props:{props:{label:"text",value:"value"}},options:[{text:"中国",value:"1"},{text:"美国",value:"2"}]},school:{type:"select",value:"",label:"学校",rules:[h.required()],props:{props:{label:"text",value:"value"}},options:[{text:"北大",value:"1"},{text:"清华",value:"2"}]},discipline:{type:"select",value:"",label:"专业",rules:[h.required()],props:{props:{label:"text",value:"value"}},options:[{text:"计算机",value:"1"},{text:"工商管理",value:"2"}]},GPA:{type:"select",value:"",label:"GPA",props:{props:{label:"text",value:"value"}},options:[{text:"70分",value:"1"},{text:"80分",value:"2"}]},degree:{type:"select",value:"",label:"学位",rules:[h.required()],props:{props:{label:"text",value:"value"}},options:[{text:"学士",value:"1"},{text:"硕士",value:"2"}]},graduationTime:{label:"毕业时间",value:"",type:"date",rules:[h.required()],props:{style:{width:"200px"},"picker-options":{disabledDate:function(e){return e.getTime()>f()().valueOf()}}}},selfIntroduction:{value:"",label:"自我介绍",rules:[h.maxLength(300)]},detailedIntroduction:{value:"",label:"详细介绍",rules:[h.maxLength(300)],props:{type:"textarea",rows:6,placeholder:"请输入详细内容"}}},g={baseInfo:p,education:v},m=r("1b62");r("b0c0");function y(e){return{userName:e.userName,passWord:e.passWord,basic:{birthday:e.birthday,name:e.name,gender:e.gender,nickName:e.nickName,avatarImage:e.avatarImage,selfIntroduction:e.selfIntroduction,detailedIntroduction:e.detailedIntroduction,highestEducation:{country:e.country,school:e.school,discipline:e.discipline,degree:e.degree,graduationTime:e.graduationTime,GPA:e.GPA}}}}function b(e,t){var r=e.account,n=e.basic,a=t.baseInfo;a.passWord.value=r.passWord,a.name.value=n.name,a.nickName.value=n.nickName,a.gender.value=n.gender,a.birthday.value=n.birthday,a.avatarImage.value=n.avatarImage;var o=t.education,i=n.highestEducation;return o.country.value=i.country,o.school.value=i.school,o.discipline.value=i.discipline,o.degree.value=i.degree,o.graduationTime.value=i.graduationTime,o.GPA.value=i.GPA,o.selfIntroduction.value=n.selfIntroduction,o.detailedIntroduction.value=n.detailedIntroduction,t}var x=r("c24f"),w=r("a2c8"),k=r.n(w),I=r("5f87"),_={name:"consumer-baseinfo",mixins:[m["a"]],components:{QuickForm:c["a"]},data:function(){return Object(i["a"])({isReg:!1},g)},computed:Object(i["a"])({},Object(u["b"])(["user"])),created:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.isReg=e.$route.path.includes("/register/consumer"),e.isReg&&(e.baseInfo.passWord.hide=!1),r=e.baseInfo.avatarImage,r.props["before-upload"]=function(t){return e.uploadBefore(t)},r.props["on-success"]=function(t,r){return e.uploadSuccess(t,r,e.uploadCb)},r.render=e.renderUpload,e.isReg){t.next=13;break}return n=e.loading(),t.next=10,Object(x["d"])().catch((function(e){return n.close()}));case 10:a=t.sent,a.result&&b(a.msg,e._data),n.close();case 13:case"end":return t.stop()}}),t)})))()},methods:{handleClickChangePwd:function(){},handleSave:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n,a,o,u,c,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=Object.keys(g),n=!0,t.next=4,Promise.all(r.map((function(t){return e.$refs[t].validate()}))).catch((function(e){console.log(e,"error"),n=!1}));case 4:if(a=t.sent,console.log(a,333),!n){t.next=24;break}if(o=Object(i["a"])(Object(i["a"])({userName:e.user.userName},e.$refs.baseInfo.getFormData()),e.$refs.education.getFormData()),console.log(o,"formdata"),u=y(o),console.log(u,"参数"),c=e.loading(),s=null,!e.isReg){t.next=19;break}return t.next=16,Object(x["h"])(u).catch((function(e){return c.close()}));case 16:s=t.sent,t.next=22;break;case 19:return t.next=21,Object(x["j"])(u).catch((function(e){return c.close()}));case 21:s=t.sent;case 22:s.result&&(e.alert(e.isReg?"注册成功":"保存成功"),e.isReg?(Object(I["c"])(s.msg.token),e.$router.replace("/consumer/index")):e.$store.dispatch("user/setUser",{nickName:o.nickName,avatar:o.avatarImage})),c.close();case 24:case"end":return t.stop()}}),t)})))()},renderUpload:function(e){var t="";return this.baseInfo.avatarImage.value&&(t=Object({NODE_ENV:"production",VUE_APP_BASE_API:"http://www.leavesyesong.xyz/api",BASE_URL:"/"}).VUE_APP_HOST_NAME+this.baseInfo.avatarImage.value),console.log(t),e("el-Image",{style:"border-radius: 50%;width: 90px; height: 90px;overflow: hidden",attrs:{src:t||k.a}})},checkFile:function(e){return e.size>2097152?(this.alert("上传图片不能超过2M"),!1):!!["image/png","image/jpeg","image/gif"].includes(e.type)||(this.alert("请上传PNG、JPG、GIF类型文件"),!1)},afterUpload:function(e){this.baseInfo.avatarImage.value=e}}},L=_,E=(r("1583"),r("2877")),O=Object(E["a"])(L,n,a,!1,null,"03d2b416",null);t["default"]=O.exports},d81d:function(e,t,r){"use strict";var n=r("23e7"),a=r("b727").map,o=r("1dde"),i=r("ae40"),u=o("map"),c=i("map");n({target:"Array",proto:!0,forced:!u||!c},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(e,t,r){var n=r("da84"),a=r("fdbc"),o=r("e260"),i=r("9112"),u=r("b622"),c=u("iterator"),s=u("toStringTag"),l=o.values;for(var f in a){var d=n[f],p=d&&d.prototype;if(p){if(p[c]!==l)try{i(p,c,l)}catch(v){p[c]=l}if(p[s]||i(p,s,f),a[f])for(var h in o)if(p[h]!==o[h])try{i(p,h,o[h])}catch(v){p[h]=o[h]}}}}}]);