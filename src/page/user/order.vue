<template>
<div class="order">
   <div class="det-nav">
     <span>我的订单</span>
     <span style="fontSize:12px;color:#999;">如有任何问题，请联系我们：0731-85076077</span>
   </div>

  <div class="or-sel">
    <div class="left" style="marginRight:20px;color:#666" >
      订单类型 
       <el-select v-model="value" placeholder="请选择" @change="type" clearable >
         <el-option
           v-for="item in option"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
      </el-select>
    </div>
    <div class="left"  style="color:#666">
      支付状态
       <el-select v-model="pattern"  clearable  placeholder="请选择"  @change="gainList" >
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

  <div class="or-table" v-show="noShow" >
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

          <div v-for="(el,i) in allList" :key="i" >
     
             <div class="ta-list"  v-if="el.report == null" >
                <div class="list-vip">
                    <div class="left" style="width:290px;textAlign:left" >
                         <div style="fontSize:16px" class="m-6" >会员服务
                         </div>
                          <div style="fontSize:12px" class="m-6" >
                           订单编号 {{el.orderNo}}
                         </div>
                          <div style="fontSize:12px" class="m-6" >
                           服务时长 {{el.vipDays}}
                         </div>
                    </div>

                    <div class="left" style="width:80px;" >
                      {{el.orderStatus  | status  }}
                    </div>

                    <div class="left" style="width:100px;color:#FF0000" >
                     {{el.fee}}元
                    </div>

                    <div class="left" style="width:100px;" >
                     {{el.updateTime | times }}
                    </div>

                    <div class="left" style="width:100px;" >
                     <div class="again">
                       再次购买
                     </div>
                    </div>
                </div>
              </div>
             <div>
        
         
              <div v-if="el.wxpayParam == null "  > 
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
                        <div style="fontSize:12px"  >
                         报告格式 PDF
                       </div>
                     </div>
                      <div class="left" style="width:80px;" >
                       生产成功
                     </div>
                     <div  class="left" style="width:300px;" >
                       <span @click="downLode" >下载</span><span @click="look" >查看</span><span @click="resend" >重新发送</span>
                     </div>
                </div>
             </div>    
          </div>  
    </div>
  </div>  

  </div>
  <div class="noList"  v-show="!noShow" >
    <img src="../../assets/img/bank_card @2x.png" alt="">
    <div>
      暂无已支付订单
    </div>
  </div>
</div>
</template>
<script>
import { orderList,send } from '@/api/index'
let moment = require("moment");
export default {
  data () {
    return {
      noShow:true,
      option:[
        {
          label:'全部',
          value:''
        },
        {
          label:'会员订单',
          value:'vip'
        },
        {
          label:'综合查询',
          value:'query'
        }
      ],
      value:'',
      pattern:'',
      options:[{
        value:'',
        label:'全部'
      },{
        value:'3',
        label:'支付失败'
      },{
        value:'9',
        label:'支付成功'
      }],
      allList:[],
      vipList:[],
      queryLsit:[],
      showList:[]
    }
  },
  filters: {
    status(val){
      if(val == 1) {
        return '订单初始化'
      } else if ( val == 2 )  {
        return '超时' 
      } else if ( val == 3 )  {
        return '支付失败' 
      } else if ( val == 4 )  {
        return '支付取消' 
      } else if ( val == 9 )  {
        return '支付成功' 
      } else if ( val == 99 )  {
        return '支付其他异常' 
      } else if ( val == 11 )  {
        return '非支付成功' 
      } 
    },
    times(val) {
      return moment(val).format('YYYY-MM-DD')
    }
  },
  methods: {
    gainList() {
      orderList({pageSize:'100',pageNo:'1',orderStatus:this.pattern,channelNo:'1003'}).then( res => {
        console.log(res,1);
         if(res.code == 1) {
           this.noShow = true
            this.showList = res.data
           this.allList.forEach( el => {
              if(el.report == null ) {
                this.vipList.push(el)
              } else {
                this.queryLsit.push(el)
              }
           })
          if(this.value == 'vip') {
            this.allList = this.vipList
          } else if (this.value == 'query') {
            this.allList = this.queryLsit
          } else {
            this.allList = this.showList
          }
          
         } else {
           this.allList = []
           this.noShow = false
         }
      })
    },
    type(val) {
         if(this.value == 'vip') {
            this.allList = this.vipList
          } else if (this.value == 'query') {
            this.allList = this.queryLsit
          } else {
            this.allList = this.showList
          }
    },
    resend() {
      // send({}).then( res => {

      // })
    },
    look() {
      // window.open(this.detail.reportPath, '_blank', )
    },
    downLode() {
      
    },
    text() {
       window.open('http://prefile.biaodaa.com/img/report.pdf')
    }
  },
  created () {
    this.gainList()
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
  .noList {
     padding-top: 100px;
     display: flex;
     flex-direction: column;
     align-items: center;
     color: #999;
  }
}
</style>