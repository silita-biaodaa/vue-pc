<template>
  <div id="app">
    <div class="fixation" v-show="excom" >
      <div class="app-header">
       <div class="contact">
          <div class="contact-l">
             <p class="left">
               您好,欢迎来到标大大!
             </p>
             <p class="left">
               <i class="iconfont icon-dianhua1 left calling"></i>
                0731-85076077
             </p>
             <router-link :to="{path:'/download'}" tag="a" target='_blank' class="left">
               <i class="iconfont icon-shouji left l-mobile"></i>
                下载APP
             </router-link>
             <p class="left">
               <i class="iconfont icon-lianxiren left person"></i>
                关于我们
             </p>
          </div>
          <div class="contact-r">
            
            <p @click="jumpen" v-if="names"  >
              免费注册
            </p>
            <p class="line" v-if="names" >
             </p>
             <p @click="jumpl" v-if="names" >
               请登录
             </p>
             <!-- <p @click="touser" >
               
             </p> -->
              <el-dropdown  v-else trigger="click" >
                 <span class="el-dropdown-link">
                   {{name}}<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                 </span>
                 <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item @click.native="user()" >个人设置</el-dropdown-item>
                   <!-- <el-dropdown-item @click.native="amend()" >修改密码</el-dropdown-item> -->
                   <el-dropdown-item @click.native="quit()"  >退出登录</el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
             <!-- <p class="area">
               <i class="iconfont icon-dizhi"></i>
              湖南
             </p> -->
             
          </div>
       </div>
        </div>
        <div class="nav" >
        <ul  >
            <router-link v-for="(el, i) in navlist" :key="i"  :class="i==tabNo?'current':''" :to="{path: el.to}" tag="li">
                  <div>
                    <img :src="el.url" >
                    <span class="left">{{el.name}}</span> 
                  </div>
            </router-link>
            <!-- <li>
              <div @click="jumpto" >
                <span>
                  旧版本
                </span>
              </div>
            </li> -->
        </ul>
        </div>
    </div>
    

    <div class="content">
         <router-view :state='source' />
    </div>

    <div class="footer "  v-show="exploit" :class=" judbt ? 'f-btt' : '' "  >
        <div class="f-content">
            <div class="f-detail left">
                <div class="f-we">
                    <div class="left ">
                      <img src="./assets/img/pic-erweima.png" alt="" class="new-img">
                      <div class="Qrcode">扫一扫，下载APP</div>                      
                    </div>
                    <div class="left ma-16">
                      <img src="./assets/img/accounts.png" alt="">
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
      isshow:true,
      // rear:true,
        names:true,
       navlist:[
        {
           name:'首页',
           url:require('./assets/img/icon-shouy.png'),
           to:'/'
        },
         {
           name:'招标',
           url:require('./assets/img/icon-zhaob.png'),
           to:'/bid',
        },
        {
           name:'中标',
           url:require('./assets/img/icon-zhongb.png'),
           to:'/tender',
        },
        {
           name:'企业',
           url:require('./assets/img/icon-qiy.png'),
           to:'/company',
        }
        // {
        //    name:'诚信',
        //    url:require('./assets/img/icon-chengx.png'),
        //    to:'/faith',
        // }
     ],
     rank:0,
     way:'/bid',
     source:'湖南',
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
     select:'',
     name:'?'
    }
  },
  methods: {
    judge(){
      console.log(this.$route,1)
    },
    jumpto() {
      window.open('http://old.biaodaa.com','_bleak')
    },
    jumpl() {
         this.$router.push('/logo')
    },
    jumpen() {
        this.$router.push('/enroll')
    },
    judges() {
       if(localStorage.getItem('Bname')) {
        this.name = localStorage.getItem('Bname')
        this.names = false
      } else {     
        this.names = true
      }
    },
    touser() {
      this.$router.push('/user')
    },
    amend() {
      this.$router.push('/find')
    },
    quit() {
        sessionStorage.removeItem('xtoken')
        localStorage.removeItem('Bname')
        localStorage.removeItem('Authorization')
          this.$router.replace({
           path: '/home',
           query: {
             t: Date.now()
           }
          })
    },
    user() {
      this.$router.push('/user')
    }
  },
  created () {
    this.judges()
    this.judge()
  },
  watch: {
    $route:{
      handler: function(val, oldVal){
          if(localStorage.getItem('Bname')) {
           this.name = localStorage.getItem('Bname')
           this.names = false
         } else {     
           this.names = true
         }
      },
    deep: true
    }
  },
  computed: {
    tabNo(){
      let t=this.$route.meta.tabNo;
      return t
    },
    // 底部是否消失
    exploit() {
      if(this.$route.name == 'download' ||  this.$route.name == 'logo' || this.$route.name == 'enroll'  ) {
        return false
      } else {
        return true
      }
    },
    // 顶部是否消失
    excom() {
      if(this.$route.name == 'download' || this.$route.name == 'logo' ||  this.$route.name == 'enroll' ||  this.$route.name == 'find' || this.$route.name == 'user') {
        return false
      } else {
        return true
      }
    },
    // 是否固定在底部
    judbt() {
      if(this.$route.name == 'find') {
        return true
      } else {
        return false
      }
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
    // position: absolute;
    // position: absolute ;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // height: calc(~"100% - 195px");
    // display: flex;
    // justify-content: center; 
  }
  .fixation {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%;
  }
  .app-header { 
    width: 100%;
    justify-content: center; 
    display: flex;
    // cursor: pointer;
    background-color: #fff;
     .contact {
        height: 33px;
        width: 1020px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        background-color: #fff;
        font-weight: 400;
        .contact-l {
          a,p {
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
          p {
            cursor: pointer;
          }
          .line {
            width: 1px;
            height: 12px;
            background-color: #939392;
            margin: 0 15px;
          }
          .area{
            margin-right: 20px;
            color:#FE6603;
            font-weight: 500;
            display: flex;
            align-items: center;
            i {
              font-size: 16px;
              font-weight: 600;
            }
          }
        }
     }
  }
 
  .nav {
    background-color: #EC7522;
    height: 50px;
    justify-content: center; 
    display: flex;
    cursor: pointer;
    align-items: center; 
    ul {
      min-width: 1020px;
      box-sizing: border-box;
      li {
        box-sizing: border-box;
        width: 25%;
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
  .f-btt {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .footer {
    height: 195px;
    width: 100%;
    background-color: #666666;
    display: flex;
    justify-content: center; 
    .f-content {
       width: 1020px;
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
             .new-img {
               width: 113px;
               height: 113px;
             }
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
