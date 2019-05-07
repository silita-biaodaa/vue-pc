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
      city:[
        {
          name:'全部',
          value:'',
          i:true
        },
        {
          name:'邵阳',
          value:'邵阳市',
          i:false
        },
        {
          name:'长沙',
          value:'长沙市',
          i:false
        },
        {
          name:'岳阳',
          value:'岳阳市',
          i:false
        },
        {
          name:'益阳',
          value:'益阳市',
          i:false
        },
        {
          name:'株洲',
          value:'株洲市',
          i:false
        },
        {
          name:'湘潭',
          value:'湘潭市',
          i:false
        },
        {
          name:'郴州',
          value:'郴州市',
          i:false
        },
        {
          name:'永州',
          value:'永州市',
          i:false
        },
        {
          name:'怀化',
          value:'怀化市',
          i:false
        },
        {
          name:'张家界',
          value:'张家界市',
          i:false
        },
        {
          name:'吉首',
          value:'吉首市',
          i:false
        },
        {
          name:'常德',
          value:'常德市',
          i:false
        },
        {
          name:'娄底',
          value:'娄底市',
          i:false
        },
        {
          name:'衡阳',
          value:'永州市',
          i:false
        },
        {
          name:'湘西',
          value:'湘西土家族苗族自治州',
          i:false
        },
      ],
      citys:[]
    }
  },
  methods: {
    evalclass(el) {
      if(el.value == '') {
         this.citys = []
         this.city.forEach(el => {
           if(el.value == '') {
             el.i = true
           } else {
             el.i = false
           }
         })
        this.$emit('nextC', {cur:this.citys})
      } else {
        this.city[0].i = false
        if( this.citys.indexOf(el.value) == -1 ) {
          if(this.citys.length >= 3 ) {
            return  
          } else {
            el.i = true
            this.citys.push(el.value)
            this.$emit('nextC', {cur:this.citys})
          }
        } else {
          this.citys.splice(this.citys.indexOf(el.value),1)
          el.i = false
          if(this.citys.length == 0) {
            this.city[0].i = true
          }
          this.$emit('nextC', {cur:this.citys})
        }
      }
    }
  },
  components: {
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
      .el-select {
        width: 225px;
        margin-right: 10px;
      }
      .el-checkbox-button__inner {
        border: none;
        margin-bottom: 12px;
        font-size: 15px;
        padding: 5px 10px;
        color:#666;
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        color:#fff;
        background-color: #FE6603;
        border-color: #FE6603;
        box-shadow: -1px 0 0 0 #fff; 
      }
      .el-checkbox-button:first-child .el-checkbox-button__inner {
        border-radius: 0;
      }
     }
}
</style>