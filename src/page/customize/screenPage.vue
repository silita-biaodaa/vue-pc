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
                    :chongq="chongq"
                ></v-screenZZ>
                <!-- 人员要求 -->
                <v-screenRY
                    @contentChange="getCodeRY"
                    :qualList="peopleList"
                    @recordRY="getRecordRY"
                    :chongq="chongq"
                ></v-screenRY>
                <!-- 业绩要求 -->
                <el-row class="pt20" type="flex" :class="{'require': current == 1}">
                    <el-col :span="2" class="fs16 color-150 fw600 mt10">业绩要求</el-col>
                    <el-col :span="22">
                        <el-row class="mb20">
                            <!-- 业绩来源 -->
                            <el-col :span="18" class="fs14 color-150">
                                业绩来源：
                                <el-select
                                    v-model="data.projectSource"
                                    placeholder="请选择"
                                    style="width:50%"
                                    @change="changetable"
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
                        <!-- 项目关键字 -->
                        <el-row class="drc mb20">
                            <el-col :span="13" class="fs14 color-150">
                                {{data.projectSource !== 'all' ? '项目名称：':'项目关键字：'}}
                                <el-input
                                    placeholder="例如：公建业绩、道路，多个关键字用空格隔开"
                                    clearable
                                    v-model="data.project.keywords"
                                    style="width:75%"
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
                                            class="mr40 cp color-5a5"
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
                                            class="mr40 cp color-5a5 mb15"
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
                                            class="mr40 cp color-5a5 mb15"
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
                                            class="mr40 cp color-5a5"
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
                                    @input="data.project.amountStart=data.project.amountStart.replace(/[^\d.]/g,'')"
                                    style="width: 20%;"
                                ></el-input>
                                <!-- <v-myInput
                                    :point="2"
                                    :max="99999"
                                    placeholder="请输入金额"
                                    v-model.number="data.project.amountStart"
                                ></v-myInput>-->
                                &nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-input
                                    placeholder="最高价（万元）"
                                    v-model="data.project.amountEnd"
                                    @input="data.project.amountEnd=data.project.amountEnd.replace(/[^\d.]/g,'')"
                                    style="width: 20%"
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
                                        class="mr40 cp color-5a5"
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
                                ></el-input>&nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-input
                                    placeholder="最大面积（㎡）"
                                    v-model="data.project.areaEnd"
                                    style="width: 20%;"
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
                                ></el-input>&nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-input
                                    placeholder="最大面积（㎡）"
                                    v-model="data.project.areaEnd"
                                    style="width: 20%;"
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
                            <el-col :span="18" class="fs14 color-150" v-if="this.data.credit">
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
                            <el-col :span="13" class="fs14 color-150" v-if="this.data.credit">
                                关键字：
                                <el-input
                                    placeholder="请输入关键字"
                                    clearable
                                    v-model="data.credit.creditKeyword"
                                    style="width:75%"
                                    :disabled="disabled ? true:false"
                                >
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </el-col>
                        </el-row>
                        <!-- 处罚决定日期 -->
                        <el-row class="fs14 mb20 flex-center drc color-150" v-if="this.data.credit">
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
                    <el-col :span="6" class="text-r" v-if="this.data.credit">
                        <el-checkbox
                            v-model="data.credit.creditQuery"
                            class="fs14 color-150"
                            @change="isDisable"
                        >仅查询无行政处罚的企业</el-checkbox>
                    </el-col>
                </el-row>
                <el-row :class="{'hide': current !== 1}" v-if="this.data.credit">
                    <el-col class="evaluation fs16 color-150 fw600">诚信综合评价</el-col>
                    <el-col class="drc scores" :span="18">
                        <div class="fs14 color-150">综合得分：</div>
                        <el-input
                            placeholder="最低分"
                            v-model="data.credit.scoreStart"
                            style="width: 20%;"
                        ></el-input>&nbsp;&nbsp;至&nbsp;&nbsp;
                        <el-input
                            placeholder="最高分"
                            v-model="data.credit.scoreEnd"
                            style="width: 20%"
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
                            <span class="fw600 fs24 ml10 mr10 color-eb6" v-if="total==5000">5000+{{current == '1'?'家':'个'}}</span>
                            <span class="fw600 fs24 ml10 mr10 color-eb6" v-else>{{total}}{{current == '1'?'家':'个'}}</span>
                        </span>
                        <span class="fw600 fs24" v-else>0</span>
                    </span>
                    符合要求的{{current == '1'?'企业':'人员'}}
                </p>
                <button
                    class="info_btn fs18 cp color-eb6 bg-fff"
                    @click="jump"
                    :class="total==0||isNoSee?'notJump':''"
                >查看详情</button>
            </div>
            <div class="link_fun mr40">
                <p class="up mb5 pb5">服务电话：0731-85076077</p>
                <p class="down text-c">多数据联动查询</p>
            </div>
        </div>
    </div>
