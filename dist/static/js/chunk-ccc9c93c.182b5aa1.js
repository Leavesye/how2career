(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ccc9c93c"],{1427:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h1",{staticClass:"page-title flex-hbc"},[s("span",[e._v("咨询师详情")]),s("el-button",{attrs:{plain:"",size:"mini",icon:"el-icon-arrow-left"},on:{click:e.goBack}},[e._v("返回")])],1),s("section",{staticClass:"card-box"},[s("div",{staticClass:"flex-hb"},[s("el-card",{staticClass:"left"},[s("avatar",{attrs:{imgUrl:e.info.avatarImage}}),s("p",{staticClass:"name"},[e._v(e._s(e.info.nickName))]),s("div",{staticClass:"flex-hbc rate-box",on:{click:e.showRateDetail}},[s("el-rate",{attrs:{disabled:""},model:{value:e.info.rate,callback:function(t){e.$set(e.info,"rate",t)},expression:"info.rate"}}),s("h1",{staticClass:"rate-count flex-vc"},[s("i",{staticClass:"iconfont icondianping-01"}),s("div",{staticStyle:{"margin-left":"4px"}},[e._v(e._s(e.info.rateCount))])])],1),s("p",{staticClass:"motto"},[e._v(e._s(e.info.selfIntroduction))]),s("div",{staticClass:"flex-hb"},[s("p",{staticClass:"cost-item"},[e._v("咨询费用")]),s("div",{staticClass:"flex-hc"},[s("div",{staticClass:"num"},[e._v(e._s(e.info.price))]),s("div",{staticClass:"unit"},[e._v("RMB")])])])],1),s("el-card",{staticClass:"right"},[s("ul",[s("li",{staticClass:"flex-hbc info-item"},[s("div",[s("h1",[e._v("最高学历")]),s("p",[e._v(e._s(e.info.highEdu))])]),s("el-button",{attrs:{size:"mini",plain:""}},[e._v("更多")])],1),s("li",{staticClass:"info-item flex-hbc"},[s("div",[s("h1",[e._v("工作信息")]),s("p",{staticStyle:{"margin-bottom":"10px"}},[e._v("所属行业: "+e._s(e.info.industry))]),s("p",[e._v("公司名称: "+e._s(e.info.company))])]),s("div",[e._v("职位: "+e._s(e.info.position))]),s("div",[e._v("工作年限: "+e._s(e.info.workingYears)+"年")]),s("el-button",{attrs:{size:"mini",plain:""}},[e._v("更多")])],1),s("li",{staticClass:"info-item"},[s("h1",[e._v("主要工作内容")]),s("p",[e._v(e._s(e.info.duty))])]),s("li",{staticClass:"info-item"},[s("h1",[e._v("工作个人技能")]),s("p",[e._v(e._s(e.info.skills))])])])])],1),s("el-card",{staticClass:"calendar-card"},[s("h1",[e._v("可预约时间表(北京时间)")]),s("calendar",{on:{"set-time":e.handleSetTime}},[s("el-button",{staticClass:"appintment-btn",attrs:{size:"small",type:"consumer"==e.user.role?"success":"primary"},on:{click:e.handleCreateOrder}},[e._v("预约单生成")])],1)],1)],1),s("rate-list",{attrs:{isShow:e.isShow},on:{close:e.handleClose}})],1)},n=[],i=(s("99af"),s("d81d"),s("d3b7"),s("25f0"),s("96cf"),s("1da1")),c=s("5530"),r=s("77c0"),o=s("a16a"),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-dialog",{attrs:{title:"评价详情",visible:e.isShow,"before-close":e.handleClose,width:"630px",center:""},on:{"update:visible":function(t){e.isShow=t}}},[s("section",{staticClass:"modal-main"},[s("ul",e._l(e.rateList,(function(t,a){return s("li",{key:a},[s("div",{staticClass:"flex-hbc"},[s("el-rate",{attrs:{disabled:""},model:{value:t.rate,callback:function(s){e.$set(t,"rate",s)},expression:"item.rate"}}),s("p",[e._v("评价时间："+e._s(t.time))])],1),s("p",{staticClass:"rate-content"},[e._v(e._s(t.content))]),s("p",{staticClass:"rate-replay"},[e._v(e._s(t.replay))])])})),0)])])},f=[],d={name:"rate-list",components:{},props:["isShow"],data:function(){return{rateList:[{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"},{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"},{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"},{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"},{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"}]}},methods:{handleClose:function(){this.$emit("close")}}},u=d,b=(s("32b3"),s("2877")),j=Object(b["a"])(u,l,f,!1,null,"0b12e5c1",null),m=j.exports,h=s("c24f"),p=s("f8b7"),v=s("c1df"),g=s.n(v),k=s("2f62"),y={name:"consultant-detail",components:{Avatar:r["a"],Calendar:o["a"],RateList:m},data:function(){return{info:{},times:[],rate:4,isShow:!1,checked:!1,isConfirm:!1}},computed:Object(c["a"])({},Object(k["b"])(["user"])),created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s,a,n,i,c,r,o,l,f,d,u,b,j,m,p,v,k;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=e.loading(),t.next=3,Object(h["d"])({userId:e.$route.params.id}).catch((function(e){return s.close()}));case 3:a=t.sent,a.result&&a.msg.publicInfo&&(e.publicInfo=a.msg.publicInfo,n=a.msg.publicInfo,i=n.resume.education[0],c=i.school,r=i.discipline,o=i.degree,l=i.graduationTime,f=n.resume.workExperience[0],d=f.industry,u=f.company,b=f.position,j=f.duty,m=n.evaluationPoint>0?n.evaluationPoint/n.evaluationCount:0,p=n.resume.workExperience,v=p[0].resignationTime,v=v?g()(v).valueOf():g()().valueOf(),k=Math.ceil((v-g()(p[p.length-1].entryTime).valueOf())/31536e6),e.info={price:a.msg.price,nickName:n.nickName,avatarImage:n.avatarImage,selfIntroduction:n.selfIntroduction,rateCount:n.evaluationCount,totalRate:n.evaluationPoint,rate:m,highEdu:"".concat(c," ").concat(r," ").concat(o," ").concat(g()(l).format("YYYY年毕业")),industry:d,company:u,position:b,duty:j,workingYears:k,skills:n.resume.skills.toString()}),s.close();case 6:case"end":return t.stop()}}),t)})))()},methods:{handleSetTime:function(e){this.times=e},handleCreateOrder:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s,a,n,i,c,r,o,l,f,d,u,b,j,m,h,v,g,k,y,_;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.times.length){t.next=3;break}return e.alert("请选择时间","warning"),t.abrupt("return",!1);case 3:return s=e.info,a=s.nickName,n=s.avatarImage,i=s.selfIntroduction,c=s.industry,r=s.company,o=s.position,l=s.duty,f=s.workingYears,d=s.skills,u=s.totalRate,b=s.rateCount,j=e.publicInfo.resume.education[0],m=j.school,h=j.discipline,v=j.degree,g=j.graduationTime,k={consumerNickName:e.user.nickName,consumerAvatar:e.user.avatar,consultant:{_id:e.$route.params.id,name:a,avatar:n,readme:i,education:{school:m,discipline:h,degree:v,graduationTime:g},work:{industry:c,company:r,position:o,workingYears:f,duty:l,skills:d},evaluationCount:b,evaluationPoint:u},consumerTime:e.times.map((function(e){return Math.ceil(e.value/1e3)}))},console.log(k,"参数"),y=e.loading(),t.next=10,Object(p["c"])(k).catch((function(e){return y.close()}));case 10:_=t.sent,_.result&&(e.alert("订单已生成"),e.$router.push("/consumer/order-confirm/".concat(_.msg))),y.close();case 13:case"end":return t.stop()}}),t)})))()},showRateDetail:function(){this.isShow=!0},handleClose:function(){this.isShow=!1},goBack:function(){this.$router.go(-1)}},mounted:function(){}},_=y,w=(s("2f07"),s("ceb2"),Object(b["a"])(_,a,n,!1,null,"2d56ae5c",null));t["default"]=w.exports},"2f07":function(e,t,s){"use strict";var a=s("b380"),n=s.n(a);n.a},"32b3":function(e,t,s){"use strict";var a=s("9306"),n=s.n(a);n.a},4678:function(e,t,s){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b4695","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b4695","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df48","./fa.js":"8df48","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b46","./gd.js":"f6b46","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var t=i(e);return s(t)}function i(e){if(!s.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=i,e.exports=n,n.id="4678"},6080:function(e,t,s){"use strict";s.d(t,"a",(function(){return n}));var a=s("b775");function n(e){return Object(a["a"])({url:"/consultant/platform/consultant/timeAvailable",method:"put",data:e})}},"7db0":function(e,t,s){"use strict";var a=s("23e7"),n=s("b727").find,i=s("44d2"),c=s("ae40"),r="find",o=!0,l=c(r);r in[]&&Array(1)[r]((function(){o=!1})),a({target:"Array",proto:!0,forced:o||!l},{find:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),i(r)},9306:function(e,t,s){},a434:function(e,t,s){"use strict";var a=s("23e7"),n=s("23cb"),i=s("a691"),c=s("50c4"),r=s("7b0b"),o=s("65f0"),l=s("8418"),f=s("1dde"),d=s("ae40"),u=f("splice"),b=d("splice",{ACCESSORS:!0,0:0,1:2}),j=Math.max,m=Math.min,h=9007199254740991,p="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!u||!b},{splice:function(e,t){var s,a,f,d,u,b,v=r(this),g=c(v.length),k=n(e,g),y=arguments.length;if(0===y?s=a=0:1===y?(s=0,a=g-k):(s=y-2,a=m(j(i(t),0),g-k)),g+s-a>h)throw TypeError(p);for(f=o(v,a),d=0;d<a;d++)u=k+d,u in v&&l(f,d,v[u]);if(f.length=a,s<a){for(d=k;d<g-a;d++)u=d+a,b=d+s,u in v?v[b]=v[u]:delete v[b];for(d=g;d>g-a+s;d--)delete v[d-1]}else if(s>a)for(d=g-a;d>k;d--)u=d+a-1,b=d+s-1,u in v?v[b]=v[u]:delete v[b];for(d=0;d<s;d++)v[d+k]=arguments[d+2];return v.length=g-a+s,f}})},b380:function(e,t,s){},ceb2:function(e,t,s){"use strict";var a=s("fc91"),n=s.n(a);n.a},fc91:function(e,t,s){}}]);