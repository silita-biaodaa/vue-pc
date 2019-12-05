<!-- 模型： DOM 结构 -->
<template>
    <div class="slyj">
        <!-- 项目关键字 -->
        <div class="fx-box" v-if="project.keywords">
            <el-col :span="1">项目关键字：</el-col>
            <div>
                {{project.keywords}}
                <template v-if="project.opt=='title'">(根据标题搜索)</template>
                <template v-else-if="project.opt=='scope'">(根据关键指标搜索)</template>
                <template v-else>(根据标题和关键指标搜索)</template>
            </div>
        </div>
        <!-- 多个关键词之间的关系 -->
        <div class="fx-box" v-if="project.keywords&&project.keywords.split(',').length>1">
            <el-col :span="1">多个关键词之间的关系：</el-col>
            <div>
                <template v-if="project.optType=='or'">满足任意一个</template>
                <template v-else>满足所有</template>
            </div>
        </div>
        <!-- 项目属地 -->
        <div class="fx-box" v-if="project.proWhere">
            <el-col :span="1">项目属地：</el-col>
            <div>{{project.proWhere}}</div>
        </div>
        <!-- 项目状态 -->
        <div class="fx-box" v-if="project.proState">
            <el-col :span="1">项目状态：</el-col>
            <div>{{project.proState}}</div>
        </div>
        <!-- 项目金额 -->
        <div class="fx-box" v-if="project.amountStart||project.amountEnd">
            <el-col :span="1">项目金额：</el-col>
            <div>
                <template v-if="!project.amountStart||project.amountStart==''">小于{{project.amountEnd}}（万元）</template>
                <template v-else-if="!project.amountEnd||project.amountEnd==''">大于{{project.amountStart}}（万元）</template>
                <template v-else>大于{{project.amountStart}}（万元）小于{{project.amountEnd}}（万元）</template>
            </div>
        </div>
        <!-- 完工日期 -->
        <div class="fx-box" v-if="project.completeStart||project.completeEnd">
            <el-col :span="1">完工日期：</el-col>
            <div>
                <template v-if="!project.completeStart||project.completeStart==''">{{project.completeEnd}}以前</template>
                <template v-else-if="!project.completeEnd||project.completeEnd==''">{{project.completeStart}}以后</template>
                <template v-else>{{project.completeStart}}到{{project.completeEnd}}</template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'slyj', // 结构名称
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
        project:{
            default:{},
        },
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
.el-col-1{
    width: auto;
}
</style>
