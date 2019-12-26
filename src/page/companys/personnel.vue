<template>
	<div class="law" v-loading="loading" element-loading-text="拼命加载中">
		<div class="law-search">
			<div class="left law-wei">
				注册人员（{{this.total}}）
			</div>
			<!-- <div class="law-year left">
			
			</div> -->
			<div class="right law-w">
				<el-input placeholder="输入关键字，查找资质" prefix-icon="el-icon-search" @change="newList" @keyup.enter="newList" v-model="search">
				</el-input>
			</div>
		</div>
		<div class="law-select" >
				<el-select v-model="mold" clearable placeholder="选择注册类别" @change="newList">
					<el-option v-for="item in options" :key="item.category" :label="item.category" :value="item.category">
					</el-option>
				</el-select>
				<!-- <el-select v-model="mold" clearable placeholder="请选择证书等级" @change="newList">
					<el-option v-for="item in options" :key="item.category" :label="item.category" :value="item.category">
					</el-option>
				</el-select>
				<el-select v-model="mold" clearable placeholder="请选择证书专业" @change="newList">
					<el-option v-for="item in options" :key="item.category" :label="item.category" :value="item.category">
					</el-option>
				</el-select> -->
		</div>
		<div v-show="!result">
				<table class="table-content">
						<tr>
							<td  style="width:52px">序号</td>
							<td  style="width:80px">姓名</td>
							<td  style="width:130px">注册类别</td>
							<td  style="width:140px">证书编号</td>
							<td  style="width:150px">专业</td>
							<td  style="width:130px">有效日期</td>
							<td  style="width:90px">操作 </td>
						</tr>
						<tr v-for="(el,i) in lawList" :key="i" >
							<td>{{(current-1)*20+(i+1)}}</td>
							<td @click="toPer(el)" class="tb-name" >{{el.name}}</td>
							<td>{{el.category}}</td>
							<td>{{el.certNo}}</td>
							<td>{{el.major}}</td>
							<td>{{el.validDate}}</td>
							<td>
									<div class="crew-btn" @click.stop="jumpya(el)" v-if="el.isUnder">
										押证
									</div>
							</td>

						</tr>
					</table>
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
				//  if(localStorage.getItem('isvip')=='false') {
				//     this.svip = true
				//     this.modalHelper.afterOpen();
				//  } else {
				let data= {
					certNo: el.certNo,
					comId: el.comId,
					comName: el.comName,
					idCard: el.idCard,
					sex: el.sex,
					tabCode: el.tabCode,
					name: el.name,
					innerid: el.innerid,
					sealNo:el.sealNo
				}
				sessionStorage.setItem('peopleData',JSON.stringify(data));
				const {
					href
				} = this.$router.resolve({
					path: '/personnel',
				})
				window.open(href, '_blank', )
				//  }  

			},
			jumpya(el) {
				if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
					this.svip = true
					this.modalHelper.afterOpen();
				} else {
					let data= {
						certNo: el.certNo,
						comId: el.comId,
						comName: el.comName,
						idCard: el.idCard,
						sex: el.sex,
						tabCode: el.tabCode,
						name: el.name,
						innerid: el.innerid,
						sealNo:el.sealNo
					}
					sessionStorage.setItem('peopleData',JSON.stringify(data));
					const {
						href
					} = this.$router.resolve({
						path: '/personnel/escort',
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
		.law-select {
			display: flex;
			margin: 10px 0 20px;
			.el-select {
				width: 200px;
				margin-right: 12px;
			}
		}
		.law-search {
			height: 48px;
			line-height: 48px;
			// padding: 0 12px;
			font-size: 14px;
			color: #333;
			.law-wei {
				font-weight: 550;
				margin-right: 25px;
			}
			.law-w {
				.el-input__inner {
					background-color: #F4F4F4;
					i {
						color: #B6B6B6;
					}
				}

			}
		}
				.crew-btn {
					width: 56px;
					line-height: 28px;
					border: 1px solid rgba(254, 102, 3, 1);
					font-size: 14px;
					border-radius: 8px;
					color: #FE6603;
					text-align: center;
					margin: 0 auto;
				}
				.table-content {
					width: 844px;
					.tb-name {
						color: #4494F0;
						text-decoration: underline;
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
	}
</style>
