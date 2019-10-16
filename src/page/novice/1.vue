<!-- 模型： DOM 结构 -->
<template>
    <div class="novice1">
        <h4>招标查询</h4>
        <h5>功能介绍：</h5>
        <p>提供实时更新的招标信息，可通过搜索和筛选条件及时获取最新投标项目。</p>
        <h5 style="margin-top:60px">使用方法：</h5>
        <p>1、打开“标大大”首页，点击图中标红<span style="background:#FBB2D2">招标</span>模块，进入招标信息功能页；</p>
        <img src="../../assets/img/novice/1-1.png"/>
        <p>2、您可选择自己想看的公告属地；</p>
        <p>3、您可根据<span style="background:#B1E8E6">公告名称关键字或者企业名称</span>搜索招标公告；</p>
        <p>4、您可根据<span style="background:#FBB2D2">地区</span><span style="background:#F9C9A3">项目类型</span><span style="background:#ADE1FA">资质</span>(最多可添加三个资质条件)  、<span style="background:#C4CDF8">评标办法</span>筛选出自己想要的招标信息。</p>
        <img src="../../assets/img/novice/1-2.png"/>
    </div>
</template>
<script>
export default {
    name: 'novice1', // 结构名称
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
