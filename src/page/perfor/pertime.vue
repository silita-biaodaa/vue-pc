<template>
<div class="perpor">
    <div class="select">
            <el-row>
                <el-col :span='2'>{{timeTxt}}:
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
                       value-format='yyyy-MM-dd'
                      placeholder="起始日期">
                    </el-date-picker>
                    <div class="in-line">

                    </div>
                    <el-date-picker
                      v-model="defN"
                      type="date"
                      value-format='yyyy-MM-dd'
                      placeholder="结束日期">
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
        this.defN = ''
        this.defO = ''
        this.Ntime = el.new
        this.Otime = el.old
        this.$emit('time', {new:this.Ntime,old:this.Otime})
    },
    find() {
         if(this.defN == '' && this.defO == '') {
           return
         }
         this.Ntime = null
         this.Otime = null
         this.$emit('time', {new:this.defN,old:this.defO})
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
    let n=this.$parent.data.buildEnd;
    let o=this.$parent.data.buildStart;
    if(sessionStorage.getItem('fwSerach')){
      let data=JSON.parse(sessionStorage.getItem('fwSerach'));
      n=data.end;
      o=data.start;
    }
    if((n==this.province[1].new&&o==this.province[1].old)||(n==this.province[2].new&&o==this.province[2].old)){
      this.Ntime=n;
      this.Otime=o;
    }else{
      this.defN=n;
      this.defO=o;
    }
  },
  props:{
    timeTxt:{
      default:'竣工时间'
    }
  }
}
</script>
<style lang="less" >
.perpor {
   .select {
       font-size: 16px;
       margin-bottom: 12px;
     }
}
</style>