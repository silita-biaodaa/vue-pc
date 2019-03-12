<template>
<div class="inde">
  <div class="btn" @click="exportexcel" >
    导出数据
  </div>
  <div class="title">
       <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户名"
        width="280">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="180">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="180">
      </el-table-column>
      <el-table-column
        prop="operator"
        label="运营商"
        width="80">
      </el-table-column>
       <el-table-column
        prop="phone"
        label="手机号码">
      </el-table-column>
     </el-table>
  </div>

</div>
</template>
<script>
import { getJsonData,exportX } from '@/api/index'
export default {
  data () {
    return {
      name:'',
      articles:{},
    }
  },
  methods: {
    gainDetail() {
      let dataParam = JSON.stringify({
          name:this.name
        });
        getJsonData( "/api/list", dataParam).then(res => {
            if(res.code == 1) {
               this.articles = res.data
            }
        });
    },
    exportexcel(){
          exportX({name:this.name},{responseType: 'blob'}).then(res=> {
               const blob = new Blob([res]);
                const fileName = '中标.txt';
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
          })
      }
  },
  created () {
    this.name = this.$route.query.name
    this.gainDetail()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.inde {
  background-color: #f5f5f5;
  padding-top: 50px;
  .title {
    background-color: #fff;
    width: 960px;
    margin: 0 auto;
  }
  .btn {
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #FE6603;
    border-radius: 5px;
    margin: 0 auto;
    margin-bottom: 20px;

  }
 
}
</style>
