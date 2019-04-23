<template>
<div class="synth">
  <div class="syn-top" >
    <span :class="query ? 'current' : '' " >综合查询</span>/<span :class="record ? 'current' : '' " >历史记录</span>
  </div>
  <div class="syn-query">
      <div class="select" >
        <el-row>
             <el-col :span='2'>
                省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:
             </el-col>
             <el-col :span='22' >
               <ul class='pro' >
                 <li v-for='(el,i) in areas' :key='i' class='left bid-p' :class="el.name==area? 'current':''" >{{el.name}}
                 </li>
               </ul>
             </el-col>
        </el-row>
      </div>
      <div class="select" >
          <el-row>
             <el-col :span='2' class="se-center" >
                业绩要求:
             </el-col>
             <el-col :span='22' >
                 <div class="se-per left" >
                    <div class="m-17">
                        业绩平台:&nbsp&nbsp&nbsp
                         <el-select v-model="terrace" placeholder="请选择">
                           <el-option
                             v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                           </el-option>
                         </el-select>
                    </div>
                    <div>
                        竣工时间:&nbsp&nbsp&nbsp
                         <el-date-picker
                           v-model="date"
                           type="daterange"
                            value-format="yyyy-MM-dd"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期">
                         </el-date-picker>
                    </div>
                 </div>
                 <div class="se-per right" >
                     <div class="m-17" >
                        项目名称:&nbsp&nbsp&nbsp
                        <input type="text" placeholder="输入项目名称关键词，多个关键词用逗号"  v-model="name" class="name-put" >
                    </div>
                    <div class="m-17">
                        合同金额:&nbsp&nbsp&nbsp
                        <input type="text" placeholder="输入项目名称关键词，多个关键词用逗号"  v-model="name" >
                    </div>
                 </div>
             </el-col>
        </el-row>
      </div>
     

    <span :class="query ? 'current' : '' "  @click="changce" >综合查询</span>/<span :class="record ? 'current' : '' "  @click="changces" >历史记录</span>
  </div>
  <q-uery v-show="query" ></q-uery>
  <h-is  v-show="record" ></h-is>
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
  methods: {
    changce() {
      this.query = true
      this.record = false
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
