<!-- 模型： DOM 结构 -->
<template>
	<div class="detail">
        <v-head :headTxt="headTxt"></v-head>
        <div class="max-box">
            <div class="con-nav">首页 > {{headTxt}} > 正文</div>
            <div class="box">
                <template v-if="headTxt=='行业资讯'">
                    <div class="content" v-html="data.content"></div>
                </template>
                <template v-else>
                    <h5>{{data.title}}</h5>
                    <p class="time">{{data.releaseTime}}</p>
                    <p class="remark">{{data.remark}}</p>
                    <table border="1">
                        <tr>
                            <td>序号</td>
                            <td>公司名称</td>
                            <td v-if="$route.query.type==1">中标数量</td>
                            <template v-else>
                                <td>评分</td>
                                <td>获奖数量</td>
                            </template>
                        </tr>
                        <tr v-for="(o,i) of data.list" :key="i">
                            <td>{{i+1}}</td>
                            <td>
                                <v-comjump :name="o.comName"></v-comjump>
                            </td>
                            <td v-if="$route.query.type==1">{{o.num}}</td>
                            <template v-else>
                                <!-- 信誉积分 -->
                                <td>{{o.score}}</td>
                                <td>{{o.num}}</td>
                            </template>
                        </tr>
                    </table>
                </template>
            </div>
        </div>
	</div>
</template>
<script>
    import heads from '@/components/head3'
	export default {
		name: 'detail', // 结构名称
		data() {
			return {
                // 数据模型
                headTxt:'平台公示',
                data:''
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
		},
		created() {
            // console.group('创建完毕状态===============》created');
            if(this.$route.query.time){//平台公示
                this.$http({
                    method:'post',
                    url:'/count/list',
                    data:{
                        statDate:this.$route.query.time,
                        type:this.$route.query.type
                    }
                }).then(res =>{
                    this.data=res.data.data
                })
            }
            if(this.$route.query.id){//行业资讯
                this.headTxt='行业资讯'
                this.$http({
                    method:'post',
                    url:'/notice/queryArticleDetail',
                    data:{
                        id:this.$route.query.id
                    }
                }).then(res =>{
                    this.data=res.data.data
                })
            }
        },
		methods: {
            // 方法 集合
		}

	}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style lang='less' scoped>
.detail{
    .max-box{
        width: 1020px;
        margin: 0 auto;
        .con-nav{
            line-height: 40px;
            font-size: 12px;
            color: #666;
        }
    }
    .box{
        background: #fff;
        padding:26px 36px 80px;
        margin-bottom: 200px;
        h5{
            font-size: 24px;
            color: #333;
            text-align: center;
            margin-bottom: 18px;
        }
        .time{
            font-size: 14px;
            color: #999999;
            margin-bottom: 24px;
        }
        .remark{
            font-size: 14px;
            color: #999999;
            margin-bottom: 24px;
        }
        table{
            width: 100%;
            text-align: center;
            border-collapse:collapse;
        }
    }
}
</style>
