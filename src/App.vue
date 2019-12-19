<template>
	<div id="app" ref="top" :class="{'excom':excom}">
		<!-- 头部 -->
		<div class="fixation" v-if="excom">
			<div class="app-header">
				<div class="contact">
					<div class="contact-l">
						<p class="left">
							您好,欢迎来到标大大!
						</p>
						<p class="left">
							<i class="iconfont icondianhua"></i>
							0731-85076077
						</p>
						<router-link :to="{path:'/download'}" tag="a" target='_blank' class="left">
							<i class="iconfont iconAPPxiazai"></i>
							下载APP
						</router-link>
						<p class="left" style="cursor: pointer;" @click="tovip">
							<i class="iconfont iconhuiyuan"></i>
							会员服务
						</p>
						<p class="left" style="cursor: pointer;" @click="toinfo">
							<i class="iconfont iconxiaoxi">
								<div class="us-red" v-show="ishow"></div>
							</i>
							<span>我的消息</span>
						</p>
						<router-link :to="{path:'/about'}" tag="a" target='_blank' class="left">
							<p class="left" style="cursor: pointer;">
								<i class="iconfont iconguanyuwomen"></i>
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
						<v-user v-else></v-user>
						<div class="area">
							<i class="iconfont iconweizhi"></i>
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
							<!-- <img :src="el.url"> -->
							<i class="iconfont" :class="el.iconName"></i>
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
		<div class="footer color-b6b" v-if="exploit">
			<div class="footer_content dfrb">
				<div class="text-c logo_img fs14">
					<img src="./assets/img/pic-erweima.png" alt="">
					<div class="mt30">扫一扫，下载APP</div>
				</div>
				<div class="text-c logo_img fs14">
					<img src="./assets/img/accounts.png" alt="">
					<div class="mt30">关注公众号</div>
				</div>
				<div class="fs14">
					<div class="fs16 color-fff mb30">联系我们</div>
					<div class="drc">
						<ul class="mr40">
							<li>联系电话</li>
							<li>0731-85076077</li>
							<li>邮箱</li>
							<li>hnsilita@163.com</li>
						</ul>
						<ul>
							<li>工作时间</li>
							<li>8：30-19：30</li>
							<li>地址</li>
							<li>湖南省长沙市岳麓区杜鹃路768号金峰壹号院</li>
						</ul>
					</div>
				</div>
				<div>
					<img src="./assets/img/logo.png">
				</div>
			</div>
			<div class="footer_mark text-c fs14">© 2017 思利他, Inc. All rights reserved . 湘ICP备17019911号-1</div>
		</div>
		<!--右侧悬浮-->
		<div class="fix-right" v-if="$route.name!='error'">
			<div class="block qrbox">
				<div class="box">
					<i class="iconfont iconAPPxiazai"></i>
					<p style="margin-top:8px">App下载</p>
				</div>
				<div class="qrcode-box">
					<h6>APP下载</h6>
					<p>安卓/IOS应用市场下载</p>
					<img src="./assets/img/pic-erweima.png"/>
				</div>
			</div>
			<div class="block qrbox">
				<div class="box">
					<i class="iconfont iconweixin"></i>
					<p style="margin-top:13px">官方微信</p>
				</div>
				<div class="qrcode-box">
					<h6>官方微信</h6>
					<p>扫码关注官方微信吧</p>
					<img src="./assets/img/accounts.png"/>
				</div>
			</div>
			<div class="block" @click="jump('/feedback')">
				<div class="box">
					<i class="iconfont iconyijian"></i>
					<p style="margin-top:12px">意见反馈</p>
				</div>
			</div>
			<div class="block" @click="jump('/novice')">
				<div class="box">
					<i class="iconfont iconzhiyin"></i>
					<p style="margin-top:16px">新手指引</p>
				</div>
			</div>
			<div class="block" @click="goTop">
				<div class="box">
					<i class="iconfont iconhuidaodingbu"></i>
					<p style="margin-top:17px">回到顶部</p>
				</div>
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
						iconName: 'iconshouye',
						to: '/'
					},
					{
						name: '招标',
						iconName:'iconzhaobiao',
						to: '/bid',
					},
					{
						name: '中标',
						iconName:'iconzhongbiao',
						to: '/tender',
					},
					{
						name: '企业',
						iconName:'iconqiye',
						to: '/company',
					},
					{
						name: '业绩',
						iconName:'iconyeji',
						to: '/perfor',
					},
					{
						name: '人员',
						iconName:'iconrenyuan',
						to: '/crew',
					},
					{
						name: '在建',
						iconName:'iconzaijian',
						to: '/build',
					},
					// {
					// 	name: '法务',
					// 	url: require('./assets/img/icon-fawu.png'),
					// 	to: '/law',
					// }
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
						let arr = JSON.parse(localStorage.getItem('filter')).area;
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
					if (Math.ceil(today / 3600 / 24 / 1000) > 15) {
						this.$alert('用户信息已失效，请重新登录')
						this.$router.push('/logo')
						localStorage.removeItem('valid')
					} else {
						getUserTemp({}).then(res => {
							if (res.code == 1) {
								let name = res.data.nikeName ? res.data.nikeName : res.data.phoneNo
								localStorage.setItem('Xtoken', res.data.xtoken)
								localStorage.setItem('Bname', name)
								localStorage.setItem('isFirst', res.data.isFirst)
								sessionStorage.setItem('ip', res.data.pkid)
								localStorage.setItem('0658544ac523fca9ec78a5f607fdd7ee', res.data.isVip)
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
				let arr = JSON.parse(localStorage.getItem('filter')).area;
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
				localStorage.removeItem('0658544ac523fca9ec78a5f607fdd7ee')
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
				let arr = JSON.parse(localStorage.getItem('filter')).area;
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
		beforeDestroy() {
			if(!localStorage.getItem('valid')){
				localStorage.removeItem('Xtoken')
			}
		},
		computed: {
			tabNo() {
				let t = this.$route.meta.tabNo;
				return t
			},
			// 底部是否消失
			exploit() {
				if (this.$route.name == 'download' || this.$route.name == 'logo' || this.$route.name == 'enroll' ||this.$route.name=='error') {
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
					'publicity'||this.$route.name=='information'||this.$route.name=='detail'||this.$route.name=='novice'||this.$route.name=='error'
					||this.$route.name=='ZJquery'||this.$route.name=='queryList'||this.$route.name=='queryDetail'||this.$route.name=='GLquery'
					||this.$route.name=='SLquery'||this.$route.name=='queryPay'||this.$route.name=='cjDetail'||this.$route.name=='screenPage'||this.$route.name=='result'
					||this.$route.name=='companyDetail'||this.$route.name=='peopleDetail'|| this.$route.name == 'payPage'
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
	@import './assets/iconfont.css';
	@import './base/base.less';
	@import './style/common.css';
	@import './style/publicCSS';
body{
	width: 100% !important;
}
#app {
	
	/*详情内页接口表格问题*/
	background-color: @whiteColor;
	.article table {
		max-width: 100%;
		width: 100% !important;
		margin-left: 0 !important;
	}
	.notice table{
		max-width: 100%;
		width: 100% !important;
		margin-left: 0 !important;
	}
	.detail table{
		max-width: 100%;
		width: 100% !important;
		margin-left: 0 !important;
	}
	/*详情内页接口表格问题 勿动！*/
	.fixation {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 2010;
		width: 100%;
	}
	/*顶部导航栏上面的头部*/
	.app-header {
		width: 100%;
		justify-content: center;
		display: flex;
		// cursor: pointer;
		background-color: #fff;
		.contact {
			height: 38px;
			min-width: 1020px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 12px;
			background-color: #fff;
			font-weight: 400;
			.contact-l {
				width: calc(100% - 300px);
				a,p {
					margin-right: 25px;
					color: #666;
					line-height: 20px;
					display: flex;
					align-items: center;
					i {
						margin-right: 6px;
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
						margin-right: 10px;
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
	/*顶部导航栏*/
	.nav {
		background-color: #EB651B;
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
				width: 14%;
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
					.iconfont{
						margin-right: 10px;
						font-size: 18px;
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
			}
			.current {
				background-color: #FF8E4F;
			}
		}
	}
	/*底部样式*/
	.footer {
		background-color: @pinkColor;
		padding: 70px 0 30px 0;
		.footer_content {
			width: 1020px;
			margin: 0 auto;
			.logo_img {
				img {
					width: 126px;
					height: 126px;
				}
			}
			ul>li {
				margin-bottom: 16px;
			}
		}
		.footer_mark {
			min-width: 1020px;
			margin-top: 80px;
		}
	}
}
/*加载失败样式*/
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
	width: 88px;
	// overflow: hidden;
	right: 15px;
	transform: translateY(-50%);
	top: 50%;
	z-index: 999;
	box-shadow:0px 0px 15px 0px rgba(0,0,0,0.15);
	border: 1px solid #f2f2f2;
	.block{
		position: relative;
		background: #fff;
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		text-align: center;
		cursor: pointer;
		.iconfont{
			font-size: 22px;
		}
		/*二维码*/
		.qrcode-box{
			position: absolute;
			background: #fff;
			top: -74px;
			right: 118px;
			z-index: -1;
			width: 160px;
			padding: 14px 9px;
			box-shadow:0px 0px 15px 0px rgba(0,0,0,0.15);
			box-sizing: border-box;
			display: none;
			h6{
				color: #EB651B;
				font-size: 16px;
				font-weight: normal;
				margin-bottom: 6px;
			}
			p{
				font-size: 14px;
				color: #666;
				margin-bottom: 6px;
			}
			img{
				width: 100%;
			}
		}
		/*三角形*/
		.qrcode-box::after{
			content: '';
			width: 0;
			height: 0;
			border-top: 4px solid transparent;
			border-bottom: 4px solid transparent;
			border-left: 9px solid #fff;
			position: absolute;
			transform: translateY(50%);
			top: 50%;
			right: -9px;
		}

	}
	.block:hover{
		background: #F3F5F9;
		color: #EB651B
	}
	.qrbox:hover .qrcode-box{
		display: block;
	}
	
}
/*饿了么load样式*/
body .el-loading-spinner .path {
	stroke: #FE6603;
}

body .el-loading-spinner .el-loading-text {
	color: #FE6603
}

#app.excom .content {
	min-height: calc(100vh - 478px);
	padding-top: 88px;
}
</style>
