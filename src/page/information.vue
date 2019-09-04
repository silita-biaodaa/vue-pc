<!-- 模型： DOM 结构 -->
<template>
	<div class="information">
        <v-head :headTxt="'相关资讯'"></v-head>
        <v-maxw :type="'information'">
            <div slot="left">
                <div class="con-nav">首页 > 相关资讯</div>
                <div class="main">
                    <!-- 判断是否加载中 -->
                    <template v-if="isajax">
                        <!-- 有数据 -->
                        <template v-if="list&&list.length>0">
                            <ul>
                                <li v-for="(o,i) of list" :key="i">
                                    <h4>{{o.title}}</h4>
                                    <p>{{o.contentDescribe}}</p>
                                </li>
                            </ul>
                            <div class="page">
                                <nav-page :all='total' :pageSize="10" :currents='pageNo' @skip='Goto'></nav-page>
                            </div>
                        </template>
                        <!-- 无数据  -->
                        <template v-else-if="list&&list.length==0">
                            <div class="no-toast">
                                <img src="../assets/img/bank_card @2x.png" alt="">
                                <span>Sorry，没有相关资讯信息</span>
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
		name: 'information', // 结构名称
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
                    url:'/notice/queryArticleList',
                    data:{
                        pageNo:this.pageNo,
                        pageSize:10,
                        type:'0'
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
			}
		}

	}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style lang='less' scoped>
.information{
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
