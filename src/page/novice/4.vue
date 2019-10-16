<!-- 模型： DOM 结构 -->
<template>
    <div class="novice4">
        <h4>查在建</h4>
        <h5>功能介绍：</h5>
        <p>提供湖南省人员的在建项目信息，是否在建，一查便知。</p>
        <h5 style="margin-top:60px">使用方法：</h5>
        <p>1、打开“标大大”首页，点击图中标红<span style="background:#FBB2D2">在建</span>模块，进入查在建功能页；</p>
        <img src="../../assets/img/novice/4-1.png"/>
        <p>2、您可根据<span style="background:#FBB2D2">姓名</span> 或 <span style="background:#F9C9A3">身份证号</span>查询人员在建情况；（不能同时输入人员姓名和身份证哦，仅支持查询湖南省在建信息）</p>
        <img src="../../assets/img/novice/4-2.png"/>
    </div>
</template>
<script>
export default {
    name: 'novice4', // 结构名称
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
