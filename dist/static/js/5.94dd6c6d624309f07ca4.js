webpackJsonp([5],{Ydnl:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("3cXf"),i=s.n(a),n=s("gyMJ"),l={data:function(){return{mold:"",search:"",lawList:[],total:0,current:1,options:[],id:"",result:!1,source:"",loading:!0,svip:!1}},methods:{gainList:function(){var t=this;this.id=this.$route.query.id,this.source=this.$route.query.source,Object(n.f)({keyWord:this.search,comId:this.id,category:this.mold,pageNo:this.current,pageSize:20,province:this.source}).then(function(e){1==e.code&&(t.lawList=e.data,t.current=e.pageNum,t.total=e.total,0==t.lawList.length?t.result=!0:t.result=!1,t.loading=!1)})},toPer:function(t){var e={certNo:t.certNo,comId:t.comId,comName:t.comName,idCard:t.idCard,sex:t.sex,tabCode:t.tabCode,name:t.name,innerid:t.innerid,sealNo:t.sealNo};sessionStorage.setItem("peopleData",i()(e));var s=this.$router.resolve({path:"/personnel"}).href;window.open(s,"_blank")},jumpya:function(t){if("false"==localStorage.getItem("isvip"))this.svip=!0,this.modalHelper.afterOpen();else{var e={certNo:t.certNo,comId:t.comId,comName:t.comName,idCard:t.idCard,sex:t.sex,tabCode:t.tabCode,name:t.name,innerid:t.innerid,sealNo:t.sealNo};sessionStorage.setItem("peopleData",i()(e));var s=this.$router.resolve({path:"/personnel/escort"}).href;window.open(s,"_blank")}},closeload:function(t){this.svip=t.cur},Goto:function(t){this.current=t.cur,this.gainList(),this.funcom.toList(200)},gainCategory:function(){var t=this;i()({});Object(n.z)("/company/personCategory/"+this.id).then(function(e){1==e.code&&(t.options=e.data)})},newList:function(){this.current=1,this.gainList()}},watch:{$route:function(t,e){}},created:function(){this.gainList(),this.gainCategory()},components:{}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"law",attrs:{"element-loading-text":"拼命加载中"}},[a("div",{staticClass:"law-search"},[a("div",{staticClass:"left law-wei"},[t._v("\n\t\t\t注册人员（"+t._s(this.total)+"）\n\t\t")]),t._v(" "),a("div",{staticClass:"law-year left"},[a("el-select",{attrs:{clearable:"",placeholder:"选择注册类别"},on:{change:t.newList},model:{value:t.mold,callback:function(e){t.mold=e},expression:"mold"}},t._l(t.options,function(t){return a("el-option",{key:t.category,attrs:{label:t.category,value:t.category}})}),1)],1),t._v(" "),a("div",{staticClass:"right law-w"},[a("el-input",{attrs:{placeholder:"请输入人员姓名","suffix-icon":"el-icon-search"},on:{change:t.newList,keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.newList(e)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.result,expression:"!result"}]},[a("div",{staticClass:"law-list"},[t._m(0),t._v(" "),t._l(t.lawList,function(e,s){return a("div",{key:s,staticClass:"law-text",on:{click:function(s){return t.toPer(e)}}},[a("div",{staticClass:"left",staticStyle:{width:"52px"}},[t._v(t._s(20*(t.current-1)+(s+1)))]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"80px"}},[t._v(t._s(e.name))]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"140px"}},[t._v(t._s(e.category))]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"150px"}},[t._v(t._s(e.certNo))]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"160px"}},[t._v(t._s(e.major))]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"100px"}},[t._v(t._s(e.validDate))]),t._v(" "),a("div",{staticClass:"left law-cen",staticStyle:{width:"90px"}},[e.isUnder?a("div",{staticClass:"crew-btn",on:{click:function(s){return s.stopPropagation(),t.jumpya(e)}}},[t._v("\n\t\t\t\t\t\t押证\n\t\t\t\t\t")]):t._e()])])})],2),t._v(" "),a("div",{staticClass:"law-page"},[a("nav-page",{attrs:{all:t.total,currents:t.current},on:{skip:t.Goto}})],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.result,expression:"result"}],staticClass:"no-toast"},[a("img",{attrs:{src:s("9Fid"),alt:""}}),t._v(" "),a("span",[t._v("Sorry，暂未查询到该公司的人员信息")])]),t._v(" "),t.svip?a("f-vip",{on:{toChildEvent:t.closeload}}):t._e()],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"law-nav"},[s("div",{staticClass:"left",staticStyle:{width:"52px"}},[t._v("序号")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"80px"}},[t._v("姓名")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"140px"}},[t._v("注册类别")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"150px"}},[t._v("证书编号")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"160px"}},[t._v("专业")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"100px"}},[t._v("有效日期")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"90px"}})])}]};var r=s("C7Lr")(l,o,!1,function(t){s("hNpC")},null,null);e.default=r.exports},hNpC:function(t,e){}});
//# sourceMappingURL=5.94dd6c6d624309f07ca4.js.map