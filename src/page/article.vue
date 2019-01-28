<template>
 <div class="article">

   <div class="title">
      <p>
        {{articles.title}}
      </p>
      <div class="date">
        <span>{{articles.opendate}}</span>
        <span>点击数：<i>{{clickCount}}</i></span>
      </div>
   </div>

   <div class="detail">
      <div class="area">
        <span>
            项目地区：{{articles.projDq}}
        </span>
         <span>
        评标办法：{{articles.pbMode}}
        </span>
        <span>
          资质要求：{{articles.zzRank ? articles.zzRank : '详见原文' }}
        </span>
      </div>
      <div>
        符合资质要求企业：{{relCompanySize ? relCompanySize : 0 }}
      </div>
   </div>
   
   <div class="conten">
      <div class="link">
          <span>原文</span>
          <span @click="text">访问原文出处》</span>
      </div>
      <div class="essay" v-html="articles.content">
         
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
      id:'',
      articles:{},
      clickCount:0,
      relCompanySize:0
    }
  },
  methods: {
    gainDetail() {
      let dataParam = JSON.stringify({
          type:'0',
          source:'hunan'
        });
        getJsonData( "/notice/detail/" +  this.id , dataParam).then(res => {
            if(res.code == 1) {
               this.articles = res.data[0]
               this.clickCount = res.clickCount
               this.relCompanySize = res.relCompanySize
            }
        });
    },
    text() {
       window.open(this.articles.url, "_blank")
    }
  },
  created () {
    this.id = this.$route.query.id;
    this.gainDetail()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.article {
   width: 1190px;
   padding-top: 40px;
   background: #FAFAFA;
   .title {
     width: 1190px;
    //  height: 100px;
     background: #fff;
    //  display: flex;
    //  justify-content: center;
     padding-top: 27px;
     border-bottom: 1px solid #F2F2F2;
     p {
       font-size: 30px;
       text-align: center;
       margin-bottom: 17px;
      //  height: 40px;
     }
     .date {
       margin-left: 275px;
       display: flex;
       justify-content: space-between;
       width: 575px;
       font-size: 18px;
       margin-bottom: 10px;
       i {
         color:#EC7522;
       }
     }
   }
   .detail {
     background: #fff;
     box-sizing: border-box;
     width: 1190px;
     height: 133px;
     margin-bottom: 11px;
     padding: 25px 19px 0;
     .area {
      width: 100%;
       display: flex;
       justify-content: space-between;
       font-size: 18px;
       margin-bottom: 35px;
     }
   }
   .conten {
     background: #fff;
     width: 1190px;
     padding: 0 20px;
     box-sizing: border-box;
     margin-bottom: 200px;
     .link {
       width: 1150px;
       height: 69px;
       line-height: 69px;
       font-size: 20px;
       display: flex;
       justify-content: space-between;
       border-bottom: 1px solid #F2F2F2;
       span:nth-child(2) {
         color: #EC7522;
         cursor:pointer;
       }
     }
     .essay {
       width: 1150px;
       padding: 26px 0 80px;
     }
   }
}
</style>
