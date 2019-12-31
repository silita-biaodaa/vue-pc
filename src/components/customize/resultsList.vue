<!-- 模型： DOM 结构 -->
<template>
    <div class="resultsList">
        <!-- 查询条件 -->
        <div class="dfrcb mb10">
            <div class="fs18 color-150">您的查询条件为：</div>
            <!-- 返回修改 -->
            <!-- <div class="color-449 fs18 cp" v-if="this.$parent.payPage">
                <span class="mr10">返回修改</span>
                <i class="iconfont iconfanhuixiugai"></i>
            </div>-->
        </div>
        <div class="pt20 pl20 pr20 bg-ffe list" v-loading="loading">
            <div class="fs18">
                <el-row
                    v-if="data.regisAddress&&data.regisAddress!=''&&this.$parent.chongq"
                    class="pb20 tagId"
                >
                    <el-col :span="2.5" class="fw600">企业地区：</el-col>
                    <el-col :span="21">{{data.regisAddress}}</el-col>
                </el-row>
                <el-row
                    v-if="data.regisAddress&&data.joinRegion&&data.regisAddress!=''"
                    class="pb20 tagId"
                >
                    <el-col :span="2.5" class="fw600">选择地区：</el-col>
                    <el-col :span="21">{{data.joinRegion | joinRegion(data.regisAddress) }}</el-col>
                </el-row>
                <el-row v-if="qualList.length>0 || data.qualRecord == 'yes'" class="pb20 tagId">
                    <el-col :span="2.5" class="fw600">资质要求：</el-col>
                    <el-col :span="21">
                        <p v-for="(o,i) of qualList" :key="i">{{o.name}}</p>
                        <el-row v-if="qualList.length>1" class="drc">
                            <el-col :span="2.5">资质关系：</el-col>
                            <el-col :span="21">
                                <template v-if="data.rangeType=='or'">满足任意一个资质条件</template>
                                <template v-else-if="data.rangeType=='and'">满足所有资质条件</template>
                            </el-col>
                        </el-row>
                        <el-row v-if="data.qualRecord == 'yes'">
                            <el-col>
                                <el-col :span="2.5">查询条件-仅查询备案资质</el-col>
                                <el-col :span="21"></el-col>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="peopleList.length>0 || data.personRecord == 'yes'" class="pb20 tagId">
                    <el-col :span="2.5" class="fw600">人员要求：</el-col>
                    <el-col :span="21">
                        <p v-for="(o,i) of peopleList" :key="i">{{o.name}}</p>
                        <el-row v-if="data.personRecord == 'yes'">
                            <el-col>
                                <el-col :span="2.5">查询条件-仅查询备案资质</el-col>
                                <el-col :span="21"></el-col>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <!-- 业绩 -->
                <el-row
                    v-if="data.project&&JSON.stringify(data.project)!='{}'&&((data.project.keywords||data.project.opt!='title'||data.project.optType!='or')||
                data.project.proUse||data.project.proState||data.project.proCount||
                data.project.proBuild||data.project.childProject||
                data.project.proType||data.project.proWhere||
                (data.project.amountStart||data.project.amountEnd)||
                (data.project.completeStart||data.project.completeEnd)||
                (data.project.contractStart||data.project.contractEnd)||
                (data.project.areaStart||data.project.areaEnd))
                "
                    class="pb20 tagId"
                >
                    <el-col :span="2.5" class="fw600">业绩要求：</el-col>
                    <el-col :span="21">
                        <template>
                            <v-zjyj :project="data.project"></v-zjyj>
                        </template>
                    </el-col>
                </el-row>
                <el-row class="pb20" v-if="data.credit&&(data.credit.punishStart||data.credit.punishEnd||data.credit.creditQuery||data.credit.punishType)">
                    <el-col :span="2.5" class="fw600">信用要求：</el-col>
                    <el-col :span="21">
                        <div v-if="data.credit.creditQuery == 'yes'">
                            <div>查询条件-仅查询无行政处罚的企业</div>
                        </div>
                        <div v-else>
                            <div>查询条件-仅查询有行政处罚的企业</div>
                        </div>
                        <div v-if="data.credit.punishType">
                            <div>处罚类别：{{data.credit.punishType}}</div>
                        </div>
                        <div v-if="data.credit.creditKeyword">
                            <div>关键字：{{data.credit.creditKeyword}}</div>
                        </div>
                    </el-col>
                </el-row>
                <!-- 诚信综合评价 -->
                <el-row
                    v-if="data.scoreStart||data.scoreEnd"
                    class="pb20 tagId"
                >
                    <el-col :span="3.5" class="fw600">诚信综合评价：</el-col>
                    <el-col :span="20">
                        <!-- 等级评分-->
                        <div class="fx-box">
                            <div :span="1">综合得分：</div>
                            <div>
                                <template
                                    v-if="!data.scoreStart||data.scoreStart==''"
                                >小于{{data.scoreEnd}}分</template>
                                <template
                                    v-else-if="!data.scoreEnd||data.scoreEnd==''"
                                >大于{{data.scoreStart}}分</template>
                                <template v-if="data.scoreEnd && data.scoreStart">大于{{data.scoreStart}}小于{{data.scoreEnd}}分</template>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <div class="list_bottom dfcc mb20">
                    <div class="line_left mr20"></div>
                    <div class="cp drc">
                        <span class="color-449 fs14">{{showAll?'收起':'展开'}}</span>
                        <i
                            class="iconfont color-449 fs10 cp ml5 iconzhankai"
                            :class="{'iconshouqi':showAll}"
                        ></i>
                    </div>
                    <div class="line_right ml20"></div>
                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
