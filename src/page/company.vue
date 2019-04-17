<template>
<div class="company">
 
   <en-search
    @vague='entitle'
    :all='total'
   ></en-search>

   <div class="c-search">
      <div class="select">
            <el-row>
               <el-col :span="2">
                  省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:
               </el-col>
               <el-col :span="22">
                  <ul class='pro' >
                    <li v-for='(el,i) in areas' :key='i' class='left' :class="el.name==area? 'current':''"  @click='eval(el)'  >
                       {{el.name}}
                    </li>
                  </ul>
               </el-col>
            </el-row>
        </div>
        <div class="select">
           <el-row>
             <el-col :span="2" class="t-5">
                注册资金:
             </el-col>
             <el-col :span="14">
                <ul class='pro' >
                    <li v-for='(el,i) in sums' :key='i' class='left l-30' :class="el.s==start? 'current':''"  @click='evalsum(el)'  >
                       {{el.name}}
                    </li>
                </ul>
             </el-col>
             <el-col :span="8" class="ttt">
                <el-input
                  placeholder="最低价"
                  v-model="low"
                  @change="fade"
                  clearable>
                </el-input>
                <div class="in-line">
                </div> 
                <el-input
                  placeholder="最高价"
                  v-model="high"
                  @change="fade"
                  clearable>
                </el-input>
                <div class="t-btn" @click='gainList' >
                    确定
                </div>
             </el-col>
           </el-row>
        </div>
        <div class="select"  >
           资质要求:&nbsp
           <el-select v-model="companyQual" placeholder="选择资质类型" clearable  @change='first'  >
              <el-option
                v-for="item in companyQuals"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="major" placeholder="请选择" clearable @change = 'firsts' >
              <el-option
                v-for="item in majors"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="grade" placeholder="请选择" clearable  @change = 'firstss'   >
              <el-option
                v-for="item in grades"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
        </div>
         <div class="select" v-show='two' >
           <span class='op-c' >资质要求:</span>&nbsp&nbsp
           <el-select v-model="twoQual" placeholder="选择资质类型"  clearable @change = 'twoq'  >
              <el-option
                v-for="item in companyQuals"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="twot" placeholder="请选择" clearable  @change = 'twoqs' >
              <el-option
                v-for="item in twots"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="twott" placeholder="请选择" clearable  @change = 'twoqss'  >
              <el-option
                v-for="item in twotts"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <span class='sty-del' @click='twof'  >删除</span>
        </div>
         <div class="select" v-show='three' >
           <span class='op-c' >资质要求:</span>&nbsp&nbsp
           <el-select v-model="threeQual" placeholder="选择资质类型" clearable  @change = 'threeq' >
              <el-option
                v-for="item in companyQuals"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="threet" placeholder="请选择" clearable  @change = 'threeqs' >
              <el-option
                v-for="item in threets"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="threett" placeholder="请选择" clearable  @change = 'threeqss' >
              <el-option
                v-for="item in threetts"
                :key="item.name"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <span class='sty-del' @click='threef' >删除</span>
        </div>
        <div class='select m-20'>
         <div class='op-c left' >资质要求:&nbsp&nbsp&nbsp</div>
         <div class='left c-btn' @click='transt' >
            <i class='el-icon-plus'></i>增加条件
         </div>
         
        </div>
        <div class='select m-20 c-red' v-show='five' >
          <div class='op-c left' >资质要求:&nbsp&nbsp&nbsp</div>
          资质最多只可添加3条
        </div>  
        <div class="select" v-show='five'>
           <el-row>
             <el-col :span="2" class="t-5">
                资质关系:
             </el-col>
             <el-col :span="14">
                <div class='left c-rela t-5' v-for="(el,i) in rela" :key='i' :class="el.key == rangeType? 'current':''" @click='crela(el)' >
                  {{el.name}}
                </div>
             </el-col>
           </el-row>
        </div>  

        <div class="select cc-btn" >
          <div class='left c-sure' @click='again' >
            查询
          </div>
        </div>
             
   </div>

    <div class="total">
        共搜索到<span>{{total}}</span>家企业
    </div>


