<template>
   <div class="home">
     <el-row> 
        <el-col :span="7">
            <div class="bor">
                <div class="logo left">

                </div>
                <!-- 地区选择 -->
                <!-- <div class="left h-top">
                   {{area}}  
                   <i class="iconfont icon-xiabiao h-area"  @click="shArea">
                       <div class="h-areas" v-show="provinces" >
                          <el-row class="a-line" v-for="(el,i) of areas" :key='i'>
                            <el-col :span="4" >
                               <div>
                                  {{el.region}}:
                               </div>
                            </el-col>
                            <el-col :span="20">
                               <ul>
                                  <li class="left" v-for="(e,i) of el.chidren" :key="i" @click='changes(e)'>
                                    {{e.province}}
                                  </li>
                               </ul>
                            </el-col>
                          </el-row>
                       </div>
                   </i>
                </div> -->
            </div>
        </el-col>
        <el-col :span="17">
           <div class="bor over">
               <ul class="search">
                  <li class="left" v-for="(el,i) of selects " :key="i"  @click="seaI(el)" :class=" i == rank ? 'ranks' : ''">
                      {{el.name}}  
                  </li>
               </ul>
               <div>
                  <el-input placeholder="请输入关键字搜索" v-model="select" class="input-with-select">
                    <el-button slot="append"  >搜索</el-button>
                  </el-input>
                </div>
            </div>
        </el-col>
      </el-row>

      <div class="carousel">
          <el-carousel >
            <el-carousel-item v-for="item in imgs" :key="item.id">
              <img :src="item.imagesrc" alt="">
            </el-carousel-item>
          </el-carousel>
      </div> 

      <div class="b-content">
          <div class="title">
              <p>               
                 最新招标
              </p>
              <router-link class="right-20" to="/bid" tag="span">
                查看更多>
              </router-link>
          </div>
          <div class="matter"> 
              <ul>
                 <router-link class="left" v-for="el of queryLists" :key="el.id" tag="li" :to="{path:'/article',query:{id:el.id} }" >
                    <p>
                      {{el.title}}
                    </p>
                    <div class="m-detail">
                       <p>资质要求:&nbsp&nbsp{{el.certificate ? el.certificate : '详见原文'}}</p>
                       <p>评标办法：<span>{{el.pbMode ? el.pbMode : '详见原文'}}</span></p>
                       <p>发布时间：{{el.date}}</p>
                    </div>
                 </router-link>
              </ul>
          </div>
      </div>

      <div class="b-content">
          <div class="title">
              <p>               
                 最新中标
              </p>
              <router-link class="right-20" to="/tender" tag="span">
                查看更多>
              </router-link>
          </div>
          <div class="matter"> 
              <ul>
                 <li class="left" v-for="el of biddings" :key="el.id">
                    <p>
                      {{el.title}}
                    </p>
                    <div class="m-detail">
                       <p>资质要求:&nbsp&nbsp{{el.certificate ? el.certificate : '详见原文'}}</p>
                       <p>评标办法：<span>{{el.pbMode ? el.pbMode : '详见原文'}}</span></p>
                       <p>发布时间：{{el.date}}</p>
                    </div>
                 </li>
              </ul>
          </div>
      </div>

      <div class="b-content">
          <div class="title">
              <p>               
                 热门企业
              </p>
              <router-link class="right-20" to="/company" tag="span">
                查看更多>
              </router-link>
          </div>
          <div class="matter"> 
              <ul>
                 <li class="left" v-for="el of companys" :key="el.id">
                    <p>
                      {{el.comName}}
                    </p>
                    <div class="m-detail">
                       <p>法人:&nbsp&nbsp{{el.legalPerson ? el.legalPerson : '详见原文'}}</p>
                       <p>电话：<span>{{el.phone ? el.phone : '暂无' }}</span></p>
                       <p>地址：{{el.comAddress}}</p>
                    </div>
                 </li>
              </ul>
          </div>
      </div>

   </div>
