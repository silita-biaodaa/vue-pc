<!-- 模型： DOM 结构 -->
<template>
    <!-- 股东信息 -->
    <div class="shareholder">
        <div class="ic-basic">
            <div class="list-nav">
                <div style="width:72px" >序号</div>
                <div style="width:calc((100% - 72px)/3)">股东</div>
                <div style="width:calc((100% - 72px)/3)">持股比例</div>
                <div style="width:calc((100% - 72px)/3)">认缴出资金额</div>
            </div>
            <template v-if="isajax">
                <!-- 有数据 -->
                <template v-if="list&&list.length>0">
                    <div class="list-co" v-for="(el,i) in list" :key="i" >
                        <div style="width:72px">{{i+1}}</div>
                        <div style="width:calc((100% - 72px)/3)">
                            <span style="color:#FE6603" >{{el.inv}}</span>
                        </div>
                        <div style="width:calc((100% - 72px)/3)">
                            <template v-if="!isNaN(el.proportion)">
                                {{el.proportion}}
                            </template>
                            <template v-else>
                                暂无信息
                            </template>
                        </div>
                        <div style="width:calc((100% - 72px)/3)">
                            <template v-if="el.liSubConAm">
                                {{el.liSubConAm}}万元
                            </template>
                            <template v-else>
                                暂无信息
                            </template>
                        </div>
                    </div>
                </template>
                <!-- 无数据 -->
                <template v-else-if="list&&list.length==0">
                    <div class="no-toast">
                        <img src="../../assets/img/bank_card @2x.png" alt="">
                        <span>Sorry，该企业暂无股东信息</span>
                    </div>
                </template>
                <template v-else-if="!list">
                    <div class="ajax-erroe">
                        <img src="../../assets/img/pic-zoudiu.png"/>
                        <!-- <span @click="recoldFn">刷新</span> -->
                    </div>
                </template>
            </template>
            <template v-else>
                <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'shareholder', // 基本信息
    data() {
        return {
            // 数据模型
            list:[],
            loading:true,
            isajax:false
        }
    },
    inject:['reload'],
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.getHolder()
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
        //刷新
        recoldFn(){
            this.reload();
        },
        getHolder(){//股东信息
            let that=this;
            this.$http({
                method:'post',
                url:'/gs/info',
                data:{
                    comId:this.$route.query.id,
                    paramter:'partner'
                }
            }).then(function(res){
                that.isajax=true;
                if(res.data.code==1){
                    let n =that.countScale(res.data.data);
                    for(let x of res.data.data){
                        x.proportion=((x.liSubConAm/n)*100).toFixed(2)+'%';
                    }
                    that.list=res.data.data;
                }else{
                    that.$alert(res.data.msg);
                }
            }).catch(req =>{
                that.isajax=true;
                that.list=null;
            })
        },
        countScale(list){//计算股东比例
            let n=0;
            for(let x of list){
                n+=x.liSubConAm
            }
            return n
        },
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
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        display: flex;
        color:#333;
        border-bottom: 1px solid #f2f2f2;
    }
    .list-co {
        color: #999;
        text-align: center;
        min-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        padding: 5px 0;
        box-sizing: border-box; 
        border-bottom: 1px solid #f2f2f2
    }
}

</style>
