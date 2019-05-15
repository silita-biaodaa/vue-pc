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
import enroll from '@/page/enroll'
import protocol from '@/page/protocol'
import find from '@/page/user/find'
import bound from '@/page/user/bound'
import buy from '@/page/user/buy'


import user from '@/page/user/user'
import order from '@/page/user/order'
import pDet from '@/components/pdet'
import root from '@/components/root'
import fcoll from '@/components/collect'
 
import about from '@/page/About'    // 关于我们

import synth from '@/page/synth/synth'    // 综合查询
import result from '@/page/synth/result'    // 综合查询
import query from '@/page/synth/query' 
import hist from '@/page/synth/history' 

import perfor from '@/page/perfor/perfor' 
import perlist from '@/page/perfor/perlist'
import perwater from '@/page/perfor/perwater'
import road from '@/page/perfor/road'
import irrigation from '@/page/perfor/wdetail'
import traffic from '@/page/perfor/traffic'
import urban from '@/page/perfor/urban'
import ubid from '@/page/perfor/ubid'
import uexe from '@/page/perfor/uexe'
import upact from '@/page/perfor/upact'
import uallow from '@/page/perfor/uallow'
import ulete from '@/page/perfor/ulete'

import build from '@/page/build/build' 
















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
      component: Article,
      meta: {
        tabNo: 1
      }
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
      path: '/perfor',
      name: 'perfor',
      component: perfor,
      redirect: '/perfor/perlist',
      children: [
        {
          path: 'perlist',
          name: 'perlist',
          component: perlist,
          meta: {
            i: 0,
            tabNo: 4
          }
        },
        {
          path: 'water',
          name: 'water',
          component: perwater,
          meta: {
            i: 1,
            tabNo: 4
          }
        },
        {
          path: 'road',
          name: 'road',
          component: road,
          meta: {
            i: 2,
            tabNo: 4
          }
        },
      
      ] 
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice,
      meta: {
        tabNo: 2
      }
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

      ],
     
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
      name: 'logo',
      component:logo
    },
    {
      path:'/enroll',
      name:'enroll',
      component: enroll
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: protocol
    },
     {
       path:'/find',
       name:'find',
       component: find
     },
      {
        path: '/bound',
        name: 'bound',
        component: bound
      },
      {
        path: '/about',
        name: 'about',
        component: about
      },
      {
        path:'/user',
        name:'user',
        component: user,
        redirect: '/user/pDet',
        children: [
          {
            path: 'pDet',
            name: 'pDet',
            component: pDet,
            meta: {
              i: 0
            }
          },
          {
            path: 'root',
            name: 'root',
            component: root,
            meta: {
              i: 2
            }
          },
          {
            path: 'fcoll',
            name: 'fcoll',
            component: fcoll,
            meta: {
              i: 1
            }
          },
          {   // 订单页面
            path: 'order',
            name: 'order',
            component: order,
            meta: {
              i: 3
            }
          }
        ] 
      },
      {   // 综合查询页面
        path: '/synth',
        name: 'synth',
        component: synth,
        redirect: '/synth/query',
        children: [
          {
            path: 'query',
            name: 'query',
            component: query,
            meta: {
              tabNo: 3
            }
          },
          {
            path: 'hist',
            name: 'hist',
            component: hist,
            meta: {
              tabNo: 3
            }
          }
        ], 
      
      },
      {   // 综合查询结果页面
        path: '/result',
        name: 'result',
        component: result,
        meta: {
          tabNo: 3
        }
      },
    {  //  会员购买页面
      path: '/buy',
      name: 'buy',
      component: buy,
    },
    {
      path:'/irrigation',
      name:'irrigation',
      component: irrigation
    },
    {
      path: '/traffic',
      name: 'traffic',
      component: traffic
    },
    {
      path:'/urban',
      name:'urban',
      component: urban,
      redirect: '/urban/ubid',
      children: [
        {
          path: 'ubid',  // 招投标
          name: 'ubid',
          component: ubid,
          meta: {
            i: 0
          }
        },
        {
          path: 'execu',  // 施工图
          name: 'execu',
          component: uexe,
          meta: {
            i: 2
          }
        },
        {
          path: 'upact',  // 合同备案
          name: 'upact',
          component: upact,
          meta: {
            i: 4
          }
        },
        {
          path: 'uallow',  // 施工许可
          name: 'uallow',
          component: uallow,
          meta: {
            i: 6
          }
        },
        {
          path: 'ulete',  // 竣工
          name: 'ulete',
          component: ulete,
          meta: {
            i: 8
          }
        },
      ]  
    },
    {
      path:'/build',
      name:'build',
      component: build,
      meta: {
        tabNo: 6
      }
    }
  ]
})


// 模板
//  {
//    path:'/',
//    name:'',
//    component:
//  }