<div v-loading="loading" element-loading-text="拼命加载中" >
  <div class="firm" v-show="!Snone">
      <div class='firm-ul'>  
        <div>
           <div class="left t-size" style="width:80px;">
              序号
           </div>
             <div class="left t-size" style="width:300px;">
              企业名称
           </div>
             <div class="left t-size" style="width:120px;">
              法定代表
           </div>
             <div class="left t-size" style="width:180px;">
              注册资本
           </div>
             <div class="left t-size" style="width:200px;">
              联系方式
           </div>
             <div class="left t-size" style="width:140px;">
              所属地区
           </div>
        </div>    
          
        
        <!-- <router-link v-for='(el,i) in companylisy' :key='i' tag='a' :to="{path:'/introduce',query:{id:el.comId,name:el.comName,source:el.regisAddress}}" target='_blank'   > -->
        <a v-for='(el,i) in companylisy' :key='i' @click='decide(el)'  >
            <div class="left " style="width:80px;">
              {{(current-1)*20+(i+1)}}
           </div>
             <div class="left" style="width:300px;">
               <span class='c-col' >{{el.comName}}</span>
           </div>
             <div class="left" style="width:120px;">
               {{el.legalPerson}}
           </div>
             <div class="left" style="width:180px;">
              {{el.regisCapital ? el.regisCapital : '暂无'}}
           </div>
             <div class="left" style="width:200px;">
              {{el.phone ? el.phone : '暂无'}}
           </div>
             <div class="left" style="width:140px;">
              {{el.regisAddress}}
           </div>
        </a>
      </div>
  </div>
  <div class="c-page" v-show="!Snone">
          <nav-page 
          :all='total'
          :currents='present'
          @skip='Goto'
          ></nav-page>
  </div>
</div>  
  <div class="noneS" v-show="Snone">
      <img src="../assets/img/card.png" alt="">
  </div>
