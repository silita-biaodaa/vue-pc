<!-- 模型： DOM 结构 -->
<template>
	<div class="publicity">
        <v-head :headTxt="'平台公示'"></v-head>
        <v-maxw :type="'publicity'">
            <div slot="left">
                <div class="con-nav">首页 > 平台公示</div>
                <div class="main">
                    <!-- 判断是否加载中 -->
                    <template v-if="isajax">
                        <!-- 有数据 -->
                        <template v-if="list&&list.length>0">
                            <ul>
                                <li v-for="(o,i) of list" :key="i" @click="jump(o)">
                                    <h4>{{o.title}}</h4>
                                    <p>{{o.remark}}</p>
                                </li>
                            </ul>
                            <div class="page">
                                <nav-page :all='total' :pageSize="15" :currents='pageNo' @skip='Goto'></nav-page>
                            </div>
                        </template>
                        <!-- 无数据  -->
                        <template v-else-if="list&&list.length==0">
                            <div class="no-toast">
                                <img src="../assets/img/bank_card @2x.png" alt="">
                                <span>Sorry，没有平台公示信息</span>
                            </div>
                        </template>
                        <!-- 加载失败 -->
                        <template v-else-if="!list">
                            <div class="ajax-erroe">
                                <img src="../assets/img/pic-zoudiu.png" />
                                <span @click="recoldFn">刷新</span>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
                    </template>
                </div>
            </div>
        </v-maxw>
	</div>
</template>
<script>
    import heads from '@/components/head3'
    import maxWfixBox from '@/components/maxWfixBox'
	export default {
		name: 'publicity', // 结构名称
		data() {
			return {
                // 数据模型
                list:[],
                pageNo:1,
                total:0,
                loading:true,
                isajax:false,
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
            'v-maxw':maxWfixBox
		},
		created() {
            // console.group('创建完毕状态===============》created');
            this.ajax()
        },
        inject: ['reload'],
		methods: {
            // 方法 集合
            Goto(val){
                this.pageNo=val.cur;
                this.list=[];
                this.isajax = false;
                this.ajax();
            },
            ajax(){
                let that=this;
                this.$http({
                    method:'post',
                    url:'/platform/notice/list',
                    data:{
                        pageNo:this.pageNo,
                        pageSize:15,
                        type:'version'
                    }
                }).then(res =>{
                    that.isajax=true;
                    if(res.data.code==1){
                        that.list=res.data.data;
                        that.total=res.data.total
                    }
                }).catch(function(){
                    that.isajax=true;
                    that.list=null;
                })
            },
            //刷新
			recoldFn() {
				this.reload();
            },
            jump(o){
                const {
                    href
                } = this.$router.resolve({
                    path: '/detail',
                    query: {
                        time: o.releaseTime,
                    }
                })
                window.open(href, '_blank', )
            }
		}

	}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style lang='less' scoped>
.publicity{
    .con-nav{
        line-height: 40px;
        font-size: 12px;
        color: #666;
    }
    .main{
        li{
            background: #fff;
            box-shadow:4px 2px 10px 0px rgba(0, 0, 0, 0.1);
            padding: 22px 18px 26px;
            margin-bottom: 10px;
            cursor: pointer;
            box-sizing: border-box;
            h4{
                font-size: 18px;
                color: #333;
                padding-right: 80px;
                box-sizing: border-box;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 20px;
            }
            p{
                font-size: 14px;
                color: #999;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
    }
}
</style>
