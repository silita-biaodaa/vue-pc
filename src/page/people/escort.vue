<template>
	<div class="sign">
		<div class="sign-top">
			<p class="fw600 fs14 mb20">押证详情（{{total}}）</p>
		</div>
		<table class="table-content">
			<tr>
				<td style="width:68px">序号</td>
				<td style="width:218px">单位名称</td>
				<td style="width:calc(100% - 536px)">工程名称</td>
				<td style="width:116px">岗位类别</td>
				<td style="width:134px">押证时间</td>
			</tr>
			<tr v-for='(el,i) in list' :key='i'>
				<td>{{i+1}}</td>
				<td>{{el.unitOrg}}</td>
				<td>{{el.proName}}</td>
				<td>{{el.type}}</td>
				<td>{{el.date}}</td>
			</tr>
			<tr v-show="ishow"><td colspan="5">暂无数据</td></tr>
		</table>
	</div>
</template>
<script>
	import {
		underq
	} from '@/api/index'
	export default {
		data() {
			return {
				innerid: '',
				list: [],
				total: 0,
				ishow: false
			}
		},
		methods: {
			gainList() {
				underq({
					innerid: this.innerid,
					type: 'detail'
				}).then(res => {
					if (res.code == 1) {
						this.total = res.data.length
						this.list = res.data
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
			let data=JSON.parse(sessionStorage.getItem('peopleData'));
			this.innerid = data.innerid
			this.gainList()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.sign {
	}
</style>
