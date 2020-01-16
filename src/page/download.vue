<template>
    <div class="download">
        <v-head :headTxt="'下载APP'"></v-head>
        <div class="main">
            <div class="box dfrcb">
                <div class="left-box">
                    <img src="../assets/img/pic-erweima.png"/>
                    <h3 class="fs28 mb15">iPhone Android 下载</h3>
                    <h5 class="mb10 fs20">查企业 查项目 查人员</h5>
                    <p class="mb10 fs20">建筑领域招投标专家，全面、精准、及时的大数据产品</p>
                    <p class="mb10 fs20">下载APP，随时随地找你想要的数据信息</p>
                </div>
                <img src="../assets/img/sj.png"/>
            </div>
            <div class="bottom">© 2017 思利他, Inc. All rights reserved . 湘ICP备17019911号-1</div>
        </div>
    </div>
</template>
<script>
import heads from "@/components/head3";
export default {
    data() {
        return {};
    },
    methods: {},
    created() {
        // this.gain()
    },
    components: {
        "v-head": heads
    }
};
</script>
<style lang="less" scoped>
.download {
    .main{
        height: calc(100vh - 58px);
        background: url("../assets/img/xzbg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        .box{
            position: absolute;
            transform: translate(-50%,-50%);
            left: 50%;
            top: 50%;
            width: 1020px;
            .left-box{
                img{
                    width: 280px;
                    display: block;
                    margin-bottom: 24px;
                    box-shadow:0px 3px 11px 0px rgba(0,0,0,0.19);
                }
                h3,h5{
                    color: #150000;
                }
                p{
                    color: #424040
                }
            }
        }
        .bottom{
            position: absolute;
            bottom: 22px;
            font-size: 14px;
            color: #999;
            transform: translateX(-50%);
            left: 50%;
        }
    }
}
</style>
