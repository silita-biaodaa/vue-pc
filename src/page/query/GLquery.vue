<!-- 模型： DOM 结构 -->
<template>
    
    <div class="ZJquery">
        <!-- 头 -->
		<v-head :headTxt="'公路信息综合查询系统'"></v-head>
        <div class="nav-menu">首页 > 公路信息综合查询系统</div>
        <!-- 筛选 -->
        <div class="select maxW-box">
            <div class="bottom-bor">
                <el-row>
                    <el-col :span="2">企业地区：</el-col>
                    <el-col :span="22"  class="condition">
                        <div v-for="(el,i) in addressList" :key='i' :class="el.code==data.regisAddress?'current':''" @click='addressFn(el)'>{{el.areaShortName}}</div>
                    </el-col>
                </el-row>
                <el-row v-if="data.regisAddress!=''">
                    <el-col :span="2">备案地区：</el-col>
                    <el-col :span="22" class="condition">
                        <div v-for="(el,i) in recordList" :key='i' :class="el.code==data.joinRegion?'current':''" @click='isBeiFn(el)'>{{el.name}}</div>
                    </el-col>
                </el-row>
            </div>
            <!-- 资质 -->
			<v-screenzz  class="bottom-bor" :qualList='companyQuals' @contentChange='screenzzFn' :zztype='data.qualCode' :query="true"></v-screenzz>
            <!-- 人员 -->
            <v-screenry  class="bottom-bor" :qualList='peopleList' @contentChange='screenryFn'></v-screenry>
            <!-- 业绩要求 -->
            <el-row class="yj bottom-bor" >
                <el-col :span="2">业绩要求：</el-col>
                <el-col :span="22">
                    <!-- 项目关键字 -->
                    <el-row>
                        <el-col :span="1">项目关键字：</el-col>
                        <el-input placeholder="请输入内容,多个关键字用空格隔开"  v-model="data.project.keywords"></el-input>
                        <el-radio-group v-model="data.project.opt">
                            <el-radio label="title">根据标题搜索</el-radio>
                            <el-radio label="scope">根据主要工程量搜索</el-radio>
                            <el-radio label="title_and_scope">根据标题和主要工程量搜索</el-radio>
                        </el-radio-group>
                    </el-row>
                    <!-- 多个关键词之间的关系 -->
                    <el-row v-if="isoptType">
                        <el-col :span="1">多个关键词之间的关系：</el-col>
                        <div class="condition">
                            <div class="item" v-for="(el,i) in optGxList" :key="i" :class="el.code==data.project.optType?'current':''" @click="optGxFn(el)">{{el.name}}</div>
                        </div>
                    </el-row>
                    <!-- 项目属地 -->
                    <el-row>
                        <el-col :span="1">项目属地：</el-col>
                        <div class="condition">
                            <div class="areas" v-for="(el,i) of areasList" :key="'a'+i" :class="el.istap?'current':''" @click="areaTap(el)">{{el.areaShortName}}</div>
                        </div>
                    </el-row>
                    <!-- 建设状态 -->
                    <el-row>
                        <el-col :span="1">建设状态：</el-col>
                        <div class="condition">
                            <div class="areas" v-for="(el,i) of proBuildList" :key="'a'+i" :class="el.istap?'current':''" @click="proBuildTap(el)">{{el.areaShortName}}</div>
                        </div>
                    </el-row>
                    <!-- 项目类型 -->
                    <el-row>
                        <el-col :span="1">项目类型：</el-col>
                        <div class="condition">
                            <div class="areas" v-for="(el,i) of typeList" :key="'a'+i" :class="el.istap?'current':''" @click="typeTap(el)">{{el.areaShortName}}</div>
                        </div>
                    </el-row>
                    <!-- 项目金额 -->
                    <el-row>
                        <el-col :span="1">中标金额/合同金额：</el-col>
                        <el-input placeholder="最低价（万元）" v-model="data.project.amountStart" class="inputW" @keyup.native="data.project.amountStart=data.project.amountStart.replace(/\D/g,'')"></el-input>
                        ——
                        <el-input placeholder="最高价（万元）" v-model="data.project.amountEnd" class="inputW r" @keyup.native="data.project.amountEnd=data.project.amountEnd.replace(/\D/g,'')"></el-input>
                    </el-row>
                    <!-- 竣工验收日期 -->
                    <el-row>
                        <el-col :span="1">竣工验收日期：</el-col>
                        <el-date-picker value-format="yyyy-MM-dd" v-model="data.project.completeStart" type="date" placeholder="起始日期" class="inputW"></el-date-picker>
                        ——
                        <el-date-picker value-format="yyyy-MM-dd" v-model="data.project.completeEnd" type="date" placeholder="结束日期" class="inputW r"></el-date-picker>
                    </el-row>
                </el-col>
            </el-row>
            <!--  -->
            <el-row class="bottom-bor" >
                <el-col :span="2">信用等级：</el-col>
                <el-col :span="22">
                    <!-- 评价类型 -->
                    <el-row>
                        <el-col :span="1">评价类型：</el-col>
                        <div class="condition">
                            <div class="areas" v-for="(el,i) of creditTypeList" :key="'a'+i" :class="data.credit.creditType==el?'current':''" @click="creditTypeFn(el)">{{el}}</div>
                        </div>
                    </el-row>
                    <!-- 评价省份 -->
                    <el-row v-if="data.credit.creditType=='施工'||data.credit.creditType=='设计'">
                        <el-col :span="1">评价省份：</el-col>
                        <div class="condition">
                            <div class="areas" v-for="(el,i) of pjareasList" :key="'a'+i"  :class="el.code==data.credit.province?'current':''" @click="pjareaTap(el)">{{el.areaShortName}}</div>
                        </div>
                    </el-row>
                    <!-- 年份评分 -->
                    <el-row v-for="(el,i) of evaluateList" :key="'a'+i">
                        <el-col :span="1">{{el.year}}年度：</el-col>
                        <div class="condition">
                            <div class="areas" v-for="(x,y) of el.list" :key="'a'+y" :class="x.istap?'current':''" @click="yearTap(el,x)">{{x.areaShortName}}</div>
                        </div>
                    </el-row>
                    <!-- 评分 -->
                    <el-row>
                        <el-col :span="1">等级评分：</el-col>
                        <el-input placeholder="最低分(小数)" v-model="data.credit.scoreStart" class="inputW" @keyup.native="returnInt(0)"></el-input>
                        ——
                        <el-input placeholder="最高分(小数)" v-model="data.credit.scoreEnd" class="inputW r" @keyup.native="returnInt(1)"></el-input>
                        <div class="rule">
                            <span class="color-font">评分规则？</span>
                            <div class="rule-box">
                                <h5>评分规则</h5>
                                <ul>
                                    <li v-for="(el,i) of ruleList" :key="i">
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
        <div class="totalBox  maxW-box">
            <div class="leftl">
                <img src="../../assets/img/icon-chg.png"/>
                <p>
                    共为您找到符合企业
                    <span>
                        <template v-if="total">
                            <template v-if="total==5000">5000+</template>
                            <template v-else>{{total}}</template>
                        </template>
                        <template v-else>0</template>
                    </span>
                    家
                </p>
                <button class="btn" :class="total==0?'ban':''" @click="jump">查看详情</button>
            </div>
            <div class="rightr">
                <p class="up">服务电话：0731-85076077</p>
                <p class="down">vip会员用户详情透视通道</p>
            </div>
            
        </div>
    </div>
