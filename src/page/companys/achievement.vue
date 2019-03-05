<template>
<div class="achievement">
  <div class="e-nav">
     <span class="e-wei">
       中标公告({{total}})
     </span>
     <div>
       <el-input
          placeholder="请输入关键字搜索"
          suffix-icon="el-icon-search"
          @keyup.enter="searchBid"
          v-model="search">
        </el-input>
     </div>
  </div>
  <div class="e-table">
    <div class="e-list" v-for="(el,i) in bidList" :key="i" v-show="!result">
      <div e-title >
        <div class="e-title">
            <div class="left">
              {{i+1}}
            </div>
            <p class="left e-p">
              {{el.title}}
            </p>
            <div class="right">
              {{el.opendate}}
            </div>
        </div>
        <div class="e-peo">
           <p>
             {{el.oneName ? '第一候选人:' + el.oneName : '详见原文'}}
           </p>
           <div>
             {{el.projSum ? "中标金额:" + el.projSum + "万" : '详见原文'}}
           </div>
        </div>
        
      </div>
    </div>
    <div class="no-search" v-show="result">
        <img src="../../assets/img/card.png" alt="" >
    </div>
  </div>
  <div class="e-page" v-show="!result">
      <nav-page 
       :all='total'
       :currents='current'
       @skip='Goto'
      ></nav-page>
  </div>
</div>
</template>
<script>
import { queryList } from '@/api/index';
export default {
  data () {
    return {
      search:'',
      bidList:[],
      current:1,
      total:0,
      name:'',
      result:false,
      source:''
    }
  },
  methods: {
    gainList() {
      this.name = this.$route.query.name
      queryList({pageNo:this.current,pageSize:20,type:2,regions:'湖南',com_name:this.name,title:this.search,sumType:"zhongbiao"}).then(res => {
        if(res.code == 1) {
           this.bidList = res.data
           this.current = res.pageNo
           this.total = res.total
           if(this.bidList.length ==0 ) {
             this.result = true
           }
        }
      })
    },
     Goto(val) {
      this.current = val.cur
      this.gainList()
    },
    searchBid() {
      this.current = 1
      this.gainList()
    }
  },
  created () {
    this.source = this.$route.query.source
    this.gainList()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.achievement {
  background-color: #fff;
  .e-nav {
    font-size: 14px;
    color:#333;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 23px;
    box-sizing: border-box;
    .e-wei {
      font-weight: 550;
    }
  }
  .e-table {
    margin: 0 10px;
    border: 1px solid #f2f2f2;
    font-size: 12px;
    color:#333;
    font-weight: 550;
    .e-list {
      height: 65px;
      padding: 15px 18px 0 18px;
      border-bottom: 1px solid #f2f2f2;
      box-sizing: border-box;
      .e-title {
        overflow: hidden;
      }
      .e-p {
        margin-left: 20px;
        width: 500px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .e-peo {
        margin-top: 9px;
        margin-left: 33px;
        display: flex;
        justify-content: space-between;
        color: #FE6603;
      }
    }
  }
  .e-page {
    display: flex;
    justify-content: center;
    height: 150px;
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