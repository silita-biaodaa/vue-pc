<template>
	<div class="select dfrb bor-b mb20">
		<h6>省级区域</h6>
		<ul>
			<li v-for='(el,i) in province' :key='i' :class="el.name == area ? 'current':''" @click='evalclass(el)'>{{el.areaShortName}}</li>
		</ul>
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
					name: '全部',
					areaShortName:'全部'
				})
			}
		},
		components: {}
	}
</script>
<style lang="less">
</style>
