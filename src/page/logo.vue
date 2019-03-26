<template>
<div class="logo">
  <div @click="text">
    密码登录
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
    text() {

    },
    // setCookie(c_name, c_pwd, exdays) {
    //   var exdate = new Date();
    //   exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    //   window.document.cookie = "userName" + "=" + c_name + ";expires=" + exdate.toGMTString();
    //   window.document.cookie = "userPwd" + "=" + c_pwd + ";expires=" + exdate.toGMTString();
    // }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.logo {
  width: 100%;
  padding: 100px; 
}
</style>