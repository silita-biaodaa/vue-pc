<!-- 模型： DOM 结构 -->
<template>
    <div class="branch">
        <div class="ic-basic">
            <div class="list-nav">
                <div style="width:72px" >序号</div>
                <div style="width:200px" >企业名称</div>
                <div style="width:100px" >负责人</div>
                <div style="width:150px" >联系方式</div>
                <div style="width:250px" >地址</div>
            </div>
            <template v-if="isajax">
                <!-- 有数据 -->
                <template v-if="list&&list.length>0">
                    <div class="list-co" v-for="(el,i) in list" :key="i" >
                        <div style="width:72px" >{{i+1}}</div>
                        <div style="width:200px" >
                            <span style="color:#FE6603" >{{el.comName}}</span>
                        </div>
                        <div style="width:100px" >{{el.legalPerson}}</div>
                        <div style="width:150px" >{{el.phone}}</div>
                        <div style="width:250px" >{{el.comAddress}}</div>
                    </div>
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
            if(localStorage.getItem('isvip')&&localStorage.getItem('isvip')!=''){
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
.ic-basic {
    margin: 0 10px 15px 10px; 
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    .list-nav {
        height: 40px;
        line-height: 40px;
        display: flex;
        text-align: center;
        font-size: 12px;
        color:#333;
        border-bottom: 1px solid #f2f2f2;
    }
    .list-co {
        color: #999;
        text-align: center;
        min-height: 40px;
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 5px 0;
        box-sizing: border-box; 
        border-bottom: 1px solid #f2f2f2
    }

}

</style>
