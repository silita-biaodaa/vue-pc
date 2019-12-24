<template>
	<div class="city">
		<div class="select dfrb bor-b">
            <div>市级区域</div>
            <ul>
                <li v-for='(el,i) in city' :key='i' :class="el.i?'current':'' " @click="evalclass(el)">{{el.name}}</li>
            </ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				city: [],
				citys: []
			}
		},
		props: {
			citystr: ''
		},
		methods: {
			evalclass(el) {
				if(!this.$parent.isajax){
					return false
				}
				if (el.code == '') {
					this.citys = []
					this.city.forEach(el => {
						if (el.code == '') {
							el.i = true
						} else {
							el.i = false
						}
					})
					this.$emit('nextC', {
						cur: this.citys
					})
				} else {
					this.city[0].i = false
					if (this.citys.indexOf(el.code) == -1) {
						if (this.citys.length >= 3) {
							this.$confirm('最多只能选择三个市级', '提示', {
								type: 'warning',
								showCancelButton: false,
								showConfirmButton: false
							})
							return
						} else {
							el.i = true
							this.citys.push(el.code)
							this.$emit('nextC', {
								cur: this.citys
							})
						}
					} else {
						this.citys.splice(this.citys.indexOf(el.code), 1)
						el.i = false
						if (this.citys.length == 0) {
							this.city[0].i = true
						}
						this.$emit('nextC', {
							cur: this.citys
						})
					}
				}
			}
		},
		created() {
			let data = JSON.parse(localStorage.getItem('filter'));
			for (let x of data.area[13].data) {
				x.i = false;
			}
			data.area[13].data.unshift({
				name: '全部',
				code: '',
				i: true
			})
			this.city = data.area[13].data;
			if (this.citystr != '') {
				this.city[0].i = false;
				let arr = this.citystr.split(',');
				for (let x of this.city) {
					for (let y of arr) {
						if (x.code == y) {
							x.i = true;
							break
						}
					}
				}
			}
		}
	}
</script>
<style lang="less" scoped>
.select{
	div{
		width: 64px;
		font-weight: 600;
		color: #150000;
	}
	ul{
		width: calc(100% - 84px);
		margin-top: 2px;
		display: flex;
		padding-bottom: 6px;
		flex-wrap: wrap;
		li{
			min-width: 42px;
			margin-right: 40px;
			margin-bottom: 14px;
			font-size: 14px;
			color: #5A5A5A;
			cursor: pointer;
		}
		.current{
			color: #EB651B;
			font-weight: 600
		}
	}
}
</style>
