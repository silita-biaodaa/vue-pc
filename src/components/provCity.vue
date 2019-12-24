<template>
	<div class="provCity">
		<div class="select dfrb bor-b mb20">
            <div>省级区域</div>
            <ul>
                <li v-for='(el,i) in areas' :key='i' :class="el.name==area? 'current':''" @click='eval(el)'>{{el.areaShortName}}</li>
            </ul>
		</div>
		<div class="select dfrb bor-b mb20">
            <div>市级区域</div>
            <ul>
                <li v-for='(el,i) in list' :key='i' :class="cstr.indexOf(el.name) == -1 ? '' : 'current'" @click="level(el)">{{el.name}}</li>
            </ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
                areas: [],
				area: '',
				list: [],
				cstr: '全部',
				all: [],
				allt: true
			}
		},
		props: {
			city: '',
		},
		watch: {
			city() {
				this.area = this.city.source
				this.areas.forEach(el => {
					if (el.name == this.area) {
						this.list = el.data
					}
				})
			}
		},
		methods: {
			// 获取地区
			gainFilter() { // 对传进来的数据解析，是否包含市级下面地区
				if (this.city.source.indexOf("||") == -1) {
					this.area = (this.city.source == '' ? '全部' : this.city.source)
					if (this.area == '全部') {
						this.allt = false
					} else {
						this.allt = true
					}
				} else {
					let arr = this.city.source.split('||')
					this.area = arr[0]
					this.cstr = arr[1]
					this.all = arr[1].split(',')
				}
			},
			eval(el) {
				// sessionStorage.setItem('address',el.name);
				this.area = el.name
				this.all=[];
				this.cstr='全部'
				if (this.area == '全部') {
					this.allt = false
					this.$emit('Cnext', {
						cur: ''
					})
				} else {
					for (let x of el.data) {
						x.i = false;
					}
					this.list = el.data
					this.allt = true
					this.$emit('Cnext', {
						cur: this.area
					})
				}
			},
			marry() {
				this.areas.forEach(el => {
					if (el.name != '全部') {
						el.data.unshift({
							name: '全部',
							i: true
						})
						if (el.name == this.area) {
							this.list = el.data
						}
					}

				})
			},
			level(el) {
				if(!this.$parent.isajax){
					return false
				}
				if (el.name == '全部') {
					this.all = []
					this.cstr = '全部'
					this.$emit('Cnext', {
						cur: this.area
					})
				} else {
					if (this.all.indexOf(el.name) == -1) {
						if (this.all.length >= 3) {
							this.$confirm('最多只能选择三个市级', '提示', {
								type: 'warning',
								showCancelButton: false,
								showConfirmButton: false
							})
							return
						} else {
							this.all.push(el.name)
							this.cstr = this.all.join(',')
							this.$emit('Cnext', {
								cur: (this.area + '||' + this.cstr)
							})
						}
					} else {
						this.all.splice(this.all.indexOf(el.name), 1)
						this.cstr = this.all.join(',')
						if (this.all.length == 0) {
							this.all = []
							this.cstr = '全部'
							this.$emit('Cnext', {
								cur: this.area
							})
						} else {
							this.$emit('Cnext', {
								cur: (this.area + '||' + this.cstr)
							})
						}

					}
				}
			}
		},
		created() {
			let data = JSON.parse(localStorage.getItem('filter'));
			this.gainFilter()
			this.areas = data.area;
			this.areas.unshift({
                name: '全部',
                areaShortName:'全部'
			})
			this.marry()
		},
		mounted() {

		},
	}
</script>
<style lang="less" scoped>
.provCity{
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
}
</style>
