<template>
   <div class="home">

      <en-search></en-search>

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
                 <router-link class="left h-i" v-for="el of queryLists" :key="el.title" tag="a" :to="{path:'/article',query:{id:el.id} }"  target='_blank' >
                    <p class="t-line" :title='el.title' >
                      {{el.title}}
                      <i class="t-p">
                      </i>
                      <i class="t-in">
                      </i>
                    </p>
                    <div class="m-detail">
                       <p :title='el.certificate' >资质要求:&nbsp&nbsp{{el.certificate ? el.certificate : '详见原文'}}</p>
                       <p>评标办法：<span>{{el.pbMode ? el.pbMode : '详见原文'}}</span></p>
                       <p>发布时间：{{el.date}}</p>
                    </div>
                 </router-link>
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
                 <router-link class="left" v-for="el of biddings" :key="el.id" tag="a" :to="{path:'/notice',query:{id:el.id} }"  target='_blank' >
                    <p class="t-line" :title='el.title' >
                      {{el.title}}
                      <i class="t-p">
                      </i>
                      <i class="t-in">
                      </i>
                    </p>
                    <div class="m-detail">
                       <p :title='el.oneName' >第一候选人:{{el.oneName ? el.oneName : '详见原文'}}</p>
                       <p>中标金额：<span>{{el.oneOffer ? el.oneOffer + '万' : '详见原文'}}</span></p>
                       <p>发布时间：{{el.date}}</p>
                    </div>
                 </router-link>

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
              <!-- <ul> -->
                 <a class="left" v-for="el of companys" :key="el.id">
                    <p class="t-line">
                      {{el.comName}}
                      <i class="t-p">
                      </i>
                      <i class="t-in">
                      </i>
                    </p>
                    <div class="m-detail">
                       <p>法人:&nbsp&nbsp{{el.legalPerson ? el.legalPerson : '详见原文'}}</p>
                       <p>电话：<span>{{el.phone ? el.phone : '暂无' }}</span></p>
                       <p>地址：{{el.comAddress}}</p>
                    </div>
                 </a>
              <!-- </ul> -->
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
       province:'湖南',
       select:'',
       imgs:[],
       queryLists:[],
       biddings:[],
       companys:[],
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
    text() {
      console.log(111)
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
   width: 100%;
   height: 2000px;
   .over {
     overflow: hidden;
   }
   .right-20 {
    margin-right: 18px;
    cursor: pointer;
  }
   .b-content {
       margin-top: 10px;
       width: 960px;
       margin: 0 auto;
       clear: both;
       background: #fff;
       overflow: hidden;
       margin-bottom: 35px;
       .title {
         height: 63px;
         padding-left: 15px;
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
           border-left: 3px solid #FF6000;
         }
         span {
           color: #999;
           font-size: 12px;
         }
       }
       .matter {
         padding: 15px 15px 0;
         p {
          font-family:"SourceHanSansCN-Regular";
          font-weight: 550;
          color:#333;
         }
         .t-line {
           position: relative;
           box-sizing: border-box;
           padding: 5px 0;
          //  border-bottom: 2px solid #F2F2F2;
          .t-p {
            height: 3px;
            width: 56px;
            position: absolute;
            background-color: #EC7522;
            left: 0;
            bottom: -1px;
            z-index: 999;
          }
          .t-in {
            height: 3px;
            width: 100%;
            position: absolute;
            background-color: #F2F2F2;
            left: 0;
            bottom: -1px;
          }
         }
           a {
             width: 20%;
             margin-left: 62px;
             display: block;
             box-sizing: border-box;
             margin-bottom: 45px;
             p {
               font-size: 14px;
               text-overflow: ellipsis;
               overflow: hidden;
               white-space: nowrap;
               padding: 4px 0;
               cursor: pointer;
             }
             .m-detail {
               margin-top: 18px;
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
           a:first-child {
             margin-left: 0;
           }
           a:nth-child(5) {
             margin-left: 0;
           }
       }
     }
  .carousel {
    width: 960px;
    margin: 0 auto;
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