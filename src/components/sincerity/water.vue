<!-- 模型： DOM 结构 -->
<template>
    <!-- 主要人员 -->
    <div class="honor">
        <div class="ic-basic">
            <div class="list-nav">
                <div style="width:72px" >序号</div>
                <div style="width:140px">评价类型</div>
                <div style="width:140px">评价年度</div>
                <div style="width:140px">信用等级</div>
                <div style="width:140px" >颁发日期</div>
                <div style="width:140px" >有效期至</div>
            </div>
            <!-- 有数据 -->
            <template v-if="data&&data.length>0">
                <div class="list-co" v-for="(el,i) in data" :key="i" >
                    <div style="width:72px">{{i+1}}</div>
                    <div style="width:140px">
                        <span>{{el.creditType}}</span>
                    </div>
                    <div style="width:140px">
                        <span>{{el.years}}</span>
                    </div>
                    <div style="width:140px">
                        <span>{{el.level}}</span>
                    </div>
                    <div style="width:140px">{{el.issued}}</div>
                    <div style="width:140px">{{el.valied}}</div>
                </div>
            </template>
            <!-- 无数据 -->
            <template v-else-if="data&&data.length==0">
                <div class="no-toast">
                    <img src="../../assets/img/bank_card @2x.png" alt="">
                    <span>Sorry，暂未查询到该公司的水利信用等级</span>
                </div>
            </template>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'honor', // 基本信息
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
        data:{
            default:''
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
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color:#333;
        border-bottom: 1px solid #f2f2f2;
    }
    .list-co {
        color: #333;
        text-align: center;
        min-height: 40px;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 5px 0;
        box-sizing: border-box; 
        border-bottom: 1px solid #f2f2f2;
        justify-content: space-between;
        font-weight: 550;
    }

}
.position{
    width: 200px;
    img{
        max-width: 200px;
    }
}

</style>
