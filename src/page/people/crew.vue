<template>
<div class="crew">
  <en-search @vague='entitle'></en-search>
  <div class="crew-option" >
      <per-por :state='state' @perPor='gainPor' :address="data.province" ></per-por>
      <div class="select">
            <el-row>
                <el-col :span='2'>注册类别:
                </el-col>
                <el-col :span='22'>
                    <ul class='left pro' >
                      <li v-for='(el,i) in list' :key='i' class='left' :class="el.category == data.category ? 'current':''"  @click='evalclass(el)' >{{el.category}}</li>
                    </ul>
                </el-col>
            </el-row>
     </div>
  </div>
  <div class="crew-total">
      共搜索到<span class="p-color" >{{total}}</span>条个人员信息
  </div>
   <div class="build-list">
      <div class="build-table" >
        <div style="width:80px;" >
          序号
        </div>
        <div style="width:110px;" >
          姓名
        </div>
        <div style="width:250px;" >
          注册单位
        </div>
        <div style="width:160px;" >
          注册类别
        </div>
        <div style="width:180px;" >
          执业印章号
        </div>
        <div style="width:110px;" >
          专业
        </div>
        <div style="width:130px;" >
          
        </div>
      </div>
       <a class="build-in"  v-for="(el,i) in person" :key="i"  @click="toPer(el)" > 
        <div style="width:80px;"  >
           {{(data.pageNo-1)*20+(i+1)}}
          </div>
          <div style="width:110px;" >
           {{el.name}}
          </div>
          <div style="width:250px;" >
            {{el.comName}}
          </div>
          <div style="width:160px;" >
           {{el.category}}
          </div>
          <div style="width:180px;" >
            {{el.sealNo}}
          </div>
          <div style="width:110px;" >
            {{el.major ? el.major : '--'}}
          </div>
          <div style="width:130px;" class="c-cen" >
            <div class="crew-btn"  @click.stop="jumpya(el)"  v-if="el.isUnder" >
              押证
            </div>
        </div>
      </a>
      <div class="no-toast" v-show="noList" >
        <img src="../../assets/img/bank_card @2x.png" alt="">
        <span>Sorry，没有找到符合条件的人员信息</span>
      </div>
      <div class="page"  v-show="!noList"  >
           <nav-page 
          :all='total'
          :currents='data.pageNo'
          @skip='Goto'
          ></nav-page>
      </div>
  </div>   
  <f-vip @toChildEvent='closeload' v-if='svip' ></f-vip>
</div>
</template>
<script>
import { getJsonData,Person } from '@/api/index'
export default {
  data () {
    return {
      list:[],
      total:0,
      person:[],
      noList:false,
      svip:false,
      data:{
        keyWord:'',
        category:'全部',
        pageNo:1,
        pageSize:20,
        province:''
      }
    }
  },
  created () {
    this.data.keyWord = localStorage.getItem('title') ? localStorage.getItem('title') : ''
    this.gainDetail();
    //如果是刷新操作，则复现上次
    if(sessionStorage.getItem('peopleSerach')){
      let data=JSON.parse(sessionStorage.getItem('peopleSerach'));
      if(data.category==''){
        data.category='全部'
      }
      this.data=data;
    }
    this.gainList()
  },
  props: {
    state:'',
  },
  methods: {
    closeload(val) {
      this.svip = val.cur
    },
    entitle(val) {
      this.data.keyWord = val.cur
      this.data.pageNo = 1
      this.gainList()
    },
    gainPor(val) {
      this.data.province = val.cur
      this.data.pageNo = 1
      this.gainList()
    },
    gainDetail() {
      let dataParam = JSON.stringify({
        });
        getJsonData( "/company/personCategory/0", dataParam).then(res => {
            if(res.code == 1) {
              this.list = res.data
              this.list.unshift({category:'全部'})
            }
        });
    },
    gainList(){
      let data=JSON.parse(JSON.stringify(this.data));
      data.category=data.category == '全部' ? '' :data.category;
      Person(data).then(res => {
        if(res.code == 1) {
          this.total = res.total
          this.person = res.data
          if(this.person.length == 0) {
            this.noList = true
          } else {
            this.noList = false
          }
        }
        
      })
    },
    Goto(val) {
      this.data.pageNo = val.cur;
      this.funcom.toList(450)
      this.gainList()
    },
    toPer(el) {
      if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        if(localStorage.getItem('permissions') == '') {
          this.svip = true
          this.modalHelper.afterOpen();
        } else {
          const { href } = this.$router.resolve({
              path:'/personnel',query:{certNo:el.certNo,comId:el.comId,comName:el.comName,idCard:el.idCard,sex:el.sex,tabCode:el.tabCode,name:el.name,innerid:el.innerid} 
            })
          window.open(href, '_blank', )
        }
      } else {
          this.$confirm(this.qjTipTxt, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/logo')
          })
      }
    },
    jumpya(el) {
      if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        if(localStorage.getItem('permissions') == '') {
          this.svip = true
          this.modalHelper.afterOpen();
        } else {
          const { href } = this.$router.resolve({
              path:'/personnel/escort',query:{certNo:el.certNo,comId:el.comId,comName:el.comName,idCard:el.idCard,sex:el.sex,tabCode:el.tabCode,name:el.name,innerid:el.innerid} 
            })
          window.open(href, '_blank', )
        }
      } else {
          this.$confirm(this.qjTipTxt, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/logo')
          })
      }
    },
    evalclass(el) {
      this.data.category = el.category
      this.data.pageNo = 1
      this.gainList()
    }
  },
  watch:{
    data:{//监听data变化，并实时保存
      deep:true,
      handler(val,old){
        sessionStorage.setItem('peopleSerach',JSON.stringify(val));
      }
    }
  },
  beforeDestroy(){
    sessionStorage.removeItem('peopleSerach')
  },
}
</script>
<style lang="less" scoped>
.crew {
 padding-top: 85px;
 .crew-option {
   width: 1020px;
   box-sizing: border-box;
   padding: 15px 10px 10px;
   background-color: #fff;
   font-size: 14px;
   margin: 20px auto 0;
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
 .crew-total {
   line-height: 48px;
   font-size: 14px;
   color:#666;
   width: 1020px;
   margin: 0 auto;
 }
  .build-list {
    width: 1020px;
    margin: 0 auto;
    background-color: #fff;
    margin-bottom: 200px;
    .build-table {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 60px;
      font-size: 16px;
      font-weight: 550;
      color:#333;
      text-align: center;
      border-bottom: 1px solid #f2f2f2;
    }
    .build-in {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid #f2f2f2;
      min-height: 60px;
      font-size: 16px;
      color:#999;
      cursor: pointer;
      .c-cen {
        display: flex;
        justify-content: center;
      }
      .crew-btn {
        width:80px;
        line-height: 32px;
        border:1px solid rgba(254,102,3,1);
        border-radius:5px;
        color: #FE6603;
        text-align: center;
      }
    }
    a:hover{color: #FE6603}
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
    .page {
      height: 210px;
       padding-top: 70px;
       display: flex;
       justify-content: center;
    }
  }  
}
</style>