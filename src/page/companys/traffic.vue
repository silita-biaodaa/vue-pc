<template>
<div class="bur">

   <div class="law-nav">
        <div class="left" style="width:54px">
            序号
        </div>
        <div class="left" style="width:160px">
            项目名称
        </div>
         <div class="left" style="width:130px">
            标段名称
        </div>
        <div class="left" style="width:130px">
            施工单位
        </div>
        <div class="left" style="width:110px">
            合同金额
        </div>
        <div class="left" style="width:90px">
            竣工时间
        </div>
        <div class="left" style="width:100px">
            项目属地
        </div>
    </div>
    <div class="law-text" v-for="(el,i) in allArr" :key="i" v-show="result"  @click="decide(el,i)" >
        <div class="left" style="width:54px">
            {{i+1}}
        </div>
        <div class="left p-10" style="width:160px">
            {{el.proName ? el.proName: '--'}}
        </div>
         <div class="left p-10" style="width:130px">
            {{el.section ? el.section: '--'}}
        </div>
        <div class="left" style="width:130px">
            {{el.comName ? el.comName: '--'}}
        </div>
        <div class="left" style="width:110px">
            {{el.amount ? el.amount + '万' : '--'}}
        </div>
        <div class="left" style="width:90px">
            {{el.build ? el.build: '--'}}
        </div>
        <div class="left" style="width:100px">
            {{el.proWhere ? el.proWhere: '--'}}
        </div>
      </div>
       <div class="no-search" v-show="!result">
        <img src="../../assets/img/card.png" alt="" >
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
  methods: {
    decide(el) {
       if(localStorage.getItem('permissions') == '') {
          this.svip = true
          this.modalHelper.afterOpen();
        } else {
          const { href } = this.$router.resolve({
              path:'/traffic',query:{id:el.pkid} 
            })
          window.open(href, '_blank', )
        }
    }
  },
  closeload(val) {
      this.svip = val.cur
    },
  created () {
    this.allArr = this.arr
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
