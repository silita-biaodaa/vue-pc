<!-- 模型： DOM 结构 -->
<template>
    <div class="novice5">
        <h4>综合查询</h4>
        <h5>功能介绍：</h5>
        <p>通过设置地区、资质、业绩条件自定义组合，查询出符合条件的建筑业企业。</p>
        <h5 style="margin-top:60px">使用方法：</h5>
        <p>1、打开标大大，在每个模块的搜索栏旁都可找到<span style="background:#FBB2D2">综合查询</span>模块，点击进入综合查询功能页；</p>
        <img src="../../assets/img/novice/5-1.png"/>
        <p>2、您可根据所需条件，进行<span style="background:#FBB2D2">自由组合</span><span style="background:#F9C9A3">可增加</span><span style="background:#ADE1FA">删减条件</span>然后点击<span style="background:#C4CDF8">查询</span>,跳转到查询页面；</p>
        <img src="../../assets/img/novice/5-2.png"/>
        <p>3、在查询页面填写手机号码和电子邮箱，支付后，查询结果即以邮件的形式发送至您的邮箱（限时折扣价￥8/会员专享价￥1元）。</p>
    </div>
</template>
<script>
export default {
    name: 'novice5', // 结构名称
    data() {
        return {
            // 数据模型
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
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
h4{
    text-align: center;
    font-size: 24px;
    margin-bottom: 26px
}
h5{
    font-size: 18px;
    margin-bottom: 20px;
}
p{
    font-size: 16px;
    color: #999;
    margin-bottom: 10px;
}
span{
    display: inline-block;
    padding: 2px 5px;
    color: #fff;
    margin: 0 5px;
}
img{
    display: block;
    width: 100%;
    margin: 20px 0;
}
</style>
