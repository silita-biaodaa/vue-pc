// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import moment from 'moment'
Vue.prototype.$moment = moment;
import router from './router'
import 'babel-polyfill'

Vue.config.productionTip = false
import  navPage  from '@/components/paging';
import  enSearch from '@/components/home'
Vue.component('nav-page', navPage)
Vue.component('en-search', enSearch)


const _hmt = _hmt || [];
window._hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?610e6c0550c79cf8f254f46b0e5c2434";
  var s = document.getElementsByTagName("script")[0];
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