</template>
<script>
import screenZZ from '@/components/screenZZ'
import screenRY from '@/components/zhuancha/screenRY'
import heads from '@/components/head3'
export default {
    name: 'ZJquery', // 结构名称
    data() {
        return {
            // 数据模型
            recordList:[//备案地区
                {
                    name:'渝内企业',
                    code:'in',
                },{
                    name:'入渝企业',
                    code:'enter',
                },{
                    name:'入渝+渝内企业',
                    code:'all_in',
                },
            ],
            optGxList:[
                {
                    name:'满足任意一个',
                    code:'or'
                },{
                    name:'满足所有',
                    code:'and'
                }
            ],
            typeList:[],
            addressList:[],
            companyQuals:[],
            areasList:[],
            pjareasList:[],
            peopleList:[],
            proBuildList:[],//建设状态
            creditTypeList:['施工','设计','监理'],
            evaluateList:[],//评价年份等级
            data:{
                joinRegion:'all_in',//备案地区
                qualCode:null,//资质
                regisAddress:'',
                project:{
                    opt:'title',//搜索类型
                    keywords:'',//搜索关键字
                    proWhere:null,//项目属地
                    proBuild:null,//建设状态
                    proType:null,//业绩类型
                    amountStart:null,//最低价
                    amountEnd:null,//最高价
                    completeStart:null,//竣工起始日期
                    completeEnd:null,//竣工结束日期
                    optType:'or'
                },
                person:[],
                zhuanchaType:'gonglu',
                credit:{
                    province:null,//评价省份
                    creditType:null,//评价类型
                    scoreStart:null,//最低评分
                    scoreEnd:null,//最高评分
                    evaluateYear:null,//评价年份 示例：2018/AA,B;2017/B,C
                }
            },
            total:0,
            isyj:false,
            isoptType:false,
            ruleList:[
                {
                    year:'近1年',
                    int1:0.5,
                    int2:0.3,
                },{
                    year:'近2年',
                    int1:0.3,
                    int2:0.2,
                },{
                    year:'近3年',
                    int1:0.2,
                    int2:0.1,
                }
            ],
            id:null
        }
    },
    watch: {
        // 监控集合
        // 'data.project.keywords'(newVal,oldVal){
        //     this.ajax()
        // },
        data:{
            deep:true,
            handler(newVal,oldVal){
                this.ajax()
            }
        },
        'data.project':{
            deep:true,
            handler(newval,oldVal){
                if(newval.keywords!=''||newval.opt!='title'||newval.childProject
                    ||newval.proWhere||newval.proUse||newval.proType||newval.amountStart
                    ||newval.amountEnd||newval.contractStart||newval.contractEnd||newval.completeStart
                    ||newval.completeEnd||newval.areaStart||newval.areaEnd){//如果筛选了业绩，则显示符合业绩数量
                        this.isyj=true;
                }else{
                    this.isyj=false;
                }
                let arr=newval.keywords.split(',');
                if(arr.length>1){
                    this.isoptType=true
                }else{
                    this.isoptType=false
                }
                // this.data.project.proCount=1;
            }
        },
    },
    inject: ['reload'],
    components:{
        'v-screenzz':screenZZ,
        'v-screenry':screenRY,
        'v-head': heads,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let data = JSON.parse(sessionStorage.getItem('filter'));
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
        for(let x of data.area){
            x.code=x.name
        }
        this.addressList=JSON.parse(JSON.stringify(data.area));
        this.addressList.unshift({
            areaShortName:'全国',
            code:''
        })
        this.companyQuals = data.comQua;
        for(let x of data.area){
            x.istap=false
        }
        this.areasList= data.area;
        this.areasList.unshift({
            areaShortName:'不限',
            istap:true,
        })
        this.pjareasList=JSON.parse(JSON.stringify(this.addressList));

        let ryData=JSON.parse(sessionStorage.getItem('people'));
        this.peopleList=ryData
        let proBuildData=JSON.parse(sessionStorage.getItem('proType'));
        for(let x of proBuildData.gonglu.build){
            let d={
                areaShortName:x,
                istap:false
            }
            this.proBuildList.push(d)
        }
        for(let x of proBuildData.gonglu.proType){
            let d={
                areaShortName:x,
                istap:false
            }
            x=d
            this.typeList.push(d)
        }
        this.proBuildList.unshift({
            areaShortName:'不限',
            istap:true,
        })
        this.typeList.unshift({
            areaShortName:'不限',
            istap:true,
        })
        this.evaluateListFn();
        this.ajax();
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
        returnInt(i){//匹配小于1的保留一位的正小数
            let t=/^(0|0\.[1-9])$/;
            if(i==0){
                if(!t.test(this.data.credit.scoreStart*1)){
                    this.data.credit.scoreStart=''
                }
            }else if(i==1){
                if(!t.test(this.data.credit.scoreEnd*1)){
                    this.data.credit.scoreEnd=''
                }
            }
            
        },
        addressFn(el){
            if(el.areaShortName=='全国'){
                this.data.regisAddress=''
            }else{
                this.data.regisAddress=el.name;
                this.recordList[0].name=el.shortName+'内企业';
                this.recordList[1].name='入'+el.shortName+'企业';
                this.recordList[2].name='入'+el.shortName+'+'+el.shortName+'内企业';
            }
            // this.ajax()
        },
        evaluateListFn(){
            let arr=[];
            let nowYear=new Date().getFullYear();
            let l=[//评价年份等级
                {
                    areaShortName:'不限',
                    istap:true,
                },
                {
                    areaShortName:'AA',
                    istap:false,
                },{
                    areaShortName:'A',
                    istap:false,
                },{
                    areaShortName:'B',
                    istap:false,
                },{
                    areaShortName:'C',
                    istap:false,
                },{
                    areaShortName:'D',
                    istap:false,
                }
            ]
            for(let x=1;x<4;x++){
                let d={
                    year:nowYear-x,
                    list:JSON.parse(JSON.stringify(l))
                }
                arr.push(d)
            }
            this.evaluateList=arr;
        },
        isBeiFn(el){//备案地区
            this.data.joinRegion=el.code;
            // this.ajax()
        },
        screenzzFn(val){//接受资质变化抛出的值
            this.data.qualCode=val.str;
            // this.ajax()
        },
        screenryFn(val){//接受人员变化抛出的值
            this.data.person=val;
            // this.ajax()
        },
        forArrStr(arr){//从数组中取出对应值
            let a=[];
            let str=''
            for(let x of arr){
                if(x.istap){
                    if(x.areaShortName=='不限'){
                        str=null
                        return str
                    }
                    a.push(x.areaShortName)
                }
            }
            str=a.join(',')
            return str
        },
        forInLength(arr){//其他都没选，自动选不限
            let a=[];
            for(let x of arr){
                if(x.istap){
                    a.push(x.areaShortName)
                }
            }
            if(a.length==0){
                return true
            }else{
                return false
            }
        },
        backSelect(arr){//选不限时，其他取消选择
            for(let x of arr){
                if(x.areaShortName!='不限'){
                    x.istap=false
                }
            }
        },
        selectFn(el,arr){//选择
            if(el.areaShortName=='不限'){
                el.istap=true
                this.backSelect(arr)
            }else{
                el.istap=!el.istap
                if(this.forInLength(arr)){
                    arr[0].istap=true
                }else{
                    arr[0].istap=false
                }
            }
        },
        areaTap(el){//项目属地
            this.selectFn(el,this.areasList)
            this.data.project.proWhere=this.forArrStr(this.areasList);
            // this.ajax()
        },
        typeTap(el){//项目类型
            this.selectFn(el,this.typeList)
            this.data.project.proType=this.forArrStr(this.typeList);
            // this.ajax()
        },
        proBuildTap(el){
            this.selectFn(el,this.proBuildList)
            this.data.project.proBuild=this.forArrStr(this.proBuildList);
        },
        optGxFn(el){//多个关键词之间的关系
            this.data.project.optType=el.code;
        },
        creditTypeFn(el){//评价类型
            if(el!='监理'&&el!=''){
                this.data.credit.province=this.$parent.source.source
            }else{
                this.data.credit.province=null
            }
            if(this.data.credit.creditType==el){
                this.data.credit.creditType=null
                this.data.credit.province=null
            }else{
                this.data.credit.creditType=el;
            }
            
            
        },
        pjareaTap(el){//评价省份
            if(el.areaShortName=='全国'){
                this.data.credit.province=null
            }else{
                this.data.credit.province=el.code;
            }
            // this.data.credit.province=this.forArrStr(this.pjareasList);
        },
        yearTap(el,x){//评价年份
            this.selectFn(x,el.list)
            // let str=this.forArrStr(el.list);
            let arr=[];
            for(let o in this.evaluateList){
                if(this.forArrStr(this.evaluateList[o].list)&&this.forArrStr(this.evaluateList[o].list)!=''){
                    let str=this.evaluateList[o].year+'/'+this.forArrStr(this.evaluateList[o].list)
                    arr.push(str)
                }
            }
            this.data.credit.evaluateYear=arr.join(';')
        },
        ajax(){//查询
            this.total=0;
            let data=this.data
            data.project.keywords=data.project.keywords.replace(/ /g,',');
            let that=this;
            this.$http({
                method:'post',
                url:'/gonglu/count',
                data:data
            }).then(res =>{
                if(res.data.code==1){
                    that.total=res.data.data.count;
                    that.id=res.data.data.pkid;
                }else{
                    that.$alert(res.data.msg)
                }
            })
        },
        jump(){
            if(this.total==0){
                return false
            }
            let id=this.id
            const {href} = this.$router.resolve({
                path: '/queryPay',
                query: {
                    id:id,
                    type:'gl',
                    num:this.total
                }
            })
            window.open(href, '_blank', )
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
@import '../../style/query.less';
.rule{
    margin-left: 20px;
    position: relative;
    display: inline-block;
    font-size: 12px;
    cursor: pointer;
    .color-font{
        color: @color;
    }
    .rule-box{
        display: none;
        position: absolute;
        background: #fff;
        width: 520px;
        height: 200px;
        bottom: calc(-100% + 40px);
        transform: translateX(-50%);
        left:50%;
        border-radius: 5px;
        box-shadow:4px 2px 10px 0px rgba(0, 0, 0, 0.1);
        h5{
            line-height: 52px;
            font-size: 16px;
            text-align: center;
            border-bottom: 1px solid #f2f2f2
        }
        ul{
            height:147px;
            padding:20px 40px;
            box-sizing: border-box; 
            li{
                height:calc(100% / 3);
                display: flex;
                align-items: center;
                font-size: 16px;
                div{
                    flex-grow:2;
                    display: flex;
                    justify-content: space-between;
                    span{
                        font:last-child{
                            margin-left: 15px
                        }
                    }
                }
                span{
                    flex-grow:1;
                }
            }
        }
    }
}
.rule:hover .rule-box{
    display: block
}


</style>
