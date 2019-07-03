<!-- 模型： DOM 结构 -->
<template>
    <div class="popup">
        <div class="pop">
            <div class="title">
                <i class="el-icon-close"  @click="closeFn"></i>
            </div>
            <div class="box">
                <template v-if="contentDom">
                    {{contentTxt}}
                </template>
                <template v-else>
                    <slot></slot>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'popup', // 结构名称
    data() {
        return {
            // 数据模型
            isShow:true
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        contentTxt:{//可以传内容，可以用插槽
            default:false
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
        closeFn(){
            this.$parent.mask=false
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.popup{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 99999;
    top: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.pop{
    width: 998px;
    background: #fff;
    padding: 10px;
    height: 600px;
    .title{
        text-align: right;
        i{
            font-size: 30px;
            cursor: pointer;
            color: #EC7522
        }
    }
    .box{
        height:calc(600px - 40px);
        overflow: auto;
    }
}
</style>
