<template>
<div class="history">
  <div class="inform" v-if="!pass" v-for="(el,i) in history " :key="i" >
    <div class="inform-top">
      <div class="top-left" >
         <div class="top-title"> 
           企业综合查询报告--¥{{el.price}}
         </div>
         <div class="top-buy">
           购买时间：{{el.date}}
         </div>
         <div class="inform-f">
           企业所在地：{{el.reginAddress}}
         </div>
          <div class="inform-f">
            资质要求：{{el.qualName}}
         </div>
      </div>
      <div class="top-right" >
         <div class="top-btn" :class=" el.pAth ? '' : 'no-path' " @click="jump(el)" >
            查看报告
         </div>
         <div class="no-inform" v-show="!el.pAth" >
           报告生成中……
         </div>
      </div>
    </div>
    <div class="inform-b">
      <div class="b-in">
        业绩要求
      </div>
        <div class="inform-f">
           业绩平台：{{el.projSource}}
        </div>
        <div class="inform-f">
          项目名称关键词：{{el.projName}}
        </div>
        <div class="inform-f">
          竣工时间：{{el.buildStart}}至{{el.buildEnd}}
        </div>
        <div class="inform-f">
          合同金额：{{el.amountStart}}万-{{el.amountEnd}}万
        </div>
    </div>
  </div>
  <div class="hi-img" v-if='pass' >
    <img src="../../assets/img/card.png" alt="">
  </div>
</div>
</template>
<script>
import { history } from '@/api/index';
let moment = require("moment");
export default {
  data () {
    return {
      pass:false,
      history:[],
      pAth:true
    }
  },
  methods: {
    gainLisy() {
      console.log(1);
      
    if(!(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) ) {
        return false
     }
      history({pageNo:1,pageSize:1000}).then( res => {
        console.log(res);
        
         if(res.code == 1) {
           if(res.data.length == 0) {
             this.pass = true
           } 
         }
         this.history = res.data
          this.history.forEach( el => {
            if(el.reportPath) {
              el.pAth  = true
            } else {
              el.pAth  = false
            }
             var date = new Date(el.payDate.replace(/-/g, '/'));
             el.date = moment(date).format('YYYY年MM月DD日')
             if(el.projSource = 'project') {
               el.projSource = '全国建筑市场监管公共服务平台'
             } else if(el.projSource = 'shuili') {
               el.projSource = '全国水利建设市场信用信息平台'
             } else {
               el.projSource = '全国公路建设市场信用信息管理系统'
             }
          })
      })
    },
    jump(el) {
       if(!el.pAth ) {
         return 
       }
        window.open(el.reportPath, '_blank', )
    }
  },
  created () {
    this.gainLisy()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.history {
  width: 1020px;
  margin: 0 auto 150px;
  min-height: calc(~'100vh - 450px');
  .inform {
    width: 100%;
    height: 317px;
    margin-bottom: 20px;
    background-color: #fff;
    .inform-top {
      width: 100%;
      height: 149px;
      border-bottom: 1px solid #f2f2f2;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 20px 19px 10px;
     
      .top-left {
        .top-title {
          font-weight: 550;
          font-size: 18px;
          margin-bottom: 5px;
        }
        .top-buy {
          font-size: 12px;
          color:#CCBEBE;
          margin-bottom: 13px;
        }
      }
      .top-right {
        text-align: right;
        .top-btn {
          width: 120px;
          height: 48px;
          border-radius:5px;
          background-color: #fe6603;
          color:#fff;
          text-align: center;
          line-height: 48px;
          cursor: pointer;
        }
        .no-inform {
          width: 120px;
          color:red;
          text-align: center;
          font-size: 12px;
        }
        .no-path {
          background-color: #ccc;
        }
      }
    }
    .inform-b {
      padding: 10px 20px;

      .b-in {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
     .inform-f {
        font-size: 14px;
        color:#999;
        margin-bottom: 10px;
      }
  }
  .hi-img {
    width: 100%;
    min-height: calc(~'100vh - 450px');
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>