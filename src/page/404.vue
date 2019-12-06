<!-- 模型： DOM 结构 -->
<template>
    <div class="error">
        <div class="box">
            <img src="../assets/img/pic-404.png"/>
            <p>很抱歉，您访问的页面被外星人劫走了...</p>
            <img class="gohome" src="../assets/img/gohome.png" @click="$router.push('/')"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'error', // 结构名称
    data() {
        return {
            // 数据模型a
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
.error{
    position: relative;
    height: 100vh;
    .box{
        width: 100%;
        text-align: center;
        position: absolute;
        // left: 50%;
        top:35%;
        transform: translateY(-50%);
        img{
            width: 15%;
            min-width: 282px;
        }
        p{
            margin-top: 20px;
            margin-bottom: 40px;
            font-size: 12px;
            color: #666
        }
        .gohome{
            width: 7.3%;
            min-width: 70px;
            cursor: pointer;
        }
    }
}
</style>
