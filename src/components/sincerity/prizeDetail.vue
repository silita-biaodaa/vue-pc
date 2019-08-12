<!-- 模型： DOM 结构 -->
<template>
    <div class="prizeDetail">
        <h5>{{data.projName}}</h5>
        <div class="box">
            <p>
                <span>奖项名称：</span>
                {{data.awardName}}
            </p>
            <p>
                <span>工程名称：</span>
                {{data.projName}}
            </p>
            <p v-if="data.projType">
                <span>项目类型：</span>
                {{data.projType}}
            </p>
            <p v-if="data.acreage">
                <span>建筑面积（㎡）：</span>
                {{data.acreage}}
            </p>
            <p v-if="data.unitOrg&&data.unitOrg.length>0" :style="{'line-height':data.unitOrg.length>3?'30px':''}">
                <span>单位名称：</span>
                <span class="a" v-for="(o,i) of data.unitOrg" :key="'1'+i" @click="jumpCompany(o)">{{o.comName}}</span>
            </p>
            <p v-if="data.projManager">
                <span>项目经理：</span>
                {{data.projManager}}
            </p>
            <p v-if="data.skillManager">
                <span>技术负责人：</span>
                {{data.skillManager}}
            </p>
            <p v-if="data.qualityManager">
                <span>质量负责人：</span>
                {{data.qualityManager}}
            </p>
            <p v-if="data.techQualManage">
                <span>技术质量负责人：</span>
                {{data.techQualManage}}
            </p>
            <p v-if="data.buildOrg&&data.buildOrg.length>0" :style="{'line-height':data.buildOrg.length>3?'30px':''}">
                <span>建设单位：</span>
                <span class="a" v-for="(o,i) of data.buildOrg" :key="'2'+i" @click="jumpCompany(o)">{{o.comName}}</span>
            </p>
            <p v-if="data.superOrg&&data.superOrg.length>0" :style="{'line-height':data.superOrg.length>3?'30px':''}">
                <span>监理单位：</span>
                <span class="a" v-for="(o,i) of data.superOrg" :key="'3'+i" @click="jumpCompany(o)">{{o.comName}}</span>
            </p>
            <p v-if="data.superPerson">
                <span>总监理工程师：</span>
                {{data.superPerson}}
            </p>
            <p v-if="data.exploreOrg&&data.exploreOrg.length>0" :style="{'line-height':data.exploreOrg.length>3?'30px':''}">
                <span>勘察单位：</span>
                <span class="a" v-for="(o,i) of data.exploreOrg" :key="'4'+i" @click="jumpCompany(o)">{{o.comName}}</span>
            </p>
            <p v-if="data.designOrg&&data.designOrg.length>0" :style="{'line-height':data.designOrg.length>3?'30px':''}">
                <span>设计单位：</span>
                <span class="a" v-for="(o,i) of data.designOrg" :key="'5'+i" @click="jumpCompany(o)">{{o.comName}}</span>
            </p>
            <p v-if="data.checkOrg&&data.checkOrg.length>0" :style="{'line-height':data.checkOrg.length>3?'30px':''}">
                <span>监督单位：</span>
                <span class="a" v-for="(o,i) of data.checkOrg" :key="'6'+i" @click="jumpCompany(o)">{{o.comName}}</span>
            </p>
            <p v-if="data.joinOrg&&data.joinOrg.length>0" :style="{'line-height':data.joinOrg.length>3?'30px':''}">
                <span>参建单位：</span>
                <span class="a" v-for="(o,i) of data.joinOrg" :key="'7'+i" @click="jumpCompany(o)">{{o.comName}}</span>
            </p>
            <p v-if="data.remark">
                <span>备注：</span>
                {{data.remark}}
            </p>
            <p v-if="data.pubOrg">
                <span>发布单位：</span>
                {{data.pubOrg}}
            </p>
            <p>
                <span>发布日期：</span>
                {{data.issued}}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'prizeDetail', // 基本信息
    data() {
        return {
            // 数据模型
            // list:[],
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        data:{
            default:''
        },
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
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
        jumpCompany(o){
            const { href}= this.$router.resolve({
                path: '/introduce/icbc',
                query: {
                    id: o.comId,
                    name: o.comName,
                }
            })
            window.open(href, '_blank')
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
h5{
    font-size: 24px;
    color: #333;
    text-align: center;
    // padding: 30px 0;
    padding-bottom: 30px;
}
.box{
    width: 80%;
    margin: 0 auto;
    border-top: 1px solid #f2f2f2;
    p{
        min-height: 50px;
        line-height: 50px;
        color: #333;
        font-size: 14px;
        border-bottom: 1px solid #f2f2f2;
        .a{
            cursor: pointer;
            display: inline-block;
            color: #EC7522;
            margin-right: 10px
        }
    }
}
</style>
