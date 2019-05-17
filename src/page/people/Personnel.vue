<template>
<div class="personnel">
  <div class="personnel-nav">
     首页 > 人员> {{name}} > 注册证书
  </div>
  <div class="certifi-text" >
     <div >
       <img src="../../assets/img/icon-nvxing.png" alt="" v-if="sex == '女'" >
       <img src="../../assets/img/icon-nanxing.png" alt="" v-else >
       
     </div>
     <div class="certifi-del" >
       <p class="cer-name" >{{name}}</p>
       <p>身份证号码：<span>{{idCard}}</span></p>
       <p>性别：<span>{{sex ? sex : '男'}}</span></p>
     </div>
  </div>
  <div class="personnel-text" >
     <div class="user-tab" >
        <div class="tab" v-for="(el,i) in tab" :key="i" :class="el.i ? 'current' : '' " @click='jumpto(el)' >
          {{el.name}}
           <div class="nav-rim" v-show="el.i" >
             <div class="triangle">
             
             </div>
           </div>
        </div>
    </div>
    <div class="personnel-right">
        <router-view  />
    </div>
  </div>
</div> 
</template>
<script>
export default {
  data () {
    return {
      name:'',
      sex:'',
      idCard:'',
      tab:[
         {
          name:'注册证书',
          to:'',
          i: true
        },
        {
          name:'个人业绩',
          to:'',
          i: false
        },
        {
          name:'不良记录',
          to:'',
          i: false
        },
        {
          name:'变更记录',
          to:'',
          i: false
        },
        {
          name:'押证详情',
          to:'',
          i: false
        },
      ]
    }
  },
  methods: {
    jumpto(el) {

    }
  },
  created () {
    console.log(this.$route);
    this.name = this.$route.query.name
    this.idCard = this.$route.query.idCard
    this.sex = this.$route.query.sex
  },
  components: {

  }
}
</script>
<style lang="less" scoped>
.personnel{
  min-height:  calc(~"100vh - 395px");
  overflow: hidden;
  padding-top: 86px;
  width: 1020px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 200px;
  .personnel-nav {
    line-height: 40px;
    font-size: 12px;
    color:#666;
    cursor: pointer;
  }
   .certifi-text {
    height: 130px;
    padding: 17px 20px;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    .certifi-del {
      margin-left: 20px;
      font-size: 12px;
      color:#333;
      p {
        margin-bottom: 6px;
      }
      .cer-name {
        font-size: 18px;
        font-weight: 550;
        color:#000;
        margin-bottom: 16px;
      }
    }
  }
  .personnel-text {
    width: 1020px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 40px;
    .user-tab {
       width: 200px;
       font-size: 14px;
       margin-bottom: 150px;
       .tab {
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-weight: 550;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        .nav-rim {
          position: absolute;
          width: 10px;
          height: 54px;
          right: -10px;
          top: 0;
          background-color: #FE6603;
          .triangle {
            width: 0;
            height: 0;
            border-top: 6px solid #FE6603;
            border-right: 10px solid transparent;
            position: absolute;
            right: 0;
            bottom: -6px;
          }
        }
       }
        .current {
          background-color: #FE6603;
          color:#fff;
        }
     }
     .personnel-right {
       width: 100%;
       margin-left: 25px;
     }
  }
} 
</style>