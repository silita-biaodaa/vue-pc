<template>
    <div class="publicBread pt20 pb20">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in parentsList" :key="index">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    titleInfo: {
        type: Array,
        default: ""
    },
    data() {
        return {
            parentsList: "",
        }
    },
    methods: {
        getInfo() {
            this.parentsList = this.$parent.breadList;
        }
    },
    created() {
        this.getInfo();
    }
}
</script>
<style lang="less">
@import "../../style/publicCSS";
.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
    color: @textColor !important;
}
.el-breadcrumb__item .el-breadcrumb__separator,.el-breadcrumb__inner {
    color: @textColor !important;
}
.el-breadcrumb__item .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    color: @contentColor !important;
    font-weight: 400 !important;
}
</style>
<style lang="less" scoped>
@import "../../style/publicCSS";

</style>