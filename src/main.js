import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'

import sha1 from 'sha1'
Vue.prototype.$sha1 = sha1;
import router from './router'
import funcom from './util/util'
Vue.prototype.funcom = funcom
Vue.config.productionTip = false
import  companyJump  from '@/components/companyJump';//点击跳转企业详情组件（包含接口查询）
import  navPage  from '@/components/paging';//分页组件（封装element，方便统一控制）
import  enSearch from '@/components/home'//顶部搜索框
import  logoNav from '@/components/logoNav'
import fvip from '@/components/fvip'//无会员弹窗
import publicBread from "@/components/customize/publicBread";//面包屑（封装element，方便统一控制）
import usercenter from '@/components/user-center'//未知
import provCity from '@/components/provCity'//省市
import city from '@/components/bid/city'
import allCity from '@/components/bid/allCity'
import perpor from '@/page/perfor/perpor'
import money from '@/page/perfor/money'
import pertime from '@/page/perfor/pertime'
import comment from '@/page/comment/comment'
import myInput from "@/components/customize/myInput" //输入框
import svgIcon from '@/components/svg-icon'//多色图标

import {getOpenid,ThirdLogin} from "@/api/index"
Vue.component('v-user',usercenter)//
Vue.component('nav-page', navPage)
Vue.component('en-search', enSearch)
Vue.component('logo-Nav', logoNav)
Vue.component('f-vip', fvip)
Vue.component('v-comjump',companyJump)
Vue.component('v-bread',publicBread)
Vue.component('v-myInput',myInput)
Vue.component('v-icon',svgIcon)
Vue.component('happy-scroll', HappyScroll)//滚动条组件
// Vue.component('v-provcity',provCity)

Vue.component('c-ity', city)//用于招中标市级筛选（优化后可删）
Vue.component('all-city', provCity)//用于企业市级筛选（优化后可删）
Vue.component('per-por', perpor)//地区组件可把其与市级筛选合并，多个组件无意义（优化后可删）
Vue.component('m-oney', money)//钱筛选组件,感觉其中逻辑不够灵活
Vue.component('per-time', pertime)//时间筛选组件,感觉其中逻辑不够灵活

Vue.component('com-ment', comment)//评论组件

Vue.prototype.qjTipTxt='查看更多信息，请立即登录!';
Vue.prototype.modalHelper = (function () {
  var scrollTop;
  return {
    afterOpen: function () {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px;';
    },
    beforeClose: function () {
      var body = document.body;
      body.style.position = '';
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
      body.style.top = '';
    }
  };
})();


/*
*格式化时间  yyyy-mm-dd
*@param param 需要格式化的时间戳
*@param type 传值则为yyyy-mm-dd hh:mm:ss
**/
Vue.prototype.formatDate = function(param, type=null) {
  var a = new Date(param);
  var m = a.getMonth() + 1;
  if(m < 10) {
      m = '0' + m;
  }
  var d = a.getDate();
  if(d < 10) {
      d = '0' + d;
  }
  var b = a.getFullYear() + '-' + m + '-' + d;

  if(type != null) {
      var h = a.getHours();
      if(h < 10) {
          h = '0' + h;
      }
      var mm = a.getMinutes();
      if(mm < 10) {
          mm = '0' + mm;
      }
      var ss = a.getSeconds();
      if(ss < 10) {
          ss = '0' + ss;
      }
      b = b + ' ' + h + ':' + mm + ':' + ss;
  }
  return b;
}
//fix层防滚动
Vue.prototype.modalHelper = (function() {
	var scrollTop;
	return {
		afterOpen: function(){
		    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		    document.body.style.cssText += 'position:fixed;width:100%;top:-'+scrollTop+'px;';
		},
		beforeClose: function() {
		    var body = document.body;
		    body.style.position = '';
		    var top = body.style.top;
		    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
		    body.style.top = '';
		}
	};
})();
/*新开页跳转*/
Vue.prototype.openNewLink = function(path,query=null){
  const {href} = router.resolve({
    path:path,
    query: query
  })
  window.open(href, '_blank', )
}

Vue.prototype.chqtable = function (path, query = null) {
  window.open(path, '_blank')
}

