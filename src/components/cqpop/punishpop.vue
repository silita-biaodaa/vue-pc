<!-- 模型： DOM 结构 -->
<template>
    <div class="chq-pop">
        <div class="pop-main" >
           <div class="pop-title pop-line"  >
              <p style="fontWeight: 550" >行政处罚详情</p>
              <i class="iconfont iconshanchu" style="color:#DDDFE4;" ></i>
           </div>
           <table  cellspacing="0" style=" marginTop:20px "   >
              <tr>
               <td width='192' class="td-title" >行政处罚决定书文号</td>
               <td >延环保车罚字【2019】110号</td>
               <td width='192' class="td-title" >处罚类别</td>
               <td  >罚款</td>
             </tr>

             <tr>
               <td width='192' class="td-title" >处罚名称</td>
               <td colspan='3' >中国建筑一局（集团）有限公司夜间未取得超时施工作业证明超市施工</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >处罚事由</td>
               <td colspan='3' >中国建筑一局（集团）有限公司夜间未取得超时施工作业证明超市施中国建筑一局（集团）有限公司夜间未取得超时施工作业证明超市施工中国建筑一局（集团）有限公司夜间未取得超时施工作业证明超市施工中国建筑一局（集团）有限公司夜间未取得超时施工作业证明超市施工工中国建筑一局（集团）有限公司夜间未取得超时施工作业证明超市施工</td>
             </tr>

             <tr>
               <td width='192' class="td-title" >处罚依据</td>
               <td colspan='3' >《中华人民共和国大气污染防治法》第一百一十四条第一款</td>
             </tr>

             <tr>
               <td width='192' class="td-title" >处罚结果</td>
               <td colspan='3' >《中华人民共和国大气污染防治法》第一百一十四条第一款</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >处罚机关</td>
               <td >延庆区生态环境局</td>
               <td width='192' class="td-title" >处罚决定日期</td>
               <td  >2019-11-18</td>
             </tr>
           
           </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'chq-pop', // 结构名称
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
@import '../../base/table.less';
</style>