<template>
<div class="introduce">

  <div class="com-title">
    <!-- <div class="com-img left">
    </div> -->
    <div class="com-detail left" >
      <p class="c-name">
        {{details.comName}}
      </p>
      <div class="c-state">
        {{details.subsist}}
      </div>
      <div class="c-all">
        <div class="left">
          <p>电话：{{details.phone ? details.phone : '--'}}</p>
          <p>网址：{{details.email ? details.email : '--' }}</p>
        </div>
        <div class="left">
          <p>邮箱：{{details.url ? details.url : '--'}}</p>
          <p>地址：{{details.comAddress ? details.comAddress : '--' }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="right c-over">
         浏览量：{{details.subsist}}次
    </div> -->
  </div>


  <div class="anchor">
    <div class="i-nav left">
       <router-link v-for="(el,i) in navs" :key="i" :class="el.name == name ? 'current':''" :to='el.to' tag='div'  @click.native="anchor(el)"  >
         {{el.name}}
         <div class="nav-rim" v-show="el.show" >
           <div class="triangle">

           </div>
         </div>
       </router-link>
    </div>
    <div class="right standby">
       <router-view/>
    </div>
  </div>  

</div>
</template>
<script>
import { CQdetails,getJsonData } from '@/api/index'
export default {
  data () {
     return {
       navs:[
         {
           name:'工商信息',
           i:0,
           show:true,
           to:'icbc'
         },
         {
           name:'法务信息',
           i:1,
           show:false,
           to:'law'
         },{
           name:'资质信息',
           i:2,
           show:false,
           to:'intell'
         },{
           name:'人员信息',
           i:3,
           show:false,
           to:'personnel'
         },{
           name:'业绩信息',
           i:4,
           show:false,
           to:'centre'
         },{
           name:'中标信息',
           i:5,
           show:false,
           to:'achievement'
         }, {
           name:'诚信信息',
           i:6,
           show:false,           
           to:'good'
         }
       ],
       name:'工商信息',
       details:{}
     }
  },
  methods: {
    anchor(el) {
      this.name = el.name
      this.navs.forEach(el => {
         el.show = false
      })
      el.show = true
    },
    gainDetail() {
       let dataParam = JSON.stringify({
          
        });
        getJsonData( "/company/" + 'd82be405069001616cefd448d5bf83a1' ).then(res => {
            if(res.code == 1) {
              this.details = res.data
            }
        });
    },
    gainNav() {
      var is = this.$route.meta.i
      this.name = this.navs[is].name
      this.navs[0].show = false
      this.navs[is].show = true
    },
  },
  created () {
    this.gainDetail()
    this.gainNav()
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.introduce {
  width: 1020px;
  // height: 100%;
  .com-title {
    width: 100%;
    // height: 200px;
    padding: 17px 0 20px 20px;
    margin-top: 40px;
    overflow: hidden;
    background-color: #fff;
    box-sizing: border-box;
    .com-img {
      height: 75px;
      width: 75px;
      border-radius: 5px;
      margin-right: 25px;
      border: 1px solid red;
      overflow: hidden;
    }
    .com-detail {
      .c-name {
        font-size: 18px;
        font-weight: 550;
      }
      .c-state {
        width: 30px;
        height: 16px;
        background-color: #E4FFF0;
        margin-left: 5px;
        margin-top: 9px;
        font-size: 12px;
        color:#53E494;
        text-align: center;
      }
      .c-all {
        font-size: 12px;
        color:#666666;
        padding: 13px 0 0 10px;
        width: 700px;
        div {
          width: 50%;
          p {
            margin-bottom: 13px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
          }
        }
      }
      
    }
    .c-over{
        font-size: 14px;
        margin-right: 20px;
        color:#333;
        font-weight: 550;
    }
  }
  .anchor {
    width: 1020px;
    overflow: hidden;
    margin-top: 16px;
    box-sizing: border-box;
    margin-bottom: 200px;
    .i-nav {
      color:#333;
      font-size: 14px;
      div {
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
    .standby {
      width: 794px;
    }
  }
  
}
</style>