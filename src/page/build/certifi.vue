<template>
<div class="certifi">
   <div class="certifi-nav">
     首页 > 人员> {{name}} > 注册证书（与下面对应）
   </div>
   <div class="certifi-text" >
     <div >
       <img src="../../assets/img/icon-nanxing.png" alt="">
     </div>
     <div class="certifi-del" >
       <p class="cer-name" >{{detail.name}}</p>
       <p>身份证号码：<span>{{detail.idCard}}</span></p>
       <p>性别：<span>男</span></p>
     </div>
   </div>
   <div  class="certifi-list" >
     <div class="certifi-top">
       押证详情
     </div>
     <div class="certifi-table" >
       <div style="width:200px;" >
         单位名称
       </div>
       <div style="width:150px;" >
         岗位类别
       </div>
       <div style="width:230px;" >
         工程名称
       </div>
       <div style="width:200px;" >
         建设单位
       </div>
       <div style="width:120px;" >
         所在市州
       </div>
       <div style="width:120px;" >
         押证时间
       </div>
     </div>
    <div class="certifi-in" >
       <div style="width:200px;" >
         {{detail.unitOrg}}
       </div>
       <div style="width:150px;" >
         {{detail.type}}
       </div>
       <div style="width:230px;" >
         {{detail.proName}}
       </div>
       <div style="width:200px;" >
         {{detail.proOrg}}
       </div>
       <div style="width:120px;" >
         {{detail.city}}
       </div>
       <div style="width:120px;" >
        {{detail.date}}
       </div>
     </div>
   </div>
</div>
</template>
<script>
import { underq } from '@/api/index';
export default {
  data () {
    return {
      name:'',
      card:'',
      id:'',
      detail:{}
    }
  },
  methods: {
    gaindel() {
      if(this.$route.query.card == null) {
      this.id = this.$route.query.id
         underq({pkid:this.id,type:'detail'}).then(res => {
         if(res.code == 1) {
           console.log(res);
           this.detail = res.data[0]
         }
        })
      } else {
         this.name = this.$route.query.name
          this.card = this.$route.query.card
         underq({name:this.name,idCard:this.card,type:'api'}).then(res => {
         if(res.code == 1) {
           console.log(res);
           this.detail = res.data[0]
         }
        })
      }
     
    }
  },
  created () {
    this.gaindel()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.certifi {
  min-height:  calc(~"100vh - 195px");
  overflow: hidden;
  padding-top: 86px;
  width: 1020px;
  box-sizing: border-box;
  margin: 0 auto;
  .certifi-nav {
    line-height: 40px;
    font-size: 12px;
    color:#666;
    cursor: pointer;
  }
  .certifi-text {
    height: 130px;
    padding: 17px 20px;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    .certifi-del {
      margin-left: 20px;
      font-size: 12px;
      color:#333;
      p {
        margin-bottom: 6px;
      }
      .cer-name {
        font-size: 18px;
        font-weight: 550;
        color:#000;
        margin-bottom: 16px;
      }
    }
  }
  .certifi-list {
    background-color: #fff;
    margin-top: 28px;
    .certifi-top {
      line-height: 60px;
      padding-left: 20px;
      font-size: 18px;
      color:#FE6603;
      font-weight: 550;
      border-bottom: 1px solid #f2f2f2;
    }
    .certifi-table {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      height: 56px;
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
}
</style>