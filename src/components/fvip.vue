<template>
<div class="vip">
  <div class="vip-img">
    <img src="../assets/img/icon-tanchuang-png@2x.png" alt="">
     <i class="el-icon-circle-close-outline"  @click="close" ></i>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      state:false
    }
  },
  methods: {
    close() {
      this.modalHelper.beforeClose();
      this.$emit('toChildEvent', {cur:this.state})
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.vip {
  z-index: 99999;
  width: 100%;
  height: 100%;
  position: fixed;
	top: 0;
	left: 0;
	right: 0;
	left:0;
  background: rgba(0,0,0,.5);
  .vip-img {
    position: absolute;
    width: 441px;
    height: 489px;
    left: 50%;
    transform: translateX(-50%);
    top: 90px;
       i {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 42px;
    }
  }
 
}
</style>