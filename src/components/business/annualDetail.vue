<!-- 模型： DOM 结构 -->
<template>
    <div class="annualDetail">
        <h5>{{data.comName}}{{data.year}}年度报告</h5>
        <!--  -->
        <div class="box">
            <h6>企业基本信息</h6>
            <table class="four">
                <tr>
                    <td class="bg">企业名称</td>
                    <td>{{data.comName}}</td>
                    <td class="bg">统一社会信用代码/注册号</td>
                    <td>
                        <template v-if="data.basic.uniscId">
                            {{data.basic.uniscId}}
                        </template>
                        <template v-else-if="data.basic.regNo">
                            {{data.basic.regNo}}
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="bg">企业联系电话</td>
                    <td>{{data.basic.tel}}</td>
                    <td class="bg">邮政编码</td>
                    <td>{{data.basic.postalCode}}</td>
                </tr>
                <tr>
                    <td class="bg">企业经营状态</td>
                    <td>{{data.basic.busSt}}</td>
                    <td class="bg">从业人数</td>
                    <td>{{data.basic.empNum}}</td>
                </tr>
                <tr>
                    <td class="bg">电子邮箱</td>
                    <td>{{data.basic.email}}</td>
                    <td class="bg">是否有网站或网店</td>
                    <td>
                        <template v-if="data.website&&data.website.length>0">
                            是
                        </template>
                        <template v-else>
                            否
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="bg">其中女性从业人数</td>
                    <td>{{data.basic.womemPNum}}</td>
                    <td class="bg">企业控股情况</td>
                    <td>{{data.basic.holdingSmsg}}</td>
                </tr>
                <tr>
                    <td class="bg">是否有对外提供担保信息</td>
                    <td>否</td>
                    <td class="bg">有限责任公司本年度是否发生股东股权转让</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td class="bg">企业通信地址</td>
                    <td>{{data.basic.addr}}</td>
                    <td class="bg">是否有投资信息或购买其他公司股权</td>
                    <td>
                        <template v-if="data.invest&&data.invest.length>0">
                            是
                        </template>
                        <template v-else>
                            否
                        </template>
                    </td>
                </tr>
                <tr>
                    <td class="bg">企业主营业务活动</td>
                    <td colspan="3" style="text-align: left;">{{data.basic.mainBusiAct}}</td>
                </tr>
            </table>
        </div>
        <!--  -->
        <div class="box"  v-if="data.website&&data.website.length>0">
            <h6>网站或网店信息</h6>
            <table class="three">
                <tr>
                    <td class="bg">类型</td>
                    <td class="bg">名称</td>
                    <td class="bg">网址</td>
                </tr>
                <tr v-for="(o,i) of data.website" :key="'wd'+i">
                    <td>{{o.webType}}
                        <!-- <template v-if="o.webType==1">
                            网站
                        </template>
                        <template v-else>
                            网店
                        </template> -->
                    </td>
                    <td>{{o.webSitName}}</td>
                    <td>
                        <template v-if="o.domain">
                            <span @click="jumpTo(o.domain)" class="urlCss">{{o.domain}}</span>
                        </template>
                        <template v-else>
                            &nbsp;
                        </template>
                    </td>
                </tr>
            </table>
        </div>
        <!--  -->
        <div class="box">
            <h6>股东及出资信息</h6>
            <table>
                <tr>
                    <td class="bg">序号</td>
                    <td class="bg">股东</td>
                    <td class="bg">认缴出资额</br>（万元）</td>
                    <td class="bg">认缴出资时间</td>
                    <td class="bg">认缴出资方式</td>
                    <td class="bg">实缴出资额</br>（万元）</td>
                    <td class="bg">实缴出资时间</td>
                    <td class="bg">实缴出资方式</td>
                </tr>
                <tr v-for="(o,i) of data.partner" :key="'gd'+i">
                    <td>{{i+1}}</td>
                    <td>{{o.invName}}</td>
                    <td>{{o.liSubConAm}}</td>
                    <td>
                        <template v-if="o.subConDate">
                            {{formatDate(o.subConDate)}}
                        </template>
                        <template v-else>
                            &nbsp;
                        </template>
                    </td>
                    <td>{{o.subConFormName}}</td>
                    <td>{{o.liAcConAm}}</td>
                    <td>
                        <template v-if="o.acConDate">
                            {{formatDate(o.acConDate)}}
                        </template>
                        <template v-else>
                            &nbsp;
                        </template></td>
                    <td>{{o.acConForm}}</td>
                </tr>
            </table>
        </div>
        <!--  -->
        <div class="box"  v-if="data.invest&&data.invest.length>0">
            <h6>对外投资信息</h6>
            <table class="three">
                <tr>
                    <td class="bg">序号</td>
                    <td class="bg">统一社会信用代码/注册号</td>
                    <td class="bg">对外投资企业名称</td>
                </tr>
                <tr v-for="(o,i) of data.invest" :key="'dw'+i">
                    <td>{{i+1}}</td>
                    <td>{{o.uniscId}}</td>
                    <td>{{o.entName}}</td>
                </tr>
            </table>
        </div>
        <!--  -->
        <div class="box">
            <h6>企业资产状况信息</h6>
            <table class="four">
                <tr>
                    <td class="bg">资产总额</td>
                    <td>企业选择不公示</td>
                    <td class="bg">所有者权益合计</td>
                    <td>企业选择不公示</td>
                </tr>
                <tr>
                    <td class="bg">营业总收入</td>
                    <td>企业选择不公示</td>
                    <td class="bg">利润总额</td>
                    <td>企业选择不公示</td>
                </tr>
                <tr>
                    <td class="bg">营业总收入中主营业务收入</td>
                    <td>企业选择不公示</td>
                    <td class="bg">净利润</td>
                    <td>企业选择不公示</td>
                </tr>
                <tr>
                    <td class="bg">纳税总额</td>
                    <td>企业选择不公示</td>
                    <td class="bg">负债总额</td>
                    <td>企业选择不公示</td>
                </tr>
            </table>
        </div>
        <!--  -->
        <div class="box">
            <h6>对外提供保证担保信息</h6>
            <table>
                <tr>
                    <td class="bg">序号</td>
                    <td class="bg">债权人</td>
                    <td class="bg">债务人</td>
                    <td class="bg">主债权种类</td>
                    <td class="bg">主债权数额</td>
                    <td class="bg">履行债务的期限</td>
                    <td class="bg">保证的期间</td>
                    <td class="bg">保证的方式</td>
                </tr>
                <tr>
                    <td colspan="8">暂无信息</td>
                </tr>
            </table>
        </div>
        <!--  -->
        <div class="box" v-if="data.socialSecurity&&data.socialSecurity.length>0">
            <h6>社保信息</h6>
            <table>
                <tr class="four">
                    <td class="bg">城镇职工基本养老保险</td>
                    <td colspan="2">{{data.socialSecurity[0].so110}}人</td>
                    <td class="bg" colspan="2">失业保险</td>
                    <td colspan="2">{{data.socialSecurity[0].so210}}人</td>
                </tr>
                <tr class="four">
                    <td class="bg">职工基本医疗保险</td>
                    <td colspan="2">{{data.socialSecurity[0].so310}}人</td>
                    <td class="bg" colspan="2">工伤保险</td>
                    <td colspan="2">{{data.socialSecurity[0].so410}}人</td>
                </tr>
                <tr class="four">
                    <td class="bg">生育保险</td>
                    <td colspan="2">{{data.socialSecurity[0].so510}}人</td>
                    <td class="bg" colspan="2">&nbsp;</td>
                    <td colspan="2">&nbsp;</td>
                </tr>
                <tr>
                    <td rowspan="4">单位缴费基数</td>
                    <td colspan="3">单位参加城镇职工基本养老保险缴费基数</td>
                    <td colspan="3">{{data.socialSecurity[0].totalWagesSo110}}</td>
                </tr>
                <tr>
                    <td colspan="3">单位参加失业保险缴费基数</td>
                    <td colspan="3">{{data.socialSecurity[0].totalWagesSo210}}</td>
                </tr>
                <tr>
                    <td colspan="3">单位参加职工基本医疗保险缴费基数</td>
                    <td colspan="3">{{data.socialSecurity[0].totalWagesSo310}}</td>
                </tr>
                <tr>
                    <td colspan="3">单位参加生育保险缴费基数</td>
                    <td colspan="3">{{data.socialSecurity[0].totalPaymentSo510}}</td>
                </tr>
                <tr>
                    <td rowspan="5">本期实际缴费基数</td>
                    <td colspan="3">参加城镇职工基本养老保险本期实际缴费基数</td>
                    <td colspan="3">{{data.socialSecurity[0].totalPaymentSo110}}</td>
                </tr>
                <tr>
                    <td colspan="3">参加失业保险本期实际缴费基数</td>
                    <td colspan="3">{{data.socialSecurity[0].totalPaymentSo210}}</td>
                </tr>
                <tr>
                    <td colspan="3">参加职工基本医疗保险本期实际缴费基数</td>
                    <td colspan="3">{{data.socialSecurity[0].totalPaymentSo310}}</td>
                </tr>
                <tr>
                    <td colspan="3">参加工伤保险本期实际缴费基数</td>
                    <td colspan="3">{{data.socialSecurity[0].totalPaymentSo410}}</td>
                </tr>
                <tr>
                    <td colspan="3">参加生育保险本期实际缴费基数</td>
                    <td colspan="3">{{data.socialSecurity[0].totalPaymentSo510}}</td>
                </tr>
                <tr>
                    <td rowspan="5">单位累计欠缴金额</td>
                    <td colspan="3">单位参加城镇职工基本养老保险累计欠缴金额</td>
                    <td colspan="3">{{data.socialSecurity[0].unpaidSocialInsSo110}}</td>
                </tr>
                <tr>
                    <td colspan="3">单位参加失业保险累计欠缴金额</td>
                    <td colspan="3">{{data.socialSecurity[0].unpaidSocialInsSo210}}</td>
                </tr>
                <tr>
                    <td colspan="3">单位参加职工基本医疗保险累计欠缴金额</td>
                    <td colspan="3">{{data.socialSecurity[0].unpaidSocialInsSo310}}</td>
                </tr>
                <tr>
                    <td colspan="3">单位参加工伤保险累计欠缴金额</td>
                    <td colspan="3">{{data.socialSecurity[0].unpaidSocialInsSo410}}</td>
                </tr>
                <tr>
                    <td colspan="3">单位参加生育保险累计欠缴金额</td>
                    <td colspan="3">{{data.socialSecurity[0].unpaidSocialInsSo510}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'annualDetail', // 结构名称
    data() {
        return {
            // 数据模型
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        data:{
            default:''
        }
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
        jumpTo(uri){
            if(uri.indexOf('http://')==-1){
                uri='http://'+uri;
            }
            window.open(uri,'_blank')
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
h5{
    text-align: center;
}
.box{
    width: 80%;
    margin: 0 auto;
    h6{
        padding: 15px 0;
        font-size: 14px;
    }
}
table{
    border-collapse: collapse;
    width: 100%;
    td{
        border: 1px solid #333;
        font-size: 14px;
        text-align: center;
        min-height: 50px;
    }
}
.four{
    td{
        width: 25%;
    }
}
.three{
    td{
        width: calc(100%/3);
    }
}
.urlCss{
    cursor: pointer;
    color: #EC7522;
}
// .first{
//     td{
//         width: 25%;
//     }
// }
</style>
