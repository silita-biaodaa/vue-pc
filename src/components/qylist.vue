<template>
<div class="bidlist">
  <!-- 判断是否加载中 -->
  <template v-if="isajax">
      <!-- 有数据 -->
      <template v-if="bidlists&&bidlists.length>0">
          <div  class="bid-bor">  
            <div class="list-top">
              <div  class="left project ">
                企业名称
              </div>
              <div  class="left operate">
                操作
              </div>
            </div>
            <div class="list-text" v-for="(el,i) in bidlists" :key="i"  >
              <div class="left project" @click="qjump(el)" >
                <div>
                  <p class="list-til">{{el.comName}}</p>
                  <p class="list-z" v-if="el.legalPerson">法定代表：{{el.legalPerson}}</p>
                  <p class="list-z" v-if="el.regisCapital">注册资金：{{el.regisCapital}}</p>       
                </div>
              </div>
              <div class="left operate  ">
                <div class="list-btn" @click="cancel(el)" >
                    取消关注
                </div>
              </div>
            </div>
          </div>
          <div class="page" v-if="total>15">
            <nav-page 
            :all='total'
            :currents='pageNo'
            :pageSize = 'pageSize'
            @skip='Goto'
            ></nav-page>
          </div>
      </template>
      <!-- 无数据  -->
      <template v-else-if="bidlists&&bidlists.length==0">
          <div class="no-toast">
          <img src="../assets/img/bank_card @2x.png" alt="">
          <span>暂无关注的企业信息，去<u class="herf-txt" @click="$router.push('/company')">企业列表</u>看看吧</span>
          </div>
      </template>
      <!-- 加载失败 -->
      <template v-else-if="!bidlists">
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
</template>
<script>
import { qytlist,nocollectionCompany } from '@/api/index';
export default {
  data () {
    return {
      pageNo:1,
      bidlists:[],
      total:0,
      pageSize:15,
      loading:true,
      isajax:false,
    }
  },
  inject:['reload'],
  methods: {
    recoldFn(){
        this.reload();
    },
    Goto(val) {
      this.pageNo = val.cur   
      this.isajax=false;   
      this.gainbid()
      this.funcom.toList(0)
    },
    gainbid() {
      let that=this;
      qytlist({pageNo:this.pageNo,pageSize:15}).then(res => {
        this.isajax=true;
        if(res.code = 1 ) {
          console.log(res);
          this.total = res.total
          this.bidlists = res.data
        }
      }).catch(function(res){
          that.isajax=true;
          that.bidlists=null;
      })
    },
    cancel(el) {
      nocollectionCompany({companyid:el.comId}).then( res => {
        if(res.code = 1 ) {
            this.$notify({
            title: '提示',
            message: '取消关注成功',
            offset: 100   
          });
          this.gainbid()
        }
      })
    },
    qjump(el) {
        const { href } = this.$router.resolve({
          path:'/introduce',query:{id:el.comId,name:el.comName,source:el.regisAddress} 
        })
        window.open(href, '_blank', )
    }
  },
  created () {
    this.gainbid()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.bidlist {
  .bid-bor {
    border: 1px solid #F2F2F2;
  }
  .list-top {
    border-bottom: 1px solid #F2F2F2;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 550;
  }
   .project {
      width: 85%;
      padding-left: 18px;
      box-sizing: border-box;
    }
    .operate {
      width: 15%;
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
  .list-text {
    padding: 15px 0;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
    cursor: pointer;
    .list-til {
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 568px;
    }
    .list-z{
      font-size: 12px;
      color:#999;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 268px;
    }
    .list-btn {
      line-height: 26px;
      width: 68px;
      border-radius: 8px;
      border: 1px solid #FE6603;
      color:#FE6603;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
    }
  }
  .page {
    padding: 50px 0;
    display: flex;
    justify-content: center;
  }
}
</style>
