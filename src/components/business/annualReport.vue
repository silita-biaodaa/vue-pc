<!-- 模型： DOM 结构 -->
<template>
    <!-- 年报信息 -->
    <div class="annualReport">
        <!-- list -->
        <div class="ic-basic">
            <div class="list-nav">
                <div style="width:72px" >序号</div>
                <div>标题</div>
                <div style="width:200px" >操作</div>
            </div>
            <div class="list-co" v-for="(el,i) in list" :key="i" >
                <div style="width:72px">{{i+1}}</div>
                <div>{{el.years}}年度报告</div>
                <div style="width:200px">
                    <span @click="seeDetail(el)" class="see-detail">查看详情</span>
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <v-pop v-if="mask">
            <v-annual-detail :data="detail"></v-annual-detail>
        </v-pop>
    </div>
</template>
<script>
import popup from '@/components/popup'
import annualDetail from '@/components/business/annualDetail'
export default {
    name: 'annualReport', // 基本信息
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
        list:{
            
        }
    },
    components:{
        'v-pop':popup,
        'v-annual-detail':annualDetail
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    methods: {
        // 方法 集合
        seeDetail(el){
            let that=this;
            this.$http({
                method:'post',
                url:'/gs/report/detail',
                data:{
                    comId:el.comId,
                    years:el.years
                }
            }).then(function(res){
                if(res.data.code==1){
                    that.mask=true;
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
        color: #999;
        text-align: center;
        min-height: 40px;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 5px 0;
        box-sizing: border-box; 
        border-bottom: 1px solid #f2f2f2;
        justify-content: space-between;
    }
    .see-detail{
        color:#FE6603;
        cursor: pointer;
    }
    .loading{
        cursor: wait;
    }
}

</style>
