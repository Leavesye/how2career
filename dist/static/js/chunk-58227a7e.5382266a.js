(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58227a7e"],{"1b62":function(e,a,t){"use strict";a["a"]={methods:{uploadBefore:function(e){if(console.log(e,2222),!this.checkFile(e))return!1},uploadSuccess:function(e,a,t,s){e.result&&this.afterUpload(e.msg,t,s)},uploadRemove:function(e,a,t,s){this.onRemoveFile(t,s)}}}},"28e8":function(e,a,t){"use strict";var s=t("7491"),r=t.n(s);r.a},2906:function(e,a,t){},"3ca3":function(e,a,t){"use strict";var s=t("6547").charAt,r=t("69f3"),n=t("7dd0"),o="String Iterator",c=r.set,l=r.getterFor(o);n(String,"String",(function(e){c(this,{type:o,string:String(e),index:0})}),(function(){var e,a=l(this),t=a.string,r=a.index;return r>=t.length?{value:void 0,done:!0}:(e=s(t,r),a.index+=e.length,{value:e,done:!1})}))},4678:function(e,a,t){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df48","./fa.js":"8df48","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b46","./gd.js":"f6b46","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(e){var a=n(e);return t(a)}function n(e){if(!t.o(s,e)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return s[e]}r.keys=function(){return Object.keys(s)},r.resolve=n,e.exports=r,r.id="4678"},"6af3":function(e,a,t){},"72a7":function(e,a,t){"use strict";var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("el-dialog",{attrs:{title:"密码修改",visible:e.isShow,width:"560px","before-close":e.handleClose,center:""},on:{"update:visible":function(a){e.isShow=a}}},[t("section",{staticClass:"modal-main"},[t("quick-form",{ref:"form",attrs:{labelWidth:"140px",model:e.form}})],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{staticStyle:{width:"190px"},attrs:{type:"consumer"==e.user.role?"success":"primary",round:"",plain:""},on:{click:e.handleConfirm}},[e._v("确认修改")])],1)])},r=[],n=t("5530"),o=t("2f62"),c=t("4d06"),l={props:["isShow"],components:{QuickForm:c["a"]},data:function(){var e=this.$rules;return{form:{oldPwd:{value:"",label:"输入旧密码",props:{type:"password"},rules:[e.required(),e.length(6,12)],hide:!1},newPwd:{value:"",label:"新密码",rules:[e.required(),e.length(6,12)]},confirmPwd:{value:"",label:"再次输入新密码",rules:[e.required(),e.length(6,12)]}}}},computed:Object(n["a"])({},Object(o["b"])(["user"])),methods:{handleClose:function(){this.$emit("close")},handleConfirm:function(){this.$emit("close")}}},i=l,u=(t("28e8"),t("2877")),d=Object(u["a"])(i,s,r,!1,null,"07852c0e",null);a["a"]=d.exports},7491:function(e,a,t){},a2c8:function(e,a,t){e.exports=t.p+"static/img/avatar-upload.80d54d4f.png"},a866:function(e,a,t){"use strict";var s=t("2906"),r=t.n(s);r.a},b0c0:function(e,a,t){var s=t("83ab"),r=t("9bf2").f,n=Function.prototype,o=n.toString,c=/^\s*function ([^ (]*)/,l="name";s&&!(l in n)&&r(n,l,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(e){return""}}})},b64b:function(e,a,t){var s=t("23e7"),r=t("7b0b"),n=t("df75"),o=t("d039"),c=o((function(){n(1)}));s({target:"Object",stat:!0,forced:c},{keys:function(e){return n(r(e))}})},c2e5:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("el-row",{attrs:{type:"flex",justify:"center"}},[t("el-col",e._b({staticClass:"reg-box"},"el-col",e.layout,!1),[t("h1",{staticClass:"title"},[e._v("基本信息")]),t("div",{staticClass:"form-section"},[t("section",{staticClass:"form-box",staticStyle:{"margin-top":"30px"}},[t("el-card",{staticClass:"form-card"},[t("div",{staticClass:"flex-vc form-name"},[t("label",{attrs:{for:""}},[e._v("手机号")]),t("p",[e._v(e._s(e.user.userName))])]),e.isReg?e._e():t("div",{staticClass:"flex-vc form-name"},[t("label",{attrs:{for:""}},[e._v("密码")]),t("p",{staticStyle:{"margin-right":"30px"}},[e._v("**********")]),t("el-button",{attrs:{plain:""},on:{click:e.handleClickChangePwd}},[e._v("修改密码")])],1),t("quick-form",{ref:"baseInfo",attrs:{model:e.baseInfo,labelWidth:"80px"}})],1)],1)]),t("h1",{staticClass:"title bottom"},[e._v("最高学历")]),t("div",{staticClass:"form-section"},[t("section",{staticClass:"form-box"},[t("el-card",{staticClass:"form-card"},[t("quick-form",{ref:"education",attrs:{model:e.education,labelWidth:"80px"}})],1)],1)]),t("div",{staticClass:"flex-he",staticStyle:{margin:"60px 60px 70px 0"}},[t("el-button",{attrs:{type:"success"},on:{click:e.handleSave}},[e._v("确定")])],1)]),t("change-pwd",{attrs:{isShow:e.isShow},on:{close:e.handleClose}})],1)},r=[],n=(t("7db0"),t("caad"),t("d81d"),t("b64b"),t("d3b7"),t("ac1f"),t("2532"),t("3ca3"),t("5319"),t("ddb0"),t("96cf"),t("1da1")),o=t("5530"),c=t("2f62"),l=t("4d06"),i=t("a026"),u=t("c1df"),d=t.n(u),f=i["default"].prototype.$rules,b={passWord:{value:"",label:"密码",rules:[f.required(),f.length(6,12)],props:{type:"password"}},name:{value:"",label:"姓名",rules:[f.required(),f.maxLength(20)]},nickName:{value:"",label:"昵称",rules:[f.required(),f.maxLength(10)]},gender:{label:"性别",value:"",type:"radio",props:{label:"label",value:"value"},options:[{label:"男",value:"m"},{label:"女",value:"f"}],rules:[f.required()]},birthday:{label:"出生年月",value:"",type:"date",rules:[f.required()],props:{style:{width:"200px"},"picker-options":{disabledDate:function(e){return e.getTime()>d()().valueOf()}}}},avatarImage:{label:"设置头像",rules:[f.required()],type:"upload",value:"",props:{action:"http://www.leavesyesong.xyz/api/user/platform/consumer/upload",accept:".jpg,.png,.gif",name:"UploadFiles",disabled:!1,"show-file-list":!1,"auto-upload":!0,"before-upload":null,"on-success":null},render:null}},p=i["default"].prototype.$rules,j={country:{type:"select",value:"",label:"国家",rules:[p.required()],props:{props:{label:"text",value:"value"}},options:[],events:{}},school:{type:"select",value:"",label:"学校",rules:[p.required()],props:{props:{label:"text",value:"value"}},options:[]},discipline:{type:"select",value:"",label:"专业",rules:[p.required()],props:{props:{label:"text",value:"value"}},options:[]},GPA:{type:"select",value:"",label:"GPA",props:{props:{label:"text",value:"value"}},options:[]},degree:{type:"select",value:"",label:"学位",rules:[p.required()],props:{props:{label:"text",value:"value"}},options:[]},graduationTime:{label:"毕业时间",value:"",type:"date",rules:[p.required()],props:{style:{width:"200px"},"picker-options":{disabledDate:function(e){return e.getTime()>d()().valueOf()}}}},selfIntroduction:{value:"",label:"自我介绍",rules:[p.maxLength(300)]},detailedIntroduction:{value:"",label:"详细介绍",rules:[p.maxLength(300)],props:{type:"textarea",rows:6,placeholder:"请输入详细内容"}}},m={baseInfo:b,education:j},h=t("1b62");t("b0c0");function v(e){return{userName:e.userName,passWord:e.passWord,basic:{birthday:e.birthday,name:e.name,gender:e.gender,nickName:e.nickName,avatarImage:e.avatarImage,selfIntroduction:e.selfIntroduction,detailedIntroduction:e.detailedIntroduction,highestEducation:{country:e.country,school:e.school,discipline:e.discipline,degree:e.degree,graduationTime:e.graduationTime,GPA:e.GPA}},refer:"",referType:"MGM"}}function g(e,a){var t=e.account,s=e.basic,r=a.baseInfo;r.passWord.value=t.passWord,r.name.value=s.name,r.nickName.value=s.nickName,r.gender.value=s.gender,r.birthday.value=s.birthday,r.avatarImage.value=s.avatarImage;var n=a.education,o=s.highestEducation;return n.country.value=o.country,n.school.value=o.school,n.discipline.value=o.discipline,n.degree.value=o.degree,n.graduationTime.value=o.graduationTime,n.GPA.value=o.GPA,n.selfIntroduction.value=s.selfIntroduction,n.detailedIntroduction.value=s.detailedIntroduction,a}var y=t("c24f"),k=t("a2c8"),x=t.n(k),w=t("5f87"),I=t("72a7"),C={},z={mixins:[h["a"]],components:{QuickForm:l["a"],ChangePwd:I["a"]},data:function(){return Object(o["a"])({isShow:!1,layout:{span:24},isReg:!1},m)},computed:Object(o["a"])({},Object(c["b"])(["user"])),created:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var t,s,r,n,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.refer=e.$route.query.refer,e.isReg=e.$route.path.includes("/register/consumer"),e.isReg&&(e.baseInfo.passWord.hide=!1,e.layout={xs:24,sm:24,md:20,lg:15,xl:12}),t=e.baseInfo.avatarImage,t.props["before-upload"]=function(a){return e.uploadBefore(a)},t.props["on-success"]=function(a,t){return e.uploadSuccess(a,t,e.uploadCb)},t.render=e.renderUpload,a.next=9,Object(y["e"])();case 9:if(s=a.sent,C=s.msg,e.education.country.options=C.countries,e.education.discipline.options=C.majors,e.education.GPA.options=C.gpa,e.education.degree.options=C.degrees,e.education.country.events.change=e.handleCountryChange,e.isReg){a.next=23;break}return r=e.loading(),a.next=20,Object(y["i"])().catch((function(e){return r.close()}));case 20:n=a.sent,n.result&&(o=n.msg.basic.highestEducation.country,o&&(console.log(o,C.countries),e.education.school.options=C.countries.find((function(e){return e.value==o})).schools),g(n.msg,e._data)),r.close();case 23:case"end":return a.stop()}}),a)})))()},methods:{handleClickChangePwd:function(){this.isShow=!0},handleClose:function(){this.isShow=!1},handleCountryChange:function(e){var a=C.countries.find((function(a){return a.value==e}));this.education.school.options=a.schools,this.education.school.value=""},handleSave:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var t,s,r,n,c,l,i,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t=Object.keys(m),s=!0,a.next=4,Promise.all(t.map((function(a){return e.$refs[a].validate()}))).catch((function(e){console.log(e,"error"),s=!1}));case 4:if(r=a.sent,console.log(r,333),!s){a.next=18;break}return n=Object(o["a"])(Object(o["a"])({userName:e.user.userName},e.$refs.baseInfo.getFormData()),e.$refs.education.getFormData()),c=v(n),e.isReg&&e.refer&&(c.refer=e.refer),console.log(c,"参数"),l=e.loading(),i=e.isReg?y["m"]:y["o"],a.next=15,i(c).catch((function(e){return l.close()}));case 15:u=a.sent,u.result&&(e.alert(e.isReg?"注册成功":"保存成功"),e.isReg?(Object(w["c"])(u.msg.token),e.$router.replace("/consumer/index")):e.$store.dispatch("user/setUser",{nickName:n.nickName,avatar:n.avatarImage})),l.close();case 18:case"end":return a.stop()}}),a)})))()},renderUpload:function(e){var a="";return this.baseInfo.avatarImage.value&&(a="http://www.leavesyesong.xyz/"+this.baseInfo.avatarImage.value),console.log(a),e("el-Image",{style:"border-radius: 50%;width: 90px; height: 90px;overflow: hidden",attrs:{src:a||x.a}})},checkFile:function(e){return e.size>2097152?(this.alert("上传图片不能超过2M"),!1):!!["image/png","image/jpeg","image/gif"].includes(e.type)||(this.alert("请上传PNG、JPG、GIF类型文件"),!1)},afterUpload:function(e){this.baseInfo.avatarImage.value=e}}},O=z,S=(t("d40f"),t("a866"),t("2877")),q=Object(S["a"])(O,s,r,!1,null,"7ab810a0",null);a["default"]=q.exports},d40f:function(e,a,t){"use strict";var s=t("6af3"),r=t.n(s);r.a},ddb0:function(e,a,t){var s=t("da84"),r=t("fdbc"),n=t("e260"),o=t("9112"),c=t("b622"),l=c("iterator"),i=c("toStringTag"),u=n.values;for(var d in r){var f=s[d],b=f&&f.prototype;if(b){if(b[l]!==u)try{o(b,l,u)}catch(j){b[l]=u}if(b[i]||o(b,i,d),r[d])for(var p in n)if(b[p]!==n[p])try{o(b,p,n[p])}catch(j){b[p]=n[p]}}}}}]);