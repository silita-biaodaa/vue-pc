<template>
<div class="perfor">
   <en-search
      @vague='entitle'
      >        
   </en-search>
   <div class="per-nav">
       <span @click="jumpper" :class="i == 0 ? 'current' : ''" >住建部</span>
       <span class="p-6" >/</span>
       <span @click="jumpwa" :class="i == 1 ? 'current' : ''" >水利部</span>
       <span class="p-6" >/</span>
       <span @click="jumptra" :class="i == 2 ? 'current' : ''" >交通部</span>
    </div>
   
   <div class="per-list">
     <router-view :state='state' :title='title' />
     <!-- <per-list :state='state' ></per-list> -->
     <!-- <per-water  :state='state' ></per-water> -->
     <!-- <road :state='state' ></road> -->
   
   </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      title:'',
      i:0
    }
  },
  props: {
    state:''
  },

  methods: {
    entitle(val) {
      this.title = val.cur
    },
    jumpper() {
      this.$router.push('perlist')
      this.i = 0
    },
     jumpwa() {
      this.$router.push('water')
       this.i = 1
    },
     jumptra() {
      this.$router.push('road')
       this.i = 2
    },
  },
  watch: {
      $route(to,form) {
        this.title = ''    
      }
  },
  created () {
    this.i = this.$route.meta.i
    this.title = localStorage.getItem('title') ? localStorage.getItem('title') : ''
  },
  components: {
  }
}
</script>
<style lang="less" >
.perfor {
  padding-top: 85px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .per-nav {
    width: 1020px;
    height: 56px;
    line-height: 56px;
    background-color: #fff;
    margin: 0 auto;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 16px;
    border-bottom: 1px solid #f2f2f2;
    color: #999;
    margin-top: 20px;
    cursor: pointer;
    .current {
      color: #FE6603;
    }
    .p-6 {
      padding: 0 6px;
    }
  }
  .per-list {
    width: 1020px;
    margin: 0 auto;
  }
}
</style>
