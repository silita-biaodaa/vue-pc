<template>
	<div class="money">
		<div class="select">
			<el-row>
				<el-col :span='2'>投资总额:</el-col>
				<el-col :span='9'>
					<ul class='left pro'>
						<li v-for='(el,i) in range' :key='i' class='left' :class="el.min == min ? 'current':''" @click='evalclass(el)'>{{el.name}}</li>
					</ul>
				</el-col>
				<el-col :span='10' class="ttt">
					<el-input placeholder="最低价(万)" v-model="low" @clear='allmon' clearable>
					</el-input>
					<div class="in-line">
					</div>
					<el-input placeholder="最高价(万)" v-model="high" @clear='allmon' clearable>
					</el-input>
					<div class="t-btn" @click='fade'>确定</div>
				</el-col>
			</el-row>
		</div>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				svip: false,
				range: [{
						name: '全部',
						min: null,
						max: null
					},
					{
						name: '500万以下',
						min: '0',
						max: '500'
					},
					{
						name: '500-1000万',
						min: '500',
						max: '1000'
					},
					{
						name: '1000万以上',
						min: '1000',
						max: null
					}
				],
				min: null,
				max: null,
				low: '',
				high: ''
			}
		},
		methods: {
			evalclass(el) {
				this.low = ''
				this.high = ''
				this.min = el.min
				this.max = el.max
				this.$emit('amount', {
					state: this.min,
					end: this.max
				})
			},
			fade() {
				if (this.low == '' && this.high == '') {
					return
				}
				this.min = '-1'
				this.max = ''
				this.$emit('amount', {
					state: this.low,
					end: this.high
				})
			},
			allmon() {
				if (this.low == '' && this.high == '') {
					this.min = null
					this.max = null
					this.$emit('amount', {
						state: this.min,
						end: this.max
					})
				}
			},
			closeload(val) {
				this.svip = val.cur
			},
		},
		created() {
			let data = this.$parent.data;
			if (data.amountStart == 0 && data.amountEnd == 500) {
				this.min = 0;
				this.max = 500;
			} else if (data.amountStart == 500 && data.amountEnd == 1000) {
				this.min = 500;
				this.max = 1000;
			} else if (data.amountStart == 1000 && (data.amountEnd == '' || data.amountEnd == null)) {
				this.min = 1000;
				this.max = null;
			} else {
				this.low = data.amountStart;
				this.high = data.amountEnd;
			}
		},
	}
</script>
<style lang="less">
	.money {
		.select {
			font-size: 16px;
			margin-bottom: 12px;

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
		}

	}
</style>
