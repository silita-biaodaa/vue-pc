<!-- 模型： DOM 结构 -->
<template>
    <!-- 主要人员 -->
    <div class="prize">
        <div class="ic-basic">
            <div class="list-nav">
                <div style="width:72px" >序号</div>
                <div style="width: calc(100% - 372px);">工程名称</div>
                <div style="width:150px">奖项名称</div>
                <div style="width:150px" >获奖日期</div>
            </div>
            <!-- 有数据 -->
            <template v-if="data&&data.length>0">
                <div class="list-co" v-for="(el,i) in data" :key="i" >
                    <div style="width:72px">{{i+1}}</div>
                    <div style="width: calc(100% - 372px);">
                        <span style="cursor: pointer;" @click="seeDetail(el)">{{el.projName}}</span>
                    </div>
                    <div style="width:150px">{{el.awardName}}</div>
                    <div style="width:150px">{{el.issued}}</div>
                </div>
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
