<template>
	<div class="order">
		<div class="det-nav">
			<span>我的订单</span>
			<span style="fontSize:12px;color:#999;">如有任何问题，请联系我们：0731-85076077</span>
		</div>

		<div class="or-sel">
			<div class="left" style="marginRight:20px;color:#666">
				订单类型
				<el-select v-model="value" placeholder="请选择" @change="type" clearable>
					<el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="left" style="color:#666">
				支付状态
				<el-select v-model="pattern" clearable placeholder="请选择" @change="Ctype">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="right orbtn">
				<div class="or-btn" @click="bill">
					开发票
				</div>
			</div>
		</div>

		<div class="or-table" v-show="noShow">
			<div class="ta-top">
				<div style="width:230px;textAlign:left">
					我的订单
				</div>
				<div style="width:80px;">
					状态
				</div>
				<div style="width:100px;">
					支付金额
				</div>
				<div style="width:160px;">
					购买时间
				</div>
				<div style="width:100px;">
					操作
				</div>
			</div>

			<div v-for="(el,i) in allList" :key="i">
				<!-- 会员 -->
				<div class="ta-list" v-if="!el.report">
					<div class="list-vip">
						<div class="left" style="width:230px;textAlign:left">
							<div style="fontSize:16px" class="m-6">会员服务
							</div>
							<div style="fontSize:12px" class="m-6">
								订单编号:{{el.orderNo}}
							</div>
							<div style="fontSize:12px" class="m-6">
								服务时长:{{el.vipDays | months }}
							</div>
						</div>

						<div class="left" style="width:80px;fontSize:14px;">
							{{el.orderStatus | status  }}
						</div>

						<div class="left" style="width:100px;color:#FF0000">
							{{el.fee/100}}元
						</div>

						<div class="left" style="width:160px;">
							{{el.updateTime ? el.updateTime : el.createTime | times }}
						</div>

						<div class="left" style="width:100px;">
							<div class="again" @click="again(el)">
								{{el.orderStatus==1 ? '立即购买' : '再次购买'}}
							</div>
						</div>
					</div>
			    </div>
				<div>
				<!-- 综合查询 -->
				<div v-if="el.report&&el.report.repTitle == '企业资质+业绩查询报告-体验版' ">
					<div class="ta-list">
						<div class="list-vip">
							<div class="left" style="width:230px;textAlign:left">
								<div style="fontSize:16px" class="m-6">企业资质·业绩查询报告-体验版
								</div>
								<div style="fontSize:12px" class="m-6">
									订单编号:{{el.orderNo}}
								</div>
								<div style="fontSize:12px" class="m-6">
									发送邮箱:{{el.report.email}}
								</div>
							</div>

							<div class="left" style="width:80px;fontSize:14px;">
								{{el.orderStatus | status  }}
							</div>

							<div class="left" style="width:100px;color:#FF0000">
								{{el.fee/100}}元
							</div>

							<div class="left" style="width:160px;">
								{{el.updateTime ? el.updateTime : el.createTime | times }}
							</div>

							<div class="left" style="width:100px;">
								<div class="again" :class="{'noBtn':!(el.report.reportPath || el.orderStatus == '1' ) }" @click="resend(el)">
									{{el.orderStatus == '1' ? '立即购买' : '重新发送' }}
								</div>
							</div>
						</div>
						<div class="ta-report">
							<div class="left" style="width:190px;textAlign:left">
								<div style="fontSize:12px">
									报告格式:PDF
								</div>
							</div>
							<div class="left" style="width:180px;" v-show="el.orderStatus != '1'">
								{{el.report.reportPath | nopath }}
							</div>
							<div class="left" style="width:300px;" :class="{'noBtn':!el.report.reportPath}" v-show="el.orderStatus != '1'">
								<!-- <span @click='dowloadFn(el)'>下载</span> -->
								<span @click="look(el)">查看</span>
								<!-- <a :download="el.report.reportPath" :href="el.report.reportPath">下载</a> -->
							</div>
						</div>
					</div>
				</div>
				<!-- 专查 -->
				<div v-if="el.report&&(el.report.repTitle == '公路专查' || el.report.repTitle =='住建专查' || el.report.repTitle =='水利专查')">
					<div class="ta-list">
						<div class="list-vip">
							<div class="left" style="width:230px;textAlign:left">
								<div style="fontSize:16px" class="m-6">{{el.report.repTitle == '公路专查' ? '公路' : (el.report.repTitle =='住建专查' ? '住建' : '水利') }}系统专查·综合查询
								</div>
								<div style="fontSize:12px" class="m-6">
									订单编号:{{el.orderNo}}
								</div>
							</div>

							<div class="left" style="width:80px;fontSize:14px;">
								{{el.orderStatus | status  }}
							</div>

							<div class="left" style="width:100px;color:#FF0000">
								{{el.fee/100}}元
							</div>

							<div class="left" style="width:160px;">
								{{el.updateTime ? el.updateTime : el.createTime | times }}
							</div>

							<div class="left" style="width:100px;">
								<!-- <div class="again" :class="{'noBtn':!(el.report.reportPath || el.orderStatus == '1' ) }" @click="resend(el)">
									{{el.orderStatus == '1' ? '立即购买' : '重新发送' }}
								</div> -->
								<!-- 支付成功 -->
								<template v-if="el.orderStatus=='9'">
									<template v-if="timeOutFn(el)">
										<!-- 查看详情 -->
										<div class="again" @click="jumpQueryList(el)">查看详情</div>
									</template>
									<template v-else>
										<!-- 再次查询 -->
										<div class="again" @click="jumpQuery(el)">再次查询</div>
									</template>
								</template>
								<!-- 未支付 -->
								<template v-else>
									<template>
										<!-- 可以支付 -->
										<div class="again" @click="jumpPay(el)">去支付</div>
										<v-time :end="el.createTime+(60*60*1000)"></v-time>
									</template>
									<!-- 失效 -->
									<!-- <template v-else>
										<div class="again noBtn">已失效</div>
									</template> -->
								</template>
							</div>
						</div>
						<div class="ta-report">
							<div class="left" style="width:190px;textAlign:left">
								<div style="fontSize:12px">
									报告格式: &nbspEXCEL
								</div>
							</div>
							<div class="left" style="width:180px;" v-show="el.orderStatus != '1'">
								{{el.report.reportPath | nopath }}
							</div>
							<div class="left" style="width:300px;" v-if="el.report.reportPath">
								<a :download="el.report.reportPath" :href="el.report.reportPath">下载</a>
								<span @click="regenerateFn(el.orderNo)">重新生成</span>
							</div>
						</div>
					</div>
				</div>


				</div>
			</div>

		</div>
		<div class="noList" v-show="!noShow">
			<img src="../../assets/img/bank_card @2x.png" alt="">
			<div>
				暂无订单信息
			</div>
		</div>
		<div class="whint" v-show="wsend">
			<i class="el-icon-success"></i>{{msg}}
		</div>

		<div class="re-puy" v-if="egg">
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
						<span>发送邮箱:</span>{{aga.report.email}}
					</div>
					<div class="puy-name">
						<span>报告格式:</span>PDF
					</div>
				</div>
				<div class="puy-price">
					<div class="puy-name">
						<span>应付金额:</span><span class="price">{{aga.fee/100}}</span>元
					</div>
				</div>
			</div>

			<div class="puy-title" style="fontSize:14px;">
				<span>支付方式</span>
			</div>

			<div class="puy-code">
				<div class="puy-img qrcode" id="qrcode" v-loading='isload' element-loading-text="二维码生成中">
					<!-- <img src="../../assets/img/bank_card @2x.png" alt=""> -->
				</div>
				<div class="puy-hint">
					<img src="../../assets/img/icon-weixin.png" alt="">&nbsp&nbsp微信扫码支付
				</div>
			</div>
		</div>

		<div class="loading" v-if="egg">

		</div>
	</div>
