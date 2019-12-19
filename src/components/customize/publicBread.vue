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
    props: {
        breadList: {
            type: Array,
            default: ""
        },
    },
    data() {
        return {
            parentsList: "",
        }
    },
    methods: {
        getInfo() {
            this.parentsList = this.breadList;
        }
    },
    created() {
        setTimeout(() => {
            this.getInfo();
        }, 580);
        
    },
    mounted () {
        
    }
}
</script>
<style lang="less">
@import "../../style/publicCSS";
.el-breadcrumb__item .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    color: @contentColor !important;
    font-weight: 400 !important;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
    color: @textColor !important;
}
.el-breadcrumb__item .el-breadcrumb__separator {
    color: @contentColor !important;
}
.el-breadcrumb__inner {
    color: @contentColor !important;
}
.el-breadcrumb__item:nth-last-child(2) .el-breadcrumb__separator {
    color: @textColor !important;
}
.publicBread{
    width: 1020px;
    margin: 0 auto;
}
</style>