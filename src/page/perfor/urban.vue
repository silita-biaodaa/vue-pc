<template>
	<div class="wdetail">
		<div class="irr-nav">
			<span @click="junmpto">首页</span>
			<span> > </span>
			<span @click="junmpjiao">业绩</span>
			<span> > </span>
			<span>住建部业绩详情</span>
		</div>
		<div class="irr-detail">
			<div class="irr-title">
				{{detail.proName}}
			</div>

			<div class="irr-table">
				<el-row>
					<el-col :span="7">
						<p>项目编号：<span>{{detail.projectNo}}</span></p>
					</el-col>
					<el-col :span="7">
						<p>省级项目编号：<span>{{detail.proNo}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>所在区划：<span>{{detail.proWhere}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="14">
						<p>建设单位组织机构代码 （统一社会信用代码）：<span>{{detail.orgCode}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>建设单位：<span>{{detail.proOrg}}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<p>项目类别：<span>{{detail.proType}}</span></p>
					</el-col>
					<el-col :span="7">
						<p>建设性质：<span>{{detail.buildType}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>工程用途：<span>{{detail.proUse }}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<p>投资总额：<span>{{detail.investAmount + '万'}}</span></p>
					</el-col>
					<el-col :span="7">
						<p>总面积：<span>{{detail.acreage}}</span></p>
					</el-col>
					<el-col :span="10">
						<p>立项级别：<span>{{detail.proLevel }}</span></p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<p>立项文号：<span>{{detail.approvalNum}}</span></p>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="ub-nav">
			<span v-for="(el,i) in navs" :key="i" :class="el.i  ? 'p-color' : '' " @click="jump(el)">{{el.name}} <span v-if="el.to">({{el.all}})</span>
			</span>
		</div>
		<router-view :titles='detail.proName' :area='detail.proWhere'></router-view>

	</div>
</template>
<script>
	import {
		prodet,
		count
	} from '@/api/index';
	export default {
		data() {
			return {
				detail: {},
				id: '',
				navs: [{
						name: '招投标',
						to: 'ubid',
						all: 0,
						i: false
					},
					{
						name: '/',
					},
					{
						name: '施工图审查',
						to: 'execu',
						all: 0,
						i: false
					},
					{
						name: '/',
					},
					{
						name: '合同备案',
						to: 'upact',
						all: 0,
						i: false
					},
					{
						name: '/',
					},
					{
						name: '施工许可',
						to: 'uallow',
						all: 0,
						i: false
					},
					{
						name: '/',
					},
					{
						name: '竣工验收备案',
						to: 'ulete',
						all: 0,
						i: false
					}
				],
			}
		},
		methods: {
			gainshui() {
				prodet({
					id: this.id
				}).then(res => {
					if (res.code == 1) {

						this.detail = res.data

					}
				})
			},
			gaincount() {
				count({
					proId: this.id
				}).then(res => {
					if (res.code == 1) {
						console.log(res, 1);
						this.navs[0].all = res.data.zhaotoubiao // 招投标
						this.navs[2].all = res.data.desin // 审查
						this.navs[4].all = res.data.contract // 合同
						this.navs[6].all = res.data.build // 许可
						this.navs[8].all = res.data.completion // 竣工
					}

				})
			},
			junmpto() {
				this.$router.push('/')
			},
			junmpjiao() {
				this.$router.push('/perfor/perlist')
			},
			jump(el) {
				if (el.to == null) {
					return
				}
				this.$router.push({
					path: el.to,
					query: {
						id: this.id
					}
				})
			}
		},
		watch: {
			$route: {
				handler: function(val, oldVal) {
					this.navs.forEach(el => {
						el.i = false
					})
					this.navs[val.meta.i].i = true
				},
				deep: true
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.navs[this.$route.meta.i].i = true
			this.gainshui()
			this.gaincount()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.wdetail {
		min-height: calc(~"100vh - 195px");
		overflow: hidden;
		padding-top: 86px;
		width: 1160px;
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

		.ub-nav {
			height: 60px;
			line-height: 60px;
			font-size: 18px;
			color: #999;
			cursor: pointer;
			margin-top: 40px;
			background-color: #fff;
			padding-left: 10px;

			span {
				margin-right: 6px;
			}
		}
	}
</style>
