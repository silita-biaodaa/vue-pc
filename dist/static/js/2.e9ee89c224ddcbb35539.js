webpackJsonp([2],{Scfg:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("LqYc"),i=e.n(a),v=e("gyMJ"),n={data:function(){return{names:!0,isarea:!1,allcity:[{name:"华东",next:[{name:"上海"},{name:"江苏"},{name:"浙江"},{name:"安徽"},{name:"福建"},{name:"江西"},{name:"山东"}]},{name:"东北",next:[{name:"辽宁"},{name:"吉林"},{name:"黑龙江"}]},{name:"华中",next:[{name:"河南"},{name:"湖北"},{name:"湖南"}]},{name:"华北",next:[{name:"北京"},{name:"天津"},{name:"河北"},{name:"山西"},{name:"内蒙古"}]},{name:"华南",next:[{name:"广东"},{name:"广西"},{name:"海南"}]},{name:"西北",next:[{name:"陕西"},{name:"甘肃"},{name:"青海"},{name:"宁夏"},{name:"新疆"}]},{name:"西南",next:[{name:"重庆"},{name:"四川"},{name:"贵州"},{name:"云南"},{name:"西藏"}]}],source:"湖南",level:[],price:"318",noShow:!1,all:{},iphone:"",isload:!0,orderNo:"",error:!1,pushIP:!1,pop:!1,msg:""}},filters:{month:function(t){return"一个月会员"==t?"1":"三个月会员"==t?"3":"六个月会员"==t?"6":"12"}},methods:{jumpen:function(){this.$router.push("/enroll")},selarea:function(t){this.source=t.name,this.isarea=!1},selfa:function(){this.isarea=!this.isarea},how:function(t){this.price=t.price,this.all=t},judges:function(){sessionStorage.getItem("xtoken")||localStorage.getItem("Xtoken")?(this.name=localStorage.getItem("Bname"),this.names=!1):this.names=!0},towe:function(){this.$router.push("/about")},close:function(){this.noShow=!1},gainfee:function(){var t=this;Object(v.d)({channel:"1003"}).then(function(s){1==s.code&&(t.level=s.data,t.price=s.data[0].price,t.all=s.data[0])})},toTop:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0},openV:function(){var t=this;if(!sessionStorage.getItem("xtoken")&&!localStorage.getItem("Xtoken"))return this.$confirm("暂无权限，请先登录","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$router.push("/logo")}).catch(function(){}),!1;if(this.noShow)return!1;this.pushIP=0==localStorage.getItem("isFirst"),this.isload=!0;var s=sessionStorage.getItem("ip");this.iphone=localStorage.getItem("phoneNo"),Object(v.V)({channel:"1003",userId:s,stdCode:this.all.stdCode,tradeType:"NATIVE"}).then(function(s){if(1==s.code){t.orderNo=s.orderNo;new i.a("qrcode",{text:s.data.codeUrl,width:180,height:180,colorDark:"#000000",colorLight:"#ffffff"});t.gainstate(s.orderNo)}}),this.noShow=!0},gainstate:function(t){this.isload=!1;var s=this,e=setInterval(function(){var a=this;if(!s.noShow)return clearInterval(e),!1;Object(v.I)({orderNo:t,type:"vip"}).then(function(t){"SUCCESS"==t.trade_state?(Object(v.B)({}).then(function(t){1==t.code?(sessionStorage.setItem("ip",t.data.pkid),localStorage.setItem("0658544ac523fca9ec78a5f607fdd7ee",t.data.isVip),localStorage.setItem("isFirst",t.data.isFirst),localStorage.getItem("Xtoken")?localStorage.setItem("Xtoken",t.data.xtoken):sessionStorage.setItem("xtoken",t.data.xtoken)):401==t.code?a.$alert(t.msg).then(function(){s.$router.push("/logo")}):a.$alert(t.msg)}),s.$message({message:"支付成功",type:"success"}),s.noShow=!1,clearInterval(e),s.$router.push("/user/order")):"ClOSED"==t.trade_state?(clearInterval(e),s.noShow=!1):"REVOKED"==t.trade_state?(s.noShow=!1,clearInterval(e)):"PAYERROR"==t.trade_state&&(s.noShow=!1,clearInterval(e))})},2e3)}},created:function(){this.judges(),this.gainfee(),this.toTop()},components:{"v-head":e("/8yE").a}},_={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"buy"},[e("v-head",{attrs:{headTxt:"会员服务"}}),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"buy-limit"},[e("div",{staticClass:"buy-vip"},[t._l(t.level,function(s,a){return e("div",{key:a,staticClass:"buy-price",on:{click:function(e){return t.how(s)}}},[e("div",{staticClass:"price",class:t.price==s.price?"current":""},[e("span",[t._v(t._s(s.price))]),t._v("/"+t._s(t._f("month")(s.stdDesc))+"个月\n\t\t\t\t\t")]),t._v(" "),e("div",[e("div",{staticClass:"rate left"},[t._v("\n\t\t\t\t\t\t\t"+t._s(s.altInfo)+"\n\t\t\t\t\t\t")]),t._v(" "),e("div",{staticClass:"right save"},[t._v("\n\t\t\t\t\t\t\t可节省"+t._s(s.primePrice-s.price)+"元\n\t\t\t\t\t\t")])])])}),t._v(" "),e("div",{staticClass:"buy-btn",on:{click:t.openV}},[t._v("\n\t\t\t\t\t立即开通\n\t\t\t\t")])],2),t._v(" "),t._m(1),t._v(" "),t._m(2)]),t._v(" "),t.noShow?e("div",{staticClass:"re-loading"},[e("div",{staticClass:"re-puy "},[e("div",{staticClass:"puy-title"},[e("span",[t._v("会员支付")]),t._v(" "),e("i",{staticClass:"el-icon-close",on:{click:t.close}})]),t._v(" "),e("div",{staticClass:"re-auto"},[t._m(3),t._v(" "),e("div",{staticClass:"puy-detail"},[e("div",[e("div",{staticClass:"puy-name"},[e("span",[t._v("手机号码:")]),t._v(t._s(t.iphone)+"\n\t\t\t\t\t\t\t")]),t._v(" "),e("div",{staticClass:"puy-name"},[e("span",[t._v("标大大"+t._s(this.all.stdDesc))])])]),t._v(" "),e("div",{staticClass:"puy-price"},[e("div",{staticClass:"puy-name"},[e("span",[t._v("应付金额:")]),e("span",{staticClass:"price"},[t._v(t._s(this.all.price))]),t._v("元\n\t\t\t\t\t\t\t")])])]),t._v(" "),t._m(4),t._v(" "),e("div",{staticClass:"puy-code"},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isload,expression:"isload"}],staticClass:"puy-img",attrs:{id:"qrcode","element-loading-text":"二维码生成中"}}),t._v(" "),t._m(5)])])])]):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.pop,expression:"pop"}],staticClass:"buy-prp"},[t._v(t._s(t.msg)+"\n\t\t")])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"buy-img"},[s("div",{staticClass:"img-vip"},[s("img",{attrs:{src:e("TYMm"),alt:""}}),this._v(" "),s("div",{staticClass:"img-title"},[this._v("\n\t\t\t\t\tV I P 会 员\n\t\t\t\t")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"buy-title",staticStyle:{display:"flex","align-items":"center"}},[this._v("\n\t\t\t\t标大大会员 "),s("i",{staticClass:"bigDian"}),this._v(" 专享特权\n\t\t\t")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"buy-table"},[e("table",[e("thead",[e("th",{staticStyle:{width:"18.75%"}},[t._v("特权项目")]),t._v(" "),e("th",{staticStyle:{width:"31.25%"}},[t._v("特权服务介绍")]),t._v(" "),e("th",{staticStyle:{width:"12.75%"}},[t._v("月度会员"),e("br"),t._v("318元")]),t._v(" "),e("th",{staticStyle:{width:"12.75%"}},[t._v("季度会员"),e("br"),t._v("898元")]),t._v(" "),e("th",{staticStyle:{width:"12.75%"}},[t._v("半年会员"),e("br"),t._v("1498元")]),t._v(" "),e("th",{staticStyle:{width:"12.75%"}},[t._v("年度会员"),e("br"),t._v("2298元")])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticClass:"tit"},[t._v("招标公告")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供全国各省的招标公告，会员可根据地区、项目类型、项目资质和评标办法等筛选条件查询出自己想要的信息。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("变更公告")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供招标过程中的补充公告、变更公告、废标公告、重新招标等信息，使用户可以及时获知并有效的对投标工作做出相应方案调整。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("中标公告")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供建筑行业即时的中标资讯，帮助会员用户即时获取实时的中标公示，掌握市场行情。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("竞价谈判公告")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供全国各省有关服务、货物的谈判采购信息。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("询价采购公告")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供全国各省有关服务、货物的询价采购信息。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("招标数据统计")]),t._v(" "),e("td",{staticClass:"con"},[t._v("根据会员单位需求,以列表的形式定期汇总各行业、各领域招标采购数据信息,并以PDF格式提供给会员单位，为会员单位做数据分析提供支持服务。")]),t._v(" "),e("td",[t._v("另行收费")]),t._v(" "),e("td",[t._v("另行收费")]),t._v(" "),e("td",[t._v("1次")]),t._v(" "),e("td",[t._v("5次")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("企业信息")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供300W+家企业的基本信息，包括企业工商信息、企业联系方式、分支机构、法务信息、资质信息、人员信息、业绩信息、中标信息、诚信信息。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit",staticStyle:{position:"relative"}},[t._v("工商信息"),e("span",{staticClass:"buy-new"},[t._v("New")])]),t._v(" "),e("td",{staticClass:"con"},[t._v("接入全国工商信息网站，提供企业的工商信息。包括企业基本信息、分支机构、股东信息、主要人员、变更记录、企业年报、行政处罚等信息。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("人员信息")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供全国注册人员的证书信息、个人业绩、变更记录、不良记录等信息，查找信息更加快速精准。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("业绩信息")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供全国住建部、交通部、水利部的业绩信息，可根据地区、合同金额、日期、关键词快速查找想要的业绩信息。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit",staticStyle:{position:"relative"}},[t._v("法务信息"),e("span",{staticClass:"buy-new"},[t._v("New")])]),t._v(" "),e("td",{staticClass:"con"},[t._v("可查看自身风险信息和企业的关联风险信息")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("综合查询（限APP和网页端使用）")]),t._v(" "),e("td",{staticClass:"con"},[t._v("可通过设置地区、资质、业绩关键字等条件，查询出符合条件的建筑企业业绩信息，快捷方便，为用户提供个性化的信息查询服务。")]),t._v(" "),e("td",[t._v("按次收费")]),t._v(" "),e("td",[t._v("按次收费")]),t._v(" "),e("td",[t._v("按次收费")]),t._v(" "),e("td",[t._v("按次收费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("在建信息")]),t._v(" "),e("td",{staticClass:"con"},[t._v("可根据姓名和身份证号，精准查询湖南省内人员的在建情况。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("保证金业务")]),t._v(" "),e("td",{staticClass:"con"},[t._v("为我们的会员用户提供相关的保证金业务")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("人工服务")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供一对一的客服经理服务模式。在服务期间内为会员单位提供全方位立体式的服务，及时解决会员单位使用过程中遇到的问题和困难。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("企业定制化数据查询")]),t._v(" "),e("td",{staticClass:"con"},[t._v("为会员用户提供私人定制化企业数据查询")]),t._v(" "),e("td",[t._v("另行收费")]),t._v(" "),e("td",[t._v("另行收费")]),t._v(" "),e("td",[t._v("另行收费")]),t._v(" "),e("td",[t._v("另行收费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("企业定制化开发")]),t._v(" "),e("td",{staticClass:"con"},[t._v("公司有非常强大的技术团队、并且再建筑行业中有多年经验。可以针对性的为我们会员用户提供建筑相关的app、小程序、公众号、网页定制服务。")]),t._v(" "),e("td",[t._v("另行收费")]),t._v(" "),e("td",[t._v("另行收费")]),t._v(" "),e("td",[t._v("另行收费")]),t._v(" "),e("td",[t._v("另行收费")])]),t._v(" "),e("tr",[e("td",{staticClass:"tit"},[t._v("移动客户端")]),t._v(" "),e("td",{staticClass:"con"},[t._v("提供手机app（标大大）、标大大移动端、标大大网页端，三端可用同一账号登录、浏览招投标项目信息，第一时间便捷查看项目不错失商机，大大提高工作效率。")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")]),t._v(" "),e("td",[t._v("免费")])])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"puy-title",staticStyle:{fontSize:"14px"}},[s("span",[this._v("订单详情")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"puy-title",staticStyle:{fontSize:"14px"}},[s("span",[this._v("支付方式")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"puy-hint"},[s("img",{attrs:{src:e("bDUs"),alt:""}}),this._v("  微信扫码支付\n\t\t\t\t\t\t")])}]};var c=e("C7Lr")(n,_,!1,function(t){e("WKU1")},"data-v-1c93bbe0",null);s.default=c.exports},TYMm:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAACN1BMVEUAAAA/Pz8+Ojo+OTn5xSpAPDg+Ojn87SFFQTjpyyg+Ojk/Ozk/Ozn4ti1DQz4+Ojj3ty0/Ozk9PTr/4BFdTzfSni9gWDU9Ojg+Ojg9Ojn56iY9Ojg+Ojj4ty49OTj6ty2biS9AOTlGufeDezBjVTZsXDW8sSlTTjZJRDc+Ojl4ZjRaUTb4ti1APDmBbTP5ty0/Ozk+OjmGdDJHt/j4tiz57gD5ti0+Ojj4ty34ty346Rr5tyxGufn87gD77wA8OTn5tSz3tSrUyCaqoCusiTG9ljCRiC9tZjOelC2SeTHw4yNuXzV1bzL87SH35C9qZDPwviv4ti31xChHuPhzZDX87iGQejH87iFHt/j4ti1Ht/jk2CT35S8/Ojr67gDd0SX87iGfiDD77SJHtvj67wA+Ozn34y/77QCCcjGWfzL57gBGtvmqkC9eVzTBtis9ODiAcDWwpCtOsf/4ti387iE+Ojn///9VUEnMwSdCPTnJlzDhpi/k1yRKQzeJbDTvsC326CJNRTo/OznprC7lqS1HQDlYUDhWSjdSSDergzJybDLcoy/t4CPo3CNqWDZhUjZTTjZ0XzWBZzRlXzRiXDSifTP0sy2hmCyqoCvd0SXy5CL46iH///r//d/++av98lBRTEhlVDZ5YTX88DN4cTK6jTG1iTHMmDCIgDCOhi+UjC6ZkS27sCnh1CTCwMD++r2zsrH++KD+95r99oj982f88USScjRpYzSbeDOVdDOuhTLBkjHaziW4RKSaAAAAc3RSTlMAD4Cg3PnToAsH9vDijgdrPB8VDv7+5r2pkmNiVEZFMCYlHPr59/fw7+ro5+TZy8rFspiSh4R0c2dbVVBNST8uKxv9+vb18e7u7evq6eni4N3R0M/Mx8TEw7mqqKSbl5aSj4+MjId4dGJcW1dXT0I7MCoNWQTb3AAAAqtJREFUOMuN0+VbGzEcwPFfYe2gig2H4e7O0Lm7u7sv6egV6kJbirsMd5n79sctSVsoHYV+XuRe3PfJXZ4ksCqw5mEN+KL2xpN7ob6EgaWlu8AnobWOCd8k+dYnnb30lH0heouwuri6GIhrJzb4k6CdsObulSQ24wP4X1wQ+CpA5udy329VeQh4ihD4O0WKMv1dCnKlHl2w+PWd7czV9JMpqae2OZwRl3t0Mrj4dfQTxnio2zasae/sQw77Res/Hukf/W3k8xeMtbYfWowMYZPIKTsK3MUnHP8wSuYbnu4ZwhghY3OXM9zBT3TroupujY1MkTDZbMckpKXaWWYVrnWxohd4aowUCx2tmIZEi8VZGoXxri5ALDuvbSIWVIomqpFSqtT00YcOC0hTRUM/QXQ/J/fCNKMRxUBlTgUAT/j8iF7x7u3GPurQPjFU5VQCJMpv2uWD3sL3OqTkk8MARGH48CJnbiDGGzyNc1ZDcx448HKTcauC0vWzh5KaUNNxztDXlhoITomivZhZnMYUIgxcC2LU5gS3jeErWPGXs7tCaztirKpnrisVR2aW8VdY2TPgCtt6WafkboNTfsllMl5PH6LJQLczNOob2f6oLpCXu1l4OiifjNKCgzRp1a84wt422mnCssi7CkkZu1cSdrFCxAdoaVtyhO1WGnamSMl8knqWuNQJ00iz3MHCFr2BdL8sbMFlkhJwF8vfg7FWpaDhz07SzZoeA1MP6/llkEM2P09D8yw5slwReBGZrcUKlRaTRoOMljzvd1twDOOOZYy+TyLNxFHwLjjzEF6yYWSZQV1hAbCJl8K0Qc4+Z9L06l7BpmL4g90D6q4/3CPYQlRGf4/ut6kIthQRrlc1n9toqTwp8NwECzguPITnBnhsXQJ5RIx8U7FyIdnyf7cdQHErB7e0AAAAAElFTkSuQmCC"},WKU1:function(t,s){}});
//# sourceMappingURL=2.e9ee89c224ddcbb35539.js.map