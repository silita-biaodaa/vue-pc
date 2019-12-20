<!-- 模型： DOM 结构 -->
<template>
    <div class="rydetail">
        <!-- 头 -->
		<v-head :headTxt="'重庆定制版查询系统'"></v-head>
        <v-bread :breadList="[{ title: '重庆定制版查询系统'},{title:'查询结果'},{title:曹长卿}]"></v-bread>
        <!-- 基本信息 -->
        <div class="basic maxW-box">
            <div class="title">
                <i class="iconfont iconshenfen"></i>
                曹长卿
                <!-- <v-region :data="basic.joinRegion"></v-region> -->
            </div>
            <div class="people-box">
                <span>身份证号：4301011966*****</span>
                <span>性别：男</span>
            </div>
        </div>
        <!--列表-->
        <div class="list maxW-box">
            <div class="tab">
                <template>
                    <ul>
                        <span @click="jumpCompanyAll" class="iconfont iconchakan">查看人员完整信息</span>
                        <li v-for="(o,i) of tabList" :key="i" :class="tabNum==o.name?'current':''" @click="tabFn(o,i)" v-if="o.num>0">{{o.name}}（{{o.num}}）</li>
                    </ul>
                </template>
            </div>
            <div class="list-box">
                <!-- 资质 -->
                <template v-if="tabNum=='符合要求资质'">
                    <div class="condition">
                        <span v-for="(o,i) of conditionList" :key="i" :class="conditionName==o.name?'current':''" @click="conditionFn(o,i)">{{o.name}}({{o.num}})</span>
                    </div>
                    <table>
                        <thead>
                            <td>序号</td>
                            <td>资质类别</td>
                            <td>资质名称</td>
                            <td>发证机关</td>
                            <td>证书有效期</td>
                        </thead>
                        <tbody>
                            <tr v-for="(o,i) of list" :key="i">
                                <td>{{i+1}}</td>
                                <td>{{o.qualType}}</td>
                                <td>{{o.qualName}}</td>
                                <td>{{o.certOrg}}</td>
                                <td>{{o.validDate}}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                <!-- 人员 -->
                <template v-else-if="tabNum=='符合要求证书'">
                    <div class="condition">
                        <span v-for="(o,i) of ryConditionList" :key="i" :class="ryTabName==o.cate?'current':''" @click="ryTabFn(o,i)">{{o.cate}}({{o.count}})</span>
                    </div>
                    <!-- 加载中 -->
                    <!-- <template v-if="ryIsajax"> -->
                        <!-- <template v-if="ryList&&ryList.length>0"> -->
                            <ul class="certificate">
                                <li>
                                    <div class="box">
                                        <div>
                                            <span>注册类别：</span>
                                            一级注册建筑师
                                        </div>
                                        <div>
                                            <span>注册专业：</span>
                                            土建
                                        </div>
                                        <div></div>
                                        <div>
                                            <span>证书编号：</span>
                                            192231410
                                        </div>
                                        <div>
                                            <span>执业印章号：</span>
                                            281827-007
                                        </div>
                                        <div>
                                            <span>有效期：</span>
                                            2021-11-18
                                        </div>
                                        <div class="company-people">
                                            <span>注册单位：</span>
                                            湖南耀邦建设有限公司
                                        </div>
                                    </div>
                                    <div class="num">1</div>
                                </li>
                            </ul>
                            <div class="page">
                                <nav-page :all='ryTotal' :currents='ryData.pageNo' :pageSize='ryData.pageSize' @skip='ryGoto'></nav-page>
                            </div>
                        <!-- </template> -->
                        <!-- 无数据  -->
                        <!-- <template v-else-if="ryList&&ryList.length==0">
                            <div class="no-toast">
                                <img src="../../assets/img/bank_card @2x.png" alt="">
                                <span>Sorry，没有找到符合条件的证书信息</span>
                            </div>
                        </template> -->
                        <!-- 加载失败 -->
                        <!-- <template v-else-if="!ryList">
                            <div class="ajax-erroe">
                                <img src="../../assets/img/pic-zoudiu.png" />
                                <span @click="recoldFn">刷新</span>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
                    </template> -->
                </template>
                <!-- 业绩 -->
                <template v-else-if="tabNum=='符合要求项目'">
                    <!-- 加载中 -->
                    <template v-if="yjIsajax">
                        <template v-if="yjList&&yjList.length>0">
                            <table ref="yj">
                                <thead>
                                    <td style="width:55px">序号</td>
                                    <td style="width:calc(100% - 478px)">项目名称</td>
                                    <td style="width:100px">业绩类型</td>
                                    <td style="width:190px">中标金额/合同金额（万元）</td>
                                    <td style="width:120px">竣工时间</td>
                                </thead>
                                <tbody>
                                    <tr v-for="(o,i) of yjList" :key="i">
                                        <td>{{(yjData.pageNo-1)*20+i+1}}</td>
                                        <td class="curpon" @click="jumpYjDetail(o.proId)">{{o.proName}}</td>
                                        <td>{{o.type}}</td>
                                        <td>{{o.amount}}</td>
                                        <td>{{o.buildEnd?formatDate(o.buildEnd):''}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="page">
                                <nav-page :all='yjTotal' :currents='yjData.pageNo' :pageSize='yjData.pageSize' @skip='yjGoto'></nav-page>
                            </div>
                        </template>
                        <!-- 无数据  -->
                        <template v-else-if="yjList&&yjList.length==0">
                            <div class="no-toast">
                                <img src="../../assets/img/bank_card @2x.png" alt="">
                                <span>Sorry，没有找到符合条件的项目信息</span>
                            </div>
                        </template>
                        <!-- 加载失败 -->
                        <template v-else-if="!yjList">
                            <div class="ajax-erroe">
                                <img src="../../assets/img/pic-zoudiu.png" />
                                <span @click="recoldFn">刷新</span>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import heads from '@/components/head3'
import joinRegion from '@/components/zhuancha/joinRegion'
export default {
    name: 'rydetail', // 结构名称
    data() {
        return {
            // 数据模型a
            loading:true,
            tabList:[
                {
                    name:'符合要求资质',
                    num:0
                },{
                    name:'符合要求证书',
                    num:0
                },{
                    name:'符合要求项目',
                    num:0
                }
            ],
            tabNum:'符合要求资质',
            conditionList:[{
                name:'全部',
                num:0
            }],
            ryConditionList:[{
                cate:'全部',
                count:0
            }],
            conditionName:'全部',
            ryTabName:'全部',
            basic:{},//基本信息
            list:[],//显现数组
            qualList:[],//资质承载数组
            allList:[],
            yjData:{
                pageNo:1,
                pageSize:20,
                type:'project'
            },
            yjTotal:0,
            yjList:[],
            yjIsajax:false,
            ryData:{
                type:'person',
                pageNo:1,
                pageSize:20
            },
            ryTotal:0,
            ryList:[],
            ryIsajax:false,
            // xyData:{
            //     pageNo:1,
            //     pageSize:20,
            //     type:'credit'
            // },
            // xyList:[],
            // xyIsajax:false,
            // xyTotal:0,
            data:{}

        }
    },
    inject: ['reload'],
    watch: {
        // 监控集合
    },
    components:{
        'v-head': heads,
        'v-region':joinRegion
    },
    computed:{
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
        const loading=this.$loading({
            lock:true,
            text:'正在加载...',
            spinner:'el-icon-loading',
            background:'rgba(0,0,0,.7)'
        })
        //基本信息
        let data={
            comId:this.$route.query.id,
            type:'detail',
            orderNo:this.$route.query.n
        }
        this.$http({
            method:'post',
            url:'/gonglu/zhauncha/detail/company',
            data:data
        }).then(res =>{
            loading.close();
            if(res.data.code==1){
                this.basic=res.data.data;
                this.tabList[0].num=res.data.data.qualCount;
                this.tabList[1].num=res.data.data.personCount;
                this.ryTotal=res.data.data.personCount;
                this.tabList[2].num=res.data.data.projectCount;
                this.yjTotal=res.data.data.projectCount;
                // this.tabList[3].num=res.data.data.creditCount;
                // this.xyTotal=res.data.data.creditCount;
                if(this.tabList[0].num>0){
                    this.tabNum='符合要求资质'
                    this.zzAjax(data);
                }else if(this.tabList[1].num>0){
                    this.tabNum='符合要求证书'
                    this.ryData.orderNo=this.$route.query.n;
                    this.ryData.comId=this.$route.query.id;
                    this.ryAjax();
                }else if(this.tabList[2].num>0){
                    this.tabNum='符合要求项目'
                    this.yjData.orderNo=this.$route.query.n;
                    this.yjData.comId=this.$route.query.id;
                    this.yjAjax();
                }
            }else{
                this.$alert(res.data.msg);
            }
        })
    },
    created() {
        // console.group('创建完毕状态===============》created');
        
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
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
        conditionFn(o,i){//列表tab切换
            this.conditionName=o.name;
            if(i==0){
                this.list=this.allList
            }else{
                this.list=this.qualList[i-1].list;
            }
        },
        //刷新
        recoldFn() {
            this.reload();
        },
        jumpCompanyAll(){//跳到人员完整信息
            const {href} = this.$router.resolve({
                path: '/introduce/icbc',
                query: {
                    id:this.basic.comId,
                    name:this.basic.comName,
                    source:this.basic.regisAddress
                }
            })
            window.open(href, '_blank', )
        },
        tabFn(o,i){//tab切换
            this.tabNum=o.name;
            if(o.name=='符合要求资质'){
                this.zzAjax(data);
            }else if(o.name=='符合要求证书'){
                // this.ryData.orderNo=this.$route.query.n;
                // this.ryData.comId=this.$route.query.id;
                // this.ryAjax();
            }else if(o.name=='符合要求项目'){
                this.yjData.orderNo=this.$route.query.n;
                this.yjData.comId=this.$route.query.id;
                this.yjAjax();
            }
        },
        /**资质 */
        zzAjax(data){
            let that=this;
            this.$http({
                method:'post',
                url:'/gonglu/zhauncha/detail/company',
                data:{
                    comId:this.$route.query.id,
                    type:'qual',
                    orderNo:this.$route.query.n
                }
            }).then(res =>{
                let arr=[],num=0;
                for(let x of res.data.data){
                    let obj={
                        name:x.qualType,
                        num:x.list.length
                    }
                    arr=arr.concat(x.list)
                    num+=x.list.length
                    this.conditionList.push(obj)
                }
                this.tabList[0].num=res.data.data.length
                this.conditionList[0].num=num
                this.list=arr;
                this.allList=arr;
                this.qualList=res.data.data;
            })
        },
        /*业绩 start*/
        yjGoto(val){
            this.yjData.pageNo = val.cur
            this.yjAjax()
        },
        yjAjax(){
            let that=this;
            this.yjIsajax=false;
            this.yjList=[];
            this.$http({
                method:'post',
                url:"/gonglu/zhauncha/detail/company",
                data:this.yjData
            }).then(res => {
                this.yjList=res.data.data;
                this.yjTotal=res.data.total;
                this.yjIsajax=true;
            }).catch(req =>{
                that.yjList=null
                that.yjIsajax=true
            })
        },
        jumpYjDetail(id){//跳转到业绩详情
            let path=''
            if(this.$route.query.type=='zj'){
                path='/urban'
            }else if(this.$route.query.type=='gl'){
                path='/traffic'
            }else if(this.$route.query.type=='sl'){
                path='/irrigation'
            }
            let query={
                id: id
            }
            this.openNewLink(path,query)
        },
        /*业绩 end*/
        /** 人员   start**/
        ryGoto(val){
            this.ryData.pageNo = val.cur
            this.ryAjax()
        },
        ryAjax(){
            let that=this;
            this.ryIsajax=false;
            this.ryList=[];
            this.$http({
                method:'post',
                url:"/gonglu/zhauncha/detail/company",
                data:this.ryData
            }).then(res => {
                if(res.data.data.categorys){
                    that.ryConditionList=res.data.data.categorys;
                    that.ryConditionList.unshift({cate:'全部',count:this.basic.personCount});
                    let num=0
                    for(let x of res.data.data.categorys){
                        num+=x.count
                    }
                    that.ryConditionList[0].num=num;
                }
                that.ryList=res.data.data.persons.list;
                that.ryTotal=res.data.data.persons.total;
                that.ryIsajax=true
            }).catch(req =>{
                that.ryList=null
                that.ryIsajax=true
            })
        },
        ryTabFn(o,i){
            this.ryData.pageNo=1
            this.ryTabName=o.cate
            if(o.cate=='全部'){
                this.ryData.category=null
            }else{
                this.ryData.category=o.cate;
            }
            this.ryTotal=0;
            this.ryAjax();
        },
        jumpRyDetail(el){//跳转到人员详情
            let data= {
                certNo: el.certNo,
                comId: el.comId,
                comName: el.comName,
                idCard: el.idCard,
                sex: el.sex,
                tabCode: el.tabCode,
                name: el.name,
                innerid: el.innerid,
                sealNo:el.sealNo
            }
            sessionStorage.setItem('peopleData',JSON.stringify(data));
            this.openNewLink('/personnel')
        },
        /** 人员  end**/
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@color:#EB651B;
@borderColor:#DDDFE4;
@buleColor:#4494F0;
@bgColor:#f4f4f4;
.maxW-box{
    width: 1020px;
    margin: 0 auto;
}
.rydetail{
    background: #fff;
    min-height: calc(100vh - 80px);
    //基本信息
    .basic{
        margin-bottom: 40px;
        .title{
            display: flex;
            font-size: 34px;
            font-weight: bold;
            align-items: center;
            margin-bottom:20px;
            .iconfont{
                margin-right: 20px;
                font-size: 34px;
            }
        }
        .people-box{
            font-size: 18px;
            padding-left: 58px;
            span:first-child{
                margin-right: 162px;
            }
        }
    }
    //list
    .list{
        .tab{
            margin-bottom: 20px;
            ul{
                display: flex;
                font-size: 18px;
                align-items: center;
                position: relative;
                .current{
                    color: @color
                }
                li{
                    padding: 0 20px;
                    cursor: pointer;
                    position: relative;
                }
                li:after{
                    content: '';
                    position: absolute;
                    width: 1px;
                    height: 12px;
                    background: @borderColor;
                    transform: translateY(-50%);
                    top: 50%;
                    right: 0;
                }
                li:last-child::after{
                    width: 0;
                }
                li:first-child{
                    padding-left: 0;
                }
                span{
                    font-size: 14px;
                    position: absolute;
                    cursor: pointer;
                    right: 0;
                    color: @buleColor;
                }
                .iconchakan:before{
                    margin-right: 10px;
                }
            }
        }
        .list-box{
            font-size: 14px;
            .condition{
                min-height: 48px;
                padding-left: 30px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                border: 1px solid @borderColor;
                box-sizing: border-box;
                border-bottom: none;
                span{
                    display: inline-block;
                    height: 20px;
                    margin-right: 40px;
                    cursor: pointer;
                }
                .current{
                    color:  @color;
                    font-weight: bold;
                }
            }
            table{
                width: 100%;
                border-collapse: collapse;
                border-top: 1px solid @borderColor;
                thead{
                    background: @bgColor;
                    font-weight: bold;
                }
                td{
                    text-align: center;
                    line-height:48px;
                    border: 1px solid @borderColor;
                }
                .curpon{
                    cursor: pointer;
                    color:@buleColor
                }
                .cate{
                    div{
                        border-bottom: 1px solid @borderColor;
                    }
                    div:last-child{
                        border-bottom: none
                    }

                }
                .cate-key{
                    p{
                        border-bottom: 1px solid @borderColor;
                    }
                    p:last-child{
                        border-bottom: none
                    }
                }
            }
            .certificate li{
                display: flex;
                padding:0 43px 0 30px;
                align-items: center;
                justify-content: space-between;
                border: 1px solid @borderColor;
                .box{
                    width:100%;
                    height: 128px;
                    display: grid;
                    grid-template-columns: repeat(3,1fr);
                    grid-template-rows:repeat(3,1fr);
                    align-items:center;
                    div{
                        font-size: 14px;
                        span{
                            font-size: 14px;
                            font-weight: bold;
                            margin-right: 20px;
                        }
                    }
                    .company-people{
                        grid-column-start: 1;
                        grid-column-end: 4;
                    }
                }
                .num{
                    font-size:38px;
                }
            }
        }
    }
}
.el-pagination{
    text-align: center;
    margin-top: 28px;
}
</style>
