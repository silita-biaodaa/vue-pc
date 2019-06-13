<template>
<div class="perlist">
   <div class="per-option">
      <per-por :state='state' :address="data.area" @perPor='gainPor'  ></per-por>
      <div class="select">
            <el-row>
                <el-col :span='2'>信息来源:
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
     共搜索到<span class="p-color" >{{total}}</span>条交通部业绩信息
   </div>


   <div class="per-lists" v-show="Snone"  >
     <div class="t-size per-navs" >
           <div class="left" style="width:60px;">
              序号
           </div>
             <div class="left " style="width:260px;">
              项目名称
           </div>
            <div class="left" style="width:160px;">
              标段名称
           </div>
             <div class="left" style="width:200px;">
              施工单位
           </div>
             <div class="left" style="width:140px;">
              合同金额
           </div>
           
            <div class="left" style="width:100px;">
             交工日期
           </div>
             <div class="left" style="width:100px;">
              项目属地
           </div>
      </div>    


        <a  class="per-del " v-for="(el,i) in perlist" :key="i"  @click="decide(el,i)" :class="el.is ? 'vi-color' : 'per-color'"  >
            <div class="left " style="width:60px;">
              {{(data.pageNo-1)*20+(i+1)}}
           </div>
            <div class="left  show-f" style="width:260px;">{{el.proName}}
           </div>
           <div class="left" style="width:160px;">
              {{el.section ? el.section : '/'}}
           </div>
             <div class="left" style="width:200px;">
               {{el.comName}}
           </div>
           <div class="left" style="width:140px;">
              {{el.amount ? el.amount + '万元' : '/'}}
           </div>
            
             <div class="left" style="width:100px;">
              {{el.buildEnd ? el.buildEnd : '--'}}
           </div>
             <div class="left" style="width:100px;">
              {{el.proWhere}}
           </div>

        </a>

         <div class="c-page" >
              <nav-page 
              :all='total'
              :currents='data.pageNo'
              @skip='Goto'
              ></nav-page>
         </div>
   </div>
  <div class="no-toast" v-show="!Snone" >
      <img src="../../assets/img/bank_card @2x.png" alt="">
      <span>Sorry，没有找到符合条件的业绩信息</span>
    </div>
  <f-vip @toChildEvent='closeload' v-if='svip' ></f-vip>
</div>
</template>
<script>
import { project } from '@/api/index'
export default {
  data () {
    return {
      svip:false,
      classif:[
        {
          name:'全部',
          value:null
        },
        {
          name:'省厅审核',
          value:'省厅审核',
        },
        {
          name:'省厅录入',
          value:'省厅录入',
        }
      ],
      amountEnd:'',
      total:0,
      perlist:[],
      Snone:true,
      data:{
        pageNo:1,
        proName:'',
        pageSize:20,
        amountStart:'',
        amountEnd:'',
        proType:null,
        area:'',
        tabType:"jiaotong",
        buildStart:'',
        buildEnd:''
      }
    }
  },
  methods: {
    closeload(val) {
      this.svip = val.cur
    },
    gainPor(val) {
      this.data.area = val.cur
      this.data.pageNo = 1
      this.gainList()
    },
    levelif(el) {
        if(el.value  == '') {
           this.data.proType = null
        } else {
          this.data.proType = el.value
        }
         this.data.pageNo = 1
         this.gainList()
    },
    gainMon(val) {
      this.data.amountStart = val.state
      this.data.amountEnd = val.end
      this.data.pageNo = 1
      this.gainList()
    },
    gaintime(val) {
      this.data.buildStart = val.old
      this.data.buildEnd = val.new
      this.data.pageNo = 1
      this.gainList()
    },
    gainList() {
      project(this.data).then(res => {
         if(res.code == 1 ) {
            res.data.forEach(el => {
             el.is = false
           })
           this.total = res.total
           this.perlist = res.data
          if(res.data.length == 0 ) {
             this.Snone = false
           } else {
              this.Snone = true
           }
         }
      })
    },
    Goto(val) {
       this.data.pageNo = val.cur;
       this.gainList()
       this.funcom.toList(492)
    },
     decide(el) {
      if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken') ) {
         if(localStorage.getItem('permissions')) {
             el.is = true
          const { href } = this.$router.resolve({
            path:'/traffic',query:{id:el.pkid} 
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
  },
  props: {
    state:'',
    title:''
  },
  watch: {
    title(val) {
      this.data.proName = val
      this.data.pageNo = 1
      this.gainList()
    },
    data:{
      handler(val,old){
        sessionStorage.setItem('jtSerach',JSON.stringify(val));
      },
      deep:true
    }
  },
  created () {
    // this.search = localStorage.getItem('title') ? localStorage.getItem('title') : ''
    //如果是刷新操作，则复现上次
    if(sessionStorage.getItem('jtSerach')){
      let data=JSON.parse(sessionStorage.getItem('jtSerach'));
      this.data=data;
    }
    this.gainList();
  },
  beforeDestroy(){
    sessionStorage.removeItem('jtSerach')
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
        margin-bottom: 200px;
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
            margin: 0 auto 210px;
            height: 210px;
            background-color:#fff;
            padding-top: 70px;
            display: flex;
            justify-content: center;

          }
     }
}
</style>