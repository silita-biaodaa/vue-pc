<template>
<div class="about">
 <div class="ab-top" >
   <div class="top-text" >
     <div class="top-left" >
       <div class="img-bor" >
          <img src="../assets/img/pic-guanywm.png@2x.png" alt=""  @click="jump" >
       </div>
        关于我们
     </div>
     <div class="top-left" >
      <div v-if="names" ><span @click="tologo" >登录</span>&nbsp/&nbsp<span @click="toenroll" >注册</span></div> 
        <el-dropdown  v-else trigger="click"   >
          <span class="el-dropdown-link">
            {{name}}<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="z-index:2050" >
            <el-dropdown-item @click.native="user()" >个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="tocol()" >我的关注</el-dropdown-item>
            <el-dropdown-item @click.native="amend()" >修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="order()" >我的订单</el-dropdown-item>
            <el-dropdown-item @click.native="quit()"  >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
     </div>
   </div>
 </div>
  <div class="we-content">

     <div class="we-title" >
       <div class="ab-china left ">
         企业简介
       </div>
       Comfany Profile
     </div>

     <div class="ab-com">
       <div class="com-img left" >
          <img src="../assets/img/pic-qiyejj.png@2x.png" alt="">
       </div>
       <div class="com-text right" >湖南思利他网络科技有限公司注册于2017年，主要从事计算机网络平台的建设与开发
         、软件开发、数据的采集与处理、广告设计等互联网建设工作，专注于建筑行业大数据服务，致力于为建筑行业提供一个最懂建筑业的服务平台。我们坚持在互联网建筑业领域实现客户的梦想，并依靠丰富的经验和积累，用心为客户提供优质完美的产品，满足客户的需求。我们全体员工所有的行动、努力和付出，都将围绕着我们的使命和社会主义核心价值观，传承我们的追求，牢记并努力实现我们的企业价值。未来，我们坚守
         <span style="fontSize:18px;fontWeight:550" >招投标行业第一服务品牌,让用户小成本中大标</span>
         的使命，携手团队共同为中国建筑企业的进步奋发图强，做最懂建筑业的综合性服务平台。
       </div>
     </div> 

     <div class="we-title" >
       <div class="ab-china left ">
         核心产品及功能
       </div>
       CORE PRODUCTS SERVICES
     </div>

     <div class="ab-core size" >
       <div>标大大是一款服务于建筑工程领域招投标的产品，已获得国家版权局颁发的计算机软件著作权。日均新增信息量上万条，平台信息均来源覆盖全国建筑市场监管公共服务平台、地方四库一平台、全国招投标监管网、地方招投标监管网、各级政府采购网，权威可靠。标大大可用于企业投标信息参考、招投标业绩核实、信用评估等方面。
       </div>
       <div class="we-pro m-top">
         <div >核心功能为：<span style="fontSize:16px;fontWeight: 550" >查招标、查中标、查企业、查人员、查业绩、查在建、查法务。</span></div>
         <div class="m-top">1、查招标（可根据地区、类型、招标金额、关键词筛选出您想要的招标公告）
         </div>
         <div class="m-top">2、查中标（可根据地区、中标金额、关键词筛选出您想要的中标公告）
         </div>
         <div class="m-top">3、查企业（包含工商、法务、资质、人员、业绩、中标、诚信信息）
         </div>
         <div class="m-top">4、查人员（精准查询个人注册证书、个人业绩、不良记录、变更记录)
         </div>
         <div class="m-top">5、查业绩（涵盖全国住建、水利、交通业绩）
         </div>
          <div class="m-top">6、查在建（1、涵盖湖南省内所有在建信息。 2、精准查询，只要输入姓名+身份证即可查询，数据真实可靠。3、在建库实时更新，提供湖南省内注册人 员， 在建信息查询，只需输入姓名即可一键查询。4、在企业人员列表页可一目了然看到人员押证情况。）
         </div>
          <div class="m-top">7、查法务（涵盖全国建筑业，输入企业名称即可查询改公司是否有相关法务信息）
         </div>
       </div>
     </div>

      <div class="we-title" >
       <div class="ab-china left ">
         办公环境
       </div>
       OFFICE ENVIRONMENT
     </div>

     <div class="ab-core size">
      <div>公司位于美丽的星城长沙，坐落在人杰地灵的市政府板块的金峰壹号院，地理位置优越，于繁华闹市中取一方宁静。推开院门，别有洞天，两座中西合璧黑瓦白墙的现代建筑，充满禅意。院子里翠竹环绕，香樟、银杏错落有致，清静恬淡，沁人心脾。在隽秀灵动的优美生态景致中，和各位志同道合的队友一起工作、学习，涵养身心。</div>
      <div class="img-m">
        <img  src="../assets/img/pic-1@2x.png">
        <img  src="../assets/img/pic-2@2x.png">
        <img  src="../assets/img/pic-3@2x.png">
      </div>
     </div>

      <div class="we-title" >
       <div class="ab-china left ">
         员工生活
       </div>
       EMPLOYEE LIFE
     </div>

     <div class="ab-core size">
       <div>公司倡导国学和传统文化的学习，重视家庭观念，采用敏捷开发的管理模式和推崇稻盛和夫的经营哲学，不定期的举行空巴、户外团建，希望能将员工培养成对家庭有强烈责任感，对事业有高度使命感的优秀人才。</div>
     </div>
      <div class="left-img">
         <img src="../assets/img/pic-5@2x.png" alt="">
       </div>

  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      names:true
    }
  },
  methods: {
    jump() {
      this.$router.push('/')
    },
    order() {
      this.$router.push('/user/order')
    },
    tologo() {
      this.$router.push('/logo')
    },
    toenroll() {
      this.$router.push('/enroll')
    },
     judges() {
       if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
        this.name = localStorage.getItem('Bname')
        this.names = false
      } else {     
        this.names = true
      }
    },
    user() {
      this.$router.push('/user')
    },
    tocol() {
      this.$router.push('/user/fcoll')
    },
    amend() {
      this.$router.push('/user/root')
    },
     quit() {
        sessionStorage.removeItem('xtoken')
        localStorage.removeItem('Bname')
        localStorage.removeItem('Xtoken')
        localStorage.removeItem('valid')
        localStorage.removeItem('permissions')
          this.$router.replace({
           path: '/home',
         
          })
    },
  },
  created () {
    this.judges()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.about {
  .ab-top {
    // height: 40px;
    background-color: #FE6603;
    .top-text {
      width: 1020px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      height: 40px;
      .top-left {
        height: 40px;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 12px;
        .img-bor {
          cursor: pointer;
          height: 24px;
          border-right: 1px solid #fff;
          padding-right: 10px;
          margin-right: 10px;
        }
      }
    }
  }
  .we-content {
    width: 1020px;
    margin: 0 auto 200px;
    padding-top: 20px;
    background-color: #fff;
    .we-title {
      border-bottom: 1px solid #F2F2F2;
      height: 40px ;
      line-height: 40px;
      padding: 0 14px;
      font-size: 12px;
      color:#999;
      margin-bottom: 1px;
      .ab-china {
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid #FE6603;
        font-size: 16px;
        color:#FE6603;
        margin-right: 10px;
        font-weight: 550;
      }
    }
    .ab-com {
      padding: 12px 14px 0;
      overflow: hidden;
      .com-img {
        width: 215px;
        height: 180px;
        overflow: hidden;
        // margin-right: 16px;
        img {
          width: 100%;
        }
      }
      .com-text {
        width: 760px;
        font-size: 14px;
        color:#333;
        line-height: 28px;
      }
    }
    .ab-core {
      padding: 24px 14px;
      .we-pro {
        margin-left: 16px;
      }
      .m-top {
        margin-top: 28px;
      } 
      .img-m {
        padding: 40px 26px 0 38px; 
        img {
          width: 915px;
          margin-bottom: 15px;
        }
      }
    }
    .size {
      font-size: 14px;
      line-height: 24px;
      color:#333;
    }
    .left-img {
      width: 1020px;
      margin-top: 20px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
