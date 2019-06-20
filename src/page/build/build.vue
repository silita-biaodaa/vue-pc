
<template>
<div class="build">
    <en-search @vague='entitle' :title="serach" @company="companyFn"></en-search>
    <div class="build-put">
      <div class="build-hint">
        <i>*</i><span>如需精准查询，请输入姓名及身份证号。(仅查询湖南省在建信息)</span>
      </div>
      <div class="mt-30" >
        <el-row>
          <el-col :span="12" class="put-id" >
             姓名：<el-input  placeholder="请输入姓名"  v-model="name" clearable></el-input>
          </el-col>
          <el-col :span="12"  class="put-id" >
            身份证号码：<el-input  placeholder="请输入身份证号码"  v-model="idcard" clearable maxlength="18"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="build-btn">
        <div class="btn-name" @click="bsearch" >
          查询
        </div>
      </div>
    </div>
    <div class="build-search">
      共搜索到<span class="p-color" >{{total}}</span>条在建信息     
    </div>
    <div class="build-list">
      <div class="build-table" >
        <div style="width:80px;" >
          序号
        </div>
        <div style="width:150px;" >
          姓名
        </div>
        <div style="width:250px;" >
          单位名称
        </div>
        <div style="width:300px;" >
          工程名称
        </div>
        <div style="width:240px;" >
          岗位类别
        </div>
      </div>
      <a class="build-in" v-for="(el,i) in list" :key="i"  @click="tobuild(el)"  > 
        <div style="width:80px;"  >
             {{(data.pageNo-1)*20+(i+1)}}
          </div>
          <div style="width:150px;" >
            {{el.name}}
          </div>
          <div style="width:250px;" >
            {{el.unitOrg}}
          </div>
          <div style="width:300px;" >
           {{el.proName}}
          </div>
          <div style="width:240px;" >
            {{el.type}}
          </div>
      </a>
      <div class="no-toast" v-show="noList" >
        <img src="../../assets/img/bank_card @2x.png" alt="">
        <span>Sorry，没有找到相关在建信息</span>
      </div>
      <div class="page" v-show="!noList" >
          <nav-page 
          :all='total'
          :currents='data.pageNo'
          @skip='Goto'
          ></nav-page>
      </div>
    </div>
    <f-vip @toChildEvent='closeload' v-if='svip' ></f-vip>
