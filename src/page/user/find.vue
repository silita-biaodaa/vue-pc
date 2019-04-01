<template>
<div class="logo find">
   <logo-Nav></logo-Nav>
      <div class="l-enter">
            <div class="e-title e-color">
              找回密码
            </div>
             <div class="l-error" v-show="error" >
              提示：请重新输入正确手机号码格式和密码,短信验证码
            </div>
            <div class="l-error" v-show="erro" >
              提示：请确保两次密码
            </div>
            <div class="e-ipt ">
              <el-input v-model="mobile"  placeholder="请输入您的手机号"></el-input>
            </div>
            <div class="e-ipt l-find">
              <el-input v-model="note"  placeholder="短信验证码"></el-input>
              <div class="e-code" @click="gainCode" :class="Message == '获取验证码' ? '' : (Message == '重新发送' ? '' : 'e-co')" > 
                {{Message}}
              </div>
            </div>
            <div class="e-ipt">
              <el-input v-model="password" type="password" placeholder="请输入新密码"></el-input>
            </div>
            <div class="e-ipt">
              <el-input v-model="password1" type="password" placeholder="确认密码"></el-input>
            </div>
            <el-button class="e-btn" @click="register" >确定</el-button>

            <div class="e-color e-mb" @click="jump" >
              返回登陆
            </div>
        </div>
</div>
</template>
<script>
import { getVerifyCode,updatePwd } from '@/api/index'
export default {
  data () {
    return {
      Message:'获取验证码',
      error:false,
      erro:false,
      mobile:'',
      note:'',
      password:'',
      password1:''
    }
  },
  methods: {
    jump() {
      this.$router.push('/logo')
    },
    register() {
      if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.mobile.trim()))) {
         return this.error = true
      }
      if(this.note.trim() == '') {
         return this.error = true
      } 
      if(this.password.trim() == '' || this.password1.trim() =='') {
         return this.error = true
      }else if(this.password.trim() !== this.password1.trim()) {
        this.error = false
        return this.erro = true
      }
      updatePwd({loginPwd:this.password1.trim(),verifyCode:this.note.trim(),phoneNo:this.mobile.trim(),channel:'1003'}).then( res => {
        console.log(res)
        if(res.code == 1) {
          
        }
      })
    },
      gainCode() {
      if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.mobile.trim()))) {
         return this.$notify({
          title: '提醒',
          message: '请输入正确的手机号码',
          offset: 100   
         });
      }
      if(!(this.Message  == '获取验证码') && !(this.Message  == '重新发送')  ) {
        return
      } else {
        
        getVerifyCode({type:2,invitationPhone:this.mobile.trim()}).then( res => {
          console.log(res)
          if(res.code == 1) {
            
          } else {
             this.$notify({
               title: '提醒',
               message: res.msg,
               offset: 100   
              });
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
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.find {
  background-color: #FAFAFA;
    .l-enter {
        width: 350px;
        height: 436px;
        margin: 78px auto  200px;
        background-color: #fff;
        padding: 18px 25px 0;
        box-sizing: border-box;
        .e-color {
          color:#FE6603;
        }
        .e-mb {
          margin-top: 25px;
          font-size: 14px;
          cursor: pointer;
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
          margin-bottom: 18px;
          .e-code {
             width: 40%;
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
      }
}
</style>