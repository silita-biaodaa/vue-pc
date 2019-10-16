<!-- 模型： DOM 结构 -->
<template>
    <div class="prizeDetail">
        <h5>{{data.projName}}</h5>
        <div class="box">
            <div class="item">
                <span>奖项名称：</span>
                {{data.awardName}}
            </div>
            <div class="item">
                <span>工程名称：</span>
                {{data.projName}}
            </div>
            <div class="item" v-if="data.projType">
                <span>项目类型：</span>
                {{data.projType}}
            </div>
            <div class="item" v-if="data.acreage">
                <span>建筑面积（㎡）：</span>
                {{data.acreage}}
            </div>
            <div class="item" v-if="data.unitOrg&&data.unitOrg.length>0">
                <span>单位名称：</span>
                <p>
                    <span :class="[o.comId?'a':'']" v-for="(o,i) of data.unitOrg" :key="'1'+i" @click="jumpCompany(o)">{{o.comName}}</span>
                </p>
            </div>
            <div class="item" v-if="data.projManager">
                <span>项目经理：</span>
                {{data.projManager}}
            </div>
            <div class="item" v-if="data.skillManager">
                <span>技术负责人：</span>
                {{data.skillManager}}
            </div>
            <div class="item" v-if="data.qualityManager">
                <span>质量负责人：</span>
                {{data.qualityManager}}
            </div>
            <div class="item" v-if="data.techQualManage">
                <span>技术质量负责人：</span>
                {{data.techQualManage}}
            </div>
            <div class="item" v-if="data.buildOrg&&data.buildOrg.length>0">
                <span>建设单位：</span>
                <p>
                    <span :class="[o.comId?'a':'']" v-for="(o,i) of data.buildOrg" :key="'2'+i" @click="jumpCompany(o)">{{o.comName}}</span>
                </p>
            </div>
            <div class="item" v-if="data.superOrg&&data.superOrg.length>0">
                <span>监理单位：</span>
                <p>
                    <span :class="[o.comId?'a':'']" v-for="(o,i) of data.superOrg" :key="'3'+i" @click="jumpCompany(o)">{{o.comName}}</span>
                </p>
            </div>
            <div class="item" v-if="data.superPerson">
                <span>总监理工程师：</span>
                {{data.superPerson}}
            </div>
            <div class="item" v-if="data.exploreOrg&&data.exploreOrg.length>0">
                <span>勘察单位：</span>
                <p>
                    <span :class="[o.comId?'a':'']" v-for="(o,i) of data.exploreOrg" :key="'4'+i" @click="jumpCompany(o)">{{o.comName}}</span>
                </p>
            </div>
            <div class="item" v-if="data.designOrg&&data.designOrg.length>0">
                <span>设计单位：</span>
                <p>
                    <span :class="[o.comId?'a':'']" v-for="(o,i) of data.designOrg" :key="'5'+i" @click="jumpCompany(o)">{{o.comName}}</span>
                </p>
            </div>
            <div class="item" v-if="data.checkOrg&&data.checkOrg.length>0">
                <span>监督单位：</span>
                <p>
                    <span :class="[o.comId?'a':'']" v-for="(o,i) of data.checkOrg" :key="'6'+i" @click="jumpCompany(o)">{{o.comName}}</span>
                </p>
            </div>
            <div class="item" v-if="data.joinOrg&&data.joinOrg.length>0">
                <span>参建单位：</span>
                <p>
                    <span :class="[o.comId?'a':'']" v-for="(o,i) of data.joinOrg" :key="'7'+i" @click="jumpCompany(o)">{{o.comName}}</span>
                </p>
                
            </div>
            <div class="item" v-if="data.remark">
                <span>备注：</span>
                {{data.remark}}
            </div>
            <div class="item" v-if="data.pubOrg">
                <span>发布单位：</span>
                {{data.pubOrg}}
            </div>
            <div class="item">
                <span>发布日期：</span>
                {{data.issued}}
            </div>
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
            if(o.comId){
                const { href}= this.$router.resolve({
                    path: '/introduce/icbc',
                    query: {
                        id: o.comId,
                        name: o.comName,
                    }
                })
                window.open(href, '_blank')
            }else{
                return false
                // let that = this;
                // this.$http({
                //     method: 'post',
                //     url: 'company/detail',
                //     data: {
                //         comName: o.comName
                //     }
                // }).then(res => {
                //     if (res.data.code == 1) {
                //         let id = res.data.data.comId;
                //         const {
                //             href
                //         } = that.$router.resolve({
                //             path: '/introduce/icbc',
                //             query: {
                //                 id: id,
                //                 name: name,
                //             }
                //         })
                //         window.open(href, '_blank')
                //     } else {
                //         that.$alert(res.data.msg)
                //     }
                // }).catch(err => {
                //     that.$alert('网络链接不稳定，请重新点击');
                //     that.tapName = false;
                // })
            }
            
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
h5{
    font-size: 24px;
    color: #333;
    max-width: 80%;
    margin: 0 auto;
    text-align: center;
    // padding: 30px 0;
    padding-bottom: 30px;
}
.box{
    width: 80%;
    margin: 0 auto;
    border-top: 1px solid #f2f2f2;
    .item{
        min-height: 50px;
        line-height: 30px;
        color: #333;
        display: flex;
        // flex-wrap: wrap;
        align-items: center;
        font-size: 14px;
        border-bottom: 1px solid #f2f2f2;
        span{
            min-width: 70px;
        }
        .a{
            cursor: pointer;
            display: inline-block;
            color: #EC7522;
            margin-right: 10px;
            min-width: fit-content;
        }
    }
}
</style>
