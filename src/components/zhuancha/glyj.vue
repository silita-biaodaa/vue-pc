<!-- 模型： DOM 结构 -->
<template>
    <div class="glyj">
        <!-- 项目关键字 -->
        <div class="fx-box" v-if="project.keywords">
            <div :span="1">项目关键字：</div>
            <div>
                {{project.keywords}}
                <template v-if="project.opt=='title'">(根据标题搜索)</template>
                <template v-else-if="project.opt=='scope'">(根据主要工程量搜索)</template>
                <template v-else>(根据标题和建设规模搜索)</template>
            </div>
        </div>
        <!-- 多个关键词之间的关系 -->
        <div class="fx-box" v-if="project.keywords&&project.keywords.split(',').length>1">
            <div :span="1">多个关键词之间的关系：</div>
            <div>
                <template v-if="project.optType=='or'">满足任意一个</template>
                <template v-else>满足所有</template>
            </div>
        </div>
        <!-- 项目属地 -->
        <div class="fx-box" v-if="project.proWhere">
            <div :span="1">项目属地：</div>
            <div>{{project.proWhere}}</div>
        </div>
        <!-- 建设状态 -->
        <div class="fx-box" v-if="project.proBuild">
            <div :span="1">建设状态：</div>
            <div>{{project.proBuild}}</div>
        </div>
        <!-- 项目类型 -->
        <div class="fx-box" v-if="project.proType">
            <div :span="1">项目类型：</div>
            <div>{{project.proType}}</div>
        </div>
        <!-- 中标金额/合同金额 -->
        <div class="fx-box" v-if="project.amountStart||project.amountEnd">
            <div :span="1">中标金额/合同金额：</div>
            <div>
                <template v-if="!project.amountStart||project.amountStart==''">小于{{project.amountEnd}}（万元）</template>
                <template v-else-if="!project.amountEnd||project.amountEnd==''">大于{{project.amountStart}}（万元）</template>
                <template v-else>大于{{project.amountStart}}（万元）小于{{project.amountEnd}}（万元）</template>
            </div>
        </div>
        <!-- 竣工验收日期 -->
        <div class="fx-box" v-if="project.completeStart||project.completeEnd">
            <div :span="1">竣工验收日期：</div>
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
    name: 'glyj', // 结构名称
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
.fx-box{
    // display: flex;
    div{
        float: left;
    }
}
</style>
