<template>
<div class="comment">
  <div class="comment-top">
    <p class="comment-title" >评论</p>
    <div @click="switchs"  v-if="!this.skip" >
        <div class="comment-about" v-show="about" >
            <div class="no-about" >

            </div>
            <div>
              与我相关
            </div>
        </div>
        <div class="comment-about" v-show="!about" >
            <img src="../../assets/img/icon-dui.png @2x.png" alt="">
            <div>
              与我相关
            </div>
        </div>
   
    </div>
    <div  v-if="this.skip" class="all-from"  @click.stop="rushR" >
      全部评论
    </div>
  </div>
   <textarea class="comment-text" placeholder="欢迎留言讨论~" style="resize:none" v-model="text" maxlength="300" ></textarea>
   <div class="comment-btn" >
     <div class="pu-btn" @click="publish" :class="{'have-val':textT}" >发布
     </div>
   </div>
   
   <div class="comment-list" v-for="(el,i) in comList" :key="i"  >
     <div class="list-title" >
       <div>
          <img :src="el.image  ? el.image : avatar " alt="">
          <div class="list-name" >
            <span style="color:#333" >{{el.nickName}}</span>
            <span v-show="el.company || el.post" >{{el.company ? '(' + el.company + ')' : '' }} {{el.post}}:</span>
          </div>
       </div>
       <p class="comment-time">{{el.pushd}}</p>
     </div>

      <template v-if="el.state == 3">
        <div class="list-content">该评论已被屏蔽</div>
      </template>
      <template v-else>
        <div class="list-content" v-html="el.commContent"></div>
      </template>
     <div class="list-time">
       <div class="p-color" style="cursor: pointer;"  @click="pushT(el)">回复</div>
     </div>
     <textarea class="comment-text list-area" placeholder="欢迎留言讨论~" style="resize:none" v-show="el.show" v-model="el.comment" maxlength="300" ></textarea>
     <div class="comment-btn" v-show="el.show" >
        <div class="pu-btn" @click="reply(el,i)" :class="{'have-val':el.comment !=''}"  >发送</div>
     </div>
        <div class="next-list" v-for="(ell,s) in el.replys" :key="s" v-show="el.state == 3 ? false : true" >
              <div class="list-title" >
                <div>
                  <img :src="ell.reImage ? ell.reImage : avatar" alt="">
                  <div class="list-name" >
                    <span>{{ell.reNikename}}{{ell.reCompany ? '(' + ell.reCompany + ')' : '' }} {{ell.rePost ? ell.rePost : ''}}  </span>
                    <span class="reply-hf">回复</span>
                    <span>{{ell.toNikename}}:</span>
                  </div>
                </div>
                
                <p class="comment-time">{{ell.pushd}}</p>
              </div>
              <template v-if="ell.state == 3">
                <div class="list-content">该评论已被屏蔽</div>
              </template>
              <template v-else>
                <div class="list-content" v-html="ell.replyContent"></div>
              </template>
              <div class="list-time">
                <div class="p-color" style="cursor: pointer;" @click="againP(ell,s)">回复</div>
              </div>
               <textarea class="comment-text list-area" placeholder="欢迎留言讨论~" style="resize:none" v-show="ell.textS" v-model="el.comment" maxlength="300" ></textarea>
               <div class="comment-btn" v-show="ell.textS" >
                  <div class="pu-btn" @click="reply(el,i)" :class="{'have-val':el.comment !=''}"  >发送
                  </div>
               </div>
      
        </div>      
   </div>       
   <div class="comm-more"  v-show="comList.length != 0 && !this.skip  " >
      <span @click="Mlist"  :class="this.comList.length == this.total ? 'no-more' : ''" >{{msgList}}</span>
   </div>
  <div class="com-pop"  v-show="isshow" >
    {{msg}}
  </div>
