<!-- 模型： DOM 结构 -->
<template>
	<div class="detail">
        <v-head :headTxt="headTxt"></v-head>
	</div>
</template>
<script>
    import heads from '@/components/head3'
	export default {
		name: 'detail', // 结构名称
		data() {
			return {
                // 数据模型
                headTxt:'平台公示'
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
            if(this.$route.query.time){
                this.$http({
                    method:'post',
                    url:'/count/list',
                    data:{
                        statDate:this.$route.query.time
                    }
                }).then(res =>{
                    console.log(res)
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

}
</style>
