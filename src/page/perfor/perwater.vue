<template>
<div class="perlist">
   <div class="per-option">
      <per-por :state='data.area'  @perPor='gainPor'  ></per-por>
      <div class="select">
            <el-row>
                <el-col :span='2'>业绩类别:
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
     共搜索到<span class="p-color" >{{total}}</span>条水利部业绩信息
   </div>


   <div class="per-lists">
     <div class="t-size per-navs" >
           <div class="left" style="width:60px;">
              序号
           </div>
             <div class="left" style="width:280px;">
              项目名称
           </div>
             <div class="left" style="width:220px;">
              施工单位
           </div>
             <div class="left" style="width:140px;">
              合同金额
           </div>
            <div class="left" style="width:80px;">
              业绩类别
           </div>
            <div class="left" style="width:120px;">
              完工日期
           </div>
             <div class="left" style="width:120px;">
              项目属地
           </div>
      </div>    


      <!-- 判断是否加载中 -->
      <template v-if="isajax">
          <!-- 有数据 -->
          <template v-if="perlist&&perlist.length>0">
            <a class="per-del " v-for="(el,i) in perlist" :key="el.pkid"  @click="decide(el,i)" :class="el.is ? 'vi-color' : 'per-color'" >
              <div class="left " style="width:60px;">
                  {{(data.pageNo-1)*20+(i+1)}}
              </div>
                <div class="left show-f" style="width:280px;">{{el.proName}}
              </div>
                <div class="left show-f" style="width:220px;">
                  {{el.comName}}
              </div>
              <div class="left" style="width:140px;">
                  {{el.amount ? el.amount : '暂无'}}
              </div>
                <div class="left" style="width:80px;">
                  {{el.proType ? el.proType : '暂无'}}
              </div>
                <div class="left" style="width:120px;">
                  {{el.build ? el.build : ' '}}
              </div>
                <div class="left" style="width:120px;">
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
      svip:false,
      classif:[
        {
          name:'全部',
          value:null
        },
        {
          name:'施工',
          value:'施工',
        },
        {
          name:'监理',
          value:'监理',
        },
        {
          name:'设计',
          value:'设计'
        },
        {
          name:'勘察',
          value:'勘察'
        },
        {
          name:'招标代理',
          value:'招标代理'
        },
        {
          name:'检测',
          value:'检测'
        },
        {
          name:'供货',
          value:'供货'
        },
        {
          name:'咨询',
          value:'咨询'
        },
        {
          name:'机械制造',
          value:'机械制造'
        },
        {
          name:'移民监督',
          value:'移民监督'
        }
      ],
      amountEnd:'',
      total:0,
      perlist:[],
      loading:true,
      isajax:false,
      data:{
        pageNo:1,
        proName:'',
        pageSize:20,
        amountStart:'',
        amountEnd:'',
        proType:null,
        area:'',
        tabType:"shuili",
        buildStart:'',
        buildEnd:'',
        comName:'',
        comId:'',
      }

    }
  },
  inject:['reload'],
  methods: {
    closeload(val) {
      this.svip = val.cur
    },
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
            this.perlist=[];
            this.data.pageNo = 1
            this.isajax=false;
            this.gainList()
    },
    gainMon(val) {
      this.data.amountStart = val.state
      this.data.amountEnd = val.end
      this.data.pageNo = 1
      this.perlist=[];
      this.isajax=false;
      this.gainList()
    },
    gaintime(val) {
      this.data.buildStart = val.old
      this.data.buildEnd = val.new
      this.data.pageNo = 1
      this.perlist=[];
      this.isajax=false;
      this.gainList()
    },
    gainList() {  
      if(sessionStorage.getItem('searchType')||sessionStorage.getItem('searchType')==1){

      }
      let that=this;
      project(this.data).then(res => {
        this.isajax=true;
        if(res.code == 1 ) {
          res.data.forEach(el => {
            el.is = false
          })
          this.total = res.total
          this.perlist = res.data
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
    decide(el) {
      if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken') ) {
        // this.perlist[el].is = true
         if(localStorage.getItem('permissions')) {
           el.is = true
            const { href } = this.$router.resolve({
              path:'/irrigation',query:{id:el.pkid} 
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
        this.data.comName = val
        this.data.comId=sessionStorage.getItem('companyId');
      }else{
        this.data.proName = val
      }
      this.perlist=[];
      this.isajax=false;
      this.data.pageNo = 1
      this.gainList()
    },
    data:{
      handler(val,old){
        sessionStorage.setItem('slSerach',JSON.stringify(val));
      },
      deep:true
    }
  },
  created () {
    // this.search = localStorage.getItem('title') ? localStorage.getItem('title') : ''
    //如果是刷新操作，则复现上次
    if(sessionStorage.getItem('slSerach')){
      let data=JSON.parse(sessionStorage.getItem('slSerach'));
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
    sessionStorage.removeItem('slSerach')
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
        margin-bottom: 20px;
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
          a:visited{color:#FE6603}

          .c-page {
            width:1020px;
            margin: 0 auto;
            height:100px;
            background-color:#fff;
            padding-top: 50px;
            display: flex;
            justify-content: center;

          }
          // a:visited{color:#FE6603}
          a:hover{color:#FE6603}
     }
}
</style>