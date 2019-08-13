 <!-- 模型： DOM 结构 -->
<template>
    <!-- 主要人员 -->
    <div class="prize">
        <div class="ic-basic">
            <div class="list-nav">
                <div style="width:72px" >序号</div>
                <div style="width:250px">不良类型</div>
                <div style="width: calc(100% - 472px);">项目名称</div>
                <div style="width:150px" >评定时间</div>
            </div>
            <!-- 有数据 -->
            <template v-if="data&&data.length>0">
                <div class="list-co" v-for="(el,i) in data" :key="i">
                    <div style="width:72px">{{i+1}}</div>
                    <div style="width:250px">{{el.review}}</div>
                    <div style="width: calc(100% - 472px);">
                        <span>{{el.projName}}</span>
                    </div>
                    <div style="width:150px">{{el.issued}}</div>
                    <div class="text-conent">{{el.remark}}</div>
                </div>
            </template>
            <!-- 无数据 -->
            <template v-else-if="data&&data.length==0">
                <div class="no-toast">
                    <img src="../../assets/img/bank_card @2x.png" alt="">
                    <span>Sorry，暂未查询到该公司的不良信息</span>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'prize', // 基本信息
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
            // for(let x of this.data){
            //     x.show=false;
            // }
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
        // enter(el) {
        //     el.show = true
        // },
        // leave(el) {
        //     el.show = false
        // },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.ic-basic {
    margin: 0 10px 15px 10px; 
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    .list-nav {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color:#333;
        border-bottom: 1px solid #f2f2f2;
    }
    .list-co {
        cursor: default;
        color: #333;
        text-align: center;
        min-height: 40px;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 5px 0;
        box-sizing: border-box; 
        border-bottom: 1px solid #f2f2f2;
        justify-content: space-between;
        position: relative;
        font-weight: 550;
        .text-conent{
            position: absolute;
            width: 100%;
            padding: 15px;
            bottom:0;
            background: #fff;
            box-sizing: border-box;
            z-index: 99;
            color: #999;
            transform: translateY(100%);
            // opacity: 0;
            box-shadow: 0px 3px 9px 1px rgba(0, 0, 0, 0.15);
            // transition: all 1s;
            display: none
        }
    }
    .list-co:hover .text-conent{
        display: block;
        // opacity: 1;
    }

}

</style>
