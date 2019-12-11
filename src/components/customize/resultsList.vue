<template>
    <div class="resultsList">
        <div class="resultsList_body">
            <div class="fs18 color-150">您的查询条件为：</div>
            <div class="mt10 pt20 pl20 pr20 bg-ffe list">
                <el-row v-for="(item,index) in resultList" :key="index" class="fs18 pb20" type="flex">
                    <el-col :span="2.5" class="fw600">{{item.title}}</el-col>
                    <el-col :span="21">{{item.info}}</el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        breadList: {
            type: Array,
            default: ""
        },
    },
    data() {
        return {
            resultList: [
                {
                    title: "选择地区：",
                    info: "渝内+入渝企业"
                },
                {
                    title: "人员要求：",
                    info: "注册建造师-二级建造师-建筑工程"
                },
                {
                    title: "资质要求：",
                    info: "建筑业资质 - 建筑工程施工总承包 - 一级及以上"
                },
                {
                    title: "业绩要求：",
                    info: "业绩来源 - 全国建筑市场监管公共服务平台,业绩来源 - 全国建筑市场监管公共服务平台业绩来源 - 全国建筑市场监管公共服务平台业绩来源 - 全国建筑市场监管公共服务平台业绩来源 - 全国建筑市场监管公共服务平台,业绩来源 - 全国建筑市场监管公共服务平台业绩来源 - 全国建筑市场监管公共服务平台业绩来源 - 全国建筑市场监管公共服务平台"
                },
                {
                    title: "选择地区：",
                    info: "渝内+入渝企业"
                },
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../style/publicCSS";
.resulstList {
    .resultsList_body {
        // list
    }
}
</style>