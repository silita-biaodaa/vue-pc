<template>
<div class="buy">
    <!-- 头 -->
    <v-head :headTxt="'会员服务'"></v-head>
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
                <span>{{el.price}}</span>/{{el.stdDesc | month }}个月
             </div>
             <div >
               <div class="rate left">
                 {{el.altInfo}}
               </div>
               <div class="right save">
                 可节省{{el.primePrice - el.price }}元
               </div>
             </div>
           </div>

          <div class="buy-btn" @click="openV" >
            立即开通
          </div>

        </div>
        <div class="buy-title" style="display: flex;align-items: center;">
            标大大会员 <i class="bigDian"></i> 专享<span style="color:#FE0303" >8</span>大特权
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
              1、会员可快速筛选招标公告的资质要求和评标办法。查找信息更加快速精准。2、可快速筛选中标公告的中标金额。查找信息更加快速精准。3、可快速筛选企业的资质、注册资金。查找信息更加快速精准。
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
               <!-- <p class="buy-s" >(限APP查看)</p> -->
            </div>
            <div class="left buy-p" style="width:680px" >
              可查看企业的全部联系号码。
            </div>
          </div>  
          
          <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >查在建功能</p>
               <!-- <p class="buy-s" >(限APP使用)</p> -->
            </div>
            <div class="left buy-p" style="width:680px" >
              可根据姓名和身份证号，精准查询湖南省内人员在建情况。
            </div>
          </div>  

         <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >在建库功能</p>
               <!-- <p class="buy-s" >(限APP使用)</p> -->
            </div>
            <div class="left buy-p" style="width:680px" >
              提供湖南省内注册人员在建信息查询，输入姓名一键查询。
            </div>
          </div>  

          <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >业绩信息</p>
               <!-- <p class="buy-s" >(限APP查看)</p> -->
            </div>
            <div class="left buy-p" style="width:680px" >
              包含全国住建部、交通部、水利部业绩，可根据地区、合同金额、日期、关键词快速查找业绩信息。
            </div>
          </div>  

         <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >更多企业信息</p>
            </div>
            <div class="left buy-p" style="width:680px" >
              提供建筑业企业的工商、法务、资质、人员、业绩、中标项目、诚信等信息。
            </div>
          </div>  

          <div class="table-or">
            <div class="left buy-bor " style="width:218px" >
               <p class="p-color" >人员信息</p>
               <!-- <p class="buy-s" >(限APP查看)</p> -->
            </div>
            <div class="left buy-p" style="width:680px" >
              提供注册人员的押证项目、证书信息、个人业绩、变更记录、不良记录等信息，查找信息更加快速精准。
            </div>
          </div>  

        </div>
    </div>

  <div class="re-puy" v-if="noShow"  >
    <div class="puy-title">
       <span>会员支付</span>
       <i class="el-icon-close"  @click="close" ></i>
    </div>

     <div class="puy-title" style="fontSize:14px;" >
       <span>订单详情</span>
    </div>

    <div class="puy-detail">
      <div>
        <div class="puy-name"> 
          <span>手机号码:</span>{{iphone}}
        </div>
        <div class="puy-name"> 
          <span>标大大{{this.all.stdDesc}}</span>
        </div>
      </div>
      <div class="puy-price" >
           <div class="puy-name"> 
             <span>应付金额:</span><span class="price" >{{this.all.price}}</span>元
           </div>
      </div>  
    </div>
    <!-- <div class="puy-iphone" >
      <div class="puy-iput" >
        <div>手机号码：</div>
         <el-input v-model="input" placeholder="请输入邀请人的手机号码"></el-input>
         <div class="puy-iti" @click.stop="pushIp" >
           确定
         </div>
      </div>
      <div class="puy-hint" v-show="error" >
        请输入正确的手机号码格式
      </div>
    </div> -->
    <div class="puy-title" style="fontSize:14px;" >
       <span>支付方式</span>
    </div>

     <div class="puy-code">
         <div class="puy-img" id="qrcode"  v-loading='isload'  element-loading-text="二维码生成中"  >
           <!-- <img src="../../assets/img/bank_card @2x.png" alt=""> -->
         </div>  
         <div class="puy-hint"  >
            <img src="../../assets/img/icon-weixin.png .png" alt="">&nbsp&nbsp微信扫码支付
         </div>
      </div>
  </div>

