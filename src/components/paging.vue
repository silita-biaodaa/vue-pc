<template>
	<div class="paging">
		<el-pagination
			layout="total, prev, pager, next, jumper"
			:current-page="currents"
			:hide-on-single-page="true"
			:page-size="pageSize"
			@current-change="Goto"
			:total="all">
		</el-pagination>

	</div>
</template>
<script>
	export default {
		name: 'paging', // 结构名称
		data() {
			return {
				// 数据模型
			}
		},
		watch: {
			// 监控集合
		},
		props: {
			'currents': {
				type: Number,
				default: 1
			},
			'all': { //总条数
				type: Number,
				default: 1
			},
			'pageSize': {
				type: Number,
				default: 20
			},

		},
		// updated () {
		//   console.log('子：'+this.$parent.present)  
		// },
		mounted() {
			// console.group('挂载结束状态===============》mounted');
		},
		methods: {
			// 方法 集合
			Goto(val){
				this.$emit('skip',{
					cur: val
				})
			}
		}

	}
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style lang="less" scoped>
</style>
