(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54e716e2"],{"100e":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{attrs:{title:"学历信息",visible:t.isShow,"before-close":t.handleClose,width:"500px",center:""},on:{"update:visible":function(e){t.isShow=e}}},[s("section",{staticClass:"modal-main"},t._l(t.edus,(function(e,i){return s("div",{key:i,staticClass:"d-item"},[s("p",{staticClass:"field-name title"},[t._v("学历信息")]),s("p",[t._v(t._s(e.desc))])])})),0),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"success"},on:{click:t.handleClose}},[t._v("关闭")])],1)])},a=[],n={props:["edus","isShow"],data:function(){return{}},methods:{handleClose:function(){this.$emit("close")}}},o=n,r=(s("af91"),s("2877")),c=Object(r["a"])(o,i,a,!1,null,"15ee85a5",null);e["a"]=c.exports},"2b54":function(t,e,s){},5594:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{padding:"30px"}},[s("section",{staticClass:"flex"},[s("el-card",{staticClass:"card-l"},[s("div",{staticClass:"title",staticStyle:{"margin-bottom":"40px"}},[t._v("咨询师")]),s("div",{staticClass:"header"},[s("avatar",{attrs:{imgUrl:t.info.avatar}}),s("div",{staticClass:"micro ani"},[s("i",{staticClass:"iconfont iconhuatong"})])],1),s("p",{staticClass:"user-name"},[t._v(t._s(t.info.name))])]),s("el-card",{staticClass:"card-c"},[s("p",{staticClass:"title"},[t._v("咨询问题")]),s("div",{staticClass:"q-box"},t._l(t.info.question,(function(e,i){return s("p",{key:i,staticClass:"question"},[t._v(t._s(e)+"?")])})),0)]),s("el-card",{staticClass:"card-r"},[s("p",{staticClass:"title",staticStyle:{"margin-bottom":"28px"}},[t._v("咨询开始时间")]),s("p",[t._v("北京时间")]),s("p",[t._v(t._s(t.info.startText))]),s("p",{staticClass:"ques-status"},[t._v("咨询中")]),s("count-down",{attrs:{bg:"#36AE82",targetTime:t.info.startTime}})],1)],1),s("el-card",{staticClass:"detail-card"},[s("div",{staticClass:"d-item"},[s("p",{staticClass:"field-name title"},[t._v("最高学历")]),s("div",{staticClass:"flex-hbc"},[s("span",[t._v(t._s(t.edu.desc))]),t.edus.length>1?s("el-button",{attrs:{plain:""},on:{click:t.toggleEdu}},[t._v("更多")]):t._e()],1)]),s("div",{staticClass:"d-item"},[s("p",{staticClass:"field-name title"},[t._v("工作信息")]),s("p",[t._v("所属行业："+t._s(t.work.industry))]),s("div",{staticClass:"flex-hbc"},[s("div",{staticClass:"flex work-item"},[s("span",[t._v("公司名称："+t._s(t.work.company))]),s("span",[t._v("职位："+t._s(t.work.position))]),s("span",[t._v("工作年限："+t._s(t.work.workingYears))])]),t.works.length>1?s("el-button",{attrs:{plain:""},on:{click:t.toggleWork}},[t._v("更多")]):t._e()],1)]),s("div",{staticClass:"d-item"},[s("p",{staticClass:"field-name title"},[t._v("主要工作内容")]),s("p",[t._v(t._s(t.work.duty))])]),s("div",{staticClass:"d-item"},[s("p",{staticClass:"field-name title"},[t._v("工作个人技能")]),s("p",[t._v(t._s(t.info.skills))])]),s("div",{staticClass:"flex-he"},[s("el-button",{staticClass:"stop-btn",attrs:{type:"success"},on:{click:t.handleLeaveRoom}},[t._v("结束服务")])],1)]),s("room-status",{attrs:{isShow:t.isShow,targetTime:t.info.startTime,info:t.info},on:{start:t.handleChatStart}}),s("more-edu",{attrs:{isShow:t.isShowEdu,edus:t.edus},on:{close:t.toggleEdu}}),s("more-work",{attrs:{isShow:t.isShowWork,works:t.works},on:{close:t.toggleWork}})],1)},a=[],n=(s("99af"),s("7db0"),s("a15b"),s("d81d"),s("b0c0"),s("d3b7"),s("25f0"),s("3ca3"),s("ddb0"),s("96cf"),s("1da1")),o=s("3628"),r=s("c1df"),c=s.n(r),l=s("77c0"),d=s("8b5c"),u=s("b1b6"),f=s("100e"),m=s("7779"),v=s("f8b7"),h=s("c24f"),p={name:"room",components:{Avatar:l["a"],CountDown:d["a"],RoomStatus:u["a"],MoreEdu:f["a"],MoreWork:m["a"]},data:function(){return{isShow:!0,isShowEdu:!1,isShowWork:!1,work:{},works:[],edu:{},edus:[],info:{},targetTime:0}},created:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var s,i,a,n,o,r,l,d,u,f,m,p,_,w,b,C,g,k,x,S,y,I,T,E,O,j,W,R;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.orderId=t.$route.params.id,s=t.loading(),e.next=4,Promise.all([Object(v["e"])({orderId:t.orderId}),Object(h["e"])()]).catch((function(t){return s.close()}));case 4:if(i=e.sent,!i[0].result){e.next=13;break}return a=i[0].msg,n=a.consultant,o=n.avatar,r=n.name,l=n._id,d=a.consumer,u=a.startTime,f=a.question,m=a.roomId,p=a.slotId,_=i[1].msg,w=_.countries,b=_.majors,C=_.degrees,g=_.industry,k=_.gender,t.initRtcClient(m,l),e.next=11,Object(h["h"])({userId:l}).catch((function(t){return s.close()}));case 11:x=e.sent,x.result&&(S=x.msg.publicInfo,y=S.birthday,I=S.gender,T=S.selfIntroduction,E=S.detailedIntroduction,O=S.resume,j=O.education,W=O.workExperience,R=O.skills,t.info={slotId:p,consultantId:l,consumerId:d,orderId:t.orderId,roomId:m,birthday:y,detailedIntroduction:E,selfIntroduction:T,gender:k.find((function(t){return t.value==I})).text,startTime:u,question:f,avatar:o,name:r,startText:c()(1e3*u).format("MM月DD日 HH:mm")+"~"+c()(1e3*u).subtract("-90","minutes").format("HH:mm"),skills:R?R.toString():""},t.edus=j.map((function(t){var e=w.find((function(e){return e.value==t.country})).schools,s=e.find((function(e){return e.value==t.school})).text,i=b.find((function(e){return e.value==t.discipline})).text,a=C.find((function(e){return e.value==t.degree})).text;return{desc:"".concat(s," ").concat(i," ").concat(a)}})),t.edu=t.edus[0],t.works=W.map((function(t){var e=t.resignationTime?c()(t.resignationTime).valueOf():c()().valueOf(),s=Math.ceil((e-c()(t.entryTime).valueOf())/31536e6);return{company:t.company,industry:t.industry,industryText:g.find((function(e){return e.value==t.industry})).text,position:t.position,workingYears:s?"".concat(s,"年"):"",duty:t.duty}})),t.work=t.works[0]);case 13:s.close();case 14:case"end":return e.stop()}}),e)})))()},methods:{initRtcClient:function(t,e){this.rtc=new o["a"]({sdkAppId:"1400420577",userSig:"396c7e573eed611d8068cf8c1929aa9a481271b8770a81325c9dd671337fee05",userId:e,roomId:t}),console.log(this.rtc,"rtc")},handleChatStart:function(){this.isShow=!1,this.rtc.join()},toggleEdu:function(){this.isShowEdu=!this.isShowEdu},toggleWork:function(){this.isShowWork=!this.isShowWork},handleLeaveRoom:function(){var t=this;this.$alert("点击服务确认将结束此次服务，无法再次进入房间","服务结束确认",{confirmButtonText:"确认",callback:function(e){console.log(e),"confirm"==e&&Object(v["n"])({orderId:t.orderId}).then((function(e){e.result&&(t.rtc.leave(),t.alert("服务已结束"))}))}})}},mounted:function(){}},_=p,w=(s("e9ab"),s("2877")),b=Object(w["a"])(_,i,a,!1,null,"4079391d",null);e["default"]=b.exports},7779:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{attrs:{title:"工作信息",visible:t.isShow,"before-close":t.handleClose,width:"560px",center:""},on:{"update:visible":function(e){t.isShow=e}}},[s("section",{staticClass:"modal-main"},t._l(t.works,(function(e,i){return s("div",{key:i,staticClass:"d-item"},[s("p",{staticClass:"field-name title"},[t._v("工作信息")]),s("p",[t._v("所属行业："+t._s(e.industryText))]),s("div",{staticClass:"flex-hbc fields"},[s("p",{staticClass:"field-name"},[t._v("公司名称："+t._s(e.company))]),s("p",{staticClass:"field-name"},[t._v("职位："+t._s(e.position))]),s("p",{staticClass:"field-name"},[t._v("工作年限："+t._s(e.workingYears))])])])})),0),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"success"},on:{click:t.handleClose}},[t._v("关闭")])],1)])},a=[],n={props:["works","isShow"],data:function(){return{}},methods:{handleClose:function(){this.$emit("close")}}},o=n,r=(s("f83a"),s("2877")),c=Object(r["a"])(o,i,a,!1,null,"695417c3",null);e["a"]=c.exports},"9e5f":function(t,e,s){},a4b9:function(t,e,s){},af91:function(t,e,s){"use strict";var i=s("9e5f"),a=s.n(i);a.a},e9ab:function(t,e,s){"use strict";var i=s("a4b9"),a=s.n(i);a.a},f83a:function(t,e,s){"use strict";var i=s("2b54"),a=s.n(i);a.a}}]);