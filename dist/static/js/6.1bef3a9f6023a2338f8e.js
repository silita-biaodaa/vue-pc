webpackJsonp([6],{"2HZ9":function(t,s,v){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var _=v("MJLE"),a=v.n(_),i=v("gyMJ"),e={data:function(){return{list:[],showPop:!1,phone:"",currentData:"",isload:!0,orderNo:"",t:null}},filters:{},methods:{closeFn:function(){this.isload=!0,this.showPop=!1;clearTimeout(this.t)},goOpen:function(t){var s=this;if(!sessionStorage.getItem("xtoken")&&!localStorage.getItem("Xtoken"))return this.$confirm("暂无权限，请先登录","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){s.$router.push("/logo")}).catch(function(){}),!1;this.showPop=!0,this.currentData=this.list[t],Object(i.U)({channel:"1003",userId:sessionStorage.getItem("ip"),stdCode:this.currentData.stdCode,tradeType:"NATIVE"}).then(function(t){if(1==t.code){s.orderNo=t.orderNo;new a.a("qrcode",{text:t.data.codeUrl,width:180,height:180,colorDark:"#000000",colorLight:"#ffffff"});s.isload=!1,s.getState(t.orderNo)}})},getState:function(t){var s=this,v=this;Object(i.D)({orderNo:t,type:"vip"}).then(function(t){1==t.code?"SUCCESS"==t.trade_state?(v.$message({message:"支付成功",type:"success"}),clearTimeout(v.t),v.$router.replace("/user/order")):v.t=setTimeout(v.getState(v.orderNo),1e3):s.$alert(t.msg)})}},created:function(){this.phone=localStorage.getItem("phoneNo"),sessionStorage.getItem("vipdata")&&(this.list=JSON.parse(sessionStorage.getItem("vipdata")))},beforeDestroy:function(){clearTimeout(this.t)}},c={render:function(){var t=this,s=t.$createElement,v=t._self._c||s;return v("div",{staticClass:"openVip"},[v("v-head"),t._v(" "),v("div",{staticClass:"main"},[v("h1",[t._v("立即成为标大大会员 优享更多特权")]),t._v(" "),v("ul",{staticClass:"dr"},t._l(t.list,function(s,_){return v("li",{key:_},[v("h5",{staticClass:"fs18 color-150 borde"},[t._v("\n\t\t\t\t\t\t"+t._s(s.stdDesc)+"\n\t\t\t\t\t\t"),v("v-icon",{attrs:{iconClass:"iconVIPbiaozhi"}})],1),t._v(" "),v("div",{staticClass:"borde pt30 pb30"},[v("div",{staticClass:"price"},[v("font",{staticClass:"fs14 color-150"},[t._v("¥")]),t._v(" "),v("span",{staticClass:"fs36 color-150 fw600 ml10"},[t._v(t._s(s.price))])],1),t._v(" "),v("div",{staticClass:"discount"},[v("font",[t._v(t._s(s.altInfo))]),t._v(" "),v("span",{staticClass:"fs14 color-150"},[t._v("已节省"+t._s(s.primePrice-s.price)+"元")])],1)]),t._v(" "),v("div",{staticClass:"btn-box borde pt20 pb20"},[v("button",{staticClass:"fs14 cp",on:{click:function(s){return t.goOpen(_)}}},[t._v("立即开通")])])])}),0),t._v(" "),t._m(0)]),t._v(" "),t.showPop?v("div",{staticClass:"re-loading"},[v("div",{staticClass:"re-puy "},[v("div",{staticClass:"puy-title"},[v("span",[t._v("会员支付")]),t._v(" "),v("i",{staticClass:"el-icon-close",on:{click:t.closeFn}})]),t._v(" "),v("div",{staticClass:"re-auto"},[t._m(1),t._v(" "),v("div",{staticClass:"puy-detail"},[v("div",[v("div",{staticClass:"puy-name"},[v("span",[t._v("手机号码:")]),t._v(t._s(t.phone)+"\n\t\t\t\t\t\t\t")]),t._v(" "),v("div",{staticClass:"puy-name"},[v("span",[t._v("标大大"+t._s(t.currentData.stdDesc))])])]),t._v(" "),v("div",{staticClass:"puy-price"},[v("div",{staticClass:"puy-name"},[v("span",[t._v("应付金额:")]),v("span",{staticClass:"price"},[t._v(t._s(t.currentData.price))]),t._v("元\n\t\t\t\t\t\t\t")])])]),t._v(" "),t._m(2),t._v(" "),v("div",{staticClass:"puy-code"},[v("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isload,expression:"isload"}],staticClass:"puy-img",attrs:{id:"qrcode","element-loading-text":"二维码生成中"}}),t._v(" "),t._m(3)])])])]):t._e()],1)},staticRenderFns:[function(){var t=this,s=t.$createElement,v=t._self._c||s;return v("div",{staticClass:"table-box"},[v("h4",{staticClass:"fs24 color-150 text-c mb20"},[t._v("标大大会员 专享特权")]),t._v(" "),v("table",{staticClass:"mb40 color-150"},[v("thead",[v("th",{staticStyle:{width:"18.75%"}},[t._v("特权项目")]),t._v(" "),v("th",{staticStyle:{width:"31.25%"}},[t._v("特权服务介绍")]),t._v(" "),v("th",{staticStyle:{width:"12.75%"}},[t._v("月度会员"),v("p",[t._v("(318元)")])]),t._v(" "),v("th",{staticStyle:{width:"12.75%"}},[t._v("季度会员"),v("p",[t._v("(898元)")])]),t._v(" "),v("th",{staticStyle:{width:"12.75%"}},[t._v("半年会员"),v("p",[t._v("(1498元)")])]),t._v(" "),v("th",{staticStyle:{width:"12.75%"}},[t._v("年度会员"),v("p",[t._v("(2298元)")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticClass:"tit"},[t._v("招标公告")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供全国各省的招标公告，会员可根据地区、项目类型、项目资质和评标办法等筛选条件查询出自己想要的信息。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("变更公告")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供招标过程中的补充公告、变更公告、废标公告、重新招标等信息，使用户可以及时获知并有效的对投标工作做出相应方案调整。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("中标公告")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供建筑行业即时的中标资讯，帮助会员用户即时获取实时的中标公示，掌握市场行情。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("竞价谈判公告")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供全国各省有关服务、货物的谈判采购信息。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("询价采购公告")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供全国各省有关服务、货物的询价采购信息。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("招标数据统计")]),t._v(" "),v("td",{staticClass:"con"},[t._v("根据会员单位需求,以列表的形式定期汇总各行业、各领域招标采购数据信息,并以PDF格式提供给会员单位，为会员单位做数据分析提供支持服务。")]),t._v(" "),v("td",[t._v("另行收费")]),t._v(" "),v("td",[t._v("另行收费")]),t._v(" "),v("td",[t._v("1次")]),t._v(" "),v("td",[t._v("5次")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("企业信息")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供300W+家企业的基本信息，包括企业工商信息、企业联系方式、分支机构、法务信息、资质信息、人员信息、业绩信息、中标信息、诚信信息。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit",staticStyle:{position:"relative"}},[t._v("工商信息"),v("span",{staticClass:"buy-new"},[t._v("New")])]),t._v(" "),v("td",{staticClass:"con"},[t._v("接入全国工商信息网站，提供企业的工商信息。包括企业基本信息、分支机构、股东信息、主要人员、变更记录、企业年报、行政处罚等信息。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("人员信息")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供全国注册人员的证书信息、个人业绩、变更记录、不良记录等信息，查找信息更加快速精准。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("业绩信息")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供全国住建部、交通部、水利部的业绩信息，可根据地区、合同金额、日期、关键词快速查找想要的业绩信息。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit",staticStyle:{position:"relative"}},[t._v("法务信息"),v("span",{staticClass:"buy-new"},[t._v("New")])]),t._v(" "),v("td",{staticClass:"con"},[t._v("可查看自身风险信息和企业的关联风险信息")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("综合查询（限APP和网页端使用）")]),t._v(" "),v("td",{staticClass:"con"},[t._v("可通过设置地区、资质、业绩关键字等条件，查询出符合条件的建筑企业业绩信息，快捷方便，为用户提供个性化的信息查询服务。")]),t._v(" "),v("td",[t._v("按次收费")]),t._v(" "),v("td",[t._v("按次收费")]),t._v(" "),v("td",[t._v("按次收费")]),t._v(" "),v("td",[t._v("按次收费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("在建信息")]),t._v(" "),v("td",{staticClass:"con"},[t._v("可根据姓名和身份证号，精准查询湖南省内人员的在建情况。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("保证金业务")]),t._v(" "),v("td",{staticClass:"con"},[t._v("为我们的会员用户提供相关的保证金业务")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("人工服务")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供一对一的客服经理服务模式。在服务期间内为会员单位提供全方位立体式的服务，及时解决会员单位使用过程中遇到的问题和困难。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("企业定制化数据查询")]),t._v(" "),v("td",{staticClass:"con"},[t._v("为会员用户提供私人定制化企业数据查询")]),t._v(" "),v("td",[t._v("另行收费")]),t._v(" "),v("td",[t._v("另行收费")]),t._v(" "),v("td",[t._v("另行收费")]),t._v(" "),v("td",[t._v("另行收费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("企业定制化开发")]),t._v(" "),v("td",{staticClass:"con"},[t._v("公司有非常强大的技术团队、并且再建筑行业中有多年经验。可以针对性的为我们会员用户提供建筑相关的app、小程序、公众号、网页定制服务。")]),t._v(" "),v("td",[t._v("另行收费")]),t._v(" "),v("td",[t._v("另行收费")]),t._v(" "),v("td",[t._v("另行收费")]),t._v(" "),v("td",[t._v("另行收费")])]),t._v(" "),v("tr",[v("td",{staticClass:"tit"},[t._v("移动客户端")]),t._v(" "),v("td",{staticClass:"con"},[t._v("提供手机app（标大大）、标大大移动端、标大大网页端，三端可用同一账号登录、浏览招投标项目信息，第一时间便捷查看项目不错失商机，大大提高工作效率。")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")]),t._v(" "),v("td",[t._v("免费")])])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"puy-title",staticStyle:{fontSize:"14px"}},[s("span",[this._v("订单详情")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"puy-title",staticStyle:{fontSize:"14px"}},[s("span",[this._v("支付方式")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"puy-hint"},[s("img",{attrs:{src:v("bDUs"),alt:""}}),this._v("  微信扫码支付\n\t\t\t\t\t\t")])}]};var d=v("VU/8")(e,c,!1,function(t){v("vcVw")},"data-v-6be10aad",null);s.default=d.exports},vcVw:function(t,s){}});
//# sourceMappingURL=6.1bef3a9f6023a2338f8e.js.map