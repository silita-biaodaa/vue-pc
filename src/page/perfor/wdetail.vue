<template>
	<div class="wdetail">
		<div class="irr-nav">
			<span @click="junmpto">首页</span>
			<span> > </span>
			<span @click="junmpshui">水利</span>
			<span> > </span>
			<span>水利部业绩详情</span>
		</div>
		<div class="irr-detail">
			<div class="irr-title">
				{{detail.proName}}
			</div>

			<div class="irr-table">
				<el-row>
					<el-col :span="7">
						<p>施工单位：<span>{{detail.comName}}</span></p>
					</el-col>
					<el-col :span="7">
						<p>建设单位：<span>{{detail.proOrg}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>所在地区：<span>{{detail.proWhere}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<p>工程状态：<span>{{detail.proStatus}}</span></p>
					</el-col>
					<el-col :span="7">
						<p>合同金额：<span>{{detail.contractAmount}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>结算金额：<span>{{detail.clearingAmount}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<p>开工日期：<span>{{detail.worked}}</span></p>
					</el-col>
					<el-col :span="7">
						<p>完工日期：<span>{{detail.finished}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>合同工期：<span>{{detail.duration }}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<p>项目负责人：<span>{{prizes }}</span></p>
					</el-col>
					<el-col :span="7">
						<p>技术负责人：<span>{{leaders}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p>关键指标：<span>{{detail.majorTarget}}</span></p>
						<p>合同主要内容：<span>{{detail.contractContent }}</span></p>
					</el-col>
				</el-row>
			</div>
		</div>

		<div class="irr-in">
			<div class="irr-nav">
				主要参与人员
			</div>
			<div class="people-table">
				<div class="people-top">
					<div style="width:80px;">
						姓名
					</div>
					<div style="width:180px;">
						身份证号
					</div>
					<div style="width:100px;">
						职务
					</div>
					<div style="width:100px;">
						职称
					</div>
					<div style="width:170px;">
						证书名称
					</div>
					<div style="width:170px;">
						证书编号
					</div>
					<div style="width:126px;">
						证书专业
					</div>
					<div style="width:70px;border:none">
						等级
					</div>
				</div>
				<div class="people-dea" v-for="(el,i) in detail.mainPersons" :key="i">
					<div style="width:80px;">
						{{el.姓名}}
					</div>
					<div style="width:180px;">
						{{el.身份证号}}
					</div>
					<div style="width:100px;">
						{{el.职务}}
					</div>
					<div style="width:100px;">
						{{el.职称}}
					</div>
					<div style="width:170px;">
						{{el.证书名称}}
					</div>
					<div style="width:170px;">
						{{el.证书编号}}
					</div>
					<div style="width:126px;">
						{{el.证书专业 ? el.证书专业 : '/'}}
					</div>
					<div style="width:70px;border:none">
						{{el.等级}}
					</div>
				</div>

				<div class="no-pro" v-show="!leader">
					暂无数据
				</div>

			</div>
		</div>

		<div class="irr-in irr-pro">
			<div class="irr-nav">
				工程获奖
			</div>
			<div class="people-table">
				<div class="people-top">
					<div style="width:225px;">
						奖项名称
					</div>
					<div style="width:110px;">
						奖项类别
					</div>
					<div style="width:100px;">
						奖项级别
					</div>
					<div style="width:140px;">
						奖项等级
					</div>
					<div style="width:200px;">
						颁奖单位
					</div>
					<div style="width:116px;">
						颁奖文号
					</div>
					<div style="width:100px;border:none">
						颁奖时间
					</div>
				</div>
				<div class="people-dea" v-for="(el,i) in detail.proPrizes" :key="i">
					<div style="width:225px;">
						{{el.奖项名称}}
					</div>
					<div style="width:110px;">
						{{el.奖项类别}}
					</div>
					<div style="width:100px;">
						{{el.奖项级别}}
					</div>
					<div style="width:140px;">
						{{el.奖项等级}}
					</div>
					<div style="width:200px;">
						{{el.颁奖单位}}
					</div>
					<div style="width:116px;">
						{{el.颁奖文号}}
					</div>
					<div style="width:100px;border:none">
						{{el.颁奖时间}}
					</div>
				</div>
				<div class="no-pro" v-show="!prize">
					暂无数据
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import {
		prodet
	} from '@/api/index';
	export default {
		data() {
			return {
				detail: {},
				leader: true,
				prize: true,
				leaders: '',
				prizes: '',
				id: ''
			}
		},
		methods: {
			gainshui() {
				prodet({
					tabType: 'shuili',
					id: this.id
				}).then(res => {
					console.log(res);
					if (res.code == 1) {
						this.detail = res.data
						if (this.detail.mainPersons) {
							this.leader = true
						} else {
							this.leader = false
						}
						if (this.detail.proPrizes) {
							this.prize = true
						} else {
							this.prize = false
						}
						if (this.detail.duration.indexOf('天') == -1) {
							this.detail.duration = this.detail.duration + '天'
						}
						let arr1 = [],
							arr2 = []
						this.detail.leaderPersons.forEach(el => {
							if (el.职务 == '技术负责人') {
								arr1.push(el.姓名)
							} else {
								arr2.push(el.姓名)
							}
						})
						this.leaders = arr1.join(',')
						this.prizes = arr2.join(',')
					}
				})
			},
			junmpto() {
				this.$router.push('/')
			},
			junmpshui() {
				this.$router.push('/perfor/water')
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.gainshui()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.wdetail {
		padding: 84px 0 200px;
		width: 1020px;
		box-sizing: border-box;
		margin: 0 auto;

		.irr-nav {
			height: 40px;
			line-height: 40px;
			font-size: 12px;
			color: #666;
			cursor: pointer;
		}

		.irr-detail {
			background-color: #fff;
			padding: 16px 12px 24px;

			.irr-title {
				font-size: 20px;
				color: #FE6603;
				font-weight: 550;
			}

			.irr-table {
				background: rgba(250, 253, 255, 1);
				border: 1px solid rgba(242, 242, 242, 1);
				margin-top: 21px;
				padding: 16px 16px 0;

				p {
					margin-bottom: 15px;
					font-size: 12px;
					color: #999;

					span {
						color: #333;
					}
				}
			}
		}

		.irr-in {
			padding: 0 11px;
			margin-top: 40px;
			background-color: #fff;

			.irr-nav {
				height: 60px;
				line-height: 60px;
				font-size: 18px;
				color: #FE6603;
				font-weight: 550;
			}

			.people-table {
				border: 1px solid rgba(242, 242, 242, 1);
				border-collapse: collapse;

				.people-top {
					background: rgba(250, 253, 255, 1);
					border-bottom: 1px solid #F2F2F2;
					display: flex;
					flex-direction: row;
					height: 40px;
					font-size: 14px;
					font-weight: 550;
					line-height: 40px;

					div {
						text-align: center;
						border-right: 1px solid #F2F2F2;
						border-collapse: collapse;
					}
				}

				.people-dea {
					border-bottom: 1px solid #F2F2F2;
					display: flex;
					flex-direction: row;
					min-height: 40px;
					font-size: 14px;

					div {
						text-align: center;
						border-right: 1px solid #F2F2F2;
						border-collapse: collapse;
						height: auto;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.no-pro {
					height: 40px;
					line-height: 40px;
					text-align: center;
					font-size: 14px;
					color: #999;
				}
			}
		}

		// .irr-pro {
		// 	margin-top: 0;
		// 	margin-bottom: 200px;
		// 	padding-bottom: 20px;
		// }
	}
</style>
