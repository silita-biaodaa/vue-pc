<!-- 模型： DOM 结构 -->
<template>
    <!-- 主要人员 -->
    <div class="prize">
        <div class="ic-basic">
            <!-- 有数据 -->
            <template v-if="data&&data.length>0">
                 <table class="table-content">
						<tr>
							<td style="width:62px" >序号</td>
                            <td style="width:140px" >工程名称</td>
                            <td style="width:150px" >奖项名称</td>
                            <td style="width:150px" >获奖日期</td>
						</tr>
						<tr v-for="(el,i) in data" :key="i">
							<td>{{i+1}}</td>
							<td style="cursor: pointer;" @click="seeDetail(el)" >{{el.projName}}</td>
							<td>{{el.awardName}}</td>
							<td>{{el.issued}}</td>
						</tr>
					</table>
            </template>
            <!-- 无数据 -->
            <template v-else-if="data&&data.length==0">
                <div class="no-toast">
                    <img src="../../assets/img/bank_card @2x.png" alt="">
                    <span>Sorry，暂未查询到该公司的工程获奖</span>
                </div>
            </template>
        </div>
        <!-- 弹窗 -->
        <v-pop v-if="mask">
            <v-prize-detail :data="detail"></v-prize-detail>
        </v-pop>
    </div>
</template>
<script>
import popup from '@/components/popup'
import prizeDetail from '@/components/sincerity/prizeDetail'
export default {
    name: 'prize', // 基本信息
    data() {
        return {
            // 数据模型
            mask:false,
            detail:''
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
    components:{
        'v-pop':popup,
        'v-prize-detail':prizeDetail
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
        // 方法 集合
        seeDetail(el){
            if(!el.pkid){
                return false
            }
            let that=this;
            this.$http({
                method:'post',
                url:'/reputation/detail',
                data:{
                    pkid:el.pkid,
                }
            }).then(function(res){
                if(res.data.code==1){
                    that.mask=true;
                    that.modalHelper.afterOpen();
                    that.detail=res.data.data;
                }else{
                    that.$alert(res.data.msg);
                }
            })
        }
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
