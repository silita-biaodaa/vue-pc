webpackJsonp([1],{"6vT6":function(t,a,i){"use strict";var e={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"popup"},[a("div",{staticClass:"pop"},[a("div",{staticClass:"title"},[a("i",{staticClass:"el-icon-close",on:{click:this.closeFn}})]),this._v(" "),a("div",{staticClass:"box"},[this.contentTxt?[this._v("\n                "+this._s(this.contentTxt)+"\n            ")]:[this._t("default")]],2)])])},staticRenderFns:[]};var n=i("C7Lr")({name:"popup",data:function(){return{isShow:!0}},watch:{},props:{contentTxt:{default:!1}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{closeFn:function(){this.$parent.mask=!1,this.modalHelper.beforeClose()}}},e,!1,function(t){i("m+EQ")},"data-v-52d8e081",null);a.a=n.exports},"NC+d":function(t,a){},PjOG:function(t,a){},W2hi:function(t,a){},cVqD:function(t,a){},eXt4:function(t,a){},iaZU:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"honor"},[i("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.data&&t.data.length>0?t._l(t.data,function(a,e){return i("div",{key:e,staticClass:"list-co"},[i("div",{staticStyle:{width:"72px"}},[t._v(t._s(e+1))]),t._v(" "),i("div",[i("span",[t._v(t._s(a.awardName))])]),t._v(" "),i("div",{staticStyle:{width:"150px"}},[t._v(t._s(a.issued))])])}):t.data&&0==t.data.length?[t._m(1)]:t._e()],2)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"list-nav"},[a("div",{staticStyle:{width:"72px"}},[this._v("序号")]),this._v(" "),a("div",[this._v("荣誉类别")]),this._v(" "),a("div",{staticStyle:{width:"150px"}},[this._v("评定时间")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"no-toast"},[a("img",{attrs:{src:i("9Fid"),alt:""}}),this._v(" "),a("span",[this._v("Sorry，暂未查询到该公司的企业荣誉")])])}]};var n=i("C7Lr")({name:"honor",data:function(){return{}},watch:{},props:{data:{default:""}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},e,!1,function(t){i("PjOG")},"data-v-b30e7254",null).exports,s=i("6vT6"),c={name:"prizeDetail",data:function(){return{}},watch:{},props:{data:{default:""}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{jumpCompany:function(t){if(!t.comId)return!1;var a=this.$router.resolve({path:"/introduce/icbc",query:{id:t.comId,name:t.comName}}).href;window.open(a,"_blank")}}},d={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"prizeDetail"},[i("h5",[t._v(t._s(t.data.projName))]),t._v(" "),i("div",{staticClass:"box"},[i("div",{staticClass:"item"},[i("span",[t._v("奖项名称：")]),t._v("\n            "+t._s(t.data.awardName)+"\n        ")]),t._v(" "),i("div",{staticClass:"item"},[i("span",[t._v("工程名称：")]),t._v("\n            "+t._s(t.data.projName)+"\n        ")]),t._v(" "),t.data.projType?i("div",{staticClass:"item"},[i("span",[t._v("项目类型：")]),t._v("\n            "+t._s(t.data.projType)+"\n        ")]):t._e(),t._v(" "),t.data.acreage?i("div",{staticClass:"item"},[i("span",[t._v("建筑面积（㎡）：")]),t._v("\n            "+t._s(t.data.acreage)+"\n        ")]):t._e(),t._v(" "),t.data.unitOrg&&t.data.unitOrg.length>0?i("div",{staticClass:"item"},[i("span",[t._v("单位名称：")]),t._v(" "),i("p",t._l(t.data.unitOrg,function(a,e){return i("span",{key:"1"+e,class:[a.comId?"a":""],on:{click:function(i){return t.jumpCompany(a)}}},[t._v(t._s(a.comName))])}),0)]):t._e(),t._v(" "),t.data.projManager?i("div",{staticClass:"item"},[i("span",[t._v("项目经理：")]),t._v("\n            "+t._s(t.data.projManager)+"\n        ")]):t._e(),t._v(" "),t.data.skillManager?i("div",{staticClass:"item"},[i("span",[t._v("技术负责人：")]),t._v("\n            "+t._s(t.data.skillManager)+"\n        ")]):t._e(),t._v(" "),t.data.qualityManager?i("div",{staticClass:"item"},[i("span",[t._v("质量负责人：")]),t._v("\n            "+t._s(t.data.qualityManager)+"\n        ")]):t._e(),t._v(" "),t.data.techQualManage?i("div",{staticClass:"item"},[i("span",[t._v("技术质量负责人：")]),t._v("\n            "+t._s(t.data.techQualManage)+"\n        ")]):t._e(),t._v(" "),t.data.buildOrg&&t.data.buildOrg.length>0?i("div",{staticClass:"item"},[i("span",[t._v("建设单位：")]),t._v(" "),i("p",t._l(t.data.buildOrg,function(a,e){return i("span",{key:"2"+e,class:[a.comId?"a":""],on:{click:function(i){return t.jumpCompany(a)}}},[t._v(t._s(a.comName))])}),0)]):t._e(),t._v(" "),t.data.superOrg&&t.data.superOrg.length>0?i("div",{staticClass:"item"},[i("span",[t._v("监理单位：")]),t._v(" "),i("p",t._l(t.data.superOrg,function(a,e){return i("span",{key:"3"+e,class:[a.comId?"a":""],on:{click:function(i){return t.jumpCompany(a)}}},[t._v(t._s(a.comName))])}),0)]):t._e(),t._v(" "),t.data.superPerson?i("div",{staticClass:"item"},[i("span",[t._v("总监理工程师：")]),t._v("\n            "+t._s(t.data.superPerson)+"\n        ")]):t._e(),t._v(" "),t.data.exploreOrg&&t.data.exploreOrg.length>0?i("div",{staticClass:"item"},[i("span",[t._v("勘察单位：")]),t._v(" "),i("p",t._l(t.data.exploreOrg,function(a,e){return i("span",{key:"4"+e,class:[a.comId?"a":""],on:{click:function(i){return t.jumpCompany(a)}}},[t._v(t._s(a.comName))])}),0)]):t._e(),t._v(" "),t.data.designOrg&&t.data.designOrg.length>0?i("div",{staticClass:"item"},[i("span",[t._v("设计单位：")]),t._v(" "),i("p",t._l(t.data.designOrg,function(a,e){return i("span",{key:"5"+e,class:[a.comId?"a":""],on:{click:function(i){return t.jumpCompany(a)}}},[t._v(t._s(a.comName))])}),0)]):t._e(),t._v(" "),t.data.checkOrg&&t.data.checkOrg.length>0?i("div",{staticClass:"item"},[i("span",[t._v("监督单位：")]),t._v(" "),i("p",t._l(t.data.checkOrg,function(a,e){return i("span",{key:"6"+e,class:[a.comId?"a":""],on:{click:function(i){return t.jumpCompany(a)}}},[t._v(t._s(a.comName))])}),0)]):t._e(),t._v(" "),t.data.joinOrg&&t.data.joinOrg.length>0?i("div",{staticClass:"item"},[i("span",[t._v("参建单位：")]),t._v(" "),i("p",t._l(t.data.joinOrg,function(a,e){return i("span",{key:"7"+e,class:[a.comId?"a":""],on:{click:function(i){return t.jumpCompany(a)}}},[t._v(t._s(a.comName))])}),0)]):t._e(),t._v(" "),t.data.remark?i("div",{staticClass:"item"},[i("span",[t._v("备注：")]),t._v("\n            "+t._s(t.data.remark)+"\n        ")]):t._e(),t._v(" "),t.data.pubOrg?i("div",{staticClass:"item"},[i("span",[t._v("发布单位：")]),t._v("\n            "+t._s(t.data.pubOrg)+"\n        ")]):t._e(),t._v(" "),i("div",{staticClass:"item"},[i("span",[t._v("发布日期：")]),t._v("\n            "+t._s(t.data.issued)+"\n        ")])])])},staticRenderFns:[]};var r=i("C7Lr")(c,d,!1,function(t){i("uMD9")},"data-v-50868bfe",null).exports,o={name:"prize",data:function(){return{mask:!1,detail:""}},watch:{},props:{data:{default:""}},components:{"v-pop":s.a,"v-prize-detail":r},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{seeDetail:function(t){if(!t.pkid)return!1;var a=this;this.$http({method:"post",url:"/reputation/detail",data:{pkid:t.pkid}}).then(function(t){1==t.data.code?(a.mask=!0,a.modalHelper.afterOpen(),a.detail=t.data.data):a.$alert(t.data.msg)})}}},v={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"prize"},[i("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.data&&t.data.length>0?t._l(t.data,function(a,e){return i("div",{key:e,staticClass:"list-co"},[i("div",{staticStyle:{width:"72px"}},[t._v(t._s(e+1))]),t._v(" "),i("div",{staticStyle:{width:"calc(100% - 372px)"}},[i("span",{staticStyle:{cursor:"pointer"},on:{click:function(i){return t.seeDetail(a)}}},[t._v(t._s(a.projName))])]),t._v(" "),i("div",{staticStyle:{width:"150px"}},[t._v(t._s(a.awardName))]),t._v(" "),i("div",{staticStyle:{width:"150px"}},[t._v(t._s(a.issued))])])}):t.data&&0==t.data.length?[t._m(1)]:t._e()],2),t._v(" "),t.mask?i("v-pop",[i("v-prize-detail",{attrs:{data:t.detail}})],1):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"list-nav"},[a("div",{staticStyle:{width:"72px"}},[this._v("序号")]),this._v(" "),a("div",{staticStyle:{width:"calc(100% - 372px)"}},[this._v("工程名称")]),this._v(" "),a("div",{staticStyle:{width:"150px"}},[this._v("奖项名称")]),this._v(" "),a("div",{staticStyle:{width:"150px"}},[this._v("获奖日期")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"no-toast"},[a("img",{attrs:{src:i("9Fid"),alt:""}}),this._v(" "),a("span",[this._v("Sorry，暂未查询到该公司的工程获奖")])])}]};var _={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"honor"},[i("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.data&&t.data.length>0?t._l(t.data,function(a,e){return i("div",{key:e,staticClass:"list-co"},[i("div",{staticStyle:{width:"72px"}},[t._v(t._s(e+1))]),t._v(" "),i("div",{staticStyle:{width:"175px"}},[i("span",[t._v(t._s(a.years))])]),t._v(" "),i("div",{staticStyle:{width:"175px"}},[i("span",[t._v(t._s(a.level))])]),t._v(" "),i("div",{staticStyle:{width:"175px"}},[i("span",[t._v(t._s(a.issueProvince))])]),t._v(" "),i("div",{staticStyle:{width:"175px"}},[t._v(t._s(a.regisAddress))])])}):t.data&&0==t.data.length?[t._m(1)]:t._e()],2)])},staticRenderFns:[function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"list-nav"},[i("div",{staticStyle:{width:"72px"}},[t._v("序号")]),t._v(" "),i("div",{staticStyle:{width:"175px"}},[t._v("评价年度")]),t._v(" "),i("div",{staticStyle:{width:"175px"}},[t._v("信用等级")]),t._v(" "),i("div",{staticStyle:{width:"175px"}},[t._v("评价省份")]),t._v(" "),i("div",{staticStyle:{width:"175px"}},[t._v("企业属地")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"no-toast"},[a("img",{attrs:{src:i("9Fid"),alt:""}}),this._v(" "),a("span",[this._v("Sorry，暂未查询到该公司的公路信用等级")])])}]};var l={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"honor"},[i("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.data&&t.data.length>0?t._l(t.data,function(a,e){return i("div",{key:e,staticClass:"list-co"},[i("div",{staticStyle:{width:"72px"}},[t._v(t._s(e+1))]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[i("span",[t._v(t._s(a.creditType))])]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[i("span",[t._v(t._s(a.years))])]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[i("span",[t._v(t._s(a.level))])]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[t._v(t._s(a.issued))]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[t._v(t._s(a.valied))])])}):t.data&&0==t.data.length?[t._m(1)]:t._e()],2)])},staticRenderFns:[function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"list-nav"},[i("div",{staticStyle:{width:"72px"}},[t._v("序号")]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[t._v("评价类型")]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[t._v("评价年度")]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[t._v("信用等级")]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[t._v("颁发日期")]),t._v(" "),i("div",{staticStyle:{width:"140px"}},[t._v("有效期至")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"no-toast"},[a("img",{attrs:{src:i("9Fid"),alt:""}}),this._v(" "),a("span",[this._v("Sorry，暂未查询到该公司的水利信用等级")])])}]};var u={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"prize"},[i("div",{staticClass:"ic-basic"},[t._m(0),t._v(" "),t.data&&t.data.length>0?t._l(t.data,function(a,e){return i("div",{key:e,staticClass:"list-co"},[i("div",{staticStyle:{width:"72px"}},[t._v(t._s(e+1))]),t._v(" "),i("div",{staticStyle:{width:"250px"}},[t._v(t._s(a.review))]),t._v(" "),i("div",{staticStyle:{width:"calc(100% - 472px)"}},[i("span",[t._v(t._s(a.projName))])]),t._v(" "),i("div",{staticStyle:{width:"150px"}},[t._v(t._s(a.issued))]),t._v(" "),i("div",{staticClass:"text-conent"},[t._v(t._s(a.remark))])])}):t.data&&0==t.data.length?[t._m(1)]:t._e()],2)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"list-nav"},[a("div",{staticStyle:{width:"72px"}},[this._v("序号")]),this._v(" "),a("div",{staticStyle:{width:"250px"}},[this._v("不良类型")]),this._v(" "),a("div",{staticStyle:{width:"calc(100% - 472px)"}},[this._v("项目名称")]),this._v(" "),a("div",{staticStyle:{width:"150px"}},[this._v("评定时间")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"no-toast"},[a("img",{attrs:{src:i("9Fid"),alt:""}}),this._v(" "),a("span",[this._v("Sorry，暂未查询到该公司的不良信息")])])}]};var p={data:function(){return{id:"",navNum:0,navlist:[{name:"企业荣誉",length:0,isAjax:!0},{name:"工程获奖",length:0,isAjax:!1},{name:"公路信用等级",length:0,isAjax:!1},{name:"水利信用等级",length:0,isAjax:!1},{name:"不良信息",length:0,isAjax:!1}],honorList:[],prizeList:[],highwayList:[],shuiliList:[],badList:[],isajax:!1,loading:!0}},watch:{},methods:{navTapFn:function(t){this.navNum=t},getData:function(){var t={comId:this.$route.query.id,source:this.$route.query.source,reqType:"PC"},a=this;this.$http({method:"post",url:"/reputation/new/company",data:t}).then(function(t){a.isajax=!0,1==t.data.code?(a.honorList=t.data.data.companyAwards,a.prizeList=t.data.data.projectAwards,a.highwayList=t.data.data.highway,a.shuiliList=t.data.data.shuili,a.badList=t.data.data.under):a.$alert(t.data.msg)}).catch(function(){a.isajax=!0})}},created:function(){this.getData()},components:{"v-honor":n,"v-prize":i("C7Lr")(o,v,!1,function(t){i("cVqD")},"data-v-1e35513c",null).exports,"v-highway":i("C7Lr")({name:"honor",data:function(){return{}},watch:{},props:{data:{default:""}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},_,!1,function(t){i("NC+d")},"data-v-15a5c124",null).exports,"v-water":i("C7Lr")({name:"honor",data:function(){return{}},watch:{},props:{data:{default:""}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},l,!1,function(t){i("eXt4")},"data-v-3144f2ba",null).exports,"v-bad":i("C7Lr")({name:"prize",data:function(){return{}},watch:{},props:{data:{default:""}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){this.$nextTick(function(){})},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},methods:{}},u,!1,function(t){i("W2hi")},"data-v-0841b20a",null).exports}},h={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"icbc"},[i("div",{staticClass:"ic-nav"},t._l(t.navlist,function(a,e){return i("span",{key:e,staticClass:"navspan",class:{"ic-dark":t.navNum==e},on:{click:function(i){return t.navTapFn(e,a.isAjax)}}},[t._v("\n\t\t\t"+t._s(a.name)+"\n\t\t\t"),0!=a.length?[t._v("\n\t\t\t\t("),i("span",[t._v(t._s(a.length))]),t._v(")\n\t\t\t")]:t._e()],2)}),0),t._v(" "),t.isajax?[0==t.navNum?[i("v-honor",{attrs:{data:t.honorList}})]:1==t.navNum?[i("v-prize",{attrs:{data:t.prizeList}})]:2==t.navNum?[i("v-highway",{attrs:{data:t.highwayList}})]:3==t.navNum?[i("v-water",{attrs:{data:t.shuiliList}})]:4==t.navNum?[i("v-bad",{attrs:{data:t.badList}})]:t._e()]:[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"min-height":"240px"},attrs:{"element-loading-text":"拼命加载中"}})]],2)},staticRenderFns:[]};var f=i("C7Lr")(p,h,!1,function(t){i("xpyB")},"data-v-5ce74443",null);a.default=f.exports},"m+EQ":function(t,a){},uMD9:function(t,a){},xpyB:function(t,a){}});
//# sourceMappingURL=1.a06c1b0ee8c2df5e7f2e.js.map