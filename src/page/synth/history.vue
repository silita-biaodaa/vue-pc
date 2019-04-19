<template>
<div class="history">
  <div class="inform" v-if="!pass" >
    <div class="inform-top">
      <div class="top-left" >
         <div class="top-title"> 
           企业综合报告--¥50
         </div>
         <div class="top-buy">
           购买时间：2019年4月12日
         </div>
         <div class="inform-f">
           企业所在地：湖南省
         </div>
          <div class="inform-f">
            资质要求：施工总承包-建筑工程施工总承包三级或施工总承包-建筑工程施工总承包三级
         </div>
      </div>
      <div class="top-right" >
         <div class="top-btn">
            查看报告
         </div>
         <div class="no-inform">
           报告生成中……
         </div>
      </div>
    </div>
    <div class="inform-b">
      <div class="b-in">
        业绩要求
      </div>
        <div class="inform-f">
           业绩平台：全国建筑市场监督公共服务平台
        </div>
        <div class="inform-f">
          项目名称关键词：土石方
        </div>
        <div class="inform-f">
          竣工时间：2016-4-10至2019-4-10
        </div>
        <div class="inform-f">
          合同金额：450万-1000万
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
export default {
  data () {
    return {
      pass:false
    }
  },
  methods: {
    gainLisy() {
      history({pageNo:1,pageSize:1000}).then( res => {
         if(res.code == 1) {
          //  if(res.data.length == 0) {
          //    this.pass = true
          //  } 
         }
         
      })
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