<template>
<div class="result">
  <div class="re-nav">
    <span @click="$router.push('/')" >首页</span>><span  @click="$router.push('/company')" >企业</span>><span  @click="$router.push('/synth')" >综合查询</span>><span style="color:#000">查询结果</span>
  </div>
  <div class="re-text">
      <div class="re-title" >
          <div style="color:#FFF" >
            查询页面
          </div>
           <div class="title">
             企业综合查询报告
           </div>
           <div class="sample">
             样本预览
           </div>  
      </div>
      <div style="fontSize:16px;marginBottom:15px;">
        企业综合查询报告-¥{{common.price}}，会员享受专享价¥{{vip.price}}元
      </div>
      <div style="fontSize:16px;color:#FE6603;cursor: pointer;">
        开通会员 <i class="el-icon-arrow-right"></i>
      </div>
  </div>
  <div class="re-condition">
      <div class="di-con" >
        已选条件
      </div>
       <div class="di-line" >
         企业所在地：{{detail.reginAddress}}
      </div>
       <div class="di-line"  style="marginBottom:20px;" >
        资质要求：{{detail.qualName}}
      </div>
      <div class="di-con" >
        业绩要求
      </div>
       <div class="di-line" >
        业绩平台：{{detail.projSource}}
      </div>
       <div class="di-line"  >
        项目名称关键词：{{detail.projName}}
      </div>
      <div class="di-line"  >
        竣工时间：{{detail.buildStart}}至{{detail.buildEnd}}
      </div>
      <div class="di-line" style="marginBottom:0;" >
        合同金额：{{detail.amountStart}}万-{{detail.amountEnd}}万
      </div>
  </div>
  <div class="term">
      <div class="te-name">
        收件人信息
      </div>
      <div class="te-hint" style="width:190px;" >
        <span v-show="isshow" >请输入正确的手机号码格式</span>
        <span v-show="ismail" >请输入正确的邮箱地址</span>
      </div>
      <div class="te-put">
        手机号码（必填）：
        <input type="text" placeholder="请输入您的手机号" v-model="iphone" @blur="isphone"  >
      </div>
       <div class="te-put">
        电子邮箱（必填）：
        <input type="text" placeholder="请输入您的邮箱" v-model="email"  @blur="isemail" >
      </div>
       <div class="te-put" style="width:453px;">
        报告格式（默认）： PDF
      </div>
      <div class="te-btn">
        立即支付
      </div>
  </div>
</div>
</template>
<script>
import { report } from '@/api/index';
export default {
  data () {
    return {
      detail:{},
      common:{},
      vip:{},
      iphone:'',
      email:'',
      isshow:false,
      ismail:false
    }
  },
  methods: {
     gainReport() {
      if(localStorage.getItem('query')) {
        this.iphone = localStorage.getItem('phoneNo')
          let date  =  JSON.parse(localStorage.getItem('query'))
             report(date).then( res => {
                  console.log(res);
                  if(res.code == 1) {
                     if(res.data.projSource = 'project') {
                       res.data.projSource = '全国建筑市场监管公共服务平台'
                     } else if(res.data.projSource = 'shuili') {
                       res.data.projSource = '全国水利建设市场信用信息平台'
                     } else {
                       res.data.projSource = '全国公路建设市场信用信息管理系统'
                     }
                    this.detail = res.data
                    if(this.detail.price[0].primeUnit == "普通用户") {
                      this.common = this.detail.price[0]
                      this.vip =  this.detail.price[1]
                    } else {
                      this.common = this.detail.price[1]
                      this.vip =  this.detail.price[0]

                    }
                  }

                })
      } else {
        this.$router.push('/synth')
      }
    },
    isphone() {
       if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.iphone.trim()))) {
         this.isshow =  true
      } else {
        this.isshow =  false
      }
    },
    isemail() {
      var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if(!(reg.test(this.email))) {
        this.ismail = true
      } else {
         this.ismail = false
      }
    }
  },
  created () {
   this.gainReport()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.result {
   width: 1020px;
   margin: 0 auto ;
   padding-top: 80px;
   .re-nav {
     margin: 20px 0;
     font-size: 16px;
     color:#999;
     cursor: pointer;
   }
    .re-text {
       padding: 20px 18px 10px;
       width: 1020px;
       box-sizing: border-box;
       border-bottom: 1px solid #F2F2F2;
       background-color: #fff;
       .re-title {
         width: 100%;
         display: flex;
         justify-content: space-between;
         margin-bottom: 13px;
         .title {
           font-size: 20px;
         }
         .sample {
           width: 72px;
           height: 24px;
           font-size: 14px;
           color:#FE6603;
           border: 1px dashed #FE6603;
           line-height: 24px;
           text-align: center;
         }
       }
     }
     .re-condition {
       background-color: #fff;
       width: 100%;
       box-sizing: border-box;
       padding: 30px 18px 20px;
       margin-bottom: 20px;
       .di-con {
         font-size: 14px;
         margin-bottom: 8px;
       }
       .di-line {
         font-size: 12px;
         color:#999;
         margin-bottom: 8px;
       }
     }
     .term {
       width: 100%;
       background-color: #fff;
       display: flex;
       flex-direction: column;
       align-items: center;
       margin-bottom: 200px;
       .te-name {
         font-size: 20px;
         font-weight: 500;
         margin-top: 30px;
         margin-bottom: 72px;
       }
       .te-put {
         font-size: 14px;
         color: #666;
         line-height: 36px;
          margin-bottom: 24px;
         input {
           width: 287px;
           height: 36px;
           border: 1px solid #CFCFCF;
           padding: 0 15px;
         }
       }
       .te-btn {
         width: 287px;
         height: 36px;
         line-height: 36px;
         background-color: #FE6603;
         color: #fff;
         font-size: 14px;
         font-weight: 550;
         text-align: center;
         margin: 97px 0;
       }
       .te-hint {
         font-size: 12px;
         color:red;
         margin-bottom: 5px;
       }
     }
}
</style>