</template>
<script>
	import QRCode from 'qrcodejs2'
	import {
		orderList,
		send,
		nowxPay
	} from '@/api/index'
import { setTimeout, clearTimeout, setInterval, clearInterval } from 'timers';
import countTime from '@/components/countTime'
	let moment = require("moment");
	export default {
		data() {
			return {
				noShow: true,
				option: [{
						label: '全部',
						value: ''
					},
					{
						label: '会员订单',
						value: 'vip'
					},
					{
						label: '综合查询',
						value: 'query'
					}
				],
				value: '',
				pattern: '',
				options: [{
					value: '',
					label: '全部'
				}, {
					value: '1',
					label: '未支付'
				}, {
					value: '9',
					label: '已支付'
				}],
				allList: [],
				vipList: [],
				queryLsit: [],
				showList: [],
				feat: [],
				win: [],
				wsend: false,
				msg: '',
				payshow: false,
				detail: {},
				iphone: '',
				egg: false,
				aga: {},
				isload: true
			}
		},
		filters: {
			status(val) {
				if (val == 1) {
					return '未支付'
				} else if (val == 2) {
					return '超时'
				} else if (val == 3) {
					return '支付失败'
				} else if (val == 4) {
					return '支付取消'
				} else if (val == 9) {
					return '已支付'
				} else if (val == 99) {
					return '支付其他异常'
				} else if (val == 11) {
					return '非支付成功'
				}
			},
			times(val) {
				if (val == '') {
					return
				} else {
					return moment(val).format('YYYY-MM-DD HH:mm:ss')
				}

			},
			nopath(val) {
				if (val == null) {
					return '生成中'
				} else {
					return '生成成功'
				}
			},
			months(val) {
				if (val == 30) {
					return '一个月'
				} else if (val == 90) {
					return '三个月'
				} else if (val == 180) {
					return '六个月'
				} else {
					return '十二个月'
				}
			}
		},
		methods: {
			regenerateFn(orNo){//重新生成
				this.$http({
					method:'get',
					url:'/download/excel',
					data:{
						orderNo:orNo
					}
				}).then(res => {

				})
			},
			jumpPay(el){//跳到支付页
				let query={
					id:el.report.pkid,
				}
				if(el.report.zhuanchaType=='gonglu'){
					query.type='gl'
				}else if(el.report.zhuanchaType=='zhujian'){
					query.type='zj'
				}else if(el.report.zhuanchaType=='shuili'){
					query.type='sl'
				}
				// this.$router.push({
				// 	path:'/queryPay',
				// 	query:query
				// })
				this.openNewLink('/queryPay',query)
			},
			jumpQuery(el){//跳到查询页
				if(el.report.zhuanchaType=='gonglu'){
					this.openNewLink('/GLquery')
				}else if(el.report.zhuanchaType=='zhujian'){
					this.openNewLink('/ZJquery')
				}else if(el.report.zhuanchaType=='shuili'){
					this.openNewLink('/SLquery')
				}
			},
			jumpQueryList(el){
				let query={
						type:'',
						n:el.orderNo,
						id:el.report.pkid
				}
				if(el.report.zhuanchaType=='gonglu'){
					query.type='gl'
					this.openNewLink('/queryList',query)
				}else if(el.report.zhuanchaType=='zhujian'){
					query.type='zj'
					this.openNewLink('/queryList',query)
				}else if(el.report.zhuanchaType=='shuili'){
					query.type='sl'
					this.openNewLink('/queryList',query)
				}
			},
			timeOutFn(el){//判断是否超过24小时
				let payDate=el.report.payDate;
				payDate=new Date(payDate).getTime();
				let nowTime=new Date().getTime();
				if(nowTime-payDate>24*60*60*1000){//大于24小时
					return false
				}else{//小于等于24小时
					return true
				}
			},
			close() {
				this.egg = false
			},
			bill() {
				this.$confirm('如需开发票，请联系我们0731-85076077', '提示', {
					type: 'warning',
					showCancelButton: false,
					showConfirmButton: false
				})
			},
			again() {
				this.$router.push('/buy')
			},
			gainList() {
				orderList({
					pageSize: '100',
					pageNo: '1',
					orderStatus: '1',
					channelNo: '1003'
				}).then(res => {
					if (res.code == 1) {
						this.feat = res.data
					} else {
						this.feat = []
					}
				})
			},
			gainWin() {
				orderList({
					pageSize: '100',
					pageNo: '1',
					orderStatus: '9',
					channelNo: ''
				}).then(res => {
					if (res.code == 1) {
						this.win = res.data
						setTimeout(() => {
							this.allList = this.win.concat(this.feat)
							if (this.allList.length == 0) {
								this.noShow = false
							} else {
								this.noShow = true
							}
						}, 100);

					} else {
						this.win = []
						setTimeout(() => {
							this.allList = this.win.concat(this.feat)
							if (this.allList.length == 0) {
								this.noShow = false
							} else {
								this.noShow = true
							}
						}, 100);
					}
				})
			},
			// dowloadFn(el) {
			// 	if (el.report.reportPath) {
			// 		window.open(el.report.reportPath)
			// 	}
			// },
			type(val) {
				this.allList = []
				this.allList = this.win.concat(this.feat)
				let arr = []
				if (val == '') {
					if (this.pattern == '') {
						this.allList = []
						this.allList = this.win.concat(this.feat)
						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					} else {
						this.allList.forEach(el => {
							if (el.orderStatus == this.pattern) {
								arr.push(el)
							}
						})
						this.allList = []
						this.allList = arr

						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}

					}

				} else if (val == 'vip') {
					if (this.pattern == '') {
						this.allList.forEach(el => {
							if (el.report == null) {
								arr.push(el)
							}
						})
						this.allList = []
						this.allList = arr
						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					} else {
						this.allList.forEach(el => {
							if (el.report == null && el.orderStatus == this.pattern) {
								arr.push(el)
							}
						})
						this.allList = []
						this.allList = arr
						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					}
				} else {
					if (this.pattern == '') {
						this.allList.forEach(el => {
							if (el.report) {
								arr.push(el)
							}
						})
						this.allList = []
						this.allList = arr
						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					} else {
						this.allList.forEach(el => {
							if (el.report != null && el.orderStatus == this.pattern) {
								arr.push(el)
							}
						})
						this.allList = []
						this.allList = arr
						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					}
				}
			},
			Ctype(val) {
				this.allList = []
				this.allList = this.win.concat(this.feat)
				let arr1 = []
				if (val == '') {
					if (this.value == '') {
						this.allList = []
						this.allList = this.win.concat(this.feat)
						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					} else {
						if (this.value == 'vip') {
							this.allList.forEach(el => {
								if (el.report == null) {
									arr1.push(el)
								}
							})
						} else {
							this.allList.forEach(el => {
								if (el.report) {
									arr1.push(el)
								}
							})
						}
						this.allList = []
						this.allList = arr1

						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}

					}

				} else if (val == '9') {
					if (this.value == '') {
						this.allList.forEach(el => {
							if (el.orderStatus == '9') {
								arr1.push(el)
							}
						})
						this.allList = []
						this.allList = arr1

						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					} else if (this.value == 'vip') {
						this.allList.forEach(el => {
							if (el.orderStatus == '9' && el.report == null) {
								arr1.push(el)
							}
						})
						this.allList = []
						this.allList = arr1

						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					} else {
						this.allList.forEach(el => {
							if (el.orderStatus == '9' && el.report) {
								arr1.push(el)
							}
						})
						this.allList = []
						this.allList = arr1

						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					}
				} else {
					if (this.value == '') {
						this.allList.forEach(el => {
							if (el.orderStatus == '1') {
								arr1.push(el)
							}
						})
						this.allList = []
						this.allList = arr1

						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					} else if (this.value == 'vip') {
						this.allList.forEach(el => {
							if (el.orderStatus == '1' && el.report == null) {
								arr1.push(el)
							}
						})
						this.allList = []
						this.allList = arr1

						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					} else {
						this.allList.forEach(el => {
							if (el.orderStatus == '1' && el.report) {
								arr1.push(el)
							}
						})
						this.allList = []
						this.allList = arr1

						if (this.allList.length == 0) {
							this.noShow = false
						} else {
							this.noShow = true
						}
					}
				}
			},
			resend(el) {
				if (el.orderStatus == '1') {
					this.isload = true
					this.aga = el
					this.egg = true
					setTimeout(() => {
						let code = new QRCode("qrcode", {
							text: el.wxpayParam.codeUrl,
							width: 180,
							height: 180,
							colorDark: "#000000",
							colorLight: "#ffffff",
						});
					}, 100);
					this.gainstate(el)

				} else {
					if (!el.report.reportPath) {
						return false
					}
					send({
						orderNo: el.orderNo,
						pkid: el.report.pkid,
						email: el.report.email
					}).then(res => {
						if (res.code == 1) {
							this.wsend = true
							this.msg = '重新发送成功'
							setTimeout(() => {
								this.wsend = false
							}, 1500);
						}
					})
				}

			},
			gainstate(val) {
				this.isload = false
				let that = this
				let int = setInterval(function() {

					if (!that.egg) {
						clearInterval(int)
						return false
					}
					nowxPay({
						orderNo: val.orderNo,
						type: 'report',
						pkid: val.report.pkid
					}).then(res => {

						if (res.trade_state == 'SUCCESS') {
							that.wsend = true
							that.msg = '支付成功'
							that.egg = false
							clearInterval(int)
							setTimeout(() => {
								that.wsend = false
								that.$router.go(0)
							}, 3000)

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
			look(el) {
				if (el.report.reportPath) {
					window.open(el.report.reportPath, '_blank', )
				}

			},
			text() {
				window.open('http://prefile.biaodaa.com/img/report.pdf')
			}
		},
		created() {
			this.gainList()//查询初始化订单
			this.gainWin()//查询支付成功订单
		},
		components: {
			'v-time':countTime
		}
	}
</script>
<style lang="less" scoped>
	.order {
		background-color: #fff;
		width: 100%;
		padding-bottom: 120px;
		position: relative;

		.det-nav {
			line-height: 54px;
			padding: 0 29px;
			font-size: 16px;
			font-weight: 500;
			border-bottom: 1px solid #F2F2F2;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
		}

		.or-sel {
			padding: 0 29px;
			height: 70px;
			line-height: 70px;
		}

		.orbtn {
			height: 70px;
			display: flex;
			align-items: center;
		}

		.or-btn {
			width: 64px;
			height: 22px;
			background: rgba(254, 102, 3, 1);
			border-radius: 5px;
			line-height: 22px;
			text-align: center;
			color: #fff;
			font-size: 12px;
			cursor: pointer;
		}

		.or-table {
			padding: 0 29px;

			.ta-top {
				display: flex;
				width: 100%;
				height: 29px;
				line-height: 29px;
				text-align: center;
				font-size: 12px;
				box-sizing: border-box;
				background-color: #F8F8F8;
			}

			.ta-list {
				border-bottom: 1px solid #F2F2F2;

				.list-vip {
					height: 93px;
					display: flex;
					align-items: center;
					text-align: center;
					color: #999;
				}

				.m-6 {
					margin-bottom: 6px;
				}

				.again {
					width: 70px;
					height: 23px;
					margin: 0 auto;
					cursor: pointer;
					border: 1px solid rgba(254, 102, 3, 1);
					border-radius: 5px;
					color: #FE6603;
					font-size: 12px;
					text-align: center;
					line-height: 23px;

				}
				.surplus-time{//剩余时间
					font-size: 12px;
					color: red;
					margin-top: 10px;
				}
				.noBtn {
					border-color: #999;
					color: #999;
					cursor: default;
				}

				.ta-report {
					height: 32px;
					line-height: 32px;
					background-color: #FAFDFF;
					color: #999;
					font-size: 12px;
					text-align: center;
					a{
						text-decoration:none;
						color:#FE6603;
					}
					.noBtn {
						span {
							color: #999;
							cursor: default;
						}
					}

					span {
						color: #FE6603;
						margin-left: 40px;
						cursor: pointer;
					}

					:first-child {
						margin-left: 0;
					}
				}
			}
		}

		.noList {
			padding-top: 100px;
			//  display: flex;
			//  flex-direction: column;
			//  align-items: center;
			text-align: center;
			color: #999;
		}

		.whint {
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
			z-index: 6000;
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

		.loading {
			position: fixed;
			width: 100%;
			height: 100%;
			background-color: #000;
			opacity: 0.5;
			z-index: 5000;
			top: 0;
			left: 0;
		}
	}
</style>