</div>
</template>
<script>
import QRCode from 'qrcodejs2'
import { FeeStandard,vipPay,nowxPay,getUserTemp,activity } from '@/api/index'
import heads from '@/components/head3'
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
      
     ],
     price:'318',
     noShow:false,
     all:{},
     iphone:'',
     isload:true,
     input:'',
     orderNo:'',
     error:false
    }
  },
  filters: {
    month(val) {
      if(val == "一个月会员") {
        return '1'
      } else  if(val == "三个月会员") {
        return '3'
      }  else  if(val == "六个月会员") {
        return '6'
      } else {
        return '12'
      }
    }
  },
  methods: {
    pushIp() {
      if(this.input.trim() == '') {
        return 
      }
      if(!(/^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\d{8}$/.test(this.input.trim()))) {
         return this.error = true
      } else {
        this.error = false
        if(this.input.trim() == localStorage.getItem('phoneNo') ) {
              return this.$message({
                message: '不能输入账号一样的手机号码',
                type: 'warning'
              });
        }
      }
      activity({phone:this.input,stdCode:this.all.stdCode,orderNo:this.orderNo}).then(res => {
        if(res.code == 1) {
           this.$message({
                message: '提交成功',
                type: 'success'
              });
        }
      })
    },
     jumpen() {
        this.$router.push('/enroll')
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
      this.all = el
    },
      judges() {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        this.name = localStorage.getItem('Bname')
        this.names = false
      } else {     
        this.names = true
      }
    },
    towe() {
      this.$router.push('/about')
    },
    close() {
      this.noShow = false
    },
    gainfee() {
      FeeStandard({channel:'1003'}).then(res => {
        if(res.code ==1 ) {
          this.level = res.data
          this.price = res.data[0].price
          this.all = res.data[0]
        }
        
      })
    },
    toTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    openV() {
      if(this.noShow) {
        return false
      }
      this.isload = true
      let id = sessionStorage.getItem('ip')
      this.iphone = localStorage.getItem('phoneNo')
      vipPay({channel:'1003',userId:id,stdCode:this.all.stdCode,tradeType:'NATIVE'}).then( res => {
         if(res.code == 1) {
           console.log(res);
           
           this.orderNo = res.orderNo
              let code = new QRCode("qrcode", {
                  text: res.data.codeUrl,
                  width:180,
                  height: 180,
                  colorDark : "#000000",
                  colorLight : "#ffffff",
              });
           this.gainstate(res.orderNo)
         }
        
      })
      this.noShow = true
    },
    gainstate(val){
      this.isload = false
      let that  = this
       let int = setInterval( function () {
          
            if(!that.noShow) {
              
              clearInterval(int)
              return false
            }
            nowxPay({orderNo:val,type:'vip'}).then( res => {
              if(res.trade_state == 'SUCCESS') {
                getUserTemp({}).then( res => {
                  if(res.code == 1) {
                    sessionStorage.setItem('ip', res.data.pkid)
                    localStorage.setItem('permissions',res.data.permissions)
                    // localStorage.setItem('ip', res.data.pkid)
                    if(localStorage.getItem('Xtoken')) {
                      localStorage.setItem('Xtoken',res.data.xtoken)
                    } else {
                      sessionStorage.setItem('xtoken',res.data.xtoken)
                    }
                  }
                  
                })
                 that.$message({
                      message: '支付成功',
                      type: 'success'
                    });
                 that.noShow = false
                  clearInterval(int)
                  that.$router.push('/user/order')
              }else if(res.trade_state == 'ClOSED') {
                 clearInterval(int)
                 that.noShow = false
              } else if(res.trade_state == 'REVOKED') {
                that.noShow = false
                clearInterval(int)
              } else if(res.trade_state == 'PAYERROR') {
                 that.noShow = false
                 clearInterval(int)
              }
                
                 
            })
        },2000)
     
    },
  },
  created () {
    this.judges()
    this.gainfee()
    this.toTop()
  },
  components: {
    'v-head':heads,
  }
}
</script>
<style lang="less" scoped>
.buy {
  min-height: 1433px;
  .se-area {
    height: 310px !important;
    bottom: -320px !important;
  }
  .buy-img {
    min-width: 1020px;
    height:368px;
    background: url(../../assets/img/pic-banner.png)  no-repeat;
    background-position: center;
    background-size:cover;
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
    @media screen and (min-device-width: 1920px){
       .buy {
        height: 350px !important;
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
    .re-puy {
       position: fixed;
       left: 50%;
       transform: translateX(-50%);
       width: 500px;
       top: 100px;
       background-color: #fff;
       box-shadow:4px 3px 9px 1px rgba(4,0,0,0.05);
       border: 1px solid  rgba(242,242,242,1);
       .puy-title {
         height: 45px;
         font-size: 16px;
         border-bottom: 1px solid #F2F2F2;
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding: 0 18px;
         font-size: 16px;
          i {
           font-size: 24px;
           cursor: pointer;
          }
       }
       .puy-iphone {
         padding: 0 18px;
         height: 80px;
         display: flex;
        justify-content: center;
         flex-direction: column;
         width: 100%;
         font-size: 14px;
         border-bottom: 1px solid #F2F2F2;
         font-weight: 550;
         box-sizing: border-box;
         .puy-iput {
           display: flex;
           flex-direction: row;
           align-items: center;
         }
         .puy-hint {
           font-size: 12px;
           color: red;
            font-weight: 400;
         }
         .puy-iti {
           margin-left: 10px;
           cursor: pointer;
         }
       }
       .puy-detail {
         padding: 18px 18px 10px;
         font-size: 14px;   
         display: flex;
         align-items: center;
         justify-content: space-between;
         border-bottom: 1px solid #F2F2F2;
         .puy-name {
            margin-bottom: 15px;
           span {
             font-weight: 550;
             margin-right: 10px;
           }
           .price {
             font-weight: 400;
             font-size: 18px;
             color:#FE6603;
           }
         }  
       }
        .puy-code {
           margin: 10px 0;
           display: flex;
           align-items: center;
           flex-direction: column;
           overflow: hidden;
           .puy-img {
              width: 180px;
              height: 180px;
            }
          .puy-hint {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #FE6603;
            margin-top: 10px;
          }
         }
     }
}
.bigDian{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #000;
  display: inline-block;
  margin: 0 5px;
}
</style>