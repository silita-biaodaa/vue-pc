<!-- 模型： DOM 结构 -->
<template>
    <div class="queryPay">
        <!-- 头 -->
		<v-head></v-head>
        <div class="maxW">
            <div class="top-box">
                <h2>{{title}}信息专查</h2>
                <div class="total-box">共为您找到符合要求企业{{total}}家</div>
            </div>
            <v-query :pkid="$route.query.id"></v-query>
            <div class="price-box">
                <p>本次为付费查询，限时折扣价<span class="color-font">￥{{comPrice}}</span>，会员享受专享价：<span class="color-font">¥{{vipPrice}}</span></p>
                <button class="openVip" v-if="!isVip" @click="jumpVip">开通会员</button>
            </div>
            <div class="pay-box">
                <div class="puy-img" id="qrcode" v-loading='isload' element-loading-text="二维码生成中"></div>
                <p class="wxpay">
                    <img src="../../assets/img/icon-weixin.png"/>
                    微信支付
                </p>
                <p class="goDetail" v-if="payed" @click="jumpList">支付成功，点击查看详情 ></p>
                <div class="tip">注：同一用户24小时内查询同一条件无需再次支付,不小心关闭可在我的订单中再次打开查看</div>
            </div>
        </div>
    </div>
</template>
<script>
import heads from '@/components/head3'
import queryCondition from '@/components/zhuancha/queryCondition'
import QRCode from 'qrcodejs2'
import { setTimeout, clearTimeout } from 'timers';
export default {
    name: 'queryPay', // 结构名称
    data() {
        return {
            // 数据模型a
            isload:true,
            orderNo:null,
            payed:false,//是否已支付
            vipPrice:0,
            comPrice:0,
            isVip:false,
            total:0
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    computed:{
        title(){
            if(this.$route.query.type=='zj'){
                return '住建'
            }else if(this.$route.query.type=='gl'){
                return '公路'
            }else if(this.$route.query.type=='sl'){
                return '水利'
            }
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let channel='special_query_';
        let str=''
        let that=this;
        if(localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='true'){
            this.isVip=true;
            str='vip'
        }else{
            this.isVip=false;
            str='com'
        }
        channel=channel+str+'_'+this.$route.query.type
        //获取价格
        this.$http({
            method:'post',
            url:'/vip/getFeeStandard',
            data:{
                channel:channel
            }
        }).then(res =>{
            if(res.data.code==1){
                let stdCode=''
                if(localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='true'){
                    stdCode=res.data.data.vipStdCode
                }else{
                    stdCode=res.data.data.comStdCode
                }
                that.vipPrice=res.data.data.vipPrice;
                that.comPrice=res.data.data.comPrice;
                that.$http({
                    method:'post',
                    url:'/wxPay/report/unifiedOrder',
                    data:{
                        channel:channel,
                        userId:sessionStorage.getItem('ip'),
                        stdCode:stdCode,
                        ip:localStorage.getItem('uip'),
                        tradeType:'NATIVE',
                        pkid:that.$route.query.id
                    }
                }).then(r =>{
                    that.isload=false;
                    that.orderNo=r.data.orderNo;
                    let code = new QRCode("qrcode", {
                        text: r.data.data.codeUrl,
                        width: 180,
                        height: 180,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                    });
                    that.getOrderNo()
                })
            }else{
                this.$alert(res.data.msg)
            }
            
        })
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
        clearTimeout(that.t);
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        getOrderNo(){
            let that=this
            this.$http({
                method:'post',
                url:'/wxPay/queryOrderStatus',
                data:{
                    orderNo:this.orderNo,
                    type:'report'
                }
            }).then(res =>{
                let state=res.data.trade_state;
                if(state=='SUCCESS'){
                    that.payed=true;
                    clearTimeout(that.t);
                }else{
                    that.t=setTimeout(that.getOrderNo,1000)
                }
            })
        },
        jumpList(){
            this.$router.replace({
                path: '/queryList',
                query:{
                    type:this.$route.query.type,
                    n:this.orderNo,
                    id:this.$route.query.id
                }
            })
        },
        jumpVip(){
            this.$router.replace({
                path:'/buy'
            })
        }
    },
    components:{
        'v-head': heads,
        'v-query':queryCondition
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import '../../style/query.less';
.maxW{
    margin-top: 12px;
}
.top-box{
    width: 1020px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px 16px;
    background: #fff;
    border-bottom: 1px solid #f2f2f2;
    h2{
        text-align: center;
        font-size: 20px;
        color: #333;
        margin-bottom: 32px;
        font-weight: normal;
    }
    .total-box{
        color: #333;
        font-size: 14px
    }
}
.price-box{
    width: 1020px;
    margin: 0 auto;
    box-sizing: border-box;
    padding:0 16px;
    height: 64px;
    background: #fff;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    .openVip{
        width: 80px;
        line-height: 28px;
        text-align: center;
        border: 1px solid @color;
        color: @color;
        border-radius: 6px;
        background: #fff;
        cursor: pointer;
    }
}
.pay-box{
    width: 1020px;
    margin: 0 auto 108px;
    box-sizing: border-box;
    padding:36px 16px 64px;
    background: #fff;
    text-align: center;
    .goDetail{
        text-align: center;
        font-size: 14px;
        margin-bottom:34px;
        cursor: pointer;
    }
    .wxpay{
        display: flex;
        align-items: center;
        justify-content: center;
        color: @color;
        font-size: 12px;
        margin: 12px 0 32px;
        img{
            margin-right: 12px;
        }
    }
    .tip{
        font-size: 12px;
        color: #999;
        text-align: left
    }
    #qrcode{
        height: 180px;
        width: 180px;
        margin: 0 auto;
    }
}

.color-font{
    color:@color;
}
</style>
