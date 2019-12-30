<!-- 模型： DOM 结构 -->
<template>
    <div class="ZJquery">
        <!-- 头 -->
        <v-head :headTxt="'公路信息综合查询'"></v-head>
        <div class="ZJquery_content">
            <v-publicBread :breadList="breadList"></v-publicBread>
            <!-- 筛选 -->
            <div class="select maxW-box mb20">
                <div class="bottom-bor btnLine pb5">
                    <el-row>
                        <el-col :span="2" class="fw600 fs16 color-150">企业地区</el-col>
                        <el-col :span="22" class="condition">
                            <div
                                class="fs14 cp mr30 mb15 color-5a5"
                                v-for="(el,i) in addressList"
                                :key="i"
                                :class="el.istap?'current':''"
                                @click="addressFn(el)"
                            >
                                <v-icon class="fs14" :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"></v-icon>
                                <span>{{el.areaShortName}}</span>
                            </div>
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
                    <el-col :span="2" style="line-height: 40px;" class="fw600 fs16 color-150">业绩要求</el-col>
                    <el-col :span="22" class="fs14">
                        <!-- 项目关键字 -->
                        <el-row class="flex-center mb20">
                            <el-col :span="1">项目关键字：</el-col>
                            <el-input
                                placeholder="请输入内容,多个关键字用空格隔开"
                                v-model="data.project.keywords"
                                class="element_search"
                            ></el-input>
                            <ul class="drc">
                                <li
                                    class="cp fs14 color-5a5 mr15"
                                    v-for="(item,index) in selectList"
                                    :key="index"
                                    @click="handleSelect(item)"
                                    :class="{'activeZZ': item.id == data.project.opt}"
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
                            <el-col :span="1" class="mr20">多个关键词之间的关系：</el-col>
                            <div class="condition">
                                <div
                                    class="item color-5a5 cp mr20 ml20"
                                    v-for="(el,i) in optGxList"
                                    :key="i"
                                    :class="el.code==data.project.optType?'current':''"
                                    @click="optGxFn(el)"
                                >{{el.name}}</div>
                            </div>
                        </el-row>
                        <!-- 项目属地 -->
                        <el-row class="mb25">
                            <el-col :span="1" class="mr20">项目属地：</el-col>
                            <div class="condition">
                                <div
                                    class="areas mr30 mb15 color-5a5 cp"
                                    v-for="(el,i) of areasList"
                                    :key="'a'+i"
                                    :class="el.istap?'current':''"
                                    @click="areaTap(el)"
                                >
                                    <v-icon class="fs14" :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"></v-icon>
                                    <span>{{el.areaShortName}}</span>
                                </div>
                            </div>
                        </el-row>
                        <!-- 建设状态 -->
                        <el-row class="mb20">
                            <el-col :span="1" class="mr20">建设状态：</el-col>
                            <div class="condition">
                                <div
                                    class="areas mr30 mb15 color-5a5 cp"
                                    v-for="(el,i) of proBuildList"
                                    :key="'a'+i"
                                    :class="el.istap?'current':''"
                                    @click="proBuildTap(el)"
                                >
                                    <v-icon class="fs14" :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"></v-icon>
                                    <span>{{el.areaShortName}}</span>
                                </div>
                            </div>
                        </el-row>
                        <!-- 项目类型 -->
                        <el-row class="mb5">
                            <el-col :span="1" class="mr20">项目类型：</el-col>
                            <div class="condition">
                                <div
                                    class="areas mr30 mb15 color-5a5 cp"
                                    v-for="(el,i) of typeList"
                                    :key="'a'+i"
                                    :class="el.istap?'current':''"
                                    @click="typeTap(el)"
                                >
                                    <v-icon class="fs14" :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"></v-icon>
                                    <span>{{el.areaShortName}}</span>
                                </div>
                            </div>
                        </el-row>
                        <!-- 项目金额 -->
                        <el-row class="flex-center mb20">
                            <el-col :span="1" class="mr20">中标金额/合同金额：</el-col>
                            <el-input
                                placeholder="最低价（万元）"
                                v-model="data.project.amountStart"
                                class="inputW element_search"
                                @keyup.native="data.project.amountStart=data.project.amountStart.replace(/\D/g,'')"
                            ></el-input>至
                            <el-input
                                placeholder="最高价（万元）"
                                v-model="data.project.amountEnd"
                                class="inputW r element_search"
                                @keyup.native="data.project.amountEnd=data.project.amountEnd.replace(/\D/g,'')"
                            ></el-input>
                        </el-row>
                        <!-- 竣工验收日期 -->
                        <el-row class="flex-center">
                            <el-col :span="1" class="mr20">竣工验收日期：</el-col>
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
                <el-row class="bottom-bor pt20 fs14">
                    <el-col :span="2" class="fw600 fs16 color-150">信用等级</el-col>
                    <el-col :span="22">
                        <!-- 评价类型 -->
                        <el-row class="mb25">
                            <el-col :span="1" class="mr20">评价类型：</el-col>
                            <div class="condition">
                                <div
                                    class="areas mr30 mb15 color-5a5 cp"
                                    v-for="(el,i) of creditTypeList"
                                    :key="'a'+i"
                                    :class="data.credit.creditType==el?'current':''"
                                    @click="creditTypeFn(el)"
                                >{{el}}</div>
                            </div>
                        </el-row>
                        <!-- 评价省份 -->
                        <el-row v-if="data.credit.creditType=='施工'||data.credit.creditType=='设计'" class="mb25">
                            <el-col :span="1" class="mr20">评价省份：</el-col>
                            <div class="condition">
                                <div
                                    class="areas mr30 mb15 color-5a5 cp"
                                    v-for="(el,i) of pjareasList"
                                    :key="'a'+i"
                                    :class="el.code==data.credit.province?'current':''"
                                    @click="pjareaTap(el)"
                                >{{el.areaShortName}}</div>
                            </div>
                        </el-row>
                        <!-- 年份评分 -->
                        <el-row v-for="(el,i) of evaluateList" :key="'a'+i" class="mb25">
                            <el-col :span="1" class="mr20">{{el.year}}年度：</el-col>
                            <div class="condition">
                                <div
                                    class="areas mr30 mb15 color-5a5 cp"
                                    v-for="(x,y) of el.list"
                                    :key="'a'+y"
                                    :class="x.istap?'current':''"
                                    @click="yearTap(el,x)"
                                >
                                    <v-icon class="fs14" :iconClass="x.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"></v-icon>
                                    <span>{{x.areaShortName}}</span></div>
                            </div>
                        </el-row>
                        <!-- 评分 -->
                        <el-row class="flex-center">
                            <el-col :span="1" class="mr20">等级评分：</el-col>
                            <el-input
                                placeholder="最低分(小数)"
                                v-model="data.credit.scoreStart"
                                class="inputW element_search"
                                @keyup.native="returnInt(0)"
                            ></el-input>至
                            <el-input
                                placeholder="最高分(小数)"
                                v-model="data.credit.scoreEnd"
                                class="inputW r element_search"
                                @keyup.native="returnInt(1)"
                            ></el-input>
                            <div class="rule">
                                <div class="color-449">
                                    <span>评分规则</span>
                                    <i class="iconfont iconjieshi fs12"></i>
                                </div>
                                <div class="rule-box">
                                    <div class="fs14 fw600 text-c mb10">评分规则</div>
                                    <ul>
                                        <li class="btnLine fs14 color-5a5 pl20" v-for="(el,i) of ruleList" :key="i">
                                            <span>{{el.year}}：</span>
                                            <div>
                                                <span>
                                                    <font>AA</font>
                                                    <font>{{el.int1}}</font>
                                                </span>
                                                <span>
                                                    <font>A</font>
                                                    <font>{{el.int2}}</font>
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <!-- 承上启下 -->
            <div class="totalBox pl40 pr40 pt40 pb40 maxW-box" :class="{'btnFixed': showFixed}">
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
                    <p class="down">多数据联动查询</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import screenZZ from "@/components/screenZZ";
