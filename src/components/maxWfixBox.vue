<!-- 模型： DOM 结构 -->
<template>
    <div class="maxWfixBox">
        <!-- list.length>0?'isshow':'' -->
        <div class="box" :class="{'isshow':list.length>0,'noshow':list.length==0,'no-notice':type!='notice','notice':type=='notice'}">
            <slot name="left" style="width:750px"></slot>
            <!-- 平台公示 -->
            <template v-if="type=='publicity'">
                <div class="fix-box positionBox" v-if="list.length>0" style="top:40px">
                    <h5 class="tit">
                        <span>行业资讯</span>
                        <span class="more" @click="jumpZx">更多>></span>
                    </h5>
                    <ul class="second">
                        <li v-for="(o,i) of list" :key="i" @click="publicityTap(o)">
                            <p>{{o.title}}</p>
                        </li>
                    </ul>
                </div>
            </template>
            <!-- 行业资讯 -->
            <template v-else-if="type=='information'">
                <div class="fix-box positionBox" v-if="list.length>0" style="top:40px">
                    <h5 class="tit">
                        <span>平台公示</span>
                        <span class="more" @click="jumpGs">更多>></span>
                    </h5>
                    <ul class="second">
                        <li v-for="(o,i) of list" :key="i" @click="informationTap(o)">
                            <p>{{o.title}}</p>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
        <!-- <div class="fix-box" :style="{'top':(type=='notice'?'125px':'80px')}" v-if="list.length>0">
            
        </div> -->
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
            // setTimeout(() => {
            //     that.list=this.$parent.list
            // }, 1000);
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
                    pageSize:5,
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
                    pageSize:5,
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
        publicityTap(o){
            const {href}=this.$router.resolve({
                path:'/detail',
                query:{
                    id:o.id
                }
            })
            window.open(href, '_blank', )
        },
        informationTap(o){
            const {href}=this.$router.resolve({
                path:'/detail',
                query:{
                    id:o.pkid,
                    type:o.type,
                    types:'ptgs'
                }
            })
            window.open(href, '_blank', )
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
    position: relative;
}
.no-notice{
    width:1020px;
    margin: 0 auto;
    min-height: 685px;
    .fix-box.positionBox{
        top: 125px;
        width: 260px;
        box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.1);
        background: #fff;
        li{
            line-height: 24px;
            p{
                text-overflow:clip;
                white-space: normal;
            }
        }
    }
}
.no-notice>div{
    width: 750px;
}
/*公告*/
.notice.isshow /deep/ .main .maxw{
    width: 750px;
    border-right: 1px solid #DDDFE4
}
.notice.isshow /deep/ .main .maxw>div{
    padding-right: 40px;
    box-sizing: border-box;
}
// .notice.noshow /deep/ .main .maxw{
//     width: 1020px;
//     border-right: none
// }
// .notice.noshow /deep/ .main .maxw>div{
//     padding-right:0;
// }
/*公告end*/
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
            padding: 5px 16px 5px 36px;
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
