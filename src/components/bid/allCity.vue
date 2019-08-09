<template>
<div class="acity" >
    <div class="select">
       <el-row>
          <el-col :span="2">
             企业属地:
          </el-col>
          <el-col :span="22">
             <ul class='pro' >
               <li v-for='(el,i) in areas' :key='i' class='left' :class="el.name==area? 'current':''"  @click='eval(el)'>{{el.name}}
               </li>
             </ul>
          </el-col>
       </el-row>
    </div>
    <div class="select" v-show="allt" >
       <el-row>
          <el-col :span="2">
             市&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp级:
          </el-col>
          <el-col :span="22">
             <ul class='pro' >
               <li v-for='(el,i) in list' :key='i' class='left' :class="cstr.indexOf(el.name) == -1 ? '' : 'current'"  @click="level(el)"  >{{el.name}}</li>
             </ul>
          </el-col>
       </el-row>
    </div>
</div>
</template>
<script>
import { filter,companys } from '@/api/index'
export default {
  data ()  {
    return {
      areas:[        
      ],
      area:'',
      list:[
      ],
      cstr:'全部',
      all:[],
      allt:true
    }
  },
  props: {
    city:''
  },
  watch:{
    city() {
       this.area = this.city.source
        this.areas.forEach( el => {      
         if(el.name == this.area) {
           this.list = el.data
         }
       })
    }
  },
  methods: {
    // 获取地区
    gainFilter() {  // 对传进来的数据解析，是否包含市级下面地区
      if(this.city.source.indexOf("||") == -1  ) {
        this.area = (this.city.source == '' ? '全部' : this.city.source)
        if(this.area == '全部') {
         this.allt = false
        } else {
          this.allt = true
        }
      }else {
        let arr = this.city.source.split('||')
        this.area = arr[0]
        this.cstr = arr[1]
        this.all = arr[1].split(',')
      }
    },
    eval(el) {
      sessionStorage.setItem('address',el.name);
      this.area = el.name
      if(this.area == '全部') {
        this.allt = false
        this.$emit('Cnext', {cur:''})
       } else {
          for(let x of el.data){
            x.i=false;
          }
          this.list = el.data
         this.allt = true
         this.$emit('Cnext', {cur:this.area})
       }
    },
    marry() {
      console.log(this.area)
     this.areas.forEach( el => {
       if(el.name != '全部') {
          el.data.unshift({name:'全部',i:true})      
          if(el.name == this.area) {
            this.list = el.data
          }
       }
       
       })
    },
    level(el) { 
      if(el.name == '全部') {
         this.all = []
         this.cstr = '全部'
         this.$emit('Cnext', {cur:this.area})
      } else {
        if( this.all.indexOf(el.name) == -1 ) {
          if(this.all.length >= 3 ) {
            return  
           } else {
              this.all.push(el.name)
              this.cstr = this.all.join(',')
              this.$emit('Cnext', {cur:(this.area + '||' + this.cstr)})
           }
        } else {
          this.all.splice(this.all.indexOf(el),1)
          this.cstr = this.all.join(',')
          if(this.all.length == 0) {
             this.all = []
             this.cstr = '全部'
              this.$emit('Cnext', {cur:this.area})
          } else {
              this.$emit('Cnext', {cur:(this.area + '||' + this.cstr)})
          }
        
        }
      }
    }
  },
  created () {
    let data=JSON.parse(sessionStorage.getItem('filter'));
    this.gainFilter()
    this.areas = data.area;
    this.areas.unshift({name:'全部'})
    this.marry()
  },
  mounted () {
    
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.acity {
 .select {
       font-size: 16px;
       margin-bottom: 10px;
       .el-select {
        width: 225px;
        margin-right: 10px;
      }
      .el-checkbox-button__inner {
        border: none;
        margin-bottom: 12px;
        font-size: 15px;
        padding: 5px 10px;
        color:#000;
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        color:#000;
        background-color: #FE6603;
        border-color: #FE6603;
        box-shadow: -1px 0 0 0 #fff; 
      }
      .el-checkbox-button:first-child .el-checkbox-button__inner {
        border-radius: 0;
      }
       .t-5 {
         margin-top: 5px;
       }
       .ttt {
         display: flex;
         .el-input {
           width: 30%;
         }
         .el-input__inner {
           height: 30px;
           line-height: 30px;
         }
         .in-line {
           width: 26px;
           height: 1px;
           background-color: #999;
           margin: auto 14px;
         }
         .t-btn {
           width: 50px;
           height: 26px;
           text-align: center;
           line-height: 26px;
           margin-left: 30px;
           background-color: #FE6603;
           font-size: 14px;
           color: #fff;
           border-radius: 5px;
           margin-top: 2px;
           cursor: pointer;
         }
       }
       .pro {
         li {
           margin-right: 5px;
           padding: 2px 9px;
           text-align: center;
           margin-bottom:6px;
           color:#666;  
           cursor: pointer;
         }
         .l-30 {
           margin-top: 5px;       
         }
         
       }
      .el-select {
        width: 225px;
        margin-right: 10px;
      }
      .com-btn {
        height: 40px;
        line-height: 40px;
        color: #fff;
        background-color: #FE6603;
        width: 100px;
        text-align: center;
        border-radius: 8px;
      }
      .op-c{
         color:#fff;
      }
      .sty-del {
        color: #FE6603;
        cursor: pointer;
      }
      .current {
           background-color: #FE6603 !important;
           color:#fff !important;
       }
      .c-btn {
        color: #FE6603;
        height: 28px;
        line-height: 28px;
        border: 1px solid #FE6603;
        width: 92px;
        border-radius: 5px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        margin-right: 30px;
      }
      .c-rela {
        width: 60px;
        height: 25px;
        line-height: 25px;
        background-color: #DDDDDD;
        text-align: center;
        font-size: 14px;
        margin-right: 30px;
        cursor: pointer;
      }
     }
}
</style>
