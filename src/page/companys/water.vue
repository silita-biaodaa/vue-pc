<template>
<div class="bur">
   <div class="law-nav">
        <div class="left" style="width:54px">
            序号
        </div>
        <div class="left" style="width:180px">
            项目名称
        </div>
        <div class="left" style="width:140px">
            施工单位
        </div>
        <div class="left" style="width:120px">
            合同金额
        </div>
         <div class="left" style="width:70px">
            业绩级别
        </div>
        <div class="left" style="width:90px">
            完工日期
        </div>
        <div class="left" style="width:120px">
            项目属地
        </div>
    </div>
    <div class="law-text" v-for="(el,i) in allArr" :key="i" v-show="result" @click="decide(el)"  >
        <div class="left" style="width:54px">
            {{($parent.current-1)*10+(i+1)}}
        </div>
        <div class="left p-10" style="width:180px">
            {{el.proName ? el.proName: '--'}}
        </div>
        <div class="left" style="width:140px">
            {{el.comName ? el.comName: '--'}}
        </div>
        <div class="left" style="width:120px">
            {{el.amount ? el.amount : '--'}}
        </div>
        <div class="left" style="width:70px">
            {{el.proType ? el.proType: '--'}}
        </div>
         <div class="left" style="width:90px">
            {{el.build ? el.build: '--'}}
        </div>
        <div class="left" style="width:120px">
            {{el.proWhere ? el.proWhere: '--'}}
        </div>
      </div>
      <div class="no-toast" v-show="!result" >
        <img src="../../assets/img/bank_card @2x.png" alt="">
        <span>Sorry，暂未查询到该公司的水利部业绩信息</span>
      </div>
      <f-vip @toChildEvent='closeload' v-if='svip' ></f-vip>
</div>
</template>
<script>
export default {
  data () {
    return {
       result:true,
       allArr:[],
       svip:false
    }
  },
  props: ['arr'],
  watch: {
    arr(val) {
      this.allArr = val
      if(this.allArr.length == 0) {
        this.result = false
      } else {
         this.result = true
      }
    }
  },
  created () {
    this.allArr = this.arr
  },
  methods: {
      decide(el) {
         if(localStorage.getItem('permissions') == '') {
          this.svip = true
          this.modalHelper.afterOpen();
        } else {
        const { href } = this.$router.resolve({
          path:'/irrigation',query:{id:el.pkid} 
        })
        window.open(href, '_blank', )
        } 
    },  
     closeload(val) {
      this.svip = val.cur
    },
  },
  components: {
  }
}
</script>
<style lang="less" >
.bur {
   .law-nav {
    height: 40px;
    border-bottom: 1px solid #f2f2f2;
    line-height: 40px;
    font-size: 12px;
    color:#333;
    text-align: center;
    font-weight: 550;
  }
   .law-text {
      min-height: 40px;
      border-bottom: 1px solid #f2f2f2;
      font-size: 12px;
      color:#333;
      font-weight: 550;
      display: flex;
      align-items: center;
      text-align: center;
      cursor: pointer;
    }
  .no-search {
    width: 100%;
    height: 500px;
    border-top-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
