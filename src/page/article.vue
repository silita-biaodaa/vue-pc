<template>
 <div class="article">
   <div style="height:126px;" >

   </div>
   <div class="title">
      <p>
        {{articles.title}}
      </p>
      <div class="date">
        <span>{{articles.opendate}}</span>
        <span>浏览量：<i>{{clickCount}}</i></span>
        <span class="left" style="marginLeft:10px;cursor: pointer;" @click="anchorJump">评论数：<i>{{allC}}</i></span>
        <!-- <div> -->
        <div class="left attention" :class="iscollect ? 'collect' : ''"  @click="gaincollect" >
          <i class="el-icon-plus"></i>{{collect}}
        </div>
        <!-- </div> -->
        
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
   <!-- <div > -->
     <com-ment id="divId" :type="'zhaobiao'" ref="comment"></com-ment>
   <!-- </div> -->
   
 </div>
</template>
<script>
import axios from 'axios'
import { getJsonData,collectionNotice,nocollectionNotice } from '@/api/index'
export default {
  data () {
    return {
      id:'',
      articles:{},
      clickCount:0,
      relCompanySize:0,
      source:'',
      iscollect:true,
      collect:'关注',
      skip:false,
      allC:0
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
               this.allC = res.commentCount
               this.articles = res.data[0]
               this.clickCount = res.clickCount
               this.relCompanySize = res.relCompanySize
               this.iscollect = res.data[0].collected
               if(this.iscollect) {
                 this.collect = '已关注'
               } else {
                 this.collect = '关注'
               }
                if( localStorage.getItem('permissions') == null || localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('bidFilter') == -1  ) {
                   if(this.articles.zzRank){
                     this.articles.zzRank=this.articles.zzRank.replace(/特|一|二|三|四|五|甲|乙|丙|丁/g,'*')
                   }
                     if( this.articles.pbMode) {
                      let xin  = this.articles.pbMode.length
                      this.articles.pbMode = '*'   
                      for (var i = 1; i<xin; i++ ) {
                        this.articles.pbMode = this.articles.pbMode + '*'
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
    breakto() {
      if(this.relCompanySize == null) {
        return 
      } else {
         const { href } = this.$router.resolve({
          path:'/conform',query:{source:this.source,id:this.id} 
        })
        window.open(href, '_blank', )
      }
     
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
        collectionNotice({noticeid:this.id,type:'0',source:this.source}).then(res => {
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
  mounted () {
    this.toskip()
    this.$nextTick(function(){
      
    })
  },
  created () {
    this.skip = this.$route.query.skip ? this.$route.query.skip : false;
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
   width: 1020px;
   margin: 0 auto;
   background: #FAFAFA;
   .a-color {
     color:#EC7522;
     cursor: pointer;
   }
   .title {
     width: 1020px;
     background: #fff;
     padding-top: 27px;
     p {
       font-size: 30px;
       text-align: center;
       margin-bottom: 17px;
      //  height: 40px;
     }
     .date {
      //  margin-left: 275px;
       display: flex;
       justify-content: space-evenly;
      //  width: 575px;
       font-size: 18px;
      //  margin-bottom: 10px;
       i {
         color:#EC7522;
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
   }
   .detail {
     background: #fff;
     box-sizing: border-box;
     width: 1020px;
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
     width: 1020px;
     padding: 0 20px;
     box-sizing: border-box;
    
     .link {
       width: 980px;
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
       width: 980px;
       padding: 26px 0 80px;
     }
   }
}
</style>
