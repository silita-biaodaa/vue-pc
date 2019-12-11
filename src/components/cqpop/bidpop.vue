<!-- 模型： DOM 结构 -->
<template>
    <div class="chq-pop">
        <div class="pop-main" >
           <div class="pop-title pop-line"  >
              <p style="fontWeight: 550" >重庆机场专用快速路工程南段寸滩长江大桥（K2 600-K4 200)BT融资建设总承包项目</p>
              <i class="iconfont iconshanchu" style="color:#DDDFE4;" @click="chqpop" ></i>
           </div>
           <div class="pop-title" style="height:59px;font-size:14px;"  >
              <p>中标公共</p>
              <div class="pop-look" @click="chqtable" >
                <i class="iconfont iconchakan" ></i>
                查看数据来源
              </div>
           </div>
           <table  cellspacing="0" >
             <tr>
               <td width='192' class="td-title" >工程名称</td>
               <td colspan='3' >重庆机场专用快速路工程南段寸滩长江大桥（K2 600-K4 200）BT融资建设总承包项目</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >招标编码</td>
               <td colspan='3' >500384201909260011401</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >招标人</td>
               <td colspan='3' >重庆市南川区博顺置业有限公司</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >中标单位</td>
               <td colspan='3' >重庆市南鸿建筑工程有限责任公司</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >项目经理</td>
               <td colspan='3'  >李军</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >中标价（万元)</td>
               <td colspan='3' >500384201909260011401</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >层数</td>
               <td width='310' >4426.087281</td>
               <td width='192' class="td-title" >中标工期(天)</td>
               <td  >780</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >工程规模</td>
               <td >500384201909260011401</td>
               <td width='192' class="td-title" >开标日期</td>
               <td  >2019-10-23 0:00:00</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >中标范围和内容</td>
               <td colspan='3' >设计部分：本项目（二期）用地红线范围内的方案设计、初步设计（含概算）、施工图设计、施工及竣工验收阶段、质量保修阶段的设计配合服务，以及协助招标人完成审批手续办理等工作。按招标人要求按质按时提交设计成果，并取得国家相关职能部门的批准。设计内容包括但不限于以下内容：建筑设计、结构设计、强弱电设计、给排水设计、暖通设计、消防设计、电气工程、综合管网设计、节能设计（含绿色建筑设计）等相关配套工程的设计。 施工部分：施工图纸所包含的全部内容</td>
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