/*对象中如果有值为空则删除该属性*/
Vue.prototype.filterParams=function(obj){
  let _newPar = {};
  for (let key in obj) {
      //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
      if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
          //记录属性
          _newPar[key] = obj[key];
      }
  }
  //返回对象
  return _newPar;
}



//获取url参数
const getParam=function(name){  //获取参数
  var url=window.location.search;  //获取问号之后的字0符
  var reg=new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  if(url!=null && url.toString().length>1){ 
    var r=url.substr(1).match(reg);
    if(r!=null)return unescape(r[2]); return null;
  }
}


const getCode=function(code) {
  var locations = location + ""; 
  // if (locations.indexOf('/?#/') > 0) {//处理在支付页面授权时，获取code失败
  // 	locations = locations.replace('/?#/', '/#/')
  // }
  if (locations.indexOf("?") == -1) {
    return false
  }
  var params = locations.split("?");
  var queryArr = params[1].split("&");
  var queryMap = {};
  for (var index in queryArr) {
    var k = queryArr[index].split("=")[0];
    var v = queryArr[index].split("=")[1];
    var s =v.split("#");
    queryMap[k] = s[0];
  }
  return queryMap[code];
};

const _hmt = _hmt || [];
window._hmt = _hmt;
(function () {
  const hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?313616fb1dea0773694f4c657830d6cd";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
const appid='wxcfaea301018d9721';
const appSecret='7c78697663f917d606fe6356185d8726';
router.beforeEach((to, from, next) => {
  // if (to.name == 'icbc' || to.name == 'notice' || to.name == 'article' ) {
  //     alert(1111)
  //  }
  if (to.path) {
    // if(from.fullPath=='/logo'){
    //   let uri=sessionStorage.getItem('path');
    //   next({
    //     replace:true,
    //     name:uri
    //   })
    //   return false
    // }
    //首页
    if(to.path=='/'){
      if(getCode('code')){
        getOpenid({
          code:getCode('code')
        }).then(function(res){
            localStorage.setItem('wxOpenId',res.data.openid);
            localStorage.setItem('wxUnionId',res.data.unionid);
            ThirdLogin({
              wxOpenId:res.data.openid,
              wxUnionId:res.data.unionid,
              channel:'1003'
            }).then(function(resd){
              console.log(resd)
              if(resd.data){
                sessionStorage.setItem('xtoken',resd.data.xtoken);
                localStorage.setItem('Bname',resd.data.nikeName);
                localStorage.setItem('0658544ac523fca9ec78a5f607fdd7ee',resd.data.isVip);
                next({
                  name:'home',
                  params:{
                    name:resd.data.nikeName
                  }
                })
              }else{
                next({
                  name:'bound',
                  replace:true
                })
              }
            })
        })
      }
    }
    if(to.path=='/annals'){
      next({
        path:'/introduce/icbc',
        query:{
          id:to.query.id
        }
      })
    }
    if(to.fullPath=='/logo'){
      sessionStorage.setItem('path',from.fullPath);
    }
    _hmt.push(['_trackPageview', '/#' + to.fullPath]);
  }
  next();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created(){
    //资质，地区筛选
    // if(!localStorage.getItem('filter')){
      this.$http({
          method:'post',
          url:'/new/common/condition',
          data:{}
      }).then(res => {
        localStorage.setItem('filter',JSON.stringify(res.data.data));
      }).catch(req =>{
          console.log(req);
      })
    // }
    // if(!localStorage.getItem('people')){
      //人员筛选
      this.$http({
          method:'post',
          url:'/person/cate',
          data:{}
      }).then(res =>{
        localStorage.setItem('people',JSON.stringify(res.data.data));
      })
    // }
    
    // if(!localStorage.getItem('proType')){
      //建设状态及项目类型
      this.$http({
          method:'post',
          url:'/screen/proTypeInBuild',
          data:{}
      }).then(res =>{
        localStorage.setItem('proType',JSON.stringify(res.data.data));
      })
    // }
    // if(localStorage.getItem('Xtoken') && localStorage.getItem('Xtoken')!='' ){
    //   this.$http({
    //     method:'post',
    //     url:'/foundation/version',
    //     data:{
    //       loginChannel:'1003'
    //     }
    //   }).then();
    // }
  }
})
