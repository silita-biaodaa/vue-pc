<template>
	<div class="achievement" v-loading="loading" element-loading-text="拼命加载中" @keyup.enter="searchBid">
		<div class="e-nav">
			<span class="e-wei">
				中标公告({{total}})
			</span>
			<div>
				<el-input placeholder="请输入关键字搜索" suffix-icon="el-icon-search" @change="searchBid" v-model="search">
				</el-input>
			</div>
		</div>
		<div class="e-table">
			<div class="e-list" v-for="(el,i) in bidList" :key="i" v-show="!result" @click="jump(el)">
				<div e-title>
					<div class="e-title">
						<div class="left">
							{{(current-1)*20+(i+1)}}
						</div>
						<p class="left e-p">
							{{el.title}}
						</p>
						<div class="right">
							{{el.openDate}}
						</div>
					</div>
					<div class="e-peo">
						<p>
							{{el.oneName ? '第一候选人:' + el.oneName : '详见原文'}}
						</p>
						<div>
							中标金额:{{el.oneOffer ?   el.oneOffer + "万" : '详见原文'}}
						</div>
					</div>

				</div>
			</div>


			<div class="no-toast" v-show="result">
				<img src="../../assets/img/bank_card @2x.png" alt="">
				<span>Sorry，暂未查询到该公司的中标信息</span>
			</div>
		</div>
		<div class="e-page" v-show="!result">
			<nav-page :all='total' :currents='current' @skip='Goto'></nav-page>
		</div>
	</div>
</template>
<script>
	import {
		queryList
	} from '@/api/index';
	export default {
		data() {
			return {
				search: '',
				bidList: [],
				current: 1,
				total: 0,
				name: '',
				result: false,
				source: '',
				loading: true
			}
		},
		methods: {
			gainList() {
				let that = this;
				this.name = this.$route.query.name
				this.$http({
					method: 'post',
					data: {
						comName: this.name,
						pageNo: this.current,
						title: this.search,
						pageSize: 20,
					},
					url: '/newnocite/company/zhongbiao/list'
				}).then(res => {
					if (res.data.code == 1) {
						that.bidList = res.data.data
						that.current = res.data.pageNo
						that.total = res.data.total
						if (this.bidList.length == 0) {
							that.result = true
						} else {
							that.result = false
						}
						that.loading = false
					} else {
						that.$alert(res.data.msg);
					}
				})
				// queryList({pageNo:this.current,pageSize:20,type:2,regions:'hunan',com_name:this.name,title:this.search,sumType:"zhongbiao"}).then(res => {
				//   if(res.code == 1) {
				//      this.bidList = res.data
				//      this.current = res.pageNo
				//      this.total = res.total
				//      if(this.bidList.length ==0 ) {
				//        this.result = true
				//      } else {
				//        this.result = false
				//      }
				//      this.loading = false
				//   }
				// })
			},
			Goto(val) {
				this.current = val.cur
				this.gainList()
				this.funcom.toList(200)
			},
			searchBid() {
				this.current = 1
				this.gainList()
			},
			jump(el) {
				const {
					href
				} = this.$router.resolve({
					path: '/notice',
					query: {
						id: el.id,
						source: el.source
					}
				})
				window.open(href, '_blank')
			}
		},
		created() {
			this.source = this.$route.query.source
			this.gainList()
		},
		components: {}
	}
</script>
<style lang="less">
	.achievement {
		background-color: #fff;

		.el-loading-spinner .path {
			stroke: #FE6603;
		}

		.el-loading-spinner .el-loading-text {
			color: #FE6603;
		}

		.e-nav {
			font-size: 14px;
			color: #333;
			height: 56px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 10px 0 23px;
			box-sizing: border-box;

			.e-wei {
				font-weight: 550;
			}
		}

		.e-table {
			margin: 0 10px;
			border: 1px solid #f2f2f2;
			font-size: 12px;
			color: #333;
			font-weight: 550;

			.e-list {
				cursor: pointer;
				height: 65px;
				padding: 15px 18px 0 18px;
				border-bottom: 1px solid #f2f2f2;
				box-sizing: border-box;

				.e-title {
					overflow: hidden;
				}

				.e-p {
					margin-left: 20px;
					width: 500px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.e-peo {
					margin-top: 9px;
					margin-left: 33px;
					display: flex;
					justify-content: space-between;
					color: #FE6603;
				}
			}
		}

		.e-page {
			display: flex;
			justify-content: center;
			padding-top: 50px;
			padding-bottom: 75px;

			// height: 150px;
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