</template>
<script>
import { foundation,queryList,companyList } from '@/api/index'
let moment = require("moment");
export default {
  data () {
    return {
       area:'',
       areas:[
          {
            region:'东北',
            chidren:[
             {
               province:'辽宁',
               key:'liaoning'
             },
             {
               province:'吉林',
               key:'jilin'
             },
             {
               province:'黑龙江',
               key:'heilongjiang'
             }
            ]
          },
          {
            region:'华中',
            chidren:[
               {
               province:'河南',
               key:'henan'
               },
                {
               province:'湖北',
               key:'hubei'
               },
                {
               province:'湖南',
               key:'hunan'
               }
            ]
          },
          {
            region:'华北',
            chidren:[
               {
               province:'北京',
               key:'beijing'
               },
                {
               province:'天津',
               key:'tianjin'
               },
                {
               province:'河北',
               key:'hebei'
               },
                {
               province:'山西',
               key:'shanxi'
               },
                {
               province:'内蒙古',
               key:'neimenggu'
               }
            ]
          },
          {
            region:'华南',
            chidren:[
               {
               province:'广东',
               key:'guangdong'
               },
                {
               province:'广西',
               key:'guangxi'
               },
                {
               province:'海南',
               key:'hainan'
               }
            ]
          },
           {
            region:'西北',
            chidren:[
               {
               province:'陕西',
               key:'shanxi'
               },
                {
               province:'甘肃',
               key:'gansu'
               },
                {
               province:'青海',
               key:'qinghai'
               },
                {
               province:'宁夏',
               key:'ningxia'
               }
               ,
                {
               province:'新疆',
               key:'xinjiang'
               }
            ]
          },
           {
            region:'西南',
            chidren:[
               {
               province:'重庆',
               key:'chongqin'
               },
                {
               province:'四川',
               key:'sichuan'
               },
                {
               province:'贵州',
               key:'guizhou'
               },
                {
               province:'云南',
               key:'yunnan'
               }
               ,
                {
               province:'西藏',
               key:'xizang'
               }
            ]
          }
          
       ],
       provinces:false,
       province:'hunan',
       selects:[
         {
           name:'招标',
           to:'',
           i: 0
         },
         {
           name:'中标',
           to:'',
           i: 1
         },
         {
           name:'企业',
           to:'',
           i: 2
         },
         {
           name:'诚信',
           to:'',
           i: 3
         },
       ],
       select:'',
       imgs:[],
       queryLists:[],
       biddings:[],
       companys:[],
       rank:0
    }
  },
  methods: {
    seaI(el) {
      this.rank = el.i
    },
    shArea() {
       this.provinces = !this.provinces
    },
    changes(val) {
      this.area = val.province,
      this.province = val.key
    },
    gainfoundation() {
      foundation({type:0,showType:3}).then(res => {
         if(res.code == 1) {
           this.imgs = res.data
         }
      })
    },
    gainqueryList() {
      queryList({pageNo:1,type:'0',pageSize:8,regions:this.province}).then(res => {
         if(res.code == 1 ) {
          res.data.forEach( el => {
             var date = new Date(el.opendate.replace(/-/g, '/'));
             el.date = moment(date).format('YYYY年MM月DD日')

          });
            this.queryLists = res.data
         }
      })
      queryList({pageNo:1,type:'2',pageSize:8,regions:this.province}).then(res => {
         if(res.code == 1 ) {
          res.data.forEach( el => {
             var date = new Date(el.opendate.replace(/-/g, '/'));
             el.date = moment(date).format('YYYY年MM月DD日')

          });
            this.biddings = res.data
         }
      })
    },
    gainCompany() {
      companyList({regisAddress:'湖南',limit:8}).then( res => {
         if(res.code == 1) {
            res.data.splice(8,22)
            // res.data.forEach(el => {
            //    el.data = moment(el.created).format('YYYY年MM月DD日')
            // })
            this.companys = res.data
         }
      })
    }
  },
  created () {
    this.area = localStorage.getItem('area') 
    this.gainfoundation()
    this.gainqueryList()
    this.gainCompany()
  },
  components: {
  }
}
</script>
<style lang="less" >
.home {
   width: 960px;
   height: 2000px;
   .over {
     overflow: hidden;
   }
   .right-20 {
    margin-right: 18px;
    cursor: pointer;
  }
   .bor {
     height: 149px;
     clear: both;
     .el-input-group{
       width: 588px;
       font-size: 16px;
       .el-input-group__append, .el-input-group__prepend {
         width: 113px ;
         padding: 0;
         background-color: #EC7522;
         text-align: center;
         color:#fff;
         border: 1px solid #EC7522;
       }
     }
     .logo {
       background: url(../assets/img/logo.png) no-repeat;
       margin-top: 66px;
       height: 47px;
       width: 158px;
       margin-right: 21px;
     }
     .search {
       margin-top: 50px;
       margin-bottom: 10px;
       font-size: 16px;
       width: 648px;
       overflow: hidden;
       .ranks {
         color: #FE6603;
       }
       li {
         width: 18%;
         cursor: pointer;
       }
     }
     .h-top {
       margin-top: 81px;
       font-size: 14px;
       color:#333;
       .h-area {
          position: relative;
         .h-areas {
            position: absolute;
            bottom: -330px;
            width: 500px;
            z-index: 9999;
            height: 300px;
            background: #f5f5f5;
            box-sizing: border-box;
            padding-left: 10px;
          .a-line {
             height: 50px;
             width: 100%;
             line-height: 50px;
             ul {

               li {
                 width: 20%;
                 text-align: center;
               }
               li:hover {
                 background-color: #F49C17;
               }
             }
          }
         }  
       }
     }
     
   }
   .b-content {
       margin-top: 10px;
       height: 362px;
       width: 960px;
       clear: both;
       background: #fff;
       padding-bottom: 35px;
       .title {
         height: 63px;
         display: flex;
         justify-content: space-between;
         align-items: center;
         border-bottom: 2px solid #F2F2F2;
         p {
           padding-left: 15px;
           font-size: 22px;
           font-weight: 500;
           height: 28px;
           position: relative;
           border-left: 2px solid #FF6000;
         }
         span {
           color: #999;
           font-size: 12px;
         }
       }
       .matter {
         padding: 15px 15px 0;
         ul {
           li {
             width: 20%;
             margin-left: 62px;
             box-sizing: border-box;
             margin-bottom: 52px;
             p {
               font-size: 14px;
               text-overflow: ellipsis;
               overflow: hidden;
               white-space: nowrap;
               padding: 4px 0;
               
             }
             .m-detail {
               margin-top: 19px;
               width: 90%;
               p {
                 padding-bottom: 4px;
                 font-size: 12px;
                 color:#333;
               }
               span {
                 color:#EC7522;
               }
             }
           }
           li:first-child {
             margin-left: 0;
           }
           li:nth-child(5) {
             margin-left: 0;
           }
         }
       }
     }
  .carousel {
    width: 100%;
    height: 446px;
    margin-bottom: 19px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .el-carousel__container {
    height: 446px;
  }
  .el-carousel__arrow {
    height: 56px;
    width: 56px;
    font-size: 28px;
  }
  .el-carousel__indicator {
    padding: 10px 6px;
  }
  .el-carousel__indicators {
    bottom: 70px;
  }
  .el-carousel__button {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    opacity:0.5;
  }
}
</style>