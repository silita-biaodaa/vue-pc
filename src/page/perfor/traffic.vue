<template>
	<div class="wdetail">
		<div class="irr-nav">
			<span @click="junmpto">首页</span>
			<span> > </span>
			<span @click="junmpjiao">交通</span>
			<span> > </span>
			<span>交通部业绩详情</span>
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
						<p>标段名称：<span>{{detail.section}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>所在省份：<span>{{detail.proWhere}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<p>建设状态：<span>{{detail.build}}</span></p>
					</el-col>
					<el-col :span="7">
						<p>项目类型：<span>{{detail.proType}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>技术等级：<span>{{detail.technicalGrade}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<p>开工日期：<span>{{detail.begined}}</span></p>
					</el-col>
					<el-col :span="7">
						<p>交工日期：<span>{{detail.ended}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>竣工日期：<span>{{detail.ended }}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<p>质量评定情况：<span>{{detail.assess}}</span></p>
					</el-col>
					<el-col :span="7">
						<p>合同金额：<span>{{detail.contractAmount + '万'}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>结算金额：<span>{{detail.clearingAmount }}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7" class="cat-col">
						<p style="wordWrap:break-word;display:flex;"><i style="width:60px;display: inline-block;">开始桩号：</i><span class="cat">{{detail.stakeBegin}}</span></p>
					</el-col>
					<el-col :span="7" class="cat-col">
						<p style="wordWrap:break-word;display:flex;"><i style="width:60px;display: inline-block;">结束桩号：</i><span class="cat">{{detail.stakeEnd}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p>主要工程量：<span>{{detail.remark}}</span></p>
					</el-col>
				</el-row>
			</div>
		</div>

		<div class="irr-in irr-b">
			<div class="irr-nav">
				人员履约信息
			</div>
			<div class="people-table">
				<div class="people-top">
					<div style="width:100px;">序号</div>
					<div style="width:300px;">姓名</div>
					<div style="width:300px;">担任岗位或专业负责人</div>
					<div style="width:300px;border:none">任职日期</div>
				</div>
				<div class="people-dea" v-for="(el,i) in detail.persons" :key="i">
					<div style="width:100px;">
						{{i + 1}}
					</div>
					<div style="width:300px;">
						{{el.name}}
					</div>
					<div style="width:300px;">
						{{el.post}}
					</div>
					<div style="width:300px;border:none">
						{{el.begined}} - {{el.ended}}
					</div>
				</div>

				<div class="no-pro" v-show="leader">
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
					tabType: 'jiaotong',
					id: this.id
				}).then(res => {
					if (res.code == 1) {
						console.log(res.data.persons);

						this.detail = res.data
						if (this.detail.persons.length == 0) {
							this.leader = true
						} else {
							this.leader = false
						}
					}
				})
			},
			junmpto() {
				this.$router.push('/')
			},
			junmpjiao() {
				this.$router.push('/perfor/road')
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
	}
</style>
