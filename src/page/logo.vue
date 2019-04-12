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
            <template v-if="!isWx">
              <div class="e-title e-color">
                用户登录  
              </div>
              <div class="l-error" v-show="error" >
                提示：{{msg}}
              </div>
              <div class="e-ipt">
                <div class="e-i">
                  <i class="iconfont icon-ren111" ></i>
                </div>
                <el-input v-model="mobile"  placeholder="请输入您的手机号"  ></el-input>
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
                <div class="e-color e-cu"  @click="forget" >
                  忘记密码？
                </div>
              </div>
              <el-button class="e-btn" @click="register" >立即登录</el-button>
            </template>          
            <template v-else>
              <div class="e-title e-color">微信扫一扫登录</div>
              <div class="qrcode-box">
                <div id="qrcode" class="qrcode" ref="qr"></div>
              </div>
            </template>
            <div class="wechat">
              <!-- <img src="../assets/img/icon-qie.png@2x.png"  class="iqq" alt=""> -->
              <img src="../assets/img/icon-weixin.png@2x.png" alt=""  @click="towechat" >
            </div>
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
import QRCode from 'qrcodejs2'
let sha1 = require("sha1");
export default {
  data () {
    return {
      mobile:'',
      password:'',
      checked:false,
      error:false,
      msg:'请重新输入正确手机号码格式和密码',
      isWx:false
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
            localStorage.setItem('permissions',res.data.permissions)
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
            this.error = true
            this.msg = res.msg
         }
      })

      
    },
    jump() {
      this.$router.push('/enroll')
    },
    forget() {
       this.$router.push('/find')
    },
    towechat() {
      let appid='wxcfaea301018d9721';
      let url=encodeURIComponent('http://pre-new.biaodaa.com/#/home');
      let uri=this.weixinauth(appid,url);
      window.open(uri)
    },
    weixinauth (appid,url) {
      let str = 'https://open.weixin.qq.com/connect/qrconnect?appid='+appid+'&redirect_uri='+url+'&response_type=code&scope=snsapi_login&state=biaodaaPC#wechat_redirect'
      return str
    },
    efficacy() {
     if(this.$route.query.id == 1) {
       alert('用户信息失效，请重新登陆')
     } 
    }
  },
  created () {
    this.efficacy()
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
         .e-btn {
            width: 100%;
            background-color: #FE6603;
            color:#fff;
          }
          .wechat {
            margin-top: 9px;
            width: 100%;
            overflow: hidden;
            img {
              width: 24px;
              height: 20px;
              float: right;
            }
            .iqq {
              width: 18px;
              height: 21px;
              float: right;
              margin-left: 15px;
            }
          }
      }
      .e-cu {
        cursor: pointer;
      }
}
</style>