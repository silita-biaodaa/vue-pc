<template>
	<div class="build">
		<en-search @vague='entitle' :title="serach" @company="companyFn"></en-search>
		<div class="total">
			共找到<span class="p-color">{{total}}</span>条在建信息(仅查询湖南省在建信息)
		</div>
		<div class="build-list">
			<div class="build-table">
				<div style="width:80px;">
					序号
				</div>
				<div style="width:150px;">
					姓名
				</div>
				<div style="width:250px;">
					单位名称
				</div>
				<div style="width:300px;">
					工程名称
				</div>
				<div style="width:240px;">
					岗位类别
				</div>
			</div>
			<!-- 判断是否加载中 -->
			<template v-if="isajax">
				<!-- 有数据 -->
				<template v-if="list&&list.length>0">
					<a class="build-in" v-for="(el,i) in list" :key="i" @click="tobuild(el)">
						<div style="width:80px;">
							{{(data.pageNo-1)*20+(i+1)}}
						</div>
						<div style="width:150px;">
							{{el.name}}
						</div>
						<div style="width:250px;">
							{{el.unitOrg}}
						</div>
						<div style="width:300px;">
							{{el.proName}}
						</div>
						<div style="width:240px;">
							{{el.type}}
						</div>
					</a>
					<div class="page">
						<nav-page :all='total' :currents='data.pageNo' @skip='Goto'></nav-page>
					</div>
				</template>
				<!-- 无数据  -->
				<template v-else-if="list&&list.length==0">
					<div class="no-toast">
						<img src="../../assets/img/bank_card @2x.png" alt="">
						<span>Sorry，没有找到相关在建信息</span>
					</div>
				</template>
				<!-- 加载失败 -->
				<template v-else-if="!list">
					<div class="ajax-erroe">
						<img src="../../assets/img/pic-zoudiu.png" />
						<span @click="recoldFn">刷新</span>
					</div>
				</template>
			</template>
			<template v-else>
				<div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
			</template>


		</div>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
	</div>
