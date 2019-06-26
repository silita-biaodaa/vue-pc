<template>
<div class="notice">
   <div class="n-title fa">
       <p class="n-fp">{{articles.title}}</p>

       <div class="n-tp">
          <span>{{articles.opendate}}</span>
          <span>浏览量: <i>{{clickCount}}</i></span>
          <span class="left" style="marginLeft:10px;cursor: pointer;"  @click="anchorJump">评论数：<i>{{allC}}</i></span>
          <!-- <div class="right" > -->
          <div class="left attention" :class="iscollect ? 'collect' : ''"  @click="gaincollect" >
              <i class="el-icon-plus"></i>{{collect}}
          </div>
          <!-- </div>  -->
         
       </div>
       <p class="n-thp">
         <span class="left" v-if="articles.oneName" >第一候选人：{{articles.oneName}}</span>
         <span v-else class="left">第一候选人:详见原文</span>
         <span class="right" v-if="articles.oneOffer">中标金额：{{articles.oneOffer}}万</span>
         <span class="right" v-else >中标金额：详见原文</span>
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
    <com-ment id="divId" :type="'zhongbiao'" class="no-comL" ref="comment" ></com-ment>
</div>
</template>
<script>
import axios from 'axios'
import { getJsonData,collectionNotice,nocollectionNotice } from '@/api/index'
export default {
  data () {
    return {
      id:'2003264',
      clickCount:0,
      articles:[],
      source:'hunan',
      collect:'关注',
      iscollect:false,
      allC:0
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
               this.allC = res.commentCount
               this.articles = res.data[0]
               this.clickCount = res.clickCount
               this.iscollect = res.data[0].collected
               if(this.iscollect) {
                 this.collect = '已关注'
               } else {
                 this.collect = '关注'
               }
               if(  localStorage.getItem('permissions') == null || localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('tenderFilter') == -1  ) {
                             if(this.articles.oneName)  {
                                  if(this.articles.oneName.indexOf('公司') == -1) {
                                  this.articles.oneName = '***********'
                                } else {
                                  this.articles.oneName = '***********' + '公司'
                                }
                             }
                             if(this.articles.oneOffer) {
                                let mm  = this.articles.oneOffer.length
                                this.articles.oneOffer = '*'   
                                for (var i = 1; i<mm; i++ ) {
                                  this.articles.oneOffer = this.articles.oneOffer + '*'
                                }
                             } 
                    }
                    this.toTop() 
            }
        });
    },
    text() {
       window.open(this.articles.url, "_blank")
    },
    gaincollect() {
      if(this.iscollect) {
        nocollectionNotice({noticeid:this.id,source:this.source}).then(res => {
          if(res.code = 1) {
            this.iscollect = false
            this.collect = '关注'
          }
        })
      } else {
        collectionNotice({noticeid:this.id,type:'2',source:this.source}).then(res => {
          if(res.code = 1) {
            this.iscollect = true
            this.collect = '已关注'
          }
        })
      }
    },
     toskip() {
      if(this.skip) {  
        setTimeout(() => {
          document.getElementById("divId").scrollIntoView(true);
        }, 400);
        
      }
    },
    toTop() {
      if(!this.skip) {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      } 
    },
    anchorJump(){
      if(this.allC==0){
        return false
      }
      let h=this.$refs.comment.$el.offsetTop;
      document.documentElement.scrollTop=h-108;
    }
  },
  created () {
    this.skip = this.$route.query.skip ? this.$route.query.skip : false;
    this.id = this.$route.query.id;
    this.source = this.$route.query.source;
    this.gainDetail()
  },
  mounted () {
    this.toskip()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.notice {
  width: 100%;
  padding-top: 86px;
  .fa {
    width: 1020px;
    margin: 0 auto;
    background-color: #fff;
  }
  .n-title {
    margin-top: 40px;
    box-sizing: border-box;
    padding: 32px 20px 20px;
    .n-fp {
       color: #333;
       font-size: 24px;
       font-weight: 500;
       margin-bottom: 17px;
       text-align: center;
    }
    .n-tp {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      color: #666;
      font-size: 18px;
      i {
        color: #EC7522;
      }
       .attention {
         margin-left: 20px;
         width: 62px;
         line-height: 22px;
         border: 1px solid #FE6603;
         text-align: center;
         font-size: 14px;
         border-radius: 5px;
         color:#FE6603;
         cursor: pointer;
         i {
           font-size: 12px;
         }
       }
       .collect {
         color:#fff;
         background-color: #FE6603;
         i {
           color:#fff;
         }
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
    margin: 40px auto 20px;    
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
  .no-comL {
    width: 1020px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-bottom: 200px;
  }
}
</style>
