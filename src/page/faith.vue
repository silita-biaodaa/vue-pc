<template>
<div class="faith">
  <div class="f-img"> 
     <img src="../assets/img/shuj.png" alt="">
  </div>
  <div class="f-size">
      数据正在建设中，更多资讯请下载APP！
  </div>
  <router-link :to="{path:'/download'}" tag="a" class="f-btn" target='_blank' >
      APP下载
  </router-link>
</div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.faith {
  width: 100%;
  height: calc(~"100% - 278px");
  background-color: #fff;
  .f-img {
    width: 277px;
    margin: 0 auto;
      img {
      margin-top: 50px;
      width: 277px;
      height: 300px;
    }
  }
  .f-size {
    margin-top: 10px;
    width: 1160px;
    margin: 0 auto;
    text-align: center;
    font-size: 16px;
    color:#333;
  }
  .f-btn {
    width: 140px;
    height: 40px;
    background-color: #FE6603;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    color:#fff;
    margin: 0 auto;
    margin-top: 50px;
    border-radius: 5px;
    display: block;
  }
  
}
</style>
