webpackJsonp([2],{"/xAH":function(t,i){},"8DJe":function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=s("3cXf"),e=s.n(a),n=s("gyMJ"),l={data:function(){return{i:0,infor:!0,branch:!1,list:[],length:"",details:{},id:""}},watch:{},methods:{changeNavs:function(){this.i=0,this.infor=!0,this.branch=!1},changeNavss:function(){0!=this.length&&(this.i=1,this.infor=!1,this.branch=!0)},gainList:function(){var t=this;this.id=this.$route.query.id;e()({});Object(n.A)("/company/"+this.id).then(function(i){1==i.code&&(t.details=i.data)})},gainBranch:function(){var t=this;Object(n.a)({comId:this.id}).then(function(i){if(1==i.code){t.list=i.data;var s=[];t.list.forEach(function(i){i.phone&&(s=i.phone.split(";"),""==localStorage.getItem("permissions")||-1==localStorage.getItem("permissions").indexOf("comPhone")?i.phone=t.resetPhone(s[0]):i.phone=s[0],s=[])}),t.length=i.data.length}})},resetPhone:function(t){var i=String(t),s=i.length;if(s>=7){var a=i.slice(-7,-3);return i.replace(a,"****")}if(s<7&&s>=6){a=i.slice(-4,-2);return i.replace(a,"**")}}},created:function(){this.gainList(),this.gainBranch()},components:{}},c={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"icbc"},[s("div",{staticClass:"ic-nav"},[s("span",{class:0==t.i?"ic-dark":"",on:{click:t.changeNavs}},[t._v("基本信息")]),t._v("/"),s("span",{class:1==t.i?"ic-dark":"",on:{click:t.changeNavss}},[t._v("分支机构("),s("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(t.length))]),t._v(")")])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.infor,expression:"infor"}],staticClass:"ic-basic"},[s("div",{staticClass:"ic-line"},[s("div",{staticClass:"left line-f"},[t._v("\r\n           法定代表人\r\n        ")]),t._v(" "),s("div",{staticClass:"left f-color line-r"},[t._v("\r\n           "+t._s(t.details.legalPerson)+"\r\n        ")])]),t._v(" "),s("div",{staticClass:"ic-line"},[s("div",{staticClass:"left line-f"},[t._v("\r\n           注册资本\r\n        ")]),t._v(" "),s("div",{staticClass:"left f-color line-r"},[t._v("\r\n           "+t._s(t.details.regisCapital)+"\r\n        ")])]),t._v(" "),s("div",{staticClass:"ic-line"},[s("div",{staticClass:"left line-f"},[t._v("\r\n           注册号\r\n        ")]),t._v(" "),s("div",{staticClass:"left f-color line-r"},[t._v("\r\n           "+t._s(t.details.businessNum)+"\r\n        ")])]),t._v(" "),s("div",{staticClass:"ic-line"},[s("div",{staticClass:"left line-f"},[t._v("\r\n          企业类型\r\n        ")]),t._v(" "),s("div",{staticClass:"left f-color line-r"},[t._v("\r\n           "+t._s(t.details.economicType)+"\r\n        ")])]),t._v(" "),s("div",{staticClass:"ic-line"},[s("div",{staticClass:"left line-f"},[t._v("\r\n           安许证号\r\n        ")]),t._v(" "),s("div",{staticClass:"left f-color line-r"},[t._v("\r\n          "+t._s(t.details.certNo)+"\r\n        ")])]),t._v(" "),s("div",{staticClass:"ic-line"},[s("div",{staticClass:"left line-f"},[t._v("\r\n           安许期至\r\n        ")]),t._v(" "),s("div",{staticClass:"left f-color line-r"},[t._v("\r\n          "+t._s(t.details.validDate)+"\r\n        ")])]),t._v(" "),s("div",{staticClass:"ic-line"},[s("div",{staticClass:"left h-auto"},[t._v("\r\n           经营范围\r\n        ")]),t._v(" "),s("div",{staticClass:"left f-color min-h"},[t._v("\r\n           "+t._s(t.details.comRange)+"\r\n        ")])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.branch,expression:"branch"}],staticClass:"ic-basic"},[t._m(0),t._v(" "),t._l(t.list,function(i,a){return s("div",{key:a,staticClass:"list-co"},[s("div",{staticClass:"left",staticStyle:{width:"72px"}},[t._v("\r\n           "+t._s(a+1)+"\r\n         ")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"200px"}},[s("span",{staticStyle:{color:"#FE6603"}},[t._v(t._s(i.comName))])]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"100px"}},[t._v("\r\n           "+t._s(i.legalPerson)+"  \r\n         ")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"150px"}},[t._v("\r\n           "+t._s(i.phone)+"\r\n         ")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"250px"}},[t._v("\r\n           "+t._s(i.comAddress)+"\r\n         ")])])})],2)])},staticRenderFns:[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"list-nav"},[s("div",{staticClass:"left",staticStyle:{width:"72px"}},[t._v("\r\n           序号\r\n         ")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"200px"}},[t._v("\r\n           企业名称\r\n         ")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"100px"}},[t._v("\r\n           负责人\r\n         ")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"150px"}},[t._v("\r\n           联系方式\r\n         ")]),t._v(" "),s("div",{staticClass:"left",staticStyle:{width:"250px"}},[t._v("\r\n           地址\r\n         ")])])}]};var r=s("C7Lr")(l,c,!1,function(t){s("/xAH")},"data-v-dab20ae8",null);i.default=r.exports}});
//# sourceMappingURL=2.28bfb6d14b563924b5d9.js.map