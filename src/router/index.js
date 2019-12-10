import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/index'
import Bid from '@/page/bid'
import Tender from '@/page/tender'
import Faith from '@/page/faith'
import Article from '@/page/article'
import Company from '@/page/company'
import Notice from '@/page/notice'
const Introduce = resolve => require(['@/page/introduce'], resolve)
const Icbc = resolve => require(['@/page/companys/icbc'], resolve)
const Personnel = resolve => require(['@/page/companys/personnel'], resolve)
const Intell = resolve => require(['@/page/companys/intelligence'], resolve)
const Law = resolve => require(['@/page/companys/law'], resolve)
const Good = resolve => require(['@/page/companys/sincerity'], resolve)




// import Introduce from '@/page/introduce'
// import Icbc from '@/page/companys/icbc'
// import Personnel from '@/page/companys/personnel'
// import Intell from '@/page/companys/intelligence'
// import Law from '@/page/companys/law'
// import Good from '@/page/companys/good'
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
import info from '@/page/user/info'
// import buy from '@/page/user/buy'
const buy = resolve => require(['@/page/user/buy'], resolve)


import user from '@/page/user/user'
import order from '@/page/user/order'
import pDet from '@/components/pdet'
import root from '@/components/root'
import fcoll from '@/components/collect'
 
import about from '@/page/About'    // 关于我们

// import synth from '@/page/synth/synth'    // 综合查询
// import result from '@/page/synth/result'    // 综合查询
// import query from '@/page/synth/query' 
// import hist from '@/page/synth/history' 

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
import certifi from '@/page/build/certifi' 

import crew from '@/page/people/crew' 
import personnel from '@/page/people/Personnel' 
import sign from '@/page/people/sign' 
import privates from '@/page/people/private' 
import dys from '@/page/people/dys' 
import modify from '@/page/people/modify' 
import escort from '@/page/people/escort' 

// import lawList from '@/page/law'//法务列表
import lawDetail from '@/page/lawDetail'//法务详情

import annualDetail from '@/components/business/annualDetail'

