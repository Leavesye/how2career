(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4871c11d"],{5594:function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticStyle:{padding:"30px"}},[a("section",{staticClass:"flex"},[a("el-card",{staticClass:"card-l"},[a("div",{staticClass:"title",staticStyle:{"margin-bottom":"40px"}},[t._v("咨询者")]),a("avatar")],1),a("el-card",{staticClass:"card-c"},[a("p",{staticClass:"title"},[t._v("咨询问题")]),a("p",{staticClass:"question"},[t._v("阿里P10对技术架构要求是什么?")]),a("p",{staticClass:"question"},[t._v("阿里P10对技术架构要求是什么?")]),a("p",{staticClass:"question"},[t._v("阿里P10对技术架构要求是什么?")]),a("p",{staticClass:"question"},[t._v("阿里P10对技术架构要求是什么?")]),a("p",{staticClass:"question"},[t._v("阿里P10对技术架构要求是什么?")]),a("p",{staticClass:"question"},[t._v("阿里P10对技术架构要求是什么?")]),a("p",{staticClass:"question"},[t._v("阿里P10对技术架构要求是什么?")])]),a("el-card",{staticClass:"card-r"},[a("p",{staticClass:"title",staticStyle:{"margin-bottom":"28px"}},[t._v("咨询开始时间")]),a("p",[t._v("北京时间")]),a("p",[t._v("10月10日 20:00 ~ 21:00")]),a("p",{staticClass:"ques-status"},[t._v("咨询中")]),a("count-down")],1)],1),a("el-card",{staticClass:"detail-card"},[a("el-tabs",{model:{value:t.activeName,callback:function(s){t.activeName=s},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"first"}},[a("div",{staticClass:"d-item"},[a("section",{staticClass:"flex-hb",staticStyle:{width:"300px"}},[a("div",[a("p",{staticClass:"field-name"},[t._v("姓名")]),a("p",[t._v("马里奥")])]),a("div",[a("p",{staticClass:"field-name"},[t._v("性别")]),a("p",[t._v("男")])]),a("div",[a("p",{staticClass:"field-name"},[t._v("出生年月")]),a("p",[t._v("1998-01-10")])])])]),a("div",{staticClass:"d-item"},[a("p",{staticClass:"field-name"},[t._v("最高学历")]),a("p",[t._v("中央民族大学 计算机科学 硕士")])]),a("div",{staticClass:"d-item"},[a("p",{staticClass:"field-name"},[t._v("自我评价")]),a("p",[t._v("知乎盐选会员，是付费内容服务和用户体验的一次升级，旨在让知友们花的时间更值得。")])]),a("div",{staticClass:"d-item"},[a("p",{staticClass:"field-name"},[t._v("评价介绍")]),a("p",[t._v("知乎盐选会员，是付费内容服务和用户体验的一次升级，旨在让知友们花的时间更值得。盐选会员不仅可以为广大知友提社区功能权益、身份权益以及内容权益等多重福利；还能在社区问答的原生体验中，便捷地获得优质付费内容；完善的「盐选」机制，也能提升知友们获得好内容的效率。 可以在「我的」页面，点击「开通盐选会员」进行盐选会员的开通。目前 iOS 用户支持应用内购买，安卓用户支持微信支付。")])])]),a("el-tab-pane",{attrs:{label:"学历信息",name:"second"}},[a("div",{staticClass:"d-item"},[a("p",{staticClass:"field-name"},[t._v("最高学历")]),a("p",[t._v("中央民族大学 计算机科学 硕士")])]),a("div",{staticClass:"d-item"},[a("p",{staticClass:"field-name"},[t._v("前学历")]),a("p",[t._v("中国清华大学 电子工程 硕士")])]),a("div",{staticClass:"d-item"},[a("p",{staticClass:"field-name"},[t._v("前学历")]),a("p",[t._v("中国清华大学 电子工程 硕士")])])]),a("el-tab-pane",{attrs:{label:"社会实践",name:"third"}},[t._v("社会实践")]),a("el-tab-pane",{attrs:{label:"其他信息",name:"fourth"}},[t._v("其他信息")])],1)],1),a("room-status",{attrs:{isShow:t.isShow},on:{close:t.handleCloseModal}})],1)},e=[],n=a("77c0"),c=a("8b5c"),l=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("el-dialog",{attrs:{"show-close":!1,title:t.isWait?"房间状态":"咨询开始",visible:t.isShow,width:"530px",center:""},on:{"update:visible":function(s){t.isShow=s}}},[a("section",{staticClass:"modal-main"},[t.isWait?a("div",[a("div",{staticClass:"flex-hc"},[a("avatar")],1),a("div",{staticClass:"flex-hbc",staticStyle:{"margin-top":"40px","margin-bottom":"20px"}},[a("div",{staticClass:"line"}),a("p",[t._v("距离结束还有")]),a("div",{staticClass:"line"})]),a("count-down",{attrs:{bg:"#7C8FA5"}})],1):a("div",{staticClass:"progress-box"},[a("el-progress",{staticStyle:{position:"relative"},attrs:{"show-text":!1,width:250,color:"#36AE82",type:"circle",percentage:t.percent}}),t._l(t.nums,(function(s,i){return a("div",{key:i,staticClass:"number",class:[s.ani]},[t._v(t._s(s.v))])}))],2)]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})])},o=[],r=(a("4160"),a("159b"),{name:"room-status",components:{Avatar:n["a"],CountDown:c["a"]},props:["isShow"],data:function(){return{isWait:!1,percent:0,nums:[{v:"3",ani:""},{v:"2",ani:""},{v:"1",ani:""}]}},methods:{go:function(){var t=this;this.nums.forEach((function(s,a){var i=a;setTimeout((function(){s.ani="animate",t.percent+=100/3,2==i&&setTimeout((function(){return t.$emit("close")}),500)}),1e3*i)}))}},watch:{isShow:function(t,s){console.log(t,s),t?this.go():(this.nums=[{v:"3",ani:""},{v:"2",ani:""},{v:"1",ani:""}],this.percent=0)}}}),v=r,d=(a("e030"),a("2877")),p=Object(d["a"])(v,l,o,!1,null,"7f9fc93c",null),u=p.exports,m={name:"room",components:{Avatar:n["a"],CountDown:c["a"],RoomStatus:u},data:function(){return{isShow:!1,activeName:"first"}},methods:{handleCloseModal:function(){this.isShow=!1}},mounted:function(){}},C=m,f=(a("e5c8"),Object(d["a"])(C,i,e,!1,null,"09f2114c",null));s["default"]=f.exports},"8c67":function(t,s,a){},c21e:function(t,s,a){},e030:function(t,s,a){"use strict";var i=a("8c67"),e=a.n(i);e.a},e5c8:function(t,s,a){"use strict";var i=a("c21e"),e=a.n(i);e.a}}]);