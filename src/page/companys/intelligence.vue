<template>
	<div class="intell" v-loading="loading" element-loading-text="拼命加载中">
		<div class="in-nav">
			<span class="left in-po" :class="this.name == '全部' ? 'current' : ''" @click="allshow">全部 ({{num}})<span class="in-bor" v-if="this.name == '全部'" ></span></span>
				<span v-for="(el,i) in allList" :key="i" class="left in-po" :class=" name == el.qualType ? 'current' : ''" @click="changeList(el)">{{el.qualType}} ({{el.list.length}}) <span class="in-bor" v-if="name == el.qualType" > </span>  </span>
		</div>
		<div class="in-table">
				<table class="table-content">
						<tr>
							<td style="width:74px">序号</td>
							<td style="width:380px">资质名称</td>
							<td style="width:150px">资质证书号</td>
							<td style="width:calc(100% - 724px)">发证机关</td>
							<td style="width:120px">有效日期</td>
						</tr>
						<tr v-for="(el,i) in showArr" :key="i" v-show="!result">
							<td>{{i+1}}</td>
							<td>{{el.qualName ? el.qualName: '--'}}</td>
							<td>{{el.certNo ? el.certNo: '--'}}</td>
							<td>{{el.certOrg ? el.certOrg: '--'}}</td>
							<td>{{el.validDate ? el.validDate: '--'}}</td>
						</tr>
				</table>
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
				loading: true,
				num:0
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
							this.num += el.list.length
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
			color: #EB651B;
		}
		.el-loading-spinner .path {
			stroke: #FE6603;
		}
		.el-loading-spinner .el-loading-text {
			color: #FE6603;
		}
		.table-content {
			width: 844px;
			tr {
				td {
					padding: 0 10px;
					box-sizing: border-box;
				}
			}
		}
		.in-nav {
			font-size: 14px;
			color: #000;
			height: 28px;
			line-height: 28px;
			font-weight: 550;
			margin-bottom: 20px;
			.in-pdd {
				padding: 0 5px;
			}
			.in-po {
				cursor: pointer;
				margin-right: 30px;
				position: relative;
			}
			.in-bor {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 30px;
				height: 2px;
				background-color: #EB651B;
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
