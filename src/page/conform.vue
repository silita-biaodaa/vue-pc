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
     <!-- 判断是否加载中 -->
      <template v-if="isajax">
          <!-- 有数据 -->
          <template v-if="list&&list.length>0">
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
          </template>
          <!-- 无数据  -->
          <template v-else-if="list&&list.length==0">
            <div class="no-toast">
              <img src="../assets/img/bank_card @2x.png" alt="">
              <span>Sorry，没有找到符合资质企业</span>
            </div>
          </template>
          <!-- 加载失败 -->
          <template v-else-if="!list">
            <div class="ajax-erroe">
              <img src="../assets/img/pic-zoudiu.png"/>
              <span @click="recoldFn">刷新</span>
            </div>
          </template>
      </template>
      <template v-else>
        <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
      </template>
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
      total:0,
      loading:true,
      isajax:false,
    }
  },
  inject:['reload'],
  methods: {
    gainList() {
      let dataParam ={
          pageSize:20,
          source:this.source,
          pageNo:this.current 
        };
        if(localStorage.getItem('permissions')){
          dataParam.isVip = 1
        } else {
          dataParam.isVip = 0 
        }
        let that=this;
        getJsonData( "/company/qual/list/" +  this.id , dataParam).then(res => {
            this.isajax=true;
            if(res.code == 1) {
              if(localStorage.getItem('permissions')){
                let arr = []
                res.data.forEach( el => {
                  if(el.phone) {
                      arr =  el.phone.split(';')
                      el.phone = arr[0]
                      arr.length = 0
                  }
                });
              }
              this.list = res.data
              this.total = res.total
              this.current = res.pageNo
            }
        }).catch(function(res){
            that.isajax=true;
            that.list=null;
        })
    },
    Goto(val) {
      this.isajax=false;
      this.current = val.cur
      this.gainList()
      this.funcom.toList(0)
    },
    store(el) {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.setItem('id',el.comId)
      localStorage.setItem('name',el.comName)
    },
    //刷新
    recoldFn(){
      this.reload();
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
