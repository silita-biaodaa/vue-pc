<template>
<div class="sign">
  <div class="sign-top">
     <span>押证详情（{{total}}）</span>
  </div>
  <div class="sign-table" >
      <div class="certifi-table" >
         <div style="width:50px;" >
           序号
         </div>
         <div style="width:260px;" >
           单位名称
         </div>
         <div style="width:253px;" >
           工程名称
         </div>
         <!-- <div style="width:100px;" >
           建设单位
         </div> -->
         <div style="width:100px;" >
           岗位类别
         </div>
         <!-- <div style="width:90px;" >
           所在市州
         </div> -->
         <div style="width:110px;" >
           押证时间
         </div>
      </div>
      <div class="certifi-in"  v-for="(el,i) in list" :key="i"  >
         <div style="width:50px;" >
           {{i + 1 }}
         </div>
         <div style="width:260px;textAlign: left;"  >{{el.unitOrg}}
         </div>
         <div style="width:253px;" class="box-p" >
           {{el.proName}}
         </div>
         <!-- <div style="width:100px;" >
           {{el.proOrg}}
         </div> -->
         <div style="width:100px;" >
            {{el.type}}
         </div>
         <!-- <div style="width:90px;" >
           {{el.city}}
         </div> -->
         <div style="width:110px;" >
            {{el.date}}
         </div>
      </div>
      <div class="certifi-no" v-show="ishow" >
        暂无数据
      </div>
  </div>
  
</div>
</template>
<script>
import { underq } from '@/api/index'
export default {
  data () {
    return {
      innerid:'',
      list:[],
      total:0,
      ishow:false
    }
  },
  methods: {
    gainList() {
      underq({innerid:this.innerid,type:'detail'}).then(res => {
        if(res.code == 1) {
          this.total = res.data.length
          this.list = res.data
          if(this.total == 0 ) {
              this.ishow = true
          } else {
              this.ishow = false
          }
        }
        
      })
    }
  },
  created () {
    this.innerid = this.$route.query.innerid
    console.log(this.$route.query.innerid);
    
    this.gainList()
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
    .certifi-no {
      line-height: 56px;
      text-align: center;
      color:#999;
      font-size: 14px;
    }
}
</style>