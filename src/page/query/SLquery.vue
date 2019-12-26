<!-- 模型： DOM 结构 -->
<template>
    <div class="ZJquery">
        <!-- 头 -->
        <v-head :headTxt="'水利信息综合查询'"></v-head>
        <div class="ZJquery_body">
            <v-bread :breadList="breadList"></v-bread>
            <!-- 筛选 -->
            <div class="ZJquery_content fs14">
                <div class="select maxW-box">
                    <div class="bottom-bor">
                        <el-row class="btnLine">
                            <el-col :span="2" class="fs16 fw600 color-150">企业地区</el-col>
                            <el-col :span="22" class="condition">
                                <div
                                    class="fs14 cp mr40 mb15 color-5a5"
                                    v-for="(el,i) in addressList"
                                    :key="i"
                                    :class="el.istap?'current':''"
                                    @click="addressFn(el)"
                                >{{el.areaShortName}}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 资质 -->
                    <v-screenzz
                        class="bottom-bor"
                        :qualList="companyQuals"
                        @contentChange="screenzzFn"
                        :zztype="data.qualCode"
                        :query="true"
                    ></v-screenzz>
                    <!-- 人员 -->
                    <v-screenry class="bottom-bor" :qualList="peopleList" @contentChange="screenryFn"></v-screenry>
                    <!-- 业绩要求 -->
                    <el-row class="yj bottom-bor pt20 pb20 btnLine">
                        <el-col :span="2" style="line-height: 40px;" class="fs16 fw600 color-150">业绩要求</el-col>
                        <el-col :span="22">
                            <!-- 项目关键字 -->
                            <el-row class="flex-center mb20">
                                <el-col :span="1">项目关键字：</el-col>
                                <el-input
                                    placeholder="请输入内容,多个关键字用空格隔开"
                                    v-model="data.project.keywords"
                                ></el-input>
                                <ul class="drc condition">
                                    <li
                                        class="cp fs14 color-5a5 mr15"
                                        v-for="(item,index) in selectList"
                                        :key="index"
                                        @click="handleSelect(item)"
                                        :class="{'current': item.id == data.project.opt}"
                                    >
                                        <i
                                            class="iconfont icondanxuan-daixuan"
                                            :class="{'hide': item.id == data.project.opt}"
                                        ></i>
                                        <i
                                            class="iconfont icondanxuan-xuanzhong hide"
                                            :class="{'block': item.id == data.project.opt}"
                                        ></i>
                                        <span>{{item.content}}</span>
                                    </li>
                                </ul>
                            </el-row>
                            <!-- 多个关键词之间的关系 -->
                            <el-row v-if="isoptType" class="mb40">
                                <el-col :span="1">多个关键词之间的关系：</el-col>
                                <div class="condition">
                                    <div
                                        class="item mr40"
                                        v-for="(el,i) in optGxList"
                                        :key="i"
                                        :class="el.code==data.project.optType?'current':''"
                                        @click="optGxFn(el)"
                                    >{{el.name}}</div>
                                </div>
                            </el-row>
                            <!-- 项目属地 -->
                            <el-row class="mb25">
                                <el-col :span="1">项目属地：</el-col>
                                <div class="condition">
                                    <div
                                        class="areas cp mr40 mb15 color-5a5"
                                        v-for="(el,i) of areasList"
                                        :key="'a'+i"
                                        :class="el.istap?'current':''"
                                        @click="areaTap(el)"
                                    >{{el.areaShortName}}</div>
                                </div>
                            </el-row>
                            <!-- 项目状态 -->
                            <el-row>
                                <el-col :span="1">项目状态：</el-col>
                                <div class="condition">
                                    <div
                                        class="areas cp mr40 mb15 color-5a5"
                                        v-for="(el,i) of proStateList"
                                        :key="'a'+i"
                                        :class="data.project.proState==el.code?'current':''"
                                        @click="proStateTap(el)"
                                    >{{el.name}}</div>
                                </div>
                            </el-row>
                            <!-- 项目金额 -->
                            <el-row class="flex-center mb20">
                                <el-col :span="1">项目金额：</el-col>
                                <el-input
                                    placeholder="最低价（万元）"
                                    v-model="data.project.amountStart"
                                    class="inputW"
                                    @keyup.native="data.project.amountStart=data.project.amountStart.replace(/\D/g,'')"
                                ></el-input>至
                                <el-input
                                    placeholder="最高价（万元）"
                                    v-model="data.project.amountEnd"
                                    class="inputW r"
                                    @keyup.native="data.project.amountEnd=data.project.amountEnd.replace(/\D/g,'')"
                                ></el-input>
                            </el-row>
                            <!-- 竣工验收日期 -->
                            <el-row class="flex-center">
                                <el-col :span="1">完工日期：</el-col>
                                <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    v-model="data.project.completeStart"
                                    type="date"
                                    placeholder="起始日期"
                                    class="inputW"
                                ></el-date-picker>至
                                <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    v-model="data.project.completeEnd"
                                    type="date"
                                    placeholder="结束日期"
                                    class="inputW r"
                                ></el-date-picker>
                            </el-row>
                        </el-col>
                    </el-row>
                    <!--  -->
                    <el-row class="bottom-bor pt20">
                        <el-col :span="2" class="fs16 fw600 color-150">信用等级</el-col>
                        <el-col :span="22">
                            <!-- 申请类型 -->
                            <el-row class="mb20">
                                <el-col :span="1">申请类型：</el-col>
                                <div class="condition">
                                    <div
                                        class="areas cp mr40 color-5a5"
                                        v-for="(el,i) of applyList"
                                        :key="'a'+i"
                                        :class="el.istap?'current':''"
                                        @click="applyTap(el)"
                                    >{{el.areaShortName}}</div>
                                </div>
                            </el-row>
                            <!-- 信用等级 -->
                            <el-row>
                                <el-col :span="1">信用等级：</el-col>
                                <div class="condition">
                                    <div
                                        class="areas cp mr40 color-5a5"
                                        v-for="(el,i) of levelsList"
                                        :key="'a'+i"
                                        :class="el.istap?'current':''"
                                        @click="levelsTap(el)"
                                    >{{el.areaShortName}}</div>
                                </div>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <!-- 承上启下 -->
                <div class="totalBox maxW-box pl40 pr40 pt40 pb40">
                    <div class="leftl">
                        <div class="bottom_img">
                            <i class="iconfont iconwancheng"></i>
                        </div>
                        <p>
                            共为您找到
                            <span>
                                <template v-if="total">
                                    <template v-if="total==5000">5000+家</template>
                                    <template v-else>{{total}}家</template>
                                </template>
                                <template v-else>0家</template>
                            </span>
                            符合要求企业
                        </p>
                        <button class="btn" :class="total==0||isNoSee?'ban':''" @click="jump">查看详情</button>
                    </div>
                    <div class="rightr fs14">
                        <p class="up mb5 pb5">服务电话：0731-85076077</p>
                        <p class="down">付费后可下载数据报告</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import screenZZ from "@/components/screenZZ";
