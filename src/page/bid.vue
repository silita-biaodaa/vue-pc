 <template>
   <div class="bid"> 

      <en-search @vague='entitle' :title="data.title"></en-search>
      <div class="options">
        <div class="select">
          <el-row>
             <el-col :span='2'>
                省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:
             </el-col>
             <el-col :span='22' >
               <ul class='pro' >
                 <li v-for='(el,i) in areas' :key='i' class='left bid-p' :class="el.name==area? 'current':''"  @click='eval(el)' >
                    {{el.name}}
                 </li>
               </ul>
             </el-col>
          </el-row>
        </div>
        <c-ity @nextC='gainC' v-show='Scity' :citystr="city"></c-ity>
        <div class="select">
            <el-row>
                <el-col :span='2'>
                  类&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp型:
                </el-col>
                <el-col :span='22'>
                    <ul class='left pro' >
                      <li v-for='(el,i) in projectTypes' :key='"1"+i' class='left' :class="el.key == data.projectType ? 'current':''"  @click='evalclass(el)' >
                         {{el.name}}
                      </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
        <div class="select">
            <el-row>
               <el-col :span='2'>
                  评标办法:
               </el-col>
               <el-col :span='22'> 
                  <span class="pb-bf" v-for="(el,i) in pbModes" :key="'2'+i" :class="{'active':el.active}" @click="pbmodeFn(i)">{{el.name}}</span>
               </el-col>
            </el-row>
        </div>
        <div class="select">
           资质要求:&nbsp
              <el-select v-model="companyQual" placeholder="选择资质类型" clearable  @change='Splice'  @click.native='judvip' >
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
                :key="item.code"
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
     </div> 

      <div class="total">
        共搜索到<span>{{total}}</span>条招标公告
      </div>

     <div class="bid-content" v-show="!Snone" v-loading="loading" element-loading-text="拼命加载中" >
         <!-- <router-link tag='a'  v-for="(el,i ) of queryLists" :key="i" :to="{path:'/article',query:{id:el.id,source:el.source} }" target='_blank' > -->
         <a  v-for="(el,i ) of queryLists" :key="'3'+i" @click='decide(el)'  >
           <div class="m-bt">
              <p class="left m-rg">
                {{(present-1)*20+(i+1)}}
              </p>
              <p class="left super" :title='el.title' >
                {{el.title}}         
              </p>
              <p class="right">
                {{el.opendate}}
              </p>
           </div>
           <div class="aptitude">
             <p class="left surplus" :title='el.certificate' >
                 资质要求:{{el.certificate ? el.certificate : '详见原文' }}
             </p>
             <p class="right">
                评标办法:{{el.pbMode}}
             </p>
           </div>
         </a>
       <div class="page">
          <nav-page 
          :all='total'
          :currents='data.pageNo'
          @skip='Goto'
          ></nav-page>
       </div>
     </div>

    <div class="no-toast" v-show="Snone" >
      <img src="../assets/img/bank_card @2x.png" alt="">
      <span>Sorry，没有找到符合条件的公告信息</span>
    </div>
    <f-vip @toChildEvent='closeload' v-if='svip' ></f-vip>
   </div>
