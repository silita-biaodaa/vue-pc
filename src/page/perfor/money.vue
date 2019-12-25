<template>
	<div class="money">
		<div class="select dfrb bor-b mb20">
			<h6>投资总额</h6>
			<div>
				<ul>
					<li v-for='(el,i) in range' :key='i' :class="el.min==min? 'current':''" @click='evalclass(el)'>{{el.name}}</li>
				</ul>
				<div class="row drc fs14  mb20">
					<input placeholder="最低价（万元）" class="bg-f4f borde fs14 mr20" v-model="low" clearable type="text"/>
					至
					<input placeholder="最高价（万元）" class="bg-f4f borde fs14 ml20 mr20" v-model="high" clearable type="text"/>
					<div class="t-btn bg-theme cp" @click='fade'>确定</div>
				</div>
			</div>
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
<style lang="less" scoped>
	.select.dfrb>div{
		width:calc(100% - 84px);
		ul{
			width:100%
		}
		.row{
			input{
				width: 110px;
				height:36px;
				padding: 8px 10px;
				box-sizing: border-box;
			}
			.t-btn{
				width: 60px;
				line-height: 36px;
				color: #fff;
				text-align: center;
			}
		}
	}

</style>
