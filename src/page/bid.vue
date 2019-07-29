 <template>
   <div class="bid"> 

      <en-search @vague='entitle' :title="serach" @company="companyFn"></en-search>
      <div class="options">
        <div class="select">
          <el-row>
             <el-col :span='2'>
                省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:
             </el-col>
             <el-col :span='22' >
               <ul class='pro' >
                 <li v-for='(el,i) in areas' :key='i' class='left bid-p' :class="el.code==area? 'current':''"  @click='eval(el)' >
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
                      <li v-for='(el,i) in projectTypes' :key='"1"+i' class='left' :class="el.projectType == data.projectType ? 'current':''"  @click='evalclass(el)' >
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
           
             <el-select v-model="major" placeholder="请选择" clearable  @change='spliceo' v-if="majors.length>0">
              <el-option
                v-for="item in majors"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
             <el-select v-model="grade" placeholder="请选择" clearable   @change='splicet' v-if="grades.length>0">
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
        共找到<span>{{total}}</span>条招标公告
      </div>
      <!-- 判断是否加载中 -->
      <template v-if="isajax">
          <!-- 有数据 -->
          <template v-if="queryLists&&queryLists.length>0">
            <div class="bid-content">
              <a  v-for="(el,i ) of queryLists" :key="'3'+i" @click='decide(el)'  >
                <div class="m-bt">
                    <p class="left m-rg">
                      {{(present-1)*20+(i+1)}}
                    </p>
                    <p class="left super" :title='el.title' >
                      {{el.title}}         
                    </p>
                    <p class="right">
                      {{el.openDate}}
                    </p>
                </div>
                <div class="aptitude">
                  <p class="left surplus" :title='el.certificate' >
                      资质要求:{{el.certificate ? el.certificate : '详见原文' }}
                  </p>
                  <p class="right">
                      评标办法:{{el.pbMode ? el.pbMode : '详见原文'}}
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
          </template>
          <!-- 无数据  -->
          <template v-else-if="queryLists&&queryLists.length==0">
            <div class="no-toast">
              <img src="../assets/img/bank_card @2x.png" alt="">
              <span>Sorry，没有找到符合条件的公告信息</span>
            </div>
          </template>
          <!-- 加载失败 -->
          <template v-else-if="!queryLists">
            <div class="ajax-erroe">
              <img src="../assets/img/pic-zoudiu.png"/>
              <span @click="recoldFn">刷新</span>
            </div>
          </template>
      </template>
      <template v-else>
        <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
      </template>
     <!-- <div class="bid-content" v-loading="loading" element-loading-text="拼命加载中" > -->
         <!-- <router-link tag='a'  v-for="(el,i ) of queryLists" :key="i" :to="{path:'/article',query:{id:el.id,source:el.source} }" target='_blank' > -->
         
     <!-- </div> -->

    
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
      // Snone:false,
      loading:true,
      isajax:false,
      areas:[
      ],
      queryLists:[],
      projectTypes:[],
      pbMode:[],
      pbModes:[],
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
        //  com_name:'',
         pageNo:1,
         pbModes:'',
         type:'1',
         pageSize:20,
         regions:'湖南省',
         zzType:'',
         projectType:'',
         title:'',
         rangeType:''
       },
       city:'',
       searchType:0,
       serach:'',
    }
  },
   props: {
    state:''
  },
  inject:['reload'],
  watch: {
    companyQual(val) {
      this.zType = []
      this.companyQuals.forEach(el => {
         if(el.code == val ) {
            this.majors = el.data
         }
      });      
    },
    major(val) {
      this.zType = []
      this.majors.forEach(el => {
         if(el.code == val ) {
            this.grades = el.data
         }
      });
    },
    grade(val) {
      this.zType = []
    },
    state(val) {
      if(val.source == '湖南省') {
        this.Scity = true
      } else {
        this.Scity = false
      }
      this.isajax=false;
      this.area = val.code
      this.data.regions = this.area
      this.data.pageNo = 1
      // this.loading = true      
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
         this.isajax=false;
        //  this.loading = true      
         this.gainQueryList()
      } else {
        let str = val.cur.join(',')
        this.data.regions = this.area + "||" + str
        this.data.pageNo = 1
        this.isajax=false;     
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
            this.isajax=false;
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
        if(sessionStorage.getItem('searchType')||this.searchType==1){
          this.data.comName=this.serach
          this.data.title=''
        }else{
          this.data.title=this.serach
          this.data.comName=''
        }
        let that=this;
        this.$http({
          method:'post',
          data:this.data,
          url:'/newnocite/zhaobiao/list'
        }).then(res =>{
          that.isajax=true;
          if(res.data.code == 1 ) {
            //  this.loading = false
            that.total = res.data.total
            if( localStorage.getItem('permissions') == null || localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('bidFilter') == -1  ) {
              for(let x of res.data.data){
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
            that.queryLists = res.data.data
            that.present = res.data.pageNo
          }
        }).catch(function(res){
            that.isajax=true;
            that.queryLists=null;
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
            let str=JSON.stringify(this.pbModes);
            if(str.indexOf('"active":true')==-1){
              this.pbModes[0].active=true;
            }
          }
        }
        for(let x of l){
          if(x.active){
            this.pbMode.push(x.code)
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
      this.funcom.toList(615)
      this.isajax=false;   
      this.gainQueryList()
    },
    entitle(val) {
      this.searchType=0;
      this.serach = val.cur;
      this.queryLists=[];
      this.data.pageNo = 1
      this.isajax=false;      
      this.gainQueryList()
    },
    Splice() {
      // this.data.zzType=''
      // if(this.companyQual){
      //   this.data.zzType = this.companyQual
      // }
      //每次切换重置值
      this.majors=[];
      this.major='';
      this.grades=[];
      this.grade='';
      // this.queryLists=[];
      this.data.pageNo = 1
      // this.isajax=false;      
      // this.gainQueryList()
    },
    spliceo() {
      // this.zType.push(this.major)
      this.data.zzType = this.major
      this.grades=[];
      this.grade='';
      this.data.pageNo = 1
      this.isajax=false;     
       this.gainQueryList()
    },
    splicet() {
      this.zType.push(this.major,this.grade)
      this.data.zzType = this.zType.join('/')
      this.data.pageNo = 1
      this.isajax=false;      
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
    gainFilter() {
      let data=JSON.parse(sessionStorage.getItem('filter'));
      this.areas=data.area;
      this.companyQuals=data.noticeQua;
      data.type.unshift({name:'全部',projectType:''})
      this.projectTypes=data.type;
      //评标办法
      let pbArr=data.pbMode;
      let str=this.state.code;
      for(let x of pbArr){
        if(x.provice==str){
          for(let y of x.list){
            y.active=false  
          }
          x.list.unshift({name:'全部',active:true,code:''})
          this.pbModes=x.list;
          break
        }
      }
    },
    getPbmode(code){
      let data=JSON.parse(sessionStorage.getItem('filter'));
      let pbArr=data.pbMode;
      for(let x of pbArr){
        if(x.provice==code){
          for(let y of x.list){
            y.active=false  
          }
          x.list.unshift({name:'全部',active:true,code:''})
          this.pbModes=x.list;
          break
        }
      }
    },
    eval(el) {
        if(el.name == '湖南省') {
          this.Scity = true
        } else {
          this.Scity = false
        }
        this.getPbmode(el.code);
        this.area = el.code
        sessionStorage.setItem('address',el.name)
        /* 地址修改后   重置serach以及type*/
        this.serach='';
        this.searchType=0
        /*end*/
        this.data.regions = this.area
        this.data.pageNo = 1
        this.isajax=false;
        this.gainQueryList()
    },
    evalclass(el) {
        if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
            if( localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('bidFilter') == -1  ) {
              this.svip = true
              this.modalHelper.afterOpen();
            } else {
             this.data.projectType = el.projectType
             this.data.pageNo = 1
             this.isajax=false; 
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
      if(this.area  == 'hunan') {
        this.Scity = true
      } else {
        this.Scity = false
      }
    },
    //企业搜索
    companyFn(val){
      this.queryLists=[];
      this.searchType=1;
      this.serach =val.cur;
      this.data.pageNo = 1
      this.isajax=false;     
      this.gainQueryList()
    },
    //刷新
    recoldFn(){
      this.reload();
    }  
  },
  created () {
    if(sessionStorage.getItem('pageNo')){
      this.data.pageNo=sessionStorage.getItem('pageNo')*1;
    }
    this.area = this.state.code
    this.data.regions = this.area
    this.serach = localStorage.getItem('title') ? localStorage.getItem('title') : '';
    //如果是刷新操作，则复现上次
    if(sessionStorage.getItem('bidSerach')){
      let data=JSON.parse(sessionStorage.getItem('bidSerach'));
      this.serach=data.title!=''?data.title:data.comName;
      if(data.comName!=''){
        this.searchType=1
      }else{
        this.searchType=0
      }
      this.data=data;
      if(data.regions.indexOf('||')>-1){//省市
        let arr=data.regions.split('||');
        this.state.code=data.regions
        this.area=arr[0];
        this.city=arr[1];
      }else{
        this.area=data.regions;
        this.state.code=data.regions
      }
      //评标办法
      if(data.pbModes!=''){
        let arr2=data.pbModes.split('||');
        this.pbModes[0].active=false;
        for(let x of this.pbModes){
          for(let y of arr2){
            if(x.code==y){
              x.active=true;
              break
            }
          }
        }
      }
      //资质
      if(data.zzType&&data.zzType!=''){
        let arr1=data.zzType.split('/');
        // this.companyQual=arr1[0];
        for(let x of this.companyQuals){
          for(let y of x.data){
            if(y.code==arr1[0]){
              this.companyQual=x.code;
              break
            }
          }
        }
        // for(let x of this.companyQuals){
        //   if(arr1[0]==x.code){
        //     this.majors=x.list
        //     break
        //   }
        // }
        this.major=arr1[0];
        // for(let y of this.majors){
        //   if(arr1[1]==y.code){
        //     this.grades=y.list
        //     break
        //   }
        // }
        this.grade=arr1[1]
      }
    }
    this.gainFilter();
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
     min-height: 240px;
     margin: 0 auto;
     width: 1020px;
     box-sizing: border-box;
     background: #fff;
     font-size: 16px;
     margin-bottom:125px;
     .page {
      //  height:100px;
        padding-bottom: 75px;
        padding-top:50px;
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