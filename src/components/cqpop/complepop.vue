<!-- 模型： DOM 结构 -->
<template>
    <div class="chq-pop">
        <div class="pop-main" >
           <div class="pop-title pop-line"  >
              <p style="fontWeight: 550" >重庆机场专用快速路工程南段寸滩长江大桥（K2 600-K4 200)BT融资建设总承包项目</p>
              <i class="iconfont iconshanchu" style="color:#DDDFE4;" @click="chqpop" ></i>
           </div>
           <div class="pop-title" style="height:59px;font-size:14px;"  >
              <p>竣工验收备案</p>
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
               <td width='192' class="td-title" >本次备案工程</td>
               <td colspan='3' >重庆机场专用快速路工程南段寸滩长江大桥（K2 600-K4 200）BT融资建设总承包项目</td>
             </tr>


              <tr>
               <td width='192' class="td-title" >等级备案号</td>
               <td >张永强</td>
               <td width='192' class="td-title" >备案日期</td>
               <td  >阳文通</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >工程地址</td>
               <td >张永强</td>
               <td width='192' class="td-title" >工程规模（面积)</td>
               <td  >阳文通</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >工程规模（价格)</td>
               <td >张永强</td>
               <td width='192' class="td-title" >主体结构类型</td>
               <td  >阳文通</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >竣工验收时间</td>
               <td >张永强</td>
               <td width='192' class="td-title" >设计合理使用年限</td>
               <td  >阳文通</td>
             </tr>

               <tr>
               <td width='192' class="td-title" >等级备案号</td>
               <td >张永强</td>
               <td width='192' class="td-title" >备案日期</td>
               <td  >阳文通</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >建设单位</td>
               <td colspan='3' >重庆市南鸿建筑工程有限责任公司</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >勘察单位</td>
               <td colspan='3'  >重庆市勘测院</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >设计单位</td>
               <td colspan='3' >中铁大桥勘测设计院集团有限公司</td>
             </tr>
             <tr>
               <td width='192' class="td-title" >施工单位</td>
               <td colspan='3' >中铁大桥勘测设计院集团有限公司</td>
             </tr>
               <tr>
               <td width='192' class="td-title" >监理单位</td>
               <td colspan='3' >中铁大桥勘测设计院集团有限公司</td>
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