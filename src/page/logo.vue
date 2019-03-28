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
              用户登录  
            </div>
            <div class="l-error" v-show="error" >
              提示：请重新输入正确手机号码格式和密码
            </div>
            <div class="e-ipt">
              <div class="e-i">
                <i class="iconfont icon-ren111" ></i>
              </div>
              <el-input v-model="mobile"  placeholder="请输入您的手机号"></el-input>
            </div>
            <div class="e-ipt">
              <div class="e-i">
                <i class="iconfont icon-gongwenbao" ></i>
              </div>
              <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
            </div>
            <div class="e-forget">
              <div>
                 <el-checkbox v-model="checked">15天免登录</el-checkbox>
              </div>
              <div class="e-color">
                忘记密码？
              </div>
            </div>
            <el-button class="e-btn" @click="register" >立即登录</el-button>
            <div class="e-enroll">
                没有账号，<span class="e-color" @click="jump">马上注册</span> 
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
import { authorize } from '@/api/index'
let sha1 = require("sha1");
export default {
  data () {
    return {
      mobile:'',
      password:'',
      checked:false,
      error:false
    }
  },
  methods: {
    register() {
      if(!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(this.mobile.trim()))) {
         return this.error = true
      }
       if(this.password.trim() == '') {
         return this.error = true
      }
      authorize({phoneNo:this.mobile.trim(),loginPwd:sha1(this.password.trim()),channel:'1003',clientVersion:'3.0'}).then(res => {
         if(res.code == 1) {
            let token = res.data.xtoken
            let name = res.data.nikeName
            localStorage.setItem('Bname',name)
            if(this.checked) {
              localStorage.setItem('Authorization',token)
              sessionStorage.removeItem('xtoken')
            } else {
              sessionStorage.setItem('xtoken',token)
              localStorage.removeItem('Authorization')
            }
            this.$router.push('/home')
         } else {
           this.$notify({
            title: '提醒',
            message: res.msg,
            offset: 100   
          });
         }
      })

      
    },
    jump() {
      this.$router.push('/enroll')
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
          margin-bottom: 17px;
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
          
        }
        .e-forget {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color:#999;
          padding-top: 10px;
          margin-bottom: 8px;
        }
      }
}
</style>