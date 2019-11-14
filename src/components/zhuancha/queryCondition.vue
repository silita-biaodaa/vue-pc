<!-- 模型： DOM 结构 -->
<template>
    <div class="queryCondition">
        <!-- 查询条件 -->
        <div class="search-box">
            <h4>
                <span>您的查询条件为：</span>
                <span class="return-go">
                    <template v-if="ispay">
                        返回修改 >
                    </template>
                </span>
            </h4>
            <div class="search-content">
                <el-row>
                    <el-col :span="2">企业地区：</el-col>
                    <el-col :span="22">湖南省</el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">资质要求：</el-col>
                    <el-col :span="22">
                        <p>建筑业资质-建筑工程施工总承包-一级及以上</p>
                        <p>建筑业资质-建筑工程施工总承包-一级及以上</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">人员要求：</el-col>
                    <el-col :span="22">
                        <p>注册建造师 - 一级注册建造师 - 建筑工程，水利工程 - 1</p>
                        <p>注册建造师 - 一级注册建造师 - 建筑工程，水利工程 - 1 + 注册建造师 - 一级注册建造师 - 建筑工程，水利工程 - 1</p>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'queryCondition', // 结构名称
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
        ispay:{
            default:false
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
.search-box{
    background: #fff;
    width: 1020px;
    box-sizing: border-box;
    margin:0 auto 10px;
    padding:26px 16px;
    font-size: 14px;
    h4{
        color: #333;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 17px;
        font-weight: normal;
        .return-go{
            color: #FE6603;
            font-size: 14px;
        }
    }
}
</style>
