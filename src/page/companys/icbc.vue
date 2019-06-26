<template>
<div class="icbc">
  <div class="ic-nav">
      <span v-for="(o,i) of navlist" class="navspan" :key="i" :class="navNum==i?'ic-dark':''" @click="navNum=i">
        {{o.name}}
        <template v-if="o.length!=0">
          (<span style="color:#FE6603">{{o.length}}</span>)
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

    </template>
    <!-- 主要人员 -->
    <template v-else-if="navNum==3"> 

    </template>
    <!-- 变更记录 -->
    <template v-else-if="navNum==4"> 

    </template>
    <!-- 企业年报 -->
    <template v-else-if="navNum==5"> 

    </template>
    <!-- 行政处罚 -->
    <template v-else-if="navNum==6"> 

    </template>
    
</div>
</template>
<script>
import { Branch,getJsonData } from '@/api/index'
import information from '@/components/business/information'
import branch from '@/components/business/branch'
export default {
  data () {
    return {
      inforData:{},//基本信息data
      branchList:[],//分支机构list
      id:'',
      navNum:0,
      navlist:[
        {
          name:'基本信息',
          length:0
        },{
          name:'分支机构',
          length:0
        },{
          name:'股东信息',
          length:0
        },{
          name:'主要人员',
          length:0
        },{
          name:'变更记录',
          length:0
        },{
          name:'企业年报',
          length:0
        },{
          name:'行政处罚',
          length:0
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
    resetPhone(phone) {
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
  },
  created () {
    this.getInfor()
    this.getBranch()
  },
  components: {
    'v-infor':information,
    'v-branch':branch
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
    color:#333;
  }
  
    
  }
  .f-color {
    background-color: #fff;
    
  }
  
</style>