import feedback from '@/page/feedback'//意见反馈
import publicity from '@/page/publicity'//平台公示列表
import information from '@/page/information'//相关资讯列表
import detail from '@/page/detail'//相关资讯及平台公示详情
import novice from '@/page/novice' //新手指引
import novice1 from '@/page/novice/1' //新手指引1
import novice2 from '@/page/novice/2' //新手指引2
import novice3 from '@/page/novice/3' //新手指引2
import novice4 from '@/page/novice/4' //新手指引2
import novice5 from '@/page/novice/5' //新手指引2
//专查
import ZJquery from '@/page/query/ZJquery'//住建查询
import GLquery from '@/page/query/GLquery'//公路查询
import SLquery from '@/page/query/SLquery'//水利查询
import queryList from '@/page/query/queryList'//查询结果列表
import queryDetail from '@/page/query/queryDetail'//查询结果详情
import queryPay from '@/page/query/queryPay'//查询支付页
//重庆专查
import qyDetail from '@/page/customize/qydetail'//企业详情页
import ryDetail from '@/page/customize/rydetail'//人员详情页
//404
import error from'@/page/404'
// escort
//活动
// import hdDetail from'@/page/hdDetail'
//重庆版综合查询;
import screenPage from '@/page/customize/screenPage'

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
      path: '/bid',  // 招标
      name: 'bid',
      component: Bid,
      meta: {
        tabNo: 1
      }
    },
    {
      path: '/tender',  // 中标
      name: 'tender',
      component: Tender,
      meta: {
        tabNo: 2
      }
    },
    // {
    //   path: '/law',  // 法务
    //   name: 'law',
    //   component: lawList,
    //   meta: {
    //     tabNo: 7
    //   }
    // },
    {
      path: '/article',  // 招标详情
      name: 'article',
      component: Article,
      meta: {
        tabNo: 1
      }
    },
    {
      path: '/company',  // 企业
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
          path: 'perlist',  // 业绩住建部
          name: 'perlist',
          component: perlist,
          meta: {
            i: 0,
            tabNo: 4
          }
        },
        { 
          path: 'water',  // 业绩水利部
          name: 'water',
          component: perwater,
          meta: {
            i: 1,
            tabNo: 4
          }
        },
        {
          path: 'road',  // 业绩交通部
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
      path: '/notice',  // 中标详情
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
      meta: {
        tabNo: 3
      },
      children: [
        {
          path: 'icbc',  // 企业工商
          name: 'icbc',
          component: Icbc,
          meta: {
            i: 0,
            tabNo: 3
          }
        },
        {
          path: 'personnel',  // 企业人员
          name: 'personnel',
          component: Personnel,
          meta: {
            i: 3,
            tabNo: 3
          }
        },
        {
          path: 'intell',  // 企业资质
          name: 'intell',
          component: Intell,
          meta: {
            i: 2,
            tabNo: 3
          }
        },
        {
          path: 'law',    // 企业法务
          name: 'law',
          component: Law,
          meta: {
            i: 1,
            tabNo: 3
          }
        },
        {
          path: 'good',  // 企业诚信
          name: 'good',
          component: Good,
          meta: {
            i: 6,
            tabNo: 3
          }
        },
        {
          path: 'centre',  // 企业业绩
          name: 'centre',
          component: Centre,
          meta: {
            i: 4,
            tabNo: 3
          }
        },
        {
          path: 'achievement',   // 企业中标
          name: 'achievement',
          component: Achievement,
          meta: {
            i: 5,
            tabNo: 3
          }
        }

      ],
     
    },
    {
      path: '/conform',  // 招标详情符合资质企业
      name: 'conform',
      component: Conform
    },
    {
      path: '/download', // 下载页面
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
      path: '/logo',   // 登录
      name: 'logo',
      component:logo
    },
    {
      path: '/enroll',  // 注册
      name:'enroll',
      component: enroll
    },
    {
      path: '/protocol',  // 注册协议
      name: 'protocol',
      component: protocol
    },
     {
       path: '/find',  // 找回密码
       name:'find',
       component: find
     },
      {
        path: '/bound',  // 绑定手机
        name: 'bound',
        component: bound
      },
      {
        path: '/about',  // 关于我们
        name: 'about',
        component: about
      },
      {
        path: '/user',  // 个人中心
        name:'user',
        component: user,
        redirect: '/user/pDet',
        children: [
          {
            path: 'pDet',  // 个人信息
            name: 'pDet',
            component: pDet,
            meta: {
              i: 0
            }
          },
          {
            path: 'root',  // 修改密码
            name: 'root',
            component: root,
            meta: {
              i: 3
            }
          },
          {
            path: 'fcoll',  // 我的关注
            name: 'fcoll',
            component: fcoll,
            meta: {
              i: 2
            }
          },
          {   // 订单页面
            path: 'order',
            name: 'order',
            component: order,
            meta: {
              i: 4
            }
          },
          {   // 信息页面
            path: 'info',
            name: 'info',
            component: info,
            meta: {
              i: 1
            }
          }
        ] 
      },
      // {   // 综合查询页面
      //   path: '/synth',
      //   name: 'synth',
      //   component: synth,
      //   redirect: '/synth/query',
      //   children: [
      //     {
      //       path: 'query',  // 综合查询页面
      //       name: 'query',
      //       component: query,
      //       meta: {
      //         tabNo: 3
      //       }
      //     },
      //     {
      //       path: 'hist',  // 历史订单
      //       name: 'hist',
      //       component: hist,
      //       meta: {
      //         tabNo: 3
      //       }
      //     }
      //   ], 
      
      // },
      // {   // 综合查询结果页面
      //   path: '/result',
      //   name: 'result',
      //   component: result,
      //   meta: {
      //     tabNo: 3
      //   }
      // },
    {  //  会员购买页面
      path: '/buy',
      name: 'buy',
      component: buy,
    },
    {
      path: '/irrigation',  //  水利详情
      name:'irrigation',
      component: irrigation,
      meta: {
        tabNo: 4
      }
    },
    {
      path: '/traffic',  //  交通详情
      name: 'traffic',
      component: traffic,
      meta: {
        tabNo: 4
      }
    },
    {
      path: '/urban',  //  住建部详情
      name:'urban',
      component: urban,
      redirect: '/urban/ubid',
      meta: {
        tabNo: 4
      },
      children: [
        {
          path: 'ubid',  // 招投标
          name: 'ubid',
          component: ubid,
          meta: {
            i: 0,
            tabNo: 4
          }
        },
        {
          path: 'execu',  // 施工图
          name: 'execu',
          component: uexe,
          meta: {
            i: 2,
            tabNo: 4
          }
        },
        {
          path: 'upact',  // 合同备案
          name: 'upact',
          component: upact,
          meta: {
            i: 4,
            tabNo: 4
          }
        },
        {
          path: 'uallow',  // 施工许可
          name: 'uallow',
          component: uallow,
          meta: {
            i: 6,
            tabNo: 4
          }
        },
        {
          path: 'ulete',  // 竣工
          name: 'ulete',
          component: ulete,
          meta: {
            i: 8,
            tabNo: 4
          }
        },
      ]  
    },
    {
      path:'/build',  // 在建
      name:'build',
      component: build,
      meta: {
        tabNo: 6
      }
    },
    {
      path: '/certifi',   // 在建详情
      name: 'certifi',
      component: certifi,
      meta: {
        tabNo: 6
      }
    },
    {
      path: '/crew',   // 人员
      name: 'crew',
      component: crew,
      meta: {
        tabNo: 5
      }
    },
    {
      path: '/personnel',    // 人员详情
      name: 'personnel',
      component: personnel,
      redirect: '/personnel/sign',
      children: [
        {
          path: 'sign',  // 注册证书
          name: 'sign',
          component: sign,
          meta: {
            i: 0,
            tabNo: 5
          }
        },
        {
          path: 'private',  // 个人业绩
          name: 'private',
          component: privates,
          meta: {
            i: 1,
            tabNo: 5
          }
        },
        {
          path: 'dys', // 不良记录
          name: 'dys',
          component: dys,
          meta: {
            i: 2,
            tabNo: 5
          }
        },
        {
          path: 'modify',  // 变更记录
          name: 'modify',
          component: modify,
          meta: {
            i: 3,
            tabNo: 5
          }
        },
        {
          path: 'escort',  // 押证详情
          name: 'escort',
          component: escort,
          meta: {
            i: 4,
            tabNo: 5
          }
        },
      ]  
    },
    {
      path: '/lawDetail',  // 法务详情
      name: 'lawDetail',
      component: lawDetail,
      meta: {
        tabNo: 7
      }
    },
    {//年报详情
      path:'/annualDetail',
      name:'annualDetail',
      component:annualDetail,
    },{//意见反馈
      path:'/feedback',
      name:'feedback',
      component:feedback
    },{//平台公示
      path:'/publicity',
      name:'publicity',
      component:publicity
    },{//相关资讯
      path:'/information',
      name:'information',
      component:information
    },{//相关资讯及平台公示详情
      path:'/detail',
      name:'detail',
      component:detail
    },{//新手指引
      path:'/novice',
      name:'novice',
      component:novice,
      redirect: '/novice/1',
      children:[
        {
          path:'1',
          name:'novice',
          component:novice1,
          meta:{
            i:0
          }
        },{
          path:'2',
          name:'novice',
          component:novice2,
          meta:{
            i:1
          }
        },{
          path:'3',
          name:'novice',
          component:novice3,
          meta:{
            i:2
          }
        },{
          path:'4',
          name:'novice',
          component:novice4,
          meta:{
            i:3
          }
        },{
          path:'5',
          name:'novice',
          component:novice5,
          meta:{
            i:4
          }
        }
      ]
    },{//住建专查
      path:'/ZJquery',
      name:'ZJquery',
      component:ZJquery
    },{//公路专查
      path:'/GLquery',
      name:'GLquery',
      component:GLquery
    },{//水利专查
      path:'/SLquery',
      name:'SLquery',
      component:SLquery
    },{//查询列表
      path:'/queryList',
      name:'queryList',
      component:queryList
    },{//查询详情
      path:'/queryDetail',
      name:'queryDetail',
      component:queryDetail
    },{//专查支付
      path:'/queryPay',
      name:'queryPay',
      component:queryPay
    },{//重庆专查企业详情
      path:'/companyDetail',
      name:'companyDetail',
      component:qyDetail
    },{//重庆专查人员详情
      path:'/peopleDetail',
      name:'peopleDetail',
      component:ryDetail
    },
    {//404
      path:'*',
      name:'error',
      component:error
    },
    {//综合查询
      path:'/screenPage',
      name:'screenPage',
      component:screenPage
    },
    
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
	}
})

// sign
// 模板
//  {
//    path:'/',
//    name:'',
//    component:
//  }