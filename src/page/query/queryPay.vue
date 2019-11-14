<!-- 模型： DOM 结构 -->
<template>
    <div class="queryPay">
        <!-- 头 -->
		<v-head></v-head>
        <div class="maxW">
            <div class="top-box">
                <h2>公路信息专查</h2>
                <div class="total-box">共为您找到符合要求企业111家</div>
            </div>
            <v-query :ispay="true"></v-query>
            <div class="price-box">
                <p>本次为付费查询，限时折扣价<span class="color-font">￥50</span>，会员享受专享价：<span class="color-font">¥20</span></p>
                <button class="openVip">开通会员</button>
            </div>
            <div class="pay-box">
                <img src="../../assets/img/accounts.png"/>
                <p class="wxpay">
                    <img src="../../assets/img/icon-weixin.png"/>
                    微信支付
                </p>
                <p style="margin-bottom:34px">支付成功，点击查看详情 ></p>
                <div class="tip">注：同一用户24小时内查询同一条件无需再次支付,不小心关闭可在我的订单中再次打开查看</div>
            </div>
        </div>
    </div>
</template>
<script>
import heads from '@/components/head3'
import queryCondition from '@/components/zhuancha/queryCondition'
export default {
    name: 'queryPay', // 结构名称
    data() {
        return {
            // 数据模型a
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
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
    }
}
.pay-box{
    width: 1020px;
    margin: 0 auto 108px;
    box-sizing: border-box;
    padding:36px 16px 64px;
    background: #fff;
    text-align: center;
    p{
        text-align: center;
        font-size: 14px;
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
}

.color-font{
    color:@color;
}
</style>
