<template>
<div class="perlist">
   <div class="per-option">
      <per-por :state='data.area'  @perPor='gainPor'></per-por>
      <div class="select">
            <el-row>
                <el-col :span='2'>项目类别:
                </el-col>
                <el-col :span='22'>
                    <ul class='left pro' >
                      <li v-for='(el,i) in classif' :key='i' class='left' :class="el.value == data.proType ? 'current':''"  @click='levelif(el)' >{{el.name}}
                      </li>
                    </ul>
                </el-col>
            </el-row>
     </div>
     <m-oney @amount='gainMon' ></m-oney>
     <per-time  @time='gaintime' ></per-time>
   </div>
   <div class="per-total">
     共搜索到<span class="p-color" >{{total}}</span>条住建部业绩信息
   </div>


   <div class="per-lists">
     <div class="t-size per-navs" >
           <div class="left" style="width:80px;">
              序号
           </div>
             <div class="left" style="width:350px;">
              项目名称
           </div>
             <div class="left" style="width:120px;">
              项目类别
           </div>
             <div class="left" style="width:180px;">
              合同金额
           </div>
             <div class="left" style="width:150px;">
              竣工日期
           </div>
             <div class="left" style="width:140px;">
              项目属地
           </div>
      </div>    
      <!-- 判断是否加载中 -->
      <template v-if="isajax">
          <!-- 有数据 -->
          <template v-if="perlist&&perlist.length>0">
            <a class="per-del " v-for="(el,i) in perlist" :key="i"  @click="decide(el)" :class="el.is ? 'vi-color' : 'per-color'"  >
              <div class="left " style="width:80px;">
                  {{(data.pageNo-1)*20+(i+1)}}
              </div>
                <div class="left" style="width:350px;textAlign:left">{{el.proName}}
              </div>
                <div class="left" style="width:120px;">
                  {{el.proType}}
              </div>
                <div class="left" style="width:180px;">
                  {{el.amount ? el.amount : '暂无'}}
              </div>
                <div class="left" style="width:150px;">
                  {{el.buildEnd ? el.buildEnd : '--'}}
              </div>
              <div class="left" style="width:140px;">
                  {{el.province}}
              </div>
            </a>
            <div class="c-page" >
                  <nav-page 
                  :all='total'
                  :currents='data.pageNo'
                  @skip='Goto'
                  ></nav-page>
            </div>
          </template>
          <!-- 无数据  -->
          <template v-else-if="perlist&&perlist.length==0">
            <div class="no-toast">
              <img src="../../assets/img/bank_card @2x.png" alt="">
              <span>Sorry，没有找到符合条件的业绩信息</span>
            </div>
          </template>
          <!-- 加载失败 -->
          <template v-else-if="!perlist">
            <div class="ajax-erroe">
              <img src="../../assets/img/pic-zoudiu.png"/>
              <span @click="recoldFn">刷新</span>
            </div>
          </template>
      </template>
      <template v-else>
        <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
      </template>


        
   </div>
   <f-vip @toChildEvent='closeload' v-if='svip' ></f-vip>
