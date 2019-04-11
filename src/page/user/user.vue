<template>
<div class="user">
  <div class="user-nav">
     <div class="in-nav">
       <img src="../../assets/img/logo2.png" alt="" @click="jump">
       <el-dropdown >
         <span class="el-dropdown-link">
           用户中心<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
         </span>
         <el-dropdown-menu slot="dropdown" trigger="click" >
           <el-dropdown-item>个人设置</el-dropdown-item>
           <el-dropdown-item @click.native="amend()" >修改密码</el-dropdown-item>
           <el-dropdown-item @click.native="quit()"  >退出登录</el-dropdown-item>
         </el-dropdown-menu>
        </el-dropdown>
     </div>
  </div>
   <div class="user-text">
      <div class="text-nav">
         <div class='user-news'>
            <img src="../../assets/img/pic-toux.png@2x.png" alt="">
            <div class="user-first">
              <div class="user-name left">
               {{userData.nikeName}}
              </div>
              <div class="user-state left">{{state}}
              </div>
            </div>
            <div class="user-day">
              剩余天数: <span class="p-color" >{{day}}</span>天
            </div>
            <div class="user-btn" @click="jumpapp" >会员续费
            </div>
         </div>
         <div class="user-tab" >
           <div class="tab" v-for="(el,i) in tab" :key="i" :class="el.i ? 'current' : '' " @click='jumpto(el)' >
             {{el.name}}
              <div class="nav-rim" v-show="el.i" >
                <div class="triangle">
                
                </div>
              </div>
           </div>
         </div>
      </div>
      <div class="text-right">
        <p-Det v-if="this.name == '个人信息'"></p-Det>
        <p-root v-else-if="this.name == '修改密码'" ></p-root>
        <f-coll v-else-if="this.name == '我的关注'"  ></f-coll>
      </div>
   </div>
</div>
</template>
<script>
import { getUserTemp } from '@/api/index'
export default {
  data () {
    return {
      tab: [
        {
          name:'个人信息',
          i: true
        },
        {
          name:'我的关注',
          i:false
        }
        ,{
          name:'修改密码',
          i:false
        }
        ,{
          name:'退出登录',
          i:false
        }
      ],
      name:'个人信息',
      userData:{},
      day:0,
      state:''
    }
  },
  methods: {
     jump() {
      this.$router.push('/')
    },
    getUser() {
      getUserTemp({}).then(res => {
       if(res.code ==1 ) {
         this.userData = res.data
         let gap = new Date(this.userData.expiredDate).getTime() - new Date().getTime()
         this.day = Math.ceil(gap/3600/24/1000) >= 0 ? Math.ceil(gap/3600/24/1000) : 0;
          if(this.userData.roleName == '会员用户') {
            this.state = '会员'
          } else {
            this.state = '非会员'
          }
         
       }
      })
    },
    jumpto(el) {
     if(el.name == '退出登录') {
        sessionStorage.removeItem('xtoken')
        localStorage.removeItem('Bname')
        localStorage.removeItem('Authorization')
         localStorage.removeItem('permissions')
        this.$router.push('/home')
      } else {
        this.name = el.name
        this.tab.forEach( li => {
           li.i = false 
        })
        el.i = true
      }
    },
    jumpapp() {
       this.$router.push('/download')
    },
    amend() {
      this.$router.push('/find')
    },
    quit() {
        sessionStorage.removeItem('xtoken')
        localStorage.removeItem('Bname')
        localStorage.removeItem('Authorization')
         localStorage.removeItem('permissions')
        this.$router.push('/home')
    }
  },
  created () {
    this.getUser()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.user {
 width: 100%;
 background-color: #fafafa;
 .user-nav {
   width: 100%;
   height: 60px;
   margin-bottom: 16px;
   background-color: #fff;
   .in-nav {
     width: 1020px;
     margin: 0 auto;
     height: 100%;
     display: flex;
     align-items: center;
     justify-content: space-between;
   }
 }
 .user-text {
   width: 1020px;
   margin: 0 auto;
   display: flex;
   justify-content: space-between;
   box-sizing: border-box;
   .text-nav {
     .user-news {
       width: 262px;
       height:  300px;
       background-color: #fff;
       display: flex;
       align-items: center;
       flex-direction:column;
       margin-bottom: 16px;
       padding-top: 21px;
         img {
          width: 67px;
          height: 67px;
         }
     }
     .user-first {
       margin-top: 16px;
       margin-bottom: 14px;
     }
     .user-name {
       max-width: 180px;
       font-size: 18px;
       font-weight: 500;
       margin-right: 14px;
       text-align: center;
       text-overflow: ellipsis;
       overflow: hidden;
       white-space: nowrap;
     }
     .user-state {
       padding: 0 10px;
       line-height: 20px;
       background-color: #E4FFF0;
       font-size: 10px;
       color: #53E493;
     }
     .user-day {
       width: 100%;
       font-size: 12px;
       color:#999;
       padding-left: 50px;
       box-sizing: border-box;
       margin-bottom: 60px;
     }
     .user-btn {
       width: 106px;
       height: 37px;
       border: 1px solid #FE6603;
       border-radius: 8px;
       text-align: center;
       line-height: 37px;
       font-size: 16px;
       color:#FE6603; 
       font-weight: 550;
       cursor: pointer;
     }
     .user-tab {
       width: 262px;
       font-size: 14px;
       margin-bottom: 150px;
       .tab {
        width: 262px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-weight: 550;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        .nav-rim {
          position: absolute;
          width: 10px;
          height: 54px;
          right: -10px;
          top: 0;
          background-color: #FE6603;
          .triangle {
            width: 0;
            height: 0;
            border-top: 6px solid #FE6603;
            border-right: 10px solid transparent;
            position: absolute;
            right: 0;
            bottom: -6px;
          }
        }
       }
        .current {
          background-color: #FE6603;
          color:#fff;
        }
     }
   }
   .text-right {
     width: 100%;
     margin-left: 29px;
     margin-bottom: 150px;
   }
 }
}
</style>