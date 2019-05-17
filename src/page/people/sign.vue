<template>
<div class="sign">
  <div class="sign-top">
     <span>执业注册信息（3）</span>
  </div>
  <div class="sign-table" >
      <div class="certifi-table" >
         <div style="width:70px;" >
           序号
         </div>
         <div style="width:160px;" >
           注册类别
         </div>
         <div style="width:80px;" >
           专业
         </div>
         <div style="width:153px;" >
           执业印章号
         </div>
         <div style="width:200px;" >
           单位名称
         </div>
         <div style="width:110px;" >
           有效期
         </div>
      </div>
      <div class="certifi-in" >
         <div style="width:70px;" >
           序号
         </div>
         <div style="width:160px;" >
           注册类别
         </div>
         <div style="width:80px;" >
           专业
         </div>
         <div style="width:153px;" >
           执业印章号
         </div>
         <div style="width:200px;" >
           单位名称
         </div>
         <div style="width:110px;" >
           有效期
         </div>
      </div>
  </div>
  
</div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    
  },
  created () {
    
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.sign {
  background-color: #fff;
  padding: 0 10px 31px;
  box-sizing: border-box;
  width: 100%;
  .sign-top {
    line-height: 44px; 
    font-size: 14px;
    font-weight: 550;
    color:#333;
    span {
      border-left: 2px solid #FE6603;
      padding-left: 10px;
    }
  }
  .sign-table {
    border: 1px solid #f2f2f2;
  }
  .certifi-table {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      height: 40px;
      color:#333;
      font-size: 14px;
      font-weight: 550;
      border-bottom: 1px solid #f2f2f2;
    }
    .certifi-in {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      min-height: 56px;
      color:#999;
      font-size: 14px;
      border-bottom: 1px solid #f2f2f2;
    }
}
</style>