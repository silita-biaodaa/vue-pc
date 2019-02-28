<template>
<div class="intell">
    <div class="in-nav">
      <span class="left in-po"  :class="this.name == '全部' ? 'current' : ''" @click="allshow" >全部</span>
      <div class="left" v-for="(el,i) in allList" :key="i">
         <span class="in-pdd">/</span>
         <span class="in-po" :class=" name == el.qualType ? 'current' : ''"  @click="changeList(el)" >{{el.qualType}} ({{el.list.length}})</span>
      </div>
    </div>
    <div class="in-table">
      <div class="law-nav">
        <div class="left" style="width:74px">
            序号
        </div>
        <div class="left" style="width:200px">
            资质名称
        </div>
        <div class="left" style="width:150px">
            资质证书号
        </div>
        <div class="left" style="width:250px">
            发证机关
        </div>
        <div class="left" style="width:100px">
            有效日期
        </div>
      </div>
      <div class="law-nav" v-for="(el,i) in showArr" :key="i">
        <div class="left" style="width:74px">
            {{i+1}}
        </div>
        <div class="left" style="width:200px">
            {{el.qualName ? el.qualName: '--'}}
        </div>
        <div class="left" style="width:150px">
            {{el.certNo ? el.certNo: '--'}}
        </div>
        <div class="left" style="width:250px">
            {{el.certOrg ? el.certOrg: '--'}}
        </div>
        <div class="left" style="width:100px">
            {{el.certDate ? el.certDate: '--'}}
        </div>
      </div>
    </div>
</div>
</template>
<script>
import { getJsonData } from '@/api/index'
export default {
  data () {
    return {
      allList:[],
      allArr:[],
      showArr:[],
      name:'全部'
    }
  },
  methods: {
    gainList() {
       let dataParam = JSON.stringify({          
        });
        getJsonData( "/company/qual/" + 'd82be405069001616cefd448d5bf83a1' ).then(res => {
            if(res.code == 1) {
              this.allList = res.data
              this.allList.forEach((el,i) => {
                 this.allArr.push.apply(this.allArr, el.list)
              })
              this.showArr = this.allArr
            }
        });
    },
    changeList(el) {
      this.name = el.qualType
      this.showArr = el.list
    },
    allshow() {
      this.name = '全部'
      this.showArr = this.allArr
    }
  },
  created () {
    this.gainList()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.intell {
  background-color: #fff;
  padding-bottom: 50px;
  .current {
    color:#333;
  }  
  .in-nav {
    font-size: 14px;
    color:#999;
    height: 44px;
    line-height: 44px;
    padding-left: 22px;
    font-weight: 550;
    .in-pdd {
      padding: 0 5px;
    }
    .in-po {
      cursor: pointer;
    }
  }
  .in-table {
    margin: 0 9px;
    border: 1px solid #f2f2f2;
    font-size: 12px;
    color:#333;
     .law-nav {
      height: 40px;
      border-bottom: 1px solid #f2f2f2;
      line-height: 40px;
      font-size: 12px;
      color:#333;
      text-align: center;
      font-weight: 550;
    }
  }
}

</style>