<template>
<div class="law">
   <div class="law-search"> 
     <div class="left law-wei" >
       裁判文书（{{this.total}}）
     </div>
     <div class="law-year left">
        <el-date-picker
          v-model="year"
          type="year"
          placeholder="请选择年份">
        </el-date-picker>
     </div>
     <div class="right law-w">
        <el-input
          placeholder="请输入人员姓名"
          suffix-icon="el-icon-search"
          v-model="search">
        </el-input>
     </div>
   </div>
   <div class="law-list">
      <div class="law-nav">
        <div class="left" style="width:72px"> 
            序号
        </div>
        <div class="left" style="width:250px"> 
           案件名称
        </div>
        <div class="left" style="width:150px"> 
            法院
        </div>
        <div class="left" style="width:200px"> 
            案号
        </div>
        <div class="left" style="width:100px"> 
            时间
        </div>
      </div>
      <div class="law-text" v-for="(el,i) in lawList" :key="i" >
        <div class="left" style="width:72px"> 
            {{i+1}}
        </div>
        <div class="left law-pdd" style="width:250px"> 
           {{el.title}}
        </div>
        <div class="left" style="width:150px"> 
            {{el.court}}
        </div>
        <div class="left" style="width:200px"> 
            {{el.caseNo}}
        </div>
        <div class="left" style="width:100px"> 
            {{el.dateStr}}
        </div>
      </div>
   </div>
   <div class="law-page">
       <nav-page 
          :all='total'
          :currents='current'
          @skip='Goto'
       ></nav-page>
   </div>
</div>
</template>
<script>
import { Law } from '@/api/index'
export default {
  data () {
    return {
      year:'',
      search:'',
      lawList:[],
      total:0,
      current:1
    }
  },
  methods: {
    gainList() {
      var years = this.year == '' ? null : this.year
      Law({pageNo:this.current,pageSize:20,keyWord:this.search,comName:'湖南耀邦建设有限公司',start:years,end:null}).then(res => {
         if(res.code == 1) {
           console.log(res)
           this.lawList = res.data
           this.total = res.total
           this.current = res.pageNum

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
.law {
  background-color: #fff;
  padding: 0 9px;
  .law-search {
    height: 56px;
    line-height: 56px;
    padding: 0 12px;
    font-size: 14px;
    color:#333;
    .law-wei {
      font-weight: 550;
      margin-right: 25px;
    }
    .law-year {
      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 120px;
      }
    }

  }
  .law-list {
    border: 1px solid #f2f2f2;
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
      text-align: center;
      font-weight: 550;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .law-pdd {
        padding: 10px 20px; 
        box-sizing: border-box;
      }
    }
  }
  .law-page {
    height: 200px;
    display: flex;
    justify-content: center;
    padding-top: 50px;
  }
}
</style>