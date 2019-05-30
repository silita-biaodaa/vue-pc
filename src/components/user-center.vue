<template>
<div class="user-center" >
    <el-dropdown trigger="click"   >
                 <span class="el-dropdown-link">
                   <span class="user-name" >{{name}}<i class="user-info" v-show="ishow" ></i></span><i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                 </span>
                 <el-dropdown-menu slot="dropdown" style="z-index:2050" >
                   <el-dropdown-item @click.native="user()" >个人设置</el-dropdown-item>
                   <el-dropdown-item @click.native="toinf()" ><span class="user-name"  >我的消息<i class="user-info" v-show="ishow" ></i></span></el-dropdown-item>
                   <el-dropdown-item @click.native="tocol()" >我的关注</el-dropdown-item>
                   <el-dropdown-item @click.native="amend()" >修改密码</el-dropdown-item>
                   <el-dropdown-item @click.native="order()" >我的订单</el-dropdown-item>
                   <el-dropdown-item @click.native="quit()"  >退出登录</el-dropdown-item>
                 </el-dropdown-menu>
   </el-dropdown>
</div>
</template>
<script>
import { Cmessage } from "@/api/index";
export default {
  data () {
    return {
      name:'',
      ishow:false
    }
  },
  methods: {
    tocol() {
      this.$router.push('/user/fcoll')
    },
    amend() {
      this.$router.push('/user/root')
    },
    toinf() {
       this.$router.push('/user/info')
    },
    order() {
      this.$router.push('/user/order')
    },
    quit() {
        sessionStorage.removeItem('xtoken')
        localStorage.removeItem('Bname')
        localStorage.removeItem('Xtoken')
        localStorage.removeItem('valid')
        localStorage.removeItem('permissions')
          this.$router.replace({
           path: '/home',
           query: {
             t: Date.now()
           }
          })
    },
    user() {
      this.$router.push('/user')
    },
    gainCo() {
     if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
           Cmessage({}).then(res => {
            if(res.code == 1) {
              if(res.data >= 1) {
                this.ishow = true
              } else {
                this.ishow = false
              }
            } else {
              sessionStorage.removeItem('xtoken')
              localStorage.removeItem('Xtoken')
              localStorage.removeItem('permissions')
               this.$confirm('用户登录失效，请重新登录', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$router.push('/logo')
                }).catch(() => {
                  this.$router.replace({
                   path: '/home',
                   query: {
                     t: Date.now()
                   }
                  })
                });
            }
          })
     }
   
    }
  },
  watch: {
      $route: {
      handler: function(val, oldVal){
        this.gainCo()
      },
      deep: true
    }
  },
  created () {
    this.name = localStorage.getItem('Bname')
    this.gainCo()
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.user-center {
 .user-name {
   position: relative;
   .user-info {
      position: absolute;
      right: -6px;
      top: -2px;
      border: 1px solid red;
      border-radius: 50%;
      width: 5px;
      height: 5px;
      background-color: red;
   }
 }

}
</style>