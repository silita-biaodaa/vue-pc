<template>
	<div class="history">
		<div class="inform" v-if="!pass" v-for="(el,i) in history " :key="i">
			<div class="inform-top">
				<div class="top-left">
					<div class="top-title">企业资质·业绩查询报告-体验版</div>
					<div class="top-buy">购买时间：{{el.date}}</div>
					<div class="inform-f">企业所在地：{{el.regisAddress}}</div>
					<div class="inform-f">
						资质要求：
						<span v-show="el.qualName" v-html="el.newqual"></span>
						<span v-show="!el.qualName">未选择资质要求</span>
					</div>
				</div>
				<div class="top-right">
					<div class="top-btn" :class=" el.pAth ? '' : 'no-path' " @click="jump(el)">查看报告</div>
					<div class="no-inform" v-show="!el.pAth">报告生成中……</div>
				</div>
			</div>
			<div class="inform-b">
				<div class="b-in">业绩要求</div>
				<div class="inform-f">业绩平台：{{el.projSource}}</div>
				<div class="inform-f">项目名称关键词：{{el.projName}}</div>
				<div class="inform-f">
					<span v-if="!(el.buildStart ==''  && el.buildEnd == '' )">竣工时间：{{el.buildStart ? el.buildStart : '之前' }} 至
						{{el.buildEnd ? el.buildEnd : '至今' }}</span>
					<span v-else>竣工时间：未选择竣工时间</span>
				</div>
				<div class="inform-f" v-show="!(el.amountStart ==''  && el.amountEnd == '' )">
					<span v-show="(el.amountStart && el.amountEnd )">合同金额：{{el.amountStart}}万 - {{el.amountEnd}}万</span>
					<span v-show="(el.amountStart && el.amountEnd == '')">合同金额： {{el.amountStart}}万<span style="fontSize:14px">≥</span></span>
					<span v-show="(el.amountStart == '' && el.amountEnd )">合同金额：<span style="fontSize:14px">≤</span>{{el.amountEnd}}万</span>
				</div>
				<div class="inform-f" v-show="(el.amountStart ==''  && el.amountEnd == '' )">
					<span>合同金额：未选择合同金额</span>
				</div>
			</div>
		</div>
		<div class="no-toast" v-if='pass'>
			<img src="../../assets/img/bank_card @2x.png" alt="">
			<span>暂无数据</span>
		</div>
	</div>
</template>
<script>
	import {
		history
	} from '@/api/index';
	let moment = require("moment");
	export default {
		data() {
			return {
				pass: false,
				history: [],
				pAth: true,
				isTime: true,

			}
		},
		methods: {
			gainLisy() {
				console.log(1);

				if (!(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken'))) {
					return false
				}
				history({
					pageNo: 1,
					pageSize: 1000
				}).then(res => {
					console.log(res);

					if (res.code == 1) {
						if (res.data.length == 0) {
							this.pass = true
						}
					}
					this.history = res.data
					this.history.forEach(el => {
						if (el.reportPath) {
							el.pAth = true
						} else {
							el.pAth = false
						}
						var date = new Date(el.payDate.replace(/-/g, '/'));
						el.date = moment(date).format('YYYY年MM月DD日')
						if (el.projSource = 'project') {
							el.projSource = '全国建筑市场监管公共服务平台'
						} else if (el.projSource = 'shuili') {
							el.projSource = '全国水利建设市场信用信息平台'
						} else {
							el.projSource = '全国公路建设市场信用信息管理系统'
						}
					})
					this.history.forEach(el => {
						if (el.qualName) {
							let setarr = Array.from(new Set(el.qualName.split(',')))

							el.newqual = setarr.join(',')
							if (el.rangeType == 'and') {
								el.newqual = el.newqual.replace(/,/g, '<span style="color:#FE6603" >和</span>')
							} else {
								el.newqual = el.newqual.replace(/,/g, '<span style="color:#FE6603" >或</span>')
							}
						}
					})

				})
			},
			jump(el) {
				if (!el.pAth) {
					return
				}
				window.open(el.reportPath, '_blank', )
			}
		},
		created() {
			this.gainLisy()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.history {
		width: 1020px;
		margin: 0 auto 150px;
		min-height: calc(~'100vh - 450px');

		.inform {
			width: 100%;
			// height: 317px;
			margin-bottom: 20px;
			background-color: #fff;

			.inform-top {
				width: 100%;
				height: 149px;
				border-bottom: 1px solid #f2f2f2;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				padding: 20px 19px 10px;

				.top-left {
					.top-title {
						font-weight: 550;
						font-size: 18px;
						margin-bottom: 5px;
					}

					.top-buy {
						font-size: 12px;
						color: #CCBEBE;
						margin-bottom: 13px;
					}
				}

				.top-right {
					text-align: right;

					.top-btn {
						width: 120px;
						height: 48px;
						border-radius: 5px;
						background-color: #fe6603;
						color: #fff;
						text-align: center;
						line-height: 48px;
						cursor: pointer;
					}

					.no-inform {
						width: 120px;
						color: red;
						text-align: center;
						font-size: 12px;
					}

					.no-path {
						background-color: #ccc;
					}
				}
			}

			.inform-b {
				padding: 10px 20px;

				.b-in {
					font-size: 14px;
					margin-bottom: 10px;
				}
			}

			.inform-f {
				font-size: 14px;
				color: #999;
				margin-bottom: 10px;
			}
		}

		.hi-img {
			width: 100%;
			min-height: calc(~'100vh - 450px');
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
