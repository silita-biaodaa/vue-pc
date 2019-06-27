<!-- 模型： DOM 结构 -->
<template>
    <div class="lawDetail">
      <div class="title">
          <h5>{{detail.title}}</h5>
          <div class="title-bottom">
            <span>发布时间：{{detail.dateStr}}</span>
            <span>浏览量：<span style="color:#EC7522">{{detail.clickCount}}</span></span>
          </div>
      </div>
      <div class="content">
        <div class="original">
          <span>原文</span>
          <span @click="jump(detail.url)">访问原文出处>></span>
        </div>
        <div class="box" v-html="detail.content"></div>
      </div>
    </div>
</template>
<script>
export default {
    name: 'lawDetail', // 结构名称
    data() {
        return {
            // 数据模型
            detail:{}
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.getDetail();
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        getDetail(){
          let that=this;
          this.$http({
            method:'post',
            url:'/law/detail',
            data:{
              id:this.$route.query.id
            }
          }).then(function(res){
            that.detail=res.data.data;
          })
        },
        jump(url){
          window.open(url, "_blank")
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.lawDetail{
  padding-top: 126px;
  width: 1020px;
  margin: 0 auto;
  background:#FAFAFA;
}

.title{
  padding-top: 27px;
  padding-bottom: 15px;
  margin-bottom: 12px;
  background: #fff;
  h5{
    font-size: 30px;
    text-align: center;
    margin-bottom: 17px;
    font-weight: normal;
  }
  .title-bottom{
    display: flex;
    font-size: 18px;
    justify-content: space-evenly;
  }
}
.content{
  padding: 0 20px;
  box-sizing: border-box;
  background: #fff;
  .original{
    height: 70px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;
    align-items: center;
    span:last-child{
      color: #EC7522;
      cursor: pointer;
    }
  }
  .box{
    padding: 26px 0 80px;
  }
}
</style>
