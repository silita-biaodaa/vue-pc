<!-- 模型： DOM 结构 -->
<template>
    
    <div class="ZJquery">
        <!-- 头 -->
		<v-head :headTxt="'住建信息综合查询系统'"></v-head>
        <div class="nav-menu">首页 > 住建信息综合查询系统</div>
        <!-- 列表 -->
        <div class="list  maxW-box">
            <!-- 判断是否加载中 -->
            <template v-if="isajax">
                <!-- 有数据 -->
                <template v-if="list&&list.length>0">
                    <ul>
                        <li v-for="(o,i) of list" :key="'list'+i" @click="jumpDetail(o.comId)">
                            <div class="top">
                                <h5>{{o.comName}}</h5>
                                <div class="right-label"  v-if="o.joinRegion.length>0">
                                    <span class="label r-delta" :style="{color:colorList[5%i].color,background:colorList[5%i].bgcolor}" v-for="(x,y) of o.joinRegion" :key="y">{{x}}</span>
                                    <!-- <template v-if="o.joinRegion.length>7">
                                        <span class="label">更多</span>.slice(0,5)
                                    </template>
                                    <template v-else>
                                        <span class="label">{{o.joinRegion[6]}}</span>
                                    </template> -->
                                </div>
                                <!-- <span class="label">入渝</span> -->
                            </div>
                            <div class="bottom">
                                <p>注册地：<font>{{o.regisAddress}}</font></p>
                                <p v-if="data.qualCode!=null&&data.qualCode!=''">符合要求资质：<font>{{o.qualCount}}</font></p>
                                <!-- <font>符合要求人员：<font>1</font></p> -->
                                <p v-if="isyj">符合要求业绩：<font>{{o.projectCount}}</font></p>
                            </div>
                        </li>
                    </ul>
                    <v-page :all='total' :currents='data.pageNo' :pageSize='data.pageSize' @skip='Goto'></v-page>
                </template>
                <!-- 无数据  -->
                <template v-else-if="list&&list.length==0">
                    <div class="no-toast">
                        <img src="../../assets/img/bank_card @2x.png" alt="">
                        <span>Sorry，没有找到符合条件的企业信息</span>
                    </div>
                </template>
                <!-- 加载失败 -->
                <template v-else-if="!list">
                    <div class="ajax-erroe">
                        <img src="../../assets/img/pic-zoudiu.png" />
                        <span @click="recoldFn">刷新</span>
                    </div>
                </template>
            </template>
            <template v-else>
                <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
            </template>
            <!-- <ul>
                
                <li>
                    <div class="top">
                        <h5 class="title">湖南耀邦建设有限公司</h5>
                        <span class="label yn">渝内</span>
                    </div>
                    <div class="bottom">
                        <p>注册地：<font>湖南省</font></p>
                        <p>符合要求资质：<font>1</font></p>
                        <p>符合要求人员：<font>1</font></p>
                        <p>符合要求业绩：<font>1</font></p>
                    </div>
                </li>
            </ul> -->
            
        </div>
    </div>
</template>
<script>
import paging from '@/components/paging'
import heads from '@/components/head3'
export default {
    name: 'queryList', // 结构名称
    data() {
        return {
            // 数据模型
            list:[],
            total:0,
            loading:true,
            isajax:false,
            isyj:false,
            gosee:false,
            colorList:[
                {
                    color:'#5383E4',
                    bgcolor:'#E4EBFF'
                },{
                    color:'#53E49B',
                    bgcolor:'#E4FFED'
                },{
                    color:'#EF873A',
                    bgcolor:'#FDEFE3'
                },{
                    color:'#D65588',
                    bgcolor:'#FFE5F0'
                }
            ]
        }
    },
    watch: {
        // 监控集合
        data:{
            deep:true,
            handler(newVal,oldVal){
                this.ajax()
            }
        },
    },
    components:{
        'v-page':paging,
        'v-head': heads,
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
        Goto(val){
            this.data.pageNo = val.cur;
            // this.ajax()
        },
        ajax(){//查询
            this.list=[];
            this.total=0;
            this.isajax=false;
            let data=this.data
            data.project.keywords=data.project.keywords.replace(/ /g,',');
            // let data={
            //     regisAddress:"湖南省",
            //     pageNo:1,
            //     pageSize:10
            // }
            let that=this;
            // this.$http({
            //     method:'post',
            //     url:'query/zonghe/list/company',
            //     data:data
            // }).then(res =>{
            //     that.isajax=true;
            //     that.list=res.data.data;
            //     that.total=res.data.total;
            // }).catch(req =>{
            //     that.list=null
            // })
        },
        //刷新
        recoldFn() {
            this.reload();
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
@import '../../style/query.less';



</style>
