<!-- 模型： DOM 结构 -->
<template>
    <div class="queryList">
        <!-- 头 -->
        <v-head :headTxt="title"></v-head>
        <v-bread :breadList="[{title:title},{title: '查询列表'}]"></v-bread>
        <v-query></v-query>
        <!-- total -->
        <div class="list">
            <div class="t-tit pl20 pr20">
                <div class="fw600">
                    共找到{{total}}家企业
                </div>
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
            </div>
            <!-- 列表 -->
            <div class="maxW-box">
                <!-- 判断是否加载中 -->
                <template v-if="isajax">
                    <!-- 有数据 -->
                    <template v-if="list&&list.length>0">
                        <ul>
                            <li v-for="(o,i) of list" class="cp" :key="'list'+i" @click="jumpDetail(o.comId)">
                                <div class="top">
                                    <h5>{{o.comName}}</h5>
                                    <div
                                        class="right-label"
                                        v-if="$route.query.type=='zj'&&o.joinRegion&&o.joinRegion.length>0"
                                    >
                                        <v-region :data="o.joinRegion"></v-region>
                                    </div>
                                </div>
                                <div class="bottom fs14">
                                    <p class="people">
                                        法人：
                                        <font>{{o.legalPerson}}</font>
                                    </p>
                                    <p class="phone">
                                        电话：
                                        <font>{{o.phone}}</font>
                                    </p>
                                    <p class="address">
                                        地址：
                                        <font>{{o.comAddress}}</font>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </template>
                    <!-- 无数据  -->
                    <template v-else-if="list&&list.length==0">
                        <div class="no-toast">
                            <img src="../../assets/img/bank_card @2x.png" alt />
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
        <v-page class="text-c mb30"
            :all="total"
            :currents="data.pageNo"
            :pageSize="data.pageSize"
            @skip="Goto"
        ></v-page>
    </div>
</template>
<script>
import paging from "@/components/paging";
import joinRegion from "@/components/zhuancha/joinRegion";
import queryCondition from "@/components/zhuancha/queryCondition";
export default {
    name: "queryList", // 结构名称
    data() {
        return {
            // 数据模型
            total: 0,
            list: [
                {
                    comName: "湖南思利他网络有限公司",
                    legalPerson: "傅雅倩",
                    phone: "18373145216",
                    comAddress: "金峰壹号院"
                }
            ],
            loading: true,
            isajax: true,
            data: {
                pageNo: 1,
                pageSize: 10,
                orderNo: null
            },
            reportPath:null,//下载链接
        };
    },
    watch: {
        // 监控集合
    },
    inject: ["reload"],
    computed: {
        title() {
            if (this.$route.query.type == "zj") {
                return "住建信息综合查询";
            } else if (this.$route.query.type == "gl") {
                return "公路信息综合查询";
            } else if (this.$route.query.type == "sl") {
                return "水利信息综合查询";
            }
        }
    },
    components: {
        "v-page": paging,
        "v-region": joinRegion,
        "v-query": queryCondition
    },
    created() {
        this.ajax();
    },
    methods: {
        // 方法 集合
        downTap(){
            this.$alert('报告正在生成中...')
        },
        Goto(val) {
            this.data.pageNo = val.cur;
            this.ajax();
        },
        ajax() {
            //查询
            let that = this;
            this.list = [];
            this.isajax = false;
            this.data.orderNo = this.$route.query.n;
            // let that=this;
            this.$http({
                method: "post",
                url: "/gonglu/list",
                data: this.data
            })
                .then(res => {
                    that.isajax = true;
                    if (res.data.code == 1) {
                        that.list = res.data.data;
                        that.total = res.data.total;
                        this.reportPath=res.data.reportPath
                    }
                })
                .catch(req => {
                    that.list = null;
                });
        },
        jumpDetail(id) {
            let d = {
                path: "/queryDetail",
                query: {
                    id: id,
                    type: this.$route.query.type,
                    n: this.$route.query.n
                }
            };
            this.openNewLink(d.path, d.query);
        },
        //刷新
        recoldFn() {
            this.reload();
        }
    }
};
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
@import "../../style/query.less";

.list {
    .t-tit {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        margin: 0 auto;
        box-sizing: border-box;
        background: @orangeColor;
    }
    li {
        padding: 20px;
        .bottom {
            font-size: 14px;
            .address {
                max-width: 382px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .phone {
                width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .people {
                width: 90px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        a{
            text-decoration: none;
            color: #4494f0;
        }
    }
}
.queryList /deep/ .search-content {
    background-color: @lightOrangeColor;
}
</style>