</template>
<script>
import publicBread from "@/components/customize/publicBread";
import head3 from "@/components/head3";
import screenZZ from "@/components/screenZZ";
import screenRY from "@/components/zhuancha/screenRY";
import { screenConut, personConut } from "@/api/index";
export default {
    components: {
        "v-bread": publicBread,
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
                    scoreStart: "", //综合开始得分
                    scoreEnd: "", //综合结束得分
                    creditQuery: "" //是否查询
                    // creCount: 1, //符合信用的数量
                },
                person: [], //人员
                zhuanchaType: "",
                qualRecord: "", //资质备案
                projectSource: "all", //业绩来源 //全国资质与重庆资质筛选框,all为全国,chongq为重庆;
                personRecord: "not", //人员备案
                zhuanchaType: "company"
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
            showFixed: true, //是否固定在某一位置;
            disabled: false, //信用是否禁止筛选
        };
    },
    watch: {
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
        inject: ["reload"]
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
            if(data.person.length = 0) {
                data.personRecord = "";
            }
            // if(data.credit !== undefined) {
            //     if(data.credit.creditQuery) {
            //         data.credit.creditQuery = "yes";
            //     }else if(data.credit.creditQuery = false) {
            //         data.credit.creditQuery = "not";
            //     }
            // }
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
            this.data.rangeType = data.type;
        },
        getCodeRY(data) {
            this.data.person = data;
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
                    scoreStart: "", //综合开始得分
                    scoreEnd: "", //综合结束得分
                    creditQuery: "" //是否查询
                    // creCount: 1, //符合信用的数量
                },
                zhuanchaType: "",
                qualRecord: "", //资质备案
                projectSource: "chongq", //业绩来源 //全国资质与重庆资质筛选框,all为全国,chongq为重庆;
                personRecord: "", //人员备案
                zhuanchaType: "company"
            };
        },
        handleClick(index) {
            this.current = index;
            this.companyCount();
            if (index == 2) {
                this.showFixed = false;
                this.clearData();
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
            if (this.data.projectSource == "chongq") {
                this.clearData();
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
                        source: this.data.projectSource
                    }
                });
            } else {
                this.$alert("请至少筛选人员，资质，业绩中的一项");
            }
        },
        isDisable() {
            if(this.data.credit.creditQuery) {
                this.disabled = true;
            }else {
                this.disabled = false;
            }
        },
        //滑动是否查看详情浮动;
        handleScroll() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            var height = document.body.offsetHeight;
            if (this.data.projectSource == "chongq") {
                if (this.current == 1) {
                    if (scrollTop > 200) {
                        this.showFixed = false;
                    } else {
                        this.showFixed = true;
                    }
                } else if (this.current == 2) {
                    this.showFixed = false;
                }
            } else {
                if (this.current == 1) {
                    if (scrollTop > 370) {
                        this.showFixed = false;
                    } else {
                        this.showFixed = true;
                    }
                } else if (this.current == 2) {
                    if (scrollTop > 300) {
                        this.showFixed = false;
                    } else {
                        this.showFixed = true;
                    }
                }
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
@font-face {
    font-family: "element-icons";
    src: url("//at.alicdn.com/t/font_1546736_e9vb389hamj.eot?t=1575882859526"); /* IE9 */
    src: url("//at.alicdn.com/t/font_1546736_e9vb389hamj.eot?t=1575882859526#iefix")
            format("embedded-opentype"),
        /* IE6-IE8 */
            url("data:application/x-font-woff2;charset=utf-8;base64,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")
            format("woff2"),
        url("//at.alicdn.com/t/font_1546736_e9vb389hamj.woff?t=1575882859526")
            format("woff"),
        url("//at.alicdn.com/t/font_1546736_e9vb389hamj.ttf?t=1575882859526")
            format("truetype"),
        /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
            url("//at.alicdn.com/t/font_1546736_e9vb389hamj.svg?t=1575882859526#iconfont")
            format("svg"); /* iOS 4.1- */
}

.element-icons {
    font-family: "element-icons" !important;
    font-size: 12px !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="less" scoped>
@import "../../style/publicCSS";
.screenPage {
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
        width: 1020px;
        height: 128px;
        margin: 20px auto 40px;
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
        margin-bottom: 0;
        z-index: 10;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>