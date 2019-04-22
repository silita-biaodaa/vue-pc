<template>
<div class="order">
   <div class="det-nav">
     <span>我的订单</span>
     <span style="fontSize:12px;color:#999;">如有任何问题，请联系我们：0731-85076077</span>
  </div>
  <div class="or-sel">
    <div class="left" style="marginRight:20px;color:#666" >
      订单类型 
       <el-select v-model="value" placeholder="请选择">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
      </el-select>
    </div>
    <div class="left"  style="color:#666">
      支付状态
       <el-select v-model="value" placeholder="请选择">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
      </el-select>
    </div>
    <div class="right orbtn" >
     <div  class="or-btn">
       开发票
     </div>
    </div>
  </div>
  <div class="or-table">
    <div class="ta-top">
        <div class="left" style="width:290px;textAlign:left" >
          我的订单
        </div>
        <div class="left" style="width:80px;" >
          状态
        </div>
        <div class="left" style="width:100px;" >
          支付金额
        </div>
        <div class="left" style="width:100px;" >
          购买时间
        </div>
        <div class="left" style="width:100px;" >
          操作
        </div>
    </div>

    <div>
     
       <div class="ta-list">
         <div class="list-vip">
             <div class="left" style="width:290px;textAlign:left" >
               <div style="fontSize:16px" class="m-6" >会员服务
               </div>
                <div style="fontSize:12px" class="m-6" >
                 订单编号 1234567890435435354
               </div>
                <div style="fontSize:12px" class="m-6" >
                 服务时长 1234567890435435354
               </div>
             </div>

             <div class="left" style="width:80px;" >
               已支付
             </div>

             <div class="left" style="width:100px;color:#FF0000" >
               8888元
             </div>

             <div class="left" style="width:100px;" >
               2019-4-12
             </div>

             <div class="left" style="width:100px;" >
                 <div class="again">
                   再次购买
                 </div>
             </div>
         </div>
       </div>

       <div class="ta-list">
         <div class="list-vip">
             <div class="left" style="width:290px;textAlign:left" >
               <div style="fontSize:16px" class="m-6" >企业综合查询报告
               </div>
                <div style="fontSize:12px" class="m-6" >
                 订单编号 1234567890435435354
               </div>
                <div style="fontSize:12px" class="m-6" >
                 发送邮箱 1225544@qq.com
               </div>
             </div>

             <div class="left" style="width:80px;" >
               已支付
             </div>

             <div class="left" style="width:100px;color:#FF0000" >
               8888元
             </div>

             <div class="left" style="width:100px;" >
               2019-4-12
             </div>

             <div class="left" style="width:100px;" >
                 <div class="again">
                   再次购买
                 </div>
             </div>
       </div>
        <div class="ta-report" >
              <div class="left" style="width:290px;textAlign:left" >
                <div style="fontSize:12px" class="m-6" >
                 报告格式 PDF
               </div>
             </div>
              <div class="left" style="width:80px;" >
               生产成功
             </div>
             <div  class="left" style="width:300px;" >
               <span>下载</span><span>查看</span><span>重新发送</span>
             </div>
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
      options:[],
      value:''
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.order {
   background-color: #fff;
   width: 100%;
   padding-bottom: 120px;
     .det-nav {
    line-height: 54px;
    padding: 0 29px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #F2F2F2;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .or-sel {
    padding: 0 29px;
    height: 70px;
    line-height: 70px;
  }
  .orbtn {
    height: 70px;
    display: flex;
    align-items: center;
  }
  .or-btn {
    width:64px;
    height:22px;
    background:rgba(254,102,3,1);
    border-radius:5px;
    line-height: 22px;
    text-align: center;
    color: #fff;
    font-size: 12px;
  }
  .or-table {
      padding: 0 29px;
    
    .ta-top {
      width: 100%;
      height: 29px;
      line-height: 29px;
      text-align: center;
      font-size: 12px;
      box-sizing: border-box;
      background-color: #F8F8F8;
    }
    .ta-list {
      border-bottom: 1px solid #F2F2F2;
      .list-vip {
        height: 93px;
        display: flex;
        align-items: center;
        text-align: center;
        color:#999; 
      }
      .m-6{
        margin-bottom: 6px;
      }
      .again {
        width:70px;
        height:23px;
        margin: 0 auto;
        cursor: pointer;
        border:1px solid rgba(254,102,3,1);
        border-radius:5px;
        color:#FE6603;
        font-size: 12px;
        text-align: center;
        line-height: 23px;
      }
      .ta-report {
        height: 32px;
        line-height: 32px;
        background-color: #FAFDFF;
        color:#999;
        font-size: 12px;
        text-align: center;
        span {
          color:#FE6603;
          margin-left: 40px;
          cursor: pointer;
        }
        :first-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>