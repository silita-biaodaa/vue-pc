webpackJsonp([0],{"7fbP":function(t,i){},"8DJe":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("HzJ8"),n=e.n(s),a=e("gyMJ"),c={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"information"},[e("div",{staticClass:"ic-basic"},[e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("法定代表人")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.legalPerson))])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("统一社会信用代码")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.creditCode))])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("注册资本")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.regisCapital))])]),t._v(" "),t.details.regisDate?e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("成立时间")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.regisDate))])]):t._e(),t._v(" "),t.details.businessStart&&t.details.businessEnd?e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("经营期限")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.businessStart)+"至"+t._s(t.details.businessEnd))])]):t._e(),t._v(" "),t.details.regisAuthority?e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("登记机关")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.regisAuthority))])]):t._e(),t._v(" "),t.details.comAddress?e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("企业地址")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v(t._s(t.details.comAddress))])]):t._e(),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("\n            注册号\n            ")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v("\n            "+t._s(t.details.businessNum)+"\n            ")])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("\n            企业类型\n            ")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v("\n            "+t._s(t.details.economicType)+"\n            ")])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("\n            安许证号\n            ")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v("\n            "+t._s(t.details.certNo)+"\n            ")])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left line-f"},[t._v("\n            安许期至\n            ")]),t._v(" "),e("div",{staticClass:"left f-color line-r"},[t._v("\n            "+t._s(t.details.validDate)+"\n            ")])]),t._v(" "),e("div",{staticClass:"ic-line"},[e("div",{staticClass:"left h-auto"},[t._v("\n            经营范围\n            ")]),t._v(" "),e("div",{staticClass:"left f-color min-h"},[t._v("\n            "+t._s(t.details.comRange)+"\n            ")])])])])},staticRenderFns:[]};var o=e("C7Lr")({name:"information",data:function(){return{}},watch:{},props:{details:{}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},c,!1,function(t){e("7fbP")},"data-v-7f6ef421",null).exports,l={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"branch"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t._l(t.list,function(i,s){return e("div",{key:s,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(s+1))]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[e("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.comName))])]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v(t._s(i.legalPerson))]),t._v(" "),e("div",{staticStyle:{width:"150px"}},[t._v(t._s(i.phone))]),t._v(" "),e("div",{staticStyle:{width:"250px"}},[t._v(t._s(i.comAddress))])])})],2)])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"list-nav"},[e("div",{staticStyle:{width:"72px"}},[t._v("序号")]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v("企业名称")]),t._v(" "),e("div",{staticStyle:{width:"100px"}},[t._v("负责人")]),t._v(" "),e("div",{staticStyle:{width:"150px"}},[t._v("联系方式")]),t._v(" "),e("div",{staticStyle:{width:"250px"}},[t._v("地址")])])}]};var r=e("C7Lr")({name:"branch",data:function(){return{}},watch:{},props:{list:{}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},l,!1,function(t){e("d9te")},"data-v-9bb98c40",null).exports,d={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"shareholder"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t._l(t.list,function(i,s){return e("div",{key:s,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(s+1))]),t._v(" "),e("div",[e("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.inv))])]),t._v(" "),e("div",[t._v(t._s(i.proportion))]),t._v(" "),e("div",{staticStyle:{width:"150px"}},[t._v(t._s(i.liSubConAm)+"万元")])])})],2)])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"list-nav"},[i("div",{staticStyle:{width:"72px"}},[this._v("序号")]),this._v(" "),i("div",[this._v("股东")]),this._v(" "),i("div",[this._v("持股比例")]),this._v(" "),i("div",{staticStyle:{width:"150px"}},[this._v("认缴出资金额")])])}]};var v=e("C7Lr")({name:"shareholder",data:function(){return{}},watch:{},props:{list:{}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},d,!1,function(t){e("Pxsj")},"data-v-42be88ae",null).exports,f={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"changeRecord"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t._l(t.list,function(i,s){return e("div",{key:s,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(s+1))]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[e("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.altItem_CN))])]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v(t._s(i.altBe))]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v(t._s(i.altAf))]),t._v(" "),e("div",{staticStyle:{width:"150px"}},[t._v(t._s(t.formatDate(i.altDate)))])])})],2)])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"list-nav"},[e("div",{staticStyle:{width:"72px"}},[t._v("序号")]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v("变更事项")]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v("变更前内容")]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[t._v("变更后内容")]),t._v(" "),e("div",{staticStyle:{width:"150px"}},[t._v("变更日期")])])}]};var u=e("C7Lr")({name:"changeRecord",data:function(){return{}},watch:{},props:{list:{}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},f,!1,function(t){e("t8fG")},"data-v-0aad9ba2",null).exports,_={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"people"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t._l(t.list,function(i,s){return e("div",{key:s,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(s+1))]),t._v(" "),e("div",[e("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.name))])]),t._v(" "),e("div",{staticClass:"position",domProps:{innerHTML:t._s(i.position_CN)}})])})],2)])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"list-nav"},[i("div",{staticStyle:{width:"72px"}},[this._v("序号")]),this._v(" "),i("div",[this._v("姓名")]),this._v(" "),i("div",{staticStyle:{width:"200px"}},[this._v("职务")])])}]};var h=e("C7Lr")({name:"people",data:function(){return{}},watch:{},props:{list:{}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},_,!1,function(t){e("YTwC")},"data-v-3fb82f39",null).exports,p={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"popup"},[i("div",{staticClass:"pop"},[i("div",{staticClass:"title"},[i("i",{staticClass:"el-icon-close",on:{click:this.closeFn}})]),this._v(" "),i("div",{staticClass:"box"},[this.contentDom?[this._v("\n                "+this._s(this.contentTxt)+"\n            ")]:[this._t("default")]],2)])])},staticRenderFns:[]};var m={name:"annualReport",data:function(){return{mask:!1}},watch:{},props:{list:{}},components:{"v-pop":e("C7Lr")({name:"popup",data:function(){return{isShow:!0}},watch:{},props:{contentTxt:{default:!1}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{closeFn:function(){this.$parent.mask=!1}}},p,!1,function(t){e("HOe9")},"data-v-78631508",null).exports,"v-annual-detail":e("RklZ").a},beforeCreate:function(){},created:function(){},mounted:function(){this.$nextTick(function(){})},methods:{seeDetail:function(t){var i=this;this.$http({method:"post",url:"/gs/report/detail",data:{comId:t.comId,years:t.years}}).then(function(t){1==t.data.code?console.log(t.data):i.$alert(t.data.msg)}),i.mask=!0}}},C={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"annualReport"},[e("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t._l(t.list,function(i,s){return e("div",{key:s,staticClass:"list-co"},[e("div",{staticStyle:{width:"72px"}},[t._v(t._s(s+1))]),t._v(" "),e("div",[t._v(t._s(i.years)+"年度报告")]),t._v(" "),e("div",{staticStyle:{width:"200px"}},[e("span",{staticStyle:{color:"#FE6603",cursor:"pointer"},on:{click:function(e){return t.seeDetail(i)}}},[t._v("查看详情")])])])})],2),t._v(" "),t.mask?e("v-pop",[e("v-annual-detail")],1):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"list-nav"},[i("div",{staticStyle:{width:"72px"}},[this._v("序号")]),this._v(" "),i("div",[this._v("标题")]),this._v(" "),i("div",{staticStyle:{width:"200px"}},[this._v("操作")])])}]};var y={data:function(){return{inforData:{},branchList:[],holderList:[],peopleList:[],changeList:[],yearsList:[],id:"",navNum:0,navlist:[{name:"基本信息",length:0,isAjax:!0},{name:"分支机构",length:0,isAjax:!1},{name:"股东信息",length:0,isAjax:!1},{name:"主要人员",length:0,isAjax:!1},{name:"变更记录",length:0,isAjax:!1},{name:"企业年报",length:0,isAjax:!1},{name:"行政处罚",length:0,isAjax:!1}]}},watch:{},methods:{getInfor:function(){var t=this;this.id=this.$route.query.id,Object(a.z)("/company/"+this.id).then(function(i){1==i.code&&(t.inforData=i.data)})},getBranch:function(){var t=this;Object(a.a)({comId:this.id}).then(function(i){if(that.navlist[1].isAjax=!0,1==i.code){t.branchList=i.data;var e=[];t.branchList.forEach(function(i){i.phone&&(e=i.phone.split(";"),""==localStorage.getItem("permissions")||-1==localStorage.getItem("permissions").indexOf("comPhone")?i.phone=t.resetPhone(e[0]):i.phone=e[0],e=[])}),t.navlist[1].length=i.data.length}})},getHolder:function(){var t=this;this.$http({method:"post",url:"/gs/info",data:{comId:this.id,paramter:"partner"}}).then(function(i){if(t.navlist[2].isAjax=!0,1==i.data.code){var e=t.countScale(i.data.data),s=!0,a=!1,c=void 0;try{for(var o,l=n()(i.data.data);!(s=(o=l.next()).done);s=!0){var r=o.value;r.proportion=(r.liSubConAm/e*100).toFixed(2)+"%"}}catch(t){a=!0,c=t}finally{try{!s&&l.return&&l.return()}finally{if(a)throw c}}t.holderList=i.data.data}else t.$alert(i.data.msg)})},getPeople:function(){var t=this;this.$http({method:"post",url:"/gs/info",data:{comId:this.id,paramter:"personnel"}}).then(function(i){t.navlist[3].isAjax=!0,1==i.data.code?t.peopleList=i.data.data:t.$alert(i.data.msg)})},getChange:function(){var t=this;this.$http({method:"post",url:"/gs/info",data:{comId:this.id,paramter:"change_record"}}).then(function(i){t.navlist[4].isAjax=!0,1==i.data.code?t.changeList=i.data.data:t.$alert(i.data.msg)})},getYears:function(){var t=this;this.$http({method:"post",url:"/gs/report/years",data:{comId:this.id}}).then(function(i){t.navlist[5].isAjax=!0,1==i.data.code?t.yearsList=i.data.data:t.$alert(i.data.msg)})},countScale:function(t){var i=0,e=!0,s=!1,a=void 0;try{for(var c,o=n()(t);!(e=(c=o.next()).done);e=!0){i+=c.value.liSubConAm}}catch(t){s=!0,a=t}finally{try{!e&&o.return&&o.return()}finally{if(s)throw a}}return i},resetPhone:function(t){var i=String(t),e=i.length;if(e>=7){var s=i.slice(-7,-3);return i.replace(s,"****")}if(e<7&&e>=6){s=i.slice(-4,-2);return i.replace(s,"**")}},navTapFn:function(t,i){i&&(this.navNum=t)}},created:function(){this.getInfor(),this.getBranch(),this.getHolder(),this.getPeople(),this.getChange(),this.getYears()},components:{"v-infor":o,"v-branch":r,"v-holder":v,"v-change":u,"v-people":h,"v-years":e("C7Lr")(m,C,!1,function(t){e("9V/F")},"data-v-0cd3487f",null).exports}},x={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"icbc"},[e("div",{staticClass:"ic-nav"},t._l(t.navlist,function(i,s){return e("span",{key:s,staticClass:"navspan",class:{"ic-dark":t.navNum==s,loading:!i.isAjax},on:{click:function(e){return t.navTapFn(s,i.isAjax)}}},[t._v("\r\n        "+t._s(i.name)+"\r\n        "),0!=i.length?[t._v("\r\n          ("),e("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.length))]),t._v(")\r\n        ")]:t._e()],2)}),0),t._v(" "),0==t.navNum?[e("v-infor",{attrs:{details:t.inforData}})]:1==t.navNum?[e("v-branch",{attrs:{list:t.branchList}})]:2==t.navNum?[e("v-holder",{attrs:{list:t.holderList}})]:3==t.navNum?[e("v-people",{attrs:{list:t.peopleList}})]:4==t.navNum?[e("v-change",{attrs:{list:t.changeList}})]:5==t.navNum?[e("v-years",{attrs:{list:t.yearsList}})]:6==t.navNum?void 0:t._e()],2)},staticRenderFns:[]};var b=e("C7Lr")(y,x,!1,function(t){e("dldo")},"data-v-26463334",null);i.default=b.exports},"9V/F":function(t,i){},HOe9:function(t,i){},Pxsj:function(t,i){},YTwC:function(t,i){},d9te:function(t,i){},dldo:function(t,i){},t8fG:function(t,i){}});
//# sourceMappingURL=0.e461cf3c0a1dca74cb0b.js.map