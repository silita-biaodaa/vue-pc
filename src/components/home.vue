<template>
<div class="l-search">
   <div class='app-fff'>
        <el-row class="app-search"> 
         <el-col :span="7">
             <div class="bor">
                 <div class="logo left">

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
                   <el-input placeholder="请输入关键字搜索" v-model="select" @keyup.enter.native='engine' class="input-with-select">
                      <el-button slot="append" @click="engine"  >搜索</el-button>
                   </el-input>
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
         }
        //  {
        //    name:'诚信',
        //    to:'/faith',
        //    i: 3
        //  },
       ],
     select:'',
     rank:0,
     way:'/bid'
    }
  },
  methods: {
    seaI(el) {
      this.rank = el.i
      this.way = el.to
    },
    mapping() {
      this.selects.forEach(el => {
         if(this.$route.path == el.to) {
           this.way = el.to
         }
      })
    },
    engine() {
      localStorage.removeItem('title')
      localStorage.removeItem('way')  
      if(this.$route.path == this.way) {
        this.$emit('vague',{cur:this.select});
      } else { 
        localStorage.setItem('title',this.select)
        localStorage.setItem('way',this.way)  
        this.$router.push({path:this.way})
      }
    },
    paths() {
       if(this.$route.path == '/' || this.$route.path == '/bid' ) {
          this.rank = 0
       } else if (this.$route.path == '/tender') {
          this.rank = 1
       } else if (this.$route.path == '/company') {
          this.rank = 2
       } else {
         this.rank = 3
       }
    },
    reloca() {      
      if(this.$route.path == localStorage.getItem('way')) {
         this.select = localStorage.getItem('title')
      } else {
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
  // mounted () {
  //   Window.addEventListener('keydown', () => {
  //     if(event.keyCode == 13) {
  //        console.log(222)
  //     }
  //   })
  // },
  // beforeDestroy () {
  //   Window.removeEventListener('keydown', () => {
  //     if(event.keyCode == 13) {
  //        console.log(222)
  //     }
  //   })
  // },
  watch: {
      $route(to,form) {
        if(to.path == "/tender") {
          this.rank = 1
        }else if(to.path == '/'|| to.path == '/bid' ) {
          this.rank = 0
        } else if (to.path == "/company") {
          this.rank = 2
        } else  {
          this.rank = 3
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
     width: 960px;
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
}
</style>