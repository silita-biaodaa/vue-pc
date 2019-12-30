<template>
    <div class="screenPage">
        <v-head3 :headTxt="titleList"></v-head3>
        <div class="screenPage_body">
            <v-bread :breadList="breadList"></v-bread>
            <!-- 企业人员筛选 -->
            <ul class="drc pb20 select">
                <li class="cp" @click="handleClick(1)" :class="{active : current == 1}">企业综合查询</li>
                <li></li>
                <li class="cp" @click="handleClick(2)" :class="{active : current == 2}">人员综合查询</li>
            </ul>
            <div class="screenPage_content mb20" :class="{'hideBottom': current == 2}">
                <div class="nav_top">
                    <div class="mb20 drc">
                        <span class="color-150 fs16 fw600">选择地区</span>
                        <ul class="drc color-5a5 fs14">
                            <li
                                class="ml20 mr20 cp"
                                v-for="(item,index) in areaList"
                                :key="index"
                                @click="selectArea(item)"
                            >
                                <span
                                    :class="{'activeZZ':item.id == data.joinRegion}"
                                >{{item.value}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 资质要求 -->
                <v-screenZZ
                    @contentChange="getCodeZZ"
                    :qualList="codeZZ.comQua"
                    @recordZZ="getRecordZZ"
                    :query="true"
                    :toParent="reChildren"
                ></v-screenZZ>
                <!-- 人员要求 -->
                <v-screenRY
                    @contentChange="getCodeRY"
                    :qualList="peopleList"
                    @recordRY="getRecordRY"
                    :toParent="reChildren"
                ></v-screenRY>
                <!-- 业绩要求 -->
                <el-row class="pt20" type="flex" :class="{'require': current == 1}">
                    <el-col :span="2" class="fs16 color-150 fw600 mt10">业绩要求</el-col>
                    <el-col :span="22">
                        <el-row class="mb20" :class="{'hide': current == 2}">
                            <!-- 业绩来源 -->
                            <el-col :span="18" class="fs14 color-150">
                                业绩来源：
                                <el-select
                                    v-model="data.projectSource"
                                    placeholder="请选择"
                                    style="width:50%"
                                    class="ml10"
                                >
                                    <el-option
                                        v-for="item in typeLists"
                                        :key="item.id"
                                        :label="item.value"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row class="mb20" :class="{'hide': current !== 2}">
                            <el-col :span="13" class="fs14 color-150 drc">
                                业绩来源：
                                <el-input placeholder="全国建筑市场监管公共服务平台" style="width:75%" disabled class="element_search ml5"></el-input>
                            </el-col>
                        </el-row>
                        <!-- 项目关键字 -->
                        <el-row class="drc mb20">
                            <el-col :span="13" class="fs14 color-150">
                                {{data.projectSource !== 'all' ? '项目名称：':'项目关键字：'}}
                                <el-input
                                    placeholder="例如：公建业绩、道路，多个关键字用空格隔开"
                                    clearable
                                    v-model="data.project.keywords"
                                    style="width:75%"
                                    class="element_search"
                                >
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </el-col>
                            <el-col :span="11" :class="{'hide':data.projectSource !== 'all'}">
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
                            </el-col>
                        </el-row>
                        <!-- 资质条件筛选 -->
                        <div>
                            <el-row
                                class="fs14 mb40"
                                :class="{'hide':data.projectSource !== 'all'}"
                                v-if="isoptType"
                            >
                                <el-col>
                                    <span class="mr20">多个关键字之间的关系：</span>
                                    <span
                                        class="cp mr20 color-5a5"
                                        @click="handleClickZZ(1)"
                                        :class="{activeZZ : currentZZ == 1}"
                                    >满足任意一个</span>
                                    <span
                                        class="cp ml20 color-5a5"
                                        @click="handleClickZZ(2)"
                                        :class="{activeZZ : currentZZ == 2}"
                                    >满足所有</span>
                                </el-col>
                            </el-row>
                            <!-- 业绩子项 -->
                            <el-row
                                class="fs14 mb40"
                                :class="{'hide':data.projectSource !== 'all'}"
                            >
                                <el-col>
                                    <ul class="dfrcsw">
                                        <li class="mr20">业绩所含子项：</li>
                                        <li
                                            class="mr30 cp color-5a5"
                                            v-for="(el,i) in itemList"
                                            :key="i"
                                            @click="itemFn(el)"
                                        >
                                            <v-icon
                                                class="fs14"
                                                :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"
                                            ></v-icon>
                                            <span>{{el.areaShortName}}</span>
                                        </li>
                                    </ul>
                                </el-col>
                            </el-row>
                            <!-- 项目属地 -->
                            <el-row
                                class="fs14 mb40"
                                :class="{'hide':data.projectSource !== 'all'}"
                            >
                                <el-col>
                                    <ul class="dfrcsw">
                                        <li class="mr20 mb15">项目属地：</li>
                                        <li
                                            class="mr30 cp color-5a5 mb15"
                                            v-for="(el,i) in projectList"
                                            :key="i"
                                            @click="projectTap(el)"
                                        >
                                            <v-icon
                                                class="fs14"
                                                :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"
                                            ></v-icon>
                                            <span>{{el.areaShortName}}</span>
                                        </li>
                                    </ul>
                                </el-col>
                            </el-row>
                            <!-- 工程用途 -->
                            <el-row
                                class="fs14 mb25"
                                :class="{'hide':data.projectSource !== 'all'}"
                            >
                                <el-col>
                                    <ul class="dfrcsw">
                                        <li class="mr20 mb15">工程用途：</li>
                                        <li
                                            class="mr30 cp color-5a5 mb15"
                                            v-for="(el,i) in purposeList"
                                            :key="i"
                                            @click="purposeTap(el)"
                                        >
                                            <v-icon
                                                class="fs14"
                                                :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"
                                            ></v-icon>
                                            <span>{{el.areaShortName}}</span>
                                        </li>
                                    </ul>
                                </el-col>
                            </el-row>
                            <!-- 业绩类型 -->
                            <el-row
                                class="fs14 mb40"
                                :class="{'hide':data.projectSource !== 'all'}"
                            >
                                <el-col>
                                    <ul class="dfrcsw">
                                        <li class="mr20">业绩类型：</li>
                                        <li
                                            class="mr30 cp color-5a5"
                                            v-for="(el,i) in yjtypeList"
                                            :key="i"
                                            @click="typeTap(el)"
                                        >
                                            <v-icon
                                                class="fs14"
                                                :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"
                                            ></v-icon>
                                            <span>{{el.areaShortName}}</span>
                                        </li>
                                    </ul>
                                </el-col>
                            </el-row>
                            <!-- 中标金额/合同金额 -->
                            <el-row class="flex-center drc color-150 fs14 mb20">
                                <div>中标/合同金额：</div>
                                <el-input
                                    placeholder="最低价（万元）"
                                    v-model="data.project.amountStart"
                                    minlength="1"
                                    maxlength="8"
                                    @input="dataFormat()"
                                    style="width: 20%;"
                                    class="element_search"
                                ></el-input>
                                <!-- <v-myInput
                                    placeholder="请输入金额"
                                    v-model.number="data.project.amountStart"
                                ></v-myInput> -->
                                &nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-input
                                    placeholder="最高价（万元）"
                                    v-model="data.project.amountEnd"
                                    @input="dataFormat1()"
                                    style="width: 20%"
                                    class="element_search"
                                ></el-input>
                            </el-row>
                            <!-- 中标公示 -->
                            <el-row
                                class="flex-center drc color-150 fs14 mb20"
                                :class="{'hide':data.projectSource !== 'chongq'}"
                            >
                                <div class="fw600">中标公示</div>
                                <el-col :span="22">
                                    <i class="iconfont iconjingshi fs16 ml10 mr10 color-ffc"></i>
                                    <span class="fs14">注：中标公示、施工许可、竣工验收备案分为三个模块，单独查询。</span>
                                </el-col>
                            </el-row>
                            <!-- 中标/合同签订日期 -->
                            <el-row class="fs14 mb20 flex-center drc color-150">
                                <div>{{data.projectSource == 'all'?'中标/合同签订日期：':'中标日期：'}}</div>
                                <div>
                                    <el-date-picker
                                        value-format="yyyy-MM-dd"
                                        v-model="data.project.contractStart"
                                        type="date"
                                        placeholder="起始日期"
                                    ></el-date-picker>&nbsp;&nbsp;至&nbsp;&nbsp;
                                    <el-date-picker
                                        value-format="yyyy-MM-dd"
                                        v-model="data.project.contractEnd"
                                        type="date"
                                        placeholder="结束日期"
                                    ></el-date-picker>
                                </div>
                            </el-row>
                            <!-- 施工许可 -->
                            <el-row
                                class="fs14 mb20 flex-center drc color-150"
                                :class="{'hide':data.projectSource !== 'chongq'}"
                            >
                                <div class="fw600">施工许可</div>
                            </el-row>
                            <!-- 项目状态 -->
                            <el-row
                                class="fs14 mb20 flex-center drc color-150"
                                :class="{'hide':data.projectSource !== 'chongq'}"
                            >
                                <ul class="dfrcsw">
                                    <li class="mr20">项目状态：</li>
                                    <li
                                        class="mr30 cp color-5a5"
                                        v-for="(el,i) in stateList"
                                        :key="i"
                                        @click="stateTap(el)"
                                    >
                                        <v-icon
                                            class="fs14"
                                            :iconClass="el.istap?'iconduoxuan-xuanzhong':'iconduoxuan-daixuan'"
                                        ></v-icon>
                                        <span>{{el.areaShortName}}</span>
                                    </li>
                                </ul>
                            </el-row>
                            <!-- 竣工验收备案： -->
                            <el-row
                                class="fs14 mb20 flex-center drc color-150"
                                :class="{'hide':data.projectSource !== 'chongq'}"
                            >
                                <div class="fw600">竣工验收备案</div>
                            </el-row>
                            <!-- 面积 -->
                            <el-row
                                class="fs14 mb20 flex-center drc color-150"
                                :class="{'hide':data.projectSource !== 'chongq'}"
                            >
                                <div>面积（平方米）：</div>
                                <el-input
                                    placeholder="最小面积（㎡）"
                                    v-model="data.project.areaStart"
                                    style="width: 20%;"
                                    class="element_search"
                                    @input="dataFormat2()"
                                ></el-input>&nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-input
                                    placeholder="最大面积（㎡）"
                                    v-model="data.project.areaEnd"
                                    style="width: 20%;"
                                    class="element_search"
                                    @input="dataFormat3()"
                                ></el-input>
                            </el-row>
                            <!-- 竣工验收日期 -->
                            <el-row class="fs14 mb20 flex-center drc color-150">
                                <div>竣工验收日期：</div>
                                <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    v-model="data.project.completeStart"
                                    type="date"
                                    placeholder="起始日期"
                                ></el-date-picker>&nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    v-model="data.project.completeEnd"
                                    type="date"
                                    placeholder="结束日期"
                                ></el-date-picker>
                            </el-row>
                            <!-- 面积 -->
                            <el-row
                                class="fs14 mb20 flex-center drc color-150"
                                :class="{'hide':data.projectSource !== 'all'}"
                            >
                                <div>面积（平方米）：</div>
                                <el-input
                                    placeholder="最小面积（㎡）"
                                    v-model="data.project.areaStart"
                                    style="width: 20%;"
                                    class="element_search"
                                    @input="dataFormat2()"
                                ></el-input>&nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-input
                                    placeholder="最大面积（㎡）"
                                    v-model="data.project.areaEnd"
                                    style="width: 20%;"
                                    class="element_search"
                                    @input="dataFormat3()"
                                ></el-input>
                            </el-row>
                            <!-- 符合业绩条件的数量 -->
                            <el-row class="fs14 flex-center drc color-150 mb20" v-if="isyj">
                                <div>符合业绩条件的数量：</div>
                                <el-input-number
                                    v-model="data.project.proCount"
                                    :min="1"
                                    size="mini"
                                ></el-input-number>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <!-- 信用要求 -->
                <el-row class="pt20 require" type="flex" :class="{'hide': current !== 1}">
                    <el-col :span="2" class="fs16 color-150 fw600 mt10">信用要求</el-col>
                    <el-col :span="16">
                        <!-- <el-row class="mb20"> -->
                        <!-- 信息来源 -->
                        <!-- <el-col :span="18" class="fs14 color-150" v-if="this.data.credit">
                                信息来源：
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="data.credit.creditSource"
                                    :disabled="true"
                                    style="width:50%"
                                    class="ml10"
                                >
                        </el-input>-->
                        <!-- <el-select
                                    v-model="data.credit.creditSource"
                                    placeholder="请选择"
                                    style="width:50%"
                                    @change="changetable"
                                    clearable
                                    class="ml10"
                                >
                                    <el-option
                                        v-for="item in sourceList"
                                        :key="item.id"
                                        :label="item.value"
                                        :value="item.id"
                                    ></el-option>
                        </el-select>-->
                        <!-- </el-col> -->
                        <!-- </el-row> -->
                        <el-row class="mb20">
                            <!-- 处罚类别 -->
                            <el-col :span="18" class="fs14 color-150">
                                处罚类别：
                                <el-select
                                    v-model="data.credit.punishType"
                                    placeholder="请选择"
                                    style="width:50%"
                                    clearable
                                    class="ml10"
                                    :disabled="disabled ? true:false"
                                >
                                    <el-option
                                        v-for="item in punishList"
                                        :key="item.id"
                                        :label="item.value"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <!-- 关键字 -->
                        <el-row class="drc mb20">
                            <el-col :span="13" class="fs14 color-150">
                                关键字：
                                <el-input
                                    placeholder="请输入关键字"
                                    clearable
                                    v-model="data.credit.creditKeyword"
                                    style="width:75%"
                                    :disabled="disabled ? true:false"
                                    class="element_search"
                                >
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </el-col>
                        </el-row>
                        <!-- 处罚决定日期 -->
                        <el-row class="fs14 mb20 flex-center drc color-150">
                            <div>处罚决定日期：</div>
                            <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="data.credit.punishStart"
                                type="date"
                                placeholder="起始日期"
                                :disabled="disabled ? true:false"
                            ></el-date-picker>&nbsp;&nbsp;至&nbsp;&nbsp;
                            <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="data.credit.punishEnd"
                                type="date"
                                placeholder="结束日期"
                                :disabled="disabled ? true:false"
                            ></el-date-picker>
                        </el-row>
                    </el-col>
                    <el-col :span="6" class="text-r">
                        <el-checkbox
                            v-model="iscreditQuery"
                            class="fs14 color-150"
                            @change="isDisable"
                        >仅查询无行政处罚的企业</el-checkbox>
                    </el-col>
                </el-row>
                <el-row :class="{'hide': current !== 1}">
                    <el-col class="evaluation fs16 color-150 fw600">诚信综合评价</el-col>
                    <el-col class="drc scores" :span="18">
                        <div class="fs14 color-150">综合得分：</div>
                        <el-input
                            placeholder="最低分"
                            v-model="data.scoreStart"
                            style="width: 20%;"
                            class="element_search"
                            @input="dataFormat4()"
                        ></el-input>&nbsp;&nbsp;至&nbsp;&nbsp;
                        <el-input
                            placeholder="最高分"
                            v-model="data.scoreEnd"
                            style="width: 20%"
                            class="element_search"
                            @input="dataFormat5()"
                        ></el-input>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 承上启下 -->
        <div class="totalBox dfrcb fs14" :class="{'btnFixed': showFixed}">
            <div class="drc">
                <div class="bottom_img ml40">
                    <i class="iconfont iconwancheng"></i>
                </div>
                <p class="ml20">
                    共为您找到
                    <span>
                        <span v-if="total">
                            <span class="fs24 ml10 mr10 color-eb6" v-if="total==5000">5000+{{current == '1'?'家':'个'}}</span>
                            <span class="fs24 ml10 mr10 color-eb6" v-else>{{total}}{{current == '1'?'家':'个'}}</span>
                        </span>
                        <span class="fs24" v-else>0</span>
                    </span>
                    符合要求的{{current == '1'?'企业':'人员'}}
                </p>
                <button
                    class="info_btn fs18 cp color-eb6 bg-fff"
                    @click="jump"
                    :class="total==0||isNoSee?'notJump':''"
                >查看详情</button>
            </div>
            <div class="link_fun mr30">
                <p class="up mb5 pb5">服务电话：0731-85076077</p>
                <p class="down text-c">多数据联动查询</p>
            </div>
        </div>
    </div>
</template>
<script>
import head3 from "@/components/head3";
import screenZZ from "@/components/screenZZ";
import screenRY from "@/components/zhuancha/screenRY";
import { screenConut, personConut } from "@/api/index";
export default {
    components: {
        "v-head3": head3,
        "v-screenZZ": screenZZ,
        "v-screenRY": screenRY
    },
    data() {
        return {
            breadList: [{ title: "重庆定制版综合查询" }], //面包屑列表,以对象形式添加;
            titleList: "重庆定制版查询系统",
            current: 1,
            currentZZ: 1, //资质切换
            firmAlias: "",
            selectTab: "0", //选择id
            projectList: "", //项目属地
            reChildren: "", //是否需要刷新子组件;
            areaList: [
                {
                    value: "渝内企业",
                    id: "in"
                },
                {
                    value: "入渝企业",
                    id: "enter"
                },
                {
                    value: "渝内+入渝企业",
                    id: "all_in"
                }
            ],
            typeLists: [
                {
                    id: "all",
                    value: "全国建筑市场监管公共服务平台"
                },
                {
                    id: "chongq",
                    value: "重庆建设工程信息网"
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
            yjtypeList: [
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
            stateList: [
                //业绩所含子项
                {
                    areaShortName: "不限",
                    istap: true
                },
                {
                    areaShortName: "项目在建",
                    istap: false
                },
                {
                    areaShortName: "项目竣工",
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
            punishList: [
                //处罚类别
                {
                    id: "0",
                    value: "全部"
                },
                {
                    id: "1",
                    value: "罚款"
                },
                {
                    id: "2",
                    value: "行政拘留"
                },
                {
                    id: "3",
                    value: "警告"
                },
                {
                    id: "4",
                    value: "没收违法所得、没收非法财物"
                },
                {
                    id: "5",
                    value: "暂扣或者吊销许可证、暂扣或者吊销执照"
                },
                {
                    id: "6",
                    value: "责令停产停业"
                },
                {
                    id: "7",
                    value: "其他"
                }
            ],
            data: {
                qualCode: "", //资质
                rangeType: "", //满足资质任意关系
                regisAddress: "重庆市",
                joinRegion: "all_in", //选择地区
                project: {
                    opt: "title", //搜索类型
                    optType: "or",
                    keywords: "", //搜索关键字
                    childProject: "", //业务所含子项
                    proState: "", //项目状态
                    proWhere: "", //项目属地
                    proUse: "", //工程用途
                    proType: "", //业绩类型
                    amountStart: null, //最低价
                    amountEnd: null, //最高价
                    contractStart: "", //起始日期
                    contractEnd: "", //结束日期
                    completeStart: "", //竣工起始日期
                    completeEnd: "", //竣工结束日期
                    areaStart: null, //最小面积
                    areaEnd: null, //最大面积
                    proCount: 1, //符合业绩条件的数量
                },
                credit: {
                    //信用筛选
                    // creditSource: "信用中国-行政处罚", //信用来源
                    punishType: "", //处罚类别
                    creditKeyword: "", //信用关键字
                    punishStart: "", //处罚开始日期
                    punishEnd: "", //处罚结束日期
                    creditQuery: "" //是否查询
                    // creCount: 1, //符合信用的数量
                },
                person: [], //人员
                zhuanchaType: "",
                qualRecord: "", //资质备案
                projectSource: "all", //业绩来源 //全国资质与重庆资质筛选框,all为全国,chongq为重庆;
                personRecord: "not", //人员备案
                zhuanchaType: "company",
                scoreStart: "", //综合开始得分
                scoreEnd: "", //综合结束得分
            },
            checked: false,
            checkList: [],
            peopleList: [], //人员列表;
            total: "", //查找数量
            codeZZ: "", //传给子组件的资质列表;
            isyj: false,
            isNoSee: true,
            isoptType: false,
            pkid: "", //查询id;
            chongq: true,
            showFixed: false, //是否固定在某一位置;
            disabled: false, //信用是否禁止筛选
            iscreditQuery:false,//是否查询有行政处罚企业
        };
    },
    watch: {
        "data.credit":{
            deep: true,
            handler(newVal,oldVal){
                if(this.current==1){
                    if(this.data.credit.creditKeyword||this.data.credit.punishEnd||this.data.credit.punishStart||this.data.credit.punishType){
                        if(this.data.credit.creditQuery==''){
                            this.data.credit.creditQuery='not'
                        }
                    }else{
                        if(this.data.credit.creditQuery=='not'){
                            this.data.credit.creditQuery='' 
                        }
                    }
                }
            }
        },
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
                    newval.areaEnd ||
                    newval.proState ||
                    newval.creditQuery ||
                    newval.rangeType
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
                this.companyCount();
            }
        },
    },
    methods: {
        companyCount() {
            let data = JSON.parse(JSON.stringify(this.data));
            if (data.project.keywords && data.project.keywords != "") {
                data.project.keywords = data.project.keywords.replace(
                    / /g,
                    ","
                );
            } else {
                data.project.opt = "";
            }
            if (!this.isoptType) {
                data.project.optType = "";
            }
            if (!this.isyj) {
                data.project.proCount = "";
            }
            if (data.qualCode == "") {
                data.qualRecord = "";
            }
            if (data.credit.punishType == "全部") {
                data.credit.punishType = "";
            }
            data.project = this.filterParams(data.project);
            data.credit = this.filterParams(data.credit);
            data = this.filterParams(data);
            if (this.current == 1) {
                screenConut(data).then(res => {
                    if (res.code == "1") {
                        const { count, pkid } = res.data;
                        this.total = count;
                        this.pkid = pkid;
                    } else {
                        console.info(res.code);
                    }
                });
            } else {
                this.data.zhuanchaType = "person";
                data.project.proCount = 1;
                //深拷贝不影响this.data的值;
                let creditList = JSON.parse(JSON.stringify(this.data));
                creditList.project = this.filterParams(creditList.project);
                creditList.credit = this.filterParams(creditList.credit);
                creditList = this.filterParams(creditList);
                for (let i in creditList) {
                    if (i == "credit") {
                        delete creditList[i];
                    }
                }
                personConut(creditList).then(res => {
                    if (res.code == "1") {
                        const { count, pkid } = res.data;
                        this.total = count;
                        this.pkid = pkid;
                    } else {
                        console.info(res.code);
                    }
                });
            }
        },
        //从子组件获取值;
        getCodeZZ(data) {
            this.data.qualCode = data.str;
            let arr=data.str.split(',');
            let arr1=[];
            let qual=this.codeZZ.comQua;
            for(let x of arr){
                let str=''//承载每级name的str
                for(let y of qual){
                    if(x.indexOf('/')>-1){//二三级
                        let a=x.split('/')
                        for(let z of y.data){
                            if(z.code==a[0]){//二级匹配
                                str=z.name
                                for(let o of z.data){
                                    if(o.code==a[1]){//三级匹配
                                        str+='/'+o.name
                                        break
                                    }
                                }
                                break
                            }
                        }
                    }else{//一级或二级
                        if(x==y.code){//一级匹配
                            str=y.name
                            break
                        }else{
                            for(let z of y.data){
                                if(x==z.code){//二级匹配
                                    str=z.name
                                    break
                                }
                            }
                        }
                    }
                }
                arr1.push(str)
            }
            this.data.rangeType = data.type;
            this.$set(this.data,'qualName',arr1.join(','))
           
        },
        getCodeRY(data) {
            this.$set(this.data,'person',data)
        },
        getRecordZZ(data) {
            if (data) {
                this.data.qualRecord = "yes";
            } else {
                this.data.qualRecord = "not";
            }
        },
        getRecordRY(data) {
            if (data) {
                this.data.personRecord = "yes";
            } else {
                this.data.personRecord = "not";
            }
        },
        //切换初始化数据;
        clearData() {
            this.data = {
                regisAddress: "重庆市",
                joinRegion: "all_in", //选择地区
                project: {
                    opt: "title", //搜索类型
                    optType: "or",
                    keywords: "", //搜索关键字
                    childProject: "", //业务所含子项
                    proWhere: "", //项目属地
                    proState: "", //项目状态
                    proUse: "", //工程用途
                    proType: "", //业绩类型
                    amountStart: null, //最低价
                    amountEnd: null, //最高价
                    contractStart: "", //起始日期
                    contractEnd: "", //结束日期
                    completeStart: "", //竣工起始日期
                    completeEnd: "", //竣工结束日期
                    areaStart: null, //最小面积
                    areaEnd: null, //最大面积
                    proCount: 1 //符合业绩条件的数量
                },
                credit: {
                    //信用筛选
                    // creditSource: "信用中国-行政处罚", //信用来源
                    punishType: "", //处罚类别
                    creditKeyword: "", //信用关键字
                    punishStart: "", //处罚开始日期
                    punishEnd: "", //处罚结束日期
                    creditQuery: "" //是否查询
                    // creCount: 1, //符合信用的数量
                },
                zhuanchaType: "",
                qualRecord: "", //资质备案
                projectSource: "all", //业绩来源 //全国资质与重庆资质筛选框,all为全国,chongq为重庆;
                personRecord: "not", //人员备案
                person: [], //人员
                zhuanchaType: "company",
                scoreStart: "", //综合开始得分
                scoreEnd: "", //综合结束得分
            };
        },
        handleClick(index) {
            this.current = index;
            if (index == 2) {
                this.reChildren = "ry";
                this.showFixed = false;
                this.clearData();
            }else {
                this.reChildren = "qy";
            }
        },
        handleClickZZ(index) {
            this.currentZZ = index;
            if (index == 1) {
                this.data.project.optType = "or";
            } else {
                this.data.project.optType = "and";
            }
        },
        handleSelect(data) {
            this.data.project.opt = data.id;
        },
        changetable() {
            // this.$forceUpdate()
            // if (this.data.projectSource == "chongq") {
            //     this.clearData();
            // }
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
        forArrStr(arr) {
            //从数组中取出对应值拼接
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
        selectArea(item) {
            this.data.joinRegion = item.id;
        },
        itemFn(el) {
            //业绩所含子项
            el.istap = !el.istap;
            this.data.project.childProject = this.forArrStr(this.itemList);
        },
        projectTap(el) {
            //项目属地
            this.selectFn(el, this.projectList);
            this.data.project.proWhere = this.forArrStr(this.projectList);
        },
        purposeTap(el) {
            //工程用途
            this.selectFn(el, this.purposeList);
            this.data.project.proUse = this.forArrStr(this.purposeList);
        },
        typeTap(el) {
            //业绩类型
            this.selectFn(el, this.yjtypeList);
            this.data.project.proType = this.forArrStr(this.yjtypeList);
        },
        stateTap(el) {
            //项目状态
            this.selectFn(el, this.stateList);
            this.data.project.proState = this.forArrStr(this.stateList);
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
                var page = "";
                if (this.current == 1) {
                    page = "qy";
                } else {
                    page = "ry";
                }
                this.$router.push({
                    path: "/payPage",
                    query: {
                        pkid: this.pkid,
                        page: page,
                    }
                });
            } else {
                this.$alert("请至少筛选人员，资质，业绩中的一项");
            }
        },
        isDisable() {
            if(this.iscreditQuery) {
                this.disabled = true;
                this.data.credit.creditQuery='yes'
            }else {
                this.disabled = false;
                this.data.credit.creditQuery='not'
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
        },
        dataFormat(){
            this.data.project.amountStart=this.data.project.amountStart.replace(/[^\d.]/g,"");
            this.data.project.amountStart=this.data.project.amountStart.replace(/\.+/ ,".");
            if(this.data.project.amountStart.charAt(0)=="0"&&this.data.project.amountStart.charAt(1)!="."&&this.data.project.amountStart.length>=2){
                this.data.project.amountStart=this.data.project.amountStart.replace(/0/ ,"")
            }
            var index=this.data.project.amountStart.indexOf('.');
            var lastIndex=this.data.project.amountStart.lastIndexOf('.')
            if(index==0){
                this.data.project.amountStart=this.data.project.amountStart.replace(/\./ ,"")
            }
            if(index>=1){
                this.data.project.amountStart=this.data.project.amountStart.substring(0,index+3)
            }
            if(index!=lastIndex){
                this.data.project.amountStart=this.data.project.amountStart.substring(0,index+2)
            }
        },
        dataFormat1(){
            this.data.project.amountEnd=this.data.project.amountEnd.replace(/[^\d.]/g,"");
            this.data.project.amountEnd=this.data.project.amountEnd.replace(/\.+/ ,".");
            if(this.data.project.amountEnd.charAt(0)=="0"&&this.data.project.amountEnd.charAt(1)!="."&&this.data.project.amountEnd.length>=2){
                this.data.project.amountEnd=this.data.project.amountEnd.replace(/0/ ,"")
            }
            var index=this.data.project.amountEnd.indexOf('.');
            var lastIndex=this.data.project.amountEnd.lastIndexOf('.')
            if(index==0){
                this.data.project.amountEnd=this.data.project.amountEnd.replace(/\./ ,"")
            }
            if(index>=1){
                this.data.project.amountEnd=this.data.project.amountEnd.substring(0,index+3)
            }
            if(index!=lastIndex){
                this.data.project.amountEnd=this.data.project.amountEnd.substring(0,index+2)
            }
        },
        dataFormat2(){
            this.data.project.areaStart=this.data.project.areaStart.replace(/[^\d.]/g,"");
            this.data.project.areaStart=this.data.project.areaStart.replace(/\.+/ ,".");
            if(this.data.project.areaStart.charAt(0)=="0"&&this.data.project.areaStart.charAt(1)!="."&&this.data.project.areaStart.length>=2){
                this.data.project.areaStart=this.data.project.areaStart.replace(/0/ ,"")
            }
            var index=this.data.project.areaStart.indexOf('.');
            var lastIndex=this.data.project.areaStart.lastIndexOf('.')
            if(index==0){
                this.data.project.areaStart=this.data.project.areaStart.replace(/\./ ,"")
            }
            if(index>=1){
                this.data.project.areaStart=this.data.project.areaStart.substring(0,index+3)
            }
            if(index!=lastIndex){
                this.data.project.areaStart=this.data.project.areaStart.substring(0,index+2)
            }
        },
        dataFormat3(){
            this.data.project.areaEnd=this.data.project.areaEnd.replace(/[^\d.]/g,"");
            this.data.project.areaEnd=this.data.project.areaEnd.replace(/\.+/ ,".");
            if(this.data.project.areaEnd.charAt(0)=="0"&&this.data.project.areaEnd.charAt(1)!="."&&this.data.project.areaEnd.length>=2){
                this.data.project.areaEnd=this.data.project.areaEnd.replace(/0/ ,"")
            }
            var index=this.data.project.areaEnd.indexOf('.');
            var lastIndex=this.data.project.areaEnd.lastIndexOf('.')
            if(index==0){
                this.data.project.areaEnd=this.data.project.areaEnd.replace(/\./ ,"")
            }
            if(index>=1){
                this.data.project.areaEnd=this.data.project.areaEnd.substring(0,index+3)
            }
            if(index!=lastIndex){
                this.data.project.areaEnd=this.data.project.areaEnd.substring(0,index+2)
            }
        },
        dataFormat4(){
            this.data.scoreStart=this.data.scoreStart.replace(/[^\d.]/g,"");
            this.data.scoreStart=this.data.scoreStart.replace(/\.+/ ,".");
            if(this.data.scoreStart.charAt(0)=="0"&&this.data.scoreStart.charAt(1)!="."&&this.data.scoreStart.length>=2){
                this.data.scoreStart=this.data.scoreStart.replace(/0/ ,"");
            }
            var index=this.data.scoreStart.indexOf('.');
            var lastIndex=this.data.scoreStart.lastIndexOf('.');
            if(index==0){
                this.data.scoreStart=this.data.scoreStart.replace(/\./ ,"");
            }
            if(index>=1){
                this.data.scoreStart=this.data.scoreStart.substring(0,index+3);
            }
            if(index!=lastIndex){
                this.data.scoreStart=this.data.scoreStart.substring(0,index+2);
            }
        },
        dataFormat5(){
            this.data.project.scoreEnd=this.data.project.scoreEnd.replace(/[^\d.]/g,"");
            this.data.project.scoreEnd=this.data.project.scoreEnd.replace(/\.+/ ,".");
            if(this.data.project.scoreEnd.charAt(0)=="0"&&this.data.project.scoreEnd.charAt(1)!="."&&this.data.project.scoreEnd.length>=2){
                this.data.project.scoreEnd=this.data.project.scoreEnd.replace(/0/ ,"")
            }
            var index=this.data.project.scoreEnd.indexOf('.');
            var lastIndex=this.data.project.scoreEnd.lastIndexOf('.')
            if(index==0){
                this.data.project.scoreEnd=this.data.project.scoreEnd.replace(/\./ ,"")
            }
            if(index>=1){
                this.data.project.scoreEnd=this.data.project.scoreEnd.substring(0,index+3)
            }
            if(index!=lastIndex){
                this.data.project.scoreEnd=this.data.project.scoreEnd.substring(0,index+2)
            }
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    created() {
        this.companyCount();
        this.codeZZ = JSON.parse(localStorage.getItem("filter"));
        let data = JSON.parse(localStorage.getItem("filter"));
        let ryData = JSON.parse(localStorage.getItem("people"));
        this.peopleList = ryData;
        for (let x of data.area) {
            x.istap = false;
        }
        data.area.unshift({
            areaShortName: "不限",
            istap: true
        });
        this.projectList = data.area;
    }
};
</script>
<style lang="less">
@import "../../base/element";
</style>
<style lang="less" scoped>
@import "../../style/publicCSS";
.screenPage {
    position: relative;
    padding-bottom:168px;
    .screenPage_body {
        width: 1020px;
        margin: 0 auto;
        .select {
            li {
                color: @lightColor;
                width: 129px;
                height: 44px;
                line-height: 44px;
                text-align: center;
            }
        }
        .select li:nth-last-child(2) {
            width: 2px;
            height: 14px;
            background-color: @contentColor;
            margin: 0 26px;
        }
        .active {
            background-color: @themeColor;
            color: @whiteColor !important;
            border-radius: 3px;
        }
    }
    .screenPage_content {
        border: 1px solid @initColor;
        padding: 20px;
        .nav_top,
        .require {
            border-bottom: 1px solid @initColor;
        }
        .evaluation {
            padding: 27px 0;
        }
        .scores {
            margin-left: 84px;
        }
    }
    .activeZZ {
        color: @themeColor;
        font-weight: 600;
    }
    .hideBottom {
        padding-bottom: 0 !important;
    }
    .totalBox {
        position: absolute;
        width: 1020px;
        height: 128px;
        bottom: 40px;
        transform: translateX(-50%);
        left: 50%;
        background-color: @lightOrangeColor;
        .bottom_img {
            i {
                color: @themeColor;
                font-size: 48px;
            }
        }
        .total {
            font-size: 24px;
        }
        .link_fun {
            .up {
                border-bottom: 1px solid @darkColor;
            }
        }
        .info_btn {
            width: 193px;
            height: 48px;
            border-radius: 8px;
            border: 1px solid @themeColor;
            margin-left: 60px;
        }
        .notJump {
            background: #ccc;
            cursor: not-allowed;
            opacity: 0.8;
            border: none;
            color: @whiteColor;
        }
    }
    .btnFixed {
        position: fixed;
        bottom: 0;
        z-index: 10;
    }
}
</style>