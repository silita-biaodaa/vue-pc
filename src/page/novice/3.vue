<!-- 模型： DOM 结构 -->
<template>
    <div class="novice3">
        <h4>企业查询</h4>
        <h5>功能介绍：</h5>
        <p>提供多维度的建筑业企业数据，包括工商信息、法务信息、资质信息、人员信息、业绩信息、中标信息、诚信信息等，让那您全方位的了解企业背景</p>
        <h5 style="margin-top:60px">使用方法：</h5>
        <p>1、打开“标大大”首页，点击图中标红<span style="background:#FBB2D2">企业</span>模块，进入企业信息功能页；</p>
        <img src="../../assets/img/novice/3-1.png"/>
        <p>2、您可选择自己想看的企业属地；</p>
        <p>3、您可根据<span style="background:#B1E8E6">企业名称或者法人名称</span>搜索企业；</p>
        <p>4、您可根据<span style="background:#FBB2D2">地区</span><span style="background:#F9C9A3">备案地区</span><span style="background:#C4CDF8">荣誉类别</span><span style="background:#ADE1FA">资质</span>(最多可添加三个资质条件，可以选择资质关系 “和” 与 “或”)筛选出自己想要的企业。</p>
        <img src="../../assets/img/novice/3-2.png"/>
    </div>
</template>
<script>
export default {
    name: 'novice3', // 结构名称
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
