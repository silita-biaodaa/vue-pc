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
      <div class="area a-f">
        <span>
            项目地区：{{articles.projDq}}
        </span>
        <span class="m-d">
           评标办法：{{articles.pbMode ? articles.pbMode : '详见原文'}}
        </span>
        
      </div>
      <div class="a-t a-f" >
          资质要求：{{articles.zzRank ? articles.zzRank : '详见原文' }}
      </div>
      <div class="a-f" >
        符合资质要求企业：<a class="a-color"  @click="breakto" >{{relCompanySize ? relCompanySize + '家>' : 0 }}</a> 
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
      relCompanySize:0,
      source:''
    }
  },
  methods: {
    gainDetail() {
      let dataParam = JSON.stringify({
          type:'0',
          source:this.source
        });
        getJsonData( "/notice/detail/" +  this.id , dataParam).then(res => {
            if(res.code == 1) {
              console.log(res);
              
               this.articles = res.data[0]
               this.clickCount = res.clickCount
               this.relCompanySize = res.relCompanySize
            }
        });
    },
    text() {
       window.open(this.articles.url, "_blank")
    },
    breakto() {
      if(this.relCompanySize == null) {
        return 
      } else {
         const { href } = this.$router.resolve({
          path:'/conform',query:{source:this.source,id:this.id} 
        })
        window.open(href, '_blank', )
      }
     
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
.article {
   width: 1190px;
   padding-top: 40px;
   background: #FAFAFA;
   .a-color {
     color:#EC7522;
     cursor: pointer;
   }
   .title {
     width: 1190px;
     background: #fff;
     padding-top: 27px;
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
      //  margin-bottom: 10px;
       i {
         color:#EC7522;
       }
     }
   }
   .detail {
     background: #fff;
     box-sizing: border-box;
     width: 1190px;
     height: 163px;
     margin-bottom: 11px;
     padding: 15px 19px 0;
     .area {
       width: 100%;
       font-size: 18px;
       padding-bottom: 15px;
     }
     .m-d {
       margin-left: 320px;
     }
     .a-t {
       padding-bottom: 20px;
       border-bottom: 1px solid #F2F2F2;
       margin-bottom: 20px;
     }
     .a-f {
       color:#666;
       font-size: 14px;
       font-weight: 550;
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
