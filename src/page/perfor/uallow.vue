<template>
<div class="ubid">
   <div class="ub-table">
      <div class="ub-top" >
         <div class="left" style="width:60px;" >
           序号
         </div>
          <div class="left" style="width:240px;" >
           施工许可证编号
         </div>
          <div class="left" style="width:200px;" >
           省级施工许可证编号
         </div>
          <div class="left" style="width:150px;" >
           合同金额（万元）
         </div>
          <div class="left" style="width:150px;" >面积（平方米）
          </div>
          <div class="left" style="width:110px;" >发证日期
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
              <div class="" style="width:240px;" >
               {{el.buildLicence}}
             </div>
              <div class="" style="width:200px;" >
               {{el.blicence}}
             </div>
              <div class="" style="width:150px;" >
               {{el.amount ? el.amount + '万元' : ''}}
             </div>
              <div class="" style="width:150px;" >{{el.area}}
             </div>
             <div class="left" style="width:110px;" >
               {{el.licenceDate}}
             </div>
             <div class="" style="width:80px;" >
               <img src="../../assets/img/icon-chakan.png" alt="" @click="gainPeo(el)"   >
             </div>
        </div>
      </div>
        <div class="show-nou"  v-show="ubl" >
          暂无数据
        </div>
   </div>

   <div class="black-pop" v-show="isshow" >
      <div class="ur-pop"  >
        <div class="ur-title">
          <div>
              龙山县新城九年制学校太平村小改扩建项目
          </div>
          <div>
            <i class="el-icon-close"  @click="close" ></i>
          </div>
        </div>
        <div class="auto-pop" >
                 <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                          施工许可证编号
                       </div>
                        <div class="show-text" style="width:293px;" >
                         {{debid.buildLicence}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         省级施工许可证编号
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{debid.provZhongbiaoCode}}
                       </div>
                  </div>
                  <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                          施工图审查合格书编号
                       </div>
                        <div class="show-text" style="width:293px;" >
                          {{debid.reviewNumber}}
                       </div>
                        <div class="show-text blur" style="width:207px;" >
                         合同金额（万元）
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         {{debid.amount ?  debid.amount + '万元' : '' }}
                       </div>
                  </div>
                   <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                         项目经理
                       </div>
                        <div class="show-text" style="width:293px;" >
                        {{debid.pmName}}
                       </div>
                      <div class="show-text blur" style="width:207px;" >
                        项目经理身份证号
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                        {{debid.pmIdCard}}
                       </div>
                  </div>
                   <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                        项目总监
                       </div>
                        <div class="show-text" style="width:293px;" >
                        {{debid.pdName}}
                       </div>
                      <div class="show-text blur" style="width:207px;" >
                        项目总监身份证号
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                        {{debid.pdIdCard}}
                       </div>
                  </div>
                   <div class="show-del" >
                      <div class="show-text blur " style="width:207px;" >
                        面积（平方米）
                       </div>
                        <div class="show-text" style="width:293px;" >
                        {{debid.area}}
                       </div>
                      <div class="show-text blur" style="width:207px;" >
                       
                       </div>
                        <div class="show-text " style="width:291px;border:none" >
                         
                       </div>
                  </div>

                  <div class="ur-main">
                    企业主体信息
                  </div>
                  <div class="main-table">
                    <div style="width:205px;" class="bor" >
                       涉及单位  
                    </div>
                    <div style="width:310px;" class="bor"  >
                       企业名称
                    </div>
                     <div style="width:300px;" class="bor"  >
                       组织机构代码
                    </div>
                     <div style="width:150px;border:none" class="bor"  >
                       所在省份
                    </div>
                  </div>

                  <div class="main-table" style="backgroundColor: #fff;"   v-for="(el,i) in debid.companys" :key="i" >
                    <div style="width:205px;" class="bor" >
                       {{el.role}}
                    </div>
                    <div style="width:310px;" class="bor"  >
                       {{el.comName}}
                    </div>
                     <div style="width:300px;" class="bor"  >
                       {{el.orgCode}}
                    </div>
                     <div style="width:150px;border:none" class="bor"  >
                       {{el.province}}
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
    }
  },
  methods: {
    gaindet() {
      cprodet({proId:this.id,tabType:'build',pageNo:'1',pageSize:'1000'}).then(res => {
        this.company = res.data 
        if(this.company.length == 0 ) {
          this.ubl = true
        } else {
          this.ubl = false
        }
      }) 
    },
    gainPeo(el) {
      this.isshow = true
      this.modalHelper.afterOpen();
     
       lprodet({proId:this.id,tabType:'build',pkid:el.pkid}).then( res => {
        if(res.code == 1) {
          this.debid = res.data
          if(this.debid.companys.length == 0 ) {
            this.noPeoL = true
          } else {
            this.noPeoL = false
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
  margin-top: 40px;
  background-color: #fff;
  padding: 20px 10px 30px;
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
      top: 200px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      border:1px solid rgba(242,242,242,1);
      padding: 10px;
      box-sizing: border-box;
      .auto-pop {
        overflow-x: auto;
        height: 440px;
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
        min-height: 45px;
        display: flex;
        flex-direction: row;
        font-size: 14px;
        color:#999;
        border: 1px solid #F2F2F2;
        background-color: #fafdff;
         .bor {
              border-right: 1px solid #F2F2F2;
               padding: 5px 6px;
               display: flex;
               align-items: center;
               justify-content: center;
               text-align: center;
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
