<!-- 模型： DOM 结构 -->
<template>
    <div class="chq-pop">
        <div class="pop-main" >
           <div class="pop-title pop-line"  >
              <p style="fontWeight: 550" >行政处罚详情</p>
              <i class="iconfont iconshanchu" style="color:#DDDFE4;" @click="closePop"  ></i>
           </div>
           <table  cellspacing="0" style=" marginTop:20px "   >
              <tr>
               <td width='192' class="td-title" >行政处罚决定书文号</td>
               <td >{{obj.punishCode}}</td>
               <td width='192' class="td-title" >处罚类别</td>
               <td  >{{obj.punishType}}</td>
             </tr>

             <tr>
               <td width='192' class="td-title" >处罚名称</td>
               <td colspan='3' >{{obj.punishName}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >处罚事由</td>
               <td colspan='3' >{{obj.punishContent}}</td>
             </tr>

             <tr>
               <td width='192' class="td-title" >处罚依据</td>
               <td colspan='3' >{{obj.punishWith}}</td>
             </tr>

             <tr>
               <td width='192' class="td-title" >处罚结果</td>
               <td colspan='3' >{{obj.punishResult}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >处罚机关</td>
               <td >{{obj.punishOrg}}</td>
               <td width='192' class="td-title" >处罚决定日期</td>
               <td  >{{obj.punishDate}}</td>
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
        obj:{
          	default: {}
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.gainTime()
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
        closePop() {
            this.$emit('closePop', { cur: '' })
        },
        gainTime() {
             let time = new Date(this.obj.punishDate).getTime()
             this.obj.punishDate = this.formatDate(time)   
        }
    }
}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import '../../base/table.less';
</style>