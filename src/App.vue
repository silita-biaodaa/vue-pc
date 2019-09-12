<template>
	<div id="app" ref="top">
		<!-- 头部 -->
		<div class="fixation" v-show="excom">
			<div class="app-header">
				<div class="contact">
					<div class="contact-l">
						<p class="left">
							您好,欢迎来到标大大!
						</p>
						<p class="left">
							<i class="iconfont icon-dianhua1 left calling"></i>
							0731-85076077
						</p>
						<router-link :to="{path:'/download'}" tag="a" target='_blank' class="left">
							<i class="iconfont icon-shouji left l-mobile"></i>
							下载APP
						</router-link>
						<p class="left" style="cursor: pointer;" @click="tovip">
							<i class="iconfont icon-VIP1 left person"></i>
							会员服务
						</p>
						<p class="left" style="cursor: pointer;verticalAlign:middle" @click="toinfo">
							<i class="iconfont icon-youxiang left person we-us">
								<div class="us-red" v-show="ishow"></div>
							</i>
							<span>我的消息</span>
						</p>
						<router-link :to="{path:'/about'}" tag="a" target='_blank' class="left">
							<p class="left" style="cursor: pointer;">
								<i class="iconfont icon-lianxiren left person"></i>
								关于我们
							</p>
						</router-link>

					</div>
					<div class="contact-r">

						<p @click="jumpen" v-if="names">
							免费注册
						</p>
						<p class="line" v-if="names">
						</p>
						<p @click="jumpl" v-if="names">
							请登录
						</p>
						<user-center v-else></user-center>
						<div class="area">
							<i class="iconfont icon-dizhi"></i>
							<span @click="selfa">{{source.source}}</span>
							<div class="se-area" v-show="isarea">
								<div class="a-line" v-for="(el,i) in allcity" :key="i">
									<div class="allcity left">
										{{el.name}}:
									</div>
									<div class="left ">
										<div class="district left" v-for="(el,i) in el.next" :key="i" @click="selarea(el)">
											{{el.name}}
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<div class="nav">
				<ul>
					<router-link v-for="(el, i) in navlist" :key="i" :class="i==tabNo?'current':''" :to="{path: el.to}" tag="li">
						<div>
							<img :src="el.url">
							<span class="left">{{el.name}}</span>
						</div>
					</router-link>
				</ul>
			</div>
		</div>

		<!-- 内容 -->
		<div class="content">
			<router-view :state='source' v-if="isRouter" />
		</div>
		<!-- 底部 -->
		<div class="footer footer-b " v-show="exploit">
			<div class="f-content">
				<div class="f-detail left">
					<div class="f-we">
						<div class="left ">
							<img src="./assets/img/pic-erweima.png" alt="" class="new-img">
							<div class="Qrcode">扫一扫，下载APP</div>
						</div>
						<div class="left ma-16">
							<img src="./assets/img/accounts.png" alt="">
							<div class="Qrcode">关注公众号</div>
						</div>
						<div class="left f-call ma-29">
							<p>
								<i class="iconfont icon-dianhua"></i>
								<span>联系电话：0731-85076077</span>
							</p>
							<p>
								<i class="iconfont icon-linedesign-04"></i>
								<span>服务时间：9：00-17：00</span>
							</p>
							<p>
								<i class="iconfont icon-youxiang"></i>
								<span>邮箱：hnsilita@163.com</span>
							</p>
							<p>
								<i class="iconfont icon-dizhi"></i>
								<span>地址：湖南省长沙市岳麓区杜鹃路768号金峰壹号院</span>
							</p>
						</div>
					</div>
				</div>
				<div class="f-true right">
					<div class="logo">
						<img src="./assets/img/logo.png" class="right">
					</div>
					<p class="right top-60">
						© 2017 思利他, Inc. All rights reserved . 湘ICP备17019911号-1
					</p>
				</div>
			</div>
		</div>

		<!--右侧悬浮-->
		<div class="fix-right">
			<div class="block qrbox">
				<div class="hover-before">
					<img src="./assets/img/icon-app1.png"/>
				</div>
				<div class="hover-after">App下载</div>
				<div class="qrcode-box">
					<img src="./assets/img/app.png"/>
				</div>
			</div>
			<div class="block qrbox">
				<div class="hover-before">
					<img src="./assets/img/icon-app2.png"/>
				</div>
				<div class="hover-after">官方微信</div>
				<div class="qrcode-box">
					<img src="./assets/img/gzh.png"/>
				</div>
			</div>
			<div class="block" @click="jump('/feedback')">
				<div class="hover-before">
					<img src="./assets/img/icon-app3.png"/>
				</div>
				<div class="hover-after">意见反馈</div>
			</div>
			<div class="block" @click="jump('/novice')">
				<div class="hover-before">
					<img src="./assets/img/icon-app4.png"/>
				</div>
				<div class="hover-after">新手指引</div>
			</div>
			<div class="block" @click="goTop">
				<div class="hover-before">
					<img src="./assets/img/icon-app5.png"/>
				</div>
				<div class="hover-after">回到顶部</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		address,
		getUserTemp,
		filter,
		Cmessage
	} from '@/api/index';
	export default {
		name: 'App',
		data() {
			return {
				app:false,
				gzh:false,
				isRouter: true,
				show: true,
				isshow: true,
				names: true,
				navlist: [{
						name: '首页',
						url: require('./assets/img/icon-shouy.png'),
						to: '/'
					},
					{
						name: '招标',
						url: require('./assets/img/icon-zhaob.png'),
						to: '/bid',
					},
					{
						name: '中标',
						url: require('./assets/img/icon-zhongb.png'),
						to: '/tender',
					},
					{
						name: '企业',
						url: require('./assets/img/icon-qiy.png'),
						to: '/company',
					},
					{
						name: '业绩',
						url: require('./assets/img/icon-yeji.png'),
						to: '/perfor',
					},
					{
						name: '人员',
						url: require('./assets/img/icon-reny.png'),
						to: '/crew',
					},
					{
						name: '在建',
						url: require('./assets/img/icon-zaij.png'),
						to: '/build',
					},
					{
						name: '法务',
						url: require('./assets/img/icon-fawu.png'),
						to: '/law',
					}
				],
				rank: 0,
				way: '/bid',
				ishow: false,
				source: {
					source: '湖南省',
					code: 'hunan'
				},
				selects: [{
						name: '招标',
						to: '/bid',
						i: 0
					},
					{
						name: '中标',
						to: '/tender',
						i: 1
					},
					{
						name: '企业',
						to: '/company',
						i: 2
					},
					{
						name: '诚信',
						to: '/perfor',
						i: 3
					},
				],
				select: '',
				name: '?',
        		isarea: false,
				allcity: [{
						name: '华东',
						next: [{
							name: '上海市'
						}, {
							name: '江苏省'
						}, {
							name: '浙江省'
						}, {
							name: '安徽省'
						}, {
							name: '福建省'
						}, {
							name: '江西省'
						}, {
							name: '山东省'
						}]
					},
					{
						name: '东北',
						next: [{
							name: '辽宁省'
						}, {
							name: '吉林省'
						}, {
							name: '黑龙江省'
						}]
					},
					{
						name: '华中',
						next: [{
							name: '河南省'
						}, {
							name: '湖北省'
						}, {
							name: '湖南省'
						}]
					}, {
						name: '华北',
						next: [{
							name: '北京市'
						}, {
							name: '天津市'
						}, {
							name: '河北省'
						}, {
							name: '山西省'
						}, {
							name: '内蒙古自治区'
						}]
					}, {
						name: '华南',
						next: [{
							name: '广东省'
						}, {
							name: '广西壮族自治区'
						}, {
							name: '海南省'
						}]
					},
					{
						name: '西北',
						next: [{
							name: '陕西省'
						}, {
							name: '甘肃省'
						}, {
							name: '青海省'
						}, {
							name: '宁夏回族自治区'
						}, {
							name: '新疆维吾尔自治区'
						}]
					},
					{
						name: '西南',
						next: [{
							name: '重庆市'
						}, {
							name: '四川省'
						}, {
							name: '贵州省'
						}, {
							name: '云南省'
						}, {
							name: '西藏自治区'
						}]
					},
				]
			}
		},
		provide() {
			return {
				reload: this.reload
			}
		},
		methods: {
			reload() {
				this.isRouter = false
				this.$nextTick(function() {
					this.isRouter = true
				})
			},
			gainaddress() {
				address({}).then(res => {
					if (res.code = 1) {
						//  console.log(res,1);
						localStorage.setItem('uip', res.data.ip)
						if (res.data.region == ('湖南' || '湖北' || '安徽' || '福建' || '广东' || '甘肃' || '贵州' || '河北' || '河南' || '黑龙江' || '海南' ||
								'江苏' || '江西' || '吉林' || '辽宁' || '青海' || '四川' || '山东' || '山西' || '陕西' || '台湾' || '云南' || '浙江')) {
							res.data.region = res.data.region + '省'
						} else if (res.data.region == ('北京' || '重庆' || '上海' || '天津')) {
							res.data.region = res.data.region + '市'
						} else if (res.data.region == '广西') {
							res.data.region = '广西壮族自治区'
						} else if (res.data.region == '内蒙古') {
							res.data.region = '内蒙古自治区'
						} else if (res.data.region == '宁夏') {
							res.data.region = '宁夏回族自治区'
						} else if (res.data.region == '新疆') {
							res.data.region = '新疆维吾尔自治区'
						} else if (res.data.region == '西藏') {
							res.data.region = '西藏自治区'
						}
						sessionStorage.setItem('address', res.data.region);
						let arr = JSON.parse(sessionStorage.getItem('filter')).area;
						let that = this;
						for (let x of arr) {
							if (x.name.indexOf(res.data.region) > -1) {
								that.source.code = x.code
								break
							}
						}
						setTimeout(() => {
							this.source.source = res.data.region
						}, 1000);
					}
				})
			},
			valley() {
				if (localStorage.getItem('Xtoken')) {
					let today = new Date().getTime() - localStorage.getItem('valid')
					if (Math.ceil(today / 3600 / 24 / 1000) >= 15) {
						alert('用户信息已失效，请重新登录')
						this.$router.push('/logo')
					} else {
						getUserTemp({}).then(res => {
							if (res.code == 1) {
								let name = res.data.nikeName ? res.data.nikeName : res.data.phoneNo
								localStorage.setItem('Xtoken', res.data.xtoken)
								localStorage.setItem('Bname', name)
								localStorage.setItem('isFirst', res.data.isFirst)
								sessionStorage.setItem('ip', res.data.pkid)
								localStorage.setItem('permissions', res.data.permissions)
								localStorage.setItem('phoneNo', res.data.phoneNo)
							}
							//  else {
							// 	// this.$alert(res.msg);
							// 	// alert(res.msg);
							// }

						})
					}
				}
			},
			selfa() {
				this.isarea = !this.isarea
			},
			selarea(el) {
				let arr = JSON.parse(sessionStorage.getItem('filter')).area;
				let that = this;
				for (let x of arr) {
					if (x.name.indexOf(el.name) > -1) {
						that.source.code = x.code
						break
					}
				}
				this.source.source = el.name
				sessionStorage.setItem('address', el.name)
				this.isarea = false
			},
			jumpl() {
				this.$router.push('/logo')
			},
			jumpen() {
				this.$router.push('/enroll')
			},
			judges() {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					this.name = localStorage.getItem('Bname')
					this.names = false
				} else {
					this.names = true
				}
			},
			touser() {
				this.$router.push('/user')
			},
			tocol() {
				this.$router.push('/user/fcoll')
			},
			amend() {
				this.$router.push('/user/root')
			},
			order() {
				this.$router.push('/user/order')
			},
			quit() {
				sessionStorage.removeItem('xtoken')
				localStorage.removeItem('Bname')
				localStorage.removeItem('Xtoken')
				localStorage.removeItem('valid')
				localStorage.removeItem('permissions')
				this.$router.replace({
					path: '/home',
					query: {
						t: Date.now()
					}
				})
			},
			user() {
				this.$router.push('/user')
			},
			// towe() {
			//   let routeUrl = this.$router.resolve({
			//     path: "/about",
			//   });
			//   window.open(routeUrl.href,'_blank');
			// },
			tovip() {
				// if(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
				let routeUrl = this.$router.resolve({
					path: "/buy",
				});
				window.open(routeUrl.href, '_blank');
				// } else {     
				//     this.$confirm('暂无权限，请先登录', '提示', {
				//     confirmButtonText: '确定',
				//     cancelButtonText: '取消',
				//     type: 'warning'
				//   }).then(() => {
				//     this.$router.push('/logo')
				//   }).catch(() => {

				//   });
				// }

			},
			toinfo() {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					let routeUrl = this.$router.resolve({
						path: "/user/info",
					});
					window.open(routeUrl.href, '_blank');
				} else {
					this.$confirm('暂无权限，请先登录', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					}).catch(() => {

					});
				}
			},
			gainCo() {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					Cmessage({}).then(res => {
						if (res.code == 1) {
							if (res.data >= 1) {
								this.ishow = true
							} else {
								this.ishow = false
							}
						}
					})
				}
      		},
			jump(path){//新开页跳转
				let routeUrl = this.$router.resolve({
					path:path,
				});
				window.open(routeUrl.href, '_blank');
			},
			goTop(){//回到顶部
				let top=this.$refs.top;
				top.scrollIntoView({block: "start",behavior: "smooth"})
			}
    },
		created() {
			if (localStorage.getItem('history')) {
				localStorage.removeItem('history')
			}
			this.valley()
			this.judges()
			if (this.$router.params != undefined) {
				this.name = this.$router.params.name
				this.names = false
			} else {
				this.judges()
			}
			if (!sessionStorage.getItem('address')) {
				this.gainaddress()
			} else {
				let arr = JSON.parse(sessionStorage.getItem('filter')).area;
				let str = sessionStorage.getItem('address');
				let that = this;
				for (let x of arr) {
					if (x.name.indexOf(str) > -1) {
						that.source.code = x.code
						break
					}
				}
				that.source.source = str
			}
			this.gainCo()
		},
		watch: {
			$route: {
				handler: function(val, oldVal) {
					this.gainCo()
					sessionStorage.setItem('pageNo', 1)
					if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
						this.name = localStorage.getItem('Bname')
						this.names = false
					} else {
						this.names = true
					}
				},
				deep: true
			}
		},
		destroyed() {
			// localStorage.removeItem('permissions')
		},
		computed: {
			tabNo() {
				let t = this.$route.meta.tabNo;
				return t
			},
			// 底部是否消失
			exploit() {
				if (this.$route.name == 'download' || this.$route.name == 'logo' || this.$route.name == 'enroll') {
					return false
				} else {
					return true
				}
			},
			// 顶部是否消失
			excom() {
				if (this.$route.name == 'download' || this.$route.name == 'logo' || this.$route.name == 'enroll' || this.$route.name ==
					'find' || this.$route.name == 'pDet' || this.$route.name == 'root' || this.$route.name == 'fcoll' || this.$route.name ==
					'bound' || this.$route.name == 'about' || this.$route.name == 'order' || this.$route.name == 'buy' || this.$route.name ==
					'info' || this.$route.name == 'dwDetail'|| this.$route.name == 'hdDetail'||this.$route.name=='feedback'||this.$route.name==
					'publicity'||this.$route.name=='information'||this.$route.name=='detail'||this.$route.name=='novice'
				) {
					return false
				} else {
					return true
				}
			},
			// 是否固定在底部
			// judbt() {
			//   if(this.$route.name == 'find') {
			//     return true
			//   } else {
			//     return false
			//   }
			// }
		},
	}
