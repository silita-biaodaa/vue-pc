<!-- 模型： DOM 结构 -->
<template>
    <div class="branch">
        <div class="ic-basic">

            <template v-if="isajax">
                <!-- 有数据 -->
                <template v-if="list&&list.length>0">
                    <table class="table-content">
						<tr>
							<th style="width:72px">序号</th>
							<th style="width:200px">企业名称</th>
							<th style="width:100px">负责人</th>
							<th style="width:150px">联系方式</th>
							<th style="width:250px">地址</th>
						</tr>
						<tr v-for="(el,i) in list" :key="i">
							<td>{{i+1}}</td>
							<td>{{el.comName}}</td>
							<td>{{el.legalPerson}}</td>
							<td>{{el.phone}}</td>
							<td>{{el.comAddress}}</td>
						</tr>
					</table>
                </template>
                <!-- 无数据 -->
                <template v-else-if="list&&list.length==0">
                    <div class="no-toast">
                        <img src="../../assets/img/bank_card @2x.png" alt="">
                        <span>Sorry，该企业暂无分支机构信息</span>
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
import { Branch} from '@/api/index'
export default {
    name: 'branch', // 基本信息
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
    inject:['reload'],
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.getBranch()
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
        getBranch() {//分支机构
            let that=this;
            let data={comId:this.$route.query.id};
            if(localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='true'){
                data.isVip = 1
            } else {
                data.isVip = 0 
            }
            Branch(data).then(res => {
                that.isajax=true;
                if(res.code == 1) {
                    this.list = res.data
                    var iar = []
                    this.list.forEach( el => {
                        if(el.phone) {
                        iar = el.phone.split(';')
                        // if( !localStorage.getItem('isvip') ) {
                        //     el.phone = this.resetPhone(iar[0])
                        // } else {
                            el.phone = iar[0]
                        // }
                        iar = []
                        } else {
                            return
                        }           
                    })
                }else{
                    that.$alert(res.data.msg);
                }
            }).catch(req =>{
                that.isajax=true;
                that.list=null;
            })
        },
        //刷新
        recoldFn(){
            this.reload();
        } 
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import '../../base/table.less';
</style>
