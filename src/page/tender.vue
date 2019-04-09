<template>
<div class="tender">
    <en-search
    @vague='entitle'
    ></en-search>

    <div class="t-options">
        <div class="select">
            <el-row>
               <el-col :span="2">
                  省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:
               </el-col>
               <el-col :span="22">
                  <ul class='pro' >
                    <li v-for='(el,i) in areas' :key='i' class='left' :class="el.name==area? 'current':''"  @click='eval(el)'>
                      {{el.name}}
                    </li>
                  </ul>
               </el-col>
            </el-row>
        </div>
        <!-- <div class="select">
           <el-row>
              <el-col :span="2">
                类&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp型:
              </el-col>
              <el-col :span="22">
                  <ul class='left pro' >
                      <li v-for='(el,i) in projectTypes' :key='i' class='left' :class="el.key == projectType ? 'current':''"  @click='evalclass(el)' >
                         {{el.name}}
                      </li>
                  </ul>
              </el-col>
           </el-row>
        </div> -->
        <div class="select">
           <el-row>
             <el-col :span="2" class="t-5">
                中标金额:
             </el-col>
             <el-col :span="14">
                <ul class='pro' >
                    <li v-for='(el,i) in sums' :key='i' class='left l-30' :class="el.s==start? 'current':''"  @click='evalsum(el)'  >
                       {{el.name}}
                    </li>
                </ul>
             </el-col>
             <el-col :span="8" class="ttt">
                <el-input
                  placeholder="最低价"
                  v-model="low"
                  clearable>
                </el-input>
                <div class="in-line">
                </div> 
                <el-input
                  placeholder="最高价"
                  v-model="high"
                  clearable>
                </el-input>
                <div class="t-btn" @click='fade' >
                    确定
                </div>
             </el-col>
           </el-row>
        </div>      
    </div>
    <div class="total">
      共搜索到<span>{{total}}</span>条中标公告
    </div>
    <div class="t-list" v-show="Snone" v-loading="loading" element-loading-text="拼命加载中">
         <a  v-for="(el,i ) of queryLists" :key="i"  @click="decide(el)" >
           <div class="m-bt">
              <p class="left m-rg">
                {{i +1 }}
              </p>
              <p class="left super" :title="el.title" >
                {{el.title}}         
              </p>
              <p class="right">
                {{el.opendate}}
              </p>
           </div>
           <div class="aptitude">
             <p class="left surplus">
                <span  :title='el.oneName' >第一候选人:{{el.oneName ? el.oneName : '详见原文' }}</span>
             </p>
             <p class="right">
                <span >中标金额:{{el.oneOffer ? el.oneOffer + '万' : '详见原文'}}</span>
             </p>
           </div>
         </a >
       <div class="t-page">
          <nav-page 
          :all='total'
          :currents='present'
          @skip='Goto'
          ></nav-page>
       </div>
    </div>
    <div class="noneS" v-show="!Snone" >
      <img src="../assets/img/card.png" alt="">
    </div>
