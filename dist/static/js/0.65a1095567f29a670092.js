webpackJsonp([0],{"/Ydp":function(t,i){},"8DJe":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("gyMJ"),s={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"information"},[e("div",{staticClass:"ic-basic"},[e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("法定代表人")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.legalPerson))])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("统一社会信用代码")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.creditCode))])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("注册资本")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.regisCapital))])]),t._v(" "),t.details.regisDate?e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("成立时间")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.regisDate))])]):t._e(),t._v(" "),t.details.businessStart&&t.details.businessEnd?e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("经营期限")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.businessStart)+"至"+t._s(t.details.businessEnd))])]):t._e(),t._v(" "),t.details.regisAuthority?e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("登记机关")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.regisAuthority))])]):t._e(),t._v(" "),t.details.comAddress?e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("企业地址")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.comAddress))])]):t._e(),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("\n            企业类型\n            ")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v("\n            "+t._s(t.details.comType)+"\n            ")])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("\n            安许证号\n            ")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v("\n            "+t._s(t.details.certNo)+"\n            ")])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("\n            安许期至\n            ")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v("\n            "+t._s(t.details.validDate)+"\n            ")])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left h-auto"},[t._v("\n            经营范围\n            ")]),t._v(" "),e("div",{staticClass:"left f-color min-h"},[t._v("\n            "+t._s(t.details.comRange)+"\n            ")])])])])},staticRenderFns:[]};var n=e("C7Lr")({name:"information",data:function(){return{}},watch:{},props:{details:{}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},s,!1,function(t){e("/Ydp")},"data-v-06a312ec",null).exports,l={name:"branch",data:function(){return{list:[],loading:!0,isajax:!1}},watch:{},inject:["reload"],props:{},beforeCreate:function(){},created:function(){this.getBranch()},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{getBranch:function(){var t=this,i=this,e={comId:this.$route.query.id};localStorage.getItem("permissions")&&""!=localStorage.getItem("permissions")?e.isVip=1:e.isVip=0,Object(a.a)(e).then(function(e){if(i.isajax=!0,1==e.code){t.list=e.data;var a=[];t.list.forEach(function(t){t.phone&&(a=t.phone.split(";"),t.phone=a[0],a=[])})}else i.$alert(e.data.msg)}).catch(function(t){i.isajax=!0,i.list=null})},recoldFn:function(){this.reload()}}},c={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"branch"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.isajax?[t.list&&t.list.length>0?t._l(t.list,function(i,a){return e("div",{key:a,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(a+1))]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[e("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.comName))])]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v(t._s(i.legalPerson))]),t._v(" "),e("div",{staticStyle:{width:"150px"}},[t._v(t._s(i.phone))]),t._v(" "),e("div",{staticStyle:{width:"250px"}},[t._v(t._s(i.comAddress))])])}):t.list&&0==t.list.length?[t._m(1)]:t.list?t._e():[t._m(2)]]:[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"min-height":"240px"},attrs:{"element-loading-text":"拼命加载中"}})]],2)])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"list-nav"},[e("div",{staticStyle:{width:"72px"}},[t._v("序号")]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v("企业名称")]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v("负责人")]),t._v(" "),e("div",{staticStyle:{width:"150px"}},[t._v("联系方式")]),t._v(" "),e("div",{staticStyle:{width:"250px"}},[t._v("地址")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"no-toast"},[i("img",{attrs:{src:e("9Fid"),alt:""}}),this._v(" "),i("span",[this._v("Sorry，该企业暂无分支机构信息")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"ajax-erroe"},[i("img",{attrs:{src:e("mXY1")}})])}]};var r=e("C7Lr")(l,c,!1,function(t){e("iidg")},"data-v-5e1ba9dc",null).exports,o=e("HzJ8"),d=e.n(o),v={name:"shareholder",data:function(){return{list:[],loading:!0,isajax:!1}},inject:["reload"],watch:{},props:{},beforeCreate:function(){},created:function(){this.getHolder()},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{recoldFn:function(){this.reload()},getHolder:function(){var t=this;this.$http({method:"post",url:"/gs/info",data:{comId:this.$route.query.id,paramter:"partner"}}).then(function(i){if(t.isajax=!0,1==i.data.code){var e=t.countScale(i.data.data),a=!0,s=!1,n=void 0;try{for(var l,c=d()(i.data.data);!(a=(l=c.next()).done);a=!0){var r=l.value;r.proportion=(r.liSubConAm/e*100).toFixed(2)+"%"}}catch(t){s=!0,n=t}finally{try{!a&&c.return&&c.return()}finally{if(s)throw n}}t.list=i.data.data}else t.$alert(i.data.msg)}).catch(function(i){t.isajax=!0,t.list=null})},countScale:function(t){var i=0,e=!0,a=!1,s=void 0;try{for(var n,l=d()(t);!(e=(n=l.next()).done);e=!0){i+=n.value.liSubConAm}}catch(t){a=!0,s=t}finally{try{!e&&l.return&&l.return()}finally{if(a)throw s}}return i}}},u={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"shareholder"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.isajax?[t.list&&t.list.length>0?t._l(t.list,function(i,a){return e("div",{key:a,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(a+1))]),t._v(" "),e("div",{staticStyle:{width:"calc((100% - 72px)/3)"}},[e("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.inv))])]),t._v(" "),e("div",{staticStyle:{width:"calc((100% - 72px)/3)"}},[isNaN(i.proportion)?[t._v("\n                            暂无信息\n                        ")]:[t._v("\n                            "+t._s(i.proportion)+"\n                        ")]],2),t._v(" "),e("div",{staticStyle:{width:"calc((100% - 72px)/3)"}},[i.liSubConAm?[t._v("\n                            "+t._s(i.liSubConAm)+"万元\n                        ")]:[t._v("\n                            暂无信息\n                        ")]],2)])}):t.list&&0==t.list.length?[t._m(1)]:t.list?t._e():[t._m(2)]]:[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"min-height":"240px"},attrs:{"element-loading-text":"拼命加载中"}})]],2)])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"list-nav"},[i("div",{staticStyle:{width:"72px"}},[this._v("序号")]),this._v(" "),i("div",{staticStyle:{width:"calc((100% - 72px)/3)"}},[this._v("股东")]),this._v(" "),i("div",{staticStyle:{width:"calc((100% - 72px)/3)"}},[this._v("持股比例")]),this._v(" "),i("div",{staticStyle:{width:"calc((100% - 72px)/3)"}},[this._v("认缴出资金额")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"no-toast"},[i("img",{attrs:{src:e("9Fid"),alt:""}}),this._v(" "),i("span",[this._v("Sorry，该企业暂无股东信息")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"ajax-erroe"},[i("img",{attrs:{src:e("mXY1")}})])}]};var h=e("C7Lr")(v,u,!1,function(t){e("n1eP")},"data-v-116b60c8",null).exports,_={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"changeRecord"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.isajax?[t.list&&t.list.length>0?t._l(t.list,function(i,a){return e("div",{key:a,staticClass:"list-co"},[e("div",{staticStyle:{width:"45px"}},[t._v(t._s(a+1))]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v(t._s(i.altItem_CN))]),t._v(" "),e("div",{staticStyle:{width:"288px"}},[t._v(t._s(i.altBe))]),t._v(" "),e("div",{staticStyle:{width:"288px"}},[t._v(t._s(i.altAf))]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v(t._s(t.formatDate(i.altDate)))])])}):t.list&&0==t.list.length?[t._m(1)]:t.list?t._e():[t._m(2)]]:[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"min-height":"240px"},attrs:{"element-loading-text":"拼命加载中"}})]],2)])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"list-nav"},[e("div",{staticStyle:{width:"45px"}},[t._v("序号")]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v("变更事项")]),t._v(" "),e("div",{staticStyle:{width:"275px"}},[t._v("变更前内容")]),t._v(" "),e("div",{staticStyle:{width:"275px"}},[t._v("变更后内容")]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v("变更日期")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"no-toast"},[i("img",{attrs:{src:e("9Fid"),alt:""}}),this._v(" "),i("span",[this._v("Sorry，该企业暂无变更记录信息")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"ajax-erroe"},[i("img",{attrs:{src:e("mXY1")}})])}]};var f=e("C7Lr")({name:"changeRecord",data:function(){return{list:[],loading:!0,isajax:!1}},watch:{},props:{},inject:["reload"],beforeCreate:function(){},created:function(){this.getChange()},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{recoldFn:function(){this.reload()},getChange:function(){var t=this;this.$http({method:"post",url:"/gs/info",data:{comId:this.$route.query.id,paramter:"changeRecord"}}).then(function(i){t.isajax=!0,1==i.data.code?t.list=i.data.data:t.$alert(i.data.msg)}).catch(function(i){t.isajax=!0,t.list=null})}}},_,!1,function(t){e("FJ9C")},"data-v-03653b38",null).exports,p={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"people"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.isajax?[t.list&&t.list.length>0?t._l(t.list,function(i,a){return e("div",{key:a,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(a+1))]),t._v(" "),e("div",[e("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.name))])]),t._v(" "),e("div",{staticClass:"position",domProps:{innerHTML:t._s(i.position_CN)}})])}):t.list&&0==t.list.length?[t._m(1)]:t.list?t._e():[t._m(2)]]:[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"min-height":"240px"},attrs:{"element-loading-text":"拼命加载中"}})]],2)])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"list-nav"},[i("div",{staticStyle:{width:"72px"}},[this._v("序号")]),this._v(" "),i("div",[this._v("姓名")]),this._v(" "),i("div",{staticStyle:{width:"200px"}},[this._v("职务")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"no-toast"},[i("img",{attrs:{src:e("9Fid"),alt:""}}),this._v(" "),i("span",[this._v("Sorry，该企业暂无人员信息")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"ajax-erroe"},[i("img",{attrs:{src:e("mXY1")}})])}]};var m=e("C7Lr")({name:"people",data:function(){return{list:[],loading:!0,isajax:!1}},watch:{},inject:["reload"],props:{},beforeCreate:function(){},created:function(){this.getPeople()},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{recoldFn:function(){this.reload()},getPeople:function(){var t=this;this.$http({method:"post",url:"/gs/info",data:{comId:this.$route.query.id,paramter:"personnel"}}).then(function(i){t.isajax=!0,1==i.data.code?t.list=i.data.data:t.$alert(i.data.msg)}).catch(function(i){t.isajax=!0,t.list=null})}}},p,!1,function(t){e("VKUB")},"data-v-191f9fe2",null).exports,g={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"popup"},[i("div",{staticClass:"pop"},[i("div",{staticClass:"title"},[i("i",{staticClass:"el-icon-close",on:{click:this.closeFn}})]),this._v(" "),i("div",{staticClass:"box"},[this.contentTxt?[this._v("\n                "+this._s(this.contentTxt)+"\n            ")]:[this._t("default")]],2)])])},staticRenderFns:[]};var x={name:"annualReport",data:function(){return{mask:!1,detail:"",list:[],loading:!0,isajax:!1}},watch:{},props:{},inject:["reload"],components:{"v-pop":e("C7Lr")({name:"popup",data:function(){return{isShow:!0}},watch:{},props:{contentTxt:{default:!1}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{closeFn:function(){this.$parent.mask=!1}}},g,!1,function(t){e("VmoV")},"data-v-c473c2e4",null).exports,"v-annual-detail":e("RklZ").a},computed:{},beforeCreate:function(){},created:function(){this.getYears()},mounted:function(){this.$nextTick(function(){})},methods:{seeDetail:function(t){var i=this;this.$http({method:"post",url:"/gs/report/detail",data:{comId:t.comId,years:t.years}}).then(function(t){1==t.data.code?(i.mask=!0,i.detail=t.data.data):i.$alert(t.data.msg)})},recoldFn:function(){this.reload()},getYears:function(){var t=this;this.$http({method:"post",url:"/gs/report/years",data:{comId:this.$route.query.id}}).then(function(i){t.isajax=!0,1==i.data.code?t.list=i.data.data:t.$alert(i.data.msg)}).catch(function(i){t.isajax=!0,t.list=null})}}},y={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"annualReport"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.isajax?[t.list&&t.list.length>0?t._l(t.list,function(i,a){return e("div",{key:a,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(a+1))]),t._v(" "),e("div",[t._v(t._s(i.years)+"年度报告")]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[e("span",{staticClass:"see-detail",on:{click:function(e){return t.seeDetail(i)}}},[t._v("查看详情")])])])}):t.list&&0==t.list.length?[t._m(1)]:t.list?t._e():[t._m(2)]]:[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"min-height":"240px"},attrs:{"element-loading-text":"拼命加载中"}})]],2),t._v(" "),t.mask?e("v-pop",[e("v-annual-detail",{attrs:{data:t.detail}})],1):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"list-nav"},[i("div",{staticStyle:{width:"72px"}},[this._v("序号")]),this._v(" "),i("div",[this._v("标题")]),this._v(" "),i("div",{staticStyle:{width:"200px"}},[this._v("操作")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"no-toast"},[i("img",{attrs:{src:e("9Fid"),alt:""}}),this._v(" "),i("span",[this._v("Sorry，该企业暂无年报信息")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"ajax-erroe"},[i("img",{attrs:{src:e("mXY1")}})])}]};var C={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"punish"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.isajax?[t.list&&t.list.length>0?t._l(t.list,function(i,a){return e("div",{key:a,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(a+1))]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[e("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.penDecNo))])]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v(t._s(i.illegActType))]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v(t._s(i.penContent))]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v(t._s(i.penAuth_CN))]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v(t._s(t.formatDate(i.penDecIssDate)))])])}):t.list&&0==t.list.length?[t._m(1)]:t.list?t._e():[t._m(2)]]:[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"min-height":"240px"},attrs:{"element-loading-text":"拼命加载中"}})]],2)])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"list-nav"},[e("div",{staticStyle:{width:"72px"}},[t._v("序号")]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v("决定书文号")]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v("违法行为类型")]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v("行政处罚内容")]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v("决定机关名称")]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v("处罚决定日期")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"no-toast"},[i("img",{attrs:{src:e("9Fid"),alt:""}}),this._v(" "),i("span",[this._v("Sorry，该企业暂无行政处罚信息")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"ajax-erroe"},[i("img",{attrs:{src:e("mXY1")}})])}]};var S={data:function(){return{inforData:{},id:"",navNum:0,navlist:[{name:"基本信息",length:0,isAjax:!0},{name:"分支机构",length:0,isAjax:!1},{name:"股东信息",length:0,isAjax:!1},{name:"主要人员",length:0,isAjax:!1},{name:"变更记录",length:0,isAjax:!1},{name:"企业年报",length:0,isAjax:!1},{name:"行政处罚",length:0,isAjax:!1}]}},watch:{},methods:{getLen:function(){var t=this;this.$http({method:"post",url:"/gs/count/company",data:{comId:this.id}}).then(function(i){t.navlist[1].length=i.data.data.branchCompany,t.navlist[2].length=i.data.data.partner,t.navlist[3].length=i.data.data.personnel,t.navlist[4].length=i.data.data.changeRecord,t.navlist[5].length=i.data.data.report,t.navlist[6].length=i.data.data.punish})},getInfor:function(){var t=this;this.id=this.$route.query.id,Object(a.z)("/company/"+this.id).then(function(i){1==i.code&&(t.inforData=i.data)})},navTapFn:function(t){this.navNum=t}},created:function(){this.getInfor(),this.getLen()},components:{"v-infor":n,"v-branch":r,"v-holder":h,"v-change":f,"v-people":m,"v-years":e("C7Lr")(x,y,!1,function(t){e("RnhR")},"data-v-63ad05c7",null).exports,"v-punish":e("C7Lr")({name:"punish",data:function(){return{list:[],loading:!0,isajax:!1}},watch:{},inject:["reload"],props:{},beforeCreate:function(){},created:function(){this.getPunish()},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{recoldFn:function(){this.reload()},getPunish:function(){var t=this;this.$http({method:"post",url:"/gs/info",data:{comId:this.$route.query.id,paramter:"punish"}}).then(function(i){t.isajax=!0,1==i.data.code?t.list=i.data.data:t.$alert(i.data.msg)}).catch(function(i){t.isajax=!0,t.list=null})}}},C,!1,function(t){e("sEgv")},"data-v-22d9fac7",null).exports}},w={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"icbc"},[e("div",{staticClass:"ic-nav"},t._l(t.navlist,function(i,a){return e("span",{key:a,staticClass:"navspan",class:{"ic-dark":t.navNum==a},on:{click:function(e){return t.navTapFn(a,i.isAjax)}}},[t._v("\r\n        "+t._s(i.name)+"\r\n        "),0!=i.length?[t._v("\r\n          ("),e("span",[t._v(t._s(i.length))]),t._v(")\r\n        ")]:t._e()],2)}),0),t._v(" "),0==t.navNum?[e("v-infor",{attrs:{details:t.inforData}})]:1==t.navNum?[e("v-branch")]:2==t.navNum?[e("v-holder")]:3==t.navNum?[e("v-people")]:4==t.navNum?[e("v-change")]:5==t.navNum?[e("v-years")]:6==t.navNum?[e("v-punish")]:t._e()],2)},staticRenderFns:[]};var b=e("C7Lr")(S,w,!1,function(t){e("h+UE")},"data-v-47440970",null);i.default=b.exports},FJ9C:function(t,i){},RnhR:function(t,i){},VKUB:function(t,i){},VmoV:function(t,i){},"h+UE":function(t,i){},iidg:function(t,i){},n1eP:function(t,i){},sEgv:function(t,i){}});
//# sourceMappingURL=0.65a1095567f29a670092.js.map