(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b8233006"],{3250:function(t,e,a){"use strict";var n=a("32dd"),i=a.n(n);i.a},"32dd":function(t,e,a){},a434:function(t,e,a){"use strict";var n=a("23e7"),i=a("23cb"),s=a("a691"),c=a("50c4"),o=a("7b0b"),r=a("65f0"),l=a("8418"),u=a("1dde"),f=a("ae40"),d=u("splice"),m=f("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,p=Math.min,v=9007199254740991,b="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!d||!m},{splice:function(t,e){var a,n,u,f,d,m,y=o(this),C=c(y.length),g=i(t,C),k=arguments.length;if(0===k?a=n=0:1===k?(a=0,n=C-g):(a=k-2,n=p(h(s(e),0),C-g)),C+a-n>v)throw TypeError(b);for(u=r(y,n),f=0;f<n;f++)d=g+f,d in y&&l(u,f,y[d]);if(u.length=n,a<n){for(f=g;f<C-n;f++)d=f+n,m=f+a,d in y?y[m]=y[d]:delete y[m];for(f=C;f>C-n+a;f--)delete y[f-1]}else if(a>n)for(f=C-n;f>g;f--)d=f+n-1,m=f+a-1,d in y?y[m]=y[d]:delete y[m];for(f=0;f<a;f++)y[f+g]=arguments[f+2];return y.length=C-n+a,u}})},aaa9:function(t,e,a){},b0c0:function(t,e,a){var n=a("83ab"),i=a("9bf2").f,s=Function.prototype,c=s.toString,o=/^\s*function ([^ (]*)/,r="name";n&&!(r in s)&&i(s,r,{configurable:!0,get:function(){try{return c.call(this).match(o)[1]}catch(t){return""}}})},ccae:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",{staticClass:"page-title flex-hbc"},[a("span",[t._v("订单确认")]),a("el-button",{attrs:{plain:"",size:"mini",icon:"el-icon-arrow-left"},on:{click:t.goBack}},[t._v("返回")])],1),a("section",{staticClass:"card-box"},[a("el-card",[a("div",{staticClass:"flex-hb conform-info"},[a("div",{staticClass:"content-l"},[a("avatar",{attrs:{imgUrl:t.info.avatarImage}}),a("p",{staticClass:"name"},[t._v(t._s(t.info.nickName))]),a("el-rate",{staticClass:"user-rate",attrs:{disabled:""},model:{value:t.info.rate,callback:function(e){t.$set(t.info,"rate",e)},expression:"info.rate"}})],1),a("div",{staticClass:"content-r"},[a("div",{staticClass:"flex base-info"},[a("span",[t._v("所属行业: "+t._s(t.info.industry))]),a("span",[t._v("公司名称: "+t._s(t.info.company))]),a("span",[t._v("职位: "+t._s(t.info.position))])]),a("h1",{staticClass:"time-title"},[t._v("候选预约时间")]),a("ul",{staticClass:"book-times flex-hb"},t._l(t.info.times,(function(e,n){return a("li",{key:n},[t._v(" "+t._s(e)+" "),a("i",{staticClass:"el-icon-error",on:{click:t.handleDelTime}})])})),0),t.user.completion<100?a("p",{staticClass:"degree"},[t._v("你的个人信息完整度是"+t._s(t.user.completion)+"%,建议完善个人信息让咨询师提供更为针对性的建议 "),a("el-link",{attrs:{type:"success"},on:{click:t.toPerfect}},[t._v("完善信息")])],1):t._e()])]),a("div",{staticClass:"flex-hec cost-box"},[a("span",{staticClass:"cost-item",staticStyle:{"margin-right":"20px"}},[t._v("咨询费用")]),a("div",{staticClass:"confirm-num"},[t._v(t._s(t.info.price))]),a("div",{staticClass:"unit"},[t._v("RMB")])]),a("div",{staticClass:"flex-hec terms"},[a("el-checkbox",{staticClass:"check-box",model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v("我已阅读条款 点击 "),a("el-link",{attrs:{type:"success"}},[t._v("了解规则")])],1),a("el-button",{attrs:{type:"success",size:"small"},on:{click:t.handleClickPay}},[t._v("确认付款")])],1)])],1),a("pay",{attrs:{isShow:t.isShowPay},on:{close:t.handleClosePay,confirm:t.handleConfirmPay}})],1)},i=[],s=(a("99af"),a("d81d"),a("a434"),a("b0c0"),a("96cf"),a("1da1")),c=a("5530"),o=a("77c0"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"选择支付方式",visible:t.isShow,"before-close":t.handleClose,width:"430px",s:"",center:""},on:{"update:visible":function(e){t.isShow=e}}},[a("section",{staticClass:"modal-main"},[a("ul",{staticClass:"flex-hb pay-list"},t._l(t.pays,(function(e,n){return a("li",{key:n,staticClass:"flex-cc",class:{active:t.curPay===n},on:{click:function(a){return t.handleClickPay(e,n)}}},[a("el-image",{staticClass:"pay-img",attrs:{src:e.img}})],1)})),0)]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticStyle:{width:"180px"},attrs:{type:"success",plain:"",round:""},on:{click:t.handleConfirm}},[t._v("确认")])],1)])},l=[],u={name:"pays",components:{},props:["isShow"],data:function(){return{curPay:"",pays:[{img:""},{img:""},{img:""}]}},methods:{handleClickPay:function(t,e){this.curPay=e},handleConfirm:function(){this.$emit("confirm")},handleClose:function(){this.$emit("close")}}},f=u,d=(a("dd9b"),a("2877")),m=Object(d["a"])(f,r,l,!1,null,"70e9d9c6",null),h=m.exports,p=a("c1df"),v=a.n(p),b=a("2f62"),y=a("f8b7"),C={components:{Avatar:o["a"],Pay:h},data:function(){return{info:{},isShow:!1,checked:!1,isShowPay:!1}},computed:Object(c["a"])({},Object(b["b"])(["user"])),created:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n,i,s,c,o,r,l,u,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.loading(),e.next=3,Object(y["e"])({orderId:t.$route.params.id}).catch((function(t){return a.close()}));case 3:n=e.sent,n.result&&(i=n.msg.consultant,s=i.avatar,c=i.name,o=i.work,r=o.industry,l=o.company,u=o.position,f=i.evaluationPoint>0?i.evaluationPoint/i.evaluationCount:0,t.info={avatarImage:s,nickName:c,rate:f,industry:r,company:l,position:u,times:n.msg.consumerTime.map((function(t){return"".concat(v()(t).format("YYYY-MM-DD")," ").concat(v()(t).format("HH:mm:ss"),"-").concat(v()(t).subtract(-90,"minutes").format("HH:mm:ss"))})),price:n.msg.price}),a.close();case 6:case"end":return e.stop()}}),e)})))()},methods:{handleDelTime:function(t){if(1==this.info.times.length)return!1;this.info.times.splice(t,1)},handleClickPay:function(){if(!this.checked)return this.alert("请先阅读条款","warning"),!1;this.isShowPay=!0},handleClosePay:function(){this.isShowPay=!1},handleConfirmPay:function(){this.isShowPay=!1},goBack:function(){this.$router.go(-1)},toPerfect:function(){this.$router.push("/consumer/perfect")}},mounted:function(){}},g=C,k=(a("3250"),Object(d["a"])(g,n,i,!1,null,"e7d5d13c",null));e["default"]=k.exports},d81d:function(t,e,a){"use strict";var n=a("23e7"),i=a("b727").map,s=a("1dde"),c=a("ae40"),o=s("map"),r=c("map");n({target:"Array",proto:!0,forced:!o||!r},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},dd9b:function(t,e,a){"use strict";var n=a("aaa9"),i=a.n(n);i.a}}]);