<template>
   <div class="bid">
     <div class="bid-search">
          <div class="b-logo left">

        </div>
        <div class="b-search left">
           <p>首页/<span>招标</span></p>
           <el-input placeholder="请输入招标名或企业名" v-model="select" class="input-with-select">
                      <el-button slot="append"  >搜索</el-button>
           </el-input>
        </div>
     </div>
      
     <div class="options">
        <div class="select">
           选择地区:&nbsp
           <el-select v-model="area" placeholder="请选择">
              <el-option
                v-for="item in areas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="select">
           选择类型:&nbsp
           <el-select v-model="area" placeholder="请选择">
              <el-option
                v-for="item in areas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="select">
           评标办法:&nbsp
           <el-select v-model="area" placeholder="请选择">
              <el-option
                v-for="item in areas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="select">
           资质要求:&nbsp
           <el-select v-model="area" placeholder="请选择">
              <el-option
                v-for="item in areas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
             <el-select v-model="area" placeholder="请选择">
              <el-option
                v-for="item in areas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
             <el-select v-model="area" placeholder="请选择">
              <el-option
                v-for="item in areas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
     </div>

     <div class="bid-content">
       <ul>
         <li v-for="(el,i ) of queryLists" :key="i">
           <div class="m-bt">
              <p class="left m-rg">
                {{i +1 }}
              </p>
              <p class="left">
                {{el.title}}         
              </p>
              <p class="right">
                {{el.opendate}}
              </p>
           </div>
           <div class="aptitude">
             <p class="left">
                {{el.certificate}}
             </p>
             <p class="right">
                {{el.pbMode}}
             </p>
           </div>
         </li>
       </ul>
       <div class="page">

       </div>
     </div>

   </div>
</template>
<script>
import { queryList } from '@/api/index'
export default {
  data () {
    return {
      area:'',
      areas:[],
      queryLists:[],
    }
  },
  methods: {
    gainQueryList() {      // 评标办法                         省份            资质类型                   标题
       queryList({pageNo:1,pbModes:'',type:'0',pageSize:'20',regions:'hunan',zzType:'',projectType:'5',title:''}).then( res => {
         console.log(res)
         if(res.code == 1 ) {
           this.queryLists = res.data
         }
       })
    } 
  },
  created () {
    this.gainQueryList()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
 .bid {
   width: 1120px;
  //  height: 1500px;
   .bid-search {
     width: 1120px;
     overflow: hidden;
   }
   .b-logo {
     clear: both;
     width: 112px;
     margin: 66px 112px 40px 71px;
     height: 47px;
     width: 158px;
     border: 1px solid red;
   }
   .b-search {
     overflow: hidden;
     margin-top: 48px;
     color:#666;
     font-size: 18px;
     width: 588px;
     p {
       margin-bottom: 9px;
        span {
        color:#EC7522;
      }
     }
    .el-input-group--append .el-input__inner, .el-input-group__prepend {
      border-color: #EC7522;
    }
     .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner {
       width: 113px;
       background: #EC7522;
       border-radius: 0;
       color: #fff;
       border: 1px solid #EC7522;
     }
     .el-input-group__append .el-button, .el-input-group__append .el-select, .el-input-group__prepend .el-button, .el-input-group__prepend .el-select {
       margin: -9px -20px;
     }
   }
   .options {
     width: 1120px;
     height: 246px;
     background: #fff;
     padding: 21px 0 0 21px;
     margin-bottom: 20px;
     box-sizing: border-box;
     .select {
       font-size: 16px;
       margin-bottom: 12px;
      .el-select {
        width: 225px;
        margin-right: 10px;
      }
     }
   }
   .bid-content {
     width: 1120px;
     box-sizing: border-box;
     background: #fff;
     font-size: 16px;
     margin-bottom: 185px;
     .page {
       height: 280px;
     }
     ul {
       li {
         height: 80px;
         box-sizing: border-box;
         padding: 23px 22px 0 20px;
         border-bottom: 2px solid #f2f2f2;
         .m-rg {
           margin-right: 23px;
           width: 20px;
         }
         .m-bt {
           margin-bottom: 5px;
           overflow: hidden;
         }
         .aptitude {
           color: #EC7522;
           font-size: 14px;
           margin-left: 50px;
         }
       }
     }
   }
 }
</style>