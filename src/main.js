// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
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




const _hmt = _hmt || [];
window._hmt = _hmt;
(function () {
  const hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?313616fb1dea0773694f4c657830d6cd";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

router.beforeEach((to, from, next) => {
  // if (to.name == 'icbc' || to.name == 'notice' || to.name == 'article' ) {
  //     alert(1111)
  //  }
  
  if (to.path) {
      console.log(1111111111);
      
    _hmt.push(['_trackPageview', '/#' + to.fullPath]);
    
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
