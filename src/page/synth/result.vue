<template>
	<div class="result">
		<div class="re-nav">
			<span @click="$router.push('/')">首页</span>><span @click="$router.push('/company')">企业</span>><span @click="$router.push('/synth')">综合查询</span>><span
			 style="color:#000">查询结果</span>
		</div>
		<div class="re-text">
			<div class="re-title">
				<div style="color:#FFF">查询页面</div>
				<div class="title">企业资质·业绩查询报告-体验版</div>
				<div class="sample" @click="jump">报告样本</div>
			</div>
			<div style="fontSize:16px;marginBottom:15px;">限时折扣价¥{{common.price}}/会员专享价¥{{vip.price}}元</div>
			<div style="fontSize:16px;color:#FE6603;cursor: pointer;" @click="jumpvip" v-show="toVip">
				开通会员 <i class="el-icon-arrow-right"></i>
			</div>
		</div>
		<div class="re-condition">
			<div class="di-con">已选条件</div>
			<div class="di-line">企业所在地：{{detail.regisAddress}}</div>
			<div class="di-line" style="marginBottom:20px;">
				资质要求：<span v-html="newqual" v-show="this.detail.qualName"></span><span v-show="!this.detail.qualName">未选择资质要求</span>
			</div>
			<div class="di-con">业绩要求</div>
			<div class="di-line">业绩平台：{{detail.projSource}}</div>
			<div class="di-line">项目名称关键词：{{detail.projName}}</div>
			<div class="di-line">
				<span v-show="isTime">&nbsp竣工时间：{{detail.buildStart ? detail.buildStart : '之前' }} 至 {{detail.buildEnd ? detail.buildEnd : '至今' }}</span>
				<span v-show="!isTime">&nbsp竣工时间:未选择竣工时间</span>
			</div>
			<div class="di-line" style="marginBottom:0;" v-show="isMon">
				<span v-show="isLow">&nbsp合同金额：{{detail.amountStart}}万 - {{detail.amountEnd}}万</span>
				<span v-show="isE">&nbsp合同金额： <span style="fontSize:14px">≥</span>{{detail.amountStart}}万</span>
				<span v-show="isS">&nbsp合同金额：<span style="fontSize:14px">≤</span>{{detail.amountEnd}}万</span>
			</div>
			<div class="di-line" style="marginBottom:0;" v-show="!isMon">合同金额:未选择合同金额</div>
		</div>
		<div class="term">
			<div class="te-name">收件人信息</div>
			<div class="te-hint" style="width:190px;">
				<span v-show="isshow">{{msg}}</span>
				<!-- <span v-show="ismail" >请输入正确的邮箱地址</span> -->
			</div>
			<div class="te-put">
				手机号码（必填）：
				<input type="text" placeholder="请输入您的手机号" v-model="iphone" @blur="isphone">
			</div>
			<div class="te-put">
				电子邮箱（必填）：
				<input type="text" placeholder="请输入您的邮箱" v-model="email" @blur="isemail">
			</div>
			<div class="te-put" style="width:453px;">报告格式（默认）： PDF</div>
			<div class="te-btn" @click="pay">立即支付</div>
		</div>
		<div class="re-puy" v-if="noShow">
			<div class="puy-title">
				<span>企业资质·业绩查询报告-体验版</span>
				<i class="el-icon-close" @click="close"></i>
			</div>

			<div class="puy-title" style="fontSize:14px;">
				<span>订单详情</span>
			</div>

			<div class="puy-detail">
				<div>
					<div class="puy-name">
						<span>手机号码:</span>{{this.iphone}}
					</div>
					<div class="puy-name">
						<span>发送邮箱:</span>{{this.email}}
					</div>
					<div class="puy-name">
						<span>报告格式:</span>PDF
					</div>
				</div>
				<div class="puy-price">
					<div class="puy-name">
						<span>应付金额:</span><span class="price">{{price}}</span>元
					</div>
				</div>
			</div>

			<div class="puy-title" style="fontSize:14px;">
				<span>支付方式</span>
			</div>

			<div class="puy-code">
				<div class="puy-img" id="qrcode" v-loading='isload' element-loading-text="二维码生成中">
					<!-- <img src="../../assets/img/bank_card @2x.png" alt=""> -->
				</div>
				<div class="puy-hint">
					<img src="../../assets/img/icon-weixin.png" alt="">&nbsp&nbsp微信扫码支付
				</div>
			</div>
		</div>
		<!-- <div class="hint" v-show="tohit" >
     <i class="el-icon-close" ></i> 您已支付成功，报告生成成功会发送至您的邮箱，若生成失败会自动退款。
  </div> -->

	</div>
