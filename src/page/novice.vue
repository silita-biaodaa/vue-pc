<!-- 模型： DOM 结构 -->
<template>
    <div class="novice">
        <v-head :headTxt="'新手指引'"></v-head>
        <div class="main">
            <div class="left-box">
                <h5>产品功能介绍</h5>
                <ul>
                    <li v-for="(o,i) of productList" :key="i" :class="productNum==i?'active':''" @click="jump(i)">{{o.name}}</li>
                </ul>
            </div>
            <div class="right-box">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import heads from '@/components/head3'
export default {
    name: 'novice', // 结构名称
    data() {
        return {
            // 数据模型
            productList:[
                {
                    name:'招标查询'
                },{
                    name:'中标查询'
                },{
                    name:'企业查询'
                },{
                    name:'查在建'
                },{
                    name:'综合查询'
                }
            ],
            productNum:0
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
        'v-head': heads,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(this.$route.meta.i){
            this.productNum=this.$route.meta.i
        }
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
        jump(i){
            this.productNum=i;
            let path=(i+1)+'';
            this.$router.push(path);
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.novice{
    margin-bottom: 100px;
}
.main{
    width: 1020px;
    margin: 18px auto 0;
    display: flex;
    justify-content: space-between;
    .left-box{
        width: 180px;
        background: #fff;
        box-shadow:4px 2px 10px 0px rgba(0, 0, 0, 0.05);
        max-height: 288px;
        h5{
            line-height: 40px;
            font-size: 18px;
            color: #333;
            padding-left: 14px;
            box-sizing: border-box;
            border-bottom: 1px solid #f0f0f0
        }
        li{
            line-height: 48px;
            font-size: 16px;
            box-sizing: border-box;
            padding-left: 42px;
            position: relative;
            cursor: pointer;
        }
        .active{
            color: #FE6603;
        }
        .active:before{
            content: '';
            position: absolute;
            border-left: 10px solid #FE6603;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            transform: translateY(-50%);
            top: 50%;
            left: 14px;
        }
    }
    .right-box{
        width: 830px;
        background: #fff;
        padding: 32px 16px 48px;
        box-sizing: border-box;
        box-shadow:4px 2px 10px 0px rgba(0, 0, 0, 0.05);
    }
}

</style>
