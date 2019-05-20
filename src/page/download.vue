<template>
<div class="download">
  <v-head :headTxt="'下载APP'"></v-head>
  <div class="d-c">
  </div>
  <div class="d-bto">
    © 2017 思利他, Inc. All rights reserved . 湘ICP备17019911号-1
  </div>
</div>
</template>
<script>
import heads from '@/components/head3'
export default {
  data ()  {
    return {
    }
  },
  methods: {
  },
  created () {
    // this.gain()
  },
  components: {
    'v-head':heads,
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
        background-size: center;
        position: relative;
      }  
    }

    /*分辨率高于1440，采用下面的样式*/
  @media screen and (min-device-width: 1920px){
       .d-c {
        width: 100%;
        background: url(../assets/img/1.jpg) no-repeat ;
        background-position-x: center;
        height: 850px;
        // background-size: center;
        // background-size: 100%;
        position: relative;
      }  
       
  }
}
</style>
