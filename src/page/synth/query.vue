<template>
	<div class="query">
		<div class="select">
			<el-row>
				<el-col :span='2'>省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:</el-col>
				<el-col :span='22'>
					<ul class='pro'>
						<li v-for='(el,i) in areas' :key='i' class='left bid-p' :class="el.name==area? 'current':''" @click="charea(el)">{{el.name}}</li>
					</ul>
				</el-col>
			</el-row>
		</div>
		<v-screenzz :qualList='companyQuals' @contentChange='screenzzFn' :query='true'></v-screenzz>
		<div class="select" style="margin-top: 20px;">
			<el-row>
				<el-col :span='2' class="se-center">业绩要求:</el-col>
				<el-col :span='22'>
					<div class="se-per left">
						<div class="m-17">
							业绩平台:&nbsp&nbsp&nbsp
							<el-select v-model="terrace" placeholder="请选择业绩平台" style="width:300px">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<div class="m-17 ">
							<div class="left se-center">
								竣工时间:&nbsp&nbsp&nbsp&nbsp
							</div>
							<div class="contract">
								<el-date-picker v-model="stateDate" type="date" placeholder="起始时间" value-format="yyyy-MM-dd"> </el-date-picker>
								<span>至</span>
								<el-date-picker v-model="endDate" type="date" placeholder="结束时间" value-format="yyyy-MM-dd"> </el-date-picker>
							</div>
						</div>
					</div>
					<div class="se-per right">
						<div class="m-17">
							项目名称:&nbsp&nbsp&nbsp
							<input type="text" placeholder="输入项目名关键词，多个关键词用“，”隔开" v-model="name" class="name-put">
						</div>
						<div class="m-17 ">
							<div class="left se-center">合同金额:&nbsp&nbsp&nbsp&nbsp</div>
							<div class="contract">
								<input type="text" placeholder="最低价(万)" v-model="min" class="contract-put">
								<span>至</span>
								<input type="text" placeholder="最高价(万)" v-model="max" class="contract-put">
							</div>
						</div>
					</div>

				</el-col>
			</el-row>

		</div>
		<div class="syn-btn">
			<div class="btn" @click="query">
				查询
			</div>
		</div>
	</div>
</template>
<script>
	import {
		report
	} from '@/api/index';
	import screenZZ from '@/components/screenZZ'
	export default {
		data() {
			return {
				area: '湖南',
				areas: [{
						name: '北京'
					},
					{
						name: '天津'
					},
					{
						name: '河北'
					},
					{
						name: '山西'
					},
					{
						name: '内蒙古'
					},
					{
						name: '辽宁'
					},
					{
						name: '吉林'
					},
					{
						name: '黑龙江'
					},
					{
						name: '上海'
					},
					{
						name: '江苏'
					},
					{
						name: '浙江'
					},
					{
						name: '安徽'
					},
					{
						name: '福建'
					},
					{
						name: '江西'
					},
					{
						name: '山东'
					},
					{
						name: '河南'
					},
					{
						name: '湖北'
					},
					{
						name: '湖南'
					},
					{
						name: '广西'
					},
					{
						name: '海南'
					},
					{
						name: '重庆'
					},
					{
						name: '四川'
					},
					{
						name: '贵州'
					},
					{
						name: '云南'
					},
					{
						name: '西藏'
					},
					{
						name: '陕西'
					},
					{
						name: '甘肃'
					},
					{
						name: '青海'
					},
					{
						name: '宁夏'
					},
					{
						name: '新疆'
					},
					{
						name: '广东'
					},
				],
				options: [{
						value: 'project',
						label: '全国建筑市场监管公共服务平台'
					},
					{
						value: 'shuili',
						label: '全国水利建设市场信用信息平台'
					},
					{
						value: 'jiaotong',
						label: '全国公路建设市场信用信息管理系统'
					}
				],
				terrace: 'project',
				stateDate: '',
				endDate: '',
				name: '',
				min: '',
				max: '',
				allstr: '',
				companyQuals:[]
			}
		},
		props: {
			state: ''
		},
		components:{
			'v-screenzz':screenZZ
		},
		watch: {
			state(val) {
				this.area = val
				this.stateDate = ''
				this.endDate = ''
				this.name = ''
				this.min = ''
				this.max = ''
			}
		},
		methods: {
			gainFilter() {
				let data = JSON.parse(localStorage.getItem('filter'));
				this.companyQuals = data.comQua;
			},
			screenzzFn(val){//接受资质变化抛出的值
				this.allstr=val.str;
				this.rangeType=val.type;
			},
			charea(el) {
				this.area = el.name
				this.stateDate = ''
				this.endDate = ''
				this.name = ''
				this.min = ''
				this.max = ''
			},
			query() {
				if (!(sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken'))) {
					this.$confirm('查看更多信息，请立即登录', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					})
					return false
				}
				if (this.name.trim() == '') {
					return this.$confirm('项目名称不能为空', '提示', {
						type: 'warning',
						showCancelButton: false,
						showConfirmButton: false
					})
				}
				let date = {
					regisAddress: this.area + '省',
					qualCode: this.allstr,
					rangeType: this.rangeType,
					projSource: this.terrace,
					projName: this.name,
					buildStart: this.stateDate,
					buildEnd: this.endDate,
					amountStart: this.min,
					amountEnd: this.max
				}
				report(date).then(res => {
					if (res.code == 1) {
						localStorage.setItem('query', JSON.stringify(date))
						this.$router.push('/result')
					}

				})
			}
		},
		created() {
			this.gainFilter();
		},
	}
</script>
<style lang="less" scoped>
	.query {
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		margin-bottom: 200px;
		padding: 15px;

		.select {
			font-size: 16px;
			margin-bottom: 20px;
			.current {
				background-color: #FE6603 !important;
				color: #fff !important;
			}
			.pro {
				li {
					padding: 2px 9px;
					height: 20px;
					text-align: center;
					line-height: 20px;
					margin-bottom: 6px;
					cursor: pointer;
					color: #666;
				}

				.bid-p {
					padding: 2px 9px;
					color: #666;
				}

				.current {
					background-color: #FE6603;
					color: #fff;
				}
			}

			.se-center {
				line-height: 40px;
			}

			.se-per {
				width: 50%;
				font-size: 14px;
				color: #999;
				display: flex;
				flex-direction: column;

				.m-17 {
					margin-bottom: 17px;
				}

				input {
					height: 40px;
					line-height: 40px;
					border: 1px solid #dcdfe6;
					border-radius: 4px;
					padding: 0 15px;
					font-size: inherit;
				}

				.contract {
					width: 300px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.contract-put {
						width: 120px;
						box-sizing: border-box;
					}
				}

				.name-put {
					width: 300px;
					box-sizing: border-box;
				}

				input::-webkit-input-placeholder {
					color: #999;
				}
			}
		}
		.syn-btn {
			display: flex;
			justify-content: center;
			.btn {
				width: 154px;
				height: 46px;
				line-height: 46px;
				background-color: #FE6603;
				text-align: center;
				border-radius: 5px;
				color: #fff;
				margin-top: 61px;
				margin-bottom: 72px;
				font-size: 16px;
				cursor: pointer;
			}
		}
	}
</style>
