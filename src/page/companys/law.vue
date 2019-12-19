<template>
	<div class="law" v-loading="loading" element-loading-text="拼命加载中">
		<div class="law-search">
			<div class="left law-wei">
				裁判文书（{{this.total}}）
			</div>
		</div>
		<div class="law-list">
				<table class="table-content">
						<tr>
							<td style="width:68px">序号</td>
							<td style="width:394px">案件名称</td>
							<td style="width:226px">法院</td>
							<td style="width:calc(100% - 508px)">案号</td>
							<td style="width:120px">时间</td>
						</tr>
						<tr @click="jumpDetail(el.id)" v-for="(el,i) in lawList" :key="i" v-show="!result">
							<td>{{(current-1)*20+(i+1)}}</td>
							<td>{{el.title}}</td>
							<td>{{el.court}}</td>
							<td>{{el.caseNo}}</td>
							<td>{{el.dateStr}}</td>
						</tr>
			</table>
			<div class="no-toast" v-show="result">
				<img src="../../assets/img/bank_card @2x.png" alt="">
				<span>Sorry，暂未查询到该公司的法务信息</span>
			</div>
		</div>
		<div class="law-page" v-show="!result">
			<nav-page :all='total' :currents='current' @skip='Goto'></nav-page>
		</div>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
	</div>
</template>
<script>
	import {
		Law
	} from '@/api/index'
	export default {
		data() {
			return {
				lawList: [],
				total: 0,
				current: 1,
				name: '',
				result: false,
				loading: true,
				svip: false
			}
		},
		methods: {
			gainList() {
				this.name = this.$route.query.name
				var years = this.year == '' ? null : this.year
				Law({
					pageNo: this.current,
					pageSize: 20,
					keyWord: this.search,
					comName: this.name,
					start: years,
					end: years
				}).then(res => {
					if (res.code == 1) {
						this.loading = false
						this.lawList = res.data
						this.total = res.total
						this.current = res.pageNum
						if (this.lawList.length == 0) {
							this.result = true
						} else {
							this.result = false
						}
					}
				})
			},
			Goto(val) {
				this.current = val.cur
				this.gainList()
				this.funcom.toList(200)
			},
			jumpDetail(id) {
				if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
					this.svip = true
					this.modalHelper.afterOpen();
				} else {
					const {
						href
					} = this.$router.resolve({
						path: '/lawDetail',
						query: {
							id: id
						}
					})
					window.open(href, '_blank', )
				}
			},
			closeload(val) {
				this.svip = val.cur
			},
		},
		created() {
			this.gainList()
		},
		components: {}
	}
</script>
<style lang="less">
	.law {
		background-color: #fff;
		padding: 0 9px;
		.el-loading-spinner .path {
			stroke: #FE6603;
		}
		.el-loading-spinner {
			top: 10%;
		}
		.el-loading-spinner .el-loading-text {
			color: #FE6603;
		}
		.law-search {
			height: 56px;
			line-height: 56px;
			padding: 0 12px;
			font-size: 14px;
			color: #333;
			.law-wei {
				font-weight: 550;
				margin-right: 25px;
			}
			.law-year {
				.el-date-editor.el-input,
				.el-date-editor.el-input__inner {
					width: 140px;
				}
			}

		}
		.table-content {
			tr {
				td {
					padding: 0 10px;
					box-sizing: border-box;
				}
			}
		}
		.law-page {
			display: flex;
			justify-content: center;
			padding-top: 50px;
			padding-bottom: 75px;
			.paging {
				ul {
					li {
						height: 30px;
						line-height: 30px;
						padding: 0 8px;
						margin-right: 5px;
					}
					.put-jump {
						height: 30px;
						line-height: 30px;
					}
				}
			}
		}
		.no-search {
			width: 100%;
			height: 500px;
			border-top-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
