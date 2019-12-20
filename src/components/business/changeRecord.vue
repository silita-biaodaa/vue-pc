<!-- 模型： DOM 结构 -->
<template>
    <!-- 变更记录 -->
    <div class="changeRecord">
        <div class="ic-basic">
            <template v-if="isajax">
                <!-- 有数据 -->
                <template v-if="list&&list.length>0">
                     <table class="table-content">
						<tr>
							<td style="width:45px">序号</td>
							<td style="width:100px">变更事项</td>
							<td style="width:275px">变更前内容</td>
							<td style="width:275px">变更后内容</td>
							<td style="width:100px">变更日期</td>
						</tr>
						<tr v-for="(el,i) in list" :key="i">
							<td>{{i+1}}</td>
							<td>{{el.altItem_CN}}</td>
							<td>{{el.altBe}}</td>
							<td>{{el.altAf}}</td>
							<td>{{formatDate(el.altDate)}}</td>
						</tr>
					</table>
                </template>
                <!-- 无数据 -->
                <template v-else-if="list&&list.length==0">
                    <div class="no-toast">
                        <img src="../../assets/img/bank_card @2x.png" alt="">
                        <span>Sorry，该企业暂无变更记录信息</span>
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
    name: 'changeRecord', // 基本信息
    data() {
        return {
            // 数据模型
            list:[],
            loading:true,
            isajax:false
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    inject:['reload'],
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.getChange()
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
        getChange(){//变更信息
            let that=this;
            this.$http({
                method:'post',
                url:'/gs/info',
                data:{
                    comId:this.$route.query.id,
                    paramter:'changeRecord'
                }
            }).then(function(res){
                that.isajax=true;
                if(res.data.code==1){
                    that.list=res.data.data;
                }else{
                    that.$alert(res.data.msg);
                }
            }).catch(req =>{
                that.isajax=true;
                that.list=null;
            })
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.ic-basic {
    box-sizing: border-box;
    .table-content {
        width: 844px;
        tr {
            td {
                padding: 0 10px;
            }
        }
    }
}

</style>
