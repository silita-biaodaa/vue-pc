<!-- 模型： DOM 结构 -->
<template>
    <div class="payPage bg-fff">
        <!-- 头 -->
        <v-head></v-head>
        <div class="payPage_body">
            <div>
                <v-publicBread :breadList="breadList"></v-publicBread>
                <div class="fs34 mb40">
                    <i class="iconfont iconzonghechaxun mr20 fs34"></i>
                    <span class="fw600">重庆定制版综合查询-企业综合查询</span>
                </div>
                <!-- <div class="top-box">
                    <h2>{{title}}信息专查</h2>
                    <div class="total-box">共为您找到符合要求企业{{total}}家</div>
                </div>-->
                <!-- <v-query></v-query> -->
                <v-result :payPage="payPage"></v-result>
                <!-- <div class="price-box">
                    <p>
                        本次为付费查询，限时折扣价
                        <span class="color-font">￥{{comPrice}}</span>，会员享受专享价：
                        <span class="color-font">¥{{vipPrice}}</span>
                    </p>
                    <button class="openVip" v-if="!isVip" @click="jumpVip">开通会员</button>
                </div>-->
                <div class="price-box mt40 fs18">
                    <div class="drc">
                        <i class="iconfont iconwancheng color-eb6"></i>
                        <div class="ml10">
                            共为您找到
                            <span class="fs28 color-eb6 fw600 ml10 mr10">12123名</span>符合要求的人员
                        </div>
                    </div>
                    <div class="drc openVip">
                        <div>
                            本次为付费查询，限时折扣价¥8 / 会员专享价
                            <span class="color-eb6">¥1元</span>
                        </div>
                        <button class="fs18 cp">开通会员</button>
                    </div>
                    <div class="mb40">
                        <span>本次支付金额：</span>
                        <span class="color-eb6">¥8</span>
                        <span>微信扫码支付成功后即可查看详情</span>
                    </div>
                </div>
                <div class="pay-box">
                    <div
                        class="puy-img"
                        id="qrcode"
                        v-loading="isload"
                        element-loading-text="二维码生成中"
                    ></div>
                    <div class="wxpay text-c fs18">已支付</div>
                    <!-- <p class="wxpay">
                        <img src="../../assets/img/icon-weixin.png" />
                        微信支付
                    </p>-->
                    <p class="goDetail" @click="jumpList">支付成功，点击查看详情 ></p>
                    <div class="fs18 color-5a5">
                        注：同一用户24小时内查询同一条件无需再次支付，不小心关闭结果可在
                        <span class="color-449 cp">我的订单</span>中再次打开查看
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import heads from "@/components/head3";
import queryCondition from "@/components/zhuancha/queryCondition";
import publicBread from "@/components/customize/publicBread";
import resultsList from "@/components/customize/resultsList";
import QRCode from "qrcodejs2";
import { setTimeout, clearTimeout } from "timers";
export default {
    components: {
        "v-head": heads,
        "v-query": queryCondition,
        "v-publicBread": publicBread,
        "v-result": resultsList
    },
    name: "queryPay", // 结构名称
    data() {
        return {
            breadList: [
                { title: "重庆定制版综合查询" },
                { title: "查询结果" },
                { title: "支付" }
            ],
            // 数据模型a
            isload: true,
            orderNo: null,
            payed: false, //是否已支付
            vipPrice: 0,
            comPrice: 0,
            isVip: false,
            total: 0,
            payPage: true //是否从支付页面
        };
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    computed: {
        title() {
            if (this.$route.query.type == "zj") {
                return "住建";
            } else if (this.$route.query.type == "gl") {
                return "公路";
            } else if (this.$route.query.type == "sl") {
                return "水利";
            }
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let channel = "special_query_";
        let str = "";
        let that = this;
        if (
            localStorage.getItem("0658544ac523fca9ec78a5f607fdd7ee") == "true"
        ) {
            this.isVip = true;
            str = "vip";
        } else {
            this.isVip = false;
            str = "com";
        }
        channel = channel + str + "_" + this.$route.query.type;
        //获取价格
        this.$http({
            method: "post",
            url: "/vip/getFeeStandard",
            data: {
                channel: channel
            }
        }).then(res => {
            if (res.data.code == 1) {
                let stdCode = "";
                if (
                    localStorage.getItem("0658544ac523fca9ec78a5f607fdd7ee") ==
                    "true"
                ) {
                    stdCode = res.data.data.vipStdCode;
                } else {
                    stdCode = res.data.data.comStdCode;
                }
                that.vipPrice = res.data.data.vipPrice;
                that.comPrice = res.data.data.comPrice;
                that.$http({
                    method: "post",
                    url: "/wxPay/report/unifiedOrder",
                    data: {
                        channel: "1003",
                        userId: sessionStorage.getItem("ip"),
                        stdCode: stdCode,
                        ip: localStorage.getItem("uip"),
                        tradeType: "NATIVE",
                        pkid: that.$route.query.id * 1,
                        zhuanchaType: "zhuancha"
                    }
                }).then(r => {
                    that.isload = false;
                    that.orderNo = r.data.orderNo;
                    let code = new QRCode("qrcode", {
                        text: r.data.data.codeUrl,
                        width: 180,
                        height: 180,
                        colorDark: "#000000",
                        colorLight: "#ffffff"
                    });
                    that.getOrderNo();
                });
            } else {
                this.$alert(res.data.msg);
            }
        });
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
        let that = this;
        clearTimeout(that.t);
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        getOrderNo() {
            let that = this;
            this.$http({
                method: "post",
                url: "/wxPay/queryOrderStatus",
                data: {
                    orderNo: this.orderNo,
                    type: "report",
                    pkid: that.$route.query.id * 1,
                    zhuanchaType: "zhuancha"
                }
            }).then(res => {
                let state = res.data.trade_state;
                if (state == "SUCCESS") {
                    that.payed = true;
                    clearTimeout(that.t);
                } else {
                    that.t = setTimeout(that.getOrderNo, 1000);
                }
            });
        },
        jumpList() {
            this.$router.replace({
                path: "/queryList",
                query: {
                    type: this.$route.query.type,
                    n: this.orderNo,
                    id: this.$route.query.id
                }
            });
        },
        jumpVip() {
            this.$router.replace({
                path: "/buy"
            });
        }
    }
};
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import "../../style/query.less";
@import "../../style/publicCSS";
.payPage {
    .payPage_body {
        width: 1020px;
        margin: 0 auto;
        .top-box {
            margin: 0 auto;
            box-sizing: border-box;
            padding: 20px 16px;
            background: #fff;
            border-bottom: 1px solid #f2f2f2;
            h2 {
                text-align: center;
                font-size: 20px;
                color: #333;
                margin-bottom: 32px;
                font-weight: normal;
            }
            .total-box {
                color: #333;
                font-size: 14px;
            }
        }
        .price-box {
            i {
                font-size: 48px;
            }
            .openVip {
                margin-top: 28px;
                margin-bottom: 26px;
                button {
                    width: 180px;
                    height: 38px;
                    border-radius: 19px;
                    background-color: @themeColor;
                    color: @whiteColor;
                    margin-left: 62px;
                }
            }
        }
        .pay-box {
            margin: 0 auto 158px;
            box-sizing: border-box;
            background: #fff;
            .goDetail {
                text-align: center;
                font-size: 18px;
                margin-bottom: 34px;
                cursor: pointer;
            }
            .wxpay {
                width: 157px;
                height: 38px;
                line-height: 38px;
                border-radius: 4px;
                margin: 20px auto;
                border: 1px solid @darkColor;
                img {
                    margin-right: 12px;
                }
            }
            span {
                border-bottom: 1px solid #4494f0;
                margin: 0 3px;
            }
            #qrcode {
                height: 180px;
                width: 180px;
                margin: 0 auto;
            }
        }
    }
    .payPage_body /deep/ .list {
        background-color: @whiteColor;
    }
}
</style>
