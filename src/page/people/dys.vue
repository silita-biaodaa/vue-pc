<template>
	<div class="sign">
		<div class="sign-top">
			<p class="fw600 fs14 mb20">不良记录（{{total}}）</p>
		</div>
		<table class="table-content">
			<tr>
				<td style="width:68px">序号</td>
				<td style="width:164px">项目名称</td>
				<td style="width:calc(100% - 640px)">不良行为内容</td>
				<td style="width:150px">性质</td>
				<td style="width:124px">发布日期</td>
				<td style="width:134px">发布部门</td>
			</tr>
			<tr v-for='(el,i) in list' :key='i'>
				<td>{{i+1}}</td>
				<td>{{el.projectname}}</td>
				<td>{{el.badbehaviorcontent}}</td>
				<td>{{el.nature}}</td>
				<td>{{el.publishdate}}</td>
				<td>{{el.publishsite}}</td>
			</tr>
			<tr v-show="ishow"><td colspan="6">暂无数据</td></tr>
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
				data.tabType='badRecord';
				persond(data).then(res => {
					if (res.code == 1) {
						this.total = res.data.badRecord.length
						this.list = res.data.badRecord
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
