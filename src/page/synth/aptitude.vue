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
           
             <el-select v-model="major" placeholder="请选择" clearable  @change='spliceo' v-if="majors.length>0">
              <el-option
                v-for="item in majors"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="grade" placeholder="请选择" clearable   @change='splicet' :disabled='noLevel' v-if="grades.length>0">
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
import { qual} from '@/api/index';
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
      i:0,
      noLevel:false,

    }
  },
  props: {
    index:0,
    clear:false,
    chan:0
  },
  methods: {
     gainFilter() {
      let data=JSON.parse(sessionStorage.getItem('filter'));
      this.companyQuals=data.comQua;
    },
    Splice() {
      if(this.companyQual == '') {
        this.$emit('group', {cur:'',em:false,i:this.i})
      } else {
        this.$emit('group', {cur:'',em:true,i:this.i})
      }
    },
    spliceo() {
       this.grade = ''
       this.grades = []
        this.majors.forEach(el => {
         if(el.code == this.major ) {
            if(el.data.length == 0  ) {
              this.grade = '不分等级'
               this.noLevel = true
            } else {
               this.noLevel = false
               this.grades = el.data
            }
            
         }
      });
      if(this.noLevel) {
          this.zType = []
          this.zType.push(this.major)
          this.zzType = this.zType.join('/')
          this.$emit('group', {cur:this.zzType,em:false,i:this.i})
      } else {
        this.$emit('group', {cur:'',em:true,i:this.i})
      }
        
    },
    splicet() {
      
       if(this.grade  == '') {
          this.$emit('group', {cur:'',em:true,i:this.i})
       } else {
          this.zType = []
          this.zType.push(this.major,this.grade)
          this.zzType = this.zType.join('/')
          this.$emit('group', {cur:this.zzType,em:false,i:this.i})
       }
    },
  },
  watch: {
     companyQual(val) {
      this.major = ''
      this.majors = []
      this.grade = ''
      this.grades = []
      this.noLevel = false
      this.companyQuals.forEach(el => {
         if(el.code == val ) {
            this.majors = el.data
         }
      });      
    },
    //  major(val) {
     
    
    // },
     grade(val) {
      this.zType = []
    },
    clear(val) {
        //  this.companyQual = ''
        //  this.major = ''
         this.grade = ''
        //  this.majors = []
        //  this.grades = []
    },
    chan(val) {      
        this.companyQual = ''
         this.major = ''
         this.grade = ''
         this.majors = []
         this.grades = []
    }
  },
  created () {
    this.i = this.index
    this.gainFilter()
  },
  mounted() {
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.aptitude {

}
</style>
