<template>
<div class="reply"  >
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
              <div style="padding:10px 0" >
                   <div class="re-list"  >
                      <div class="list-cli" >
                        <div  class="list-true"  v-show="!el.textShow" >
                        </div>
                        <img  src="../../assets/img/icon-dui.png @2x.png" alt="" v-show="el.textShow" >
                      </div>
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
      msg:'',
      pop:false,
      textList:[],
      total:0,
      pageSize:10,
      ishow:false,
      noList:false,
      allArr:[],
      allChe:true,
      avatar: require('../../assets/img/icon-toux.png@2x.png'),
    }
  },

  methods: {
    jumA(el) {
        el.textShow = !el.textShow
        if(el.textShow) {
           this.allArr.push(el.pkid)
        } else {
          if(this.allArr.indexOf(el.pkid) != -1 ) {
            this.allArr.splice(this.allArr.indexOf(el.pkid),1)
          }
        }
    },
    Goto(val) {
      this.pageNo = val.cur
      this.allArr = []  
      this.allChe = true
      this.$emit('invert', {state:'全选'})
      this.gaiaList()
      this.$emit('page', {state:val.cur})
    },
    gaiaList() {
      message({pageNum:this.pageNo,pageSize:10}).then(res => {
         if(res.code == 1) {
           res.data.forEach(el => {
             el.textShow = false
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
    nopas() {

    }
  },
  created () {
     this.pageNo = this.current
     this.gaiaList()
  },
  props: {
    current:0,
    alles: {
     type: Number,
     default: 1,
    },
     allre: {
     type: Number,
     default: 1,
    },
     allde: {
     type: Number,
     default: 1,
    }
  },
  watch: {
    allde(val) {
        if(this.allArr.length == 0 ) {
          return
        }  else {
           let str = this.allArr.join(',')
           Dmessage({ids:str}).then(res => {
              if(res.code == 1) {
                this.msg = '删除成功'
                this.pop = true
                this.allArr = []
                this.gaiaList()
                setTimeout(() => {
                  this.pop = false
                }, 1500);
              }    
            })
        }
    },
    allre(val) {
      if(this.allArr.length == 0 ) {
        return
      }  else {
        let str = this.allArr.join(',')
          Rmessage({pkid:str}).then(res => {
            if(res.code == 1 ) {
               this.msg = '设置成功'
                this.pop = true
                this.textList.forEach(el => {
                  el.isRead = 1
                })
                // this.$router.replace({
                //    path: '/user/info',
                //    query: {
                //      t: Date.now()
                //    }
                //   })
                setTimeout(() => {
                  this.pop = false
                }, 1500);
            }
         })
      }
    },
    current(val) {
      this.pageNo = val
    },
    alles(val) {
      if(val == 1 ) {
        return 
      } else {
        if(this.allChe) {
            this.allArr = []
            this.textList.forEach(el => {
              el.textShow = true
              if( this.allArr.indexOf(el.pkid) == -1 ) {
                this.allArr.push(el.pkid)
              }          
            })
            this.$emit('invert', {state:'反选'})
            this.allChe = false
        } else {
            this.allChe = true
            this.allArr = []
            this.textList.forEach(el => {
              el.textShow = false                     
            })
            this.$emit('invert', {state:'全选'})
        }
        
      }
      
    }
  },
  components: {
  }
}
</script>
<style lang="less" >
.reply {
  .list-cli  {
    margin-right: 20px;
      .list-true {
      width: 15px;
      height: 15px;
      border: 1px solid #999;
      border-radius: 50%;
    }
    img {
      width: 17px;
      height: 17px;
    }
  }
  
}
</style>