</div>
</template>
<script>
import { project } from '@/api/index'
export default {
  data () {
    return {
      classif:[
        {
          name:'全部',
          value:null
        },
        {
          name:'房屋建筑工程',
          value:'房屋建筑工程',
        },
        {
          name:'市政工程',
          value:'市政工程',
        },
        {
          name:'其他',
          value:'其他'
        }
      ],
      total:0,
      perlist:[],
      loading:true,
      isajax:false,
      svip:false,
      data:{
        pageNo:1,
        proName:'',
        pageSize:20,
        amountStart:'',
        amountEnd:'',
        proType:null,
        area:'',
        tabType:"project",
        buildStart:'',
        buildEnd:'',
        comName:'',
        comId:'',
      },
    }
  },
  inject:['reload'],
  methods: {
    gainPor(val) {
      this.data.area = val.cur
      this.perlist=[];
      this.data.pageNo = 1
      this.isajax=false;
      this.gainList()
    },
    levelif(el) {
      if(el.value  == '') {
          this.data.proType = null
      } else {
        this.data.proType = el.value
      }
      this.perlist=[]
      this.data.pageNo = 1
      this.isajax=false;
      this.gainList()

    },
    gainMon(val) {
      this.data.amountStart = val.state
      this.data.amountEnd = val.end
      this.perlist=[]
      this.data.pageNo = 1
      this.isajax=false;
      this.gainList()
    },
    gaintime(val) {
      this.data.buildStart = val.old
      this.data.buildEnd = val.new
      this.perlist=[]
      this.data.pageNo = 1
      this.isajax=false;
      this.gainList()
    },
    gainList() {
      let that=this;
      project(this.data).then(res => {
         if(res.code == 1 ) {
           this.isajax=true;
           if( res.data) {
               res.data.forEach(el => {
                el.is = false
              })
              this.total = res.total
              this.perlist = res.data 
              // this.Snone = true
           } else {
             this.total = 0
            //  this.Snone = false
           }
         }
      }).catch(function(res){
          that.isajax=true;
          that.perlist=null;
      })
    },
    Goto(val) {
       this.data.pageNo = val.cur;
       this.perlist=[];
       this.isajax=false;
       this.gainList()
       this.funcom.toList(530)
    },
    closeload(val) {
      this.svip = val.cur
    },
     decide(el) {
      if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken') ) {
        // this.perlist[el].is = true
        if(localStorage.getItem('permissions')) {
          el.is = true
            const { href } = this.$router.resolve({
              path:'/urban',query:{id:el.proId} 
            })
          window.open(href, '_blank', )
        } else {
          this.svip = true
          this.modalHelper.afterOpen();
        }
        
      } else {
         this.$confirm(this.qjTipTxt, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/logo')
        }).catch(() => {
               
        });
      }
    },
    //刷新
    recoldFn(){
      this.reload();
    }
  },
  props: {
    state:'',
    title:''
  },
  watch: {
    title(val) {
      if(this.$parent.searchType==1){
        this.data.proName=''
        this.data.comName = val
        this.data.comId=sessionStorage.getItem('companyId');
      }else{
        this.data.comName='';
        this.data.comId='';
        this.data.proName = val
      }
      this.data.pageNo = 1
      this.gainList()
    },
    data:{
      handler(val,old){
        sessionStorage.setItem('yjSerach',JSON.stringify(val));
      },
      deep:true
    }
  },
  created () {
    this.data.proName = localStorage.getItem('title') ? localStorage.getItem('title') : ''
    //如果是刷新操作，则复现上次
    if(sessionStorage.getItem('yjSerach')){
      let data=JSON.parse(sessionStorage.getItem('yjSerach'));
      this.$parent.title=data.proName!=''?data.proName:data.comName;
      if(data.comName!=''){
        this.$parent.searchType=1
      }else{
        this.$parent.searchType=0
      }
      this.data=data;
    } else {
      this.data.area= this.state
    }
    this.gainList();
  },
  beforeDestroy(){
    sessionStorage.removeItem('yjSerach')
  },
}
</script>
<style lang="less" >
.perlist {
  .per-option {
    padding: 15px 10px 10px;
    background-color: #fff;
    font-size: 14px;
  }
    .select {
       font-size: 16px;
       margin-bottom: 12px;
       .pro {
         li {
           padding: 2px 9px;
           height: 20px;
           text-align: center;
           line-height: 20px;
           margin-bottom: 6px;
           cursor: pointer;
           color:#666;
         }
         .bid-p {
           padding: 2px 9px;
           color:#666;
         }
         .current {
           background-color: #FE6603;
           color:#fff;
         }
       }
      .el-select {
        width: 225px;
        margin-right: 10px;
      }
      .el-checkbox-button__inner {
        border: none;
        margin-bottom: 12px;
        font-size: 15px;
        padding: 5px 10px;
        color:#666;
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        color:#fff;
        background-color: #FE6603;
        border-color: #FE6603;
        box-shadow: -1px 0 0 0 #fff; 
      }
      .el-checkbox-button:first-child .el-checkbox-button__inner {
        border-radius: 0;
      }
     }
     .per-total {
        width: 1020px;
        color: #666;
        font-size: 14px;
        margin: 14px auto;
     }
     .per-lists {
        background-color: #fff;
        margin-bottom: 125px;
       .t-size {
           font-size: 14px;
           color:#000;           
         }
         .per-navs {
           height: 70px;
           line-height: 70px;
           text-align: center;
           border-bottom: 1px solid #f2f2f2;
         }
         .per-del {
           min-height: 70px;
           display: flex;
           align-items: center;
           text-align: center;
           border-bottom: 1px solid #f2f2f2;
         }
          .c-page {
            width:1020px;
            margin: 0 auto;
            // height: 100px;
            background-color:#fff;
            padding-top: 50px;
            padding-bottom: 75px;
            display: flex;
            justify-content: center;
          }
          a:visited{color:#FE6603}
          a:hover{color:#FE6603}
     }
}
</style>