<template>
    <div class="resultsList">
        <div class="dfrcb mb10">
            <div class="fs18 color-150">您的查询条件为：</div>
            <div class="color-449 fs18 cp" v-if="this.$parent.payPage">
                <span class="mr10">返回修改</span>
                <i class="iconfont iconfanhuixiugai"></i>
            </div>
        </div>
        <div class="pt20 pl20 pr20 bg-ffe list">
            <el-row v-for="(item,index) in showArr" :key="index" class="fs18 pb20">
                <div class="dr">
                    <el-col :span="2.5" class="fw600">{{item.title}}</el-col>
                    <el-col :span="21">{{item.info}}</el-col>
                </div>
            </el-row>
            <div class="list_bottom dfcc mb20" :class="{'hide': !showTotal}">
                <div class="line_left mr20"></div>
                <div class="cp drc" @click="toggle">
                    <span class="color-449 fs14">{{showAll?'收起':'展开'}}</span>
                    <i
                        class="iconfont color-449 fs10 cp ml5 iconzhankai"
                        :class="{'iconshouqi':showAll}"
                    ></i>
                </div>
                <div class="line_right ml20"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        payPage: {
            type: Boolean,
            default: ""
        }
    },
    data() {
        return {
            resultList: [],
            showTotal: true,
            showArr: [],
            showAll: false
        };
    },
    methods: {
        getMainList() {
            this.$http({
            method:'post',
            url:'/gonglu/get/conditions',
            data:{
                pkid:this.$route.query.pkid
            }
            }).then(res =>{
                // this.data=res.data.data.condition
                // this.$parent.total=res.data.data.condition.totals
            })
        },
        showList() {
            //超过四行隐藏
            if (this.resultList.length > 4) {
                for (let i = 0; i < 4; i++) {
                    this.showArr.push(this.resultList[i]);
                }
                return this.showArr;
            } else {
                this.showTotal = false;
                this.showArr = this.resultList;
            }
        },
        toggle() {
            //点击展开收起
            this.showAll = !this.showAll;
            this.showArr = [];
            if (this.showAll) {
                this.showArr = this.resultList;
            } else {
                for (let i = 0; i < 4; i++) {
                    this.showArr.push(this.resultList[i]);
                }
                return this.showArr;
            }
        }
    },
    created() {
        this.showList();
        this.getMainList();
    }
};
</script>
<style lang="less" scoped>
@import "../../style/publicCSS";
.resultsList {
    .list {
        border: 1px solid @initColor;
        .list_bottom {
            .line_left,
            .line_right {
                width: 444px;
                height: 1px;
            }
            .line_left {
                background: linear-gradient(
                    90deg,
                    rgba(121, 198, 249, 0) 0%,
                    rgba(68, 148, 240, 1) 100%
                );
            }
            .line_right {
                background: linear-gradient(
                    -90deg,
                    rgba(121, 198, 249, 0) 0%,
                    rgba(68, 148, 240, 1) 100%
                );
            }
        }
    }
}
</style>