(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c668bf1"],{"32c3":function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("section",[t("h1",{staticClass:"page-title"},[e._v("消息通知")]),t("div",{staticClass:"table-box"},[t("quick-table",{attrs:{table:e.table}}),t("div",{staticClass:"flex-he",staticStyle:{"margin-top":"20px"}},[t("el-pagination",e._g(e._b({ref:"pagination",attrs:{id:"pagin","page-sizes":e.pagination.pageSizes||[10,20,30,40],total:e.pagination.total,"current-page":e.pagination.pageIndex,"page-size":e.pagination.pageSize,layout:"prev, pager, next",background:"",small:""}},"el-pagination",e.pagination.props,!1),e.pagination.events))],1)],1),t("detail-modal",{attrs:{isShow:e.isShow,item:e.item},on:{close:e.handleClose}})],1)},n=[],c=(t("d81d"),t("96cf"),t("1da1")),i=t("c1df"),o=t.n(i),r=t("24f6"),l=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("el-dialog",{attrs:{title:"消息通知",visible:e.isShow,"before-close":e.handleClose,width:"630px",center:""},on:{"update:visible":function(s){e.isShow=s}}},[t("section",{staticClass:"modal-main"},[t("div",{staticClass:"flex-hb",staticStyle:{"margin-bottom":"14px"}},[t("p",[e._v(e._s(e.item.title))]),t("div",[e._v(e._s(e.item.cTime))])]),t("p",[e._v(e._s(e.item.content))])]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"success"},on:{click:e.handleClose}},[e._v("关闭")])],1)])},j=[],b={props:["isShow","item"],data:function(){return{}},methods:{handleClose:function(){this.$emit("close")}}},f=b,d=(t("68b8"),t("2877")),u=Object(d["a"])(f,l,j,!1,null,"278903be",null),p=u.exports,h=t("c24f"),m={components:{QuickTable:r["a"],DetailModal:p},data:function(){this.$createElement;var e=this.handleOpen;return{isShow:!1,item:{},table:{data:[],columns:[{label:"发送时间",prop:"cTime"},{label:"标题",prop:"title"},{label:"内容",prop:"content"},{label:"操作",prop:"",render:function(s,t){return s("el-button",{attrs:{plain:!0},on:{click:function(){return e(t.row)}}},["详情"])}}],props:{headerCellStyle:{background:"#EDEEEF",fontSize:"14px!important",color:"#7C8FA5!important",fontWeight:"200"},cellStyle:{fontSize:"14px!important",color:"#7C8FA5!important"}}},pagination:{total:0,pageIndex:1,pageSize:10,events:{"current-change":this.handlePageChange,"size-change":this.handlePageSizeChange},props:{}}}},created:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:e.query();case 1:case"end":return s.stop()}}),s)})))()},methods:{query:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function s(){var t,a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return t=e.loading(),s.next=3,Object(h["g"])({from:0,to:2601444690,page:0,limit:10}).catch((function(e){return t.close}));case 3:a=s.sent,a.result&&(e.pagination.total=a.msg.count,e.table.data=a.msg.list.map((function(e){return{cTime:o()(1e3*e.cTime).format("YYYY-MM-DD HH:mm:ss"),title:e.title,content:e.content}}))),t.close();case 6:case"end":return s.stop()}}),s)})))()},handlePageChange:function(e){this.pagination.pageIndex=e,this.query()},handlePageSizeChange:function(e){this.pagination.pageSize=e,this.query()},handleClose:function(){this.isShow=!1},handleOpen:function(e){this.isShow=!0,this.item=e}}},g=m,v=(t("c47f"),Object(d["a"])(g,a,n,!1,null,"05001b82",null));s["default"]=v.exports},4678:function(e,s,t){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df48","./fa.js":"8df48","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b46","./gd.js":"f6b46","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var s=c(e);return t(s)}function c(e){if(!t.o(a,e)){var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=c,e.exports=n,n.id="4678"},"61eb":function(e,s,t){},"68b8":function(e,s,t){"use strict";var a=t("61eb"),n=t.n(a);n.a},c47f:function(e,s,t){"use strict";var a=t("d019"),n=t.n(a);n.a},d019:function(e,s,t){}}]);