import screenRY from "@/components/zhuancha/screenRY";
import heads from "@/components/head3";
export default {
    name: "ZJquery", // 结构名称
    data() {
        return {
            // 数据模型
            breadList: [{ title: "水利信息综合查询" }], //面包屑列表,以对象形式添加;
            optGxList: [
                {
                    name: "满足任意一个",
                    code: "or"
                },
                {
                    name: "满足所有",
                    code: "and"
                }
            ],
            addressList: [],
            companyQuals: [],
            areasList: [],
            peopleList: [],
            proStateList: [], //项目状态
            applyList: [
                //申请类型
                {
                    areaShortName: "不限",
                    istap: true
                },
                {
                    areaShortName: "勘察",
                    istap: false
                },
                {
                    areaShortName: "设计",
                    istap: false
                },
                {
                    areaShortName: "施工",
                    istap: false
                },
                {
                    areaShortName: "监理",
                    istap: false
                }
            ],
            levelsList: [
                //信用等级
                {
                    areaShortName: "不限",
                    istap: true
                },
                {
                    areaShortName: "AAA",
                    istap: false
                },
                {
                    areaShortName: "AA",
                    istap: false
                },
                {
                    areaShortName: "A",
                    istap: false
                },
                {
                    areaShortName: "BBB",
                    istap: false
                },
                {
                    areaShortName: "CCC",
                    istap: false
                }
            ],
            selectList: [
                //选择查询条件
                {
                    id: "title",
                    content: "根据标题搜索"
                },
                {
                    id: "scope",
                    content: "根据规模搜索"
                },
                {
                    id: "title_and_scope",
                    content: "根据标题和规模搜索"
                }
            ],
            data: {
                qualCode: "", //资质
                rangeType: "", //资质关系
                regisAddress: "",
                project: {
                    opt: "title", //搜索类型
                    keywords: "", //搜索关键字
                    proWhere: "", //项目属地
                    proState: "", //项目状态
                    amountStart: "", //最低价
                    amountEnd: "", //最高价
                    completeStart: "", //竣工起始日期
                    completeEnd: "", //竣工结束日期
                    optType: "or"
                },
                person: [],
                zhuanchaType: "shuili",
                credit: {
                    levels: "", //信用等级
                    creditType: "" //申请类型
                }
            },
            total: 0,
            isyj: false,
            isoptType: false,
            id: null,
            dataStr: "",
            isNoSee: true
        };
    },
    watch: {
        // 监控集合
        // 'data.project.keywords'(newVal,oldVal){
        //     this.ajax()
        // },
        "data.project": {
            deep: true,
            handler(newval, oldVal) {
                if (
                    newval.keywords != "" ||
                    newval.opt != "title" ||
                    newval.proState ||
                    newval.proWhere ||
                    newval.amountStart ||
                    newval.amountEn ||
                    newval.completeStart ||
                    newval.completeEnd
                ) {
                    //如果筛选了业绩，则显示符合业绩数量
                    this.isyj = true;
                } else {
                    this.isyj = false;
                }
                let arr = newval.keywords.split(" ");
                if (arr.length > 1) {
                    this.isoptType = true;
                } else {
                    this.isoptType = false;
                }
            }
        },
        data: {
            deep: true,
            handler(newVal, oldVal) {
                if (JSON.stringify(newVal) == this.dataStr) {
                    this.isNoSee = true;
                    return;
                }
                this.isNoSee = false;
                this.ajax();
            }
        }
    },
    inject: ["reload"],
    components: {
        "v-screenzz": screenZZ,
        "v-screenry": screenRY,
        "v-head": heads
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let data = JSON.parse(localStorage.getItem("filter"));
        this.dataStr = JSON.stringify(this.data);
        // for(let x in data.comQua){//剔除公路养护及地质灾害防治单位条件
        //     if(data.comQua[x].name=='公路养护'){
        //         data.comQua.splice(x,1);
        //     }
        // }
        // for(let x in data.comQua){//剔除公路养护及地质灾害防治单位条件
        //     if(data.comQua[x].name=='地质灾害防治单位'){
        //         data.comQua.splice(x,1);
        //     }
        // }
        for (let x of data.area) {
            x.code = x.name;
            x.istap = false;
        }
        this.addressList = JSON.parse(JSON.stringify(data.area));
        this.addressList.unshift({
            areaShortName: "全国",
            code: "",
            istap: true
        });
        this.companyQuals = data.comQua;
        this.areasList = data.area;
        this.areasList.unshift({
            areaShortName: "不限",
            istap: true
        });
        let ryData = JSON.parse(localStorage.getItem("people"));
        this.peopleList = ryData;
        let proBuildData = JSON.parse(localStorage.getItem("proType"));
        for (let x of proBuildData.shuili.proStatus) {
            let d = {
                name: x,
                code: x
            };
            this.proStateList.push(d);
        }
        this.proStateList.unshift({
            name: "不限",
            code: null
        });
        // this.ajax()
        // this.data=this.$store.state.queryData;
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
        returnInt(i) {
            //匹配小于1的保留一位的正小数
            let t = /^(0|0\.[1-9])$/;
            if (i == 0) {
                if (!t.test(this.data.credit.scoreStart * 1)) {
                    this.data.credit.scoreStart = "";
                }
            } else if (i == 1) {
                if (!t.test(this.data.credit.scoreEnd * 1)) {
                    this.data.credit.scoreEnd = "";
                }
            }
        },
        addressFn(el) {
            this.selectFn(el, this.addressList, "全国");
            this.data.regisAddress = this.forArrStr(this.addressList, "全国");
            // this.ajax()
        },
        screenzzFn(val) {
            //接受资质变化抛出的值
            this.data.qualCode = val.str;
            this.data.rangeType = val.type;
            // this.ajax()
        },
        screenryFn(val) {
            //接受人员变化抛出的值
            this.data.person = val;
            // this.ajax()
        },
        forArrStr(arr, str1 = "不限") {
            //从数组中取出对应值
            let a = [];
            let str = "";
            for (let x of arr) {
                if (x.istap) {
                    if (x.areaShortName == str1) {
                        str = null;
                        return str;
                    }
                    if (str1 == "不限") {
                        a.push(x.areaShortName);
                    } else {
                        a.push(x.name);
                    }
                }
            }
            str = a.join(",");
            return str;
        },
        forInLength(arr) {
            //其他都没选，自动选不限
            let a = [];
            for (let x of arr) {
                if (x.istap) {
                    a.push(x.areaShortName);
                }
            }
            if (a.length == 0) {
                return true;
            } else {
                return false;
            }
        },
        backSelect(arr, str = "不限") {
            //选不限时，其他取消选择
            for (let x of arr) {
                if (x.areaShortName != str) {
                    x.istap = false;
                }
            }
        },
        selectFn(el, arr, str = "不限") {
            //选择
            if (el.areaShortName == str) {
                el.istap = true;
                this.backSelect(arr, str);
            } else {
                el.istap = !el.istap;
                if (this.forInLength(arr)) {
                    arr[0].istap = true;
                } else {
                    arr[0].istap = false;
                }
            }
        },
        areaTap(el) {
            //项目属地
            this.selectFn(el, this.areasList);
            this.data.project.proWhere = this.forArrStr(this.areasList);
            // this.ajax()
        },
        optGxFn(el) {
            //多个关键词之间的关系
            this.data.project.optType = el.code;
        },
        applyTap(el) {
            //申请类型
            this.selectFn(el, this.applyList);
            this.data.credit.creditType = this.forArrStr(this.applyList);
        },
        levelsTap(el) {
            //信用等级
            this.selectFn(el, this.levelsList);
            this.data.credit.levels = this.forArrStr(this.levelsList);
        },
        proStateTap(el) {
            //项目状态
            this.data.project.proState = el.code;
        },
        handleSelect(data) {
            this.data.project.opt = data.id;
        },
        ajax() {
            //查询
            this.total = 0;
            let data = JSON.parse(JSON.stringify(this.data));
            if (data.project.keywords && data.project.keywords != "") {
                data.project.keywords = data.project.keywords.replace(
                    / /g,
                    ","
                );
            } else {
                data.project.opt = "";
            }
            if (!this.isyj) {
                data.project.proCount = "";
            }
            if (!this.isoptType) {
                data.project.optType = "";
            }
            data.project = this.filterParams(data.project);
            data.credit = this.filterParams(data.credit);
            data = this.filterParams(data);
            let that = this;
            this.$http({
                method: "post",
                url: "/gonglu/count",
                data: data
            }).then(res => {
                if (res.data.code == 1) {
                    that.total = res.data.data.count;
                    that.id = res.data.data.pkid;
                } else {
                    that.$alert(res.data.msg);
                }
            });
        },
        jump() {
            if (this.total == 0 || this.isNoSee) {
                return false;
            }
            if (
                this.isyj ||
                this.data.qualCode != "" ||
                this.data.person.length > 0 ||
                (this.data.credit.levels != "" ||
                    this.data.credit.creditType != "")
            ) {
                let id = this.id;
                let query = {
                    id: id,
                    type: "sl"
                };
                // this.openNewLink('/queryPay',query)
                this.$router.push({
                    path: "/queryPay",
                    query: query
                });
            } else {
                this.$alert("请至少筛选人员，资质，业绩,信用等级中的一项");
            }
        }
    }
};
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
@import "../../style/query.less";
@import "../../style/publicCSS.less";
.ZJquery {
    .ZJquery_body {
        width: 1020px;
        margin: 0 auto;
    }
}
</style>
