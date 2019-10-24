<template>
	<div class="buy">
		<!-- 头 -->
		<v-head :headTxt="'会员服务'"></v-head>
		<!--  -->
		<div class="buy-img">
			<div class="img-vip">
				<img src="../../assets/img/pic-huiy.png@2x.png" alt="">
				<div class="img-title">
					V I P 会 员
				</div>
			</div>
		</div>

		<div class="buy-limit">
			<div class="buy-vip">
				<div class="buy-price" v-for="(el,i) in level" :key="i" @click="how(el)">
					<div class="price" :class="price == el.price ? 'current' : ''">
						<span>{{el.price}}</span>/{{el.stdDesc | month }}个月
					</div>
					<div>
						<div class="rate left">
							{{el.altInfo}}
						</div>
						<div class="right save">
							可节省{{el.primePrice - el.price }}元
						</div>
					</div>
				</div>

				<div class="buy-btn" @click="openV">
					立即开通
				</div>

			</div>
			<div class="buy-title" style="display: flex;align-items: center;">
				标大大会员 <i class="bigDian"></i> 专享特权
			</div>
			<div class="buy-table">
				<table>
					<thead>
						<th style="width:18.75%">特权项目</th>
						<th style="width:31.25%">特权服务介绍</th>
						<th style="width:12.75%">月度会员<br />318元</th>
						<th style="width:12.75%">季度会员<br />898元</th>
						<th style="width:12.75%">半年会员<br />1498元</th>
						<th style="width:12.75%">年度会员<br />2298元</th>
					</thead>
					<tbody>
						<tr>
							<td class="tit">招标公告</td>
							<td class="con">提供全国各省的招标公告，会员可根据地区、项目类型、项目资质和评标办法等筛选条件查询出自己想要的信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">变更公告</td>
							<td class="con">提供招标过程中的补充公告、变更公告、废标公告、重新招标等信息，使用户可以及时获知并有效的对投标工作做出相应方案调整。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">中标公告</td>
							<td class="con">提供建筑行业即时的中标资讯，帮助会员用户即时获取实时的中标公示，掌握市场行情。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">竞价谈判公告</td>
							<td class="con">提供全国各省有关服务、货物的谈判采购信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">询价采购公告</td>
							<td class="con">提供全国各省有关服务、货物的询价采购信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">招标数据统计</td>
							<td class="con">根据会员单位需求,以列表的形式定期汇总各行业、各领域招标采购数据信息,并以PDF格式提供给会员单位，为会员单位做数据分析提供支持服务。</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>1次</td>
							<td>5次</td>
						</tr>
						<tr>
							<td class="tit">企业信息</td>
							<td class="con">提供300W+家企业的基本信息，包括企业工商信息、企业联系方式、分支机构、法务信息、资质信息、人员信息、业绩信息、中标信息、诚信信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit" style="position: relative;">工商信息<span class="buy-new">New</span></td>
							<td class="con">接入全国工商信息网站，提供企业的工商信息。包括企业基本信息、分支机构、股东信息、主要人员、变更记录、企业年报、行政处罚等信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">人员信息</td>
							<td class="con">提供全国注册人员的证书信息、个人业绩、变更记录、不良记录等信息，查找信息更加快速精准。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">业绩信息</td>
							<td class="con">提供全国住建部、交通部、水利部的业绩信息，可根据地区、合同金额、日期、关键词快速查找想要的业绩信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td style="position: relative;" class="tit">法务信息<span class="buy-new">New</span></td>
							<td class="con">可查看自身风险信息和企业的关联风险信息</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">综合查询（限APP和网页端使用）</td>
							<td class="con">可通过设置地区、资质、业绩关键字等条件，查询出符合条件的建筑企业业绩信息，快捷方便，为用户提供个性化的信息查询服务。</td>
							<td>按次收费</td>
							<td>按次收费</td>
							<td>按次收费</td>
							<td>按次收费</td>
						</tr>
						<tr>
							<td class="tit">在建信息</td>
							<td class="con">可根据姓名和身份证号，精准查询湖南省内人员的在建情况。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">保证金业务</td>
							<td class="con">为我们的会员用户提供相关的保证金业务</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">人工服务</td>
							<td class="con">提供一对一的客服经理服务模式。在服务期间内为会员单位提供全方位立体式的服务，及时解决会员单位使用过程中遇到的问题和困难。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">企业定制化数据查询</td>
							<td class="con">为会员用户提供私人定制化企业数据查询</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>另行收费</td>
						</tr>
						<tr>
							<td class="tit">企业定制化开发</td>
							<td class="con">公司有非常强大的技术团队、并且再建筑行业中有多年经验。可以针对性的为我们会员用户提供建筑相关的app、小程序、公众号、网页定制服务。</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>另行收费</td>
						</tr>
						<tr>
							<td class="tit">移动客户端</td>
							<td class="con">提供手机app（标大大）、标大大移动端、标大大网页端，三端可用同一账号登录、浏览招投标项目信息，第一时间便捷查看项目不错失商机，大大提高工作效率。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>


		<div class="re-loading" v-if="noShow">
			<div class="re-puy ">
				<div class="puy-title">
					<span>会员支付</span>
					<i class="el-icon-close" @click="close"></i>
				</div>

				<div class="re-auto">
					<div class="puy-title" style="fontSize:14px;">
						<span>订单详情</span>
					</div>

					<div class="puy-detail">
						<div>
							<div class="puy-name">
								<span>手机号码:</span>{{iphone}}
							</div>
							<div class="puy-name">
								<span>标大大{{this.all.stdDesc}}</span>
							</div>
						</div>
						<div class="puy-price">
							<div class="puy-name">
								<span>应付金额:</span><span class="price">{{this.all.price}}</span>元
							</div>
						</div>
					</div>
					<!-- <div class="puy-iphone" v-show="pushIP"  >
              <div class="puy-iput" >
                <div>邀请人手机号码：</div>
                 <el-input v-model="input" placeholder="请输入邀请人手机号码（可不填）"></el-input>
                 <div class="puy-iti" @click.stop="pushIp" >
                   确定
                 </div>
              </div>
              <div class="puy-hint" >
                <div class="puy-pos" >
                  <span class="puy-star" >*</span>填写邀请人手机号码，助力好友领取微信红包！
                </div>
                <div  v-show="error" >
                    请输入正确的手机号码格式
                </div>
              </div>
            </div> -->
					<div class="puy-title" style="fontSize:14px;">
						<span>支付方式</span>
					</div>

					<div class="puy-code">
						<div class="puy-img" id="qrcode" v-loading='isload' element-loading-text="二维码生成中">
						</div>
						<div class="puy-hint">
							<img src="../../assets/img/icon-weixin.png .png" alt="">&nbsp&nbsp微信扫码支付
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="buy-prp" v-show="pop">{{msg}}
		</div>

	</div>
