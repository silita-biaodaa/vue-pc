<template>
	<div class="sign">
		<div class="sign-top">
			<p class="fw600 fs14 mb20">个人工程业绩（{{total}}）</p>
		</div>
		<table class="table-content">
			<tr>
				<td style="width:68px">序号</td>
				<td style="width:116px">承担角色</td>
				<td style="width:116px">项目类型</td>
				<td style="width:calc(100% - 668px)">项目名称</td>
				<td style="width:176px">项目属地</td>
				<td style="width:192px">所在企业</td>
			</tr>
			<tr v-for='(el,i) in list' :key='i'>
				<td>{{i+1}}</td>
				<td>{{el.role}}</td>
				<td>{{el.proType}}</td>
				<td>{{el.proName}}</td>
				<td>{{el.proWhere}}</td>
				<td>{{el.company}}</td>
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
				data.tabType='personProject';
				persond(data).then(res => {
					if (res.code == 1) {
						this.total = res.data.prosonProjectList.length
						this.list = res.data.prosonProjectList
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
