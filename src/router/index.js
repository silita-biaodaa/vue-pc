import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/index'
import Bid from '@/page/bid'
import Article from '@/page/article'
import Company from '@/page/company'





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
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/company',
      name: 'company',
      component: Company
    }
  ]
})
