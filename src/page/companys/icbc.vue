<template>
<div class="icbc">
  <div class="ic-nav">
      <span v-for="(o,i) of navlist" class="navspan" :key="i" :class="{'ic-dark':navNum==i,'loading':!o.isAjax}" @click="navTapFn(i,o.isAjax)">
        {{o.name}}
        <template v-if="o.length!=0">
          (<span>{{o.length}}</span>)
        </template>
      </span>
  </div>
    <!-- 基本信息 -->
    <template v-if="navNum==0">
      <v-infor :details="inforData"></v-infor>
    </template>
    <!-- 分支机构 -->
    <template v-else-if="navNum==1"> 
      <v-branch :list='branchList'></v-branch>
    </template>
    <!-- 股东信息 -->
    <template v-else-if="navNum==2"> 
      <v-holder :list='holderList'></v-holder>
    </template>
    <!-- 主要人员 -->
    <template v-else-if="navNum==3"> 
      <v-people :list='peopleList'></v-people>
    </template>
    <!-- 变更记录 -->
    <template v-else-if="navNum==4"> 
      <v-change :list='changeList'></v-change>
    </template>
    <!-- 企业年报 -->
    <template v-else-if="navNum==5"> 
      <v-years :list='yearsList'></v-years>
    </template>
    <!-- 行政处罚 -->
    <template v-else-if="navNum==6"> 
      <v-punish :list='punishList'></v-punish>
    </template>
    
</div>
</template>
<script>
import { Branch,getJsonData } from '@/api/index'
import information from '@/components/business/information'
import branch from '@/components/business/branch'
import shareholder from '@/components/business/shareholder'
import changeRecord from '@/components/business/changeRecord'
import people from '@/components/business/people'
import annualReport from '@/components/business/annualReport'
import punish from '@/components/business/punish'
export default {
  data () {
    return {
      inforData:{},//基本信息data
      branchList:[],//分支机构list
      holderList:[],//股东信息
      peopleList:[],//主要人员
      changeList:[],//变更记录
      yearsList:[],//年报
      punishList:[],//行政处罚
      id:'',
      navNum:0,
      navlist:[
        {
          name:'基本信息',
          length:0,
          isAjax:true,
        },{
          name:'分支机构',
          length:0,
          isAjax:false,
        },{
          name:'股东信息',
          length:0,
          isAjax:false,
        },{
          name:'主要人员',
          length:0,
          isAjax:false,
        },{
          name:'变更记录',
          length:0,
          isAjax:false,
        },{
          name:'企业年报',
          length:0,
          isAjax:false,
        },{
          name:'行政处罚',
          length:0,
          isAjax:false,
        }
      ]
    }
  },
  watch: {
   
  },
  methods: {
    getInfor() {//基本信息
      this.id = this.$route.query.id
      getJsonData( "/company/" + this.id ).then(res => {
          if(res.code == 1) {
            this.inforData = res.data
          }
      });
    },
    getBranch() {//分支机构
      Branch({comId:this.id}).then(res => {
          this.navlist[1].isAjax=true;
          if(res.code == 1) {
            this.branchList = res.data
            var iar = []
            this.branchList.forEach( el => {
                if(el.phone) {
                  iar = el.phone.split(';')
                  if( localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('comPhone') == -1  ) {
                      el.phone = this.resetPhone(iar[0])
                  } else {
                      el.phone = iar[0]
                  }
                  iar = []
                } else {
                  return
                }           
            })
            this.navlist[1].length = res.data.length
          }
      })
    },
    getHolder(){//股东信息
      let that=this;
      this.$http({
        method:'post',
        url:'/gs/info',
        data:{
          comId:this.id,
          paramter:'partner'
        }
      }).then(function(res){
        that.navlist[2].isAjax=true;
        if(res.data.code==1){
          let n =that.countScale(res.data.data);
          for(let x of res.data.data){
            x.proportion=((x.liSubConAm/n)*100).toFixed(2)+'%';
          }
          that.holderList=res.data.data;
          that.navlist[2].length=res.data.data.length;
        }else{
          that.$alert(res.data.msg);
        }
      })
    },
    getPeople(){//主要人员
      let that=this;
      this.$http({
        method:'post',
        url:'/gs/info',
        data:{
          comId:this.id,
          paramter:'personnel'
        }
      }).then(function(res){
        that.navlist[3].isAjax=true;
        if(res.data.code==1){
          that.peopleList=res.data.data;
          that.navlist[3].length=res.data.data.length;
        }else{
          that.$alert(res.data.msg);
        }
      })
    },
    getChange(){//变更信息
      let that=this;
      this.$http({
        method:'post',
        url:'/gs/info',
        data:{
          comId:this.id,
          paramter:'change_record'
        }
      }).then(function(res){
        that.navlist[4].isAjax=true;
        if(res.data.code==1){
          that.changeList=res.data.data;
          that.navlist[4].length=res.data.data.length;
        }else{
          that.$alert(res.data.msg);
        }
      })
    },
    getYears(){//企业年报
      let that=this;
      this.$http({
        method:'post',
        url:'/gs/report/years',
        data:{
          comId:this.id,
        }
      }).then(function(res){
        that.navlist[5].isAjax=true;
        if(res.data.code==1){
          that.yearsList=res.data.data;
          that.navlist[5].length=res.data.data.length;
        }else{
          that.$alert(res.data.msg);
        }
      })
    },
    getPunish(){//行政处罚
      let that=this;
      this.$http({
        method:'post',
        url:'/gs/info',
        data:{
          comId:this.id,
          paramter:'punish'
        }
      }).then(function(res){
        that.navlist[6].isAjax=true;
        if(res.data.code==1){
          that.punishList=res.data.data;
          that.navlist[6].length=res.data.data.length;
        }else{
          that.$alert(res.data.msg);
        }
      })
      
    },
    countScale(list){//计算股东比例
      let n=0;
      for(let x of list){
        n+=x.liSubConAm
      }
      return n
    },
    resetPhone(phone) {//号码*号
      var str = String(phone)
      var len = str.length;
      if (len >= 7) {
          var reg = str.slice(-7, -3)
          return str.replace(reg, "****")
      } else if (len < 7 && len >= 6) {
          //1234567
          var reg = str.slice(-4, -2)
          return str.replace(reg, "**")
      }
    },
    navTapFn(i,isajax){
      if(isajax){
        this.navNum=i;
      }
    }
  },
  created () {
    this.getInfor()
    this.getBranch()
    this.getHolder()
    this.getPeople()
    this.getChange()
    this.getYears()
    this.getPunish()
  },
  components: {
    'v-infor':information,
    'v-branch':branch,
    'v-holder':shareholder,
    'v-change':changeRecord,
    'v-people':people,
    'v-years':annualReport,
    'v-punish':punish
  }
}
</script>
<style lang="less" scoped>
.icbc{
  background-color: #fff;
  overflow: hidden;
  .ic-nav {
    font-size: 14px;
    color:#999;
    margin: 15px 0 14px 23px;
    cursor: pointer;
    font-weight: 550;
    .navspan{
      border-right: 1px solid #999;
      padding: 0 10px;
    }
    .navspan:last-child{
      border-right: none;
    }
  }
  .ic-dark {
    color:#FE6603;
  }
  .loading{
    cursor: wait;
  }
    
  }
  .f-color {
    background-color: #fff;
    
  }
  


</style>