</template>
<script>
	import {
		under,
		underq
	} from '@/api/index'
	export default {
		data() {
			return {
				// name:'',
				// idcard:'',
				total: 0,
				list: [],
				// noList:false,
				// title:'',
				svip: false,
				serach: '',
				data: {
					name: '',
					pageNo: 1,
					pageSize: '20',
					searchType: 0,
					idCard: ''
				},
				isajax: false,
				loading: true,
			}
		},
		inject: ['reload'],
		created() {
			this.serach = localStorage.getItem('title') ? localStorage.getItem('title') : ''
			//如果是刷新操作，则复现上次
			if (sessionStorage.getItem('zjSerach')) {
				let data = JSON.parse(sessionStorage.getItem('zjSerach'));
				this.data = data;
				this.serach = data.name;
				if (this.data.idCard != '') {
					this.serach = this.data.idCard;
				}
			}
			if (this.data.idCard != '') {
				let that = this;
				let idcard = this.data.idCard.replace(/x/g, 'X');
				underq({
					name: 'aaaa',
					idCard: idcard,
					type: 'api'
				}).then(res => {
					that.isajax = true;
					if (res.code == 1) {
						if (res.data.length == 0) {
							this.$confirm('该人员无在建信息', '提示', {
								showCancelButton: false,
								showConfirmButton: false,
								type: 'warning'
							})
						} else {
							that.list = res.data;
							that.total = res.data.length;
							// const { href } = this.$router.resolve({
							//   path:'/certifi',query:{card:idcard} 
							// })
							//   window.open(href, '_blank', )
						}
					} else {
						this.$confirm(res.msg, '提示', {
							showCancelButton: false,
							showConfirmButton: false,
							type: 'warning'
						})
					}
				})
			} else {
				this.gainList(this.serach)
			}

		},
		methods: {
			entitle(val) {
				if (localStorage.getItem('permissions') == '') {
					this.svip = true
					this.modalHelper.afterOpen();
					return
				}
				let that = this;
				this.serach = val.cur;
				let reNumber = /^\d+$/;
				if (reNumber.test(this.serach[0])) { //判断第一位是否为数字,则进身份证
					let sfz =
						/^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
					if (!sfz.test(this.serach)) {
						this.$confirm('请输入正确的身份证号', '提示', {
							showCancelButton: false,
							showConfirmButton: false,
							type: 'warning'
						})
						return
					}
					this.isajax = false;
					this.data.idCard = this.serach;
					let idcard = this.serach.replace(/x/g, 'X');
					underq({
						name: 'aaaa',
						idCard: idcard,
						type: 'api'
					}).then(res => {
						this.isajax = true;
						if (res.code == 1) {
							if (res.data.length == 0) {
								this.$confirm('该人员无在建信息', '提示', {
									showCancelButton: false,
									showConfirmButton: false,
									type: 'warning'
								})
							} else {
								that.list = res.data;
								that.total = res.data.length;
								const {
									href
								} = this.$router.resolve({
									path: '/certifi',
									query: {
										card: idcard
									}
								})
								window.open(href, '_blank', )
							}
						} else {
							this.$confirm(res.msg, '提示', {
								showCancelButton: false,
								showConfirmButton: false,
								type: 'warning'
							})
						}
					})
				} else {
					this.isajax = false;
					this.list = [];
					this.data.pageNo = 1;
					this.gainList(this.serach);
				}

			},
			closeload(val) {
				this.svip = val.cur
			},
			tobuild(el) {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					if (localStorage.getItem('permissions') == '') {
						this.svip = true
						this.modalHelper.afterOpen();
					} else {
						const {
							href
						} = this.$router.resolve({
							path: '/certifi',
							query: {
								id: el.pkid
							}
						})
						window.open(href, '_blank', )
					}
				} else {
					this.$confirm(this.qjTipTxt, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					})
				}
			},
			gainList(name = null) {
				let that = this;
				let data = this.data;
				if (this.data.searchType == 1) {
					data.name = this.serach;
				}
				if (name != null) {
					data.name = name;
					this.serach = name;
				}
				under(data).then(res => {
					this.isajax = true;
					if (res.code == 1) {
						this.total = res.total
						this.list = res.data
					}
				}).catch(function(res) {
					that.isajax = true;
					that.list = null;
				})
			},
			Goto(val) {
				this.isajax = false;
				this.list = [];
				this.data.pageNo = val.cur;
				this.funcom.toList(205)
				this.gainList()
			},
			companyFn(val) { //企业搜索
				if (localStorage.getItem('permissions') == '') {
					this.svip = true
					this.modalHelper.afterOpen();
					return
				}
				this.list = [];
				this.data.searchType = 1;
				this.serach = val.cur;
				this.data.pageNo = 1
				this.isajax = false;
				this.gainList()
			},
			//刷新
			recoldFn() {
				this.reload();
			}
		},
		watch: {
			data: { //监听data变化，并实时保存
				deep: true,
				handler(val, old) {
					sessionStorage.setItem('zjSerach', JSON.stringify(val));
				}
			}
		},
		beforeDestroy() {
			sessionStorage.removeItem('zjSerach')
		},
	}
</script>
<style lang="less" scoped>
	.build {
		padding-top: 85px;

		.build-put {
			width: 1020px;
			margin: 0 auto;
			box-sizing: border-box;
			height: 282px;
			background-color: #fff;
			padding: 19px 20px;
			margin-top: 20px;

			.build-hint {
				font-size: 12px;
				color: #999;
				position: relative;
				overflow: hidden;

				i {
					color: red;
					margin-right: 5px;
					font-size: 20px;
				}

				span {
					position: absolute;
					top: -2px;
				}

			}

			.mt-30 {
				margin-top: 30px;
			}

			.put-id {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 14px;
			}

			.build-btn {
				display: flex;
				justify-content: center;
				margin-top: 60px;

				.btn-name {
					width: 154px;
					height: 46px;
					background: rgba(254, 102, 3, 1);
					border-radius: 5px;
					font-size: 16px;
					color: #fff;
					line-height: 46px;
					text-align: center;
					cursor: pointer;
				}
			}
		}

		.build-list {
			width: 1020px;
			margin: 0 auto;
			background-color: #fff;
			margin-bottom: 125px;

			.build-table {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 60px;
				font-size: 16px;
				font-weight: 550;
				color: #333;
				text-align: center;
				border-bottom: 1px solid #f2f2f2;
			}

			.build-in {
				display: flex;
				flex-direction: row;
				align-items: center;
				text-align: center;
				border-bottom: 1px solid #f2f2f2;
				min-height: 60px;
				font-size: 16px;
				color: #999;
				cursor: pointer;

			}

			a:hover {
				color: #FE6603
			}

			.noneS {
				width: 1020px;
				margin: 0 auto;
				background-color: #fff;
				height: 582px;
				margin-bottom: 100px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

		}
	}
</style>
