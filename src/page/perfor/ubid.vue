<template>
<div class="ubid">
   <div class="ub-table">
      <div class="ub-top" >
         <div class="left" style="width:60px;" >
           序号
         </div>
          <div class="left" style="width:340px;" >
           中标单位名称
         </div>
          <div class="left" style="width:130px;" >
           中标金额(万元)
         </div>
          <div class="left" style="width:145px;" >
           招标类型
         </div>
          <div class="left" style="width:130px;" >
           招标方式
         </div>
          <div class="left" style="width:110px;" >
           中标日期
         </div>
         <div class="left" style="width:80px;" >
          查看
         </div>
      </div>
      <div class="ub-text" v-for="(el,i) in company" :key="i"  >
        <div  class="show-l">
             <div class="" style="width:60px;" >
                {{i+1}}
             </div>
              <div class="" style="width:340px;" >
               {{el.zhongbiaoCompany}}
             </div>
              <div class="" style="width:130px;" >
               {{el.zhongbiaoAmount + '万元'}}
             </div>
              <div class="" style="width:145px;" >
               {{el.zhaobiaoType}}
             </div>
              <div class="" style="width:130px;" >
               {{el.zhaobiaoWay}}
             </div>
              <div class="" style="width:110px;" >
               {{el.zhongbiaoDate}}
             </div>
             <div class="" style="width:88px;" >
               <img src="../../assets/img/icon-chakan.png" alt="" @click="gainPeo(el)"   >
             </div>
        </div>
      </div>
        <div class="show-nou"  v-show="ubl" >Sorry，暂未查询到该业绩的招投标信息</div>
   </div>

   <div class="black-pop" v-if="isshow" >
      <div class="ur-pop"  >
        <div class="ur-title">
          <div>
              {{titles}}
          </div>
          <div>
            <i class="el-icon-close"  @click="close" ></i>
          </div>
        </div>
        <div class="auto-pop" >
                 <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                          项目编号
                       </div>
                        <div class="show-text" style="width:293px;" >
                         {{debid.zhongbiaoCode}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         省级项目编号
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{debid.provZhongbiaoCode}}
                       </div>
                  </div>
                  <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                          建设单位
                       </div>
                        <div class="show-text" style="width:293px;" >
                          {{debid.zhongbiaoCompany}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         建设单位组织机构代码（统一社会信用代码）
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{debid.zhongbiaoCompanyCode}}
                       </div>
                  </div>
                   <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                          项目分类
                       </div>
                        <div class="show-text" style="width:293px;" >
                        {{debid.zhaobiaoType}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         项目属地
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{area}}
                       </div>
                  </div>
                   <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                          中标日期
                       </div>
                        <div class="show-text" style="width:293px;" >
                         {{debid.zhongbiaoDate}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         中标金额（万元）
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{debid.zhongbiaoAmount + '万元'}}
                       </div>
                  </div>
                   <div class="show-del"  >
                      <div class="show-text blur " style="width:207px;" >
                          建设规模
                       </div>
                        <div class="show-text" style="width:293px;" >
                         {{debid.proScope}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         面积（平方米）
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{debid.acreage}}
                       </div>
                  </div>
                  <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                          招标代理单位名称
                       </div>
                        <div class="show-text" style="width:293px;" >
                         {{debid.zhaobiaoAgencyCompany}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         招标代理单位组织机构代码
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{debid.zhaobiaoCompanyCode}}
                       </div>
                  </div>
                  <div class="show-del">
                      <div class="show-text blur " style="width:207px;" >
                         中标单位名称
                       </div>
                        <div class="show-text" style="width:293px;" >
                         {{debid.zhongbiaoCompany}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         中标单位组织机构代码
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{debid.provZhongbiaoCode}}
                       </div>
                  </div>
                  <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                          项目经理/总监理工程师姓名
                       </div>
                        <div class="show-text" style="width:293px;" >
                         {{debid.name}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         项目经理/总监理工程师身份证号码
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{debid.idCard}}
                       </div>
                  </div>

                  <div class="show-del"  >
                      <div class="show-text blur " style="width:207px;" >
                          登记时间
                       </div>
                        <div class="show-text" style="width:293px;" >
                          {{debid.recordDate}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >

                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                        
                       </div>
                  </div>
                  <div class="ur-main">
                    主要参与人员
                  </div>
                  <div class="main-table">
                    <div style="width:150px;" class="bor" >
                       姓名
                    </div>
                    <div style="width:180px;" class="bor"  >
                       人员类别
                    </div>
                     <div style="width:250px;" class="bor"  >
                       证书编号
                    </div>
                     <div style="width:250px;" class="bor"  >
                       安全证书编号
                    </div>
                     <div style="width:125px;"  >
                       状态
                    </div>
                  </div>

                  <div class="main-table" style="backgroundColor: #fff;"  v-for="(el,i) in debid.personList" :key="i"  >
                    <div style="width:150px;" class="bor" >
                       {{el.name}}
                    </div>
                    <div style="width:180px;" class="bor"  >
                       {{el.role}}
                    </div>
                     <div style="width:250px;" class="bor"  >
                       {{el.certNo}}
                    </div>
                     <div style="width:250px;" class="bor"  >
                       {{el.safeNo}}
                    </div>
                     <div style="width:125px;"  >
                       {{el.status}}
                    </div>
                  </div>
                  <div class="main-no"  v-show="noPeo" >
                    暂无数据
                  </div>
        </div>
     
      </div>
   </div>
   

</div>
</template>
<script>
import { cprodet,lprodet } from '@/api/index';
export default {
  data () {
    return {
      id:'',
      company:[],
      isshow:false,
      title:'',
      debid:{},
      noPeo:false,
      ubl:false,
      noPeoL:false
    }
  },
  props: ['titles','area'],
  methods: {
    gaindet() {
      cprodet({proId:this.id,tabType:'zhaotoubiao',pageNo:'1',pageSize:'1000'}).then(res => {
        this.company = res.data 
        if(this.company.length == 0 ) {
          console.log(1);
          
          this.ubl = true
        } else {
          this.ubl = false
        }
      }) 
    },
    gainPeo(el) {
      this.isshow = true
      this.modalHelper.afterOpen();
     
       lprodet({proId:this.id,tabType:'zhaotoubiao',company:el.zhongbiaoCompany,pkid:el.pkid,zhaobiaoType:el.zhaobiaoWay }).then( res => {
        if(res.code == 1) {
          this.debid = res.data
          if(this.debid.personList.length == 0) {
            this.noPeo = true
          } else {
             this.noPeo = false
          }
        }
      })
    },
    close() {
      this.modalHelper.beforeClose();
      this.isshow = false
    }
  },
  created () {
    this.id = this.$route.query.id;
    this.gaindet()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.ubid {
  background-color: #fff;
  padding: 0 10px 30px;
  margin-bottom: 200px;
  .ub-table {
    border: 1px solid #F2F2F2;
    .ub-top {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #F2F2F2;
      text-align: center;
      font-size: 14px;
      color: #333;
      font-weight: 550;
    }
  
    .ub-text {
      min-height: 56px;
      overflow: hidden;
      text-align: center;
      font-size: 14px;
      color:#333;
 
      .show-l {
        overflow: hidden;
        display: flex;
        flex-direction: row;
        min-height: 55px;
        align-items: center;
        border-bottom: 1px solid #F2F2F2;
      }
      
      img {
        vertical-align:bottom;
        cursor: pointer;
      }
      
    }
    
  }
  .show-nou {
         min-height: 55px;
         line-height: 55px;
         color:#999;
         font-size: 14px;
         text-align: center;
         border-bottom: 1px solid #F2F2F2;
      }
  .black-pop {
    z-index: 99999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left:0;
    background: rgba(0,0,0,.5);
     .ur-pop {
      width: 998px;
      height: auto;
      position: fixed;
      top: 110px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      border:1px solid rgba(242,242,242,1);
      padding: 10px;
      box-sizing: border-box;
      .auto-pop {
        overflow-x: auto;
        height: 420px;
      }
      .ur-title {
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        color:#EC7522;
        font-weight: 550;

        i {
          font-size: 30px;
          cursor: pointer;
        }
      }
      .ur-main {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 18px;
        color:#FE6603;
      }
      .main-table {
        height: 45px;
        line-height: 45px;
        display: flex;
        flex-direction: row;
        text-align: center;
        font-size: 14px;
        color:#999;
        border: 1px solid #F2F2F2;
        background-color: #fafdff;
         .bor {
              border-right: 1px solid #F2F2F2;
            }
      }
      .main-no {
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        color:#999;
        text-align: center;
        border: 1px solid #F2F2F2;

      }
      .show-del {
           display: flex;
           flex-direction: row;
           min-height: 40px;
           border: 1px solid #F2F2F2;
           font-size: 14px;
          .show-text {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 0;
            border-right: 1px solid #F2F2F2;
           
          }
        }
    }
  }
  
}
</style>
