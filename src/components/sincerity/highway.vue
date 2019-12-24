<!-- 模型： DOM 结构 -->
<template>
    <!-- 主要人员 -->
    <div class="honor">
        <div class="ic-basic">
            <!-- 有数据 -->
            <template v-if="data&&data.length>0">
                 <table class="table-content">
						<tr>
							<td style="width:72px" >序号</td>
                            <td style="width:175px">评价年度</td>
                            <td style="width:175px">信用等级</td>
                            <td style="width:175px">评价省份</td>
                            <td style="width:175px" >企业属地</td>
						</tr>
						<tr v-for="(el,i) in data" :key="i">
							<td>{{i+1}}</td>
							<td >{{el.years}}</td>
							<td>{{el.level}}</td>
							<td>{{el.issueProvince}}</td>
                            <td>{{el.regisAddress}}</td>
						</tr>
					</table>
            </template>
            <!-- 无数据 -->
            <template v-else-if="data&&data.length==0">
                <div class="no-toast">
                    <img src="../../assets/img/bank_card @2x.png" alt="">
                    <span>Sorry，暂未查询到该公司的公路信用等级</span>
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
    box-sizing: border-box;
    .table-content {
        width: 844px;
    }  
}
.position{
    width: 200px;
    img{
        max-width: 200px;
    }
}

</style>
