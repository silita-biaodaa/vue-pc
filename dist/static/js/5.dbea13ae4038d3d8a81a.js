webpackJsonp([5],{"5LW9":function(t,s){},wFFt:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("3cXf"),e=i.n(a),n=i("gyMJ"),l={data:function(){return{gooDlist:[],total:0,allList:[],badList:[],bad:0,prize:!0,badness:!1,name:"获奖信息",id:"",result:!1,loading:!1}},methods:{gainList:function(){var t=this;this.id=this.$route.query.id;e()({});Object(n.B)("/company/reputation/"+this.id).then(function(s){1==s.code&&(t.gooDlist=s.data.reputation,t.gooDlist?(t.gooDlist.forEach(function(s){s.list.forEach(function(s){s.list.forEach(function(s){t.allList.push(s)})})}),t.loading=!1,0==t.allList.length?t.result=!0:t.result=!1,t.total=t.allList.length):(t.total=0,t.result=!0))})},gainBad:function(){var t=this;Object(n.Y)({comId:this.id}).then(function(s){1==s.code&&(s.data.undesirable.forEach(function(t){t.show=!1}),t.badList=s.data.undesirable,t.bad=s.data.undesirable.length)})},enter:function(t){t.show=!0},leave:function(t){t.show=!1},show:function(){this.name="获奖信息",this.prize=!0,this.badness=!1},showt:function(){0!=this.bad&&(this.name="不良记录",this.prize=!1,this.badness=!0)}},created:function(){this.gainList(),this.gainBad()},components:{}},r={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"good",attrs:{"element-loading-text":"拼命加载中"}},[a("div",{staticClass:"g-nav"},[a("span",{class:"获奖信息"==this.name?"current":"",on:{click:t.show}},[t._v("\r\n       获奖信息 ("+t._s(t.total)+") \r\n     ")]),t._v(" "),a("span",[t._v("\r\n       /\r\n     ")]),t._v(" "),a("span",{class:"不良记录"==this.name?"current":"",on:{click:t.showt}},[t._v("\r\n       不良记录 ("+t._s(t.bad?t.bad:0)+")\r\n     ")])]),t._v(" "),a("div",{staticClass:"g-table"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.prize,expression:"prize"}]},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.result,expression:"!result"}],staticClass:"nav-top"},[a("div",{staticClass:"left",staticStyle:{width:"72px"}},[t._v("\r\n               序号\r\n             ")]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"350px"}},[t._v("\r\n               项目名称\r\n             ")]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"150px"}},[t._v("\r\n               奖项名称\r\n             ")]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"200px"}},[t._v("\r\n               获奖年度\r\n             ")])]),t._v(" "),t._l(t.allList,function(s,i){return a("div",{key:i,staticClass:"nav-text"},[a("div",{staticClass:"left",staticStyle:{width:"72px"}},[t._v("\r\n               "+t._s(i+1)+"\r\n             ")]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"350px"}},[t._v("\r\n               "+t._s(s.projName)+"\r\n             ")]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"150px"}},[t._v("\r\n               "+t._s(s.mateName)+"\r\n             ")]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"200px"}},[t._v("\r\n               "+t._s(s.years)+"\r\n             ")])])}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.result,expression:"result"}],staticClass:"no-toast"},[a("img",{attrs:{src:i("9Fid"),alt:""}}),t._v(" "),"获奖信息"==t.name?a("span",[t._v("Sorry，暂未查询到该公司的获奖信息")]):a("span",[t._v("Sorry，暂未查询到该公司的不良记录")])])],2),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.badness,expression:"badness"}]},[t._m(0),t._v(" "),t._l(t.badList,function(s,i){return a("div",{key:i,staticClass:"nav-text",on:{mouseenter:function(i){t.enter(s)},mouseleave:function(i){t.leave(s)}}},[a("div",{staticClass:"left",staticStyle:{width:"72px"}},[t._v("\r\n               "+t._s(i+1)+"\r\n             ")]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"350px"}},[t._v("\r\n               "+t._s(s.projName)+"\r\n             ")]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"150px"}},[t._v("\r\n               "+t._s(s.pubSite)+"\r\n             ")]),t._v(" "),a("div",{staticClass:"left",staticStyle:{width:"200px"}},[t._v("\r\n               "+t._s(s.pubDate)+"\r\n             ")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:s.show,expression:"el.show"}],staticClass:"text-content"},[t._v("\r\n               "+t._s(s.content)+"\r\n             ")])])})],2)])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"nav-top"},[s("div",{staticClass:"left",staticStyle:{width:"72px"}},[this._v("\r\n               序号\r\n             ")]),this._v(" "),s("div",{staticClass:"left",staticStyle:{width:"350px"}},[this._v("\r\n               项目名称\r\n             ")]),this._v(" "),s("div",{staticClass:"left",staticStyle:{width:"150px"}},[this._v("\r\n               发布部门\r\n             ")]),this._v(" "),s("div",{staticClass:"left",staticStyle:{width:"200px"}},[this._v("\r\n               发布日期\r\n             ")])])}]};var v=i("C7Lr")(l,r,!1,function(t){i("5LW9")},null,null);s.default=v.exports}});
//# sourceMappingURL=5.dbea13ae4038d3d8a81a.js.map