</div>
</template>
<script>
import { queryList } from '@/api/index';
export default {
  data () {
    return {
      area:'湖南',
      loading:false,
      Stroke:true,
      Snone:true,
      areas:[
        {
          name:'北京',
        },
        {
          name:'天津',
        },
        {
          name:'河北',
        },
        {
          name:'山西',
        },
        {
          name:'内蒙古',
        },
        {
          name:'辽宁',
        },
        {
          name:'吉林',
        },
        {
          name:'黑龙江',
        },
        {
          name:'上海',
        },
        {
          name:'江苏',
        },
        {
          name:'浙江',
        },
        {
          name:'安徽',
        },
        {
          name:'福建',
        },
        {
          name:'江西',
        },
        {
          name:'山东',
        },
        {
          name:'河南',
        },
        {
          name:'湖北',
        },
        {
          name:'湖南',
        },
        {
          name:'广西',
        },
        {
          name:'海南',
        },
        {
          name:'重庆',
        },
        {
          name:'四川',
        },
        {
          name:'贵州',
        },
        {
          name:'云南',
        },
        {
          name:'西藏',
        },
        {
          name:'陕西',
        },
        {
          name:'甘肃',
        },
        {
          name:'青海',
        },
        {
          name:'宁夏',
        },
        {
          name:'新疆',
        },
        {
          name:'广东',
        },
      ],
      projectTypes:[
        {
          name:'全部',
          key:''
        },
        {
          name:'施工',
          key:'0'
        },
        {
          name:'监理',
          key:'2'
        },
        {
          name:'采购',
          key:'3'
        },
        {
          name:'设计',
          key:'1'
        },
        {
          name:'勘察',
          key:'4'
        },
        {
          name:'其他',
          key:'5'
        }
      ],
      projectType:'',
      sums:[
        {
          name:'全部',
          i:0,
          s:'0',
          e:''
        },
        {
          name:'500万-1000万',
          i:1,
          s:'500',
          e:'1000'
        },
        {
          name:'1000万-5000万',
          i:0,
          s:'1000',
          e:'5000'
        },
        {
          name:'5000万-10000万',
          i:0,
          s:'5000',
          e:'10000'
        },
        {
          name:'10000万以上',
          i:0,
          s:'10000',
          e:''
        }
      ],
      start:'0',
      end:'',
      queryLists:[],
      low:'',
      high:'',
      rank:0,
      pageNo:1,
      title:'',
      total:0,
      present:0
    }
  },
  methods: {
    Goto(val) {
      this.pageNo = val.cur
      this.loading = true
      this.gainList()
    },
    eval(el) {
      if(this.Stroke) {
        this.Stroke = false
      } else {
        return
      }
      this.area = el.name
      this.pageNo = 1
      this.loading = true
      this.gainList()
      setTimeout(() => {
        this.Stroke = true
      }, 1000);
    },
    // evalclass(el) {
    //   this.queryLists = []
    //   this.projectType = el.key
    //   this.pageNo = 1
    //   this.gainList()
    // },
    evalsum(el) {
      if(this.Stroke) {
        this.Stroke = false
      } else {
        return
      }
      this.loading = true
      // this.queryLists = []
      this.rank = 0 
      this.low = '',
      this.high = '',
      this.start = el.s,
      this.end = el.e 
      this.pageNo = 1
      this.gainList()
      setTimeout(() => {
        this.Stroke = true
      }, 500);
    },
    gainList() {

       if(this.rank == 0) {
          queryList({pageNo:this.pageNo,pageSize:20,type:2,projectType:this.projectType,projSumStart:this.start,projSumEnd:this.end,title:this.title,regions:this.area,sumType:"zhongbiao"}).then( res => {
               if(res.code == 1 ) {
                  this.queryLists = res.data
                  this.present = res.pageNo
                  this.total = res.total
                  this.loading = false
                   if(this.total == 0 ) {
                     this.Snone = false
                   } else {
                     this.Snone = true
                   }
               }
          })
       } else {
          queryList({pageNo:this.pageNo,pageSize:20,type:2,projectType:this.projectType,projSumStart:this.low,projSumEnd:this.high,title:this.title,regions:this.area,sumType:"zhongbiao"}).then( res => {
               if(res.code == 1 ) {
               
                  this.queryLists = res.data
                  this.present = res.pageNo
                  this.total = res.total
                  this.loading = false
                   if(this.total == 0 ) {
                     this.Snone = false
                   } else {
                     this.Snone = true
                   }
               }
          })
       }
    },
    entitle(val) {
      this.title = val.cur
      this.pageNo = 1
      this.loading = true
      // this.queryLists = []
      this.gainList()
    },
    fade() {
      this.loading = true
      this.rank = 1
      this.start = ''
      this.end = '' 
      this.pageNo = 1 
      this.gainList()
    },
    toTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    decide() {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Authorization') ) {
          const { href } = this.$router.resolve({
          path:'/notice',query:{id:el.id,source:el.source} 
        })
        window.open(href, '_blank', )
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
    }
  },
  watch: {
    area() {
      this.pageNo = 1
      this.loading = true
      // this.queryLists = []
      // this.total = 0
      this.gainList()
    },
    projectType() {
      this.pageNo = 1
      // this.queryLists = []
      this.loading = true
      // this.total = 0
      this.gainList()
    }
  },
  created () {
    this.title = localStorage.getItem('title') ?  localStorage.getItem('title'): ''
    this.toTop()
    this.gainList()
  },
  components: {
  }
}
</script>
<style lang="less" >
.tender {
  width: 100%;
  padding-top: 86px;
  .el-loading-spinner .path {
    stroke: #FE6603;
  }
  .el-loading-spinner {
    top: 10%;
  }
  .el-loading-spinner .el-loading-text {
    color:#FE6603;
  }
  .total {
    width: 1020px;
    color:#666;
    font-size: 14px;
    margin: 14px auto;
    span {
      color:#EC7522;
    }
  }
  .t-btn {
           width: 50px;
           height: 26px;
           text-align: center;
           line-height: 26px;
           margin-left: 30px;
           background-color: #FE6603;
           font-size: 14px;
           color: #fff;
           border-radius: 5px;
           margin-top: 2px;
           cursor: pointer;
         }
  .noneS {
    width: 1020px;
    margin: 0 auto;
    background-color: #fff;
    height: 582px;
    margin-bottom: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .t-options {
    width: 1020px;
    margin: 0 auto;
    height: 140px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 20px;
    font-size: 14px;
    padding: 15px 10px 0;
    .select {
       font-size: 16px;
       margin-bottom: 12px;
       .t-5 {
         margin-top: 5px;
       }
       .ttt {
         display: flex;
         .el-input {
           width: 30%;
         }
         .el-input__inner {
           height: 30px;
           line-height: 30px;
         }
         .in-line {
           width: 26px;
           height: 1px;
           background-color: #999;
           margin: auto 14px;
         }
         .t-btn {
           width: 50px;
           height: 26px;
           text-align: center;
           line-height: 26px;
           margin-left: 30px;
           background-color: #FE6603;
           font-size: 14px;
           color: #fff;
           border-radius: 5px;
           margin-top: 2px;
         }
       }
       .pro {
         li {
           padding: 2px 7px;
           height: 20px;
           line-height: 20px;
           margin-bottom: 10px;
           cursor: pointer;
           color:#666;
         }
         .l-30 {
           margin-top: 5px;       
         }
         .current {
           background-color: #FE6603;
           color: #fff;
         }
       }
      .el-select {
        width: 225px;
        margin-right: 10px;
      }
     }
  }
  .t-list {
    width: 1020px;
    margin: 0 auto;
    background-color: #fff;
    box-sizing: border-box;
    margin-bottom: 210px;
    font-size: 16px;
    .t-page {
       height: 210px;
       padding-top: 70px;
       display: flex;
       justify-content: center;
     }
       a {
         height: 80px;
         box-sizing: border-box;
         padding: 20px 22px 0 20px;
         border-bottom: 1px solid #f2f2f2;
         overflow: hidden;
         display: block;
         cursor:pointer;
         text-decoration:none;
         out-line: none;
         color: #333;
         .m-rg {
           margin-top: 2px;
           width: 23px;
         }
         .m-bt {
           margin-bottom: 5px;
           overflow: hidden;
         }
         .super {
           width: 750px;
           text-overflow: ellipsis;
           overflow: hidden;
           margin-left: 23px;
           white-space: nowrap;
         }
         .aptitude {
           color: #EC7522;
           font-size: 14px;
           margin-left: 50px;
           .surplus {
             text-overflow: ellipsis;
             overflow: hidden;
             white-space: nowrap;
             width: 240px;
           }
         }
       }
  }
}
</style>