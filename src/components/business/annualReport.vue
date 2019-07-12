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
            <template v-if="isajax">
                <!-- 有数据 -->
                <template v-if="list&&list.length>0">
                    <div class="list-co" v-for="(el,i) in list" :key="i" >
                        <div style="width:72px">{{i+1}}</div>
                        <div>{{el.years}}年度报告</div>
                        <div style="width:200px">
                            <span @click="seeDetail(el)" class="see-detail">查看详情</span>
                        </div>
                    </div>
                </template>
                <!-- 无数据 -->
                <template v-else-if="list&&list.length==0">
                    <div class="no-toast">
                        <img src="../../assets/img/bank_card @2x.png" alt="">
                        <span>Sorry，该企业暂无年报信息</span>
                    </div>
                </template>
                <template v-else-if="!list">
                    <div class="ajax-erroe">
                        <img src="../../assets/img/pic-zoudiu.png"/>
                        <!-- <span @click="recoldFn">刷新</span> -->
                    </div>
                </template>
            </template>
            <template v-else>
                <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
            </template>
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
            detail:'',
            list:[],
            loading:true,
            isajax:false
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        // list:{
            
        // }
    },
    inject:['reload'],
    components:{
        'v-pop':popup,
        'v-annual-detail':annualDetail
    },
    computed:{
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.getYears()
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
            
        },
        //刷新
        recoldFn(){
            this.reload();
        },
        getYears(){//企业年报
            let that=this;
            this.$http({
                method:'post',
                url:'/gs/report/years',
                data:{
                    comId:this.$route.query.id,
                }
            }).then(function(res){
                that.isajax=true;
                if(res.data.code==1){
                    that.list=res.data.data;
                }else{
                    that.$alert(res.data.msg);
                }
            }).catch(req =>{
                that.isajax=true;
                that.list=null;
            })
        }, 
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
