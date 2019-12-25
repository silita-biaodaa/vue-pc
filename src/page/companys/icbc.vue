<template>
	<div class="icbc">
		<div class="ic-nav">
			<div v-for="(o,i) of navlist" class="navspan" :key="i" :class="{'ic-dark':navNum==i}" @click="navTapFn(i,o.isAjax)">
				{{o.name}}
				<template v-if="o.length!=0">
					(<span>{{o.length}}</span>)
				</template>
				<span class="nav-bor"  v-if="navNum==i" >

				</span>
			</div>
		</div>
		<!-- 基本信息 -->
		<template v-if="navNum==0">
			<v-infor :details="inforData"></v-infor>
		</template>
		<!-- 分支机构 -->
		<template v-else-if="navNum==1">
			<v-branch></v-branch>
		</template>
		<!-- 股东信息 -->
		<template v-else-if="navNum==2">
			<v-holder></v-holder>
		</template>
		<!-- 主要人员 -->
		<template v-else-if="navNum==3">
			<v-people></v-people>
		</template>
		<!-- 变更记录 -->
		<template v-else-if="navNum==4">
			<v-change></v-change>
		</template>
		<!-- 企业年报 -->
		<template v-else-if="navNum==5">
			<v-years></v-years>
		</template>
		<!-- 行政处罚 -->
		<template v-else-if="navNum==6">
			<v-punish></v-punish>
		</template>

	</div>
</template>
<script>
	import {
		Branch,
		getJsonData
	} from '@/api/index'
	import information from '@/components/business/information'
	import branch from '@/components/business/branch'
	import shareholder from '@/components/business/shareholder'
	import changeRecord from '@/components/business/changeRecord'
	import people from '@/components/business/people'
	import annualReport from '@/components/business/annualReport'
	import punish from '@/components/business/punish'
	export default {
		data() {
			return {
				inforData: {}, //基本信息data
				id: '',
				navNum: 0,
				navlist: [{
					name: '基本信息',
					length: 0,
					isAjax: true,
				}, {
					name: '分支机构',
					length: 0,
					isAjax: false,
				}, {
					name: '股东信息',
					length: 0,
					isAjax: false,
				}, {
					name: '主要人员',
					length: 0,
					isAjax: false,
				}, {
					name: '变更记录',
					length: 0,
					isAjax: false,
				}, {
					name: '企业年报',
					length: 0,
					isAjax: false,
				}, {
					name: '行政处罚',
					length: 0,
					isAjax: false,
				}]
			}
		},
		watch: {

		},
		methods: {
			getLen() {
				let that = this;
				this.$http({
					method: 'post',
					url: '/gs/count/company',
					data: {
						comId: this.id,
					}
				}).then(function(res) {
					that.navlist[1].length = res.data.data.branchCompany;
					that.navlist[2].length = res.data.data.partner;
					that.navlist[3].length = res.data.data.personnel;
					that.navlist[4].length = res.data.data.changeRecord;
					that.navlist[5].length = res.data.data.report;
					that.navlist[6].length = res.data.data.punish;
				})
			},
			getInfor() { //基本信息
				this.id = this.$route.query.id
				getJsonData("/company/" + this.id).then(res => {
					if (res.code == 1) {
						this.inforData = res.data
					}
				});
			},
			navTapFn(i) {
				this.navNum = i;
			}
		},
		created() {
			this.getInfor()
			this.getLen()
		},
		components: {
			'v-infor': information,
			'v-branch': branch,
			'v-holder': shareholder,
			'v-change': changeRecord,
			'v-people': people,
			'v-years': annualReport,
			'v-punish': punish
		}
	}
</script>

<style lang="less" scoped>
	.icbc {
		background-color: #fff;
		overflow: hidden;
		.ic-nav {
			font-size: 14px;
			color: #000;
			margin-bottom: 15px;
			cursor: pointer;
			display: flex;
			.navspan {
				line-height: 32px;
				margin-right: 32px;
				position: relative;
				.nav-bor {
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 30px;
					height: 4px;
					background-color: #EB651B;
				}
			}
			.navspan:last-child {
				border-right: none;
			}
		}
		.ic-dark {
			font-weight: 550;
			color: #FE6603;
		}
	}
	.f-color {
		background-color: #fff;

	}
</style>