</template>
<script>
	import QRCode from 'qrcodejs2'
	import {
		report,
		wxPay,
		nowxPay
	} from '@/api/index';
	export default {
		data() {
			return {
				detail: {},
				common: {},
				vip: {},
				iphone: '',
				email: '',
				price: '',
				isshow: false,
				ismail: false,
				isTime: true,
				isMon: true,
				isLow: true,
				isS: false,
				isE: false,
				noShow: false,
				msg: '请输入正确的手机号码格式',
				newqual: '',
				code: '',
				payimg: 1,
				cir: true,
				Noid: '',
				pkid: '',
				toVip: true,
				tohit: true,
				isload: true
				// int:''
			}
		},
		methods: {
			gainReport() {
				if (localStorage.getItem('query')) {
					this.iphone = localStorage.getItem('phoneNo')
					let date = JSON.parse(localStorage.getItem('query'))
					report(date).then(res => {
						console.log(res);

						if (res.code == 1) {
							this.pkid = res.pkid
							if (res.data.projSource = 'project') {
								res.data.projSource = '全国建筑市场监管公共服务平台'
							} else if (res.data.projSource = 'shuili') {
								res.data.projSource = '全国水利建设市场信用信息平台'
							} else {
								res.data.projSource = '全国公路建设市场信用信息管理系统'
							}
							this.detail = res.data

							if (this.detail.price[0].primeUnit == "普通用户") {
								this.common = this.detail.price[0]
								this.vip = this.detail.price[1]
							} else {
								this.common = this.detail.price[1]
								this.vip = this.detail.price[0]
							}
							if (this.detail.buildStart == '' && this.detail.buildEnd == '') {
								this.isTime = false
							} else {
								this.isTime = true
							}
							if (this.detail.amountEnd == '' && this.detail.amountStart == '') {
								this.isMon = false
							} else {
								this.isMon = true
								if (this.detail.amountEnd == '' || this.detail.amountStart == '') {
									this.isLow = false
									if (this.detail.amountStart == '') {
										this.isS = true
										this.isE = false
									} else {
										this.isE = true
										this.isS = false
									}
								} else {
									this.isLow = true
								}
							}
							if (this.detail.qualName) {
								let setarr = Array.from(new Set(this.detail.qualName.split(',')))

								this.newqual = setarr.join(',')
								if (this.detail.rangeType == 'and') {
									this.newqual = this.newqual.replace(/,/g, '<span style="color:#FE6603" >和</span>')
								} else {
									this.newqual = this.newqual.replace(/,/g, '<span style="color:#FE6603" >或</span>')
								}
							}

						}

					})
				} else {
					this.$router.push('/synth')
				}
			},
			isphone() {
				if (!(/^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\d{8}$/.test(this.iphone.trim()))) {
					this.isshow = true
					this.msg = '请输入正确的手机号码格式'
				} else {
					this.isshow = false
				}
			},
			isemail() {
				var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
				if (!(reg.test(this.email))) {
					this.isshow = true
					this.msg = '请输入正确的电子邮箱格式'
				} else {
					this.isshow = false
				}
			},
			jump() {
				window.open(this.detail.reportPath, '_blank', )
			},
			jumpvip() {
				this.$router.push('/buy')
			},
			pay() {
				if (this.noShow) {
					return false
				}
				this.isphone()
				this.isemail()
				if (this.isshow) {
					this.isshow = true
					this.msg = '请输入您的手机号码和电子邮箱'
					return
				}
				this.isload = true
				let ip = sessionStorage.getItem('ip')
				let uip = localStorage.getItem('uip')
				if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='true') {
					this.price = this.vip.price
					this.code = this.vip.stdCode
				} else {
					this.price = this.common.price
					this.code = this.common.stdCode
				}

				wxPay({
					channel: '1003',
					stdCode: this.code,
					tradeType: 'NATIVE',
					userId: ip,
					pkid: this.detail.pkid,
					email: this.email,
					phone: this.iphone,
					ip: uip
				}).then(res => {
					if (res.code == 1) {
						this.Noid = res.orderNo
						this.url = res.data.codeUrl
						//  if(this.payimg == 1) {
						let code = new QRCode("qrcode", {
							text: res.data.codeUrl,
							width: 180,
							height: 180,
							colorDark: "#000000",
							colorLight: "#ffffff",
						});
						//  this.payimg = this.payimg + 1
						//  } 

						this.gainstate(res.orderNo)
					}

				})

				this.noShow = true

			},
			gainstate(val) {
				this.isload = false
				let that = this
				let int = setInterval(function() {

					if (!that.noShow) {

						clearInterval(int)
						return false
					}
					nowxPay({
						orderNo: val,
						type: 'report',
						pkid: this.pkid
					}).then(res => {

						if (res.trade_state == 'SUCCESS') {
							// that.tohit = true
							that.noShow = false
							// clearInterval(int)
							// setTimeout(() => {
							//    that.tohit = false
							//    
							// },3000)
							that.$confirm('您已支付成功，报告生成成功会发送至您的邮箱，若生成失败会自动退款。', '提示', {
								confirmButtonText: '确定',
								type: 'warning',
								showCancelButton: false,
							}).then(() => {
								that.$router.push('/synth/query')
							}).catch(() => {
								that.$router.push('/synth/query')
							});

						} else if (res.trade_state == 'ClOSED') {
							clearInterval(int)
							that.noShow = false
						} else if (res.trade_state == 'REVOKED') {
							that.noShow = false
							clearInterval(int)
						} else if (res.trade_state == 'PAYERROR') {
							that.noShow = false
							clearInterval(int)
						}


					})
				}, 2000)

			},
			close() {
				this.noShow = false
			},
			openV() {
				if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='true') {
					this.toVip = false
				} else {
					this.toVip = true
				}
			}
		},
		created() {
			this.gainReport()
			this.openV()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.result {
		width: 1020px;
		margin: 0 auto;
		padding-top: 80px;
		position: relative;

		.re-nav {
			margin: 20px 0;
			font-size: 16px;
			color: #999;
			cursor: pointer;
		}

		.re-text {
			padding: 20px 18px 10px;
			width: 1020px;
			box-sizing: border-box;
			border-bottom: 1px solid #F2F2F2;
			background-color: #fff;

			.re-title {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 13px;

				.title {
					font-size: 20px;
				}

				.sample {
					width: 72px;
					height: 24px;
					font-size: 14px;
					color: #FE6603;
					border: 1px dashed #FE6603;
					line-height: 24px;
					text-align: center;
					cursor: pointer;
				}
			}
		}

		.re-condition {
			background-color: #fff;
			width: 100%;
			box-sizing: border-box;
			padding: 30px 18px 20px;
			margin-bottom: 20px;

			.di-con {
				font-size: 14px;
				margin-bottom: 8px;
			}

			.di-line {
				font-size: 12px;
				color: #999;
				margin-bottom: 8px;
			}
		}

		.term {
			width: 100%;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 200px;

			.te-name {
				font-size: 20px;
				font-weight: 500;
				margin-top: 30px;
				margin-bottom: 72px;
			}

			.te-put {
				font-size: 14px;
				color: #666;
				line-height: 36px;
				margin-bottom: 24px;

				input {
					width: 287px;
					height: 36px;
					border: 1px solid #CFCFCF;
					padding: 0 15px;
				}
			}

			.te-btn {
				width: 287px;
				height: 36px;
				line-height: 36px;
				background-color: #FE6603;
				color: #fff;
				font-size: 14px;
				font-weight: 550;
				text-align: center;
				margin: 97px 0;
				cursor: pointer;
			}

			.te-hint {
				font-size: 12px;
				color: red;
				margin-bottom: 5px;
			}
		}

		.hint {
			position: fixed;
			left: 50%;
			top: 40%;
			transform: translateX(-50%);
			background-color: #000;
			opacity: 0.5;
			color: #fff;
			padding: 5px 10px;
			border-radius: 5px;
			font-size: 14px;
		}

		.re-puy {
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			width: 500px;
			//  height: 500px;
			top: 100px;
			background-color: #fff;
			box-shadow: 4px 3px 9px 1px rgba(4, 0, 0, 0.05);
			border: 1px solid rgba(242, 242, 242, 1);

			.puy-title {
				height: 45px;
				font-size: 16px;
				border-bottom: 1px solid #F2F2F2;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 18px;
				font-size: 16px;

				i {
					font-size: 24px;
					cursor: pointer;
				}
			}

			.puy-detail {
				padding: 18px 18px 15px;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #F2F2F2;

				.puy-name {
					margin-bottom: 15px;

					span {
						font-weight: 550;
						margin-right: 10px;
					}

					.price {
						font-weight: 400;
						font-size: 18px;
						color: #FE6603;
					}
				}
			}

			.puy-code {
				margin-top: 15px;
				display: flex;
				align-items: center;
				flex-direction: column;
				overflow: hidden;
				margin-bottom: 10px;

				.puy-img {
					width: 180px;
					height: 180px;
				}

				.puy-hint {
					display: flex;
					align-items: center;
					font-size: 12px;
					color: #FE6603;
					margin-top: 10px;
				}
			}
		}
	}
</style>
