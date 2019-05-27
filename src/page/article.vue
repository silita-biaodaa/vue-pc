<template>
 <div class="article">
  <!-- <div @click="toCom" >
    点击
  </div> -->
   <div class="title">
      <p>
        {{articles.title}}
      </p>
      <div class="date">
        <span>{{articles.opendate}}</span>
        <div>
          <span class="left">点击数：<i>{{clickCount}}</i></span>
          <div class="left attention" :class="iscollect ? 'collect' : ''"  @click="gaincollect" >
            <i class="el-icon-plus"></i>{{collect}}
          </div>
        </div>
        
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
     <com-ment id="divId" :type="'zhaobiao'"  ></com-ment>
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
                   
                    // this.articles.pbMode = '****'

                } 
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
    toCom() {
      
       console.log('执行2');
              
    },
    
  },
  mounted () {
    this.toCom()
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
   width: 1020px;
   padding-top: 126px;
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
       margin-left: 275px;
       display: flex;
       justify-content: space-between;
       width: 575px;
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
