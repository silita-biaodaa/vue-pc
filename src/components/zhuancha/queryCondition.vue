<!-- 模型： DOM 结构 -->
<template>
    <div class="queryCondition">
        <!-- 查询条件 -->
        <div class="search-box">
            <div class="fs18 mb10">您的查询条件为：</div>
            <div class="search-content fs18" v-loading="loading">
                <el-row class="mb20" v-if="data.regisAddress&&data.regisAddress!=''">
                    <el-col :span="2.5" class="fw600">企业地区：</el-col>
                    <el-col :span="21">{{data.regisAddress}}</el-col>
                </el-row>
                <el-row class="mb20" v-if="data.regisAddress&&data.joinRegion&&data.regisAddress!=''">
                    <el-col :span="2.5" class="fw600">备案地区：</el-col>
                    <el-col :span="21">
                        {{data.joinRegion | joinRegion(data.regisAddress) }}
                    </el-col>
                </el-row>
                <el-row class="mb20" v-if="qualList.length>0">
                    <el-col :span="2.5" class="fw600">资质要求：</el-col>
                    <el-col :span="21">
                        <p v-for="(o,i) of qualList" :key="i">{{o.name}}</p>
                    </el-col>
                </el-row>
                <el-row class="mb20" v-if="qualList.length>1">
                    <el-col :span="2.5" class="fw600">资质关系：</el-col>
                    <el-col :span="21">
                        <template v-if="data.rangeType=='or'">满足任意一个</template>
                        <template v-else-if="data.rangeType=='and'">满足所有</template>
                    </el-col>
                </el-row>
                <el-row class="mb20" v-if="peopleList.length>0">
                    <el-col :span="2.5" class="fw600">人员要求：</el-col>
                    <el-col :span="21">
                        <p v-for="(o,i) of peopleList" :key="i">{{o.name}}</p>
                    </el-col>
                </el-row>
                <!-- 业绩 -->
                <el-row v-if="data.project&&JSON.stringify(data.project)!='{}'&&((data.project.keywords||data.project.opt!='title'||data.project.optType!='or')||
                data.project.proUse||data.project.proState||data.project.proCount||
                data.project.proBuild||data.project.childProject||
                data.project.proType||data.project.proWhere||
                (data.project.amountStart||data.project.amountEnd)||
                (data.project.completeStart||data.project.completeEnd)||
                (data.project.contractStart||data.project.contractEnd)||
                (data.project.areaStart||data.project.areaEnd))
                "
                 class="mb20"
                >
                    <el-col :span="2.5" class="fw600">业绩要求：</el-col>
                    <el-col :span="21">
                        <template v-if="$route.query.type=='zj'">
                            <v-zjyj :project="data.project"></v-zjyj>
                        </template>
                        <template v-else-if="$route.query.type=='gl'">
                            <v-glyj :project="data.project"></v-glyj>
                        </template>
                        <template v-else>
                            <v-slyj :project="data.project"></v-slyj>
                        </template>
                    </el-col>
                </el-row>
                <!-- 信用等级 -->
                <template v-if="$route.query.type!='zj'">
                    <el-row class="mb20" v-if="data.credit&&(data.credit.creditType||data.credit.province||data.credit.evaluateYear||data.credit.scoreStart||data.credit.scoreEnd||data.credit.levels)">
                        <el-col :span="2.5" class="fw600">信用等级：</el-col>
                        <el-col :span="21">
                            <template v-if="$route.query.type=='gl'">
                                <!-- 评价类型 -->
                                <div class="fx-box" v-if="data.credit.creditType">
                                    <div :span="1">评价类型：</div>
                                    <div>{{data.credit.creditType}}</div>
                                </div>
                                <!-- 评价省份 -->
                                <div class="fx-box" v-if="data.credit.province">
                                    <div :span="1">评价省份：</div>
                                    <div>{{data.credit.province}}</div>
                                </div>
                                <!-- 评价年份等级 -->
                                <div class="fx-box" v-if="data.credit.evaluateYear">
                                    <div :span="1">评价年份等级：</div>
                                    <div>{{data.credit.evaluateYear}}</div>
                                </div>
                                <!-- 等级评分-->
                                <div class="fx-box" v-if="data.credit.scoreStart||data.credit.scoreEnd">
                                    <div :span="1">等级评分：</div>
                                    <div>
                                        <template v-if="!data.credit.scoreStart||data.credit.scoreStart==''">小于{{data.credit.scoreEnd}}分</template>
                                        <template v-else-if="!data.credit.scoreEnd||data.credit.scoreEnd==''">大于{{data.credit.scoreStart}}分</template>
                                        <template>大于{{data.credit.scoreStart}}小于{{data.credit.scoreEnd}}分</template>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <!-- 申请类型 -->
                                <div class="fx-box" v-if="data.credit.creditType">
                                    <div :span="1">申请类型：</div>
                                    <div>{{data.credit.creditType}}</div>
                                </div>
                                <!-- 信用等级 -->
                                <div class="fx-box" v-if="data.credit.levels">
                                    <div :span="1">信用等级：</div>
                                    <div>{{data.credit.levels}}</div>
                                </div>
                            </template>
                        </el-col>
                    </el-row>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import zjyj from '@/components/zhuancha/zjyj'
