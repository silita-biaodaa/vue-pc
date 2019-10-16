<template>
	<div class="law" v-loading="loading" element-loading-text="拼命加载中">
		<div class="law-search">
			<div class="left law-wei">
				裁判文书（{{this.total}}）
			</div>
		</div>
		<div class="law-list">
			<div class="law-nav">
				<div class="left" style="width:72px">序号</div>
				<div class="left" style="width:250px">案件名称</div>
				<div class="left" style="width:150px">法院</div>
				<div class="left" style="width:200px">案号</div>
				<div class="left" style="width:100px">时间</div>
			</div>
			<div class="law-text" @click="jumpDetail(el.id)" v-for="(el,i) in lawList" :key="i" v-show="!result">
				<div class="left" style="width:72px">{{(current-1)*20+(i+1)}}</div>
				<div class="left law-pdd" style="width:250px">{{el.title}}</div>
				<div class="left" style="width:150px">{{el.court}}</div>
				<div class="left" style="width:200px">{{el.caseNo}}</div>
				<div class="left" style="width:100px">{{el.dateStr}}</div>
			</div>
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
				if (localStorage.getItem('permissions') == '') {
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

		.law-list {
			border: 1px solid #f2f2f2;

			.law-nav {
				height: 40px;
				border-bottom: 1px solid #f2f2f2;
				line-height: 40px;
				font-size: 12px;
				color: #333;
				text-align: center;
				font-weight: 550;
			}

			.law-text {
				cursor: pointer;
				min-height: 40px;
				border-bottom: 1px solid #f2f2f2;
				font-size: 12px;
				color: #333;
				text-align: center;
				font-weight: 550;
				display: flex;
				align-items: center;
				box-sizing: border-box;

				.law-pdd {
					padding: 10px 20px;
					box-sizing: border-box;
				}
			}
		}

		.law-page {
			// height: 200px;
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