import screenRY from "@/components/zhuancha/screenRY";
import heads from "@/components/head3";
import publicBread from "@/components/customize/publicBread";
export default {
    name: "ZJquery", // 结构名称
    data() {
        return {
            breadList: [{ title: "公路信息综合查询系统" }],
            // 数据模型
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
            typeList: [],
            addressList: [],
            companyQuals: [],
            areasList: [],
            pjareasList: [],
            peopleList: [],
            proBuildList: [], //建设状态
            creditTypeList: ["施工", "设计", "监理"],
            evaluateList: [], //评价年份等级
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
                    proBuild: "", //建设状态
                    proType: "", //业绩类型
                    amountStart: "", //最低价
                    amountEnd: "", //最高价
                    completeStart: "", //竣工起始日期
                    completeEnd: "", //竣工结束日期
                    optType: "or"
                },
                person: [],
                zhuanchaType: "gonglu",
                credit: {
                    province: "", //评价省份
                    creditType: "", //评价类型
                    scoreStart: "", //最低评分
                    scoreEnd: "", //最高评分
                    evaluateYear: "" //评价年份 示例：2018/AA,B;2017/B,C
                }
            },
            total: 0,
            isyj: false,
            isoptType: false,
            ruleList: [
                {
                    year: "近1年",
                    int1: 0.5,
                    int2: 0.3
                },
                {
                    year: "近2年",
                    int1: 0.3,
                    int2: 0.18
                },
                {
                    year: "近3年",
                    int1: 0.2,
                    int2: 0.12
                }
            ],
            id: null,
            dataStr: "",
            isNoSee: true,
            showFixed: false,
        };
    },
    watch: {
        // 监控集合
        "data.project": {
            deep: true,
            handler(newval, oldVal) {
                if (
                    newval.keywords != "" ||
                    newval.opt != "title" ||
                    newval.proWhere ||
                    newval.proBuild ||
                    newval.proType ||
                    newval.amountStart ||
                    newval.amountEnd ||
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
        "v-head": heads,
        "v-publicBread": publicBread
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
        this.pjareasList = JSON.parse(JSON.stringify(this.addressList));

        let ryData = JSON.parse(localStorage.getItem("people"));
        this.peopleList = ryData;
        let proBuildData = JSON.parse(localStorage.getItem("proType"));
        for (let x of proBuildData.gonglu.build) {
            let d = {
                areaShortName: x,
                istap: false
            };
            this.proBuildList.push(d);
        }
        for (let x of proBuildData.gonglu.proType) {
            let d = {
                areaShortName: x,
                istap: false
            };
            x = d;
            this.typeList.push(d);
        }
        this.proBuildList.unshift({
            areaShortName: "不限",
            istap: true
        });
        this.typeList.unshift({
            areaShortName: "不限",
            istap: true
        });
        this.evaluateListFn();
        // this.ajax();
        // this.data=this.$store.state.queryData;
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
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
            let t = /^(0|0\.[1-9]{1,2}|1)$/;
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
        evaluateListFn() {
            let arr = [];
            let nowYear = new Date().getFullYear();
            let l = [
                //评价年份等级
                {
                    areaShortName: "不限",
                    istap: true
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
                    areaShortName: "B",
                    istap: false
                },
                {
                    areaShortName: "C",
                    istap: false
                },
                {
                    areaShortName: "D",
                    istap: false
                }
            ];
            for (let x = 1; x < 4; x++) {
                let d = {
                    year: nowYear - x,
                    list: JSON.parse(JSON.stringify(l))
                };
                arr.push(d);
            }
            this.evaluateList = arr;
        },
        handleSelect(data) {
            this.data.project.opt = data.id;
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
        typeTap(el) {
            //项目类型
            this.selectFn(el, this.typeList);
            this.data.project.proType = this.forArrStr(this.typeList);
            // this.ajax()
        },
        proBuildTap(el) {
            this.selectFn(el, this.proBuildList);
            this.data.project.proBuild = this.forArrStr(this.proBuildList);
        },
        optGxFn(el) {
            //多个关键词之间的关系
            this.data.project.optType = el.code;
        },
        creditTypeFn(el) {
            //评价类型
            if (el != "监理" && el != "") {
                this.data.credit.province = this.$parent.source.source;
            } else {
                this.data.credit.province = null;
            }
            if (this.data.credit.creditType == el) {
                this.data.credit.creditType = null;
                this.data.credit.province = null;
            } else {
                this.data.credit.creditType = el;
            }
        },
        pjareaTap(el) {
            //评价省份
            if (el.areaShortName == "全国") {
                this.data.credit.province = "";
            } else {
                this.data.credit.province = el.code;
            }
            // this.data.credit.province=this.forArrStr(this.pjareasList);
        },
        yearTap(el, x) {
            //评价年份
            this.selectFn(x, el.list);
            // let str=this.forArrStr(el.list);
            let arr = [];
            for (let o in this.evaluateList) {
                if (
                    this.forArrStr(this.evaluateList[o].list) &&
                    this.forArrStr(this.evaluateList[o].list) != ""
                ) {
                    let str =
                        this.evaluateList[o].year +
                        "/" +
                        this.forArrStr(this.evaluateList[o].list);
                    arr.push(str);
                }
            }
            this.data.credit.evaluateYear = arr.join(";");
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
                (this.data.credit.province != "" ||
                    this.data.credit.creditType != "" ||
                    this.data.credit.scoreStart != "" ||
                    this.data.credit.scoreEnd != "" ||
                    this.data.credit.evaluateYear != "")
            ) {
                let id = this.id;
                let query = {
                    id: id,
                    type: "gl"
                };
                // this.openNewLink('/queryPay',query)
                this.$router.push({
                    path: "/queryPay",
                    query: query
                });
            } else {
                this.$alert("请至少筛选人员，资质，业绩,信用等级中的一项");
            }
        },
        //滑动是否查看详情浮动;
        handleScroll() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            var height = document.body.offsetHeight;
            let ckh=window.innerHeight;//窗口高度
            console.log(height);
            let h=height-503;//实际高度 503=40(fix的margin)+128(fix层高度)+335(底部高度)
            if(h-ckh>scrollTop){
                this.showFixed = true;
            }else{
                this.showFixed = false;
            }
        }
    }
};
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
@import "../../style/query.less";
@import "../../style/publicCSS.less";
.ZJquery_content {
    position: relative;
    width: 1020px;
    margin: 0 auto;
    padding-bottom: 168px;
    .select {
        border: 1px solid @initColor;
        padding: 20px;
    }
    .rule {
        margin-left: 20px;
        position: relative;
        display: inline-block;
        font-size: 12px;
        cursor: pointer;
        .color-font {
            color: @color;
        }
        .rule-box {
            display: none;
            position: absolute;
            background: #fff;
            width: 340px;
            bottom: calc(-100% + 55px);
            transform: translateX(-50%);
            left: 260%;
            border-radius: 5px;
            box-shadow:0px 0px 7px 0px rgba(0,0,0,0.13);
            padding: 10px 20px 15px;
            ul {
                box-sizing: border-box;
                border-top: 1px solid @initColor;
                border-left: 1px solid @initColor;
                border-right: 1px solid @initColor;
                li {
                    height: 36px;
                    display: flex;
                    align-items: center;
                    div {
                        width: calc((100% / 3) * 2);
                        display: flex;
                        justify-content: space-between;
                        span {
                            width: 50%;
                            font:last-child {
                                margin-left: 15px;
                            }
                        }
                    }
                    span {
                        flex-grow: 1;
                    }
                }
            }
            .arrow {
                position: absolute;
                top:5px;
                right:-16px; /* 圆角的位置需要细心调试哦 */
                width:0;
                height:0;
                font-size:0;
                border:solid 8px;
                border-color:#4D4948 #4D4948 #4D4948 #F8C301;
            }
        }
    }
    .rule:hover .rule-box {
        display: block;
    }
    .activeZZ {
        color: @themeColor;
        font-weight: 600;
    }
    .btnFixed {
        position: fixed;
        bottom: 0;
        z-index: 10;
    }
}
</style>
