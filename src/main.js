// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "babel-polyfill"
Vue.use(ElementUI);
import moment from 'moment'
Vue.prototype.$moment = moment;
import sha1 from 'sha1'
Vue.prototype.$sha1 = sha1;
import router from './router'
import 'babel-polyfill'

Vue.config.productionTip = false
import  navPage  from '@/components/paging';
import  enSearch from '@/components/home'
import  logoNav from '@/components/logoNav'
import pDet from '@/components/pdet'
import root from '@/components/root'
import fvip from '@/components/fvip'
import fcoll from '@/components/collect'
import bidlist from '@/components/bidlist'
import tenlist from '@/components/tenlist'
import qylist from '@/components/qylist'
import aptitude from '@/page/synth/aptitude'
import city from '@/components/bid/city'
import allCity from '@/components/bid/allCity'
import bur from '@/page/companys/bur'
import water from '@/page/companys/water'
import traffic from '@/page/companys/traffic'
import perpor from '@/page/perfor/perpor'
import money from '@/page/perfor/money'
import pertime from '@/page/perfor/pertime'

import comment from '@/page/comment/comment'
import reply from '@/page/user/reply'
import redit from '@/page/user/redit'

import usercenter from '@/components/user-center'














import {getOpenid,ThirdLogin,refresh} from "@/api/index"
Vue.component('nav-page', navPage)
Vue.component('en-search', enSearch)
Vue.component('logo-Nav', logoNav)
Vue.component('p-Det', pDet)
Vue.component('p-root', root)
Vue.component('f-vip', fvip)
Vue.component('f-coll', fcoll)
Vue.component('ten-list', tenlist)
Vue.component('bid-list', bidlist)
Vue.component('qy-list', qylist)
Vue.component('q-titu', aptitude)
Vue.component('c-ity', city)
Vue.component('all-city', allCity)
Vue.component('c-bur', bur)
Vue.component('c-water', water)
Vue.component('c-tra', traffic)
Vue.component('per-por', perpor)
Vue.component('m-oney', money)
Vue.component('per-time', pertime)
Vue.component('com-ment', comment)
Vue.component('re-ply', reply)
Vue.component('re-dit', redit)
Vue.component('user-center', usercenter)























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

// const _hmt = _hmt || [];
// window._hmt = _hmt;
// (function () {
//   const hm = document.createElement("script");
//   hm.src = "https://hm.baidu.com/hm.js?313616fb1dea0773694f4c657830d6cd";
//   const s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(hm, s);
// })();
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
    if(to.path=='/home'){
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
                localStorage.setItem('permissions',res.data.permissions);
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
    if(to.fullPath=='/logo'){
      sessionStorage.setItem('path',from.fullPath);
    }
    // _hmt.push(['_trackPageview', '/#' + to.fullPath]);
  }
  next();
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
