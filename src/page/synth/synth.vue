<template>
<div class="synth">
  <div class="syn-top" >
    <span :class="query ? 'current' : '' "  @click="changce" >综合查询</span>/<span :class="record ? 'current' : '' "  @click="changces" >历史记录</span>
  </div>
  <!-- 综合查询筛选页面  query.vue  -->
  <!-- <q-uery v-show="query" ></q-uery>    -->
  <!-- 综合查询历史记录 页面 -->
  <!-- <h-is  v-show="record" > -->
    <router-view  />
   
  </h-is>
</div>
</template>
<script>

export default {
  data () {
    return {
      query:true,
      record:false,
      allarr:[]
    }
  },
  methods: {
    changce() {
      this.query = true
      this.record = false
      this.$router.push('query')
    },
    gainhistory() {
      if(!sessionStorage.getItem('xtoken') || !localStorage.getItem('Xtoken') ) {
        return false
     }
     history({pageNo:1,pageSize:1000}).then(res => {
       if(res.code == 1) {
         this.allarr = res.data
       }
     })
    },
    changces() {
    if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken') ) {
        this.query = false
       this.record = true
       this.$router.push('hist')
     } else {
         this.$confirm('暂无权限，请先登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/logo')
        })
        return false
     }
     
    }
  },
  created () {
    this.gainhistory()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.synth {
  width: 1020px;
  margin: 0 auto ;
  min-height: calc(~'100vh - 450px');
  padding-top: 80px;
  .syn-top {
    font-size: 16px;
    color:#999;
    margin: 20px 0 20px 0; 
    font-weight: 550;
    span {
      cursor: pointer;
    }
    .current {
      color:#333;
    }
  }

}

</style>
