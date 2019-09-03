<!-- 模型： DOM 结构 -->
<template>
    <div class="maxWfixBox">
        <div class="box">
            <slot name="left"></slot>
        </div>
        <div class="fix-box" :style="{'top':(type=='notice'?'125px':'100px')}">
            <!-- 相关公告 -->
            <template v-if="type=='notice'">
                <h5>相关公告({{list.length}})</h5>
                <ul>
                    <li v-for="(o,i) of list" :key="i" @click="jumpNotice(o)">{{i+1}}、{{o.title}}</li>
                </ul>
            </template>
            <!-- 平台公示 -->
            <template v-else-if="type=='publicity'">

            </template>
            <!-- 行业资讯 -->
            <template v-else>

            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'maxWfixBox', // 结构名称
    data() {
        return {
            // 数据模型
            list:[]
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        type:{
            type:String
        },
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let that=this;
        if(this.type=='notice'){//相关公告
            this.$http({
                method:'post',
                url:'/newnocite/correlation/list',
                data:{
                    source:this.$route.query.source,
                    ntId:this.$route.query.id,
                }
            }).then(res =>{
                if(res.data.code==1){
                    that.list=res.data.data
                }
            })
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
        jumpNotice(o){
            let path='/notice'
            if(o.type==1){
                path='/article'
            }
            const {
                href
            } = this.$router.resolve({
                path: path,
                query: {
                    id: o.id,
                    source: o.source
                }
            })
            window.open(href, '_blank')
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.box{
    width:750px;
    margin: 0 auto;
    background: #FAFAFA;
}
.fix-box{
    width: 260px;
    position: fixed;
    background: #fff;
    margin-left:387px;
    left: 50%;
    h5{
        font-size: 18px;
        color: #333;
        padding-left: 18px;
        line-height: 40px;
        border-bottom: 1px solid #F0F0F0;
    }
    ul{
        padding: 0 2px 0 8px;
        li{
            line-height: 44px;
            padding-left: 8px;
            color: #666;
            font-size: 14px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            border-bottom: 1px solid #F2F2F2;
            cursor: pointer;
        }
        li:last-child{
            border-bottom: none;
        }
    }
}
</style>
