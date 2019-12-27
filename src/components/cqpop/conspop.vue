<!-- 模型： DOM 结构 -->
<template>
    <div class="chq-pop">
        <div class="pop-main" >
           <div class="pop-title pop-line"  >
              <p style="fontWeight: 550" >{{object.projName}}</p>
              <i class="iconfont iconshanchu" style="color:#DDDFE4;" @click="closePop" ></i>
           </div>
           <div class="pop-title" style="height:59px;font-size:14px;"  >
              <p>施工许可</p>
              <div class="pop-look" @click="chqtable(object.url)" >
                <i class="iconfont iconchakan" ></i>
                查看数据来源
              </div>
           </div>
           <table  cellspacing="0">
             <tr>
               <td width='192' class="td-title" >工程名称</td>
               <td colspan='3' >{{object.projName}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >建设地点</td>
               <td colspan='3' >{{object.projAddress}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >施工企业</td>
               <td colspan='3' >{{object.borg}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >建设单位</td>
               <td colspan='3' >{{object.proOrg}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >勘察单位</td>
               <td colspan='3'  >{{object.exploreOrg}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >设计企业</td>
               <td colspan='3' >{{object.designOrg}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >监理企业</td>
               <td colspan='3' >{{object.superOrg}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >承包范围</td>
               <td colspan='3' >{{object.scope}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >建设规模</td>
               <td width='310' >{{object.buildScale}}</td>
               <td width='192' class="td-title" >合同价格（万元)</td>
               <td  >{{object.amount}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >建筑面积</td>
               <td >{{object.area}}</td>
               <td width='192' class="td-title" >合同工期</td>
               <td  >{{object.days}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >项目经理</td>
               <td >{{object.projManager}}</td>
               <td width='192' class="td-title" >总监理工程师</td>
               <td  >{{object.superManager}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >勘察单位项目负责人</td>
               <td >{{object.exploreManager}}</td>
               <td width='192' class="td-title" >设计单位项目负责人</td>
               <td  >{{object.designManager}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >合同开工时间</td>
               <td >{{object.begined}}</td>
               <td width='192' class="td-title" >合同竣工时间</td>
               <td  >{{object.ended}}</td>
             </tr>
             
              <tr>
               <td width='192' class="td-title" >发证日期</td>
               <td >{{object.issued}}</td>
               <td width='192' class="td-title" >发证机关</td>
               <td width='192' >{{object.issueOrg}}</td>
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
            // 数据模型
            object:{}
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        obj:{
          	default: ''
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.gainNew()
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
        gainNew() {
           let that=this;
            this.$http({
                method:'post',
                url:'/chongq/company/project/detail',
                data:{
                   pkid:that.obj,
                   tabType:'build'
                }
            }).then(res =>{
                
              if(res.data.code == 1) {
                  that.object = res.data.data       
              }
            })
        }
    }
}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import '../../base/table.less';
</style>