import glyj from '@/components/zhuancha/glyj'
import slyj from '@/components/zhuancha/slyj'
export default {
    name: 'queryCondition', // 结构名称
    data() {
        return {
            // 数据模型a
            data:{},
            qualList:[],
            peopleList:[],
            loading: true
        }
    },
    watch: {
        // 监控集合
        data:{
            deep:true,
            handler(newV,oldV){
                if(newV.qualCode&&newV.qualCode!=''){
                    let arr=newV.qualCode.split(',');
                    let arr1=[];
                    for(let x of arr){
                        let data={
                            name:this.forQualName(x)
                        }
                        this.qualList.push(data)
                    }
                }
                if(newV.person&&newV.person.length>0){
                    for(let o of newV.person){
                        let data={}
                        if(o.data.length>1&&o.perType=='yes'){//一人多证
                            let arr=[]
                            for(let y of o.data){
                                arr.push(this.forPeopleName(y))
                            }
                            data.name=arr.join('+')+' - '+o.num
                        }else{
                            data.name=this.forPeopleName(o.data[0])+' - '+o.num
                        }
                        this.peopleList.push(data)
                    }
                }
            }
        }
    },
    filters:{
        joinRegion(bei,address){
            let addressList=JSON.parse(localStorage.getItem('filter')).area;
            let shortName=''
            for(let x of addressList){
                if(address==x.name){
                    shortName=x.shortName;
                    break
                }
            }
            if(bei=='in'){
                return shortName+'内企业'
            }else if(bei=='enter'){
                return '入'+shortName+'企业'
            }else{
                return '入'+shortName+'+'+shortName+'内企业'
            }
        }
    },
    props: {
        // 集成父级参数
        // pkid:{
        //     default:'',
        //     type:String
        // }
    },
    components:{
        'v-zjyj':zjyj,
        'v-glyj':glyj,
        'v-slyj':slyj,
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.$http({
            method:'post',
            url:'/gonglu/get/conditions',
            data:{
                pkid:this.$route.query.id
            }
        }).then(res =>{
            this.loading = false;
            this.data=res.data.data.condition
            this.$parent.total=res.data.data.condition.totals
            if(this.$route.query.type=='gl'){
                if(this.data.credit.evaluateYear){
                    console.log(this.data.credit.evaluateYear)
                }
            }
            
            // let data=this.data;
            // if(data.project&&((data.project.keywords||data.project.opt!='title'||data.project.optType!='or')||
            //     data.project.proUse||data.project.proState||
            //     data.project.proBuild||data.project.childProject||
            //     data.project.proType||data.project.proWhere||
            //     (data.project.amountStart||data.project.amountEnd)||
            //     (data.project.completeStart||data.project.completeEnd)||
            //     (data.project.contractStart||data.project.contractEnd)||
            //     (data.project.areaStart||data.project.areaEnd))
            //     ){
            //         // console.log(1)
            // }
            // totals
        })
    },
    methods: {
        // 方法 集合
        forQualName(arr){//从资质list内取name
            let qualList=JSON.parse(localStorage.getItem('filter')).comQua;
            let arr1=arr.split('/');
            let str=''
            for(let x of qualList){
                for(let y of x.data){
                    if(arr1[0]==y.code){
                        str=x.name+' - '+y.name;
                        if(arr1.length>1){
                            for(let z of y.data){
                                if(arr1[1]==z.code){
                                    str+=' - '+z.name;
                                    return str
                                }
                            }
                        }else{
                            return str
                        }
                    }
                }
            }
        },
        forPeopleName(arr){
            let peopleList=JSON.parse(localStorage.getItem('people'));
            let arr1=arr.split('/');
            let str=''
            for(let x of peopleList){
                for(let y of x.list){
                    if(arr1[0]==y.cateName){
                        str=x.cateName+' - '+y.cateName
                        if(arr1.length>1){
                            str+=' - '+arr1[1]
                            return str
                        }else{
                            return str
                        }
                    }
                }
            }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import "../../style/publicCSS";
.search-box{
    background: #fff;
    width: 1020px;
    box-sizing: border-box;
    margin:0 auto;
    font-size: 14px;
    .search-content {
        border: 1px solid @initColor;
        padding: 20px 20px 0;
        min-height: 70px;
    }
    h4{
        color: #333;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 17px;
        font-weight: normal;
        .return-go{
            color: #FE6603;
            font-size: 14px;
        }
    }
}
.fx-box{
    display: flex;
}
</style>
