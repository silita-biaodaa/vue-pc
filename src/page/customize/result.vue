<template>
    <div class="result">
        <v-head3></v-head3>
        <div class="result_body">
            <v-publicBread :breadList="breadList"></v-publicBread>
            <v-result></v-result>
            <!-- 资质查询结果 -->
            <div class="result_content mt35" v-if="resultZZ">
                <ul>
                    <li class="dfrcb result_num fs14 bg-f4f">
                        <div class="fw600">共找到12123名人员</div>
                        <div class="drc color-449 cp">
                            <i class="iconfont iconxiazai"></i>
                            <div class="ml5">下载报告</div>
                        </div>
                    </li>
                    <li
                        class="pt20 pb20 pl20 pr20 result_list"
                        v-for="(item,index) in infoList"
                        :key="index"
                    >
                        <div class="mb30">
                            <span class="color-449 fw600 fs18">{{item.name}}</span>
                            <span class="ml20 fs14">{{item.companyName}}</span>
                        </div>
                        <div class="dfrcb fs14">
                            <span>证书数量：{{item.number}}</span>
                            <div class="list_info">{{item.info}}</div>
                            <div class="drc color-449 cp">
                                <i class="iconfont iconchakan"></i>
                                <div class="ml5">查看符合业绩详情</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 人员查询 -->
            <div class="result_content mt35">
                <ul>
                    <li class="dfrcb result_num fs14 bg-f4f">
                        <div class="fw600">共找到12123名人员</div>
                        <div class="drc color-449 cp">
                            <i class="iconfont iconxiazai"></i>
                            <div class="ml5">下载报告</div>
                        </div>
                    </li>
                    <li
                        class="pt20 pb20 pl20 pr20 result_list"
                        v-for="(item,index) in ryList"
                        :key="index"
                    >
                        <div class="mb30 drc">
                            <span class="fw600 fs18">{{item.name}}</span>
                            <div class="ml20 text-c list_logo" :class="{'hide': item.id == 1}">入渝</div>
                            <div class="ml20 text-c list_logo logo_color">渝内</div>
                        </div>
                        <div class="dfrcb fs14">
                            <span>法人：{{item.people}}</span>
                            <div>电话：{{item.phone}}</div>
                            <div class="list_address">地址：{{item.address}}</div>
                            <div class="drc color-449 cp">
                                <i class="iconfont iconchakan"></i>
                                <div class="ml5">查看符合业绩详情</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="block text-c">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import resultsList from "@/components/customize/resultsList";
import head3 from "@/components/head3";
import publicBread from "@/components/customize/publicBread";
export default {
    components: {
        "v-result": resultsList,
        "v-head3": head3,
        "v-publicBread": publicBread
    },
    data() {
        return {
            breadList: [{ title: "查询列表" }], //面包屑列表,以对象形式添加;
            infoList: [
                {
                    name: "王二牛",
                    companyName: "湖南耀邦建设有限公司",
                    number: "1",
                    info:
                        "证书信息：一级注册建造师（建筑工程、市政工程）；二级注册建造师（二级注册建造师建筑证书信息：一级注册建造师（建筑工程、市政工程）；二级注册建造师（二级注册建造师建筑"
                }
            ],
            resultZZ: false, //资质查询展示;
            ryList: [
                {
                    name: "湖南耀邦建设有限公司",
                    people: "陈波",
                    phone: "0731-88507607",
                    address: "湖南省长沙市岳麓区杜鹃路768号岳麓区杜鹃杜鹃路…",
                    id: "1"
                }
            ],
            pagesize: 15, // 当前页面条数
            pagenum: 1, //当前页面数
            total: 1000,
        };
    },
    methods: {
        handleCurrentChange(val) {
            // 当前页改变的函数
            this.pagenum = val;
            // this.operateList();
        },
        handleSizeChange(val) {
            // 每页条数发生改变时做出的函数
            this.pagesize = val;
            // this.operateList();
        }
    }
};
</script>
<style lang="less" scoped>
@import "../../style/publicCSS";
.result {
    .result_body {
        width: 1020px;
        margin: 0 auto;
    }
    .result_content {
        border: 1px solid @initColor;
        .result_num {
            padding: 14px 20px;
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
        margin-top: 43px;
        padding-bottom: 20px;
    }
}
</style>