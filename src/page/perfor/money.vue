<template>
<div class="money">
   <div class="select">
            <el-row>
                <el-col :span='2'>合同金额:
                </el-col>
                <el-col :span='9'>
                    <ul class='left pro' >
                      <li v-for='(el,i) in range' :key='i' class='left' :class="el.min == min ? 'current':''"  @click='evalclass(el)' >{{el.name}}
                      </li>
                    </ul>
                </el-col>    
                <el-col :span='8' class="ttt" >    
                     <el-input
                        placeholder="最低价(万)"
                        v-model="low"
                        @clear='allmon'
                        clearable>
                      </el-input>
                      <div class="in-line">
                      </div> 
                      <el-input
                        placeholder="最高价(万)"
                        v-model="high"
                        @clear='allmon'
                        clearable>
                      </el-input>
                      <div class="t-btn" @click='fade' >
                          确定
                      </div>
                </el-col>
            </el-row>
    </div>
     <f-vip @toChildEvent='closeload' v-if='svip' ></f-vip>
</div>
</template>
<script>
export default {
  data () {
    return {
      svip:false,
      range:[
        {
          name:'全部',
          min:null,
          max:null
        },
        {
          name:'500万以下',
          min:'0',
          max:'500'
        },
        {
          name:'500-1000万',
          min:'500',
          man:'1000'
        },
        {
          name:'1000万以上',
          min:'1000',
          max:null
        }
      ],
      min:null,
      max:null,
      low:'',
      high:''
    }
  },
  methods: {
    evalclass(el) {

       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        if(localStorage.getItem('permissions') == '') {
          this.svip = true
          this.modalHelper.afterOpen();
        } else {
            this.low = ''
            this.high = ''
            this.min = el.min
            this.max = el.man
            this.$emit('amount', {state:this.min,end:this.max})
        }
      } else {
          this.$confirm('暂无权限，请先登录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/logo')
          })
      }
     
    },
    fade() {
      
      if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        if(localStorage.getItem('permissions') == '') {
          this.svip = true
          this.modalHelper.afterOpen();
        } else {
          if(this.low =='' && this.high =='') {
            return
          }
          this.min = '-1'
          this.max = ''
          this.$emit('amount', {state:this.low,end:this.high})
        }
      } else {
          this.$confirm('暂无权限，请先登录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/logo')
          })
      }

    
    },
    allmon() {
      if(this.low == '' && this.high =='' ) {
         this.min = null
         this.max = null
         this.$emit('amount', {state:this.min,end:this.max})
      }
    },
    closeload(val) {
      this.svip = val.cur
    },
  },
  created () {
    
  },
  components: {
  }
}
</script>
<style lang="less" >
.money {
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
