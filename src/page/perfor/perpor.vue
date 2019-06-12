<template>
<div class="perpor">
    <div class="select">
            <el-row>
                <el-col :span='2'>省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:
                </el-col>
                <el-col :span='22'>
                    <ul class='left pro' >
                      <li v-for='(el,i) in province' :key='i' class='left' :class="el.name == area ? 'current':''"  @click='evalclass(el)' >{{el.name}}</li>
                    </ul>
                </el-col>
            </el-row>
     </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      province:[],
      area:'湖南省'
    }
  },
  methods: {
    evalclass(el) {
      this.area = el.name
      this.$emit('perPor', {cur:this.area})
    }
  },
  props: {
    state:{
      default:'湖南省'
    },
    address:{
      default:''
    }
  },
  watch: {
    state(val) {
      this.area = val
      this.$emit('perPor', {cur:this.area})
    }
  },
  created () {
    let data=JSON.parse(sessionStorage.getItem('filter'));
    this.area = this.state;
    this.province = data.area;
    if(sessionStorage.getItem('yjSerach')||sessionStorage.getItem('slSerach')||sessionStorage.getItem('jtSerach')||sessionStorage.getItem('peopleSerach')){
      if(this.address!=''){
        this.area=this.address;
        return false
      }
    }
    this.$emit('perPor', {cur:this.area})
  },
  components: {
  }
}
</script>
<style lang="less" >
.perpor {
   .select {
       font-size: 16px;
       margin-bottom: 12px;
       .pro {
         li {
           padding: 2px 9px;
           height: 20px;
           text-align: center;
           line-height: 20px;
           margin-bottom: 6px;
           cursor: pointer;
           color:#666;
         }
         .bid-p {
           padding: 2px 9px;
           color:#666;
         }
         .current {
           background-color: #FE6603;
           color:#fff;
         }
       }
     }
}
</style>