<template>
   <div class="bid"> 

      <en-search
      @vague='entitle'
      >        
      </en-search>
      <div class="options">
        <div class="select">
          <el-row>
             <el-col :span='2'>
                省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:
             </el-col>
             <el-col :span='22' >
               <ul class='pro' >
                 <li v-for='(el,i) in areas' :key='i' class='left' :class="el.name==area? 'current':''"  @click='eval(el)' >
                    {{el.name}}
                 </li>
               </ul>
             </el-col>
          </el-row>
        </div>
        <div class="select">
            <el-row>
                <el-col :span='2'>
                  类&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp型:
                </el-col>
                <el-col :span='22'>
                    <ul class='left pro' >
                      <li v-for='(el,i) in projectTypes' :key='i' class='left' :class="el.key == projectType ? 'current':''"  @click='evalclass(el)' >
                         {{el.name}}
                      </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
        <div class="select">
            <el-row>
               <el-col :span='2'>
                  评标办法:
               </el-col>
               <el-col :span='22'> 
                  <el-checkbox-group v-model="pbMode" @change='means' >
                    <el-checkbox-button v-for="el in pbModes" :label="el.key" :key="el.key"  >{{el.name}}</el-checkbox-button>
                  </el-checkbox-group>
               </el-col>
            </el-row>
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
      area:'湖南',
      areas:[
        {
          name:'北京'
        },
        {
          name:'天津'
        },
        {
          name:'河北'
        },
        {
          name:'山西'
        },
        {
          name:'内蒙古'
        },
        {
          name:'辽宁'
        },
        {
          name:'吉林'
        },
        {
          name:'黑龙江'
        },
        {
          name:'上海'
        },
        {
          name:'江苏'
        },
        {
          name:'浙江'
        },
        {
          name:'安徽'
        },
        {
          name:'福建'
        },
        {
          name:'江西'
        },
        {
          name:'山东'
        },
        {
          name:'河南'
        },
        {
          name:'湖北'
        },
        {
          name:'湖南'
        },
        {
          name:'广西'
        },
        {
          name:'海南'
        },
        {
          name:'重庆'
        },
        {
          name:'四川'
        },
        {
          name:'贵州'
        },
        {
          name:'云南'
        },
        {
          name:'西藏'
        },
        {
          name:'陕西'
        },
        {
          name:'甘肃'
        },
        {
          name:'青海'
        },
        {
          name:'宁夏'
        },
        {
          name:'新疆'
        },
        {
          name:'广东'
        },
      ],
      queryLists:[],
      projectTypes:[
        {
          name:'全国',
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
          key:5
        }
      ],
      projectType:'',
      pbMode:[''],
      pbModess:'',
      pbModes:[
        {
          name:'全部',
          key:''
        },
        {
          name:"综合评估法Ⅱ",
          key:"综合评估法Ⅱ"
        },
        {
          name:"综合评估法Ⅰ",
          key:"综合评估法Ⅰ"
        },
        {
          name:"固定标价评分法",
          key:"固定标价评分法"
        },
        {
          name:"合理定价抽取法",
          key:"合理定价抽取法"
        },
        {
          name:"技术评分最低标价法",
          key:"技术评分最低标价法"
        },
        {
          name:"合理低价法",
          key:"合理低价法"
        },
        {
          name:"经评审最低报价法",
          key:"经评审最低报价法"
        },
        {
          name:"百分制综合评分法",
          key:"百分制综合评分法"
        },
        {
          name:"其他",
          key:"其他"
        }
      ],
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
      title:'',
      selects:[
         {
           name:'招标',
           to:'/bid',
           i: 0
         },
         {
           name:'中标',
           to:'/tender',
           i: 1
         },
         {
           name:'企业',
           to:'/company',
           i: 2
         },
         {
           name:'诚信',
           to:'/faith',
           i: 3
         },
       ],
       select:''
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
    area(val) {
      this.gainQueryList()
    },
    projectType(val) {
      this.gainQueryList()
    }
  },
  methods: {
    gainQueryList() {
                    //  页号              评标办法                   页面显示条数      地区              资质类型                类型
       queryList({pageNo:this.current,pbModes:this.pbModess,type:'0',pageSize:'20',regions:this.area,zzType:this.zzType,projectType:this.projectType,title:this.title}).then( res => {
         if(res.code == 1 ) {
           this.total = res.total 
           this.queryLists = res.data
         }
       })
    },
    means() {
       if(this.pbMode.length == 0) {
          this.pbMode = ['']
          // console.log('出现')
       }
      console.log(this.pbMode,1)
      if(this.pbMode.length > 1 ) {
         if(this.pbMode[this.pbMode.length - 1] == '' ) {
            this.pbMode = ['']
         } else {
            if(this.pbMode.indexOf('') == 0) {
                this.pbMode.splice(0,1)
            }
         }
      }
      this.pbModess = this.pbMode.join('||')
      this.gainQueryList()
    },
    Goto(val) {
      this.current = val.cur
      this.gainQueryList()
    },
    entitle(val) {
      this.title = val.cur
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
            this.companyQuals = res.data.companyQual
         }
      })
    },
    eval(el) {
      this.area = el.name
    },
    evalclass(el) {
      this.projectType = el.key
    },
    evalway(el) {
      this.pbMode = el.key
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
<style lang="less" >
 .bid {
   width: 100%;
   display: flex;
   flex-direction: column;
     .app-fff {
    width: 100%;
    background-color: #fff;
  }
  .app-search {
     width: 960px;
     margin: 0 auto;
  }
  .bor {
     height: 149px;
     clear: both;
     .el-input-group{
       width: 588px;
       font-size: 16px;
       .el-input-group__append, .el-input-group__prepend {
         width: 113px ;
         padding: 0;
         background-color: #EC7522;
         text-align: center;
         color:#fff;
         border: 1px solid #EC7522;
       }
     }
     .logo {
       background: url(../assets/img/logo.png) no-repeat;
       margin-top: 75px;
       height: 47px;
       width: 158px;
       margin-right: 21px;
     }
     .search {
       margin-top: 50px;
       margin-bottom: 10px;
       font-size: 16px;
       width: 648px;
       overflow: hidden;
       .ranks {
         color: #FE6603;
       }
       li {
         width: 18%;
         cursor: pointer;
       }
     }
   }
   .options {
     margin: 0 auto;
     width: 960px;
     margin-top: 40px;
     height: 295px;
     background: #fff;
     padding: 21px 0 0 21px;
     margin-bottom: 20px;
     box-sizing: border-box;
     .select {
       font-size: 16px;
       margin-bottom: 12px;
       .pro {
         li {
           padding: 2px 9px;
           height: 20px;
           text-align: center;
           line-height: 20px;
           margin-bottom: 10px;
           cursor: pointer;
         }
         .current {
           background-color: #FE6603;
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
        color:#000;
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        color:#000;
        background-color: #FE6603;
        border-color: #FE6603;
        box-shadow: -1px 0 0 0 #fff; 
      }
      .el-checkbox-button:first-child .el-checkbox-button__inner {
        border-radius: 0;
      }
     }
   }
   .bid-content {
     margin: 0 auto;
     width: 960px;
     box-sizing: border-box;
     background: #fff;
     font-size: 16px;
     margin-bottom: 185px;
     .page {
       height: 280px;
       padding-top: 95px;
       display: flex;
       justify-content: center;
       li {
         height: 41px;
       }
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