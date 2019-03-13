<template>
<div class="icbc">
   <div class="ic-nav"><span :class="i==0 ? 'ic-dark' : ''"  @click='changeNavs' >基本信息</span>/<span :class="i==1 ? 'ic-dark' : ''" @click='changeNavss' >分支机构(<span style="color:#FE6603">{{length}}</span>)</span></div>
   <!-- 基本信息 -->
   <div class="ic-basic" v-show="infor">
      <div class="ic-line">
        <div class="left line-f">
           法定代表人
        </div>
        <div class="left f-color line-r">
           {{details.legalPerson}}
        </div>  
      </div>
      <div class="ic-line">
        <div class="left line-f">
           注册资本
        </div>
        <div class="left f-color line-r">
           {{details.regisCapital}}
        </div>  
      </div>
      <div class="ic-line">
        <div class="left line-f">
           注册号
        </div>
        <div class="left f-color line-r">
           {{details.businessNum}}
        </div>  
      </div>
      <div class="ic-line">
        <div class="left line-f">
          企业类型
        </div>
        <div class="left f-color line-r">
           {{details.economicType}}
        </div>  
      </div>
      <div class="ic-line">
        <div class="left line-f">
           安许证号
        </div>
        <div class="left f-color line-r">
          {{details.certNo}}
        </div>  
      </div>
      <div class="ic-line">
        <div class="left line-f">
           安许期至
        </div>
        <div class="left f-color line-r">
          {{details.validDate}}
        </div>  
      </div>
      <div class="ic-line">
        <div class="left h-auto">
           经营范围
        </div>
        <div class="left f-color min-h">
           {{details.comRange}}
        </div>  
      </div>
   </div>
   <!-- 分支机构 -->
    <div class="ic-basic" v-show="branch">
       <div class="list-nav">
         <div class="left" style="width:72px" >
           序号
         </div>
         <div class="left" style="width:200px" >
           企业名称
         </div>
         <div class="left" style="width:100px" >
           负责人
         </div>
         <div class="left" style="width:150px" >
           联系方式
         </div>
         <div class="left" style="width:250px" >
           地址
         </div>
       </div>
       <div class="list-co" v-for="(el,i) in list" :key="i" >
         <div class="left" style="width:72px" >
           {{i+1}}
         </div>
         <div class="left" style="width:200px" >
            <span style="color:#FE6603" >{{el.comName}}</span>
         </div>
         <div class="left" style="width:100px" >
           {{el.legalPerson}}  
         </div>
         <div class="left" style="width:150px" >
           {{el.phone}}
         </div>
         <div class="left" style="width:250px" >
           {{el.comAddress}}
         </div>
       </div>
    </div>
</div>
</template>
<script>
import { Branch,getJsonData } from '@/api/index'
export default {
  data () {
    return {
      i:0,
      infor:true,
      branch:false,
      list:[],
      length:'',
      details:{},
      id:''
    }
  },
  methods: {
    changeNavs() {
      this.i  = 0
      this.infor = true
      this.branch = false
    },
    changeNavss() {
      if(this.length ==0 ) {
         return
      }
      this.i = 1
      this.infor = false
      this.branch = true
    },
    gainList() {
      this.id = this.$route.query.id
       let dataParam = JSON.stringify({
          
        });
        getJsonData( "/company/" + this.id ).then(res => {
            if(res.code == 1) {
              this.details = res.data
            }
        });
    },
    gainBranch() {
      Branch({comId:this.id}).then(res => {
         if(res.code == 1) {
           this.list = res.data
           var iar = []
           this.list.forEach( el => {
               if(el.phone) {
                  iar = el.phone.split(';')
                  el.phone = iar[0]
                  iar = []
               } else {
                 return
               }           
           })
           this.length = res.data.length
         }
      })
    }
  },
  created () {
    this.gainList()
    this.gainBranch()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.icbc{
  background-color: #fff;
  overflow: hidden;
  .ic-nav {
    font-size: 14px;
    color:#999;
    margin: 15px 0 14px 23px;
    cursor: pointer;
    font-weight: 550;
  }
  .ic-dark {
    color:#333;
  }
  .ic-basic {
    margin: 0 10px 15px 10px; 
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    .ic-line{
      font-size: 12px;
      color:#333;
      font-weight: 550;
      min-height: 40px;
      background-color: #FAFDFF;
      display: flex;
      align-items: center;

      border-bottom: 1px solid #f2f2f2;
      overflow: hidden;
      .line-f {
        background-color: #FAFDFF;
        padding-left: 19px;
        display: flex;
        align-items: center;
        border-right: 1px solid #f2f2f2;
        min-width: 150px;
        max-height: 200px;
        min-height: 40px;
        height: auto;
        box-sizing: border-box;
      }
      .h-auto {
        display: flex;
        align-items: center;
        min-width: 150px;
        padding-left: 19px;
        min-height: 40px;
        box-sizing: border-box;
      }
      .line-r {
        padding-left: 40px;
        width: 100%;
        height: 40px;
        line-height: 40px;
      }
      .min-h {
        min-height: 40px;
        box-sizing: border-box;
        padding: 16px 15px 15px 40px;
        border-left: 1px solid #f2f2f2;

      }
    }
    .list-nav {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 12px;
      color:#333;
      border-bottom: 1px solid #f2f2f2;
    }
    .list-co {
      color: #999;
      text-align: center;
      min-height: 40px;
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 5px 0;
      box-sizing: border-box; 
    }
  }
  .f-color {
    background-color: #fff;
    
  }
  
}
</style>