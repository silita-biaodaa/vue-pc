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

Vue.config.productionTip = false
import  navPage  from '@/components/paging';
import  enSearch from '@/components/home'
Vue.component('nav-page', navPage)
Vue.component('en-search', enSearch)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
