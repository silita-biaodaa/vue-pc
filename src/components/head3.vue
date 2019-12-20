<!-- 模型： DOM 结构 -->
<template>
    <div class="heads">
        <div class="top-text" >
            <div class="top-left" >
            <div class="img-bor" :class="headTxt==''?'rightNone':''">
                <img src="../assets/img/pic-guanywm.png@2x.png" alt=""  @click="jumps" >
            </div>
                {{headTxt}}
            </div>
            <div class="top-left" >
            <div v-if="names" ><span @click="tologo" >登录</span>&nbsp;&nbsp;<span @click="toenroll" >注册</span></div> 
                <el-dropdown  v-else trigger="click"   >
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
        </div>
    </div>
</template>
<script>
import { Cmessage } from "@/api/index";
export default {
    name: 'heads', // 结构名称
    data() {
        return {
            // 数据模型
            names:true,
            name:'',
            ishow:false
        }
    },
    watch: {
        // 监控集合
        $route: {
        handler: function(val, oldVal){
          this.gainCo()
        },
        deep: true
      }
    },
    props: {
        // 集成父级参数
        headTxt:{
            default:''
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
            this.name = localStorage.getItem('Bname')
            this.names = false
        } else {     
            this.names = true
        }
        this.gainCo()
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        jumps() {
            this.$router.push('/')
        },
        order() {
            this.$router.push('/user/order')
        },
        tologo() {
            this.$router.push('/logo')
        },
        toenroll() {
            this.$router.push('/enroll')
        },
        user() {
            this.$router.push('/user')
        },
        tocol() {
            this.$router.push('/user/fcoll')
        },
        toinf() {
          this.$router.push('/user/info')
        },
        amend() {
            this.$router.push('/user/root')
        },
        quit() {
            sessionStorage.removeItem('xtoken')
            localStorage.removeItem('Bname')
            localStorage.removeItem('Xtoken')
            localStorage.removeItem('valid')
            localStorage.removeItem('0658544ac523fca9ec78a5f607fdd7ee')
            this.$router.replace({
                path: '/home',
            })
        },
         gainCo() {
          Cmessage({}).then(res => {
            if(res.code == 1) {
              if(res.data >= 1) {
                this.ishow = true
              } else {
                this.ishow = false
              }

            }
          })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import "../style/publicCSS";
.heads{
    // height: 40px;
    background-color: #FE6603;
    .el-dropdown-link{
      color: #fff;
    }
    .top-text {
        width: 1020px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        height: 40px;
        .top-left {
            cursor: pointer;
            height: 40px;
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 12px;
            .title {
                border-left: 1px solid @whiteColor;
            }
            .img-bor {
                cursor: pointer;
                height: 24px;
                border-right: 1px solid #fff;
                padding-right: 10px;
                margin-right: 10px;
            }
            .rightNone{
                border-right: none
            }
        }
    }
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
