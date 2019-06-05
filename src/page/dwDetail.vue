<template>
<div class="dwDetail" >
  <v-head :headTxt="'活动详情'"></v-head>
  <div class="dw-img" >
    <img src="../assets/img/pic-banner@2x.png" alt="">
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
.dwDetail {
  .dw-img {
    margin: 0 auto;
    width: 1020px;
    margin-bottom: 200px;
  }
 
}
</style>