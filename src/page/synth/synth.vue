<template>
<div class="synth">
  <div class="syn-top" >
    <span :class="query ? 'current' : '' "  @click="changce" >综合查询</span>/<span :class="record ? 'current' : '' "  @click="changces" >历史记录</span>
  </div> 
 <!-- 综合查询筛选页面  query.vue  -->
  <!-- <q-uery v-show="query" ></q-uery>    -->
  <!-- 综合查询历史记录 页面 -->
  <!-- <h-is  v-show="record" > -->
    <router-view   :state='area'/>
</div>
</template>
<script>

export default {
  data () {
    return {
      query:true,
      record:false,
      area:'湖南',
      areas:[
        {
          name:'北京'
        },
        {
          name:'天津'
        },
        {
          name:'河北'
        },
        {
          name:'山西'
        },
        {
          name:'内蒙古'
        },
        {
          name:'辽宁'
        },
        {
          name:'吉林'
        },
        {
          name:'黑龙江'
        },
        {
          name:'上海'
        },
        {
          name:'江苏'
        },
        {
          name:'浙江'
        },
        {
          name:'安徽'
        },
        {
          name:'福建'
        },
        {
          name:'江西'
        },
        {
          name:'山东'
        },
        {
          name:'河南'
        },
        {
          name:'湖北'
        },
        {
          name:'湖南'
        },
        {
          name:'广西'
        },
        {
          name:'海南'
        },
        {
          name:'重庆'
        },
        {
          name:'四川'
        },
        {
          name:'贵州'
        },
        {
          name:'云南'
        },
        {
          name:'西藏'
        },
        {
          name:'陕西'
        },
        {
          name:'甘肃'
        },
        {
          name:'青海'
        },
        {
          name:'宁夏'
        },
        {
          name:'新疆'
        },
        {
          name:'广东'
        },
      ],
      options:[],
      terrace:'',
      date:'',
      name:'',
      allarr:[]
    }
  },
  props: {
    state:''
  },
  watch: {
    state(val) {
      this.area = val
    }
  },
  methods: {
    changce() {
      this.query = true
      this.record = false
      this.$router.push('query')
    },
    gainhistory() {
      if(!sessionStorage.getItem('xtoken') || !localStorage.getItem('Xtoken') ) {
        return false
     }
     history({pageNo:1,pageSize:1000}).then(res => {
       if(res.code == 1) {
         this.allarr = res.data
       }
     })
    },
    changces() {
    if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken') ) {
        this.query = false
       this.record = true
       this.$router.push('hist')
     } else {
         this.$confirm('暂无权限，请先登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/logo')
        })
        return false
     }
     
    }
  },
  created () {
    this.gainhistory()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.synth {
  width: 1020px;
  margin: 0 auto ;
  min-height: calc(~'100vh - 450px');
  padding-top: 80px;
  .syn-top {
    font-size: 16px;
    color:#999;
    margin: 20px 0 20px 0; 
    font-weight: 550;
    span {
      cursor: pointer;
    }
    .current {
      color:#333;
    }
  }
  .syn-query {
    width: 100%;
    box-sizing: border-box;
    height: 500px;
    background-color: #fff;
    margin-bottom: 200px;
    padding: 15px;
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
       .se-center {
         line-height: 40px;
       }
       .se-per {
           width: 50%;
           font-size: 14px;
           color:#999;
           display: flex;
           flex-direction: column; 
           .m-17 {
             margin-bottom: 17px;
           }
           input {
               height: 40px;
               line-height: 40px;
               border: 1px solid #dcdfe6;
               border-radius: 4px;
               padding: 0 15px;
               font-size: inherit;
           }
            .name-put {
                   width: 300px;
            }
           input::-webkit-input-placeholder {
               color:#999;
           }
       }
    }
  }
}

</style>
