<template>
<div class="hdDetail" >
  <v-head :headTxt="'活动详情'"></v-head>
  <div class="hd-img" >
    <img src="../assets/img/hdDetail.png" alt="">
  </div>
  
</div>
</template>
<script>
import heads from '@/components/head3'
export default {
  data () {
    return {

    }
  },
 components: {
    'v-head':heads,
  }
}
</script>
<style lang="less" scoped>
.hdDetail {
  .hd-img {
    margin: 0 auto;
    width: 1020px;
    margin-bottom: 200px;
    img{
      width: 1020px;
    }
  }
 
}
</style>