<template>
	<div class="sign">
		<div class="sign-top">
			<span>不良记录（{{total}}）</span>
		</div>
		<div class="sign-table">
			<div class="certifi-table">
				<div style="width:70px;">序号</div>
				<div style="width:190px;">项目名称</div>
				<div style="width:170px;">不良行为内容</div>
				<div style="width:103px;">性质</div>
				<div style="width:100px;">发布日期</div>
				<div style="width:140px;">发布部门</div>
			</div>
			<div class="certifi-in" v-for="(el,i) in list" :key="i">
				<div style="width:70px;">{{i + 1 }}</div>
				<div style="width:190px;">{{el.projectname}}</div>
				<div style="width:170px;">{{el.badbehaviorcontent}}</div>
				<div style="width:103px;">{{el.nature}}</div>
				<div style="width:100px;">{{el.publishdate}}</div>
				<div style="width:140px;">{{el.publishsite}}</div>
			</div>
			<div class="certifi-no" v-show="ishow">暂无数据</div>
		</div>

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
	.sign {
		background-color: #fff;
		padding: 0 10px 31px;
		box-sizing: border-box;
		width: 100%;

		.sign-top {
			line-height: 44px;
			font-size: 14px;
			font-weight: 550;
			color: #333;

			span {
				border-left: 2px solid #FE6603;
				padding-left: 10px;
			}
		}

		.sign-table {
			border: 1px solid #f2f2f2;
		}

		.certifi-table {
			display: flex;
			flex-direction: row;
			align-items: center;
			text-align: center;
			height: 40px;
			color: #333;
			font-size: 14px;
			font-weight: 550;
			border-bottom: 1px solid #f2f2f2;
		}

		.certifi-in {
			display: flex;
			flex-direction: row;
			align-items: center;
			text-align: center;
			min-height: 56px;
			color: #999;
			font-size: 14px;
			border-bottom: 1px solid #f2f2f2;
		}

		.certifi-no {
			line-height: 56px;
			text-align: center;
			color: #999;
			font-size: 14px;
		}
	}
</style>