<f-vip @toChildEvent='closeload' v-if='svip' ></f-vip>
</div>
</template>
<script>
import { filter,companys } from '@/api/index'
export default {
  data () {
    return {
       svip:false,
       area:'',
       Snone:false,
       loading:false,
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
      sums:[
        {
          name:'全部',
          i:0,
          s:'0',
          e:''
        },
        {
          name:'500万-1000万',
          i:1,
          s:'500',
          e:'1000'
        },
        {
          name:'1000万-5000万',
          i:0,
          s:'1000',
          e:'5000'
        },
        {
          name:'5000万-10000万',
          i:0,
          s:'5000',
          e:'10000'
        },
        {
          name:'10000万以上',
          i:0,
          s:'10000',
          e:''
        }
      ],
       two:false,
       three:false,
       rank:0,
       start: '0',
       end:'',
       low:'',
       high:'',
       companyQuals:[],
       companyQual:'',
       majors:[],
       major:'',
       grade:'',
       grades:[],
       twoQual:'',
       twot:'',
       twots:[],
       twott:'',
       twotts:[],
       threeQual:'',
       threet:'',
       threets:[],
       threett:'',
       threetts:[],
       firstarr:[],
       firststr:'',
       twoarr:[],
       twostr:'',
       threearr:[],
       threestr:'',
       allarr:[],
       allstr:'',
       rangeType:'and',
       rela:[
         {
           name:'和',
           key:'and'
         },
         {
           name:'或',
           key:'or'
         }
       ],
       companylisy:[],
       five:false,
       total:0,
       current:1,
       title:'',
       present:9
    }
  },
   props: {
    state:''
  },
  watch: {
    companyQual(val) {
      this.major = ''
      this.majors = []
      this.companyQuals.forEach(el => {
         if(el.code == val ) {
            this.majors = el.list
         }
      });      
    },
    twoQual(val) {
      this.twot = ''
      this.twots = []
      this.companyQuals.forEach(el => {
         if(el.code == val ) {
            this.twots = el.list
         }
      });      
    },
    threeQual(val) {
      this.threet = ''
      this.threets = []
      this.companyQuals.forEach(el => {
         if(el.code == val ) {
            this.threets = el.list
         }
      });      
    },
    major(val) {
      this.grade = ''
      this.grades = []
      this.majors.forEach(el => {
         if(el.code == val ) {
            this.grades = el.list
         }
      });
    },
     twot(val) {
      this.twott = ''
      this.twotts = []
      this.twots.forEach(el => {
         if(el.code == val ) {
            this.twotts = el.list
         }
      });
    },
    threet(val) {
      this.threett = ''
      this.threetts = []
      this.threets.forEach(el => {
         if(el.code == val ) {
            this.threetts = el.list
         }
      });
    },
     state(val) {
      this.area = val
      this.current = 1
      this.loading = true
      this.again()
    }
  },
  methods: {
    closeload(val) {
      this.svip = val.cur
    },
    gainFilter() {
      filter({}).then( res => {
         if(res.code == 1 ) {
            this.companyQuals = res.data.companyQual
         }
      })
    },
    gainCompany() {
      companys({regisAddress:this.area,minCapital:this.start,maxCapital:this.end,qualCode:this.allstr,pageNo:this.current,pageSize:20,levelRank:'',rangeType:this.rangeType,keyWord:this.title}).then(res => {
         this.companylisy = res.data
         this.present = res.pageNum
        this.total = res.total
        this.loading = false
        if(this.total == 0 ) {
           this.Snone = true
         } else {
           this.Snone = false
         }
      })
    },
    again() {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
          if( localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('comFilter') == -1  ) {
            this.svip = true
            this.modalHelper.afterOpen();
          } else {
             this.allstr = this.allarr.join(",")
             this.loading = true
             if(this.rank == 0 ) {
               this.gainCompany()
             } else {
               companys({regisAddress:this.area,minCapital:this.low,maxCapital:this.high,qualCode:this.allstr,pageNo:this.current,pageSize:20,levelRank:'',rangeType:this.rangeType,keyWord:this.title}).then(res => {
               this.companylisy = res.data
               this.total = res.total
               this.loading = false
               this.present = res.pageNum
               if(this.total == 0 ) {
                  this.Snone = true
                } else {
                  this.Snone = false
                }
              })
             }
          }
      } else {
            this.$confirm('暂无权限，请先登录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/logo')
          }).catch(() => {

          });
      }
     
    },
    add() {
      if(this.two) {
        this.three = true
      }
      this.two = true

    },
    eval(el) {
      if(this.loading) {
         return
       }
       this.current = 1
       this.area = el.name
       this.loading = true
       this.allstr = this.allarr.join(",")
         if(this.rank == 0 ) {
           this.gainCompany()
         } else {
           companys({regisAddress:this.area,minCapital:this.low,maxCapital:this.high,qualCode:this.allstr,pageNo:this.current,pageSize:20,levelRank:'',rangeType:this.rangeType,keyWord:this.title}).then(res => {
           this.companylisy = res.data
           this.total = res.total
           this.loading = false
           this.present = res.pageNum
           if(this.total == 0 ) {
              this.Snone = true
            } else {
              this.Snone = false
            }
          })
         }
    },
    evalsum(el) {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
            if( localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('comFilter') == -1  ) {
              this.svip = true
              this.modalHelper.afterOpen();
            } else {
              if(this.loading) {
                return
              }
              this.rank = 0 
              this.low = '',
              this.high = '',
              this.start = el.s,
              this.end = el.e 
              this.current = 1
              this.loading = true
              this.again()
            }
        } else {
              this.$confirm('暂无权限，请先登录', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/logo')
            }).catch(() => {

            });
        }


    },
    gainList() {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
            if( localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('comFilter') == -1  ) {
              this.svip = true
              this.modalHelper.afterOpen();
            } else {
                this.current = 1
                this.rank = 1
                this.start = ''
                this.end = '' 
                this.loading = true
                this.again()
            }
        } else {
              this.$confirm('暂无权限，请先登录', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/logo')
            }).catch(() => {

            });
        }
    },
    transt() {
      this.five = true
       if(this.two) {
         this.three = true
       } else {
         this.two = true
       }
    },
    twof() {
      this.two = false
      if(!this.three) {
         this.five = false
      }
    },
    threef() {
      this.three = false
      if(!this.two) {
        this.five = false
      }
    },
    fade() {
      this.rank = 1
      this.start = ''
      this.end = '' 
      this.current = 1 
      // this.again()
    },
    ftwo() {
      this.two = false
    },
    fthree() {
      this.three = false
    },
    first(val) {
      this.firstarr = [],
      this.allarr = []
      this.firstarr.push(val)
      this.firststr = this.firstarr.join('||')
      this.fisrtpush()
    },
    firsts(val) {
      this.allarr = []
      this.firstarr.length = 1 ,
      this.firstarr.push(val)      
      this.firststr = this.firstarr.join('||')  
      this.fisrtpush()
    },
    firstss(val) {
      this.allarr = []
      this.firstarr.length = 2 ,
      this.firstarr.push(val)      
      this.firststr = this.firstarr.join('||')
      if( this.firststr == this.twostr ||  this.firststr == this.threestr ) {
        this.companyQual = ''
         this.$confirm('当前条件已选择，请重新选择资质条件', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } else {
         this.fisrtpush()
      }
     
    },
    fisrtpush() {
      if(this.twostr) {
        if(this.threestr) {
          this.allarr.push(this.firststr,this.twostr,this.threestr) 
        } else {
          this.allarr.push(this.firststr,this.twostr) 
        }
      } else {
        if(this.threestr) {
          this.allarr.push(this.firststr,this.threestr) 
        } else {
          this.allarr.push(this.firststr) 
        }
      }
    },
    twoq(val) {
      this.twoarr = []
      this.allarr = []
      this.twoarr.push(val)
      this.twostr = this.twoarr.join("||")
      this.twopush()
    },
    twoqs(val) {
      this.twoarr.length = 1
      this.allarr = []
      this.twoarr.push(val)
      this.twostr = this.twoarr.join("||")
      this.twopush()

    },
    twoqss(val) {
      this.twoarr.length = 2
      this.allarr = []
      this.twoarr.push(val)
      this.twostr = this.twoarr.join("||")
        if( this.twostr == this.firststr ||  this.twostr == this.threestr ) {
        this.twoQual = ''
         this.$confirm('当前条件已选择，请重新选择资质条件', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } else {
         this.twopush()
      }
      
     
    },
    twopush() {
      if(this.firststr) {
        if(this.threestr ) {
            this.allarr.push(this.firststr,this.twostr,this.threestr) 
        } else {
            this.allarr.push(this.firststr,this.twostr) 
        }
      } else {
        if(this.threestr ) {
            this.allarr.push(this.threestr,this.twostr) 
        } else {
              this.allarr.push(this.twostr) 
        }
      }
    },
    threeq(val){
      this.threearr = []
      this.allarr = []
      this.threearr.push(val)
      this.threestr = this.threearr.join("||")
      this.threepush()
    },
    threeqs(val){
      this.threearr.length = 1
      this.allarr = []
      this.threearr.push(val)
      this.threestr = this.threearr.join("||")
      this.threepush()
    },
    threeqss(val){
      this.threearr.length = 2
      this.allarr = []
      this.threearr.push(val)
      this.threestr = this.threearr.join("||")
       if( this.threestr == this.twostr ||  this.firststr == this.threestr ) {
        this.threeQual = ''
         this.$confirm('当前条件已选择，请重新选择资质条件', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } else {
          this.threepush()
      }
     
    },
    threepush(){
      if(this.firststr) {
        if(this.twostr ) {
            this.allarr.push(this.firststr,this.twostr,this.threestr) 
        } else {
            this.allarr.push(this.firststr,this.threestr) 
        }
      } else {
        if(this.twostr ) {
            this.allarr.push(this.threestr,this.twostr) 
        } else {
              this.allarr.push(this.threestr) 
        }
      }
    },
    crela(el) {
      this.rangeType = el.key
    },
    Goto(val) {
      this.current = val.cur;
      sessionStorage.setItem('pageNo',val.cur);
      document.documentElement.scrollTo(0,492);
      this.companylisy=[];
      this.loading = true
      this.again()
    },
    entitle(val) {      
      this.title = val.cur
      this.current = 1
      this.loading = true
      this.allstr = this.allarr.join(",")
      this.loading = true
      if(this.rank == 0 ) {
        this.gainCompany()
      } else {
        companys({regisAddress:this.area,minCapital:this.low,maxCapital:this.high,qualCode:this.allstr,pageNo:this.current,pageSize:20,levelRank:'',rangeType:this.rangeType,keyWord:this.title}).then(res => {
        this.companylisy = res.data
        this.total = res.total
        this.loading = false
        this.present = res.pageNum
        if(this.total == 0 ) {
           this.Snone = true
         } else {
           this.Snone = false
         }
       })
      }
    },
    store(el) {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.setItem('id',el.comId)
      localStorage.setItem('name',el.comName)
    },
    toTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    decide(el) {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken') ) {
          const { href } = this.$router.resolve({
          path:'/introduce',query:{id:el.comId,name:el.comName,source:el.regisAddress} 
        })
        window.open(href, '_blank', )
      } else {
         this.$confirm('暂无权限，请先登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/logo')
        }).catch(() => {
               
        });
      }
    }
  },
  created () {
    this.area = this.state
    if(sessionStorage.getItem('pageNo')){
      this.current=sessionStorage.getItem('pageNo')*1;
    }
    this.title = localStorage.getItem('title') ?  localStorage.getItem('title'): ''
    this.toTop()
    this.gainFilter()
    this.gainCompany()
  },
  components: {
  }
}
</script>
<style lang="less" >
.company {
  background: #FAFAFA;
  width: 100%;
  padding-top: 86px;
  .total {
    width: 1020px;
    color:#666;
    font-size: 14px;
    margin: 10px auto;
    span {
      color:#EC7522;
    }
  }
  .el-loading-spinner .path {
    stroke: #FE6603;
  }
  .el-loading-spinner .el-loading-text {
    color:#FE6603;
  }
  .noneS {
    width: 1020px;
    margin: 0 auto;
    background-color: #fff;
    height: 582px;
    margin-bottom: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .c-red {
    color:#FE0303;
    font-size: 12px;
  }
 
  .c-search {
     width: 1020px;
     background-color: #fff;
     margin: 20px auto 0;
     padding: 15px 15px 0px 15px;
     box-sizing: border-box;
     font-size: 16px;
     .select {
       font-size: 16px;
       margin-bottom: 10px;
       .el-select {
        width: 225px;
        margin-right: 10px;
      }
      .el-checkbox-button__inner {
        border: none;
        margin-bottom: 12px;
        font-size: 15px;
        padding: 5px 10px;
        color:#000;
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        color:#000;
        background-color: #FE6603;
        border-color: #FE6603;
        box-shadow: -1px 0 0 0 #fff; 
      }
      .el-checkbox-button:first-child .el-checkbox-button__inner {
        border-radius: 0;
      }
       .t-5 {
         margin-top: 5px;
       }
       .ttt {
         display: flex;
         .el-input {
           width: 30%;
         }
         .el-input__inner {
           height: 30px;
           line-height: 30px;
         }
         .in-line {
           width: 26px;
           height: 1px;
           background-color: #999;
           margin: auto 14px;
         }
         .t-btn {
           width: 50px;
           height: 26px;
           text-align: center;
           line-height: 26px;
           margin-left: 30px;
           background-color: #FE6603;
           font-size: 14px;
           color: #fff;
           border-radius: 5px;
           margin-top: 2px;
           cursor: pointer;
         }
       }
       .pro {
         li {
           padding: 2px 7px;
           height: 20px;
           text-align: center;
           line-height: 20px;
           margin-bottom: 10px;
           color:#666;  
           cursor: pointer;
         }
         .l-30 {
           margin-top: 5px;       
         }
         
       }
      .el-select {
        width: 225px;
        margin-right: 10px;
      }
      .op-c{
         color:#fff;
      }
      .sty-del {
        color: #FE6603;
        cursor: pointer;
      }
      .current {
           background-color: #FE6603 !important;
           color:#fff !important;
       }
      .c-btn {
        color: #FE6603;
        height: 28px;
        line-height: 28px;
        border: 1px solid #FE6603;
        width: 92px;
        border-radius: 5px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        margin-right: 30px;
      }
      .c-rela {
        width: 60px;
        height: 25px;
        line-height: 25px;
        background-color: #DDDDDD;
        text-align: center;
        font-size: 14px;
        margin-right: 30px;
        cursor: pointer;
      }
     }
     .m-20 {
       margin-top: 20px;
       overflow: hidden;
     }

  }
   .firm {
     width: 1020px;
     background: #fff;
     margin: 0 auto;
     overflow: hidden;
     .firm-ul {
       
       div,a {
         height: 70px;
         line-height: 70px;
         border-bottom: 1px solid #f2f2f2;
         text-align: center;
         overflow: hidden;
         color:#999;
         .t-size {
           font-size: 14px;
           color:#000;           
         }
         .c-col {
           color:#FE6603;
            cursor:pointer;
         }
       }
     }
   }
   .c-page {
       width:1020px;
       margin: 0 auto 210px;
       height: 210px;
       background-color:#fff;
       padding-top: 70px;
       display: flex;
       justify-content: center;

     }
}
</style>
