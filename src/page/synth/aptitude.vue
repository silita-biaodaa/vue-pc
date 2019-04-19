<template>
<div class="aptitude">
           <el-select v-model="companyQual" placeholder="选择资质类型" clearable  @change='Splice'  >
                <el-option
                  v-for="item in companyQuals"
                  :key="item.name"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
           
             <el-select v-model="major" placeholder="请选择" clearable  @change='spliceo'   >
              <el-option
                v-for="item in majors"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="grade" placeholder="请选择" clearable   @change='splicet'   >
              <el-option
                v-for="item in grades"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
</div>
</template>
<script>
import { filter} from '@/api/index';
export default {
  data () {
    return {
      companyQual:'',
      major:'',
      grade:'',
      companyQuals:[],
      majors:[],
      grades:[],
      zType:[],
      i:0
    }
  },
  props: {
    index:0
  },
  methods: {
     gainFilter() {
      filter({}).then( res => {
         if(res.code == 1 ) {
            this.companyQuals = res.data.companyQual
         }
      })
    },
    Splice() {
      if(this.companyQual == '') {
        this.$emit('group', {cur:'',em:false,i:this.i})
      } else {
        this.$emit('group', {cur:'',em:true,i:this.i})
      }
    },
    spliceo() {
        this.$emit('group', {cur:'',em:true,i:this.i})
    },
    splicet() {
       if(this.grade  == '') {
           this.$emit('group', {cur:'',em:true,i:this.i})
       } else {
          this.zType = []
          this.zType.push(this.companyQual,this.major,this.grade)
          this.zzType = this.zType.join('||')
          this.$emit('group', {cur:this.zzType,em:false,i:this.i})
       }
    },
  },
  watch: {
     companyQual(val) {
      // this.zType = []
      this.major = ''
      this.majors = []
      this.companyQuals.forEach(el => {
         if(el.code == val ) {
            this.majors = el.list
         }
      });      
    },
     major(val) {
      // this.zType = []
      this.grade = ''
      this.grades = []
      this.majors.forEach(el => {
         if(el.code == val ) {
            this.grades = el.list
         }
      });
    },
     grade(val) {
      this.zType = []
    },
  },
  created () {
    this.i = this.index
    this.gainFilter()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.aptitude {

}
</style>
