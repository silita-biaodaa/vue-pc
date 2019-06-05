<template>
<div class="perlist">
   <div class="per-option">
      <per-por :state='state' @perPor='gainPor'  ></per-por>
      <div class="select">
            <el-row>
                <el-col :span='2'>项目类别:
                </el-col>
                <el-col :span='22'>
                    <ul class='left pro' >
                      <li v-for='(el,i) in classif' :key='i' class='left' :class="el.value == proType ? 'current':''"  @click='levelif(el)' >{{el.name}}
                      </li>
                    </ul>
                </el-col>
            </el-row>
     </div>
     <m-oney @amount='gainMon' ></m-oney>
     <per-time  @time='gaintime' ></per-time>
   </div>
   <div class="per-total">
     <!-- 标大大为您找到<span class="p-color" >{{total}}</span>条业绩信息 -->
     共搜索到<span class="p-color" >{{total}}</span>条住建部业绩信息
   </div>


   <div class="per-lists" v-show="Snone" >
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

        <a class="per-del " v-for="(el,i) in perlist" :key="i"  @click="decide(el)" :class="el.is ? 'vi-color' : 'per-color'"  >
           <div class="left " style="width:80px;">
              {{(current-1)*20+(i+1)}}
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
              :currents='current'
              @skip='Goto'
              ></nav-page>
         </div>
   </div>

  <div class="no-list" v-show="!Snone"  >
    <img src="../../assets/img/card.png" alt="">
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
      proType:null,
      area:'',
      amountStart:'',
      amountEnd:'',
      comStartDate:'',
      comEndDate:'',
      current:1,
      total:0,
      perlist:[],
      Snone:true,
      search:'',
      svip:false
    }
  },
  methods: {
    gainPor(val) {
      this.area = val.cur
      this.current = 1
      this.gainList()
    },
    levelif(el) {
            if(el.value  == '') {
               this.proType = null
            } else {
              this.proType = el.value
            }
             this.current = 1
             this.gainList()

    },
    gainMon(val) {
      this.amountStart = val.state
      this.amountEnd = val.end
      this.current = 1
      this.gainList()
    },
    gaintime(val) {
      this.comStartDate = val.old
      this.comEndDate = val.new
      this.current = 1
      this.gainList()
    },
    gainList() {
      project({pageNo:this.current,proName:this.search,pageSize:20,amountStart:this.amountStart,amountEnd:this.amountEnd,proType:this.proType,area:this.area,tabType:"project",buildStart:this.comStartDate,buildEnd:this.comEndDate}).then(res => {
         if(res.code == 1 ) {
           if( res.data) {
               res.data.forEach(el => {
                el.is = false
              })
              this.total = res.total
              this.perlist = res.data 
              this.Snone = true
           } else {
             this.total = 0
             this.Snone = false
           }

         }
      })
    },
    Goto(val) {
       this.current = val.cur;
       this.gainList()
       if(document.documentElement.scrollTop) {
        document.documentElement.scrollTop=492
      } else {
         document.body.scrollTop=492
      }

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
         this.$confirm('暂无权限，请先登录', '提示', {
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
      this.search = val
      this.current = 1
       this.gainList()
    }
  },
  created () {
    this.search = localStorage.getItem('title') ? localStorage.getItem('title') : ''
  },
  components: {
  }
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
          a:visited{color:#FE6603}
          a:hover{color:#FE6603}
     }
}
</style>