</template>
<script>
import { queryList,filter } from '@/api/index';
export default {
  data () {
    return {
      svip:false,
      area:'',
      Snone:false,
      loading:true,
      areas:[
      ],
      queryLists:[],
      projectTypes:[
        {
          name:'全部',
          key:''
        },
        {
          name:'施工',
          key:'0'
        },
        {
          name:'监理',
          key:'2'
        },
        {
          name:'采购',
          key:'3'
        },
        {
          name:'设计',
          key:'1'
        },
        {
          name:'勘察',
          key:'4'
        },
        {
          name:'其他',
          key:5
        }
      ],
      pbMode:[],
      pbModes:[
        {
          name:'全部',
          key:'',
          active:true,
        },
         {
          name:"综合评估法Ⅰ",
          key:"综合评估法Ⅰ",
          active:false,
        },
        {
          name:"综合评估法Ⅱ",
          key:"综合评估法Ⅱ",
          active:false,
        },
       
        {
          name:"固定标价评分法",
          key:"固定标价评分法",
          active:false,
        },
        {
          name:"合理定价抽取法",
          key:"合理定价抽取法",
          active:false,
        },
        {
          name:"技术评分最低标价法",
          key:"技术评分最低标价法",
          active:false,
        },
        {
          name:"合理低价法",
          key:"合理低价法",
          active:false,
        },
        {
          name:"经评审最低报价法",
          key:"经评审最低报价法",
          active:false,
        },
        {
          name:"百分制综合评分法",
          key:"百分制综合评分法",
          active:false,
        },
        {
          name:"其他",
          key:"其他",
          active:false,
        }
      ],
      companyQual:'',
      companyQuals:[],
      major:'',
      majors:[],
      grade:'',
      grades:[],
      zType:[],
      total:0,
      selects:[
         {
           name:'招标',
           to:'/bid',
           i: 0
         },
         {
           name:'中标',
           to:'/tender',
           i: 1
         },
         {
           name:'企业',
           to:'/company',
           i: 2
         },
         {
           name:'诚信',
           to:'/faith',
           i: 3
         },
       ],
       present:0,
       Scity:true,
       data:{
         pageNo:1,
         pbModes:'',
         type:'0',
         pageSize:'20',
         regions:'湖南省',
         zzType:'',
         projectType:'',
         title:''
       },
       city:''
    }
  },
   props: {
    state:''
  },
  watch: {
    companyQual(val) {
      this.zType = []
      this.companyQuals.forEach(el => {
         if(el.code == val ) {
            this.majors = el.list
         }
      });      
    },
    major(val) {
      this.zType = []
      this.majors.forEach(el => {
         if(el.code == val ) {
            this.grades = el.list
         }
      });
    },
    grade(val) {
      this.zType = []
    },
    state(val) {
      if(val == '湖南省') {
        this.Scity = true
      } else {
        this.Scity = false
      }
      this.area = val
      this.data.regions = this.area
      this.data.pageNo = 1
      this.loading = true      
      this.gainQueryList()
    },
    data:{//监听data变化，并实时保存
      deep:true,
      handler(val,old){
        sessionStorage.setItem('bidSerach',JSON.stringify(val));
      }
    }
  },
  methods: {
    gainC(val){
      if(val.cur.length == 0 ) {
         this.data.regions = this.area
         this.data.pageNo = 1
         this.loading = true      
         this.gainQueryList()
      } else {
        let str = val.cur.join(',')
        this.data.regions = this.area + "||" + str
        this.data.pageNo = 1
        this.loading = true      
        this.gainQueryList()
      }
    },
    closeload(val) {
      this.svip = val.cur
    },
    gainlist() {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
          if( localStorage.getItem('permissions') == ''   ) {
            this.svip = true
            this.modalHelper.afterOpen();
          } else {
            this.data.pageNo = 1
            this.loading = true 
            this.gainQueryList()
          }
      } else {
          
          this.$confirm(this.qjTipTxt, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.$router.push('/logo')
          }).catch(() => {

          });
      }
      
    },
    gainQueryList() {
                    //  页号              评标办法                   页面显示条数      地区              资质类型                类型
       queryList(this.data).then( res => {
         if(res.code == 1 ) {
           this.loading = false
           this.total = res.total
           if( localStorage.getItem('permissions') == null || localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('bidFilter') == -1  ) {
                for(let x of res.data){
                   if(x.certificate){
                     x.certificate=x.certificate.replace(/特|一|二|三|四|五|甲|乙|丙|丁/g,'*')
                    
                   }
                    if( x.pbMode) {
                      let xin  = x.pbMode.length
                      x.pbMode = '*'   
                      for (var i = 1; i<xin; i++ ) {
                        x.pbMode = x.pbMode + '*'
                      }
                    } 

                  } 
            }
           this.queryLists = res.data
           this.present = res.pageNo
           if(this.total == 0 ) {
             this.Snone = true
           } else {
             this.Snone = false
           }
         }
       })
    },
    pbmodeFn(i){
      if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        if( localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('bidFilter') == -1  ) {
          this.svip = true
          this.modalHelper.afterOpen();
          this.pbMode = [];
          return false
        }
        this.pbMode=[];
        this.data.pbModes='';
        let l=this.pbModes;
        if(i==0){
          for(let x of l){
            x.active=false
          }
          this.pbModes[0].active=true;
        }else{
          
          if(!this.pbModes[i].active){
            this.pbModes[0].active=false;
            this.pbModes[i].active=true;
          }else{
            // this.pbModes[0].active=false;
            this.pbModes[i].active=false;
          }
        }
        for(let x of l){
          if(x.active){
            this.pbMode.push(x.key)
          }
        }
        this.data.pbModes = this.pbMode.join('||');
        if(i==0){
          this.data.pbModes=''
        }
        this.data.pageNo = 1
        this.gainQueryList()
      }else{
        this.$confirm(this.qjTipTxt, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/logo')
        }).catch(() => {

        });
        return false
      }
      
    },
    Goto(val) {
      this.data.pageNo = val.cur;
      sessionStorage.setItem('pageNo',val.cur);
      this.queryLists=[];
      this.funcom.toList(530)
      this.loading = true      
      this.gainQueryList()
    },
    entitle(val) {
      this.data.title = val.cur
      this.data.pageNo = 1
      this.loading = true      
      this.gainQueryList()
    },
    Splice() {
      this.data.zzType = this.companyQual
      //每次切换重置值
      this.majors=[];
      this.major='';
      this.grades=[];
      this.grade='';
      this.data.pageNo = 1
      this.loading = true      
      this.gainQueryList()
    },
    spliceo() {
      this.zType.push(this.companyQual,this.major)
      this.data.zzType = this.zType.join('||')
      this.grades=[];
      this.grade='';
      this.data.pageNo = 1
      this.loading = true      
       this.gainQueryList()
    },
    judvip() {
         if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
          if( localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('bidFilter') == -1  ) {
            this.svip = true
            this.modalHelper.afterOpen();
            // this.pbMode = [""]
          }
      } else {
            this.$confirm(this.qjTipTxt, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/logo')
          }).catch(() => {

          });
      }
    },
    splicet() {
      this.zType.push(this.companyQual,this.major,this.grade)
      this.data.zzType = this.zType.join('||')
      this.data.pageNo = 1
      this.loading = true      
      this.gainQueryList()
    },
    gainFilter() {
      let data=JSON.parse(sessionStorage.getItem('filter'));
      this.areas=data.area;
      this.companyQuals=data.companyQual;
    },
    eval(el) {
        if(el.name == '湖南省') {
          this.Scity = true
        } else {
          this.Scity = false
        }
        this.area = el.name
        this.data.regions = this.area
        this.data.pageNo = 1
        this.loading = true      
        this.gainQueryList()
    },
    evalclass(el) {
        if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
            if( localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('bidFilter') == -1  ) {
              this.svip = true
              this.modalHelper.afterOpen();
            } else {
             this.data.projectType = el.key
             this.data.pageNo = 1
             this.loading = true 
             this.gainQueryList()
            }
        } else {
              this.$confirm(this.qjTipTxt, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/logo')
            }).catch(() => {

            });
        }
      
    },
    evalway(el) {
      this.pbMode = el.key
    },
     toTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    decide(el) {
      if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken') ) {
          const { href } = this.$router.resolve({
          path:'/article',query:{id:el.id,source:el.source} 
        })
        window.open(href, '_blank', )
      } else {
         this.$confirm(this.qjTipTxt, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/logo')
        }).catch(() => {
               
        });
      }
    },
    SHcity() {
      if(this.area  == '湖南省') {
        this.Scity = true
      } else {
        this.Scity = false
      }
    }  
  },
  created () {
    if(sessionStorage.getItem('pageNo')){
      this.data.pageNo=sessionStorage.getItem('pageNo')*1;
    }
    this.area = this.state
    this.data.regions = this.area
    this.data.title = localStorage.getItem('title') ? localStorage.getItem('title') : '';
    this.gainFilter();

    
    //如果是刷新操作，则复现上次
    if(sessionStorage.getItem('bidSerach')){
      let data=JSON.parse(sessionStorage.getItem('bidSerach'));
      this.data=data;
      if(data.regions.indexOf('||')>-1){//省市
        let arr=data.regions.split('||');
        this.area=arr[0];
        this.city=arr[1];
      }else{
        this.area=data.regions;
      }
      //评标办法
      if(data.pbModes!=''){
        let arr2=data.pbModes.split('||');
        this.pbModes[0].active=false;
        for(let x of this.pbModes){
          for(let y of arr2){
            if(x.name==y){
              x.active=true;
              break
            }
          }
        }
      }
      //资质
      if(data.zzType!=''){
        let arr1=data.zzType.split('||');
        this.companyQual=arr1[0];
        // for(let x of this.companyQuals){
        //   if(arr1[0]==x.code){
        //     this.majors=x.list
        //     break
        //   }
        // }
        this.major=arr1[1];
        // for(let y of this.majors){
        //   if(arr1[1]==y.code){
        //     this.grades=y.list
        //     break
        //   }
        // }
        this.grade=arr1[2]
      }
    }
    this.SHcity()
    this.toTop()
    this.gainQueryList()
    if((sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken'))&& localStorage.getItem('permissions') != ''&&localStorage.getItem('permissions').indexOf('bidFilter') != -1  ){
      this.isCompanyQual=false;
      this.isMajor=false;
      this.isGrade=false;
    }
  },
  beforeDestroy(){
    sessionStorage.removeItem('bidSerach')
  },
}
</script>
<style lang="less" >
 .bid {
   width: 100%;
   display: flex;
   flex-direction: column;
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
  // .el-loading-spinner {
  //   top: 10%;
  // }
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
   .options {
     margin: 0 auto;
     width: 1020px;
     margin-top: 20px;
    //  height: 290px;
     background: #fff;
     padding: 15px;
     box-sizing: border-box;
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
   .bid-content {
     margin: 0 auto;
     width: 1020px;
     box-sizing: border-box;
     background: #fff;
     font-size: 16px;
     margin-bottom: 185px;
     .page {
       height: 210px;
       padding-top: 70px;
       display: flex;
       justify-content: center;
     }
    //  ul {
       a {
         height: 80px;
         box-sizing: border-box;
         padding: 20px 22px 0 20px;
         border-bottom: 1px solid #f2f2f2;
         cursor:pointer;
         display: block;
         color:#333;
         .m-rg {
           margin-right: 12px;
           width: 34px;
         }
         .m-bt {
           margin-bottom: 5px;
           overflow: hidden;
           height: 25px;
           line-height: 25px;
         }
         .super {
           width: 750px;
           text-overflow: ellipsis;
           overflow: hidden;
           white-space: nowrap;
         }
         .aptitude {
           color: #EC7522;
           font-size: 14px;
           margin-left: 47px;
           .surplus {
             text-overflow: ellipsis;
             overflow: hidden;
             white-space: nowrap;
             width: 300px;
           }
         }
       }
    //  }
   }
 }
 .pb-bf{
    margin-bottom: 12px;
    font-size: 15px;
    padding: 5px 10px;
    color:#666;
    cursor: pointer;
    margin-right: 5px;
    display: inline-block;
 }
 .pb-bf.active{
    color:#fff;
    background-color: #FE6603;
    border-color: #FE6603;
    box-shadow: -1px 0 0 0 #fff; 
 }
</style>