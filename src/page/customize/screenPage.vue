<template>
    <div class="screenPage">
        <v-head3></v-head3>
        <div class="screenPage_body">
            <v-bread :breadList="breadList"></v-bread>
            <!-- 企业人员筛选 -->
            <ul class="drc pb20 select">
                <li class="cp" @click="handleClick(1)" :class="{active : current == 1}">企业综合查询</li>
                <li></li>
                <li class="cp" @click="handleClick(2)" :class="{active : current == 2}">人员综合查询</li>
            </ul>
            <div class="screenPage_content">
                <div class="nav_top">
                    <div class="mb20">
                        <span class="color-150 fs16 fw600">选择地区</span>
                        <span class="ml20 mr20 color-5a5 fs14">渝内企业</span>
                        <span class="ml20 mr20 color-5a5 fs14">入渝企业</span>
                        <span class="ml20 color-eb6 fs14">渝内+入渝企业</span>
                    </div>
                </div>
                <!-- 资质要求 -->
                <v-newScreenZZ></v-newScreenZZ>
                <!-- 人员要求 -->
                <v-newScreenRY></v-newScreenRY>
                <!-- 业绩要求 -->
                <el-row class="pt20" type="flex" :class="{'require': current == 1 && typeList == '1'}">
                    <el-col :span="2" class="fs16 color-150 fw600 mt10">业绩要求</el-col>
                    <el-col :span="22">
                        <el-row class="mb20">
                            <!-- 业绩来源 -->
                            <el-col :span="18" class="fs14 color-150">
                                业绩来源：
                                <el-select
                                    v-model="typeList"
                                    placeholder="请选择"
                                    style="width:50%"
                                    @change="changetable"
                                    clearable
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
                                项目关键字：
                                <el-input
                                    placeholder="例如：公建业绩、道路，多个关键字用空格隔开"
                                    clearable
                                    v-model="firmAlias"
                                    style="width:75%"
                                >
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </el-col>
                            <el-col :span="11">
                                <el-radio-group v-model="radio" text-color="#EB651B" fill="#EB651B">
                                    <el-radio :label="3">根据标题搜索</el-radio>
                                    <el-radio :label="6">根据规模搜索</el-radio>
                                    <el-radio :label="9">根据标题和规模搜索</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <!-- 资质条件筛选 -->
                        <div>
                            <el-row class="fs14 mb40" :class="{'hide':typeList !== '1'}">
                                <el-col>
                                    <span class="mr20">多个资质之间的关系：</span>
                                    <span class="cp mr20 color-5a5" @click="handleClickZZ(1)" :class="{activeZZ : currentZZ == 1}">满足任一资质条件</span>
                                    <span class="cp ml20 color-5a5" @click="handleClickZZ(2)" :class="{activeZZ : currentZZ == 2}">满足所有资质条件</span>
                                </el-col>
                            </el-row>
                            <!-- 业绩子项 -->
                            <el-row class="fs14 mb40" :class="{'hide':typeList !== '1'}">
                                <el-col>
                                    <ul class="dfrcsw">
                                        <li class="mr20">业绩所含子项：</li>
                                        <li class="mr40 cp color-5a5" v-for="(el,i) in itemList" :key='i' :class="el.istap?'activeZZ':''" @click="itemFn(el)">{{el.areaShortName}}</li>
                                    </ul>
                                </el-col>
                            </el-row>
                            <!-- 项目属地 -->
                            <el-row class="fs14 mb40" :class="{'hide':typeList !== '1'}">
                                <el-col>
                                    <ul class="dfrcsw">
                                        <li class="mr20">项目属地：</li>
                                        <li class="mr40 cp color-5a5" v-for="(el,i) in itemList" :key='i' :class="el.istap?'activeZZ':''" @click="areaTap(el)">{{el.areaShortName}}</li>
                                    </ul>
                                </el-col>
                            </el-row>
                            <!-- 工程用途 -->
                            <el-row class="fs14 mb25" :class="{'hide':typeList !== '1'}">
                                <el-col>
                                    <ul class="dfrcsw">
                                        <li class="mr20 mb15">工程用途：</li>
                                        <li class="mr40 cp color-5a5 mb15" v-for="(el,i) in purposeList" :key='i' :class="el.istap?'activeZZ':''" @click="purposeTap(el)">{{el.areaShortName}}</li>
                                    </ul>
                                </el-col>
                            </el-row>
                            <!-- 业绩类型 -->
                            <el-row class="fs14 mb40" :class="{'hide':typeList !== '1'}">
                                <el-col>
                                    <ul class="dfrcsw">
                                        <li class="mr20">业绩类型：</li>
                                        <li class="mr40 cp color-5a5" v-for="(el,i) in yjtypeList" :key='i' :class="el.istap?'activeZZ':''" @click="typeTap(el)">{{el.areaShortName}}</li>
                                    </ul>
                                </el-col>
                            </el-row>
                            <!-- 中标金额/合同金额 -->
                            <el-row class="flex-center drc color-150 fs14 mb20">
                                <div>中标金额/合同金额：</div>
                                <el-input placeholder="最低价（万元）" v-model="data.project.amountStart" style="width: 20%;" @keyup.native="data.project.amountStart=data.project.amountStart.replace(/\D/g,'')"></el-input>
                                    &nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-input placeholder="最高价（万元）" v-model="data.project.amountEnd" style="width: 20%" @keyup.native="data.project.amountEnd=data.project.amountEnd.replace(/\D/g,'')"></el-input>
                            </el-row>
                            <!-- 中标公示 -->
                            <el-row class="flex-center drc color-150 fs14 mb20" :class="{'hide':typeList !== '2'}">
                                <div>中标公示：</div>
                                <el-col :span="22">
                                    <i class="iconfont iconjingshi fs16 ml10 mr10 color-ffc"></i>
                                    <span class="fs14">注：中标公示、施工许可、竣工验收备案分为三个模块，单独查询。</span>
                                </el-col>
                            </el-row>
                            <!-- 中标/合同签订日期 -->
                            <el-row class="fs14 mb20 flex-center drc color-150">
                                <div>{{typeList == '1'?'中标/合同签订日期：':'中标日期：'}}</div>
                                <div>
                                    <el-date-picker value-format="yyyy-MM-dd" v-model="data.project.contractStart" type="date" placeholder="起始日期"></el-date-picker>
                                        &nbsp;&nbsp;至&nbsp;&nbsp;
                                    <el-date-picker value-format="yyyy-MM-dd" v-model="data.project.contractEnd" type="date" placeholder="结束日期"></el-date-picker>
                                </div>
                            </el-row>
                            <!-- 施工许可 -->
                            <el-row class="fs14 mb20 flex-center drc color-150" :class="{'hide':typeList !== '2'}">
                                <div>施工许可：</div>
                            </el-row>
                            <!-- 面积 -->
                            <el-row class="fs14 mb20 flex-center drc color-150">
                                <div>面积（平方米）：</div>
                                <el-input placeholder="最小面积（㎡）" v-model="data.project.areaStart" style="width: 20%;" @keyup.native="data.project.areaStart=data.project.areaStart.replace(/\D/g,'')"></el-input>
                                    &nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-input placeholder="最大面积（㎡）" v-model="data.project.areaEnd" style="width: 20%;" @keyup.native="data.project.areaEnd=data.project.areaEnd.replace(/\D/g,'')"></el-input>
                            </el-row>
                            <!-- 竣工验收日期 -->
                            <el-row class="fs14 mb20 flex-center drc color-150">
                                <div>竣工验收日期：</div>
                                <el-date-picker value-format="yyyy-MM-dd" v-model="data.project.completeStart" type="date" placeholder="起始日期"></el-date-picker>
                                    &nbsp;&nbsp;至&nbsp;&nbsp;
                                <el-date-picker value-format="yyyy-MM-dd" v-model="data.project.completeEnd" type="date" placeholder="结束日期"></el-date-picker>
                            </el-row>
                            <!-- 项目状态 -->
                            <el-row class="fs14 mb20 flex-center drc color-150" :class="{'hide':typeList !== '2'}">
                                <ul class="dfrcsw">
                                    <li class="mr20">项目状态：</li>
                                    <li class="mr40 cp color-5a5" v-for="(el,i) in stateList" :key='i' :class="el.istap?'activeZZ':''" @click="stateTap(el)">{{el.areaShortName}}</li>
                                </ul>
                            </el-row>
                            <!-- 竣工验收备案： -->
                            <el-row class="fs14 mb20 flex-center drc color-150" :class="{'hide':typeList !== '2'}">
                                <div>竣工验收备案：</div>
                            </el-row>
                            <!-- 符合业绩条件的数量 -->
                            <el-row class="fs14 flex-center drc color-150">
                                <div>符合业绩条件的数量：</div>
                                <el-input-number v-model="data.project.proCount" :min="1" size="mini"></el-input-number>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <!-- 信用要求 -->
                <el-row class="pt20 pb20 require" type="flex" :class="{'hide': current !== 1 || typeList !== '1'}">
                    <el-col :span="2" class="fs16 color-150 fw600 mt10">信用要求</el-col>
                    <el-col :span="16">
                        <el-row class="mb20">
                            <!-- 信息来源 -->
                            <el-col :span="18" class="fs14 color-150">
                                信息来源：
                                <el-select
                                    v-model="typeList"
                                    placeholder="请选择"
                                    style="width:50%"
                                    @change="changetable"
                                    clearable
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
                        <el-row class="mb20">
                            <!-- 处罚类别 -->
                            <el-col :span="18" class="fs14 color-150">
                                处罚类别：
                                <el-select
                                    v-model="typeList"
                                    placeholder="请选择"
                                    style="width:50%"
                                    @change="changetable"
                                    clearable
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
                        <!-- 关键字 -->
                        <el-row class="drc mb20">
                            <el-col :span="13" class="fs14 color-150">
                                关键字：
                                <el-input
                                    placeholder="请输入关键字"
                                    clearable
                                    v-model="firmAlias"
                                    style="width:75%"
                                >
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </el-col>
                        </el-row>
                        <!-- 处罚决定日期 -->
                        <el-row class="fs14 mb20 flex-center drc color-150">
                            <div>处罚决定日期：</div>
                            <el-date-picker value-format="yyyy-MM-dd" v-model="data.project.completeStart" type="date" placeholder="起始日期"></el-date-picker>
                                &nbsp;&nbsp;至&nbsp;&nbsp;
                            <el-date-picker value-format="yyyy-MM-dd" v-model="data.project.completeEnd" type="date" placeholder="结束日期"></el-date-picker>
                        </el-row>
                        <!-- 符合业绩条件的数量 -->
                        <el-row class="fs14 flex-center drc color-150">
                            <div>符合信用条件的数量：</div>
                            <el-input-number v-model="data.project.proCount" :min="1" size="mini"></el-input-number>
                        </el-row>
                    </el-col>
                    <el-col :span="6" class="text-r">
                        <el-checkbox v-model="checked"  class="fs14 color-150">仅查询无行政处罚的企业</el-checkbox>
                    </el-col>
                </el-row>
                <el-row :class="{'hide': current !== 1 || typeList !== '1'}">
                    <el-col class="evaluation fs16 color-150 fw600">诚信综合评价</el-col>
                    <el-col class="drc scores" :span="18">
                        <div class="fs14 color-150">综合得分：</div>
                        <el-input placeholder="最低分" v-model="data.project.amountStart" style="width: 20%;" @keyup.native="data.project.amountStart=data.project.amountStart.replace(/\D/g,'')"></el-input>
                            &nbsp;&nbsp;至&nbsp;&nbsp;
                        <el-input placeholder="最高分" v-model="data.project.amountEnd" style="width: 20%" @keyup.native="data.project.amountEnd=data.project.amountEnd.replace(/\D/g,'')"></el-input>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 承上启下 -->
        <div class="totalBox dfrcb fs14">
            <div class="drc">
                <div class="bottom_img ml40">
                    <i class="iconfont iconwancheng"></i>
                </div>
                <p class="ml20">
                    共为您找到符合企业
                    <span>
                        <span v-if="total">
                            <span class="total fw600" v-if="total==5000">5000+</span>
                            <!-- <template v-else>{{total}}</template> -->
                        </span>
                        <span class="total fw600" v-else>0</span>
                    </span>
                    家
                </p>
                <button class="info_btn fs18 cp color-eb6 bg-fff" @click="jump">查看详情</button>
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
import newScreenZZ from "@/components/newScreenZZ";
import newScreenRY from "@/components/zhuancha/newScreenRY";
export default {
    components: {
        "v-bread": publicBread,
        "v-head3": head3,
        "v-newScreenZZ": newScreenZZ,
        "v-newScreenRY": newScreenRY
    },
    data() {
        return {
            breadList: [{ title: "重庆定制版查询系统" }], //面包屑列表,以对象形式添加;
            current: 1,
            currentZZ: 1, //资质切换
            typeList: "1", //全国资质与重庆资质筛选框,1为全国,2为重庆;
            firmAlias: "",
            radio: 3, //单选勾选;
            typeLists: [
                {
                    id: "1",
                    value: "全国建筑市场监管公共服务平台"
                },
                {
                    id: "2",
                    value: "重庆建设工程信息网"
                }
            ],
            itemList:[//业绩所含子项
                {
                    areaShortName:'招投标',
                    istap:false,
                },{
                    areaShortName:'施工图审查',
                    istap:false,
                },{
                    areaShortName:'合同备案',
                    istap:false,
                },{
                    areaShortName:'施工许可证',
                    istap:false,
                },{
                    areaShortName:'竣工验收',
                    istap:false,
                }
            ],
            purposeList:[//工程用途
                {
                    areaShortName:'不限',
                    istap:true,
                },{
                    areaShortName:'公共建筑',
                    istap:false,
                },{
                    areaShortName:'公共建筑配套工程',
                    istap:false,
                },{
                    areaShortName:'办公建筑',
                    istap:false,
                },{
                    areaShortName:'居住建筑',
                    istap:false,
                },{
                    areaShortName:'居住建筑配套工程',
                    istap:false,
                },{
                    areaShortName:'工业建筑',
                    istap:false,
                },{
                    areaShortName:'工业建筑配套工程',
                    istap:false,
                },{
                    areaShortName:'商业建筑',
                    istap:false,
                },{
                    areaShortName:'商住楼',
                    istap:false,
                },{
                    areaShortName:'农业建筑',
                    istap:false,
                },{
                    areaShortName:'农业建筑配套工程',
                    istap:false,
                },{
                    areaShortName:'交通运输类',
                    istap:false,
                },{
                    areaShortName:'公共交通',
                    istap:false,
                },{
                    areaShortName:'旅游建筑',
                    istap:false,
                },{
                    areaShortName:'科教文卫建筑',
                    istap:false,
                },{
                    areaShortName:'给水',
                    istap:false,
                },{
                    areaShortName:'排水',
                    istap:false,
                },{
                    areaShortName:'道路',
                    istap:false,
                },{
                    areaShortName:'桥隧',
                    istap:false,
                },{
                    areaShortName:'环境园林',
                    istap:false,
                },{
                    areaShortName:'风景园林',
                    istap:false,
                },{
                    areaShortName:'热力',
                    istap:false,
                },{
                    areaShortName:'燃气',
                    istap:false,
                },{
                    areaShortName:'通信建筑',
                    istap:false,
                }
            ],
            yjtypeList:[//业绩类型
                {
                    areaShortName:'不限',
                    istap:true,
                },{
                    areaShortName:'施工',
                    istap:false,
                },{
                    areaShortName:'设计',
                    istap:false,
                },{
                    areaShortName:'勘察',
                    istap:false,
                },{
                    areaShortName:'监理',
                    istap:false,
                },{
                    areaShortName:'施工设计一体化',
                    istap:false,
                },{
                    areaShortName:'劳务',
                    istap:false,
                },{
                    areaShortName:'项目管理',
                    istap:false,
                }
            ],
            stateList:[//业绩所含子项
                {
                    areaShortName:'不限',
                    istap:true,
                },{
                    areaShortName:'项目在建',
                    istap:false,
                },{
                    areaShortName:'项目竣工',
                    istap:false,
                }
            ],
            data:{
                joinRegion:"all_in",//备案地区
                qualCode:"",//资质
                rangeType:"",
                regisAddress:"",
                project:{
                    opt:"title",//搜索类型
                    keywords:"",//搜索关键字
                    childProject:"",//业务所含子项
                    proWhere:"",//项目属地
                    proUse:"",//工程用途
                    proType:"",//业绩类型
                    amountStart:"",//最低价
                    amountEnd:"",//最高价
                    contractStart:"",//起始日期
                    contractEnd:"",//结束日期
                    completeStart:"",//竣工起始日期
                    completeEnd:"",//竣工结束日期
                    areaStart:"",//最小面积
                    areaEnd:"",//最大面积
                    proCount:1,//符合业绩条件的数量
                    optType:"or"
                },
                person:[],
                zhuanchaType:"zhujian"
            },
            checked: false,
            checkList: [],
            total: 5000, //查找数量
        };
    },
    methods: {
        handleClick(index) {
            this.current = index;
        },
        handleClickZZ (index) {
            this.currentZZ = index;
        },
        changetable() {
        },
        backSelect(arr){//选不限时，其他取消选择
            for(let x of arr){
                if(x.areaShortName !== '不限'){
                    x.istap = false;
                }
            }
        },
        selectFn(el,arr){//选择
            if(el.areaShortName == '不限'){
                el.istap = true;
                this.backSelect(arr);
            }else{
                el.istap = !el.istap;
                if(this.forInLength(arr)){
                    arr[0].istap = true;
                }else{
                    arr[0].istap = false;
                }
            }
        },
        forInLength(arr){//其他都没选，自动选不限
            let a=[];
            for(let x of arr){
                if(x.istap){
                    a.push(x.areaShortName);
                }
            }
            if(a.length == 0){
                return true;
            }else{
                return false;
            }
        },
        itemFn(el){//业绩所含子项
            el.istap=!el.istap;
        },
        areaTap(el){//项目属地
            this.selectFn(el,this.areasList);
            // this.data.project.proWhere=this.forArrStr(this.areasList);
            // this.ajax()
        },
        purposeTap(el){//工程用途
            this.selectFn(el,this.purposeList)
            // this.data.project.proUse=this.forArrStr(this.purposeList);
            // this.ajax()
        },
        typeTap(el){//业绩类型
            this.selectFn(el,this.yjtypeList);
            // this.data.project.proType=this.forArrStr(this.typeList);
            // this.ajax()
        },
        stateTap(el) {//项目状态
            this.selectFn(el,this.stateList);
        },
        jump() {
            this.$router.push({path: '/result'})
        }
    }
};
</script>
<style lang="less">
@import "../../style/publicCSS";
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
.el-select .el-input__inner {
    color: @lightColor !important;
}
.el-icon-arrow-up:before {
    content: "\e6a1" !important;
}
.el-icon-arrow-up,
.el-icon-arrow-down {
    font-size: @subContentSize !important;
    transform: scale(0.6) !important;
}
.el-select .el-input .el-select__caret {
    color: @darkColor !important;
}
.el-radio__inner:hover {
    border-color: @themeColor !important;
}
.el-radio {
    margin-right: 20px;
}
body .el-radio__input.is-checked+.el-radio__label {
    font-weight: 700;
}
.el-input-number--mini{
    width: 95px;
    .el-input-number__decrease {
        background: @initColor !important;
    }
    .el-input-number__increase  {
        background: @pinkColor !important;
        color: @whiteColor !important;
    }
}
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: @textColor !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color:  @themeColor !important;
    border-color: @themeColor !important;
}
.el-checkbox__input.is-focus .el-checkbox__inner, .el-checkbox__inner:hover {
    color: @themeColor !important;
}
.el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
    border-color: none !important;
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
            padding: 20px 0;
        }
        .evaluation {
            padding: 27px 0;
        }
        .scores {
            margin-left: 84px;
        }
        .activeZZ {
            color: @themeColor;
            font-weight: 700;
        }
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
            color: @themeColor;
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
            border-radius:8px;
            border: 1px solid @themeColor;
            margin-left: 60px;
        }
    }
}
</style>