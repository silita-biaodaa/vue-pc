<template>
<div class="reply"     >
   <div v-for="(el,i) in textList" :key="i" class="re-bor" >
        <div @click="jumA(el)"  class=" all-text" >
              <div class="re-title">
                <p :title="el.noticeTitle" >{{el.relatedType == 'zhongbiao' ? '中标公告：' : '招标公告：'}}{{el.noticeTitle}}</p>
              </div>
              <div class="re-new"  v-if="current == 1 && i == 0" >
                 <span>最新回答</span>
                 <div class="triangle" >
                 </div>
              </div>
              <div style="padding:10px 0"   @mouseenter="enter(el)"  @mouseleave="leave(el)" >
                   <div class="re-list"  >
                      <div class='list-img'>
                        <img :src="el.image != null ? el.image : avatar" alt="">
                        <div class="no-read" v-if="el.isRead == 0" >
                        
                        </div>
                      </div>
                      <div class="list-text" >
                        <p><span class="clor-3" >{{el.reNikename}}</span><span v-if="el.reCompany" >（{{el.reCompany}}）</span>回复了<span class="clor-3" >你</span>：</p>
                        <div style="margin: 5px 0;" >{{el.replyContent}}
                        </div>
                        <p>{{el.pushd}}</p>
                      </div>
                      <div class="list-btn" >
                        <div class="btn-list" >
                          <span class="p-color" @click.stop="pushA(el)" >回复</span>
                          <span v-show="el.delBtn" @click.stop="delText(el)" >删除</span>
                        </div>
                      </div>
             </div>
        </div>
     </div>
      <div v-show="el.textShow" >
            <textarea class="re-area" placeholder="欢迎留言讨论~" style="resize:none" maxlength="300" v-model="pushText" ></textarea>
            <div class="re-push p-color" @click.stop="pusHText(el)" >
              发布
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
      <div class="info-pop" v-show="pop" >
       {{msg}}
     </div>
     <div class="no-toast" v-show="noList" >
       <img src="../../assets/img/bank_card @2x.png" alt="">
       <span>暂无评论信息</span>
     </div>
</div>
</template>
<script>
import { message,Dmessage,commentP,Rmessage } from "@/api/index";
export default {
  data () {
    return {
      pushText:'',
      msg:'',
      pop:false,
      textList:[],
      total:0,
      pageSize:10,
      ishow:false,
      noList:false,
      avatar: require('../../assets/img/icon-toux.png@2x.png'),
    }
  },
  props: {
    current:0
  },
  methods: {
    enter(el) {
      el.delBtn = true
    },
    leave(el) {
      el.delBtn = false
    },
    jumA(el) {
      if(el.relatedType == 'zhongbiao') {
         const { href } = this.$router.resolve({
          path:'/notice',query:{id:el.relatedId,source:el.source,skip:true} 
        })
        window.open(href, '_blank', )
      } else {
         const { href } = this.$router.resolve({
          path:'/article',query:{id:el.relatedId,source:el.source,skip:true} 
        })
        window.open(href, '_blank', )
      }
         el.isRead = 1
         Rmessage({pkid:el.pkid}).then(res => {
         })
    },
    pushA(el) {
      this.textList.forEach(el => {
        el.textShow = false
      })
      this.pushText = ''
      el.textShow = true
    },
    delText(el) {
      Dmessage({ids:el.pkid}).then(res => {
        if(res.code == 1) {
          this.msg = '删除成功'
          this.pop = true
          this.gaiaList()
          setTimeout(() => {
            this.pop = false
          }, 1500);
        }    
      })
    },
    Goto(val) {
      this.pageNo = val.cur     
      this.gaiaList()
      this.$emit('page', {state:val.cur})
    },
    gaiaList() {
      message({pageNum:this.pageNo,pageSize:10}).then(res => {
         if(res.code == 1) {
           res.data.forEach(el => {
             el.textShow = false
             el.delBtn = false
           })
           this.total = res.total
           this.textList = res.data
           if( this.total >= 10) {
             this.ishow = true
           } else {
             this.ishow = false
           }
           if( this.textList.length == 0) {
             this.noList = true
           } else {
             this.noList = false
           }
         }
        
      })
    },
    pusHText(el) {
      if(this.pushText.trim() == '') {
        return 
      }
       commentP({content:this.pushText,relatedId:el.relatedId,relatedType:el.relatedType,toUid:el.replyUid,commentId:el.commentId,source:el.source}).then(res => {
         if(res.code == 1) {
            this.msg = '评论成功'
            this.pop = true
            el.textShow = false
            this.pushText = ''
            el.isRead = 1
            Rmessage({pkid:el.pkid}).then(res => {

            })
            setTimeout(() => {
              this.pop = false
            }, 1500);
         }  
       })
    },
    nopas() {

    }
  },
  created () {
     this.pageNo = this.current
     this.gaiaList()
  },
  watch: {
    current(val) {
      this.pageNo = val
    }
  },
  components: {
  }
}
</script>
<style lang="less" >
.reply {
  width: 100%;
  border-bottom: 1px solid #F2F2F2;
  padding: 0 29px;
  box-sizing: border-box;
  .re-title {
    line-height: 40px;
    font-size: 16px;
    color: #333;
    font-weight: 500;
    p {
       max-width: 671px;
       overflow: hidden;
       white-space: nowrap;
       text-overflow: ellipsis;
    }
  }
  .re-bor {
    border-bottom: 1px solid #f2f2f2;
  }
  .re-new {
    width:50px;
    height:16px;
    background:rgba(254,102,3,1);
    opacity:0.5;
    font-size: 11px;
    color: #fff;
    position: relative;
    padding:  0 4px;
    .triangle {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0;
			height: 0;
			border-left: 5px solid transparent;
      border-bottom: 16px solid #fff;
    }
  }
  .all-text {
    cursor: pointer;
  }
  .re-list {
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    width: 671px;
    .list-img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
       position: relative;
      img {
        width: 100%;
      }
      .no-read {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: red;
        right: 0;
        top: 0;
      }
    }
    .list-text {
      font-size: 12px;
      color:#999;
      width: 550px;
      margin-left: 10px;
      .clor-3 {
        color:#333;
      } 
    }
    .list-btn {
      display: flex;
      flex-direction: column-reverse;
      width: 70px;
      .btn-list {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
        span {
          cursor: pointer;
        }
      }
    }
    
  }
  .re-area {
      width: 671px;
      height: 50px;
      border: 1px solid #999;
      border-radius: 5px;
      padding: 5px;
      box-sizing: border-box;
  }
  .re-push {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    font-size: 12px;
    cursor: pointer;
    // margin-bottom: 10px;
  }
  .info-pop {
    padding: 5px 10px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 50%;
    transform: translateY(-50%);
    background-color: #000;
    opacity: 0.5;
    color: #fff;
    font-size: 12px;
  }
  .page {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    .paging {
      margin-top: 20px;
     ul {
       li {
         font-size: 12px;
         margin-right: 6px;
         padding: 0 10px;
         height: 30px;
         line-height: 30px;
       }
       .put-jump {
         height: 30px;
         line-height: 30px;
         width: 30px;
       }
     }
    }
  }
}
</style>