<template>
  <div id="app">
    <div class="app-header">
       <div class="contact">
          <div class="contact-l">
             <p class="left">
               您好,欢迎来到标大大
             </p>
             <p class="left">
               <i class="iconfont icon-dianhua1 left"></i>
                0731-85076077
             </p>
             <p class="left">
               <i class="iconfont icon-shouji left l-mobile"></i>
                下载APP
             </p>
             <p class="left">
               <i class="iconfont icon-lianxiren left"></i>
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
        <ul id="hd" >
            <li v-for="(el, i) of navlist" :key="i"  :class="i==tabNo?'current':''">
                  <div>
                    <i class="iconfont" :class="el.className"></i>
                    <span>{{el.name}}</span> 
                  </div>
            </li>
        </ul>
    </div>
    <div class="content">
         <router-view/>
    </div>
       

    <div class="footer">
        <div class="f-content">
            <div class="f-detail left">
                <div class="f-we">
                    <div>
                       联系我们
                    </div>
                    <div class="left f-call f-right">
                        <p>
                          <i class="iconfont icon-dianhua"></i>
                           <span>联系电话：0731-85076077</span>
                        </p>
                        <p>
                          <i class="iconfont icon-shijian"></i>
                           <span>服务时间：9：00-17：00</span>
                        </p>
                    </div>
                     <div class="left f-call">
                        <p>
                          <i class="iconfont icon-youxiang"></i>
                           <span>邮箱：hnsilita@163.com</span>
                        </p>
                        <p>
                          <i class="iconfont icon-dizhi"></i>
                           <span>地址：长沙市岳麓区杜鹃路768号</span>
                        </p>
                    </div>
                    <div class="file">
                       © 2017 思利他, Inc. All rights reserved  . 湘ICP备17019911号-1
                    </div>
                </div>
            </div>
            <div class="f-true right">

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
       navlist:[
        {
           name:'首页',
           className:'icon-qiyeguanli',
          to:'/'
        },
        {
           name:'中标',
           className:'icon-zhaobiaofei',
           to:'zhong',
        },
        {
           name:'招标',
           className:'icon-zhongbiao',
           to:'zhao',
        },
        {
           name:'企业',
           className:'icon-qiye',
           to:'qi',
        },
        {
           name:'诚信',
           className:'icon-chengxinfuwu',
           to:'chen',
        }
     ]
    }
  },
  methods: {

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
        width: 1120px;
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        line-height: 33px;
        font-weight: 400;
        .contact-l {
          p {
            margin-right: 30px;
            i {
              margin-right: 6px;
            }
            .l-mobile {
              font-size: 18px;
            }
          }
        }
        .contact-r {
          width: 500px;
          display: flex;
          align-items: center; 
          flex-direction:row-reverse;
          .line {
            width: 2px;
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
      width: 1120px;
      li {
        box-sizing: border-box;
        width: 20%;
        height: 50px;
        line-height: 50px;
        float: left;
        text-align: center;
        color: #fff;
        display: flex;
        align-items: center; 
        justify-content: center; 
        div {
          border-right: 1px solid #fff;
          font-size: 26px;
          width: 100%;
          height: 30px;
          line-height: 30px;
          display: flex;
          align-items: center; 
          justify-content: center; 
          i {
            color:#fff;
            margin-right: 14px; 
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
        background-color: #F49C17;
        border: none;
      }
      // div:hover {
      //   border: none;
      // }
      .current {
         background-color: #F49C17;
         div {
           border: none;
         }
      }
    }
  }
  .footer {
    height: 230px;
    width: 100%;
    // position: fixed;
    // z-index: 999;
    // bottom: 0;
    // left: 0;
    background-color: #666666;
    display: flex;
    justify-content: center; 
    .f-content {
       width: 1120px;
      //  border: 1px solid red;
       height: 100%;
       box-sizing: border-box;
       padding-top: 24px;
       .f-detail {
           width: 60%;
           height: 100%;
           border: 1px solid red;
           .f-we {
             padding-top: 23px;
             overflow: hidden;
            //  padding-bottom: 20px;
             font-size: 18px;
             color:#fff;
             p {
               display: flex;
               align-items: center;
               margin-bottom: 11px;
               i {
                 font-size: 20px;
                 margin-right: 10px;
               }
               span {
                 font-size: 14px;
               }
             }
             .f-call {
               margin-top: 15px;
             }
             .f-right {
               margin-right: 92px;
             }
             .file {
               margin-top: 108px;
               font-size: 12px;
             }
           }         
       }
       .f-true {
         width: 30%;
         height: 100%;
         border: 1px solid red;
       }
    }
  }
}
</style>
