webpackJsonp([1],{EJIF:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("3cXf"),n=i.n(s),a=i("gyMJ"),o={data:function(){return{navs:[{name:"工商信息",i:0,show:!0,to:"icbc",id:1},{name:"法务信息",i:1,show:!1,to:"law"},{name:"资质信息",i:2,show:!1,to:"intell"},{name:"人员信息",i:3,show:!1,to:"personnel"},{name:"业绩信息",i:4,show:!1,to:"centre"},{name:"中标信息",i:5,show:!1,to:"achievement"},{name:"诚信信息",i:6,show:!1,to:"good"}],svip:!1,name:"工商信息",details:{},id:"",title:"",source:"",collect:"关注",iscollect:!1}},watch:{$route:function(t,e){this.navs.forEach(function(t){t.show=!1}),this.name=this.navs[this.$route.meta.i].name,this.navs[this.$route.meta.i].show=!0}},methods:{gaincollect:function(){var t=this;this.iscollect?Object(a.I)({companyid:this.id}).then(function(e){(e.code=1)&&(t.iscollect=!1,t.collect="关注")}):Object(a.o)({companyid:this.id}).then(function(e){(e.code=1)&&(t.iscollect=!0,t.collect="已关注")})},closeload:function(t){this.svip=t.cur},anchor:function(t){var e=this;if("法务信息"==t.name){if(!sessionStorage.getItem("xtoken")&&!localStorage.getItem("Xtoken"))return this.$confirm(this.qjTipTxt,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$router.push("/logo")}).catch(function(){}),!1;if(""==localStorage.getItem("permissions")||-1==localStorage.getItem("permissions").indexOf("comLaw"))return this.svip=!0,void this.modalHelper.afterOpen()}this.name=t.name,this.navs.forEach(function(t){t.show=!1}),t.show=!0,this.$router.push({path:t.to,query:{id:t.id,name:t.title,source:t.source}})},resetPhone:function(t){var e=String(t),i=e.length;if(i>=7){if(11==i){var s=e.slice(3,7);return e.replace(s,"****")}s=e.slice(5,9);return e.replace(s,"****")}if(i<7&&i>=6){s=e.slice(-4,-2);return e.replace(s,"**")}},gainDetail:function(){var t=this;this.id=this.$route.query.id;n()({});Object(a.A)("/company/"+this.id).then(function(e){if(1==e.code){t.details=e.data,t.iscollect=e.data.collected,t.iscollect?t.collect="已关注":t.collect="关注";var i=[];t.details.phone&&(i=t.details.phone.split(";"),""==localStorage.getItem("permissions")||-1==localStorage.getItem("permissions").indexOf("comPhone")?t.details.phone=t.resetPhone(i[0]):t.details.phone=i[0])}})},gainNav:function(){var t=this.$route.meta.i;this.name=this.navs[t].name,this.navs[0].show=!1,this.navs[t].show=!0},deploy:function(){var t=this;this.navs.forEach(function(e){e.id=t.id,e.title=t.title,e.source=t.source})},jump:function(){this.details.comUrl&&(-1==this.details.comUrl.indexOf("http://")?window.open("http://"+this.details.comUrl):window.open(this.details.comUrl))},jumpapp:function(){var t=this.$router.resolve({path:"/download"}).href;window.open(t,"_blank")}},created:function(){this.source=this.$route.query.source,this.title=this.$route.query.name,this.gainDetail(),this.gainNav(),this.deploy()},components:{}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"introduce"},[i("div",{staticClass:"i-nav m-15"},[t._v("\r\n    首页 > 企业 > "+t._s(t.title)+" > "+t._s(t.name)+"\r\n  ")]),t._v(" "),i("div",{staticClass:"com-title"},[t._m(0),t._v(" "),i("div",{staticClass:"com-detail left"},[i("p",{staticClass:"c-name"},[t._v("\r\n        "+t._s(t.details.comName)+"\r\n      ")]),t._v(" "),i("div",{staticClass:"c-state"},[t._v("\r\n        "+t._s(t.details.subsist)+" \r\n      ")]),t._v(" "),i("div",{staticClass:"c-all"},[i("div",{staticClass:"left"},[i("p",[t._v("电话："+t._s("NULL-"==t.details.phone?"":t.details.phone)+"  "),i("span",{on:{click:t.jumpapp}},[t._v("更多号码请下载APP")])]),t._v(" "),i("p",[t._v("邮箱："+t._s((t.details.email,"--")))])]),t._v(" "),i("div",{staticClass:"left"},[i("p",{attrs:{title:t.details.comUrl},on:{click:t.jump}},[t._v("网址："+t._s(t.details.comUrl?t.details.comUrl:"--"))]),t._v(" "),i("p",{attrs:{title:t.details.comAddress}},[t._v("地址："+t._s(t.details.comAddress?t.details.comAddress:"--"))])])])]),t._v(" "),i("div",{staticClass:"right attention",class:t.iscollect?"collect":"",on:{click:t.gaincollect}},[i("i",{staticClass:"el-icon-plus"}),t._v(t._s(t.collect)+"\r\n    ")])]),t._v(" "),i("div",{staticClass:"anchor"},[i("div",{staticClass:"i-nav left"},t._l(t.navs,function(e,s){return i("div",{key:s,class:e.name==t.name?"current":"",on:{click:function(i){return t.anchor(e)}}},[t._v("\r\n         "+t._s(e.name)+"\r\n         "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"el.show"}],staticClass:"nav-rim"},[i("div",{staticClass:"triangle"})])])}),0),t._v(" "),i("div",{staticClass:"right standby"},[i("router-view")],1)]),t._v(" "),t.svip?i("f-vip",{on:{toChildEvent:t.closeload}}):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"com-img left"},[e("img",{attrs:{src:i("p+lB"),alt:""}})])}]};var l=i("C7Lr")(o,c,!1,function(t){i("yszO")},"data-v-2f1837bd",null);e.default=l.exports},"p+lB":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLBAMAAADKYGfZAAAAKlBMVEUAAADu7u7u7u7v7+/u7u7u7u7u7u7u7u7d3d3g4ODl5eXq6uro6Ojj4+OYfB9ZAAAAB3RSTlMAvvJNhPRMx6iB3gAAASlJREFUSMft1r1uwjAQB/Ab+gDdurYTa5j6HJ26duvaoZJpAzNnPmbigTm8QZB4AFiYASG/CyQnwoFs5yQEihD/JVb0UxTf2bIBmg1VkbcvgCdVnV+AbyVIBC8S9gwNCXsFJcnPg13KllhEb4Osg4ekIZaUrBdg/3hM5mctxkZ+tmCsK2N9P5swNrgl08YYYvEsj5NRvdoFm1Lf5i42pG4QI5c5mM6fMTKGIwfDsbV2c8J6/plyhkI2l7G0LixvVkKsGBs3y1h5V/QyDTeLKjG94Gtozv+tRnW7AQuvXm33cTKtzsu7EDcrvE9pT629C6mcQt64GtXtOmyoJm4W2wRZTDkabzn7Q180Zy30hrO2Vw1qcTrfPZPdBqV3y3cJi6T3Xmh+VqmPCHZLXXpRiXF5AAAAAABJRU5ErkJggg=="},yszO:function(t,e){}});
//# sourceMappingURL=1.f046753a73d0c97eaa68.js.map