<template>
	<div class="sign">
		<div class="sign-top">
			<span>个人工程业绩（{{total}}）</span>
		</div>
		<div class="sign-table">
			<div class="certifi-table">
				<div style="width:70px;">序号</div>
				<div style="width:100px;">承担角色</div>
				<div style="width:80px;">项目类型</div>
				<div style="width:213px;">项目名称</div>
				<div style="width:130px;">项目属地</div>
				<div style="width:180px;">所在企业</div>
			</div>
			<div class="certifi-in" v-for="(el,i) in list" :key="i">
				<div style="width:70px;">{{i + 1 }}</div>
				<div style="width:100px;">{{el.role}}</div>
				<div style="width:80px;">{{el.proType}}</div>
				<div style="width:213px;">{{el.proName}}</div>
				<div style="width:130px;">{{el.proWhere}}</div>
				<div style="width:180px;">{{el.company}}</div>
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
