<template>
	<div class="sign">
		<div class="sign-top">
			<p class="fw600 fs14 mb20">变更记录（{{total}}）</p>
		</div>
		<table class="table-content">
			<tr>
				<td style="width:68px">序号</td>
				<td style="width:298px">注册类别</td>
				<td style="width:calc(100% - 500px)">变更信息</td>
				<td style="width:134px">变更时间</td>
			</tr>
			<tr v-for='(el,i) in list' :key='i'>
				<td>{{i+1}}</td>
				<td>{{el.major}}</td>
				<td>{{el.remark}}</td>
				<td>{{el.changeDate}}</td>
			</tr>
			<tr v-show="ishow"><td colspan="4">暂无数据</td></tr>
		</table>

	</div>
</template>
<script>
	import {
		persond
	} from '@/api/index'
	export default {
		data() {
			return {
				list: [],
				total: 0,
				ishow: false
			}
		},
		methods: {
			gainList() {
				let data=JSON.parse(sessionStorage.getItem('peopleData'));
				data.tabType='changeRecord';
				persond(data).then(res => {
					if (res.code == 1) {
						this.total = res.data.changeRecord.length
						this.list = res.data.changeRecord
						if (this.total == 0) {
							this.ishow = true
						} else {
							this.ishow = false
						}
					}

				})
			}
		},
		created() {
			this.gainList()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	
</style>