import zjyj from "@/components/zhuancha/zjyj";
import glyj from "@/components/zhuancha/glyj";
import slyj from "@/components/zhuancha/slyj";
export default {
    name: "queryCondition", // 结构名称
    data() {
        return {
            // 数据模型a
            data: {},
            qualList: [],
            peopleList: [],
            showAll: false,
            resultNum: "",
            showArea: false,
            loading: true
        };
    },
    watch: {
        // 监控集合
        data: {
            deep: true,
            handler(newV, oldV) {
                if (newV.qualCode && newV.qualCode != "") {
                    let arr=newV.qualCode.split(',');
                    let arr1 = [];
                    for (let x of arr) {
                        let data = {
                            name: this.forQualName(x)
                        };
                        this.qualList.push(data);
                    }
                }
                if (newV.person && newV.person.length > 0) {
                    for (let o of newV.person) {
                        let data = {};
                        if (o.data.length > 1 && o.perType == "yes") {
                            //一人多证
                            let arr = [];
                            for (let y of o.data) {
                                arr.push(this.forPeopleName(y));
                            }
                            data.name = arr.join("+") + " - " + o.num;
                        } else {
                            data.name =
                                this.forPeopleName(o.data[0]) + " - " + o.num;
                        }
                        this.peopleList.push(data);
                    }
                }
            }
        }
    },
    filters: {
        joinRegion(bei, address) {
            let addressList = JSON.parse(localStorage.getItem("filter")).area;
            let shortName = "";
            for (let x of addressList) {
                if (address == x.name) {
                    shortName = x.shortName;
                    break;
                }
            }
            if (bei == "in") {
                return shortName + "内企业";
            } else if (bei == "enter") {
                return "入" + shortName + "企业";
            } else {
                return "入" + shortName + "+" + shortName + "内企业";
            }
        }
    },
    props: {},
    components: {
        "v-zjyj": zjyj,
        "v-glyj": glyj,
        "v-slyj": slyj
    },
    created() {
        this.$http({
            method: "post",
            url: "/gonglu/get/conditions",
            data: {
                pkid: this.$route.query.pkid
            }
        }).then(res => {
            this.loading = false;
            this.data = res.data.data.condition;
            this.$parent.total = res.data.data.condition.totals;
            this.$router.push({
                path:this.$route.path,
                query:{
                    orderNo:this.$route.query.orderNo,
                    page:this.$route.query.page,
                    pkid:this.$route.query.pkid,
                    source:res.data.data.condition.projectSource
                }
            })
            this.$emit("getArea", this.data.joinRegion);
        });
        //获取search-content底下所有子元素
        var arr = [];
        var tagName = document.getElementsByClassName("tagId");
        this.resultNum = this.countTag(arr, tagName);
    },
    methods: {
        // 方法 集合
        forQualName(arr) {
            //从资质list内取name
            let qualList = JSON.parse(localStorage.getItem("filter")).comQua;
            let arr1 = arr.split("/");
            let str = "";
            for (let x of qualList) {
                for (let y of x.data) {
                    if (arr1[0] == y.code) {
                        str = x.name + " - " + y.name;
                        if (arr1.length > 1) {
                            for (let z of y.data) {
                                if (arr1[1] == z.code) {
                                    str += " - " + z.name;
                                    return str;
                                }
                            }
                        } else {
                            return str;
                        }
                    }
                }
            }
        },
        forPeopleName(arr) {
            let peopleList = JSON.parse(localStorage.getItem("people"));
            let arr1 = arr.split("/");
            let str = "";
            for (let x of peopleList) {
                for (let y of x.list) {
                    if (arr1[0] == y.cateName) {
                        str = x.cateName + " - " + y.cateName;
                        if (arr1.length > 1) {
                            str += " - " + arr1[1];
                            return str;
                        } else {
                            return str;
                        }
                    }
                }
            }
        },
        //获取元素tagId个数
        countTag(tagsArr, tags) {
            for (var i = 0; i < tags.length; i++) {
                tagsArr.push(tags[i].tagName.toLowerCase());
            }
            //定义一个数组用于存放相同的元素
            var temp = [];
            //定义一个空数组用于存放每一个标签；
            var tag = [];
            for (var i = 0; i < tagsArr.length; i++) {
                for (var j = i + 1; j < tagsArr.length + 1; j++) {
                    if (tagsArr[i] == tagsArr[j]) {
                        temp.push(tagsArr[j]);
                        tagsArr.splice(j, 1);
                        j--;
                    }
                    if (j == tagsArr.length - i) {
                        temp.push(tagsArr[i]);
                        tagsArr.splice(i, 1);
                        i--;
                        tag.push(temp);
                        temp = [];
                    }
                }
            }
            return tag;
        }
    }
};
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import "../../style/publicCSS";
.resultsList {
    .list {
        border: 1px solid @initColor;
        min-height: 70px;
        h4 {
            color: #333;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 17px;
            font-weight: normal;
            .return-go {
                color: #fe6603;
                font-size: 14px;
            }
        }
        .list_bottom {
            .line_left,
            .line_right {
                width: 444px;
                height: 1px;
            }
            .line_left {
                background: linear-gradient(
                    90deg,
                    rgba(121, 198, 249, 0) 0%,
                    rgba(68, 148, 240, 1) 100%
                );
            }
            .line_right {
                background: linear-gradient(
                    -90deg,
                    rgba(121, 198, 249, 0) 0%,
                    rgba(68, 148, 240, 1) 100%
                );
            }
        }
    }
    .fx-box {
        display: flex;
    }
}
</style>
