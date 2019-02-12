<template>
   <div class="bid">
     <div class="bid-search">
          <div class="b-logo left">

        </div>
        <div class="b-search left">
           <p>首页/<span>招标</span></p>
           <el-input placeholder="请输入招标名或企业名" v-model="select" class="input-with-select" @change='gainQueryList' >
                      <el-button slot="append"  @click='gainQueryList' >搜索</el-button>
           </el-input>
        </div>
     </div>
      
      <div class="options">
        <div class="select">
           选择地区:&nbsp
           <el-select v-model="area" placeholder="请选择省份" @change='gainQueryList'>
              <el-option
                v-for="item in areas"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
        </div>
        <div class="select">
           选择类型:&nbsp
           <el-select v-model="projectType" placeholder="请选择类型" @change='gainQueryList'>
              <el-option
                v-for="item in projectTypes"
                :key="item.name"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
        </div>
        <div class="select">
           评标办法:&nbsp
           <el-select v-model="pbMode" placeholder="请选择评标办法" @change='gainQueryList'>
              <el-option
                v-for="item in pbModes"
                :key="item.standardName"
                :label="item.standardName"
                :value="item.standardName">
              </el-option>
            </el-select>
        </div>
        <div class="select">
           资质要求:&nbsp
           <el-select v-model="companyQual" placeholder="选择资质类型"  @change='Splice' >
              <el-option
                v-for="item in companyQuals"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="major" placeholder="请选择"  @change='spliceo' >
              <el-option
                v-for="item in majors"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="grade" placeholder="请选择"   @change='splicet' >
              <el-option
                v-for="item in grades"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
        </div>
     </div> 


     <div class="bid-content">
       <ul>
         <router-link tag='li'  v-for="(el,i ) of queryLists" :key="i" :to="{path:'/article',query:{id:el.id} }">
           <div class="m-bt">
              <p class="left m-rg">
                {{i +1 }}
              </p>
              <p class="left super">
                {{el.title}}         
              </p>
              <p class="right">
                {{el.opendate}}
              </p>
           </div>
           <div class="aptitude">
             <p class="left surplus">
                {{el.certificate ? el.certificate : '详见原文' }}
             </p>
             <p class="right">
                {{el.pbMode}}
             </p>
           </div>
         </router-link >
       </ul>
       <div class="page">
          <nav-page 
          :all='total'
          @skip='Goto'
          ></nav-page>
       </div>
     </div>

   </div>
</template>
<script>
import { queryList,filter } from '@/api/index';
export default {
  data () {
    return {
      select:'',
      area:' ',
      areas:[],
      queryLists:[],
      projectTypes:[
        {
          name:'施工',
          key:0
        },
        {
          name:'监理',
          key:2
        },
        {
          name:'采购',
          key:3
        },
        {
          name:'设计',
          key:1
        },
        {
          name:'勘察',
          key:4
        },
        {
          name:'其他',
          key:5
        }
      ],
      projectType:'',
      pbMode:'',
      pbModes:[],
      companyQual:'',
      companyQuals:[],
      major:'',
      majors:[],
      grade:'',
      grades:[],
      zzType:'',
      zType:[],
      total:0,
      current:1,
    }
  },
  watch: {
    companyQual(val) {
      this.zType = []
      this.major = ''
      this.majors = []
      this.companyQuals.forEach(el => {
         if(el.code == val ) {
            this.majors = el.list
         }
      });
      
    },
    major(val) {
      this.zType = []
      this.grade = ''
      this.grades = []
      this.majors.forEach(el => {
         if(el.code == val ) {
            this.grades = el.list
         }
      });
    },
    grade(val) {
      this.zType = []
    },
  },
  methods: {
    gainQueryList() {
                         // 评标办法                         省份            资质类型                   标题
       queryList({pageNo:this.current,pbModes:this.pbMode,type:'0',pageSize:'20',regions:this.area,zzType:this.zzType,projectType:this.projectType,title:this.select}).then( res => {
         if(res.code == 1 ) {
           this.total = res.total 
           this.queryLists = res.data
         }
       })
    },
    Goto(val) {
      this.current = val.cur
      this.gainQueryList()
    },
    Splice() {
       this.zzType = this.companyQual
       this.gainQueryList()
    },
    spliceo() {
      this.zType.push(this.companyQual,this.major)
      this.zzType = this.zType.join('||')
       this.gainQueryList()
    },
    splicet() {
      this.zType.push(this.companyQual,this.major,this.grade)
      this.zzType = this.zType.join('||')
      this.gainQueryList()
    },
    gainFilter() {
      filter({}).then( res => {
         if(res.code == 1 ) {
            this.areas = res.data.area
            this.pbModes = res.data.pbMode
            this.companyQuals = res.data.companyQual
         }
      })
    } 
  },
  created () {
    this.gainQueryList()
    this.gainFilter()
  },
  components:{
  }
}
</script>
<style lang="less" scoped>
 .bid {
   width: 1120px;
   .bid-search {
     width: 1120px;
     overflow: hidden;
   }
   .b-logo {
     clear: both;
     width: 112px;
     margin: 66px 112px 40px 71px;
     height: 47px;
     width: 158px;
     border: 1px solid red;
   }
   .b-search {
     overflow: hidden;
     margin-top: 48px;
     color:#666;
     font-size: 18px;
     width: 588px;
     p {
       margin-bottom: 9px;
        span {
        color:#EC7522;
      }
     }
    .el-input-group--append .el-input__inner, .el-input-group__prepend {
      border-color: #EC7522;
    }
     .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner {
       width: 113px;
       background: #EC7522;
       border-radius: 0;
       color: #fff;
       border: 1px solid #EC7522;
     }
     .el-input-group__append .el-button, .el-input-group__append .el-select, .el-input-group__prepend .el-button, .el-input-group__prepend .el-select {
       margin: -9px -20px;
     }
   }
   .options {
     width: 1120px;
     height: 246px;
     background: #fff;
     padding: 21px 0 0 21px;
     margin-bottom: 20px;
     box-sizing: border-box;
     .select {
       font-size: 16px;
       margin-bottom: 12px;
      .el-select {
        width: 225px;
        margin-right: 10px;
      }
     }
   }
   .bid-content {
     width: 1120px;
     box-sizing: border-box;
     background: #fff;
     font-size: 16px;
     margin-bottom: 185px;
     .page {
       height: 280px;
       padding-top: 95px;
       display: flex;
       justify-content: center;
     }
     ul {
       li {
         height: 80px;
         box-sizing: border-box;
         padding: 23px 22px 0 20px;
         border-bottom: 2px solid #f2f2f2;
         cursor:pointer;
         .m-rg {
           margin-right: 26px;
           width: 20px;
         }
         .m-bt {
           margin-bottom: 5px;
           overflow: hidden;
         }
         .super {
           width: 750px;
           text-overflow: ellipsis;
           overflow: hidden;
           white-space: nowrap;
         }
         .aptitude {
           color: #EC7522;
           font-size: 14px;
           margin-left: 47px;
           .surplus {
             text-overflow: ellipsis;
             overflow: hidden;
             white-space: nowrap;
             width: 60px;
           }
         }
       }
     }
   }
 }
</style>