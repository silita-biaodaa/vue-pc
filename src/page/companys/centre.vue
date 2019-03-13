<template>
<div class="intell">
    <div class="in-nav">
      <span class="left in-po current"  >全部</span>
     
    </div>
    <div class="in-table">
      <div class="law-nav">
        <div class="left" style="width:54px">
            序号
        </div>
        <div class="left" style="width:260px">
            项目名称
        </div>
        <div class="left" style="width:120px">
            项目类型
        </div>
        <div class="left" style="width:90px">
            项目属地
        </div>
        <div class="left" style="width:250px">
           建筑单位
        </div>
      </div>
      <div class="law-text" v-for="(el,i) in showArr" :key="i" v-show="result">
        <div class="left" style="width:54px">
            {{i+1}}
        </div>
        <div class="left" style="width:260px">
            {{el.proName ? el.proName: '--'}}
        </div>
        <div class="left" style="width:120px">
            {{el.proType ? el.proType: '--'}}
        </div>
        <div class="left" style="width:90px">
            {{el.province ? el.province: '--'}}
        </div>
        <div class="left" style="width:250px">
            {{el.proOrg ? el.proOrg: '--'}}
        </div>
      </div>
      <div class="no-search" v-show="!result">
        <img src="../../assets/img/card.png" alt="" >
      </div>
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
      showArr:[],
      id:'',
      result:true,
      total:0,
      current:1,
      allnu:false
    }
  },
  methods: {
    gainList() {
      this.id = this.$route.query.id
       Project({comId:this.id,type:'page',pageNo:this.current,pageSize:10}).then( res => {
          if(res.code == 1) {
            console.log(res,25);
            this.total = res.total
             this.showArr = res.data
             if(this.showArr.length ==0 ) {
                this.result = false
             }
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
  },
  created () {
    this.gainList()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.intell {
  background-color: #fff;
  padding-bottom: 50px;
  .current {
    color:#333;
  }  
  .in-nav {
    font-size: 14px;
    color:#999;
    height: 44px;
    line-height: 44px;
    padding-left: 22px;
    font-weight: 550;
    .in-pdd {
      padding: 0 5px;
    }
    .in-po {
      cursor: pointer;
    }
  }
   .e-page {
    display: flex;
    justify-content: center;
    height: 150px;
  }
  .in-table {
    margin: 0 9px;
    border: 1px solid #f2f2f2;
    font-size: 12px;
    color:#333;
     .law-nav {
      height: 40px;
      border-bottom: 1px solid #f2f2f2;
      line-height: 40px;
      font-size: 12px;
      color:#333;
      text-align: center;
      font-weight: 550;
    }
    .law-text {
      min-height: 40px;
      border-bottom: 1px solid #f2f2f2;
      font-size: 12px;
      color:#333;
      font-weight: 550;
      display: flex;
      align-items: center;
      text-align: center;
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