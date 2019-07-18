<template>
<div class="city">
    <div class="select">
            <el-row>
                <el-col :span='2'>市&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp级:
                </el-col>
                <el-col :span='22'>
                    <ul class='left pro' >
                      <li v-for='(el,i) in city' :key='i' class='left' :class="el.i  ? 'current':''"  @click='evalclass(el)' >{{el.name}}
                      </li>
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
      city:[],
      citys:[]
    }
  },
  props:{
    citystr:''
  },
  methods: {
    evalclass(el) {
      if(el.code == '') {
         this.citys = []
         this.city.forEach(el => {
           if(el.code == '') {
             el.i = true
           } else {
             el.i = false
           }
         })
        this.$emit('nextC', {cur:this.citys})
      } else {
        this.city[0].i = false
        if( this.citys.indexOf(el.code) == -1 ) {
          if(this.citys.length >= 3 ) {
            this.$confirm('最多只能选择三个市级', '提示', {
                    type: 'warning',
                    showCancelButton:false,
                    showConfirmButton:false
             })
            return  
          } else {
            el.i = true
            this.citys.push(el.code)
            this.$emit('nextC', {cur:this.citys})
          }
        } else {
          this.citys.splice(this.citys.indexOf(el.code),1)
          el.i = false
          if(this.citys.length == 0) {
            this.city[0].i = true
          }
          this.$emit('nextC', {cur:this.citys})
        }
      }
    }
  },
  created(){
    let data=JSON.parse(sessionStorage.getItem('filter'));
    for(let x of data.area[13].data){
      x.i=false;
    }
    data.area[13].data.unshift({name:'全部',code:'',i:true})
    this.city=data.area[13].data;
    if(this.citystr!=''){
      this.city[0].i=false;
      let arr=this.citystr.split(',');
      for(let x of this.city){
        for(let y of arr){
          if(x.name==y){
            x.i=true;
            break
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.city {
    .select {
       font-size: 16px;
       margin-bottom: 12px;
       .pro {
         li {
           margin-right: 5px;
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