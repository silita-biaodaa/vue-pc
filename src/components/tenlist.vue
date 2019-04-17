<template>
<div class="bidlist">
  <div  class="bid-bor" v-show="ishow">  
    <div class="list-top">
      <div  class="left project ">
        项目名称
      </div>
       <div  class="left operate">
        操作
      </div>
    </div>
    <div class="list-text" v-for="(el,i) in bidlists" :key="i"  >
       <div class="left project" @click="tjump(el)" >
         <div>
          <p class="list-til">{{el.title}}</p>
          <p class="list-z">第一候选人：{{el.oneName ? el.oneName : '详见原文'}}</p>       
         </div>
       </div>
       <div class="left operate  ">
         <div class="list-btn" @click="cancel(el)" >
            取消关注
         </div>
       </div>
    </div>
  </div>
  
  <div class="page" v-show="ishow" >
    <nav-page 
    :all='total'
    :currents='pageNo'
    :pageSize = 'pageSize'
    @skip='Goto'
    ></nav-page>
  </div>
  <div v-show="!ishow" class="no-toast" >
    <img src="../assets/img/bank_card @2x.png" alt="">
    <span>暂无关注的中标公告</span>
  </div>
</div>
</template>
<script>
import { collectlist,nocollectionNotice } from '@/api/index';
export default {
  data () {
    return {
      pageNo:1,
      bidlists:[],
      total:0,
      pageSize:15,
      ishow:true
    }
  },
  methods: {
    Goto(val) {
      this.pageNo = val.cur     
      this.gainbid()
    },
    gainbid() {
      collectlist({type:'2',pageNo:this.pageNo,pageSize:15}).then(res => {
        if(res.code = 1 ) {
          this.total = res.total
          this.bidlists = res.data
           if(this.bidlists.length == 0) {
            this.ishow = false
          } else {
            this.ishow = true
          }
           if(  localStorage.getItem('permissions') == null || localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('tenderFilter') == -1  ) {
                           this.bidlists.forEach( el => {
                             if(el.oneName)  {
                                  if(el.oneName.indexOf('公司') == -1) {
                                  el.oneName = '***********'
                                } else {
                                  el.oneName = '***********' + '公司'
                                }
                             } else {
                               el.oneName = '***********'
                             }
                            })
                    }
        }
      })
    },
    cancel(el) {
      nocollectionNotice({noticeid:el.id,source:el.source}).then( res => {
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
    tjump(el) {
         const { href } = this.$router.resolve({
          path:'/notice',query:{id:el.id,source:el.source} 
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
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 550;
  }
   .project {
      width: 85%;
      padding-left: 29px;
      box-sizing: border-box;
    }
    .operate {
      width: 15%;
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
  .list-text {
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
