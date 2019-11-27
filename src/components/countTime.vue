<template>
    <div class="surplus-time">剩余支付时间：{{m}}:{{s}}</div>
</template>
<script>
export default {
    name: "countDate",
    data() {
        return {
            d: "",
            h: "",
            m: "",
            s: ""
        };
    },
    created() {
        this.countTime();
    },
    props: {
        end: {
            type: Number
        }
    },
    methods: {
        countTime: function() {
            //获取当前时间
            var date = new Date();
            var now = date.getTime();
            //设置截止时间
            var end = this.end;
            //时间差
            var leftTime = end - now;
            //定义变量 d,h,m,s保存倒计时的时间
            if (leftTime >= 0) {
                this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24); //天数我没用到，暂且写上
                this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
                this.m = Math.floor((leftTime / 1000 / 60) % 60);
                this.s = Math.floor((leftTime / 1000) % 60);
                if(this.m<10){
                    this.m='0'+this.m;
                }
                if(this.s<10){
                    this.s='0'+this.s;
                }
            }
            //递归每秒调用countTime方法，显示动态时间效果
            setTimeout(this.countTime, 1000);
        }
    }
};
</script>