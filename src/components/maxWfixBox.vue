<!-- 模型： DOM 结构 -->
<template>
    <div class="maxWfixBox">
        <div class="box" :class="list.length>0?'isshow':''">
            <slot name="left" style="width:750px"></slot>
        </div>
        <div class="fix-box" :style="{'top':(type=='notice'?'125px':'80px')}" v-if="list.length>0">
            <!-- 相关公告 -->
            <template v-if="type=='notice'">
                <h5>相关公告({{list.length}})</h5>
                <ul>
                    <li v-for="(o,i) of list" :key="i" @click="jumpNotice(o)">
                        <p>{{i+1}}、{{o.title}}</p>
                    </li>
                </ul>
            </template>
            <!-- 平台公示 -->
            <template v-else-if="type=='publicity'">
                <h5 class="tit">
                    <span>行业资讯</span>
                    <span class="more" @click="jumpZx">更多>></span>
                </h5>
                <ul class="second">
                    <li v-for="(o,i) of list" :key="i" @click="publicityTap(o)">
                        <p>{{o.title}}</p>
                    </li>
                </ul>
            </template>
            <!-- 行业资讯 -->
            <template v-else>
                <h5 class="tit">
                    <span>平台公示</span>
                    <span class="more" @click="jumpGs">更多>></span>
                </h5>
                <ul class="second">
                    <li v-for="(o,i) of list" :key="i" @click="informationTap(o)">
                        <p>{{o.title}}</p>
                    </li>
                </ul>
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
        }else if(this.type=='publicity'){//平台公示
            this.$http({
                method:'post',
                url:'/notice/queryArticleList',
                data:{
                    pageNo:1,
                    pageSize:10,
                    type:'0'
                }
            }).then(res =>{
                if(res.data.code==1){
                    that.list=res.data.data
                }
            })
        }else{
            this.$http({
                method:'post',
                url:'/platform/notice/list',
                data:{
                    pageNo:1,
                    pageSize:10,
                    type:'version'
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
        jumpNotice(o){//跳到公告详情
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
        },
        publicityTap(o){
            alert('跳到相关资讯详情')
        },
        informationTap(){
            alert('跳到平台公示详情')
        },
        jumpZx(){//打开资讯列表
            const {href} = this.$router.resolve({
                path: '/information',
            })
            window.open(href, '_blank', )
        },
        jumpGs(){//打开公示列表
            const {href} = this.$router.resolve({
                path: '/publicity',
            })
            window.open(href, '_blank', )
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.box{
    width:1020px;
    margin: 0 auto;
    background: #FAFAFA;
}
.isshow>div{
    width: 750px;
}
.fix-box{
    width: 260px;
    position: fixed;
    background: #fff;
    margin-left:250px;
    left: 50%;
    h5{
        font-size: 18px;
        color: #333;
        padding-left: 18px;
        padding-right: 6px;
        line-height: 40px;
        border-bottom: 1px solid #F0F0F0;
    }
    ul{
        padding: 0 2px 0 8px;
        li{
            min-height: 44px;
            line-height:1.5;
            display: flex;
            align-items: center;
            padding-left: 8px;
            color: #666;
            font-size: 14px;
            border-bottom: 1px solid #F2F2F2;
            cursor: pointer;
            p{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
        li:last-child{
            border-bottom: none;
        }
        li:hover p{
            text-overflow:clip;
            white-space: normal;
            color: #FE6603;
        }
    }

    .tit{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .more{
            color: #FE6603;
            font-size: 12px;
            cursor: pointer;
        }
    }
    .second{
        li{
            min-height: 48px;
            padding: 0 16px 0 36px;
            position: relative;
        }
        li:before{
            content: '';
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-left:8px solid #FE6603;
            border-bottom: 8px solid transparent;
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
