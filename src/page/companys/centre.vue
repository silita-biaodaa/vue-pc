<template>
<div class="intell" v-loading="loading" element-loading-text="拼命加载中" >
    <div class="in-nav new-nav" >
     
       <div>
          <span class=" in-po"  :class="pro ? 'current' : ''"  @click="swpro" >住建部 ({{proT}})</span>
          <span class="m-lr" >/</span>
          <span class=" in-po" :class="water ? 'current' : ''"  @click="swater"  >水利部 ({{waterT}})</span>
          <span class="m-lr" >/</span> 
          <span class=" in-po" :class="tra ? 'current' : ''"  @click="swtra"  >交通部 ({{traT}})</span> 
       </div>

      <div>
          <el-input
            placeholder="请输入关键字搜索"
            suffix-icon="el-icon-search"
            @change="gainList"
            @keyup.enter="gainList"
            v-model="search">
          </el-input>
      </div>

    </div>
    <div class="in-table">
     <c-bur :arr='showArr' v-if="pro"  ></c-bur>
     <c-water :arr='waterArr' v-if="water" ></c-water>
     <c-tra :arr='traArr' v-if="tra" ></c-tra>
   
     
      <div class="e-page" v-show="allnu" >
          <nav-page 
           :all='total'
           :currents='current'
           @skip='Goto'
          ></nav-page>
      </div>
    </div>
</div>
</template>
<script>
import { Project } from '@/api/index'
export default {
  data () {
    return {
      id:'',
      total:0,
      current:1,
      allnu:false,
      loading:true,
      showArr:[],
      waterArr:[],
      traArr:[],
      search:'',
      pro:true,
      water:false,
      tra:false,
      proT:0,
      waterT:0,
      traT:0,
      name:''
    }
  },
  methods: {
    gainList() {
      if(this.pro) {
         Project({comId:this.id,type:'page',comName:this.name,pageNo:this.current,tabType:'project',pageSize:10,proName:this.search}).then( res => {
          if(res.code == 1) {
            this.total = res.total
            this.showArr = res.data
            if(res.data.length == 0) {
               this.proT = 0
            } else {
               this.proT = res.total
            }
            this.loading = false
             if(this.total > 10) {
               this.allnu = true
             } else {
               this.allnu = false
             }
          }
        }) 
      } else if(this.water) {
          Project({comId:this.id,comName:this.name,pageNo:this.current,tabType:'shuili',pageSize:10,proName:this.search}).then( res => {
            if(res.code == 1) {
              this.total = res.total
              this.waterArr = res.data
               this.waterT = res.total
              this.loading = false
               if(this.total > 10) {
                 this.allnu = true
               } else {
                 this.allnu = false
               }
            }
          }) 
      } else {
         Project({comId:this.id,comName:this.name,pageNo:this.current,tabType:'jiaotong',pageSize:10,proName:this.search}).then( res => {
            if(res.code == 1) {
              this.total = res.total
              this.traArr = res.data
               this.traT = res.total
              this.loading = false
               if(this.total > 10) {
                 this.allnu = true
               } else {
                 this.allnu = false
               }
            }
          }) 
      }
      
    },
    gainPro() {
       Project({comId:this.id,type:'page',comName:this.name,pageNo:this.current,tabType:'project',pageSize:10,proName:this.search}).then( res => {
          if(res.code == 1) {
            this.total = res.total
            this.showArr = res.data
            if(res.data.length == 0) {
               this.proT = 0
            } else {
               this.proT = res.total
            }
           
            this.loading = false
             if(this.total > 10) {
               this.allnu = true
             } else {
               this.allnu = false
             }
          }
        }) 
    },
    gainWater() {
       Project({comId:this.id,pageNo:this.current,comName:this.name,tabType:'shuili',pageSize:10,proName:this.search}).then( res => {
            if(res.code == 1) {
              this.total = res.total
              this.waterArr = res.data
            if(res.data.length == 0) {
               this.waterT = 0
            } else {
               this.waterT = res.total
            }
              this.loading = false
               if(this.total > 10) {
                 this.allnu = true
               } else {
                 this.allnu = false
               }
            }
          }) 
    },
    gainTra() {
        Project({comId:this.id,pageNo:this.current,comName:this.name,tabType:'jiaotong',pageSize:10,proName:this.search}).then( res => {
            if(res.code == 1) {
              this.total = res.total
              this.traArr = res.data
              if(res.data.length == 0) {
               this.traT = 0
            } else {
               this.traT = res.total
            }
              this.loading = false
               if(this.total > 10) {
                 this.allnu = true
               } else {
                 this.allnu = false
               }
            }
          }) 
    },
    Goto(val) {
      this.current = val.cur
      this.gainList()
    },
    swpro() {
      this.pro = true
      this.water = false
      this.tra = false
      this.current = 1
      this.search = ''
       this.gainList()
    },
    swater() {
      this.pro = false
      this.water = true
      this.tra = false
      this.current = 1
       this.search = ''
      this.gainList()
    },
    swtra() {
      this.pro = false
      this.water = false
      this.tra = true
      this.current = 1
       this.search = ''
      this.gainList()
    }
  },
  created () {
    this.id = this.$route.query.id
    this.name = this.$route.query.name
    this.gainPro()
    this.gainWater()
    this.gainTra()
    // this.gainList()
  },
  components: {
  }
}
</script>
<style lang="less" >
.intell {
  background-color: #fff;
  padding-bottom: 50px;
  .current {
    color:#333;
  }
    .el-loading-spinner .path {
    stroke: #FE6603;
  }
  .el-loading-spinner .el-loading-text {
    color:#FE6603;
  }  
  .in-nav {
    font-size: 14px;
    color:#999;
    height: 56px;
    line-height: 56px;
    padding-left: 22px;
    font-weight: 550;
    .in-pdd {
      padding: 0 5px;
    }
    .in-po {
      cursor: pointer;
      // vertical-align: bottom;
    }
    .m-lr {
      margin: 0 5px;
    }
  }
  .new-nav {
    display: flex;
    justify-content: space-between;
    margin-right: 9px;
  }
   .e-page {
    display: flex;
    justify-content: center;
    height: 150px;
      .paging {
     ul {
       li {
         height: 30px;
         line-height: 30px ;
         padding: 0 8px;
         margin-right: 5px;
       }
       .put-jump {
          height: 30px;
         line-height: 30px ;
       }
     }
   }
  }
  .in-table {
    margin: 0 9px;
    border: 1px solid #f2f2f2;
    font-size: 12px;
    color:#333;
  }
 
}

</style>