</template>
<script>
	import QRCode from 'qrcodejs2'
	import {
		FeeStandard,
		vipPay,
		nowxPay,
		getUserTemp,
		activity
	} from '@/api/index'
	import heads from '@/components/head3'
	export default {
		data() {
			return {
				names: true,
				isarea: false,
				allcity: [{
						name: '华东',
						next: [{
							name: '上海'
						}, {
							name: '江苏'
						}, {
							name: '浙江'
						}, {
							name: '安徽'
						}, {
							name: '福建'
						}, {
							name: '江西'
						}, {
							name: '山东'
						}]
					},
					{
						name: '东北',
						next: [{
							name: '辽宁'
						}, {
							name: '吉林'
						}, {
							name: '黑龙江'
						}]
					},
					{
						name: '华中',
						next: [{
							name: '河南'
						}, {
							name: '湖北'
						}, {
							name: '湖南'
						}]
					}, {
						name: '华北',
						next: [{
							name: '北京'
						}, {
							name: '天津'
						}, {
							name: '河北'
						}, {
							name: '山西'
						}, {
							name: '内蒙古'
						}]
					}, {
						name: '华南',
						next: [{
							name: '广东'
						}, {
							name: '广西'
						}, {
							name: '海南'
						}]
					},
					{
						name: '西北',
						next: [{
							name: '陕西'
						}, {
							name: '甘肃'
						}, {
							name: '青海'
						}, {
							name: '宁夏'
						}, {
							name: '新疆'
						}]
					},
					{
						name: '西南',
						next: [{
							name: '重庆'
						}, {
							name: '四川'
						}, {
							name: '贵州'
						}, {
							name: '云南'
						}, {
							name: '西藏'
						}]
					},
				],
				source: '湖南',
				level: [

				],
				price: '318',
				noShow: false,
				all: {},
				iphone: '',
				isload: true,
				//  input:'',
				orderNo: '',
				error: false,
				pushIP: false,
				pop: false,
				msg: ''
			}
		},
		filters: {
			month(val) {
				if (val == "一个月会员") {
					return '1'
				} else if (val == "三个月会员") {
					return '3'
				} else if (val == "六个月会员") {
					return '6'
				} else {
					return '12'
				}
			}
		},
		methods: {
			jumpen() {
				this.$router.push('/enroll')
			},
			selarea(el) {
				this.source = el.name
				this.isarea = false
			},
			selfa() {
				this.isarea = !this.isarea
			},
			how(el) {
				this.price = el.price
				this.all = el
			},
			judges() {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					this.name = localStorage.getItem('Bname')
					this.names = false
				} else {
					this.names = true
				}
			},
			towe() {
				this.$router.push('/about')
			},
			close() {
				this.noShow = false
			},
			gainfee() {
				FeeStandard({
					channel: '1003'
				}).then(res => {
					if (res.code == 1) {
						this.level = res.data
						this.price = res.data[0].price
						this.all = res.data[0]
					}

				})
			},
			toTop() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			openV() {
				if (!sessionStorage.getItem('xtoken') && !localStorage.getItem('Xtoken')) {
					this.$confirm('暂无权限，请先登录', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					}).catch(() => {

					});
					return false
				}
				if (this.noShow) {
					return false
				}

				this.pushIP = localStorage.getItem('isFirst') == 0 ? true : false
				this.isload = true
				let id = sessionStorage.getItem('ip')
				this.iphone = localStorage.getItem('phoneNo')
				vipPay({
					channel: '1003',
					userId: id,
					stdCode: this.all.stdCode,
					tradeType: 'NATIVE'
				}).then(res => {
					if (res.code == 1) {

						this.orderNo = res.orderNo
						let code = new QRCode("qrcode", {
							text: res.data.codeUrl,
							width: 180,
							height: 180,
							colorDark: "#000000",
							colorLight: "#ffffff",
						});
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
						type: 'vip'
					}).then(res => {
						if (res.trade_state == 'SUCCESS') {
							getUserTemp({}).then(res => {
								if (res.code == 1) {
									sessionStorage.setItem('ip', res.data.pkid)
									localStorage.setItem('isvip', res.data.isVip)
									localStorage.setItem('isFirst', res.data.isFirst)

									// localStorage.setItem('ip', res.data.pkid)
									if (localStorage.getItem('Xtoken')) {
										localStorage.setItem('Xtoken', res.data.xtoken)
									} else {
										sessionStorage.setItem('xtoken', res.data.xtoken)
									}
								}

							})
							that.$message({
								message: '支付成功',
								type: 'success'
							});
							that.noShow = false
							clearInterval(int)
							that.$router.push('/user/order')
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
		},
		created() {
			this.judges()
			this.gainfee()
			this.toTop();
			// if(navigator.userAgent.indexOf("MSIE")>=1||navigator.userAgent.indexOf("Edge")>=1){
			//   alert('检测到您使用IE内核，IE会默认拦截支付请求。建议更换浏览器或更换为‘极速模式’支付')
			// }
		},
		components: {
			'v-head': heads,
		}
	}
</script>
<style lang="less" scoped>
	.buy {
		min-height: 1433px;

		.se-area {
			height: 310px !important;
			bottom: -320px !important;
		}

		.buy-img {
			min-width: 1020px;
			height: 368px;
			background: url(../../assets/img/pic-banner.png) no-repeat;
			background-position: center;
			background-size: cover;
			position: relative;

			.img-vip {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 307px;
				height: 78px;
				border-top-right-radius: 8px;
				border-top-left-radius: 8px;
				background-color: #FE6603;
				display: flex;
				align-items: center;
				flex-direction: column;

				img {
					margin: 5px 0;
				}

				.img-title {
					color: #fff;
				}
			}
		}

		@media screen and (min-device-width: 1920px) {
			.buy {
				height: 350px !important;
			}

		}

		.buy-limit {
			width: 1020px;
			margin: 0 auto;
			background-color: #fff;
			padding-bottom: 50px;
			margin-bottom: 200px;
			display: flex;
			align-items: center;
			flex-direction: column;

			.buy-vip {
				width: 307px;
				//  height: 100px;
				box-shadow: 0px 3px 9px 1px rgba(4, 0, 0, 0.1);
				border-bottom-right-radius: 8px;
				border-bottom-left-radius: 8px;
				padding: 10px 20px 30px;
				//  padding-top: 10px;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				//  height: 200px;
				.buy-price {
					cursor: pointer;
					margin-bottom: 15px;

					.price {
						width: 120px;
						height: 40px;
						line-height: 40px;
						text-align: center;
						border: 1px solid #F2F2F2;
						border-radius: 5px;
						color: #999;
						font-size: 14px;
						margin-bottom: 5px;

						span {
							color: #FE0303;
							font-size: 20px;
						}
					}

					.current {
						border: 1px solid #FE6603;
					}

					.rate {
						width: 40px;
						height: 14px;
						background-color: #FE6603;
						color: #fff;
						font-size: 10px;
						text-align: center;
						border-radius: 2px;
					}

					.save {
						color: #999;
						font-size: 8px;
					}
				}

				.buy-btn {
					cursor: pointer;
					width: 200px;
					line-height: 36px;
					text-align: center;
					color: #fff;
					font-size: 16px;
					background-color: #FE6603;
					margin: 0 auto;
					margin-top: 20px;
					border-radius: 8px;
				}
			}

			.buy-title {
				font-size: 24px;
				color: #333;
				font-weight: 500;
				margin: 25px 0;
			}

			.buy-table {
				table {
					width: 980px;
					border-collapse: collapse;

					th,
					td {
						border: 1px solid #f2f2f2;
						font-size: 14px;
						text-align: center;
						font-weight: normal;
						height: 60px;
						color: #999;
						// line-height: 60px;
					}

					thead th {
						background: #FE6603;
						color: #fff;
						border: none;
					}

					.tit {
						color: #fe6603;
					}

					.con {
						text-align: left;
					}
				}

				.buy-new {
					display: inline-block;
					width: 40px;
					background: #FE0303;
					position: absolute;
					font-size: 12px;
					color: #fff;
					border-radius: 12px;
					font-weight: 550;
					right: 15px;
					top: 8px;
				}
			}

		}

		.re-loading {
			position: fixed;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .5);
			z-index: 5000;
			top: 0;
			left: 0;
		}

		.re-puy {
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			width: 500px;

			box-sizing: border-box;
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

			.puy-iphone {
				padding: 0 18px;
				height: 120px;
				display: flex;
				justify-content: center;
				flex-direction: column;
				width: 100%;
				font-size: 14px;
				border-bottom: 1px solid #F2F2F2;
				font-weight: 550;
				box-sizing: border-box;

				.puy-iput {
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.puy-hint {
					margin-top: 5px;
					font-size: 11px;
					color: red;
					font-weight: 400;
					padding-left: 110px;

					.puy-pos {
						position: relative;
						color: #999;
						overflow: hidden;
						padding-left: 12px;

						.puy-star {
							position: absolute;
							left: 0;
							top: 2px;
							font-size: 22px;
							color: red;
							line-height: 23px;
						}
					}

				}

				.puy-iti {
					line-height: 40px;
					width: 60px;
					background: rgba(254, 102, 3, 1);
					border-radius: 5px;
					text-align: center;
					color: #fff;
					font-weight: 400;
					margin-left: 10px;
					cursor: pointer;
				}
			}

			.puy-detail {
				padding: 18px 18px 10px;
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
				margin: 10px 0;
				display: flex;
				align-items: center;
				flex-direction: column;
				overflow: hidden;

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

		@media screen and (max-device-width:1900px) {
			.re-auto {
				max-height: 434px;
				overflow-x: auto;
			}
		}

		/*分辨率高于1440，采用下面的样式*/
		@media screen and (min-device-width: 1900px) {
			.re-auto {
				height: auto;
			}

		}

		.buy-prp {
			position: fixed;
			left: 50%;
			top: 35%;
			transform: translate(-50%);
			color: #fff;
			background-color: rgba(0, 0, 0, .5);
			padding: 5px;
			border-radius: 5px;
			z-index: 6000;
		}
	}

	.bigDian {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #000;
		display: inline-block;
		margin: 0 5px;
	}
</style>
