<template>
<div class="coll">
   <div class="coll-top">
       <div class="det-nav">
          我的关注
       </div>
       <div class="coll-nav">
         <div class="left nav-in" v-for="(el,i) in nav" :key="i" :class="el.i ? 'coll-c' : ''"  @click='navcoll(el)'  >
           {{el.name}}
         </div>
       </div>
   </div>
   <div class="coll-list">
     <bid-list v-if="this.name =='招标公告'"></bid-list>
     <ten-list v-if="this.name =='中标公告'"></ten-list>
     <qy-list v-if="this.name =='企业信息'"></qy-list>
   </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      nav:[
        {
          name:'招标公告',
          i:true
        },
        {
          name:'中标公告',
          i:false
        },
        {
          name:'企业信息',
          i:false
        }
      ],
      name:'招标公告'
    }
  },
  methods: {
    navcoll (el) {
       this.name = el.name
       this.nav.forEach(el => {
         el.i = false
       })
       el.i = true
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.coll {
  width: 100%;
  padding-bottom: 120px;
  .coll-top {
    background-color: #fff;
      .det-nav {
      line-height: 54px;
      padding-left: 29px;
      font-size: 16px;
      font-weight: 500;
      border-bottom: 1px solid #F2F2F2;
      box-sizing: border-box;

    }
    .coll-nav {
      height: 60px;
      font-size: 14px;
      color:#999;
      display: flex;
      align-items: center;
      padding-left: 29px;
      .nav-in {
        width: 108px;
        height: 26px;
        line-height: 26px;
        border-radius: 8px;
        border: 1px solid #F2F2F2;
        margin-right: 35px;
        text-align: center;
        cursor: pointer;
      }
      .coll-c {
        background-color: #FE6603;
        color:#fff;
      }
    }
  }
  .coll-list {
    margin-top: 16px;
    padding: 12px;
    background-color: #fff;
  }
}
</style>