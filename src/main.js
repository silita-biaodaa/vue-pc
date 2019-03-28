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
Vue.component('nav-page', navPage)
Vue.component('en-search', enSearch)
Vue.component('logo-Nav', logoNav)



const _hmt = _hmt || [];
window._hmt = _hmt;
(function () {
  const hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?313616fb1dea0773694f4c657830d6cd";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

router.beforeEach((to, from, next) => {
  if (to.path) {
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
