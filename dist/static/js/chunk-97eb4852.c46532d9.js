(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-97eb4852"],{1427:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",{staticClass:"page-title flex-hbc"},[n("span",[t._v("咨询师详情")]),n("el-button",{attrs:{plain:"",size:"mini",icon:"el-icon-arrow-left"},on:{click:t.goBack}},[t._v("返回")])],1),n("section",{staticClass:"card-box"},[n("div",{staticClass:"flex-hb"},[n("el-card",{staticClass:"left"},[n("avatar",{attrs:{imgUrl:t.info.avatarImage}}),n("p",{staticClass:"name"},[t._v(t._s(t.info.nickName))]),n("div",{staticClass:"flex-hbc rate-box",on:{click:t.showRateDetail}},[n("el-rate",{attrs:{disabled:""},model:{value:t.rate,callback:function(e){t.rate=e},expression:"rate"}}),n("p",[t._v("评价:234")])],1),n("p",{staticClass:"motto"},[t._v(t._s(t.info.selfIntroduction))]),n("div",{staticClass:"flex-hb"},[n("p",{staticClass:"cost-item"},[t._v("咨询费用")]),n("div",{staticClass:"flex-hc"},[n("div",{staticClass:"num"},[t._v(t._s(t.info.price))]),n("div",{staticClass:"unit"},[t._v("RMB")])])])],1),n("el-card",{staticClass:"right"},[n("ul",[n("li",{staticClass:"flex-hbc info-item"},[n("div",[n("h1",[t._v("最高学历")]),n("p",[t._v(t._s(t.info.highEdu))])]),n("el-button",{attrs:{size:"mini",plain:""}},[t._v("更多")])],1),n("li",{staticClass:"info-item flex-hbc"},[n("div",[n("h1",[t._v("工作信息")]),n("p",{staticStyle:{"margin-bottom":"10px"}},[t._v("所属行业: "+t._s(t.info.industry))]),n("p",[t._v("公司名称: "+t._s(t.info.company))])]),n("div",[t._v("职位: "+t._s(t.info.position))]),n("div",[t._v("工作年限: "+t._s(t.info.workingYears)+"年")]),n("el-button",{attrs:{size:"mini",plain:""}},[t._v("更多")])],1),n("li",{staticClass:"info-item"},[n("h1",[t._v("主要工作内容")]),n("p",[t._v(t._s(t.info.duty))])]),n("li",{staticClass:"info-item"},[n("h1",[t._v("工作个人技能")]),n("p",[t._v(t._s(t.info.skills))])])])])],1),n("el-card",{staticClass:"calendar-card"},[n("h1",[t._v("可预约时间表(北京时间)")]),n("calendar",{on:{"set-time":t.handleSetTime}},[n("el-button",{staticClass:"appintment-btn",attrs:{size:"small",type:"consumer"==t.user.role?"success":"primary"},on:{click:t.handleCreateOrder}},[t._v("预约单生成")])],1)],1)],1),n("rate-list",{attrs:{isShow:t.isShow},on:{close:t.handleClose}})],1)},i=[],s=(n("99af"),n("d81d"),n("d3b7"),n("25f0"),n("96cf"),n("1da1")),r=n("5530"),o=n("77c0"),c=n("a16a"),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"评价详情",visible:t.isShow,"before-close":t.handleClose,width:"630px",center:""},on:{"update:visible":function(e){t.isShow=e}}},[n("section",{staticClass:"modal-main"},[n("ul",t._l(t.rateList,(function(e,a){return n("li",{key:a},[n("div",{staticClass:"flex-hbc"},[n("el-rate",{attrs:{disabled:""},model:{value:e.rate,callback:function(n){t.$set(e,"rate",n)},expression:"item.rate"}}),n("p",[t._v("评价时间："+t._s(e.time))])],1),n("p",{staticClass:"rate-content"},[t._v(t._s(e.content))]),n("p",{staticClass:"rate-replay"},[t._v(t._s(e.replay))])])})),0)])])},u=[],d={name:"rate-list",components:{},props:["isShow"],data:function(){return{rateList:[{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"},{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"},{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"},{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"},{rate:4,time:"2002-01-20 12:08:20",content:"声音温柔，很有耐心，有问必答超级nice",replay:"咨询师回复：感谢您的肯定，很荣幸，希望继"}]}},methods:{handleClose:function(){this.$emit("close")}}},f=d,m=(n("32b37"),n("2877")),p=Object(m["a"])(f,l,u,!1,null,"0b12e5c1",null),v=p.exports,h=n("c24f"),b=n("f8b7"),g=n("c1df"),_=n.n(g),C=n("2f62"),w={name:"consultant-detail",components:{Avatar:o["a"],Calendar:c["a"],RateList:v},data:function(){return{info:{},times:[],rate:4,isShow:!1,checked:!1,isConfirm:!1}},computed:Object(r["a"])({},Object(C["b"])(["user"])),created:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,a,i,s,r,o,c,l,u,d,f,m,p,v,b,g,C;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.loading(),e.next=3,Object(h["d"])({userId:t.$route.params.id}).catch((function(t){return n.close()}));case 3:a=e.sent,a.result&&a.msg.publicInfo&&(t.publicInfo=a.msg.publicInfo,i=a.msg.publicInfo,s=i.resume.education[0],r=s.school,o=s.discipline,c=s.degree,l=s.graduationTime,u=i.resume.workExperience[0],d=u.industry,f=u.company,m=u.position,p=u.duty,v=i.evaluationPoint>0?i.evaluationPoint/i.evaluationCount:0,b=i.resume.workExperience,g=b[0].resignationTime,g=g?_()(g).valueOf():_()().valueOf(),C=Math.ceil((g-_()(b[b.length-1].entryTime).valueOf())/31536e6),t.info={price:a.msg.price,nickName:i.nickName,avatarImage:i.avatarImage,selfIntroduction:i.selfIntroduction,rateCount:i.evaluationCount,totalRate:i.evaluationPoint,rate:v,highEdu:"".concat(r," ").concat(o," ").concat(c," ").concat(_()(l).format("YYYY年毕业")),industry:d,company:f,position:m,duty:p,workingYears:C,skills:i.resume.skills.toString()}),n.close();case 6:case"end":return e.stop()}}),e)})))()},methods:{handleSetTime:function(t){this.times=t},handleCreateOrder:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,a,i,s,r,o,c,l,u,d,f,m,p,v,h,g,_,C,w,k;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.times.length){e.next=3;break}return t.alert("请选择时间","warning"),e.abrupt("return",!1);case 3:return n=t.info,a=n.nickName,i=n.avatarImage,s=n.selfIntroduction,r=n.industry,o=n.company,c=n.position,l=n.duty,u=n.workingYears,d=n.skills,f=n.totalRate,m=n.rateCount,p=t.publicInfo.resume.education[0],v=p.school,h=p.discipline,g=p.degree,_=p.graduationTime,C={consumerNickName:t.user.nickName,consumerAvatar:t.user.avatar,consultant:{_id:t.$route.params.id,name:a,avatar:i,readme:s,education:{school:v,discipline:h,degree:g,graduationTime:_},work:{industry:r,company:o,position:c,workingYears:u,duty:l,skills:d},evaluationCount:m,evaluationPoint:f},consumerTime:t.times.map((function(t){return Math.ceil(t.value/1e3)}))},console.log(C,"参数"),w=t.loading(),e.next=10,Object(b["c"])(C).catch((function(t){return w.close()}));case 10:k=e.sent,k.result&&(t.alert("订单已生成"),t.$router.push("/consumer/order-confirm/".concat(k.msg))),w.close();case 13:case"end":return e.stop()}}),e)})))()},showRateDetail:function(){this.isShow=!0},handleClose:function(){this.isShow=!1},goBack:function(){this.$router.go(-1)}},mounted:function(){}},k=w,y=(n("2f07"),n("df93"),Object(m["a"])(k,a,i,!1,null,"418e9d32",null));e["default"]=y.exports},"2f07":function(t,e,n){"use strict";var a=n("b380"),i=n.n(a);i.a},"32b37":function(t,e,n){"use strict";var a=n("9306"),i=n.n(a);i.a},6080:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var a=n("b775");function i(t){return Object(a["a"])({url:"/consultant/platform/consultant/timeAvailable",method:"put",data:t})}},"7db0":function(t,e,n){"use strict";var a=n("23e7"),i=n("b727").find,s=n("44d2"),r=n("ae40"),o="find",c=!0,l=r(o);o in[]&&Array(1)[o]((function(){c=!1})),a({target:"Array",proto:!0,forced:c||!l},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),s(o)},9306:function(t,e,n){},a434:function(t,e,n){"use strict";var a=n("23e7"),i=n("23cb"),s=n("a691"),r=n("50c4"),o=n("7b0b"),c=n("65f0"),l=n("8418"),u=n("1dde"),d=n("ae40"),f=u("splice"),m=d("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,v=Math.min,h=9007199254740991,b="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!f||!m},{splice:function(t,e){var n,a,u,d,f,m,g=o(this),_=r(g.length),C=i(t,_),w=arguments.length;if(0===w?n=a=0:1===w?(n=0,a=_-C):(n=w-2,a=v(p(s(e),0),_-C)),_+n-a>h)throw TypeError(b);for(u=c(g,a),d=0;d<a;d++)f=C+d,f in g&&l(u,d,g[f]);if(u.length=a,n<a){for(d=C;d<_-a;d++)f=d+a,m=d+n,f in g?g[m]=g[f]:delete g[m];for(d=_;d>_-a+n;d--)delete g[d-1]}else if(n>a)for(d=_-a;d>C;d--)f=d+a-1,m=d+n-1,f in g?g[m]=g[f]:delete g[m];for(d=0;d<n;d++)g[d+C]=arguments[d+2];return g.length=_-a+n,u}})},b380:function(t,e,n){},df93:function(t,e,n){"use strict";var a=n("f21b"),i=n.n(a);i.a},f21b:function(t,e,n){}}]);