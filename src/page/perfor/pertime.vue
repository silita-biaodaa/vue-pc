<template>
<div class="perpor">
    <div class="select">
            <el-row>
                <el-col :span='2'>竣工时间:
                </el-col>
                <el-col :span='6'>
                    <ul class='left pro' >
                      <li v-for='(el,i) in province' :key='i' class='left' :class="el.old == Otime ? 'current':''"  @click='evalclass(el)' >{{el.name}}
                      </li>
                    </ul>
                </el-col>
                <el-col :span="12" class="ttt" >
                    <el-date-picker
                      v-model="defO"
                      type="date"
                      value-format='yyyy-MM-DD'
                      placeholder="选择日期">
                    </el-date-picker>
                    <div class="in-line">

                    </div>
                    <el-date-picker
                      v-model="defN"
                      type="date"
                      value-format='yyyy-MM-DD'
                      placeholder="选择日期">
                    </el-date-picker>
                    <div class="t-btn" @click="find" >
                      确定
                    </div>
                </el-col>
            </el-row>
     </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      province:[
        {
          name:'全部',
          new:'',
          old:''
        },
        {
          name:'近三年',
          new:'',
          old:'',
        },
        {
          name:'近五年',
          new:'',
          old:''
        }
      ],
      Ntime:'',
      Otime:'',
      defN:'',
      defO:''
    }
  },
  methods: {
    evalclass(el) {
      
    if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        if(localStorage.getItem('permissions') == '') {
          this.svip = true
          this.modalHelper.afterOpen();
        } else {
           this.defN = ''
           this.defO = ''
           this.Ntime = el.new
           this.Otime = el.old
           this.$emit('time', {new:this.Ntime,old:this.Otime})
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
    find() {

       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        if(localStorage.getItem('permissions') == '') {
          this.svip = true
          this.modalHelper.afterOpen();
        } else {
            if(this.defN == '' && this.defO == '') {
              return
            }
            this.Ntime = null
            this.Otime = null
            this.$emit('time', {new:this.defN,old:this.defO})
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
    gainTime() {
      var myDate = new Date();
      var time = myDate.toLocaleDateString().split('/')
      var times = myDate.toLocaleDateString().split('/')
      this.province[1].new = time.join('-')
      this.province[2].new = time.join('-')
      var year = time[0]
      var three = time.splice(1,2)
      var five = times.splice(1,2)
      three.unshift(year - 3 )
      five.unshift(year - 5 )
      this.province[1].old = three.join('-')
      this.province[2].old = five.join('-')
    }
  },
  watch: {
    defN() {
      if(this.defN == null  && this.defO == null ) {
        this.Ntime = ''
        this.Otime = ''
        this.$emit('time', {new:this.Ntime,old:this.Otime})
      }
    },
    defO() {
      if(this.defN == null  && this.defO == null ) {
        this.Ntime = ''
        this.Otime = ''
        this.$emit('time', {new:this.Ntime,old:this.Otime})
      }
    }
  },
  created () {
    this.gainTime()
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