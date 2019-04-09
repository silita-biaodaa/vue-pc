<template>
<div class="logo">
  <logo-Nav></logo-Nav>
  <div class="logo-img">
    <div class="logo-center">
        <div class="logo-code" >
           <img src="../assets/img/logoerwei.png" alt="" class="code-img">
           <img src="../assets/img/logofont.png" alt="">
        </div>
        <div class="l-enter">
            <div class="e-title e-color">
              用户注册 
            </div>
             <div class="l-error" v-show="error" >
              提示：{{msg}}
            </div>
            <div class="e-ipt ">
              <div class="e-i">
                <i class="iconfont icon-ren111" ></i>
              </div>
              <el-input v-model="mobile"  placeholder="请输入您的手机号"  autocomplete="new-password" ></el-input>
            </div>
            <div class="e-ipt e-my">
              <div class="e-i">
                <i class="iconfont icon-mn_dunpai" ></i>
              </div>
              <el-input v-model="note"  placeholder="短信验证码"  autocomplete="new-password" ></el-input>
              <div class="e-code" @click="gainCode" :class="Message == '获取验证码' ? '' : (Message == '重新发送' ? '' : 'e-co')" > 
                {{Message}}
              </div>
            </div>
            <div class="e-ipt">
              <div class="e-i">
                <i class="iconfont icon-gongwenbao" ></i>
              </div>
              <el-input v-model="password" type="password"  autocomplete="new-password"  placeholder="请设置密码(不低于8位)"></el-input>
            </div>
            
            <div class="e-forget">
              <div>
                 <el-checkbox v-model="checked">我已经仔细阅读并接受<span class="e-color" @click="junm" >《标大大用户协议》</span></el-checkbox>
              </div>
            </div>
            <el-button class="e-btn" @click="register" >立即注册</el-button>
            <div class="e-enroll">
                已有帐号，<span class="e-color" @click="jump" >返回登录</span> 
            </div>
        </div>
    </div>
    
  </div>
  <div class="d-bto">
     © 2017 思利他, Inc. All rights reserved . 湘ICP备17019911号-1
  </div>
</div>
</template>
<script>
import { getVerifyCode,memberRegister } from '@/api/index'
let sha1 = require("sha1");
export default {
  data () {
    return {
      mobile:'',
      password:'',
      checked:true,
      note:'',
      Message:'获取验证码',
      error:false,
      erpass:false,
      pass: true,
      msg:'请重新输入正确手机号码格式和密码,短信验证码'
    }
  },
  methods: {
    register() {
      this.pass = true
      if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.mobile.trim()))) {
         this.pass = false
         return this.error = true
      }
       if(this.note.trim() == '') {
         this.pass = false
         return this.error = true
      }
       if( this.password.trim() == '' || !(/[0-9A-Za-z]{8,16}$/.test(this.password)))  {
   
         this.pass = false
         this.msg = '请输入8-16位包含字母或数字的密码'
         return this.error = true
      }
      if(this.checked && this.pass ) {
         memberRegister({verifyCode:this.note.trim(),phoneNo:this.mobile.trim(),channel:'1003',clientVersion:'3.0',loginPwd:sha1(this.password.trim())}).then( res => {
          if(res.code == 1) {
           this.msg = '注册成功'
            let token = res.data.xtoken
            let name = res.data.nikeName
            localStorage.setItem('Bname',name)
            localStorage.setItem('Authorization',token)
            this.$router.push('/home')
          } else {
              this.error = true
              this.msg = res.msg
          }
        })
      } else {
        if(!this.checked) {
            this.error = true
            this.msg = '请查阅并同意用户协议'
        }  
      }
     

    },
    gainCode() {
      if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.mobile.trim()))) {
         this.error = true
         return this.msg = '请输入正确的手机号码'
      }
      if(!(this.Message  == '获取验证码') && !(this.Message  == '重新发送')  ) {
        return
      } else {
        
        getVerifyCode({type:1,invitationPhone:this.mobile.trim()}).then( res => {
          console.log(res)
          if(res.code == 1) {
            
          } else {
              this.error = true
              this.msg = res.msg
          }
           this.Message = 60
            var myVar = setInterval(() =>{
            if(this.Message == 0) {
              this.Message = '重新发送'
              return clearInterval(myVar);
            } else {
              this.Message =  this.Message - 1
            }
          },1000 )
        })
      
      } 


    },
    jump() {
      this.$router.push('/logo')
    },
    junm() {
        const { href } = this.$router.resolve({
          path:'/protocol'
        })
        window.open(href, '_blank', )
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.logo {
  overflow: hidden;
  width: 100%;
  background-color: #fff; 
 .e-enroll {
   margin-top: 25px;
  
  }
   .l-enter {
        width: 350px;
        height: 378px;
        background-color: #fff;
        padding: 18px 25px 0;
        box-sizing: border-box;
        .e-color {
          color:#FE6603;
        }
        .e-title {
          font-size: 18px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 25px;
        }
        .e-ipt {
          height: 42px;
          box-sizing: border-box;
          width: 100%;
          border: 1px solid #CFCFCF;
          display: flex;
          align-items: center;
          margin-bottom: 11px;
          .e-i {
            width: 42px;
            height: 100%;
            background-color: #EDEDED;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 8px;
            overflow: hidden;
            .iconfont {
              font-size: 24px;
            }
          }
          .e-code {
             width: 35%;
             height: 30px;
             line-height: 30px;
             text-align: center;
             font-size: 14px;
             color:#FE6603;
             border-left: 1px solid #CFCFCF;
             cursor: pointer;
          }
          .e-co {
            color:#999;
          }
        }
        .e-forget {
          font-size: 14px;
          color:#999;
          padding-top: 10px;
          margin-bottom: 8px;
        }
         .e-btn {
            width: 100%;
            background-color: #FE6603;
            color:#fff;
          }
      }
}
</style>