<!-- 模型： DOM 结构 -->
<template>
    <div class="ZJquery">
        <!-- 头 -->
        <v-head :headTxt="'住建信息综合查询'"></v-head>
        <div class="ZJquery_body">
            <v-bread :breadList="breadList"></v-bread>
            <div class="ZJquery_content fs14">
                <!-- 筛选 -->
            <div class="select maxW-box mb20 fs14">
                <div class="bottom-bor">
                    <el-row class="btnLine">
                        <el-col :span="2" class="fs16 fw600 color-150">企业地区</el-col>
                        <el-col :span="22" class="condition">
                            <div
                                class="cp mr30 mb15 color-5a5"
                                v-for="(el,i) in addressList"
                                :key="i"
                                :class="el.code==data.regisAddress?'current':''"
                                @click="addressFn(el)"
                            >
                                <v-icon class="fs14" :iconClass="el.code==data.regisAddress?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"></v-icon>
                                <span>{{el.areaShortName}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="btnLine pt20 pb5" v-if="data.regisAddress!=''">
                        <el-col :span="2" class="fs16 fw600 color-150">备案地区</el-col>
                        <el-col :span="22" class="condition">
                            <div
                                class="cp mr30 mb15 color-5a5"
                                v-for="(el,i) in recordList"
                                :key="i"
                                :class="el.code==data.joinRegion?'current':''"
                                @click="isBeiFn(el)"
                            >
                                {{el.name}}
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
                <el-row class="yj bottom-bor pt20">
                    <el-col :span="2" style="line-height: 40px;" class="fw600 fs16 color-150">业绩要求</el-col>
                    <el-col :span="22">
                        <!-- 项目关键字 -->
                        <el-row class="flex-center mb20">
                            <el-col :span="1">项目关键字：</el-col>
                            <el-input
                                class="element_search"
                                placeholder="请输入内容,多个关键字用空格隔开"
                                v-model="data.project.keywords"
                            ></el-input>
                            <ul class="drc condition">
                                <li
                                    class="cp color-5a5 mr15"
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
                            <div class="condition color-5a5 cp">
                                <div
                                    class="item mr20 ml20"
                                    v-for="(el,i) in optGxList"
                                    :key="i"
                                    :class="el.code==data.project.optType?'current':''"
                                    @click="optGxFn(el)"
                                >{{el.name}}</div>
                            </div>
                        </el-row>
                        <!-- 业绩所含子项 -->
                        <el-row>
                            <el-col :span="1">业绩所含子项：</el-col>
                            <div class="condition mb25">
                                <div
                                    class="item cp mr30 mb15 color-5a5"
                                    v-for="(el,i) in itemList"
                                    :key="i"
                                    :class="el.istap?'current':''"
                                    @click="itemFn(el)"
                                >
                                    <v-icon class="fs14" :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"></v-icon>
                                    <span>{{el.areaShortName}}</span>
                                </div>
                            </div>
                        </el-row>
                        <!-- 项目属地 -->
                        <el-row>
                            <el-col :span="1">项目属地：</el-col>
                            <div class="condition mb25">
                                <div
                                    class="areas cp mr30 mb15 color-5a5"
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
                        <!-- 工程用途 -->
                        <el-row>
                            <el-col :span="1">工程用途：</el-col>
                            <div class="condition mb25">
                                <div
                                    class="areas cp mr30 mb15 color-5a5"
                                    v-for="(el,i) of purposeList"
                                    :key="'a'+i"
                                    :class="el.istap?'current':''"
                                    @click="purposeTap(el)"
                                >
                                    <v-icon class="fs14" :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"></v-icon>
                                    <span>{{el.areaShortName}}</span>
                                </div>
                            </div>
                        </el-row>
                        <!-- 业绩类型 -->
                        <el-row class="mb5">
                            <el-col :span="1">业绩类型：</el-col>
                            <div class="condition">
                                <div
                                    class="areas cp mr30 mb15 color-5a5"
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
                        <!-- 中标金额/合同金额 -->
                        <el-row class="flex-center mb20">
                            <el-col :span="1">中标金额/合同金额：</el-col>
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
                        <!-- 中标日期/合同签订日期 -->
                        <el-row class="flex-center mb20">
                            <el-col :span="1">中标日期/合同签订日期：</el-col>
                            <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="data.project.contractStart"
                                type="date"
                                placeholder="起始日期"
                                class="inputW"
                            ></el-date-picker>至
                            <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="data.project.contractEnd"
                                type="date"
                                placeholder="结束日期"
                                class="inputW r"
                            ></el-date-picker>
                        </el-row>
                        <!-- 竣工验收日期 -->
                        <el-row class="flex-center mb20">
                            <el-col :span="1">竣工验收日期：</el-col>
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
                        <!-- 面积 -->
                        <el-row class="flex-center">
                            <el-col :span="1">面积（平方米）：</el-col>
                            <el-input
                                placeholder="最小面积（㎡）"
                                v-model="data.project.areaStart"
                                class="inputW element_search"
                                @keyup.native="data.project.areaStart=data.project.areaStart.replace(/\D/g,'')"
                            ></el-input>至
                            <el-input
                                placeholder="最大面积（㎡）"
                                v-model="data.project.areaEnd"
                                class="inputW r element_search"
                                @keyup.native="data.project.areaEnd=data.project.areaEnd.replace(/\D/g,'')"
                            ></el-input>
                        </el-row>
                        <!-- 符合业绩条件的数量 -->
                        <el-row v-if="isyj" class="mt20">
                            <el-col :span="1">符合业绩条件的数量：</el-col>
                            <el-input-number v-model="data.project.proCount" :min="1" size="mini"></el-input-number>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <!-- 承上启下 -->
            <div class="totalBox maxW-box pl40 pr40 pt40 pb40" :class="{'btnFixed': showFixed}">
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
                <div class="rightr fs15">
                    <p class="up mb5 pb5">服务电话：0731-85076077</p>
                    <p class="down">多数据联动查询</p>
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
            breadList: [{ title: "住建信息综合查询" }], //面包屑列表,以对象形式添加;
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
            recordList: [
                //备案地区
                {
                    name: "渝内企业",
                    code: "in"
                },
                {
                    name: "入渝企业",
                    code: "enter"
                },
                {
                    name: "入渝+渝内企业",
                    code: "all_in"
                }
            ],
            itemList: [
                //业绩所含子项
                {
                    areaShortName: "招投标",
                    istap: false
                },
                {
                    areaShortName: "施工图审查",
                    istap: false
                },
                {
                    areaShortName: "合同备案",
                    istap: false
                },
                {
                    areaShortName: "施工许可证",
                    istap: false
                },
                {
                    areaShortName: "竣工验收",
                    istap: false
                }
            ],
            purposeList: [
                //工程用途
                {
                    areaShortName: "不限",
                    istap: true
                },
                {
                    areaShortName: "公共建筑",
                    istap: false
                },
                {
                    areaShortName: "公共建筑配套工程",
                    istap: false
                },
                {
                    areaShortName: "办公建筑",
                    istap: false
                },
                {
                    areaShortName: "居住建筑",
                    istap: false
                },
                {
                    areaShortName: "居住建筑配套工程",
                    istap: false
                },
                {
                    areaShortName: "工业建筑",
                    istap: false
                },
                {
                    areaShortName: "工业建筑配套工程",
                    istap: false
                },
                {
                    areaShortName: "商业建筑",
                    istap: false
                },
                {
                    areaShortName: "商住楼",
                    istap: false
                },
                {
                    areaShortName: "农业建筑",
                    istap: false
                },
                {
                    areaShortName: "农业建筑配套工程",
                    istap: false
                },
                {
                    areaShortName: "交通运输类",
                    istap: false
                },
                {
                    areaShortName: "公共交通",
                    istap: false
                },
                {
                    areaShortName: "旅游建筑",
                    istap: false
                },
                {
                    areaShortName: "科教文卫建筑",
                    istap: false
                },
                {
                    areaShortName: "给水",
                    istap: false
                },
                {
                    areaShortName: "排水",
                    istap: false
                },
                {
                    areaShortName: "道路",
                    istap: false
                },
                {
                    areaShortName: "桥隧",
                    istap: false
                },
                {
                    areaShortName: "环境园林",
                    istap: false
                },
                {
                    areaShortName: "风景园林",
                    istap: false
                },
                {
                    areaShortName: "热力",
                    istap: false
                },
                {
                    areaShortName: "燃气",
                    istap: false
                },
                {
                    areaShortName: "通信建筑",
                    istap: false
                }
            ],
            typeList: [
                //业绩类型
                {
                    areaShortName: "不限",
                    istap: true
                },
                {
                    areaShortName: "施工",
                    istap: false
                },
                {
                    areaShortName: "设计",
                    istap: false
                },
                {
                    areaShortName: "勘察",
                    istap: false
                },
                {
                    areaShortName: "监理",
                    istap: false
                },
                {
                    areaShortName: "施工设计一体化",
                    istap: false
                },
                {
                    areaShortName: "劳务",
                    istap: false
                },
                {
                    areaShortName: "项目管理",
                    istap: false
                }
            ],
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
            data: {
                joinRegion: "all_in", //备案地区
                qualCode: "", //资质
                rangeType: "",
                regisAddress: "",
                project: {
                    opt: "title", //搜索类型
                    keywords: "", //搜索关键字
                    childProject: "", //业务所含子项
                    proWhere: "", //项目属地
                    proUse: "", //工程用途
                    proType: "", //业绩类型
                    amountStart: "", //最低价
                    amountEnd: "", //最高价
                    contractStart: "", //起始日期
                    contractEnd: "", //结束日期
                    completeStart: "", //竣工起始日期
                    completeEnd: "", //竣工结束日期
                    areaStart: "", //最小面积
                    areaEnd: "", //最大面积
                    proCount: 1, //符合业绩条件的数量
                    optType: "or"
                },
                person: [],
                zhuanchaType: "zhujian"
            },
            total: 0,
            isyj: false,
            isoptType: false,
            id: null,
            dataStr: "",
            isNoSee: true,
            showFixed: true
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
                    newval.childProject ||
                    newval.proWhere ||
                    newval.proUse ||
                    newval.proType ||
                    newval.amountStart ||
                    newval.amountEnd ||
                    newval.contractStart ||
                    newval.contractEnd ||
                    newval.completeStart ||
                    newval.completeEnd ||
                    newval.areaStart ||
                    newval.areaEnd
                ) {
                    //如果筛选了业绩，则显示符合业绩数量
                    this.isyj = true;
                } else {
                    this.isyj = false;
                    this.data.project.proCount = 0;
                }
                let arr = newval.keywords.split(" ");
                if (arr.length > 1) {
                    this.isoptType = true;
                } else {
                    this.isoptType = false;
                }
                // this.data.project.proCount=1;
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
        }
        this.addressList = JSON.parse(JSON.stringify(data.area));
        this.addressList.unshift({
            areaShortName: "全国",
            code: ""
        });
        this.companyQuals = data.comQua;
        for (let x of data.area) {
            x.istap = false;
        }
        this.areasList = data.area;
        this.areasList.unshift({
            areaShortName: "不限",
            istap: true
        });
        let ryData = JSON.parse(localStorage.getItem("people"));
        this.peopleList = ryData;
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
        addressFn(el) {
            if (el.areaShortName == "全国") {
                this.data.regisAddress = "";
            } else {
                this.data.regisAddress = el.name;
                this.recordList[0].name = el.shortName + "内企业";
                this.recordList[1].name = "入" + el.shortName + "企业";
                this.recordList[2].name =
                    "入" + el.shortName + "+" + el.shortName + "内企业";
            }
            // this.ajax()
        },
        isBeiFn(el) {
            //备案地区
            this.data.joinRegion = el.code;
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
        forArrStr(arr) {
            //从数组中取出对应值
            let a = [];
            let str = "";
            for (let x of arr) {
                if (x.istap) {
                    if (x.areaShortName == "不限") {
                        str = null;
                        return str;
                    }
                    a.push(x.areaShortName);
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
        backSelect(arr) {
            //选不限时，其他取消选择
            for (let x of arr) {
                if (x.areaShortName != "不限") {
                    x.istap = false;
                }
            }
        },
        selectFn(el, arr) {
            //选择
            if (el.areaShortName == "不限") {
                el.istap = true;
                this.backSelect(arr);
            } else {
                el.istap = !el.istap;
                if (this.forInLength(arr)) {
                    arr[0].istap = true;
                } else {
                    arr[0].istap = false;
                }
            }
        },
        itemFn(el) {
            //业绩所含子项
            el.istap = !el.istap;
            this.data.project.childProject = this.forArrStr(this.itemList);
            // this.ajax()
        },
        areaTap(el) {
            //项目属地
            this.selectFn(el, this.areasList);
            this.data.project.proWhere = this.forArrStr(this.areasList);
            // this.ajax()
        },
        typeTap(el) {
            //业绩类型
            this.selectFn(el, this.typeList);
            this.data.project.proType = this.forArrStr(this.typeList);
            // this.ajax()
        },
        purposeTap(el) {
            //工程用途
            this.selectFn(el, this.purposeList);
            this.data.project.proUse = this.forArrStr(this.purposeList);
            // this.ajax()
        },
        optGxFn(el) {
            //多个关键词之间的关系
            this.data.project.optType = el.code;
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
                this.data.person.length > 0
            ) {
                let id = this.id;
                let query = {
                    id: id,
                    type: "zj"
                };
                // this.openNewLink('/queryPay',query)
                this.$router.push({
                    path: "/queryPay",
                    query: query
                });
            } else {
                this.$alert("请至少筛选人员，资质，业绩中的一项");
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
@import "../../style/publicCSS";
.ZJquery {
    position: relative;
    padding-bottom: 168px;
    .ZJquery_body {
        width: 1020px;
        margin: 0 auto;
    }
    .btnFixed {
        position: fixed;
        bottom: 0;
        z-index: 10;
    }
}
</style>
