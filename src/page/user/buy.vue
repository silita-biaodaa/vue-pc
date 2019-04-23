<template>
<div class="buy">
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
             <!-- <p class="left">
               <i class="iconfont icon-lianxiren left person"></i>
                关于我们
             </p> -->
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
              <el-dropdown  v-else trigger="click"   >
                 <span class="el-dropdown-link">
                   {{name}}<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                 </span>
                 <el-dropdown-menu slot="dropdown" style="z-index:2050" >
                   <el-dropdown-item @click.native="user()" >个人设置</el-dropdown-item>
                   <el-dropdown-item @click.native="tocol()" >我的关注</el-dropdown-item>
                   <el-dropdown-item @click.native="amend()" >修改密码</el-dropdown-item>
                   <el-dropdown-item @click.native="order()" >我的订单</el-dropdown-item>
                   <el-dropdown-item @click.native="quit()"  >退出登录</el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
             <div class="area">
               <i class="iconfont icon-dizhi"></i>
               <span @click="selfa" >{{source}}</span>
               <div class="se-area" v-show="isarea" >
                  <div class="a-line" v-for="(el,i) in allcity" :key="i"  >
                    <div class="allcity left" >
                      {{el.name}}:
                    </div>
                    <div class="left ">
                      <div class="district left" v-for="(el,i) in el.next" :key="i" @click="selarea(el)" >
                        {{el.name}}
                      </div>
                    </div>
                  </div>
               </div>
             </div>
          </div>
       </div>
     </div>
    <!--  -->
     <div class="buy-img" >
       <div class="img-vip">
         <img src="../../assets/img/pic-huiy.png@2x.png" alt="">
         <div class="img-title">
           V I P 会 员
         </div>
       </div>
     </div>
    
    <div class="buy-limit">
        <div class="buy-vip">
           <div class="buy-price" v-for="(el,i) in level" :key="i"   @click="how(el)" >
             <div class="price" :class="price == el.price ? 'current' : ''" >
                <span>{{el.price}}</span>/{{el.month}}月
             </div>
             <div >
               <div class="rate left">
                 {{el.rate}}折
               </div>
               <div class="right save">
                 可节省{{el.save}}元
               </div>
             </div>
           </div>

          <div class="buy-btn">
            立即开通
          </div>

        </div>
        <div class="buy-title">
            标大大会员 · 专享<span style="color:#FE0303" >8</span>大特权
        </div>
        <div class="buy-table">
          <div class="table-top">
            <div class="left" style="width:218px" >
              特权项目
            </div>
             <div class="left" style="width:680px" >
              特权介绍
            </div>
          </div>
          <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >高级筛选</p>
               <p class="buy-s" >(招标、中标、企业信息)</p>
            </div>
            <div class="left buy-p" style="width:680px" >
              1、会员可快速筛选招标公告的资质要求和评标办法。查找信息更加快速精准，2、可快速筛选中标公告的中标金额。查找信息更加快速精准。3、可快速筛选企业的资质、注册资金。查找信息更加快速精准。
            </div>
          </div>

          <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color"  style="position:relative" >综合查询 <span class="buy-new" >NEW</span></p>
            </div>
            <div class="left buy-p" style="width:680px" >
              可根据资质、业绩等多重筛选条件，查找到符合条件的企业。
            </div>
          </div>

          <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >企业联系电话</p>
               <p class="buy-s" >(限APP查看)</p>
            </div>
            <div class="left buy-p" style="width:680px" >
              可查看企业的全部联系号码。
            </div>
          </div>  
          
          <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >查在建功能</p>
               <p class="buy-s" >(限APP使用)</p>
            </div>
            <div class="left buy-p" style="width:680px" >
              可根据姓名和身份证号，精准查询湖南省内人员在建情况。
            </div>
          </div>  

         <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >在建库功能</p>
               <p class="buy-s" >(限APP使用)</p>
            </div>
            <div class="left buy-p" style="width:680px" >
              提供湖南省内注册人员在建信息查询，输入姓名一键查询。
            </div>
          </div>  

          <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >业绩信息</p>
               <p class="buy-s" >(限APP查看)</p>
            </div>
            <div class="left buy-p" style="width:680px" >
              包含全国住建部、交通部、水利部业绩，可根据地区、合同金额、日期、关键词快速查找业绩信息
            </div>
          </div>  

         <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >更多企业信息</p>
            </div>
            <div class="left buy-p" style="width:680px" >
              提供建筑业企业的工商、法务、资质、人员、业绩、中标项目、诚信等信息
            </div>
          </div>  

          <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >人员信息</p>
               <p class="buy-s" >(限APP查看)</p>
            </div>
            <div class="left buy-p" style="width:680px" >
              提供注册人员的押证项目、证书信息、个人业绩、变更记录、不良记录等信息，查找信息更加快速精准
            </div>
          </div>  

        </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      names:true,
       isarea:false,
     allcity:[
       {
         name:'华东',
         next:[{name:'上海'},{name:'江苏'},{name:'浙江'},{name:'安徽'},{name:'福建'},{name:'江西'},{name:'山东'}]
       },
       {
         name:'东北',
         next:[{name:'辽宁'},{name:'吉林'},{name:'黑龙江'}]
       }, 
        {
         name:'华中',
         next:[{name:'河南'},{name:'湖北'},{name:'湖南'}]
       },{
         name:'华北',
         next:[{name:'北京'},{name:'天津'},{name:'河北'},{name:'山西'},{name:'内蒙古'}]
       },{
          name:'华南',
          next:[{name:'广东'},{name:'广西'},{name:'海南'}]
       },
       {
         name:'西北',
         next:[{name:'陕西'},{name:'甘肃'},{name:'青海'},{name:'宁夏'},{name:'新疆'}]
       },
       {
         name:'西南',
         next:[{name:'重庆'},{name:'四川'},{name:'贵州'},{name:'云南'},{name:'西藏'}]
       },
     ],
     source:'湖南',
     level:[
       {
         price:'318',
         rate:'6.3',
         save:'182',
         month:'1'
       },
        {
         price:'898',
         rate:'6.0',
         save:'602',
         month:'3'
       },
        {
         price:'1498',
         rate:'5.0',
         save:'1502',
          month:'6'
       },
        {
         price:'2298',
         rate:'3.8',
         save:'3702',
         month:'12'
       }
     ],
     price:'318'
    }
  },
  methods: {
     jumpen() {
        this.$router.push('/enroll')
    },
     jumpl() {
         this.$router.push('/logo')
    },
      user() {
      this.$router.push('/user/pDet')
    },
    tocol() {
      this.$router.push('/user/fcoll')
    },
    amend() {
      this.$router.push('/user/root')
    },
    order() {
      this.$router.push('/user/order')
    },
    quit() {
        sessionStorage.removeItem('xtoken')
        localStorage.removeItem('Bname')
        localStorage.removeItem('Xtoken')
        localStorage.removeItem('valid')
        localStorage.removeItem('permissions')
          this.$router.replace({
           path: '/home',
           query: {
             t: Date.now()
           }
          })
    },
    selarea(el) {
      this.source = el.name 
      this.isarea = false
    },
    selfa() {
       this.isarea = !this.isarea
    },
    how(el) {
      this.price = el.price
    },
      judges() {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        this.name = localStorage.getItem('Bname')
        this.names = false
      } else {     
        this.names = true
      }
    },
  },
  created () {
    this.judges()
  },
  //  watch: {
  //   $route:{
  //     handler: function(val, oldVal){
  //       sessionStorage.setItem('pageNo',1)
  //       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
  //         this.name = localStorage.getItem('Bname')
  //         this.names = false
  //       } else {     
  //         this.names = true
  //       }
  //     },
  //   deep: true
  //   }
  // },
  components: {
  }
}
</script>
<style lang="less" scoped>
.buy {
  .se-area {
    height: 340px !important;
    bottom: -350px !important;
  }
  .buy-img {
    width: 100%;
    height: 250px;
    background: url(../../assets/img/pic-banner.png)  no-repeat;
    background-position: center;
    background-size: 100%;
    position: relative;
    .img-vip {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 307px;
      height: 78px;
      border-top-right-radius: 8px;
       border-top-left-radius: 8px;
      background-color: #FE6603;
      display: flex;
      align-items: center;
      flex-direction: column;
      img {
        margin: 5px 0;
      }
      .img-title {
        color: #fff;
      }
    }
  }
  .buy-limit {
    width: 1020px;
    margin: 0 auto;
    background-color: #fff;
    padding-bottom: 50px;
    margin-bottom: 200px;
    display: flex;
    align-items: center;
     flex-direction:column;
     .buy-vip {
       width: 307px;
      //  height: 100px;
       box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
       border-bottom-right-radius: 8px;
       border-bottom-left-radius: 8px;
       padding: 10px 20px  30px;
      //  padding-top: 10px;
       box-sizing: border-box;
       display: flex;
       flex-wrap: wrap;
       justify-content: space-between;
      //  height: 200px;
       .buy-price {
         cursor: pointer;
         margin-bottom: 15px;
         .price {
           width:120px;
           height:40px;
           line-height: 40px;
           text-align: center;
           border:1px solid #F2F2F2;
           border-radius:5px;
           color: #999;
           font-size: 14px;
           margin-bottom: 5px;
           span {
             color:#FE0303;
             font-size: 20px;
           }
         }
          .current {
         border: 1px solid #FE6603;
          }
         .rate {
           width: 40px;
           height: 14px;
           background-color: #FE6603;
           color:#fff;
           font-size: 10px;
           text-align: center;
           border-radius: 2px;
         }
         .save {
             color: #999;
             font-size: 8px;
         }
       }
      
       .buy-btn {
         cursor: pointer;
         width: 200px;
         line-height: 36px;
         text-align: center;
         color:#fff;
         font-size: 16px;
         background-color: #FE6603;
         margin:  0 auto;
         margin-top: 20px;
         border-radius: 8px;
       }
     }
    .buy-title {
      font-size: 24px;
      color:#333;
      font-weight: 500;
      margin: 25px 0;
    }
    .buy-table {
      width: 900px;
      border: 1px solid #F2F2F2;
      .table-top {
        height: 40px;
        line-height: 40px;
        background-color: #FE6603;
        font-size: 14px;
        color:#fff;
        text-align: center;
      }
      .table-or {
        height: 74px;
        font-size: 14px;
        color:#999;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #F2F2F2;
        // text-align: center;
        .buy-bor {
          border-right: 1px solid #F2F2F2;
          height: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          flex-direction:column;
          position: relative;
          .buy-new {
            font-size: 11px;
            color:#FE0303;
            font-weight: 550;
            position: absolute;
            right: 35%;
            transform: translateX(100%);
            top: 0px;
          }
          .buy-s {
          font-size: 12px;
        }
        }
        .buy-p {
          padding: 0 20px;
        }
      }
    }

  }
}
</style>