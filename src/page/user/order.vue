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
       <el-select v-model="pattern"  clearable  placeholder="请选择"  @change="Ctype" >
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
      </el-select>
    </div>
    <div class="right orbtn" >
     <div  class="or-btn" @click="bill" >
       开发票
     </div>
    </div>
  </div>

  <div class="or-table" v-show="noShow" >
    <div class="ta-top">
        <div class="left" style="width:230px;textAlign:left" >
          我的订单
        </div>
        <div class="left" style="width:80px;" >
          状态
        </div>
        <div class="left" style="width:100px;" >
          支付金额
        </div>
        <div class="left" style="width:160px;" >
          购买时间
        </div>
        <div class="left" style="width:100px;" >
          操作
        </div>
    </div>

          <div v-for="(el,i) in allList" :key="i" >
     
             <div class="ta-list"  v-if="el.report == null" >
                <div class="list-vip">
                    <div class="left" style="width:230px;textAlign:left" >
                         <div style="fontSize:16px" class="m-6" >会员服务
                         </div>
                          <div style="fontSize:12px" class="m-6" >
                           订单编号 {{el.orderNo}}
                         </div>
                          <div style="fontSize:12px" class="m-6" >
                           服务时长 {{el.vipDays | months }}
                         </div>
                    </div>

                    <div class="left" style="width:80px;" >
                      {{el.orderStatus  | status  }}
                    </div>

                    <div class="left" style="width:100px;color:#FF0000" >
                     {{el.fee/100}}元
                    </div>

                    <div class="left" style="width:160px;" >
                     {{el.updateTime | times }}
                    </div>

                    <div class="left" style="width:100px;" >
                     <div class="again" @click="again(el)" >
                       再次购买
                     </div>
                    </div>
                </div>
              </div>
             <div>
        
         
              <div v-if="el.report "  > 
                <div class="ta-list">
                  <div class="list-vip">
                     <div class="left" style="width:230px;textAlign:left" >
                       <div style="fontSize:16px" class="m-6" >企业综合查询报告
                       </div>
                        <div style="fontSize:12px" class="m-6" >
                         订单编号 {{el.orderNo}}
                       </div>
                        <div style="fontSize:12px" class="m-6" >
                         发送邮箱 {{el.report.email}}
                       </div>
                     </div>

                     <div class="left" style="width:80px;" >
                        {{el.orderStatus  | status  }}
                     </div>

                     <div class="left" style="width:100px;color:#FF0000" >
                       {{el.fee/100}}元
                     </div>

                     <div class="left" style="width:160px;" >
                       {{el.updateTime | times }}
                     </div>

                     <div class="left" style="width:100px;">
                         <div class="again" :class="{'noBtn':!el.report.reportPath}" @click="resend(el)" >
                           重新发送
                         </div>
                     </div>
                </div>
                <div class="ta-report" >
                      <div class="left" style="width:190px;textAlign:left" >
                        <div style="fontSize:12px"  >
                         报告格式 PDF
                       </div>
                     </div>
                      <div class="left" style="width:180px;" >
                       {{el.report.reportPath | nopath }}
                     </div>
                     <div  class="left" style="width:300px;" :class="{'noBtn':!el.report.reportPath}">
                       <!-- <span @click='dowloadFn(el)'>下载</span> -->
                       <span @click="look(el)" >查看</span>
                       <!-- <a :download="el.report.reportPath" :href="el.report.reportPath">下载</a> -->
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
  <div class="whint"  v-show="wsend" >
    <i class="el-icon-success" ></i>&nbsp重新发送成功
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
        label:'未支付'
      },{
        value:'9',
        label:'已支付'
      }],
      allList:[],
      vipList:[],
      queryLsit:[],
      showList:[],
      feat:[],
      win:[],
      wsend:false,
      payshow:false,
      detail:{},
      iphone:'',
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
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    },
    nopath(val) {
      if(val ==null ) {
        return '生成中'
      } else {
        return '生成成功'
      }
    },
    months(val) {
      if(val == 30) {
        return '一个月'
      } else if ( val == 90 )  {
        return '三个月' 
      } else if ( val == 180 )  {
        return '六个月' 
      } else {
        return '十二个月'
      }
    }
  },
  methods: {
    bill() {
       this.$confirm('如需开发票，请联系我们0731-85076077', '提示', {
          type: 'warning',
          showCancelButton:false,
          showConfirmButton:false
        })
    },
    again() {
      this.$router.push('/buy')
    },
    gainList() {
      orderList({pageSize:'100',pageNo:'1',orderStatus:'3',channelNo:'1003'}).then( res => {
         if(res.code == 1) {
           this.feat = res.data
         } else {
           this.feat = []
         }
      })
    },
    gainWin() {
       orderList({pageSize:'100',pageNo:'1',orderStatus:'9',channelNo:''}).then( res => {
        console.log(res,2);
         if(res.code == 1) {
            this.win = res.data
            this.allList = this.win.concat(this.feat)
         } else {
           this.win = []
         }
      })
    },
    dowloadFn(el) {
      if(el.report.reportPath) {
        window.open(el.report.reportPath)
      }
    },
    type(val) {
      this.allList = []
      this.allList = this.win.concat(this.feat)
      let arr = []
        if(val == '') {
          if(this.pattern == '') {
            this.allList = []
            this.allList = this.win.concat(this.feat)
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
          } else {
            this.allList.forEach( el =>{
              if(el.orderStatus == this.pattern) {
                arr.push(el)
              }
            })
            this.allList = []
            this.allList = arr
            
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }

          }

        } else if (val == 'vip'  )  {
           if(this.pattern == '') {
             this.allList.forEach( el => {
                 if(el.report == null ) {
                   arr.push(el)
                 }
             })
             this.allList = []
             this.allList = arr
           if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
           } else {
               this.allList.forEach( el => {
                 if(el.report == null && el.orderStatus == this.pattern  ) {
                   arr.push(el)
                 }
             })
              this.allList = []
             this.allList = arr
            if( this.allList.length == 0) {
               this.noShow = false
             } else {
               this.noShow = true
             }
           }
        } else {
           if(this.pattern == '') {
             this.allList.forEach( el => {
                 if(el.report) {
                   arr.push(el)
                 }
             })
             this.allList = []
             this.allList = arr
           if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
           } else {
               this.allList.forEach( el => {
                 if(el.report == null && el.orderStatus == this.pattern  ) {
                   arr.push(el)
                 }
             })
              this.allList = []
             this.allList = arr
            if( this.allList.length == 0) {
               this.noShow = false
             } else {
               this.noShow = true
             }
           }
        }
    },
    Ctype(val) {
      this.allList = []
      this.allList = this.win.concat(this.feat)
      let arr1 =[]
      if(val == '') {
          if(this.value == '') {
            this.allList = []
            this.allList = this.win.concat(this.feat)
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
          } else {
            if(this.value == 'vip') {
              this.allList.forEach(el => {
                if(el.report == null) {
                  arr1.push(el)
                }
              })
            } else {
               this.allList.forEach(el => {
                if(el.report) {
                  arr1.push(el)
                }
              })
            }
            this.allList = []
            this.allList = arr1
            
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }

          }

        }  else if( val == '9') {
          if(this.value == '') {
            this.allList.forEach( el => {
              if(el.orderStatus == '9') {
                arr1.push(el)
              }
            })
            this.allList = []
            this.allList = arr1
            
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
          } else if (this.value == 'vip' ) {
              this.allList.forEach( el => {
              if(el.orderStatus == '9' && el.report ==null ) {
                arr1.push(el)
              }
            })
             this.allList = []
            this.allList = arr1
            
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
          } else {
               this.allList.forEach( el => {
              if(el.orderStatus == '9' && el.report ) {
                arr1.push(el)
              }
            })
             this.allList = []
            this.allList = arr1
            
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
          }
        } else {
          if(this.value == '') {
            this.allList.forEach( el => {
              if(el.orderStatus == '3') {
                arr1.push(el)
              }
            })
            this.allList = []
            this.allList = arr1
            
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
          } else if (this.value == 'vip' ) {
              this.allList.forEach( el => {
              if(el.orderStatus == '3' && el.report ==null ) {
                arr1.push(el)
              }
            })
             this.allList = []
            this.allList = arr1
            
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
          } else {
               this.allList.forEach( el => {
              if(el.orderStatus == '3' && el.report ) {
                arr1.push(el)
              }
            })
             this.allList = []
            this.allList = arr1
            
            if( this.allList.length == 0) {
              this.noShow = false
            } else {
              this.noShow = true
            }
          }
        }
    },
    resend(el) {
      if(!el.report.reportPath){
        return false
      }
      let email=el.report.email;
      let name=prompt('请输入您的新邮箱','');
      if(name!=null&&name!=''){
        email=name;
      }
      send({orderNo:el.orderNo,pkid:el.report.pkid,email:email}).then( res => {
         if(res.code == 1) {
           this.wsend = true
           setTimeout(() => {
             this.wsend = false
           }, 1500);
         }
      })
    },
    look(el) {
      if(el.report.reportPath) {
         window.open(el.report.reportPath, '_blank', )
      } 
     
    },
    downLode() {
      
    },
    text() {
       window.open('http://prefile.biaodaa.com/img/report.pdf')
    }
  },
  created () {
    this.gainList()
    this.gainWin()
    // this.listcon()
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
   position: relative;
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
    cursor: pointer;
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
      .noBtn{
        border-color: #999;
        color: #999;
         cursor: default;
      }
      .ta-report {
        height: 32px;
        line-height: 32px;
        background-color: #FAFDFF;
        color:#999;
        font-size: 12px;
        text-align: center;
        .noBtn{
          span{
            color: #999;
            cursor: default;
          }
        }
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
  .whint {
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
    background-color: #000;
    opacity: 0.5;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
  }
  
}
</style>