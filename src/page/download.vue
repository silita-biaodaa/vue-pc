<template>
<div class="download">
<div class="d-top">
    <img src="../assets/img/logo2.png" alt="" @click="$router.push('/home')" style="cursor: pointer;">
    <!-- <img src="" alt=""> -->
    <div>APP下载</div>
</div>
<div class="d-c">
</div>
<div class="d-bto">
  © 2017 思利他, Inc. All rights reserved . 湘ICP备17019911号-1
</div>
</div>
</template>
<script>
export default {
  data ()  {
    return {

    }
  },
  methods: {
    gain() {
    }
  },
  created () {
    this.gain()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.download {
  width: 100%;
  background-color: #fafafa;
  .d-top {
    width: 1020px;
    margin: 0 auto;
    height: 50px;
    line-height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color:#666;
    img {
      margin-right: 30px;
    }
  }
  @media screen and (max-device-width:1920px){
      .d-c {
        width: 100%;
        background: url(../assets/img/1.jpg) no-repeat center;
        height: 550px;
        background-size: 100%;
        position: relative;
      }  
    }

    /*分辨率高于1440，采用下面的样式*/
  @media screen and (min-device-width: 1920px){
       .d-c {
        width: 100%;
        background: url(../assets/img/1.jpg) no-repeat ;
        background-position-x: 100%;
        height: 850px;
        background-size: 100%;
        position: relative;
      }  
       
  }
}
</style>
