import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/index'
import Bid from '@/page/bid'
import Tender from '@/page/tender'
import Faith from '@/page/faith'
import Article from '@/page/article'
import Company from '@/page/company'
import Notice from '@/page/notice'


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
      component:Bid,
      meta: {
        tabNo: 2
      }
    },
    {
      path: '/tender',
      name: 'tender',
      component: Tender,
      meta: {
        tabNo: 1
      }
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/company',
      name: 'company',
      component: Company,
      meta: {
        tabNo: 3
      }
    },
    {
      path: '/faith',
      name: 'faith',
      component: Faith,
      meta: {
        tabNo: 4
      }
    },
    {
      path:'/notice',
      name:'notice',
      component:Notice
    }
  ]
})
