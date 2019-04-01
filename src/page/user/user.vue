<template>
<div class="user">
  <div class="user-nav">
     <div class="in-nav">
       <img src="../../assets/img/logo2.png" alt="" @click="jump">
       <el-dropdown>
         <span class="el-dropdown-link">
           用户中心<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
         </span>
         <el-dropdown-menu slot="dropdown">
           <el-dropdown-item>个人设置</el-dropdown-item>
           <el-dropdown-item>我得关注</el-dropdown-item>
           <el-dropdown-item>修改密码</el-dropdown-item>
           <el-dropdown-item>退出登录</el-dropdown-item>
         </el-dropdown-menu>
        </el-dropdown>
     </div>
  </div>
   <div class="user-text">
      <div class="text-nav">
         <div class='user-news'>

         </div>
      </div>
   </div>
</div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
     jump() {
      this.$router.push('/')
    }
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
   .text-nav {
     .user-news {
       width: 262px;
       height:  300px;
       background-color: #fff;
       display: flex;
       align-items: center;
       flex-direction:column;
       margin-bottom: 16px;
     }
   }
 }
}
</style>