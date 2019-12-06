<!-- 模型： DOM 结构 -->
<template>
    
    <div class="queryList">
        <!-- 头 -->
		<v-head :headTxt="title"></v-head>
        <div class="nav-menu">首页 > {{title}}</div>
        <v-query></v-query>
        <!-- total -->
        <div class="t-tit">
            <div>共搜到<span>{{total}}</span>家企业</div>
            <!-- <div class="downLoad">下载报告</div> -->
        </div>
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
                                <div class="right-label"  v-if="$route.query.type=='zj'&&o.joinRegion&&o.joinRegion.length>0">
                                    <v-region :data="o.joinRegion"></v-region>
                                </div>
                            </div>
                            <div class="bottom">
                                <p class="people">法人：<font>{{o.legalPerson}}</font></p>
                                <p class="phone">电话：<font>{{o.phone}}</font></p>
                                <p class="address">地址：<font>{{o.comAddress}}</font></p>
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
        </div>
    </div>
</template>
<script>
import paging from '@/components/paging'
import heads from '@/components/head3'
import joinRegion from '@/components/zhuancha/joinRegion'
import queryCondition from '@/components/zhuancha/queryCondition'
export default {
    name: 'queryList', // 结构名称
    data() {
        return {
            // 数据模型
            total:0,
            list:[],
            loading:true,
            isajax:true,
            data:{
                pageNo:1,
                pageSize:20,
                orderNo:null
            },
        }
    },
    watch: {
        // 监控集合
    },
    inject: ['reload'],
    computed:{
        title(){
            if(this.$route.query.type=='zj'){
                return '住建信息综合查询'
            }else if(this.$route.query.type=='gl'){
                return '公路信息综合查询'
            }else if(this.$route.query.type=='sl'){
                return '水利信息综合查询'
            }
        }
    },
    components:{
        'v-page':paging,
        'v-head': heads,
        'v-region':joinRegion,
        'v-query':queryCondition
    },
    created(){
        this.ajax()
    },
    methods: {
        // 方法 集合
        Goto(val){
            this.data.pageNo = val.cur;
            this.ajax()
        },
        ajax(){//查询
            let that=this;
            this.list=[];
            this.isajax=false;
            this.data.orderNo=this.$route.query.n;
            // let that=this;
            this.$http({
                method:'post',
                url:'/gonglu/list',
                data:this.data
            }).then(res =>{
                that.isajax=true;
                if(res.data.code==1){
                    that.list=res.data.data;
                    that.total=res.data.total;
                }
                
            }).catch(req =>{
                that.list=null
            })
        },
        jumpDetail(id){
            const {href} = this.$router.resolve({
                path: '/queryDetail',
                query: {
                    id:id,
                    type:this.$route.query.type,
                    n:this.$route.query.n
                }
            })
            window.open(href, '_blank', )
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
.t-tit{
    height: 60px;
    padding-left: 5px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom:1px solid #F2F2F2;
    font-size: 14px;
    color: #999;
    width: 1020px;
    margin:0 auto;
    box-sizing: border-box;
    background: #fff;
    span{
        color: @color;
    }
    .downLoad{
        background: @color;
        width: 120px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        border-radius: 8px;
        font-size: 18px;
    }
}
.el-col-22{
    color: #999;
}
li{
    .bottom{
        font-size: 14px;
        .address{
            max-width: 382px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .phone{
            width: 142px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .people{
            width: 90px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
