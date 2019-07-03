<!-- 模型： DOM 结构 -->
<template>
    <!-- 变更记录 -->
    <div class="changeRecord">
        <div class="ic-basic">
            <div class="list-nav">
                <div style="width:72px" >序号</div>
                <div style="width:100px" >变更事项</div>
                <div style="width:275px" >变更前内容</div>
                <div style="width:275px" >变更后内容</div>
                <div style="width:100px" >变更日期</div>
            </div>
            <div class="list-co" v-for="(el,i) in list" :key="i" >
                <div style="width:72px">{{i+1}}</div>
                <div style="width:100px">{{el.altItem_CN}}</div>
                <div style="width:275px">{{el.altBe}}</div>
                <div style="width:275px" >{{el.altAf}}</div>
                <div style="width:100px" >{{formatDate(el.altDate)}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'changeRecord', // 基本信息
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
        list:{
            
        }
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
.ic-basic {
    margin: 0 10px 15px 10px; 
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    .list-nav {
        display: flex;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        color:#333;
        border-bottom: 1px solid #f2f2f2;
    }
    .list-co {
        color: #999;
        text-align: center;
        min-height: 40px;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 5px 0;
        box-sizing: border-box; 
        border-bottom: 1px solid #f2f2f2
    }

}

</style>
