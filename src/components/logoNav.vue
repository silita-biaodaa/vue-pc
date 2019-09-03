<template>
<div class="lognnav">
  <div class="l-nav">
    <img src="../assets/img/logo2.png" alt="" @click="jump">
    <div class="l-table" >
      <div class="l-switch left" v-for="(el,i) in logo" :key="i" :class="logoBc == el.i ? 'current' : '' " @click="jumps(el)">
         {{el.name}}
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      logo :[
        {
          name:'登录',
          to:'/logo',
          i:1
        },
        {
          name:'注册',
          to:'/enroll',
          i:2
        }
      ]
    }
  },
  components: {
  },
  methods: {
    jump() {
      this.$router.push('/')
    },
    jumps(el) {
       this.$router.push(el.to)
    }
  },
  computed: {
    logoBc() {
      if(this.$route.name == 'logo' || this.$route.name == 'find' ) {
        return 1
      } else {
        return 2
      }
    }
  }
}
</script>
<style lang="less">
.lognnav {
  width: 100%;
  background-color: #fff;
  .l-nav {
    width: 1160px;
    height: 60px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
      cursor: pointer;
    }
    .l-switch {
      font-size: 14px;
      color:#FE6603;
      width: 64px;
      height: 27px;
      border: 1px solid #FE6603;
      line-height: 27px;
      text-align: center;
      font-weight: 550;
      margin-left: 5px;
      cursor: pointer;
    } 
    .current {
       background-color: #FE6603;
       color:#fff;
     }
  }
}
</style>