<template>
<div class="download">
<div class="d-top">
    <img src="../assets/img/logo2.png" alt="">
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
      console.log(window.screen.deviceXDPI)
      console.log(document.body.clientHeight)
      console.log(window)
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
        background: url(../assets/img/do1.png) no-repeat center;
        height: 550px;
        background-size: auto;
        position: relative;
        
      }  
    }

    /*分辨率高于1440，采用下面的样式*/
  @media screen and (min-device-width: 1920px){
       .d-c {
        width: 100%;
        background: url(../assets/img/do1.png) no-repeat ;
        background-position-x: center;
        height: 700px;
        background-size: auto;
        position: relative;
      }  
       
  }

  .d-bto {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color:#999;
    margin-top: 15px;
  }
}
</style>
