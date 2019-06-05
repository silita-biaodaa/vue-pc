<template>
<div class="root">
   <div class="det-nav">
     修改密码
  </div>
  <div class="det-put">
    <div>
      <div class="put-l ">
        <div class="put-w m-r">手机号码:</div><el-input  v-model="iphone" placeholder="请输入您的手机号码" ></el-input>
      </div>
      <div class="put-t" >
        <span   v-show="erip">
          请输入正确的手机格式
        </span>
       </div>
      <div class="put-l ">
        <div class="m-r put-w">短信验证:</div><el-input  v-model="note" placeholder="请输入短信验证码"   ></el-input>
        <button class="put-code" @click="gainCode" :class=" this.msg=='获取验证码' ? 'p-color' : '' " >
          {{msg}}
        </button>
      </div>
        <div class="put-t" >
          <span v-show="erno"   >
            请输入短信验证码
          </span>
        </div>
      <div class="put-l ">
        <div class=" put-w m-r">新密码:</div><el-input  type="password" name="password"  autocomplete="new-password"  v-model="newpass" placeholder="请输入新密码(不低于8位)" ></el-input>
      </div>
      <div class="put-t" >
        <span v-show="erpass">
          请输入正确的密码格式(不低于8位数)
        </span></div>
      <div class="put-l ">
        <div class=" put-w m-r">确认密码:</div><el-input  type="password" name="password"  autocomplete="new-password" v-model="chancepass" placeholder="请再次输入密码" ></el-input>
      </div>
      <div class="put-t" >
        <span v-show="ertwo" >
          请确保两次密码输入一致
        </span></div>
      <div class="put-l m-t">
        <div class="put-w m-r"></div>
        <div class="put-btn" @click="transfer"  >
          确定
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { getVerifyCode,updatePwd } from '@/api/index'
let sha1 = require("sha1");
export default {
  data () {
    return {
      iphone:'',
      newpass:'',
      chancepass:'',
      note:'',
      erip:false,
      erno:false,
      erpass:false,
      ertwo:false,
      msg:'获取验证码'
    }
  },
  methods: {
    gainCode() {
       if(!(/^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\d{8}$/.test(this.iphone))) {
         return this.erip = true
       }
       if(!(this.msg  == '获取验证码') && !(this.msg  == '重新发送')  ) {
        return
      } else {
        getVerifyCode({type:2,invitationPhone:this.iphone}).then( res => {
          if(res.code == 1) {
            
          } else {
             this.$notify({
              title: '提示',
              message: res.msg,
              offset: 100   
            });
          }
           this.msg = 60
            var myVar = setInterval(() =>{
            if(this.msg == 0) {
              this.msg = '重新发送'
              return clearInterval(myVar);
            } else {
              this.msg =  this.msg - 1
            }
          },1000 )
        })
      
      } 
    },
    transfer() {
       if(!(/^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\d{8}$/.test(this.iphone))) {
         return this.erip = true
       }
       if(this.note.trim() =='') {
         this.erpass = false
         this.ertwo = false
         this.erno = true
         this.erip = false
         return 
       }
       if(this.newpass.trim() =='' || !(/[0-9A-Za-z]{8,16}$/.test(this.newpass))) {
         this.erpass = true
         this.ertwo = false
         this.erno = false
         this.erip = false
         return 
       }
       if(this.newpass !== this.chancepass ) {
         this.erpass = false
         this.ertwo = true
         this.erno = false
         this.erip = false
         return 
       }
       updatePwd({loginPwd:sha1(this.chancepass),verifyCode:this.note,phoneNo:this.iphone,channel:'1003'}).then( res => {
          if(res.code == 1) {
              this.$notify({
              title: '提示',
              message: res.msg,
              offset: 100   
            });
             this.iphone=''
             this.newpass=''
             this.chancepass=''
             this.note=''
          } else {
             this.$notify({
              title: '提示',
              message: res.msg,
              offset: 100   
            });
          } 
       })
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.root {
   background-color: #fff;
   width: 100%;
   padding-bottom: 120px;
   .det-nav {
    line-height: 54px;
    padding-left: 29px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #F2F2F2;
    box-sizing: border-box;
  }
    .det-put {
    display: flex;
    align-items: center;
    flex-direction:column;
    font-size: 14px;
    color: #666;
    padding-top: 50px;
    .put-l{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 350px;
     
      position: relative;
      .put-code { 
        position: absolute;
        height: 30px;
        line-height: 30px;
        right: 1px;
        text-align: center;
        width: 30%;
        border-left: 1px solid #CFCFCF;
        background-color: #fff;
        cursor: pointer;
        color:#666;
      }
      .p-color {
        color: #FE6603;
      }
      .m-r {
        margin-right: 10px;
      }
      .put-w  {
        width: 80px;
      }
      .text {
        width: 100%;
      }
      .put-btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #FE6603;
        font-size: 14px;
        font-weight: 500;
        color:#fff;
        cursor: pointer;
      }
     
    }
    .put-t {
      font-size: 14px;
      color:red;
      height: 24px;
      line-height: 24px;
       margin-bottom: 2px;
    }
    .m-t {
      margin-top: 40px;
    }
  }
}
</style>
