import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/index'
import Bid from '@/page/bid'
import Tender from '@/page/tender'
import Faith from '@/page/faith'
import Article from '@/page/article'
import Company from '@/page/company'
import Notice from '@/page/notice'
import Introduce from '@/page/introduce'
import Icbc from '@/page/companys/icbc'
import Personnel from '@/page/companys/personnel'
import Intell from '@/page/companys/intelligence'
import Law from '@/page/companys/law'
import Good from '@/page/companys/good'
import Centre from '@/page/companys/centre'
import Achievement from '@/page/companys/achievement'
import Conform from '@/page/conform'
import Download from '@/page/Download'
import zhong from '@/page/zong/zhong'
import hlist from '@/page/zong/home'
import logo from '@/page/logo'











Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path:'/home',
      name: 'home',
      component:Home,
      meta: {
        tabNo: 0
      }
    },
    {
      path: '/bid',
      name: 'bid',
      component: Bid,
      meta: {
        tabNo: 1
      }
    },
    {
      path: '/tender',
      name: 'tender',
      component: Tender,
      meta: {
        tabNo: 2
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
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: Introduce,
      redirect: '/introduce/icbc',
      children: [
        {
          path: 'icbc',
          name: 'icbc',
          component: Icbc,
          meta: {
            i: 0
          }
        },
        {
          path: 'personnel',
          name: 'personnel',
          component: Personnel,
          meta: {
            i: 3
          }
        },
        {
          path: 'intell',
          name: 'intell',
          component: Intell,
          meta: {
            i: 2
          }
        },
        {
          path: 'law',
          name: 'law',
          component: Law,
          meta: {
            i: 1
          }
        },
        {
          path: 'good',
          name: 'good',
          component: Good,
          meta: {
            i: 6
          }
        },
        {
          path: 'centre',
          name: 'centre',
          component: Centre,
          meta: {
            i: 4
          }
        },
        {
          path: 'achievement',
          name: 'achievement',
          component: Achievement,
          meta: {
            i: 5
          }
        }

      ]
    },
    {
      path: '/conform',
      name: 'conform',
      component: Conform
    },
    {
      path: '/download',
      component: Download,
      name: 'download'
    },
    {
      path: '/zhong',
      component: zhong,
      name: 'zhong'
    },
    {
      path: '/dalist',
      component: hlist,
      name: 'dalist'
    },
    {
      path:'/logo',
      name:logo,
      component:logo
    }
  ]
})
