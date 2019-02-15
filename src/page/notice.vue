<template>
<div class="notice">
   <div class="n-title fa">
       <p class="n-fp">{{articles.title}}</p>

       <p class="n-tp">
          <span class="left">{{articles.opendate}}</span> 
          <span class="right">点击数: <i>{{clickCount}}</i></span>
       </p>
       <p class="n-thp">
         <span class="left" v-if="articles.oneName" >第一候选人：{{articles.oneName}}</span>
         <span v-else class="left">详见原文</span>
         <span class="right" v-if="articles.oneOffer">中标金额：{{articles.oneOffer}}万</span>
         <span class="right" v-else >详见原文</span>
       </p>
   </div>
   <div class="n-detail fa">
      <div class="n-nav">
         <span class="left">原文</span>
         <span class="right n-color" @click="text" >访问原文出处》</span>
      </div>
      <div class="n-text" v-html="articles.content" >

      </div>
   </div>
</div>
</template>
<script>
import axios from 'axios'
import { getJsonData } from '@/api/index'
export default {
  data () {
    return {
      id:'2003264',
      clickCount:0,
      articles:[],
      source:'hunan'
    }
  },
  methods: {
    gainDetail() {
      let dataParam = JSON.stringify({
          type:'2',
          source:this.source
        });
        getJsonData( "/notice/detail/" + this.id , dataParam).then(res => {
            if(res.code == 1) {
               this.articles = res.data[0]
               this.clickCount = res.clickCount
            }
        });
    },
    text() {
       window.open(this.articles.url, "_blank")
    }
  },
  created () {
    this.id = this.$route.query.id;
    this.source = this.$route.query.source;
    this.gainDetail()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.notice {
  width: 100%;
  .fa {
    width: 1020px;
    margin: 0 auto;
    background-color: #fff;
  }
  .n-title {
    height: 153px;
    // display: flex;
    // justify-content: center;
    margin-top: 40px;
    box-sizing: border-box;
    padding: 32px 20px 0;
    .n-fp {
       color: #333;
       font-size: 24px;
       font-weight: 500;
       margin-bottom: 17px;
       text-align: center;
    }
    .n-tp {
      width: 550px;
      color: #666;
      font-size: 14px;
      margin: 0 auto;
      overflow: hidden;
      i {
        color: #EC7522;
      }
    }
    .n-thp {
      color: #666;
      font-size: 16px;
      overflow: hidden;
      margin-top: 20px;
    }
  }
  .n-detail {
    margin: 40px auto 210px;    
    .n-nav {
      height: 70px;
      line-height: 70px;
      padding: 0 20px ;
      border-bottom: 1px solid #f2f2f2;
      font-size: 20px;
      color:#333;
    }
    .n-color {
      color:#EC7522;
    }
  }
  .n-text {
    padding: 26px 20px 70px;
  }  
}
</style>
