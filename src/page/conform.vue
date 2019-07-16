<template>
<div class="conform">
  <div class="con-nav">
     首页 > 招标 > 招标详情 > 符合资质企业
  </div>
  <div class="con-table">
     <div class="con-top con-c">
       <div class="left" style="width:70px">
         序号
       </div>
       <div class="left" style="width:300px">
         企业名称
       </div>
       <div class="left" style="width:200px">
         法定代表
       </div>
       <div class="left" style="width:150px">
         注册资本
       </div>
       <div class="left" style="width:150px">
         联系方式
       </div>
       <div class="left" style="width:150px">
         所属地区
       </div>
     </div>
      <router-link class="con-top" v-for="(el,i) in list" :key="i" :to="{path:'/introduce',query:{id:el.comId,name:el.comName,source:el.regisAddress}}" target='_blank' @click.native='store(el)' >
        <div class="left" style="width:70px">
          {{i+1}}
        </div>
        <div class="left" style="width:300px">
           <span class="con-cc">{{el.comName}}</span>
        </div>
        <div class="left" style="width:200px">
          {{el.legalPerson}}
        </div>
        <div class="left" style="width:150px">
          {{el.regisCapital}}
        </div>
        <div class="left" style="width:150px">
          {{el.phone}}
        </div>
        <div class="left" style="width:150px">
          {{el.regisAddress}}
        </div>
      </router-link>
  </div>
  <div class="con-page">
       <nav-page 
        :all='total'
        :currents='current'
        @skip='Goto'
        ></nav-page>
  </div>
</div>
</template>
<script>
import { getJsonData } from '@/api/index'
export default {
  data () {
    return {
      current:1,
      source:'',
      id:'',
      list:[],
      total:0
    }
  },
  methods: {
    gainList() {
      let dataParam = JSON.stringify({
          pageSize:20,
          source:this.source,
          pageNo:this.current 
        });
        if(localStorage.getItem('permissions')){
          dataParam.isVip = 1
        } else {
          dataParam.isVip = 0 
        }
        getJsonData( "/notice/queryCompanyList/" +  this.id , dataParam).then(res => {
            if(res.code == 1) {
              this.list = res.data
              this.total = res.total
              this.current = res.pageNo
            }
        });
    },
    Goto(val) {
      this.current = val.cur
      this.gainList()
      this.funcom.toList(0)
    },
    store(el) {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.setItem('id',el.comId)
      localStorage.setItem('name',el.comName)
    }
  },
  created () {
    this.source = this.$route.query.source;
    this.id = this.$route.query.id;
    this.gainList()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.conform {
  width: 1020px;
  margin: 0 auto;
  padding-top: 86px;
  .con-nav {
    font-size: 12px;
    font-weight: 500;
    color:#666;
    margin: 16px 0;
  }
  .con-table {
    background-color: #fff;
    font-size: 16px;
    color:#999;
    .con-top {
      min-height: 64px;
      display: flex;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid #f2f2f2;
      color:#999;
    }
    .con-c {
      color: #333;
      font-weight: 500;
    }
    .con-cc  {
      color:#FE6603;
    }
  }
  .con-page {
    height: 200px;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-bottom: 150px;
  }
  
}
</style>