</div>
</template>
<script>
import { under,underq } from '@/api/index'
export default {
  data() {
    return {
      name:'',
      idcard:'',
      total:0,
      list:[],
      noList:false,
      title:'',
      svip:false,
      serach:'',
      data:{
        name:'',
        pageNo:1,
        pageSize:'20',
        searchType:0,
      }
    }
  },
  created () {
    this.title = localStorage.getItem('title') ? localStorage.getItem('title') : ''
    //如果是刷新操作，则复现上次
    if(sessionStorage.getItem('zjSerach')){
      let data=JSON.parse(sessionStorage.getItem('zjSerach'));
      if(data.searchType==0){
        this.data=data;
      }else{
        this.data=data;
        this.serach=data.name;
        this.data.name='';
      }
      
    }
    this.gainList()
  },
  methods: {
    entitle(val) {
      if(this.name == '' ) {
         this.title = val.cur
         this.data.pageNo = 1
         let data=this.data;
         data.name=this.title;
        under(data).then(res => {
          if(res.code == 1 ) {
            this.total = res.total
            this.list = res.data
            if(this.list.length == 0) {
              this.noList = true
            } else {
              this.noList = false
            }
          }
        })
      } else {
        this.gainList()
      }
    },
    bsearch() {
        if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
          if(localStorage.getItem('permissions') == '') {//判断会员
            this.svip = true
            this.modalHelper.afterOpen();
          } else {
            if(this.idcard == '' && this.name!= '' ) {
              this.data.pageNo = 1
              this.gainList()
            } else if ( this.idcard!= '') {
              underq({name:'aaaa',idCard:this.idcard,type:'api'}).then(res => {
                  if(res.code == 1) {
                    if(res.data.length == 0 ) {
                      this.$confirm('该人员无在建信息', '提示', {
                        showCancelButton:false,
                        showConfirmButton:false,
                        type: 'warning'
                      })
                    } else {
                      const { href } = this.$router.resolve({
                        path:'/certifi',query:{card:this.idcard} 
                      })
                        window.open(href, '_blank', )
                    }
                  }else{
                    this.$confirm(res.msg, '提示', {
                      showCancelButton:false,
                      showConfirmButton:false,
                      type: 'warning'
                    })
                  }
              })
              
            } 
          }
      } else {
          this.$confirm(this.qjTipTxt, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/logo')
          })
      }
    
    },
    closeload(val) {
      this.svip = val.cur
    },
    tobuild(el) {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        if(localStorage.getItem('permissions') == '') {
          this.svip = true
          this.modalHelper.afterOpen();
        } else {
          const { href } = this.$router.resolve({
              path:'/certifi',query:{id:el.pkid} 
            })
          window.open(href, '_blank', )
        }
      } else {
          this.$confirm(this.qjTipTxt, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/logo')
          })
      }
    },
    gainList() {
      let data=this.data;
      if(this.data.searchType==1){
        data.name=this.serach;   
      }
      under(data).then(res => {
        if(res.code == 1 ) {
          this.total = res.total
          this.list = res.data
          if(this.list.length == 0) {
            this.noList = true
          } else {
            this.noList = false
          }
        }
      })
    },
    Goto(val) {
      this.data.pageNo = val.cur;
      this.funcom.toList(450)
      this.gainList()
    },
    companyFn(val){//企业搜索
      this.list=[];
      this.data.searchType=1;
      this.serach =val.cur;
      this.data.pageNo = 1
      this.isajax=false;     
      this.gainList()
    },
  },
  watch:{
    data:{//监听data变化，并实时保存
      deep:true,
      handler(val,old){
        sessionStorage.setItem('zjSerach',JSON.stringify(val));
      }
    }
  },
  beforeDestroy(){
    sessionStorage.removeItem('zjSerach')
  },
}
</script>
<style lang="less" scoped>
.build {
  padding-top: 85px;
  .build-put {
    width: 1020px;
    margin: 0 auto;
    box-sizing: border-box;
    height: 282px;
    background-color: #fff;
    padding: 19px 20px;
    margin-top: 20px;
    .build-hint {
      font-size: 12px;
      color: #999;
      position: relative;
      overflow: hidden;
      i {
        color: red;
        margin-right: 5px;
        font-size: 20px;
      }
      span {
        position: absolute;
        top: -2px;
      }
      
    }
    .mt-30 {
      margin-top: 30px;
    }
    .put-id {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
    }
    .build-btn {
      display: flex;
      justify-content: center;
      margin-top: 60px;
      .btn-name {
        width:154px;
        height:46px;
        background:rgba(254,102,3,1);
        border-radius:5px;
        font-size: 16px;
        color:#fff;
        line-height: 46px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .build-search {
    width: 1020px;
    margin: 0 auto;
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    color:#666;
  }
  .build-list {
    width: 1020px;
    margin: 0 auto;
    background-color: #fff;
    margin-bottom: 200px;
    .build-table {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 60px;
      font-size: 16px;
      font-weight: 550;
      color:#333;
      text-align: center;
      border-bottom: 1px solid #f2f2f2;
    }
    .build-in {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid #f2f2f2;
      min-height: 60px;
      font-size: 16px;
      color:#999;
      cursor: pointer;
   
    }
    a:hover{color: #FE6603}
    .noneS {
    width: 1020px;
    margin: 0 auto;
    background-color: #fff;
    height: 582px;
    margin-bottom: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page {
       height: 210px;
       padding-top: 70px;
       display: flex;
       justify-content: center;
     }
     
  }
}
</style>