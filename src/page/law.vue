<template>
	<div class="law">
		<en-search @vague='entitle' :title="data.keyWord" :company="true"></en-search>
		<per-time @time='gaintime' :timeTxt="'判决时间'" class="option-box"></per-time>
		<div class="total">
			共找到<span class="p-color">{{total}}</span>条法务信息
		</div>
		<div class="build-list">
			<div class="build-table">
				<div style="width:80px;">序号</div>
				<div style="width:300px;">标题</div>
				<div style="width:240px;">法院</div>
				<div style="width:200px;">案号</div>
				<div style="width:200px;">发布日期</div>
			</div>
			<!-- 判断是否加载中 -->
			<template v-if="isajax">
				<!-- 有数据 -->
				<template v-if="list&&list.length>0">
					<a class="build-in" v-for="(el,i) in list" :key="i" @click="toDetail(el)">
						<div style="width:80px;">{{(data.pageNo-1)*20+(i+1)}}</div>
						<div style="width:300px;">{{el.title}}</div>
						<div style="width:240px;">{{el.court}}</div>
						<div style="width:200px;">{{el.caseNo}}</div>
						<div style="width:200px;">{{el.dateStr}}</div>
					</a>
					<div class="page">
						<nav-page :all='total' :currents='data.pageNo' @skip='Goto'></nav-page>
					</div>
				</template>
				<!-- 无数据  -->
				<template v-else-if="list&&list.length==0">
					<div class="no-toast">
						<img src="../assets/img/bank_card @2x.png" alt="">
						<span>Sorry，没有找到符合条件的法务信息</span>
					</div>
				</template>
				<!-- 加载失败 -->
				<template v-else-if="!list">
					<div class="ajax-erroe">
						<img src="../assets/img/pic-zoudiu.png" />
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
	export default {
		name: 'law',
		data() {
			return {
				total: 0,
				list: [],
				svip: false,
				serach: '',
				data: {
					keyWord: '',
					pageNo: 1,
					pageSize: '20',
					searchType: 0,
					start: null,
					end: null
				},
				isajax: false,
				loading: true,
			}
		},
		inject: ['reload'],
		created() {
			this.data.keyWord = localStorage.getItem('title') ? localStorage.getItem('title') : '';
			//如果是刷新操作，则复现上次
			if (sessionStorage.getItem('fwSerach')) {
				let data = JSON.parse(sessionStorage.getItem('fwSerach'));
				this.data = data;
			}
			this.gainList();
		},
		methods: {
			gaintime(val) {
				this.data.start = val.old
				this.data.end = val.new
				if (val.old == '' && val.new == '') {
					this.data.start = null
					this.data.end = null
				}
				this.list = []
				this.data.pageNo = 1
				this.isajax = false;
				this.gainList()
			},
			entitle(val) {
				this.data.keyWord = val.cur;
				this.list = []
				this.data.pageNo = 1
				this.isajax = false;
				this.gainList()
			},
			closeload(val) {
				this.svip = val.cur
			},
			toDetail(el) {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					// this.perlist[el].is = true
					if (localStorage.getItem('permissions')) {
						el.is = true
						const {
							href
						} = this.$router.resolve({
							path: '/lawDetail',
							query: {
								id: el.id
							}
						})
						window.open(href, '_blank', )
					} else {
						this.svip = true
						this.modalHelper.afterOpen();
					}
				} else {
					this.$confirm(this.qjTipTxt, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					}).catch(() => {

					});
				}
			},
			gainList() {
				let that = this;
				console.log(that.data);
				this.$http({
					method: 'post',
					url: '/law/list',
					data: that.data
				}).then(function(res) {
					that.isajax = true;
					if (res.data.code == 1) {
						that.total = res.data.total
						that.list = res.data.data
					} else {
						this.$confirm(res.msg, '提示', {
							showCancelButton: false,
							showConfirmButton: false,
							type: 'warning'
						})
					}
				}).catch(function(res) {
					that.isajax = true;
					that.list = null;
				})
			},
			Goto(val) {
				this.data.pageNo = val.cur;
				sessionStorage.setItem('pageNo', val.cur);
				this.list = [];
				this.funcom.toList(285)
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
					sessionStorage.setItem('fwSerach', JSON.stringify(val));
				}
			}
		},
		beforeDestroy() {
			sessionStorage.removeItem('fwSerach')
		},
	}
</script>
<style lang="less" scoped>
	.law {
		background: #fafafa;
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

		.perpor {
			width: 1020px;
			margin: 20px auto 0;

			.select {
				margin-bottom: 0;
			}
		}
	}
</style>