</script>

<style lang="less">
	@import './style/common';
	@import './assets/iconfont.css';
	@import './base/base.css';
	body{
		width: 100% !important;
	}
	#app {
		background-color: #FAFAFA;

		table {
			// table-layout:fixed
			max-width: 100%;
		}

		.content {
			width: 100%;
		}

		.fixation {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 2010;
			width: 100%;
		}

		.app-header {
			width: 100%;
			justify-content: center;
			display: flex;
			// cursor: pointer;
			background-color: #fff;

			.contact {
				height: 33px;
				min-width: 1020px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				background-color: #fff;
				font-weight: 400;

				.contact-l {
					width: calc(100% - 300px);

					a,
					p {
						margin-right: 25px;
						color: #666;
						line-height: 20px;

						i {
							margin-right: 6px;
						}

						.l-mobile {
							font-size: 16px;
						}

						.calling {
							font-size: 16px;
						}

						.person {
							font-size: 15px;
							font-weight: 600;
							cursor: pointer;
						}
					}
				}

				.contact-r {
					width: 300px;
					display: flex;
					align-items: center;
					flex-direction: row-reverse;

					p {
						cursor: pointer;
					}

					.line {
						width: 1px;
						height: 12px;
						background-color: #939392;
						margin: 0 15px;
					}

					.area {
						margin-right: 20px;
						color: #FE6603;
						font-weight: 500;
						display: flex;
						align-items: center;
						position: relative;
						cursor: pointer;

						i {
							font-size: 16px;
							font-weight: 600;
							padding-top: 4px;
						}

						.se-area {
							width: 420px;
							height: 300px;
							position: absolute;
							bottom: -303px;
							left: -180px;
							background-color: #fff;
							z-index: 999999;
							border-radius: 8px;
							border: 1px solid #F49C17;
							box-sizing: border-box;
							padding: 10px;
							color: #000;

							.a-line {
								height: 40px;
								line-height: 40px;
								border-bottom: 1px solid #f2f3f8;

								.allcity {
									font-weight: 550;
									font-size: 15px;
									padding-right: 10px;
								}

								.district {
									color: #646464;
									padding: 0 5px;
									cursor: pointer;
								}
							}
						}
					}
				}
			}
		}

		.nav {
			background-color: #EC7522;
			height: 50px;
			justify-content: center;
			display: flex;
			cursor: pointer;
			align-items: center;

			ul {
				min-width: 1020px;
				box-sizing: border-box;

				li {
					box-sizing: border-box;
					width: 12%;
					height: 50px;
					line-height: 50px;
					float: left;
					color: #fff !important;
					display: flex;
					align-items: center;
					justify-content: center;

					div {
						border-right: 1px solid #fff;
						font-size: 26px;
						width: 100%;
						height: 35px;
						line-height: 35px;
						display: flex;
						align-items: center;
						justify-content: center;

						img {
							margin-right: 10px;
						}

						span {
							font-size: 18px;
						}
					}
				}

				li:last-child div {
					border: none;
				}

				li:hover,
				li:hover div {
					background-color: #FF8400;
					// border: none;
				}

				.current {
					background-color: #F49C17;
					//  div {
					//    border: none;
					//  }
				}
			}
		}

		.f-btt {
			position: absolute;
			left: 0;
			bottom: 0;
		}

		.footer {
			height: 195px;
			width: 100%;
			background-color: #666666;
			display: flex;
			justify-content: center;

			.f-content {
				width: 1020px;
				height: 100%;
				box-sizing: border-box;
				padding-top: 26px;

				.f-detail {
					width: 60%;
					height: 100%;

					.f-we {
						overflow: hidden;
						font-size: 18px;
						color: #fff;

						.new-img {
							width: 113px;
							height: 113px;
						}

						.Qrcode {
							font-size: 12px;
							color: #FE6603;
							text-align: center;
						}

						.ma-16 {
							margin-left: 16px;
						}

						p {
							display: flex;
							align-items: center;
							margin-bottom: 11px;

							i {
								font-size: 16px;
								margin-right: 10px;
							}

							span {
								font-size: 12px;
							}
						}

						.f-call {
							margin-top: 12px;
						}

						.ma-29 {
							margin-left: 29px;
						}

						.file {
							margin-top: 108px;
							font-size: 12px;
						}
					}
				}

				.f-true {
					width: 39%;
					height: 100%;
					box-sizing: border-box;

					.logo {
						margin-top: 14px;
					}

					.top-60 {
						margin-top: 60px;
						font-size: 12px;
						color: #eee;
					}
				}
			}
		}

		.we-us {
			font-size: 20px !important;
			padding-top: 2px;
			position: relative;

			.us-red {
				position: absolute;
				width: 7px;
				height: 7px;
				background-color: red;
				border-radius: 50%;
				top: 1px;
				right: 0;
			}
		}
	}


	.ajax-erroe {
		background: #fff;
		text-align: center;
		padding: 50px 0;

		img {
			display: block;
			margin: 0 auto;
			margin-bottom: 30px;
		}

		span {
			cursor: pointer;
			display: inline-block;
			width: 70px;
			line-height: 25px;
			background: #FE6603;
			color: #fff;
			border-radius: 3px;
		}
	}
	/*右侧悬浮*/
	.fix-right{
		position: fixed;
		width: 60px;
		// overflow: hidden;
		right: 15px;
		transform: translateY(-50%);
		top: 50%;
		z-index: 999;
		border: 1px solid #f2f2f2;
		.block{
			position: relative;
			background: #fff;
			padding: 0 4px;
			.hover-before{
				cursor: pointer;
				border-bottom: 1px solid #F2F2F2;
				height: 60px;
				display: flex;
				align-items: center;
    			justify-content: center;
			}
			.hover-after{
				cursor: pointer;
				text-align: center;
				position: absolute;
				top: 0;
				right:0;
				background: #FE6603;
				color: #fff;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				padding: 10px;
				transition: all 1s;
				opacity: 1;
				display: none;
			}
			/*二维码*/
			.qrcode-box{
				position: absolute;
				// top: -200%;
				top: -35px;
				right: 94px;
				// opacity: 0;
				transition: all 1s;
				z-index: -1;
				display: none;
			}
		}
		.block:hover .hover-after{
			// opacity: 1;
			// right: 0;
			display: block;
		}
		.qrbox:hover .qrcode-box{
			// opacity: 1;
			display: block;
			// z-index: 1;
		}
		
	}

	body .el-loading-spinner .path {
		stroke: #FE6603;
	}

	body .el-loading-spinner .el-loading-text {
		color: #FE6603
	}

	#app .content {
		min-height: calc(100vh - 320px);
	}

	// @media screen and (min-width: 1919px){
	//   #app{
	//     min-height: 100vh;
	//   }
	//   #app .footer{
	//     position: fixed;
	//     bottom:0;
	//   }
	//   #app .content{
	//     padding-bottom: 195px
	//   }
	// }
</style>
