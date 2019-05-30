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
     <div class="pu-btn" @click="publish" >发布
     </div>
   </div>
   
   <div class="comment-list" v-for="(el,i) in comList" :key="i"  >
     <div class="list-title" >
       <img :src="el.image != null ? el.image : avatar" alt="">
       <div class="list-name" >
         <p style="color:#333" >{{el.nickName}}</p>
         <p v-show="el.ccompany || el.post" >{{el.company ? '(' + el.company + ')' : '' }} {{el.post}}：</p>
       </div>
     </div>

    <div class="list-content">{{el.commContent}}
      </div>
     <div class="list-time">
       <p>{{el.pushd | Upper  }}</p>
       <div class="p-color" style="cursor: pointer;"  @click="pushT(el)">
         回复
       </div>
     </div>
         <div class="next-list" v-for="(ell,s) in el.replys" :key="s"  >
              <div class="list-title" >
                <img :src="ell.reImage ? ell.reImage : avatar" alt="">
                <div class="list-name" >
                  <p style="color:#333" >{{ell.reNikename}}</p>
                  <p>{{ell.reCompany ? '(' + ell.reCompany + ')' : '' }} {{ell.rePost ? ell.rePost : ''}}回复了：{{ell.toNikename}}</p>
                </div>
              </div>
              <div class="list-content">{{ell.replyContent}}
              </div>
              <div class="list-time">
                <p>{{ell.pushd | Upper }}</p>
                <div class="p-color" style="cursor: pointer;" @click="againP(el,s)"   >
                  回复
                </div>
              </div>
          </div>
       <textarea class="comment-text list-area" placeholder="欢迎留言讨论~" style="resize:none" v-show="el.show" v-model="el.comment" maxlength="300" ></textarea>
       <div class="comment-btn" v-show="el.show" >
        <div class="pu-btn" @click="reply(el,i)"  >发布
       </div>
   </div>      
   </div>       
   <div class="comm-more"  v-show="comList.length != 0  " >
      <span @click="Mlist"  :class="this.comList.length == this.total ? 'no-more' : ''" >查看更多</span>
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
      skip:false
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
                  this.$emit('total', {state:res.total})
                }
          })
        } else {
          this.gaincomL()
        }
       
      }
    },
    publish() {
      if(this.text.trim()) {
        commentP({content:this.text.trim(),relatedId:this.id,relatedType:this.type,source:this.source}).then(res => {
           if(res.code == 1 ) {
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
                          });
                          this.comList = res.data
                          this.total = res.total
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
          commentU({relatedId:this.id,relatedType:this.type,pageNum:this.current,pageSize:this.pageSize,source:this.source}).then(res => {
                   if(res.code == 1 ) {
                  res.data.forEach( el => {
                     el.show = false,
                     el.comment = ''
                  });
                  this.comList = res.data
                  this.total = res.total
                  this.$emit('total', {state:res.total})
                }
          })
      } else {
          commentL({relatedId:this.id,relatedType:this.type,pageNum:this.current,pageSize:this.pageSize,source:this.source}).then(res => {
          if(res.code == 1 ) {
            res.data.forEach( el => {
               el.show = false,
               el.comment = ''
            });
            this.comList = res.data
            this.total = res.total
            this.$emit('total', {state:res.total})
          }
         })
      }
      
    },
    pushT(el) {
      // 回复主评论
      el.show = true
      el.comment = ''
      this.s = null
    },
    reply(el,i) {
      if(el.comment.trim()) {
        this.pageSize = 10 
        if(this.s == null ) {

            commentP({content:el.comment,relatedId:this.id,relatedType:this.type,toUid:el.userId,commentId:el.pkid,source:this.source}).then(res => {
                if(res.code == 1 ) {
                  this.msg = '提交成功'
                  this.isshow = true
                  this.text = ''
                    single({commentId:el.pkid,source:this.source,relatedType:this.type,relatedId:this.id}).then(res => {
                       if(res.code == 1 ) {
                         res.data.show = false
                         res.data.comment = ''
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
            commentP({content:el.comment,relatedId:this.id,relatedType:this.type,commentId:el.pkid,toUid:el.replys[this.s].replyUid,source:this.source}).then(res => {
                if(res.code == 1 ) {
                  this.msg = '提交成功'
                  this.isshow = true
                  this.text = ''
                  single({commentId:el.pkid,source:this.source,relatedType:this.type,relatedId:this.id}).then(res => {
                       if(res.code == 1 ) {
                         res.data.show = false
                         res.data.comment = ''
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
    againP(el,s) {
      el.show = true
      el.comment = ''
      this.s = s
    },
    Mlist() {
      if(this.comList.length == this.total ) {
        return
      }
      this.pageSize =  this.pageSize + 10 
         if(!this.about) {
           commentU({relatedId:this.id,relatedType:this.type,pageNum:this.current,pageSize:this.pageSize,source:this.source}).then(res => {
                   if(res.code == 1 ) {
                  res.data.forEach( el => {
                     el.show = false,
                     el.comment = ''
                  });
                  this.comList =res.data
                }
          })
        } else {
           commentL({relatedId:this.id,relatedType:this.type,pageNum:this.current,pageSize:this.pageSize,source:this.source}).then(res => {
                if(res.code == 1 ) {
                  res.data.forEach( el => {
                     el.show = false,
                     el.comment = ''
                  });
                  this.comList =  res.data
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
      }
  },
  created () {
    this.skip = this.$route.query.skip ? this.$route.query.skip : false;
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
    margin-top: 30px;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 20px;
  }
   .list-title {
      height: 58px;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        height: 58px;
        width: 58px;
        border-radius: 50%;
      }
      .list-name {
        margin-left: 10px;
        font-size: 16px;
        color:#999;
      }
    }
    .list-content {
      margin-top: 12px;
      font-size: 16px;
    }
    .list-time {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      margin-top: 10px;
      color: #999;
    }
  .next-list {
    margin-top: 10px;
    background-color: #F8F8F8;
    margin-left: 50px;
    padding: 10px 6px;
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
  }

}
</style>