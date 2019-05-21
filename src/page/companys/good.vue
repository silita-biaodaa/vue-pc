
<template>
<div class="good" v-loading="loading" element-loading-text="拼命加载中" >
   <div class="g-nav">
     <span @click="show" :class="this.name == '获奖信息' ? 'current' : ''" >
       获奖信息 ({{total}}) 
     </span>
     <span>
       /
     </span>
     <span @click="showt" :class="this.name == '不良记录' ? 'current' : ''" >
       不良记录 ({{bad ? bad : 0}})
     </span>
   </div>
   <div class="g-table">
     <div v-show="prize">
         <div class="nav-top" v-show="!result">
             <div class="left" style="width:72px" >
               序号
             </div>
             <div class="left" style="width:350px" >
               项目名称
             </div>
             <div class="left" style="width:150px" >
               奖项名称
             </div>
             <div class="left" style="width:200px" >
               获奖年度
             </div>
          </div>  
           <div class="nav-text" v-for="(el,i) in allList" :key="i">
             <div class="left" style="width:72px" >
               {{i+1}}
             </div>
             <div class="left" style="width:350px" >
               {{el.projName}}
             </div>
             <div class="left" style="width:150px" >
               {{el.mateName}}
             </div>
             <div class="left" style="width:200px" >
               {{el.years}}
             </div>
         </div>
         <div class="no-search" v-show="result">
              <img src="../../assets/img/card.png" alt="" >
         </div> 
     </div>

     <div v-show="badness">
         <div class="nav-top">
             <div class="left" style="width:72px" >
               序号
             </div>
             <div class="left" style="width:350px" >
               项目名称
             </div>
             <div class="left" style="width:150px" >
               发布部门
             </div>
             <div class="left" style="width:200px" >
               发布日期
             </div>
          </div> 
           <div class="nav-text" v-for="(el,i) in badList" :key="i" @mouseenter="enter(el)" @mouseleave="leave(el)"  >
             <div class="left" style="width:72px" >
               {{i+1}}
             </div>
             <div class="left" style="width:350px" >
               {{el.projName}}
             </div>
             <div class="left" style="width:150px" >
               {{el.pubSite}}
             </div>
             <div class="left" style="width:200px" >
               {{el.pubDate}}
             </div>
             <div class="text-content" v-show="el.show"   >
               {{el.content}}
             </div>
          </div>
          
     </div>

   </div>
</div>
</template>
<script>
import { getJsonData,undesirable } from '@/api/index'
export default {
  data () {
    return {
      gooDlist:[],
      total:0,
      allList:[],
      badList:[],
      bad:0,
      prize:true,
      badness:false,
      name:'获奖信息',
      id:'',
      result: false,
      loading:false
    }
  },
  methods: {
    gainList() {
      this.id = this.$route.query.id
       let dataParam = JSON.stringify({          
        });
        getJsonData( "/company/reputation/" + this.id ).then(res => {
            if(res.code == 1) {
              this.gooDlist =  res.data.reputation
              if(this.gooDlist) {
                  this.gooDlist.forEach(el => {
                     el.list.forEach(el => {
                        el.list.forEach(el=> {
                           this.allList.push(el)
                        })
                     })
                  })
                  this.loading = false
                  if(this.allList.length == 0) {
                     this.result = true
                   } else {
                     this.result = false
                   }
                  this.total = this.allList.length
              } else {
                  this.total = 0 
                  this.result = true
              }
                 
            }
           
           
        });
    },
    gainBad() {
        undesirable({comId:this.id}).then(res => {
            if(res.code == 1) {
               res.data.undesirable.forEach(el => {
                   el.show = false
                 })  
              this.badList = res.data.undesirable
               this.bad = res.data.undesirable.length
             }
            
        })
        // let dataParam = JSON.stringify({          
        // });
        // getJsonData( "/company/undesirable/" + this.id ).then(res => {
        //    
        // });
    },
    enter(el) {
      el.show = true
    },
    leave(el) {
      el.show = false
    },
    show() {
      this.name = '获奖信息'
      this.prize = true
      this.badness = false
    },
    showt() {
      if(this.bad == 0) {
         return 
      }
      this.name = '不良记录'
      this.prize = false
      this.badness = true
    }
  },
  created () {
    this.gainList()
    this.gainBad()
  },
  components: {
  }
}
</script>
<style lang="less" >
.good {
  background-color: #fff;
  padding-bottom: 20px;
  .g-nav {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color:#999;
    font-weight: 550;
    padding-left: 22px;
    cursor: pointer;
  }
  .el-loading-spinner .path {
    stroke: #FE6603;
  }
  .el-loading-spinner .el-loading-text {
    color:#FE6603;
  }
  .current {
    color:#333;
  }
  .g-table {
    margin:  0 10px;
    border: 1px solid #f2f2f2;
    font-size: 12px;
    color:#333;
    font-weight: 550;
    .nav-top {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
      text-align: center;
    }
    .nav-text {
      min-height: 40px;
      display: flex;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid #f2f2f2;
      position: relative;
      .text-content {
        position: absolute;
        bottom: -100%;
        left: 0;
        width: 772px;
        height: 30px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 9px 1px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        padding: 10px  5px 0; 
        // box-sizing: border-box;
      }
    }
  }
  .no-search {
    width: 100%;
    height: 500px;
    border-top-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>