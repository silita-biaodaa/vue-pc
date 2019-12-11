<!-- 模型： DOM 结构 -->
<template>
    <div class="queryDetail">
        <!-- 头 -->
		<v-head :headTxt="title"></v-head>
        <div class="nav-menu">首页 > {{title}}</div>
        <!-- 基本信息 -->
        <div class="basic maxW-box">
            <div class="title">
                <img src="../../assets/img/company.png"/>
                {{basic.comName}}
                <!-- <v-region :data="basic.joinRegion"></v-region> -->
            </div>
            <div class="basic-box">
                <div>
                    <p class="bg">统一社会信用代码</p>
                    <p>{{basic.creditCode}}</p>
                </div>
                <div>
                    <p class="bg">企业法定代表人</p>
                    <p>{{basic.legalPerson}}</p>
                </div>
                <div>
                    <p class="bg">电话</p>
                    <p>{{basic.phone}}</p>
                </div>
                <div>
                    <p class="bg">企业经营地址</p>
                    <p>{{basic.comAddress}}</p>
                </div>
            </div>
        </div>
        <!--列表-->
        <div class="list maxW-box">
            <div class="tab">
                <template>
                    <ul>
                        <span @click="jumpCompanyAll">查看企业完整信息</span>
                        <li v-for="(o,i) of tabList" :key="i" :class="tabNum==o.name?'current':''" @click="tabFn(o,i)" v-if="o.num>0">{{o.name}}({{o.num}})</li>
                    </ul>
                </template>
            </div>
            <div class="list-box">
                <!-- 资质 -->
                <template v-if="tabNum=='企业资质'">
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
                <template v-else-if="tabNum=='符合要求人员'">
                    <div class="condition">
                        <span v-for="(o,i) of ryConditionList" :key="i" :class="ryTabName==o.cate?'current':''" @click="ryTabFn(o,i)"  v-if="o.count>0">{{o.cate}}({{o.count}})</span>
                    </div>
                    <!-- 加载中 -->
                    <template v-if="ryIsajax">
                        <template v-if="ryList&&ryList.length>0">
                            <table>
                                <thead>
                                    <td>序号</td>
                                    <td>姓名</td>
                                    <td>身份证号</td>
                                    <td>证书数量</td>
                                    <td>注册类别</td>
                                    <td>注册专业</td>
                                </thead>
                                <tbody>
                                    <tr v-for="(o,i) of ryList" :key="i">
                                        <td>{{(ryData.pageNo-1)*20+i+1}}</td>
                                        <td class="curpon" @click="jumpRyDetail(o)">{{o.name}}</td>
                                        <td>{{o.idCard}}</td>
                                        <td>{{o.num}}</td>
                                        <td class="cate">
                                            <p v-for="(x,y) of o.categorys" :key="y" :style="{lineHeight:(x.cateList.length==0?1:x.cateList.length)*48+'px'}">{{x.cateKey}}</p>
                                        </td>
                                        <td class="cate-key">
                                            <div v-for="(x,y) of o.categorys" :key="y">
                                                <template v-if="x.cateList.length>0">
                                                    <p v-for="(a,b) of x.cateList" :key="b">{{a}}</p>
                                                </template>
                                                <template v-else>
                                                    <p>&nbsp;</p>
                                                </template>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <v-page :all='ryTotal' :currents='ryData.pageNo' :pageSize='ryData.pageSize' @skip='ryGoto'></v-page>
                        </template>
                        <!-- 无数据  -->
                        <template v-else-if="ryList&&ryList.length==0">
                            <div class="no-toast">
                                <img src="../../assets/img/bank_card @2x.png" alt="">
                                <span>Sorry，没有找到符合条件的项目信息</span>
                            </div>
                        </template>
                        <!-- 加载失败 -->
                        <template v-else-if="!ryList">
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
                                    <!-- <td>序号</td>
                                    <td>项目名称</td>
                                    <td>业绩类型</td>
                                    <td>中标金额/合同金额（万元）</td>
                                    <td>竣工时间</td> -->
                                </thead>
                                <tbody>
                                    <tr v-for="(o,i) of yjList" :key="i">
                                        <td>{{(yjData.pageNo-1)*20+i+1}}</td>
                                        <td class="curpon tdpading" @click="jumpYjDetail(o.proId)">{{o.proName}}</td>
                                        <td>{{o.type}}</td>
                                        <td>{{o.amount}}</td>
                                        <td>{{o.buildEnd?formatDate(o.buildEnd):''}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <v-page :all='yjTotal' :currents='yjData.pageNo' :pageSize='yjData.pageSize' @skip='yjGoto'></v-page>
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
                <!-- 信用等级 -->
                <template v-else>
                    <!-- 加载中 -->
                    <template v-if="xyIsajax">
                        <template v-if="xyList&&xyList.length>0">
                            <table ref="yj">
                                <thead>
                                    <td style="width:32px">序号</td>
                                    <td>评价类型</td>
                                    <td>评价年度</td>
                                    <td>信用等级</td>
                                    <template v-if="$route.query.type=='sl'">
                                        <td>颁发日期</td>
                                        <td>有效期至</td>
                                    </template>
                                    <template v-else-if="$route.query.type=='gl'">
                                        <td>评价省份</td>
                                    </template>
                                </thead>
                                <tbody>
                                    <tr v-for="(o,i) of xyList" :key="i">
                                        <td>{{(xyData.pageNo-1)*20+i+1}}</td>
                                        <td>{{o.creditType}}</td>
                                        <td>{{o.years}}</td>
                                        <td>{{o.level}}</td>
                                        <template v-if="$route.query.type=='sl'">
                                            <td>{{o.issued}}</td>
                                            <td>{{o.valied}}</td>
                                        </template>
                                        <template v-else-if="$route.query.type=='gl'">
                                            <td>{{o.issueProvince}}</td>
                                        </template>
                                    </tr>
                                </tbody>
                            </table>
                            <v-page :all='xyTotal' :currents='xyData.pageNo' :pageSize='xyData.pageSize' @skip='xyGoto'></v-page>
                        </template>
                        <!-- 无数据  -->
                        <template v-else-if="xyList&&xyList.length==0">
                            <div class="no-toast">
                                <img src="../../assets/img/bank_card @2x.png" alt="">
                                <span>Sorry，没有找到符合条件的信用等级</span>
                            </div>
                        </template>
                        <!-- 加载失败 -->
                        <template v-else-if="!xyList">
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
import paging from '@/components/paging'
import heads from '@/components/head3'
import joinRegion from '@/components/zhuancha/joinRegion'
export default {
    name: 'queryDetail', // 结构名称
    data() {
        return {
            // 数据模型a
            loading:true,
            tabList:[
                {
                    name:'企业资质',
                    num:0
                },{
                    name:'符合要求人员',
                    num:0
                },{
                    name:'符合要求项目',
                    num:0
                },{
                    name:'信用等级',
                    num:0
                }
            ],
            tabNum:'企业资质',
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
            xyData:{
                pageNo:1,
                pageSize:20,
                type:'credit'
            },
            xyList:[],
            xyIsajax:false,
            xyTotal:0,
            data:{}

        }
    },
    inject: ['reload'],
    watch: {
        // 监控集合
    },
    components:{
        'v-page':paging,
        'v-head': heads,
        'v-region':joinRegion
    },
    computed:{
        title(){
            if(this.$route.query.type=='zj'){
                return '住建信息综合查询'
            }else if(this.$route.query.type=='gl'){
                return '公路信息综合查询'
            }else if(this.$route.query.type=='sl'){
                return '水利信息综合查询'
            }
        }
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
                this.tabList[3].num=res.data.data.creditCount;
                this.xyTotal=res.data.data.creditCount;
                if(this.tabList[0].num>0){
                    this.tabNum='企业资质'
                    this.zzAjax(data);
                }else if(this.tabList[1].num>0){
                    this.tabNum='符合要求人员'
                    this.ryData.orderNo=this.$route.query.n;
                    this.ryData.comId=this.$route.query.id;
                    this.ryAjax();
                }else if(this.tabList[2].num>0){
                    this.tabNum='符合要求项目'
                    this.yjData.orderNo=this.$route.query.n;
                    this.yjData.comId=this.$route.query.id;
                    this.yjAjax();
                }else{
                    this.tabNum='信用等级'
                    this.xyData.orderNo=this.$route.query.n;
                    this.xyData.comId=this.$route.query.id;
                    this.xyAjax();
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
        jumpCompanyAll(){//跳到企业完整信息
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
            if(o.name=='企业资质'){
                this.zzAjax(data);
            }else if(o.name=='符合要求人员'){
                this.ryData.orderNo=this.$route.query.n;
                this.ryData.comId=this.$route.query.id;
                this.ryAjax();
            }else if(o.name=='符合要求项目'){
                this.yjData.orderNo=this.$route.query.n;
                this.yjData.comId=this.$route.query.id;
                this.yjAjax();
            }else{
                this.xyData.orderNo=this.$route.query.n;
                this.xyData.comId=this.$route.query.id;
                this.xyAjax();
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
                // this.tabList[0].num=res.data.data.num
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
        /**信用等级**/ 
        xyAjax(){
            let that=this;
            this.xyIsajax=false;
            this.xyList=[];
            this.$http({
                method:'post',
                url:"/gonglu/zhauncha/detail/company",
                data:this.xyData
            }).then(res => {
                that.xyIsajax=true
                that.xyList=res.data.data;
                console.log(res)
            }).catch(req =>{
                that.xyList=null
                that.xyIsajax=true
            })
        },
        xyGoto(val){
            this.xyData.pageNo = val.cur
            this.xyAjax()
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import '../../style/query.less';
.curpon{
    cursor: pointer;
    color: @color
}
.tdpading{
    padding: 10px 20px;
}
.cate{
    p{
        border-bottom: 1px solid #f2f2f2
    }
    p:last-child{
        border-bottom: none
    }
}
.cate-key{
    div{
        border-bottom: 1px solid #f2f2f2
    }
    div:last-child{
        border-bottom: none
    }
}
</style>
