import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/index'
import Bid from '@/page/bid'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { 
        tabNo: 0
       }
    },
    {
      path:'/bid',
      name:'bid',
      component:Bid
    }
  ]
})
