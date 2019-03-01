<template>
  <div id="app">
    <div class="app-header">
       <div class="contact">
          <div class="contact-l">
             <p class="left">
               您好,欢迎来到标大大
             </p>
             <p class="left">
               <i class="iconfont icon-dianhua1 left calling"></i>
                0731-85076077
             </p>
             <p class="left">
               <i class="iconfont icon-shouji left l-mobile"></i>
                下载APP
             </p>
             <p class="left">
               <i class="iconfont icon-lianxiren left person"></i>
                关于我们
             </p>
          </div>
          <div class="contact-r">
            <p>
              免费注册
            </p>
            <p class="line">
             </p>
             <p>
              请登录
             </p>
             
          </div>
       </div>
    </div>
    <div class="nav">
        <ul  >
            <router-link v-for="(el, i) in navlist" :key="i"  :class="i==tabNo?'current':''" :to="{path: el.to}" tag="li">
                  <div>
                    <img :src="el.url" >
                    <span class="left">{{el.name}}</span> 
                  </div>
            </router-link>
        </ul>
    </div>



    <div class="content">
         <router-view/>
    </div>

    <div class="footer">
        <div class="f-content">
            <div class="f-detail left">
                <div class="f-we">
                    <div class="left">
                      <img src="./assets/img/pic-erweima.png" alt="">
                      <div class="Qrcode">扫一扫，下载APP</div>                      
                    </div>
                    <div class="left ma-16">
                      <img src="./assets/img/pic-erweima.png" alt="">
                      <div class="Qrcode">关注公众号</div>                      
                    </div>
                    <div class="left f-call ma-29">
                        <p>
                          <i class="iconfont icon-dianhua"></i>
                           <span>联系电话：0731-85076077</span>
                        </p>
                        <p>
                          <i class="iconfont icon-linedesign-04"></i>
                           <span>服务时间：9：00-17：00</span>
                        </p>
                        <p>
                          <i class="iconfont icon-youxiang"></i>
                           <span>邮箱：hnsilita@163.com</span>
                        </p>
                        <p>
                          <i class="iconfont icon-dizhi"></i>
                           <span>地址：湖南省长沙市岳麓区杜鹃路768号金峰壹号院</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="f-true right">
              <div class="logo">
                <img src="./assets/img/logo.png" class="right">
              </div>
              <p class="right top-60">
                © 2017 思利他, Inc. All rights reserved . 湘ICP备17019911号-1
              </p>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show:true,
       navlist:[
        {
           name:'首页',
           url:require('./assets/img/icon-shouy.png'),
           to:'/'
        },
        {
           name:'中标',
           url:require('./assets/img/icon-zhongb.png'),
           to:'/tender',
        },
        {
           name:'招标',
           url:require('./assets/img/icon-zhaob.png'),
           to:'/bid',
        },
        {
           name:'企业',
           url:require('./assets/img/icon-qiy.png'),
           to:'/company',
        },
        {
           name:'诚信',
           url:require('./assets/img/icon-chengx.png'),
           to:'/faith',
        }
     ],
     rank:0,
     way:'/bid',
     selects:[
         {
           name:'招标',
           to:'/bid',
           i: 0
         },
         {
           name:'中标',
           to:'/tender',
           i: 1
         },
         {
           name:'企业',
           to:'/company',
           i: 2
         },
         {
           name:'诚信',
           to:'/faith',
           i: 3
         },
       ],
     select:''
    }
  },
  methods: {
    judge(){
      console.log(this.$route,1)
    },
  },

  created () {

  },
  computed: {
    tabNo(){
      let t=this.$route.meta.tabNo;
      return t
    }
  },
}
</script>

<style lang="less">
@import './style/common';
@import './assets/iconfont.css';
#app {
  background-color: #FAFAFA;
  .content {
    width: 100%;
    display: flex;
    justify-content: center; 
  }
  .app-header { 
    width: 100%;
    justify-content: center; 
    display: flex;
     .contact {
        height: 33px;
        width: 960px;
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        line-height: 33px;
        font-weight: 400;
        .contact-l {
          p {
            margin-right: 25px;
            color: #666;
            i {
              margin-right: 6px;
            }
            .l-mobile {
              font-size: 16px;
            }
            .calling {
              font-size: 16px;
            }
            .person {
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
        .contact-r {
          width: 400px;
          display: flex;
          align-items: center; 
          flex-direction:row-reverse;
          .line {
            width: 1px;
            height: 12px;
            background-color: #939392;
            margin: 0 15px;
          }
        }
     }
  }
 
  .nav {
    background-color: #EC7522;
    height: 50px;
    justify-content: center; 
    display: flex;
    align-items: center; 
    ul {
      width: 1020px;
      li {
        box-sizing: border-box;
        width: 20%;
        height: 50px;
        line-height: 50px;
        float: left;
        color: #fff;
        display: flex;
        align-items: center; 
        justify-content: center; 
        div {
          border-right: 1px solid #fff;
          font-size: 26px;
          width: 100%;
          height: 35px;
          line-height: 35px;
          display: flex;
          align-items: center; 
          justify-content: center;
          img {
            margin-right: 10px;
          }
          span {
            font-size: 18px;
          }
        }
      }
      li:last-child  div {
        border: none;
      }
      li:hover,
      li:hover div {
        background-color: #FF8400;
        border: none;
      }
      .current {
         background-color: #F49C17;
         div {
           border: none;
         }
      }
    }
  }
  .footer {
    height: 195px;
    width: 100%;
    background-color: #666666;
    display: flex;
    justify-content: center; 
    .f-content {
       width: 960px;
       height: 100%;
       box-sizing: border-box;
       padding-top: 26px;
       .f-detail {
           width: 60%;
           height: 100%;
           .f-we {
             overflow: hidden;
             font-size: 18px;
             color:#fff;
             .Qrcode {
               font-size: 12px;
               color: #FE6603;
               text-align: center;
             }
             .ma-16 {
               margin-left: 16px;
             }
             p {
               display: flex;
               align-items: center;
               margin-bottom: 11px;
               i {
                 font-size: 16px;
                 margin-right: 10px;
               }
               span {
                 font-size: 12px;
               }
             }
             .f-call {
               margin-top: 12px;
             }
             .ma-29 {
               margin-left: 29px;
             }
             .file {
               margin-top: 108px;
               font-size: 12px;
             }
           }         
       }
       .f-true {
         width: 39%;
         height: 100%;
         box-sizing: border-box;
         .logo {
           margin-top: 14px;
         }
         .top-60 {
           margin-top: 60px;
           font-size: 12px;
           color: #eee;
         }
       }
    }
  }
}
</style>
