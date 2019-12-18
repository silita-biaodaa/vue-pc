<template>
	<div class="introduce">
		<v-bread :breadList="[{ title: '企业'},{title:title},{title:name}]"></v-bread>
		<div class="com-title">
			<div class="com-img left">
				<img src="../assets/img/company.png" alt="">
			</div>
			<div class="com-detail left">
				<div class="flex-box">
					<p class="c-name">{{details.comName}}</p>
					<div class="right-box">
						<span v-if="details.updated">更新时间:{{formatDate((details.updated)*1,1)}}</span>
						<span class="update" @click="updateFn">更新</span>
						<div class="attention" :class="iscollect ? 'collect' : ''" @click="gaincollect">
							<i class="el-icon-plus"></i>{{collect}}
						</div>
					</div>
				</div>

				<div class="c-state">
					{{details.subsist}}&nbsp
				</div>
				<div class="c-all">
					<div class="left">
						<p>电话：{{details.phone == 'NULL-' ? '' : details.phone}} <span @click="jumpapp">更多号码请下载APP</span></p>
						<p>邮箱：{{ details.email == '(NULL)' || 'null' ? '--' : details.email }}</p>
					</div>
					<div class="left">
						<p :title="details.comUrl">网址：
							<template v-if="details.comUrl">
								<span @click="jumpTo(details.comUrl)" class="urlCss">{{details.comUrl}}</span>
							</template>
							<template v-else>--</template>
						</p>
						<p :title="details.comAddress">地址：{{details.comAddress ? details.comAddress : '--' }}</p>
					</div>
				</div>
			</div>

		</div>
		<div class="left-right-box">
			<div class="user-tab bor-r">
				<div v-for="(el,i) in navs" class="tab" :key="i" :class="el.name == name ? 'current':''" @click="anchor(el)">
					{{el.name}}
				</div>
			</div>
			<div class="right-box">
				<router-view />
			</div>
		</div>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>

	</div>
