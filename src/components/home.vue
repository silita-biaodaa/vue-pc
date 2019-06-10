<template>
<div class="l-search" @keydown.enter="engine">
   <div class='app-fff'>
        <el-row class="app-search"> 
         <el-col :span="7">
             <div class="bor">
                 <div class="logo left" @click="$router.push('/home')">

                 </div>
             </div>
         </el-col>
         <el-col :span="16">
            <div class="bor">
                <ul class="search">
                   <li class="left" v-for="(el,i) of selects " :key="i"  @click="seaI(el)" :class=" i == rank ? 'ranks' : ''">
                       {{el.name}}  
                   </li>
                </ul>
                <div  >
                   <el-input :placeholder="placeTxt" v-model="select" @keyup.enter.native='engine' @change="engine"  class="input-with-select">
                      <el-button slot="append" @click="engine"  >搜索</el-button>
                   </el-input>
                   <div class="right  syn" v-show="synth"  @click="jump" >
                      综合查询
                   </div>
                 </div>
             </div>
         </el-col>
        </el-row>
     </div>
</div>
</template>
<script>
export default {
  data () {
    return {
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
           name:'业绩',
           to:'/perfor',
           i: 3
         },
         {
           name:'人员',
           to:'/crew',
           i: 4
         },
         {
           name:'在建',
           to:'/build',
           i: 5
         },
       ],
     select:'',
     rank:0,
     way:'/bid',
     placeTxt:'请输入公告名称或企业名称'
    }
  },
  methods: {
    seaI(el) {
      this.rank = el.i
      this.way = el.to
    },
    mapping() {
      if(this.$route.fullPath == '/home') {
        this.way = '/bid'
      } else {
        this.way = this.$route.fullPath
      }
      
    },
    jump() {
      let url=this.$router.resolve({
        path:'/synth'
      })
      window.open(url.href,'_blank')
    },
    engine() {
      localStorage.removeItem('title')
      localStorage.removeItem('way')     
      if(this.$route.fullPath.indexOf('perfor')== 1) {
        if(this.way.indexOf('perfor') == 1) {
          this.$emit('vague',{cur:this.select});
        } else { 
          localStorage.setItem('title',this.select)
          localStorage.setItem('way',this.way)  
          this.$router.push({path:this.way})
        }
          this.$emit('vague',{cur:this.select});
      } else {
         if(this.$route.fullPath == this.way) {
          this.$emit('vague',{cur:this.select});
        } else { 
          localStorage.setItem('title',this.select)
          localStorage.setItem('way',this.way)  
          this.$router.push({path:this.way})
        }
      }
   
    },
    paths() {
       if(this.$route.path == '/' || this.$route.path == '/bid' ) {
          this.rank = 0
       } else if (this.$route.path == '/tender') {
          this.rank = 1
       } else if (this.$route.path == '/company') {
          this.rank = 2
       } else if (this.$route.fullPath.indexOf('perfor') == 1 ) {
         this.rank = 3
       } else if (this.$route.path == '/crew') {
         this.rank = 4
       } else if (this.$route.path == '/build') {
         this.rank = 5
       }
    },   
    reloca() {      
      if(this.$route.fullPath == localStorage.getItem('way')) {
         this.select = localStorage.getItem('title')
      } else  {
          if(localStorage.getItem('way')) {
              if (this.$route.fullPath.indexOf('perfor') == 1 &&  localStorage.getItem('way').indexOf('perfor') == 1 )  {
                 return this.select = localStorage.getItem('title')
              }
          }
         localStorage.removeItem('title')
         this.select = ''
      }
    }
  },
  created () {
    this.reloca() 
    this.paths()
    this.mapping()
  },
  computed: {
    synth() {
      if(this.$route.name == 'company') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    $route(to,form) {
      if(form.name == 'water' && (to.name == 'perlist' || to.name == 'road' ) ) {
        this.select = ''
      }else if (form.name == 'road' && (to.name == 'perlist' || to.name == 'water' ) ) {
        this.select = ''
      }else if (form.name == 'perlist' && (to.name == 'road' || to.name == 'water' ) ) {
        this.select = ''
      }
    },
    rank(newValue,old){
      if(newValue==0||newValue==1){
        this.placeTxt='请输入公告名称或企业名称'
      }else if(newValue==2){
        this.placeTxt='请输入企业名称或法人名称'
      }else if(newValue==3){
        this.placeTxt='请输入项目名称或企业名称'
      }else if(newValue==4){
        this.placeTxt='请输入注册人员姓名或企业名称'
      }else if(newValue==5){
        this.placeTxt='请输入姓名或身份证号'
      }
    }
  },
  components: {
  }
}
</script>
<style lang="less" >
.l-search {
  .app-fff {
    width: 100%;
    background-color: #fff;
  }
  .app-search {
     width: 1020px;
     margin: 0 auto;
  }
  .bor {
     overflow: hidden;
     height: 149px;
    //  clear: both;
     .el-input-group{
       width: 588px;
       font-size: 18px;
       .el-input-group__append, .el-input-group__prepend {
         width: 113px ;
         padding: 0;
         background-color: #EC7522;
         text-align: center;
         color:#fff;
         border: 1px solid #EC7522;
         font-weight: 500;
         .el-button {
           font-family:Tahoma,Arial,"Helvetica Neue","Hiragino Sans GB",Simsun,sans-self !important;
           width: 100%;
         }
       }
     }
     .logo {
       background: url(../assets/img/logo.png) no-repeat;
       margin-top: 75px;
       height: 47px;
       width: 158px;
       margin-right: 21px;
       cursor: pointer;
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
         width: 13%;
         cursor: pointer;
       }
     }
     .syn {
       line-height: 40px;
       font-size: 16px;
       color:#FE6603;
       cursor: pointer;
     } 
   }
}
</style>