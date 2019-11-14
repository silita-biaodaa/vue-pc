<!-- 模型： DOM 结构 -->
<template>
    
    <div class="queryList">
        <!-- 头 -->
		<v-head :headTxt="'住建信息综合查询系统'"></v-head>
        <div class="nav-menu">首页 > 住建信息综合查询系统</div>
        <v-query></v-query>
        <!-- total -->
        <div class="t-tit">
            <div>共搜到<span>{{total}}</span>家企业</div>
            <div class="downLoad">下载报告</div>
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
                                <div class="right-label"  v-if="o.joinRegion.length>0">
                                    <v-region :data="o.joinRegion"></v-region>
                                </div>
                            </div>
                            <div class="bottom">
                                <p>注册地：<font>{{o.regisAddress}}</font></p>
                                <p>符合要求资质：<font>{{o.qualCount}}</font></p>
                                <!-- <font>符合要求人员：<font>1</font></p> -->
                                <p>符合要求业绩：<font>{{o.projectCount}}</font></p>
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
            list:[{"qualCount":0,"regisAddress":"四川省","comName":"核工业西南勘察设计研究院有限公司","comId":"e4b758d3e5877f1e6dc450a4b50bd6e7","projectCount":5048,"joinRegion":["入闽","入藏","入黔","入沪","入湘","入皖","入新","入冀","入豫","入赣","入甘","入鲁","入浙","入青"]},{"qualCount":0,"regisAddress":"浙江省","comName":"浙江山川有色勘察设计有限公司","comId":"b73a7e81e1ecf6688e8c9cfd2c14db4f","projectCount":4847,"joinRegion":["入皖","入赣"]},{"qualCount":0,"regisAddress":"四川省","comName":"中国建筑西南勘察设计研究院有限公司","comId":"f19f1c3a976a6fdd903026e49aa14eb0","projectCount":4635,"joinRegion":["入闽","入藏","入黔","入沪","入湘","入皖","入新","入苏","入宁","入冀","入豫","入渝","入赣","入京","入鲁","入陕","入浙","入青"]},{"qualCount":0,"regisAddress":"安徽省","comName":"安徽建材地质工程勘察院有限公司","comId":"e5607c61a8dc0e82ae8669b5204d193b","projectCount":4236,"joinRegion":["入湘"]},{"qualCount":0,"regisAddress":"河南省","comName":"河南省防腐企业集团有限公司","comId":"99cbefefbc03ca7d4db3b9ee430e0c44","projectCount":4132,"joinRegion":["入新","入苏","入吉","入京","入浙","入晋"]},{"qualCount":0,"regisAddress":"四川省","comName":"四川省兴发规划建筑设计有限公司","comId":"f36f7dd720d940cd597cc4f328f0cdb3","projectCount":3421,"joinRegion":["入藏","入黔","入新","入冀","入青"]},{"qualCount":0,"regisAddress":"浙江省","comName":"华汇工程设计集团股份有限公司","comId":"9df42efbd42440fd001345796b20bfdf","projectCount":3169,"joinRegion":["入藏","入黔","入沪","入湘","入皖","入新","入宁","入赣","入青","入黑","入晋"]},{"qualCount":0,"regisAddress":"上海市","comName":"上海市政工程设计研究总院（集团）有限公司","comId":"cc2c6f20fa53b20a26337281f4dbfdc8","projectCount":3117,"joinRegion":["入闽","入藏","入黔","入湘","入皖","入新","入苏","入吉","入宁","入冀","入豫","入赣","入鲁","入浙","入青","入黑","入晋"]},{"qualCount":0,"regisAddress":"浙江省","comName":"浙江省工程物探勘察院","comId":"9ee6568ad5707b6aae44068555340869","projectCount":3085,"joinRegion":["入黔","入沪","入皖","入豫"]},{"qualCount":0,"regisAddress":"北京市","comName":"中国建筑技术集团有限公司","comId":"a985c400505ba2d36aebf95cf12e3b00","projectCount":3062,"joinRegion":["入闽","入藏","入黔","入沪","入湘","入皖","入新","入苏","入吉","入宁","入冀","入豫","入渝","入赣","入甘","入鲁","入陕","入浙","入青","入黑","入晋"]}],
            total:0,
            loading:true,
            isajax:true,
            data:{
                joinRegion:'all_in',//备案地区
                qualCode:null,//资质
                pageNo:1,
                pageSize:10,
                regisAddress:'',
                project:{
                    opt:'title',//搜索类型
                    keywords:'',//搜索关键字
                    childProject:null,//业务所含子项
                    proWhere:null,//项目属地
                    proUse:null,//工程用途
                    proType:null,//业绩类型
                    amountStart:null,//最低价
                    amountEnd:null,//最高价
                    contractStart:null,//起始日期
                    contractEnd:null,//结束日期
                    completeStart:null,//竣工起始日期
                    completeEnd:null,//竣工结束日期
                    areaStart:null,//最小面积
                    areaEnd:null,//最大面积
                    proCount:0,//符合业绩条件的数量
                },
                person:[]
            },
        }
    },
    watch: {
        // 监控集合
    },
    components:{
        'v-page':paging,
        'v-head': heads,
        'v-region':joinRegion,
        'v-query':queryCondition
    },
    methods: {
        // 方法 集合
        Goto(val){
            // this.data.pageNo = val.cur;
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
            // let that=this;
            // this.$http({
            //     method:'post',
            //     url:'/query/zonghe/list/company',
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
.paging{
    padding: 60px 0 120px;
    text-align: center;
}
</style>
