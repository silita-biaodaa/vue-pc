<template>
	<div class="intell" v-loading="loading" element-loading-text="拼命加载中">
		<div class="in-nav">
			<span class="left in-po" :class="this.name == '全部' ? 'current' : ''" @click="allshow">全部</span>
			<div class="left" v-for="(el,i) in allList" :key="i">
				<span class="in-pdd">/</span>
				<span class="in-po" :class=" name == el.qualType ? 'current' : ''" @click="changeList(el)">{{el.qualType}} ({{el.list.length}})</span>
			</div>
		</div>
		<div class="in-table">
			<div class="law-nav">
				<div class="left law-hei" style="width:74px">序号</div>
				<div class="left" style="width:200px">资质名称</div>
				<div class="left" style="width:150px">资质证书号</div>
				<div class="left" style="width:250px">发证机关</div>
				<div class="left" style="width:100px">有效日期</div>
			</div>
			<div class="law-nav" v-for="(el,i) in showArr" :key="i" v-show="!result">
				<div class="left law-row" style="width:74px">{{i+1}}</div>
				<div class="left law-row" style="width:200px;lineHeight:15px">{{el.qualName ? el.qualName: '--'}}</div>
				<div class="left law-row" style="width:150px">{{el.certNo ? el.certNo: '--'}}</div>
				<div class="left law-row" style="width:250px">{{el.certOrg ? el.certOrg: '--'}}</div>
				<div class="left law-row" style="width:100px">{{el.certDate ? el.certDate: '--'}}</div>
			</div>
			<div class="no-toast" v-show="result">
				<img src="../../assets/img/bank_card @2x.png" alt="">
				<span>Sorry，暂未查询到该公司的资质信息</span>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getJsonData
	} from '@/api/index'
	export default {
		data() {
			return {
				allList: [],
				allArr: [],
				showArr: [],
				name: '全部',
				id: '',
				result: false,
				loading: true
			}
		},
		methods: {
			gainList() {
				this.id = this.$route.query.id
				let dataParam = JSON.stringify({});
				getJsonData("/company/qual/" + this.id).then(res => {
					if (res.code == 1) {
						this.allList = res.data
						this.allList.forEach((el, i) => {
							this.allArr.push.apply(this.allArr, el.list)
						})
						this.showArr = this.allArr
						if (this.showArr.length == 0) {
							this.result = true
						}
						this.loading = false
					}
				});
			},
			changeList(el) {
				this.name = el.qualType
				this.showArr = el.list
				if (this.showArr.length == 0) {
					this.result = true
				}
			},
			allshow() {
				this.name = '全部'
				this.showArr = this.allArr
				if (this.showArr.length == 0) {
					this.result = true
				}
			}
		},
		computed: {

		},
		created() {
			this.gainList()
		},
		components: {}
	}
</script>
<style lang="less">
	.intell {
		background-color: #fff;
		padding-bottom: 50px;

		.current {
			color: #333;
		}

		.el-loading-spinner .path {
			stroke: #FE6603;
		}

		.el-loading-spinner .el-loading-text {
			color: #FE6603;
		}

		.in-nav {
			font-size: 14px;
			color: #999;
			height: 44px;
			line-height: 44px;
			padding-left: 22px;
			font-weight: 550;

			.in-pdd {
				padding: 0 5px;
			}

			.in-po {
				cursor: pointer;
			}
		}

		.in-table {
			margin: 0 9px;
			border: 1px solid #f2f2f2;
			font-size: 12px;
			color: #333;

			.law-nav {
				min-height: 40px;
				border-bottom: 1px solid #f2f2f2;
				display: flex;
				align-items: center;
				font-size: 12px;
				color: #333;
				font-weight: 550;
				text-align: center;

				.law-row {
					min-height: 40px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.no-search {
			width: 100%;
			height: 500px;
			border-top-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
