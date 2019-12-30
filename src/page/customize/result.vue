<template>
    <div class="result">
        <v-head3 :headTxt="titleList"></v-head3>
        <div class="result_body">
            <v-bread :breadList="breadList"></v-bread>
            <v-result @getArea="getChilren"></v-result>
            <!-- 人员查询结果 -->
            <div class="result_content mt35" v-if="this.$route.query.page == 'ry'">
                <ul>
                    <li class="dfrcb result_num fs14 bg-f4f">
                        <div class="fw600 ahead">共找到{{total}}名人员</div>
                        <div class="drc color-449 cp">
                            <i class="iconfont iconxiazai"></i>
                            <div class="ml5">
                                <template v-if="reportPath">
                                    <a :download="reportPath" :href="reportPath">下载报告</a>
                                </template>
                                <template v-else>
                                    <span @click="downTap">下载报告</span>
                                </template>
                            </div>
                        </div>
                    </li>
                    <li
                        class="pt20 pb20 pl20 pr20 result_list cp"
                        v-for="(item,index) in ryList"
                        :key="index"
                        @click="jumpDetail('ry',item)"
                    >
                        <div class="mb30">
                            <span class="color-449 fw600 fs18">{{item.name}}</span>
                            <span class="ml20 fs14">{{item.comName}}</span>
                        </div>
                        <div class="dfrcb fs14">
                            <span>证书数量：{{item.certCount}}</span>
                            <div class="list_info">证书信息：{{item.certMessage}}</div>
                            <div class="drc color-449 cp">
                                <i class="iconfont iconchakan"></i>
                                <div class="ml5">查看符合业绩详情</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 企业查询 -->
            <div class="result_content mt20" v-if="this.$route.query.page == 'qy'">
                <ul>
                    <li class="dfrcb result_num fs14 bg-f4f">
                        <div class="fw600">共找到{{total}}家企业</div>
                        <div class="drc color-449 cp">
                            <i class="iconfont iconxiazai"></i>
                            <!-- <a :download="el.report.reportPath" :href="el.report.reportPath">下载报告</a> -->
                            <template v-if="reportPath">
                                <a :download="reportPath" :href="reportPath">下载报告</a>
                            </template>
                            <template v-else>
                                <span @click="downTap">下载报告</span>
                            </template>
                        </div>
                    </li>
                    <li
                        class="pt20 pb20 pl20 pr20 result_list cp"
                        v-for="(item,index) in qyList"
                        :key="index"
                        @click="jumpDetail('qy',item)"
                    >
                        <div class="mb30 dfrb">
                            <div class="drc">
                                <span class="fw600 fs18">{{item.comName}}</span>
                                <div class="ml20 text-c list_logo" :class="{'logo_color': item.joinRegion == '渝内'}">{{item.joinRegion == '渝内'?'渝内':'入渝'}}</div>
                            </div>
                            <div class="fs14" v-if="item.scope !== null">企业诚信评价综合得分：{{item.scope}}</div>
                        </div>
                        <div class="dfrcb fs14">
                            <span class="ahead">法人：{{item.legalPerson}}</span>
                            <div class="phone">电话：{{item.phone}}</div>
                            <div class="list_address ellipsis_one">地址：{{item.comAddress}}</div>
                            <div class="drc color-449 cp">
                                <i class="iconfont iconchakan"></i>
                                <div class="ml5">查看符合要求详情</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="page">
                <nav-page :all='total' :currents='pagenum' :pageSize='pagesize' @skip='handleCurrentChange'></nav-page>
            </div>
        </div>
    </div>
</template>
<script>
import resultsList from "@/components/customize/resultsList";
import head3 from "@/components/head3";
import { screenList, personList } from "@/api/index";
export default {
    components: {
        "v-result": resultsList,
        "v-head3": head3,
    },
    data() {
        return {
            breadList: [{ title: "查询列表" }], //面包屑列表,以对象形式添加;
            titleList: "重庆定制版查询系统",
            qyList: [],
            ryList: [],
            pagesize: 10, // 当前页面条数
            pagenum: 1, //当前页面数
            total: null,
            reportPath:null,//下载链接
        };
    },
    methods: {
        downTap(){
            this.$alert('报告正在生成中...')
        },
        getQYlist() {
            let params = {
                orderNo: this.$route.query.orderNo,
                pageNo: this.pagenum,
                pageSize: this.pagesize
            };
            screenList(params).then(res => {
                if(res.code == "1") {
                    const { total, data } = res;
                    this.qyList = data;
                    this.total = total;
                    this.reportPath=res.reportPath
                }
            })
        },
        getRYlist() {
            let params = {
                orderNo: this.$route.query.orderNo,
                pageNo: this.pagenum,
                pageSize: this.pagesize
            };
            personList(params).then(res => {
                if(res.code == "1") {
                    const { total, data } = res;
                    this.ryList = data;
                    this.total = total;
                    this.reportPath=res.reportPath
                }
            })
        },
        handleCurrentChange(val) {
            // 当前页改变的函数
            this.pagenum = val.cur;
            if(this.$route.query.page == "qy") {
                this.getQYlist();
            }else {
                this.getRYlist();
            }
        },
        getChilren(data) {
            // console.info("data",data);
        },
        jumpDetail(type,el){//跳转至详情页
            let d={
                path:'',
                query:{
                    id:el.comId,
                    n:this.$route.query.orderNo,
                }
            }
            if(type=='ry'){
                d.path='peopleDetail'
                d.query.name=el.name
                d.query.perid=el.perId
            }else if(type=='qy'){
                d.path='companyDetail'
                d.query.source=this.$route.query.source
            }
            this.openNewLink(d.path,d.query)
        }
    },
    created() {
        if(this.$route.query.page == "qy") {
            this.getQYlist();
        }else {
            this.getRYlist();
        }
    }
};
</script>
<style lang="less" scoped>
@import "../../style/publicCSS";
.result {
    min-height: calc(100vh - 335px);
    .result_body {
        width: 1020px;
        margin: 0 auto;
    }
    .result_content {
        border: 1px solid @initColor;
        .result_num {
            padding: 14px 20px;
            a{
                text-decoration:none;
				color: #4494F0;
            }
        }
        .result_list {
            border-top: 1px solid @initColor;
            .list_info {
                width: 588px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .list_logo {
        color: #f08082;
        width: 52px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #f08082;
        border-radius: 4px;
    }
    .logo_color {
        color: #46bf72 !important;
        border: 1px solid #46bf72 !important;
    }
    .list_address {
        width: 382px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .block {
        width: 100%;
        margin-top: 43px;
        padding-bottom: 20px;
    }
    .ahead {
        display: inline-block;
        width: 100px;
    }
    .phone {
        width: 150px;
    }
}
</style>