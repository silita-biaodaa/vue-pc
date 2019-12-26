<!-- 模型： DOM 结构 -->
<template>
    <div class="chq-pop">
        <div class="pop-main" >
           <div class="pop-title pop-line"  >
              <p style="fontWeight: 550" >{{object.projName}}</p>
              <i class="iconfont iconshanchu" style="color:#DDDFE4;" @click="closePop" ></i>
           </div>
           <div class="pop-title" style="height:59px;font-size:14px;"  >
              <p>中标公告</p>
              <div class="pop-look" @click="chqtable(object.url)" >
                <i class="iconfont iconchakan" ></i>
                查看数据来源
              </div>
           </div>
           <table  cellspacing="0" >
             <tr>
               <td width='192' class="td-title" >工程名称</td>
               <td colspan='3' >{{object.projName}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >招标编码</td>
               <td colspan='3' >{{object.zhaobiaoCode}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >招标人</td>
               <td colspan='3' >{{object.zhaobiaoPerson}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >中标单位</td>
               <td colspan='3' >{{object.comName}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >项目经理</td>
               <td colspan='3'  >{{object.projManager}}</td>
             </tr>
              <tr>
               <td width='192' class="td-title" >中标价（万元)</td>
               <td colspan='3' >{{object.amount}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >层数</td>
               <td width='310' >{{object.floorNum}}</td>
               <td width='192' class="td-title" >中标工期(天)</td>
               <td  >{{object.days}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >工程规模</td>
               <td >{{object.scope}}</td>
               <td width='192' class="td-title" >开标日期</td>
               <td  >{{object.pubDate}}</td>
             </tr>

              <tr>
               <td width='192' class="td-title" >中标范围和内容</td>
               <td colspan='3' >{{object.content}}</td>
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
        this.gainNew()
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
                   tabType:'zhongbiao'
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