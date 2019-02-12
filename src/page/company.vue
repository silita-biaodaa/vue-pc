<template>
<div class="company">
  <div class="bid-search">
        <div class="b-logo left">

        </div>
        <div class="b-search left">
           <!-- <p>首页/<span>企业</span></p> -->
           <el-input placeholder="请输入招标名或企业名" class="input-with-select"    >
                      <el-button slot="append"   >搜索</el-button>
           </el-input>
        </div>
  </div>

  <div class="select">
     <div class="option">
        选择地区:&nbsp
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
     </div>
      <div class="option">
        注册资金:&nbsp
        <input type="text" placeholder="最低价"  >  -  <input type="text" placeholder="最高价"  >  <span>确定</span>
     </div>
     <div class="option">
        资质要求:&nbsp
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
        <span @click="add" >新增条件</span>
     </div>
     <div class="option" v-show="two">
        资质要求:&nbsp
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
        <span @click="ftwo">删除条件</span>
     </div>
     <div class="option" v-show="three">
        资质要求:&nbsp
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
        <el-select v-model="area" placeholder="请选择省份">
           <el-option
             v-for="item in areas"
             :key="item.name"
             :label="item.name"
             :value="item.name">
           </el-option>
        </el-select>
        <span @click="fthree" >删除条件</span>
     </div>
  </div>
  <div class="firm">
      <ul>
        <li>
           <div class="left t-size" style="width:120px;">
              序号
           </div>
             <div class="left t-size" style="width:300px;">
              企业名称
           </div>
             <div class="left t-size" style="width:150px;">
              法定代表
           </div>
             <div class="left t-size" style="width:200px;">
              注册资本
           </div>
             <div class="left t-size" style="width:250px;">
              联系方式
           </div>
             <div class="left t-size" style="width:170px;">
              所属地区
           </div>
        </li>
        <li>
            <div class="left " style="width:120px;">
              1
           </div>
             <div class="left" style="width:300px;">
              湖南耀邦建设有限公司
           </div>
             <div class="left" style="width:150px;">
               陈波
           </div>
             <div class="left" style="width:200px;">
              1000万人名币
           </div>
             <div class="left" style="width:250px;">
              0731-5555555
           </div>
             <div class="left" style="width:170px;">
              湖南
           </div>
        </li>
      </ul>
  </div>
</div>
</template>
<script>
import { filter,companys } from '@/api/index'
export default {
  data () {
    return {
       area:'',
       areas:[],
       input:'',
       two:false,
       three:false
    }
  },
  methods: {
    gainFilter() {
      filter({}).then( res => {
         if(res.code == 1 ) {
            this.areas = res.data.area
         }
      })
    },
    gainCompany() {
      companys({regisAddress:'hunan',minCapital:0,maxCapital:10000000,qualCode:'',pageNo:1,pageSize:20,levelRank:''}).then(res => {
         console.log(res)
      })
    },
    add() {
      if(this.two) {
        this.three = true
      }
      this.two = true

    },
    ftwo() {
      this.two = false
    },
    fthree() {
      this.three = false
    } 

  },
  created () {
    this.gainFilter()
    this.gainCompany()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.company {
  background: #FAFAFA;
  width: 1190px;
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
     margin-top: 68px;
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
   .select {
     width: 1190px;
     padding: 21px;
     background: #fff;
     margin-bottom: 20px;
     .option {
       font-size: 16px;
       margin-bottom: 12px;
        .el-select {
        width: 225px;
        margin-right: 10px;
      }
      input {
        border:  1px solid #dcdfe6;
        width: 208px;
        height: 40px;
        border-radius: 4px;
        padding-left: 15px;
      }
       input::-webkit-input-placeholder {

         color: #aab2bd;
      }
      span {
        color: #EC7522;
        margin-left: 15px;
      }
     }
   }
   .firm {
     width: 1190px;
     background: #fff;
     ul {
    
       li {
         height: 70px;
         line-height: 70px;
         border-bottom: 1px solid #f2f2f2;
         text-align: center;
         .t-size {
           font-size: 14px;
         }
       }
     }
   }
}
</style>
