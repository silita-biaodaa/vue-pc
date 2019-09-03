<template>
<div class="l-search" @keydown.13="searchFn">
   <div class='app-fff'>
        <el-row class="app-search"> 
         <el-col :span="7">
             <div class="bor">
                 <div class="logo left" @click="$router.push('/home')">

                 </div>
             </div>
         </el-col>
         <el-col :span="16">
            <div class="bor">
                <ul class="search">
                   <li class="left" v-for="(el,i) of selects " :key="i"  @click="seaI(el)" :class=" i == rank ? 'ranks' : ''">
                       {{el.name}}  
                   </li>
                </ul>
                <div style="position:relative;">
                   <el-input :placeholder="placeTxt" v-model="select" class="input-with-select" clearable autofocus @clear="clearFn" ref="iput">
                      <el-button slot="append" @click="searchFn" >搜索</el-button>
                   </el-input>
                   <div class="right  syn"  @click="jump" >
                      综合查询
                   </div>
                   <div class="company-serach" v-if="(!company&&select!=null&&select.length>0)&&tipsShow">
                     <ul>
                       <li v-for="(o,i) of serachList" :key="i" @click="comNameFn(o)">{{o.com_name}}</li>
                     </ul>
                   </div>
                </div>
                <div class="hisgory" v-if="list&&list.length>0">
                  <span>历史搜索：</span>
                  <span v-for="(o,i) of list" :key="'hisgory'+i" @click="hisgoryFn(o)">{{o.title}}</span>
                </div>
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
           name:'业绩',
           to:'/perfor',
           i: 3
         },
         {
           name:'人员',
           to:'/crew',
           i: 4
         },
         {
           name:'在建',
           to:'/build',
           i: 5
         },
         {
           name:'法务',
           to:'/law',
           i: 6
         },
       ],
     select:'',
     rank:0,
     way:'/bid',
     placeTxt:'请输入公告名称或企业名称',
     serachList:[],
     list:[],
     tipsShow:true,
    }
  },
  methods: {
    clearFn(){
      this.$refs.iput.focus();
      this.searchFn();
    },
    seaI(el) {
      this.rank = el.i
      if(el.i==6){
        this.tipsShow=false;
      }
      this.way = el.to
    },
    mapping() {
      if(this.$route.fullPath == '/home') {
        this.way = '/bid'
      } else {
        this.way = this.$route.fullPath
      }
      
    },
    jump() {
      let url=this.$router.resolve({
        path:'/synth'
      })
      window.open(url.href,'_blank')
    },
    forinList(){
      if(this.select!=''&&this.serachList.length>0){
        for(let x of this.serachList){
          if(x.com_name==this.select){
            return {isC:true,data:x}
          }
        }
      }else{
        return {isC:false}
      }
      
    },
    searchFn(){
      if(this.forinList()&&this.forinList().isC){//搜索公司
        this.comNameFn(this.forinList().data);
      }else{
        this.engine()
      }      
    },
    engine() {
      /*历史记录 start*/
      if(this.select!=''){
        let obj1={
          title:this.select,
          isCompany:false
        }
        if(localStorage.getItem('historys')){//如果本地有值
          let obj=JSON.parse(localStorage.getItem('historys'));
          if(this.way=='/bid'){
            this.forinHistory(obj.bid,obj1);
            this.list=obj.bid;
          }else if(this.way=='/tender'){
            this.forinHistory(obj.tender,obj1);
            this.list=obj.tender;
          }else if(this.way=='/company'){
            this.forinHistory(obj.company,obj1);
            this.list=obj.company;
          }else if(this.way.indexOf('/perfor')>-1){
            this.forinHistory(obj.perfor,obj1);
            this.list=obj.perfor;
          }else if(this.way=='/crew'){
            this.forinHistory(obj.crew,obj1);
            this.list=obj.crew;
          }else if(this.way=='/build'){
            this.forinHistory(obj.build,obj1);
            this.list=obj.build;
          }else if(this.way=='/law'){
            this.forinHistory(obj.law,obj1);
            this.list=obj.law;
          }
          localStorage.setItem('historys',JSON.stringify(obj));
        }else{
          let obj={
            bid:[],
            tender:[],
            company:[],
            perfor:[],
            crew:[],
            build:[],
            law:[]
          }
          if(this.way=='/bid'){
            obj.bid.unshift(obj1);
            this.list=obj.bid;
          }else if(this.way=='/tender'){
            obj.tender.unshift(obj1);
            this.list=obj.tender;
          }else if(this.way=='/company'){
            obj.company.unshift(obj1);
            this.list=obj.company;
          }else if(this.way.indexOf('/perfor')>-1){
            obj.perfor.unshift(obj1);
            this.list=obj.perfor;
          }else if(this.way=='/crew'){
            obj.crew.unshift(obj1);
            this.list=obj.crew;
          }else if(this.way=='/build'){
            obj.build.unshift(obj1);
            this.list=obj.build;
          }else if(this.way=='/law'){
            obj.law.unshift(obj1);
            this.list=obj.law;
          }
          localStorage.setItem('historys',JSON.stringify(obj));
        }
      }
      /*历史记录end*/

      this.tipsShow=false;
      localStorage.removeItem('title')
      localStorage.removeItem('way')  
      if(this.$route.fullPath.indexOf('perfor')== 1) {
        if(this.way.indexOf('perfor') == 1) {
          this.$emit('vague',{cur:this.select});
        } else { 
          localStorage.setItem('title',this.select)
          localStorage.setItem('way',this.way)  
          this.$router.push({path:this.way})
        }
          this.$emit('vague',{cur:this.select});
      } else {
         if(this.$route.fullPath == this.way) {
          this.$emit('vague',{cur:this.select});
        } else { 
          localStorage.setItem('title',this.select)
          localStorage.setItem('way',this.way)  
          this.$router.push({path:this.way})
        }
      }
    },
    forinHistory(arr,obj){//判断数组中是否有某条记录，如果没有则添加到最前，如果有则移到最前
      for(let x in arr){
        if(arr[x].title==obj.title){
          arr.splice(x,1)
          break
        }
      }
      arr.unshift(obj);
      return arr
    },
    paths() {
       if(this.$route.path == '/' || this.$route.path == '/bid' ) {
          this.rank = 0
       } else if (this.$route.path == '/tender') {
          this.rank = 1
       } else if (this.$route.path == '/company') {
          this.rank = 2
       } else if (this.$route.fullPath.indexOf('perfor') == 1 ) {
         this.rank = 3
       } else if (this.$route.path == '/crew') {
         this.rank = 4
       } else if (this.$route.path == '/build') {
         this.rank = 5
       }else if(this.$route.path == '/law'){
         this.rank = 6
       }
    },   
    reloca() {      
      if(this.$route.fullPath == localStorage.getItem('way')) {
         this.select = localStorage.getItem('title')
      } else  {
          if(localStorage.getItem('way')) {
              if (this.$route.fullPath.indexOf('perfor') == 1 &&  localStorage.getItem('way').indexOf('perfor') == 1 )  {
                 return this.select = localStorage.getItem('title')
              }
          }
         localStorage.removeItem('title')
         this.select = ''
      }
    },
    comNameFn(o){
      this.tipsShow=false;
      this.select=o.com_name;
      /*历史记录 start*/ 
      let obj1={
        title:this.select,
        isCompany:true,
        comId:o.comId,
      }
      if(localStorage.getItem('historys')){//如果本地有值
        let obj=JSON.parse(localStorage.getItem('historys'));
        if(this.way=='/bid'){
          this.forinHistory(obj.bid,obj1);
          this.list=obj.bid;
        }else if(this.way=='/tender'){
          this.forinHistory(obj.tender,obj1);
          this.list=obj.tender;
        }else if(this.way=='/company'){
          this.forinHistory(obj.company,obj1);
          this.list=obj.company;
        }else if(this.way.indexOf('/perfor')>-1){
          this.forinHistory(obj.perfor,obj1);
          this.list=obj.perfor;
        }else if(this.way=='/crew'){
          this.forinHistory(obj.crew,obj1);
          this.list=obj.crew;
        }else if(this.way=='/build'){
          this.forinHistory(obj.build,obj1);
          this.list=obj.build;
        }
        localStorage.setItem('historys',JSON.stringify(obj));
      }else{
        let obj={
          bid:[],
          tender:[],
          company:[],
          perfor:[],
          crew:[],
          build:[]
        }
        if(this.way=='/bid'){
          obj.bid.unshift(obj1);
          this.list=obj.bid;
        }else if(this.way=='/tender'){
          obj.tender.unshift(obj1);
          this.list=obj.tender;
        }else if(this.way=='/company'){
          obj.company.unshift(obj1);
          this.list=obj.company;
        }else if(this.way.indexOf('/perfor')>-1){
          obj.perfor.unshift(obj1);
          this.list=obj.perfor;
        }else if(this.way=='/crew'){
          obj.crew.unshift(obj1);
          this.list=obj.crew;
        }else if(this.way=='/build'){
          obj.build.unshift(obj1);
          this.list=obj.build;
        }
        localStorage.setItem('historys',JSON.stringify(obj));
      }
      /*历史记录end*/

      localStorage.removeItem('title')
      localStorage.removeItem('way')
      sessionStorage.removeItem('searchType')
      sessionStorage.removeItem('companyId');    
      sessionStorage.setItem('companyId',o.comId); 
      if(this.$route.fullPath.indexOf('perfor')== 1) {
        if(this.way.indexOf('perfor') == 1) {
          this.$emit('company',{cur:this.select});
        } else { 
          localStorage.setItem('title',this.select)
          sessionStorage.setItem('searchType',1)
          localStorage.setItem('way',this.way)  
          this.$router.push({path:this.way})
        }
          this.$emit('company',{cur:this.select});
      } else {
         if(this.$route.fullPath == this.way) {
          this.$emit('company',{cur:this.select});
        } else { 
          localStorage.setItem('title',this.select)
          sessionStorage.setItem('searchType',1)
          localStorage.setItem('way',this.way)  
          this.$router.push({path:this.way})
        }
      }
    },
    hisgoryFn(el){
      this.tipsShow=false;
      this.select=el.title;
      if(el.isCompany){//公司
        localStorage.removeItem('title')
        localStorage.removeItem('way')
        sessionStorage.removeItem('searchType')
        sessionStorage.removeItem('companyId');     
        if(this.$route.fullPath.indexOf('perfor')== 1) {
          sessionStorage.setItem('companyId',el.comId)
          if(this.way.indexOf('perfor') == 1) {
            this.$emit('company',{cur:this.select});
          } else { 
            localStorage.setItem('title',this.select)
            sessionStorage.setItem('searchType',1)
            localStorage.setItem('way',this.way)  
            this.$router.push({path:this.way})
          }
            this.$emit('company',{cur:this.select});
        } else {
          if(this.$route.fullPath == this.way) {
            this.$emit('company',{cur:this.select});
          } else { 
            localStorage.setItem('title',this.select)
            sessionStorage.setItem('searchType',1)
            localStorage.setItem('way',this.way)  
            this.$router.push({path:this.way})
          }
        }
      }else{
        localStorage.removeItem('title')
        localStorage.removeItem('way')  
        if(this.$route.fullPath.indexOf('perfor')== 1) {
          if(this.way.indexOf('perfor') == 1) {
            this.$emit('vague',{cur:this.select});
          } else { 
            localStorage.setItem('title',this.select)
            localStorage.setItem('way',this.way)  
            this.$router.push({path:this.way})
          }
            this.$emit('vague',{cur:this.select});
        } else {
          if(this.$route.fullPath == this.way) {
            this.$emit('vague',{cur:this.select});
          } else { 
            localStorage.setItem('title',this.select)
            localStorage.setItem('way',this.way)  
            this.$router.push({path:this.way})
          }
        }
      }
    },
    forinHis(name){//判断数组中是否有某条记录
      let arr=this.list;
      for(let x in arr){
        if(arr[x].title==name){
          return true
        }
      }
      return false
    },
  },
  props:{
    title:{
      default:''
    },
    company:{
      default:false
    }
  },
  created () {
    this.tipsShow=true;
    this.reloca() 
    if(this.title!=''){
      this.select=this.title;
    }
    if(localStorage.getItem('historys')){//如果本地有值
      let obj=JSON.parse(localStorage.getItem('historys'));
      if(this.way=='/bid'){
        this.list=obj.bid;
      }else if(this.way=='/tender'){
        this.list=obj.tender;
      }else if(this.way=='/company'){
        this.list=obj.company;
      }else if(this.way.indexOf('/perfor')>-1){
        this.list=obj.perfor;
      }else if(this.way=='/crew'){
        this.list=obj.crew;
      }else if(this.way=='/build'){
        this.list=obj.build;
      }
    }
    this.paths()
    this.mapping()
  },
  computed: {
    // synth() {
    //   if(this.$route.name == 'company') {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  },
  watch: {
    $route(to,form) {
      // this.tipsShow=true;
      if(form.name == 'water' && (to.name == 'perlist' || to.name == 'road' ) ) {
        this.select = ''
      }else if (form.name == 'road' && (to.name == 'perlist' || to.name == 'water' ) ) {
        this.select = ''
      }else if (form.name == 'perlist' && (to.name == 'road' || to.name == 'water' ) ) {
        this.select = ''
      };
    },
    rank(newValue,old){
      // this.tipsShow=true;
      let obj=localStorage.getItem('historys')?JSON.parse(localStorage.getItem('historys')):'';
      if(newValue==0||newValue==1){
        this.placeTxt='请输入公告名称或企业名称';
        if(newValue==0){
          this.list=obj.bid||[];
        }else{
          this.list=obj.tender||[];
        }
      }else if(newValue==2){
        this.placeTxt='请输入企业名称或法人名称';
        this.list=obj.company||[];
      }else if(newValue==3){
        this.placeTxt='请输入项目名称或企业名称';
        this.list=obj.perfor||[];
      }else if(newValue==4){
        this.placeTxt='请输入注册人员姓名或企业名称';
        this.list=obj.crew||[];
      }else if(newValue==5){
        this.placeTxt='请输入姓名或身份证号';
        this.list=obj.build||[];
      }else if(newValue==6){
        this.placeTxt='请输入法务信息关键词';
        this.list=obj.law||[];
      }
    },


    select(newVal,old){
      if(newVal==''||this.company){
        return false
      }
      if(newVal.indexOf('公司')==-1){
        this.tipsShow=true;
      }
      if(this.forinHis(newVal)){
        this.tipsShow=false
        return false
      }

      let that=this;
      let regisAddress=sessionStorage.getItem('address');
      this.$http({
          method:'post',
          url: '/company/matchName',
          data:{
            name:newVal,
            regisAddress:regisAddress,
          }
      }).then(function(res){
          that.serachList=res.data.data;
      }).catch(function(res){

      })
    },
    title(newVal,old){
      this.select=newVal
    }
  },
  components: {
  }
}
</script>
<style lang="less" >
.l-search {
  .app-fff {
    width: 100%;
    background-color: #fff;
  }
  .app-search {
     width: 1160px;
     margin: 0 auto;
  }
  .bor {
    //  overflow: hidden;
     height: 149px;
    //  clear: both;
     .el-input-group{
       width: 588px;
       font-size: 18px;
       .el-input-group__append, .el-input-group__prepend {
         width: 113px ;
         padding: 0;
         background-color: #EC7522;
         text-align: center;
         color:#fff;
         border: 1px solid #EC7522;
         font-weight: 500;
         .el-button {
           font-family:Tahoma,Arial,"Helvetica Neue","Hiragino Sans GB",Simsun,sans-self !important;
           width: 100%;
         }
       }
     }
     .logo {
       background: url(../assets/img/logo.png) no-repeat;
       margin-top: 75px;
       height: 47px;
       width: 158px;
       margin-right: 21px;
       cursor: pointer;
     }
     .search {
       margin-top: 50px;
       margin-bottom: 10px;
       font-size: 16px;
       width: 648px;
       overflow: hidden;
       .ranks {
         color: #FE6603;
       }
       li {
         width: 13%;
         cursor: pointer;
       }
     }
     .syn {
       line-height: 40px;
       font-size: 16px;
       color:#FE6603;
       cursor: pointer;
     } 
   }


  /*搜索企业*/
  .company-serach{
    z-index: 9;
    background: #fff;
    position: absolute;
    border: 1PX solid #d0dbe5;
    border-top: none;
    width: calc(100% - 207px);
    box-sizing: border-box;
    ul li{
      line-height: 24px;
      padding-left: 10px;
      box-sizing: border-box;
      cursor: pointer;
    }
    li:hover{
      color: #FE6603;
    }
  }

  /*历史记录*/
  .hisgory{
    margin-top: 18px;
    max-width:calc(100% - 207px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    span{
      margin-right: 15px;
      font-size: 14px;
      cursor: pointer;
      color: #999;
    }
    span:first-child{
      margin-right: 0;
      cursor:default;
    }
  }
}
</style>