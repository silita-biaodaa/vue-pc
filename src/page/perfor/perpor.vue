<template>
	<div class="perpor">
		<div class="select">
			<el-row>
				<el-col :span='2'>省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:</el-col>
				<el-col :span='22'>
					<ul class='left pro'>
						<li v-for='(el,i) in province' :key='i' class='left' :class="el.name == area ? 'current':''" @click='evalclass(el)'>{{el.name}}</li>
					</ul>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				province: [],
				area: ''
			}
		},
		methods: {
			evalclass(el) {
				this.area = el.name
				if (this.area == '全部') {
					this.$emit('perPor', {
						cur: ''
					})
				} else {
					this.$emit('perPor', {
						cur: this.area
					})
				}
			},
		},
		props: {
			state: {
				default: ''
			},
		},
		watch: {
			state(val) {
				if (val != '') {
					this.area = val.source || val
					this.$emit('perPor', {
						cur: this.area
					})
				}

			}
		},
		created() {
			let data = JSON.parse(localStorage.getItem('filter'));
			this.area = (this.state == '' ? '全部' : this.state);
			if (this.$route.fullPath == '/crew') {
				this.area = (this.state.source == '' ? '全部' : this.state.source);
			}
			this.province = data.area;
			if (!(this.$route.fullPath == '/crew')) {
				this.province.unshift({
					name: '全部'
				})
			}
		},
		components: {}
	}
</script>
<style lang="less">
	.perpor {
		.select {
			font-size: 16px;
			margin-bottom: 12px;
		}
	}
</style>