</template>
<script>
	import {
		CQdetails,
		getJsonData,
		collectionCompany,
		nocollectionCompany
	} from '@/api/index'
	export default {
		data() {
			return {
				navs: [{
						name: '工商信息',
						i: 0,
						show: true,
						to: 'icbc',
						id: 1
					},
					{
						name: '法务信息',
						i: 1,
						show: false,
						to: 'law'
					}, {
						name: '资质信息',
						i: 2,
						show: false,
						to: 'intell'
					}, {
						name: '人员信息',
						i: 3,
						show: false,
						to: 'personnel'
					}, {
						name: '业绩信息',
						i: 4,
						show: false,
						to: 'centre'
					}, {
						name: '中标信息',
						i: 5,
						show: false,
						to: 'achievement'
					}, {
						name: '诚信信息',
						i: 6,
						show: false,
						to: 'good'
					}
				],
				svip: false,
				name: '工商信息',
				details: {},
				id: '',
				title: '',
				source: '',
				collect: '关注',
				iscollect: false
			}
		},
		watch: {
			$route(to, form) {
				this.navs.forEach(el => {
					el.show = false
				})
				this.name = this.navs[this.$route.meta.i].name
				this.navs[this.$route.meta.i].show = true
			}
		},
		methods: {
			gaincollect() {
				if (this.iscollect) {
					nocollectionCompany({
						companyid: this.id
					}).then(res => {

						if (res.code = 1) {
							this.iscollect = false
							this.collect = '关注'
						}
					})
				} else {
					collectionCompany({
						companyid: this.id
					}).then(res => {
						if (res.code = 1) {
							this.iscollect = true
							this.collect = '已关注'
						}
					})
				}
			},
			closeload(val) {
				this.svip = val.cur
			},
			anchor(el) {
				this.name = el.name
				this.navs.forEach(el => {
					el.show = false
				})
				el.show = true
				this.$router.push({
					path: el.to,
					query: {
						id: el.id,
						name: el.title,
						source: el.source
					}
				})
			},
			resetPhone(phone) {
				var str = String(phone)
				var len = str.length;
				if (len >= 7) {
					if (len == 11) {
						var reg = str.slice(3, 7)
						return str.replace(reg, "****")
					} else {
						var reg = str.slice(5, 9)
						return str.replace(reg, "****")
					}

				} else if (len < 7 && len >= 6) {
					//1234567
					var reg = str.slice(-4, -2)
					return str.replace(reg, "**")
				}
			},
			gainDetail() {
				this.id = this.$route.query.id
				let dataParam = JSON.stringify({});
				getJsonData("/company/" + this.id).then(res => {
					if (res.code == 1) {
						this.$route.query.source=res.data.regisAddress
						this.details = res.data
						this.iscollect = res.data.collected
						if (this.iscollect) {
							this.collect = '已关注'
						} else {
							this.collect = '关注'
						}
						var arr = []
						if (this.details.phone) {
							arr = this.details.phone.split(';')
							if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
								this.details.phone = this.resetPhone(arr[0])
							} else {
								this.details.phone = arr[0]
							}
						}
					}
				});
			},
			gainNav() {
				var is = this.$route.meta.i
				this.name = this.navs[is].name
				this.navs[0].show = false
				this.navs[is].show = true
			},
			deploy() {
				this.navs.forEach(el => {
					el.id = this.id
					el.title = this.title
					el.source = this.source
				})
			},
			jump() {
				if (!this.details.comUrl) {
					return
				}
				if (this.details.comUrl.indexOf('http://') == -1) {
					window.open('http://' + this.details.comUrl)
				} else {
					window.open(this.details.comUrl)
				}
			},
			jumpapp() {
				const {
					href
				} = this.$router.resolve({
					path: '/download'
				})
				window.open(href, '_blank')
			},
			updateFn() { //更新
				if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
					this.svip = true
					this.modalHelper.afterOpen();
					this.pbMode = [];
					return false
				}
				let that = this;
				this.$http({
					method: 'post',
					url: '/updated/company',
					data: {
						comName: that.$route.query.name,
						comId: that.$route.query.id
					}
				}).then(function(res) {
					that.$alert(res.data.msg, '提示')
				})
			},
			jumpTo(uri) {
				if (uri.indexOf('http://') == -1) {
					uri = 'http://' + uri;
				}
				window.open(uri, '_blank')
			}
		},
		created() {
			this.source = this.$route.query.source
			this.title = this.$route.query.name
			this.gainDetail()
			this.gainNav()
			this.deploy()

		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.introduce {
		width: 1020px;
		margin: 0 auto 20px;
		// .com-title {
		// 	width: 100%;
		// 	padding: 17px 0 20px 20px;
		// 	overflow: hidden;
		// 	background-color: #fff;
		// 	box-sizing: border-box;

		// 	.attention {
		// 		margin-right: 30px;
		// 		width: 62px;
		// 		line-height: 22px;
		// 		border: 1px solid #FE6603;
		// 		text-align: center;
		// 		font-size: 14px;
		// 		border-radius: 5px;
		// 		color: #FE6603;
		// 		cursor: pointer;

		// 		i {
		// 			font-size: 12px;
		// 		}
		// 	}

		// 	.collect {
		// 		color: #fff;
		// 		background-color: #FE6603;

		// 		i {
		// 			color: #fff;
		// 		}
		// 	}

		// 	.com-img {
		// 		height: 75px;
		// 		width: 75px;
		// 		border-radius: 5px;
		// 		margin-right: 25px;
		// 		overflow: hidden;
		// 	}

		// 	.com-detail {
		// 		width: calc(100% - 100px);

		// 		.c-name {
		// 			font-size: 18px;
		// 			font-weight: 550;
		// 		}

		// 		.c-state {

		// 			display: inline-block;
		// 			padding: 0 5px;
		// 			height: 16px;
		// 			background-color: #E4FFF0;
		// 			margin-left: 5px;
		// 			margin-top: 9px;
		// 			font-size: 12px;
		// 			color: #53E494;
		// 			text-align: center;
		// 		}

		// 		.c-all {
		// 			font-size: 12px;
		// 			color: #666666;
		// 			padding: 13px 0 0 10px;
		// 			width: 700px;
		// 			overflow: hidden;
		// 			background-color: #F5FAFF;
		// 			margin-top: 5px;

		// 			div {
		// 				width: 50%;

		// 				p {
		// 					margin-bottom: 13px;
		// 					text-overflow: ellipsis;
		// 					overflow: hidden;
		// 					white-space: nowrap;

		// 					span {
		// 						color: #FE6603;
		// 						cursor: pointer;
		// 					}
		// 				}
		// 			}
		// 		}

		// 	}
		// 	.c-over {
		// 		font-size: 14px;
		// 		margin-right: 20px;
		// 		color: #333;
		// 		font-weight: 550;
		// 	}
		// }
		// .flex-box {
		// 	display: flex;
		// 	justify-content: space-between;
		// 	align-items: center;

		// 	.right-box {
		// 		display: flex;
		// 		align-items: center;

		// 		.update {
		// 			background: #fff;
		// 			border: 1px solid #FE6603;
		// 			border-radius: 5px;
		// 			cursor: pointer;
		// 			color: #FE6603;
		// 			width: 62px;
		// 			line-height: 22px;
		// 			text-align: center;
		// 			display: inline-block;
		// 		}

		// 		span {
		// 			margin-right: 20px;
		// 			font-size: 14px;
		// 		}
		// 	}
		// }
	}
</style>
