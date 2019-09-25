<template>
  <div class="appp">
    <div class="app-time">
      请选择日期:&nbsp&nbsp&nbsp
       <el-date-picker
      v-model="value1"
      @change="text"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期">
      </el-date-picker>
    </div>
    <a class="list" v-for="(el,i) in list" :key="i" @click='junmp(el)' >
      <div class="title">
          <div class="left" style="width:50px;">
              {{i+1}}
          </div>
          <p class="app-t left"> 
            {{el.title}}
          </p>
          <div class="right">
            {{el.opendate}}
          </div>
      </div>
      <div class="detail">
        <div class="left" v-if="el.oneName">
          第一候选人：{{el.oneName}}
        </div>
        <div class="right" v-if="el.oneOffer">
          中标金额：{{el.oneOffer}}
        </div>
      </div>
    </a>
    <div class="page">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { queryList } from "@/api/index";
let moment = require("moment");
export default {
  data() {
    return {
      value1:'',
      list:[],
      total:0,
      current:1,
    }
  },
  methods: {
    gainlist() {
      queryList({pageNo:this.current,pageSize:20,type:2,regions:'湖南',gsDate:this.value1,sumType:'zhongbiao'}).then(res => {
        if(res.code == 1) {
          console.log(res);
          this.total = res.total
          this.list = res.data
        }
      })
    },
    gainTime() {
      // this.value1 = new Date().getTime()
     this.value1 =   moment(new Date().getTime()).format('YYYY-MM-DD')
    },
    handleCurrentChange(val) {
      this.current = val
      this.gainlist()
    },
    text() {
      this.gainlist()
    },
    junmp(el) {
      if(!el.oneName) {
        return 
      }
      const { href } = this.$router.resolve({
         path:'/dalist',query:{name:el.oneName}
        })
        window.open(href, '_blank')
    }
  },
  created () {
    this.gainTime()
    this.gainlist()
  },
 
}
</script>

<style lang='less'>
.appp {
  background-color: #f5f5f5;
  padding-top: 100px;
 .app-time {
   display: flex;
   justify-content: center;
   margin-top: 20px;
   align-items: center;
 }
 .list {
   padding: 23px 20px 10px;
   background-color: #fff;
   width: 960px;
   margin: 0 auto;
   display: block;
   overflow: hidden;
   margin-top: 2px;
   color: #000;
 }
 .left {
   float: left;
 }
 .right {
   float: right;
 }
 .app-t {
   text-overflow: ellipsis;
   overflow: hidden;
   white-space: nowrap;
   max-width: 800px;
   margin: 0;
   display: block;
 } 
 .title {
   margin-bottom: 9px;
   overflow: hidden;
 }
 .detail {
   font-size: 14px;
   color:#FE6603;
   padding-left: 50px;
 }
 .page {
   margin: 50px auto;
   width: 960px;
   display: flex;
   justify-content: center;

 }
}
</style>
