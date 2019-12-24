<!-- 模型： DOM 结构 -->
<template>
    <div class="zjyj">
        <!-- 项目关键字 -->
        <div class="fx-box" v-if="project.keywords">
            <el-col :span="1">项目关键字：</el-col>
            <div>
                {{project.keywords}}
                <template v-if="project.opt=='title'">(根据标题搜索)</template>
                <template v-else-if="project.opt=='scope'">(根据建设规模搜索)</template>
                <template v-else>(根据标题和建设规模搜索)</template>
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
        <!-- 业绩所含子项 -->
        <div class="fx-box" v-if="project.childProject">
            <el-col :span="1">业绩所含子项：</el-col>
            <div>{{project.childProject}}</div>
        </div>
        <!-- 项目属地 -->
        <div class="fx-box" v-if="project.proWhere">
            <el-col :span="1">项目属地：</el-col>
            <div>{{project.proWhere}}</div>
        </div>
        <!-- 工程用途 -->
        <div class="fx-box" v-if="project.proUse">
            <el-col :span="1">工程用途：</el-col>
            <div>{{project.proUse}}</div>
        </div>
        <!-- 业绩类型 -->
        <div class="fx-box" v-if="project.proType">
            <el-col :span="1">业绩类型：</el-col>
            <div>{{project.proType}}</div>
        </div>
        <!-- 中标金额/合同金额 -->
        <div class="fx-box" v-if="project.amountStart||project.amountEnd">
            <el-col :span="1">中标金额/合同金额：</el-col>
            <div>
                <template v-if="!project.amountStart||project.amountStart==''">小于{{project.amountEnd}}（万元）</template>
                <template v-else-if="!project.amountEnd||project.amountEnd==''">大于{{project.amountStart}}（万元）</template>
                <template v-else>大于{{project.amountStart}}（万元）小于{{project.amountEnd}}（万元）</template>
            </div>
        </div>
        <!-- 中标日期/合同签订日期 -->
        <div class="fx-box" v-if="project.contractStart||project.contractEnd">
            <el-col :span="1">中标日期/合同签订日期：</el-col>
            <div>
                <template v-if="!project.contractStart||project.contractStart==''">{{project.contractEnd}}以前</template>
                <template v-else-if="!project.contractEnd||project.contractEnd==''">{{project.contractStart}}以后</template>
                <template v-else>{{project.contractStart}}到{{project.contractEnd}}</template>
            </div>
        </div>
        <!-- 竣工验收日期 -->
        <div class="fx-box" v-if="project.completeStart||project.completeEnd">
            <el-col :span="1">竣工验收日期：</el-col>
            <div>
                <template v-if="!project.completeStart||project.completeStart==''">{{project.completeEnd}}以前</template>
                <template v-else-if="!project.completeEnd||project.completeEnd==''">{{project.completeStart}}以后</template>
                <template v-else>{{project.completeStart}}到{{project.completeEnd}}</template>
            </div>
        </div>
        <!-- 面积（平方米）-->
        <div class="fx-box" v-if="project.areaStart||project.areaEnd">
            <el-col :span="1">面积（平方米）：</el-col>
            <div>
                <template v-if="!project.areaStart||project.areaStart==''">小于{{project.areaEnd}}（平方米）</template>
                <template v-else-if="!project.areaEnd||project.areaEnd==''">大于{{project.areaStart}}（平方米）</template>
                <template v-else>大于{{project.areaStart}}（平方米）小于{{project.areaEnd}}（平方米）</template>
            </div>
        </div>
        <!-- 符合业绩条件的数量 -->
        <div class="fx-box drc" v-if="project.proCount">
            <el-col :span="1">符合业绩条件的数量：</el-col>
            <div class="number">{{project.proCount}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'zjyj', // 结构名称
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
            // type:Object
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
@import "../../style/publicCSS";
.fx-box{
    .number {
        margin-top: 3px;
    }
}
.el-col-1{
    width: auto;
}
</style>