</div>
</template>
<script>
import { getJsonData,commentL,commentP,commentU,single } from '@/api/index'
export default {
  data () {
    return {
      switcher:true,
      about:true,  // 控制与我相关的
      text:'',
      diss:false,
      id:'',
      msg:'',
      isshow:false,
      current:1,
      comList:[],
      avatar: require('../../assets/img/icon-toux.png@2x.png'),
      source:'',
      s:null,
      total:0,
      pageSize:10,
      skip:false,
      commentId:'',
      msgList:'查看更多',
      textT:false,
      isClistFS:false,
    }
  },
  props: {
    type:''
  },
  filters:{
    Upper(val) {
       let arr = val.split(' ')
       let arr1 = arr[0].split('-')
       let str = arr1[0]
       if(str.length == 4 ) {
         return arr[0]
       } else {
         return val
       }
    },
  },
  methods: {
    switchs() {
      if(this.switcher) {
        this.switcher = false
        this.about = !this.about
        this.pageSize = 10
        setTimeout(() => {
           this.switcher = true
        }, 1000);
        if(!this.about) {
           commentU({relatedId:this.id,relatedType:this.type,pageNum:this.current,pageSize:this.pageSize,source:this.source}).then(res => {
                   if(res.code == 1 ) {
                  res.data.forEach( el => {
                     el.show = false,
                     el.comment = ''
                  });
                  this.comList = res.data
                  this.total = res.total
                  if(this.comList.length == res.total ) {
                     this.msgList = '没有更多了'
                  } else {
                     this.msgList = '查看更多'
                  }
                  // this.$emit('total', {state:res.total})
                }
          })
        } else {
          this.gaincomL()
        }
       
      }
    },
    publish() {
      if(this.isClistFS){
        return false
      }
      let content=this.text.replace(/\n/g,'<br/>');
      if(this.text.trim()) {
        this.isClistFS=true;
        commentP({content:content,relatedId:this.id,relatedType:this.type,source:this.source}).then(res => {
           if(res.code == 1 ) {
             this.isClistFS=false;
             this.msg = '提交成功'
             this.isshow = true
             this.text = ''
             this.pageSize = 10
                if(!this.about) {
                   commentU({relatedId:this.id,relatedType:this.type,pageNum:this.current,pageSize:this.pageSize,source:this.source}).then(res => {
                           if(res.code == 1 ) {
                            res.data.forEach( el => {
                               el.show = false,
                               el.comment = ''
                               if(el.replys) {
                                 el.replys.forEach(el => {
                                  el.textS = false
                                })
                               }
                           
                          });
                          this.comList = res.data
                          this.total = res.total
                           if(this.comList.length == res.total ) {
                               this.msgList = '没有更多了'
                            } else {
                               this.msgList = '查看更多'
                            }
                        }
                  })
                } else {
                  this.gaincomL()
                }
             setTimeout(() => {
               this.isshow = false
             }, 2000);
           } else {
              this.msg = res.msg
              this.isshow = true
              setTimeout(() => {
                this.isshow = false
              }, 2000);
           }
        })
      }
    },
    gaincomL() {
      if(this.skip) {
        single({commentId:this.commentId,source:this.source,relatedType:this.type,relatedId:this.id}).then(res => {
             if(res.code == 1 ) {
                res.data.show = false
                res.data.comment = ''
                res.data.commContent=res.data.commContent.replace(/\n/g,'<br/>');
                if(res.data.replys) {
                   res.data.replys.forEach(el => {
                    el.replyContent=el.replyContent.replace(/\n/g,'<br/>');
                    el.textS = false
                  })
                }
                this.comList.push(res.data)
                this.total = res.total
                if(this.comList.length == res.total ) {
                       this.msgList = '没有更多了'
                    } else {
                       this.msgList = '查看更多'
                    }
                // this.$emit('total', {state:res.total})
             }
         })
      } else {
        commentL({relatedId:this.id,relatedType:this.type,pageNum:this.current,pageSize:this.pageSize,source:this.source}).then(res => {
          if(res.code == 1 ) {

            res.data.forEach( el => {
              el.commContent=el.commContent.replace(/\n/g,'<br/>');
               el.show = false,
               el.comment = ''
               if(el.replys) {
                  el.replys.forEach(el => {
                    el.replyContent=el.replyContent.replace(/\n/g,'<br/>');
                    el.textS = false
                  })
               }
              
            });
            this.comList = res.data
            this.total = res.total
            if(this.comList.length == res.total ) {
                   this.msgList = '没有更多了'
                } else {
                   this.msgList = '查看更多'
                }
            // this.$emit('total', {state:res.total})
          }
         })
      }
      
    },
    pushT(o) {
      this.comList.forEach( el => {
          el.show = false,
          el.comment = '';
          if(o==el){
            o.show=true;
          }
          if(el.replys) {
             el.replys.forEach(el => {
              el.textS = false
            })
          }
         
       });
      // o.show = !o.show
      this.s = null
    },
    reply(el,i) {
      if(el.comment.trim()) {
        let content=el.comment.replace(/\n/g,'<br/>');
        this.pageSize = 10 
        if(this.s == null ) {

            commentP({content:content,relatedId:this.id,relatedType:this.type,toUid:el.userId,commentId:el.pkid,source:this.source}).then(res => {
                if(res.code == 1 ) {
                  this.msg = '提交成功'
                  this.isshow = true
                  this.text = ''
                    single({commentId:el.pkid,source:this.source,relatedType:this.type,relatedId:this.id}).then(res => {
                       if(res.code == 1 ) {
                         res.data.show = false
                         res.data.comment = ''
                         if(res.data.replys) {
                             res.data.replys.forEach(el => {
                              el.textS = false
                            })
                         }
                          
                         this.comList.splice(i,1,res.data)
                       }
                    })
                  setTimeout(() => {
                    this.isshow = false
                  }, 2000);
                } else {
                   this.msg = res.msg
                   this.isshow = true
                   setTimeout(() => {
                     this.isshow = false
                   }, 2000);
                }
            })
        } else {
            commentP({content:content,relatedId:this.id,relatedType:this.type,commentId:el.pkid,toUid:el.replys[this.s].replyUid,source:this.source}).then(res => {
                if(res.code == 1 ) {
                  this.msg = '提交成功'
                  this.isshow = true
                  this.text = ''
                  single({commentId:el.pkid,source:this.source,relatedType:this.type,relatedId:this.id}).then(res => {
                       if(res.code == 1 ) {
                         res.data.show = false
                         res.data.comment = ''
                         if(res.data.replys) {
                           res.data.replys.forEach(el => {
                            el.textS = false
                          })
                         }
                          
                         this.comList.splice(i,1,res.data)
                       }
                    })
                  setTimeout(() => {
                    this.isshow = false
                  }, 2000);
                } else {
                   this.msg = res.msg
                   this.isshow = true
                   setTimeout(() => {
                     this.isshow = false
                   }, 2000);
                }
            })
        }
       
      }
    },
    againP(ell,s) {
       this.comList.forEach( el => {
          el.show = false,
          el.comment = ''
          if(el.replys) {
            el.replys.forEach(el => {
              el.textS = false
            })
          }
          
       });
      ell.textS = true
      this.s = s
    },
    Mlist() {
      if(this.comList.length == this.total ) {
        return
      }
      this.msgList = '正在加载中~~~~'
      this.pageSize =  this.pageSize + 10 
         if(!this.about) {
           commentU({relatedId:this.id,relatedType:this.type,pageNum:this.current,pageSize:this.pageSize,source:this.source}).then(res => {
                   if(res.code == 1 ) {
                  res.data.forEach( el => {
                     el.show = false,
                     el.comment = ''
                     if(el.replys) {
                       el.replys.forEach(el => {
                            el.textS = false
                          })
                     }
                      
                  });
                  this.comList =res.data
                  if(this.comList.length == res.total ) {
                     this.msgList = '没有更多了'
                  } else {
                     this.msgList = '查看更多'
                  }
                }
          })
        } else {
           commentL({relatedId:this.id,relatedType:this.type,pageNum:this.current,pageSize:this.pageSize,source:this.source}).then(res => {
                if(res.code == 1 ) {
                  res.data.forEach( el => {
                     el.show = false,
                     el.comment = ''
                     if(el.replys) {
                       el.replys.forEach(el => {
                            el.textS = false
                          })
                     }
                      
                  });
                  this.comList =  res.data
                  if(this.comList.length == res.total ) {
                       this.msgList = '没有更多了'
                    } else {
                       this.msgList = '查看更多'
                    }
                }
            })
        }
    },
    rushR() {
      if(this.type == 'zhongbiao') {
        this.$router.push({path:'/notice',query:{source:this.source,id:this.id,ne:true}})
      } else {
        this.$router.push({path:'/article',query:{source:this.source,id:this.id,ne:true}})
      }
      
    }
  },
  watch: {
   $route: {
      handler: function(val, oldVal){
          this.skip = this.$route.query.skip ? this.$route.query.skip : false;
          this.gaincomL()
        },
        deep: true
      },
      text(val) {
        if(val.length==300){
          this.msg='最多只能输入300个字';
          this.isshow=true;
          setTimeout(() => {
            this.isshow = false
          }, 2000);
        }
        if(val.trim() == '') {
          this.textT = false
        } else {
          this.textT = true
        }
      }
  },
  created () {
    this.skip = this.$route.query.skip ? this.$route.query.skip : false;
    this.commentId = this.$route.query.commentId ? this.$route.query.commentId : '';
    this.id = this.$route.query.id
    this.source = this.$route.query.source
    this.gaincomL()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.comment {
  margin-top: 25px;
  margin-bottom: 200px;
  background-color: #fff;
  padding: 0 16px 5px;
  .comment-top {
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .all-from {
      width:64px;
      height:24px;
      border:1px solid rgba(254,102,3,1);
      border-radius:5px;
      font-size:12px;
      color:rgba(254,102,3,1);
      line-height:24px;
      text-align: center;
      cursor: pointer;
    }
    .comment-title {
      font-size: 18px;
      color:#333;
      border-left: 3px solid #FE6603;
      padding-left: 9px;
    }
    .comment-about {
      cursor: pointer;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      min-height: 18px;
      .no-about {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        border: 1px solid #999;
       
      }
      img {
         margin-right: 2px;
         width: 18px;
      }
    }
  }
  .comment-text {
    width: 100%;
    height: 100px;
    border: 1px solid #f2f2f2;
    padding: 5px;
    box-sizing: border-box;
  }
  .comment-btn {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 4px;
    margin-bottom: 30px;
    .pu-btn {
      cursor: pointer;
      width: 56px;
      height: 24px;
      background-color: #FE6603;
      opacity: 0.4;
      color: #fff;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
    }
    .pu-btn:hover {
      opacity: 1;
    }
  }
  .comment-list {
    padding-top: 30px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 20px;
  }
    .list-title {
      display: flex;
      // flex-direction: row;
      align-items: center;
      justify-content:space-between;
      div{
        display: flex;
        align-items: center;
      }
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
      .list-name {
        margin-left: 10px;
        font-size: 14px;
        color:#333;
        font-weight: bold;
        .reply-hf{
          color: #999;
          margin: 0 1em;
        }
      }
      .comment-time{
        font-size: 12px;
        color: #999;
      }
    }
    .list-content {
      margin-left:64px;
      margin-top: 4px;
      font-size: 14px;
      color: #333;
      // font-weight: bold;
    }
    .list-time {
      display: flex;
      align-items: center;
      justify-content:flex-end;
      font-size: 14px;
      margin-top: 16px;
    }
  .next-list {
    // background-color: #F8F8F8;
    padding: 10px 6px;
    padding-left: 64px;
    border-top: 1px solid #f2f2f2;
  }
  .list-area {
    margin-top: 20px;
  }
  .com-pop {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    background-color: #000;
    color: #fff;
    font-size: 14px;
    opacity: 0.7;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 10000;
  }
  .comm-more {
    width: 100%;
    height: 60px;
    font-size: 18px;
    text-align: center;
    line-height: 60px;
    color:#FE6603;
    span {
      cursor: pointer;
    }
  }
  .no-more {
    color:#999;
    cursor: default !important;
  }
  .have-val {
    opacity: 1!important;
  }

}
</style>