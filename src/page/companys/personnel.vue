<template>
	<div class="law" v-loading="loading" element-loading-text="拼命加载中">
		<div class="law-search">
			<div class="left law-wei">
				注册人员（{{this.total}}）
			</div>
			<div class="law-year left">
				<el-select v-model="mold" clearable placeholder="选择注册类别" @change="newList">
					<el-option v-for="item in options" :key="item.category" :label="item.category" :value="item.category">
					</el-option>
				</el-select>
			</div>
			<div class="right law-w">
				<el-input placeholder="请输入人员姓名" suffix-icon="el-icon-search" @change="newList" @keyup.enter="newList" v-model="search">
				</el-input>
			</div>
		</div>
		<div v-show="!result">
			<div class="law-list">
				<div class="law-nav">
					<div class="left" style="width:52px">
						序号
					</div>
					<div class="left" style="width:80px">
						姓名
					</div>
					<div class="left" style="width:140px">
						注册类别
					</div>
					<div class="left" style="width:150px">
						证书编号
					</div>
					<div class="left" style="width:160px">
						专业
					</div>
					<div class="left" style="width:100px">
						有效日期
					</div>
					<div class="left" style="width:90px">

					</div>
				</div>
				<div class="law-text" v-for="(el,i) in lawList" :key="i" @click="toPer(el)">
					<div class="left" style="width:52px">
						{{(current-1)*20+(i+1)}}
					</div>
					<div class="left" style="width:80px">
						{{el.name}}
					</div>
					<div class="left" style="width:140px">
						{{el.category}}
					</div>
					<div class="left" style="width:150px">
						{{el.certNo}}
					</div>
					<div class="left" style="width:160px">
						{{el.major}}
					</div>
					<div class="left" style="width:100px">
						{{el.validDate}}
					</div>
					<div class="left law-cen" style="width:90px">
						<div class="crew-btn" @click.stop="jumpya(el)" v-if="el.isUnder">
							押证
						</div>
					</div>
				</div>
			</div>
			<div class="law-page">
				<nav-page :all='total' :currents='current' @skip='Goto'></nav-page>
			</div>
		</div>
		<div class="no-toast" v-show="result">
			<img src="../../assets/img/bank_card @2x.png" alt="">
			<span>Sorry，暂未查询到该公司的人员信息</span>
		</div>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
	</div>
</template>
<script>
	import {
		Person,
		getJsonData
	} from '@/api/index'
	export default {
		data() {
			return {
				mold: '',
				search: '',
				lawList: [],
				total: 0,
				current: 1,
				options: [],
				id: '',
				result: false,
				source: '',
				loading: true,
				svip: false
			}
		},
		methods: {
			gainList() {
				this.id = this.$route.query.id
				this.source = this.$route.query.source
				Person({
					keyWord: this.search,
					comId: this.id,
					category: this.mold,
					pageNo: this.current,
					pageSize: 20,
					province: this.source
				}).then(res => {
					if (res.code == 1) {
						this.lawList = res.data
						this.current = res.pageNum
						this.total = res.total
						if (this.lawList.length == 0) {
							this.result = true
						} else {
							this.result = false
						}
						this.loading = false
					}
				})
			},
			toPer(el) {
				//  if(localStorage.getItem('permissions') == '') {
				//     this.svip = true
				//     this.modalHelper.afterOpen();
				//  } else {
				const {
					href
				} = this.$router.resolve({
					path: '/personnel',
					query: {
						certNo: el.certNo,
						comId: el.comId,
						comName: el.comName,
						idCard: el.idCard,
						sex: el.sex,
						tabCode: el.tabCode,
						name: el.name,
						innerid: el.innerid
					}
				})
				window.open(href, '_blank', )
				//  }  

			},
			jumpya(el) {
				if (localStorage.getItem('permissions') == '') {
					this.svip = true
					this.modalHelper.afterOpen();
				} else {
					const {
						href
					} = this.$router.resolve({
						path: '/personnel/escort',
						query: {
							certNo: el.certNo,
							comId: el.comId,
							comName: el.comName,
							idCard: el.idCard,
							sex: el.sex,
							tabCode: el.tabCode,
							name: el.name,
							innerid: el.innerid
						}
					})
					window.open(href, '_blank', )
				}

			},
			closeload(val) {
				this.svip = val.cur
			},
			Goto(val) {
				this.current = val.cur
				this.gainList()
				this.funcom.toList(200)
			},
			gainCategory() {
				let dataParam = JSON.stringify({

				});
				getJsonData("/company/personCategory/" + this.id).then(res => {
					if (res.code == 1) {
						this.options = res.data
					}
				});
			},
			newList() {
				this.current = 1
				this.gainList()
			}
		},
		watch: {
			$route(to, form) {
				// this.navs.forEach( el => {
				//    el.show = false
				// })
				// this.name = this.navs[this.$route.meta.i].name
				// this.navs[this.$route.meta.i].show = true
			}
		},
		created() {
			this.gainList()
			this.gainCategory()
		},
		components: {}
	}
</script>
<style lang="less">
	.law {
		background-color: #fff;
		padding: 0 9px;

		.no-search {
			width: 100%;
			height: 500px;
			border-top-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.el-loading-spinner .path {
			stroke: #FE6603;
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

			.law-year {}

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
				min-height: 40px;
				border-bottom: 1px solid #f2f2f2;
				font-size: 12px;
				color: #333;
				text-align: center;
				font-weight: 550;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				cursor: pointer;

				.law-pdd {
					padding: 10px 20px;
					box-sizing: border-box;
				}

				.law-cen {
					display: flex;
					justify-content: center;
				}

				.crew-btn {
					width: 60px;
					line-height: 22px;
					border: 1px solid rgba(254, 102, 3, 1);
					font-size: 12px;
					border-radius: 5px;
					color: #FE6603;
					text-align: center;
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
	}
</style>
