<template>
<div class="download">
<div class="d-top">
    <img src="../assets/img/logo2.png" alt="">
    <div>APP下载</div>
</div>
<div class="d-c">
  <!-- <div class="d-img">
     <img src="../assets/img/shouji.png" alt="">
  </div> -->
  <!-- <div class="d-size">
      <p>查<span class="d-small">企业 · </span>查<span class="d-small">项目 · </span>查<span class="d-small">人员</span></p>
      <div class="d-text">
        建筑领域招投标专家，全面、精准、及时的大数据产品 
      </div>
      <div class="d-text">
        下载APP，随时随地找到你想要的数据信息
      </div>
      <div class="d-logo">

      </div>
  </div> -->
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
        .d-img {
          width: 168px;
          height: 230px;
          position: absolute;
          top: 50px;
          left: 243px;
        }
        .d-size {
          height: 300px;
          position: absolute;
          top: 50px;
          left: 40%;
          p {
            font-size: 46px;
            color:#fff;
            .d-small {
              font-size: 32px;
            }
          }
          .d-text{
            width: 100%;
            font-size: 16px;
            color: #fff;
            margin-top: 10px;
          }
          .d-logo {
            background: url(../assets/img/pic-erweima.png) no-repeat;
            height: 113px;
            margin-top: 20px;
          }
        }
      }  
    }

    /*分辨率高于1440，采用下面的样式*/
  @media screen and (min-device-width: 1920px){
       .d-c {
        width: 100%;
        background: url(../assets/img/do1.png) no-repeat ;
        background-position-x: center;
        height: 800px;
        background-size: auto;
        position: relative;
        .d-img {
          width: 168px;
          height: 230px;
          position: absolute;
          top: 50px;
          left: 243px;
        }
        .d-size {
          height: 300px;
          position: absolute;
          top: 50px;
          left: 40%;
          p {
            font-size: 46px;
            color:#fff;
            .d-small {
              font-size: 32px;
            }
          }
          .d-text{
            width: 100%;
            font-size: 16px;
            color: #fff;
            margin-top: 10px;
          }
          .d-logo {
            background: url(../assets/img/pic-erweima.png) no-repeat;
            height: 113px;
            margin-top: 20px;
          }
        }
      }  
       
  }
  // .d-c {
  //   width: 100%;
  //   background: url(../assets/img/do.png) no-repeat;
  //   height: 400px;
  //   background-size: 100%;
  //   position: relative;
  //   .d-img {
  //     width: 168px;
  //     height: 230px;
  //     position: absolute;
  //     top: 50px;
  //     left: 243px;
  //   }
  //   .d-size {
  //     height: 300px;
  //     position: absolute;
  //     top: 50px;
  //     left: 40%;
  //     p {
  //       font-size: 46px;
  //       color:#fff;
  //       .d-small {
  //         font-size: 32px;
  //       }
  //     }
  //     .d-text{
  //       width: 100%;
  //       font-size: 16px;
  //       color: #fff;
  //       margin-top: 10px;
  //     }
  //     .d-logo {
  //       background: url(../assets/img/pic-erweima.png) no-repeat;
  //       height: 113px;
  //       margin-top: 20px;
  //     }
  //   }
  // }  
  .d-bto {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color:#999;
    margin-top: 15px;
  }
}
</style>
