<template>
	<div class="intell"  @keyup.enter="searchFn" >
		<div class="in-nav new-nav">

			<div>
				<span class=" in-po" :class="pro ? 'current' : ''" @click="swpro">住建部 ({{proT}})</span>
				<span class="m-lr">/</span>
				<span class=" in-po" :class="water ? 'current' : ''" @click="swater">水利部 ({{waterT}})</span>
				<span class="m-lr">/</span>
				<span class=" in-po" :class="tra ? 'current' : ''" @click="swtra">交通部 ({{traT}})</span>
			</div>

			<div>
				<el-input placeholder="请输入关键字搜索" suffix-icon="el-icon-search" v-model="search">
				</el-input>
			</div>

		</div>
		<div class="in-tabler">
			<c-bur :search='search' v-if="pro" ref="burRef"></c-bur>
			<c-water :search='search' v-if="water" ref="waterRef"></c-water>
			<c-tra :search='search' v-if="tra" ref="traRef"></c-tra>
		</div>
	</div>
</template>
<script>
	import {
		Project
	} from '@/api/index'
	export default {
		data() {
			return {
				id: '',
				// loading: true,
				showArr: [],
				waterArr: [],
				traArr: [],
				search: '',
				pro: true,
				water: false,
				tra: false,
				proT: 0,
				waterT: 0,
				traT: 0,
				name: '',
			}
		},
		methods: {
			searchFn(){
				if(this.pro){
					this.$refs.burRef.searchFn()
				}else if(this.water){
					this.$refs.waterRef.searchFn()
				}else if(this.tra){
					this.$refs.traRef.searchFn()
				}
			},
			gainPro() {
				Project({
					comId: this.id,
					type: 'page',
					comName: this.name,
					pageNo: 1,
					tabType: 'project',
					pageSize: 10,
					proName: this.search
				}).then(res => {
					if (res.code == 1) {
						if (res.data.length == 0) {
							this.proT = 0
						} else {
							this.proT = res.total
						}
					}
				})
			},
			gainWater() {
				Project({
					comId: this.id,
					pageNo:1,
					comName: this.name,
					tabType: 'shuili',
					pageSize: 10,
					proName: this.search
				}).then(res => {
					if (res.code == 1) {
						if (res.data.length == 0) {
							this.waterT = 0
						} else {
							this.waterT = res.total
						}
					}
				})
			},
			gainTra() {
				Project({
					comId: this.id,
					pageNo:1,
					comName: this.name,
					tabType: 'jiaotong',
					pageSize: 10,
					proName: this.search
				}).then(res => {
					if (res.code == 1) {
						if (res.data.length == 0) {
							this.traT = 0
						} else {
							this.traT = res.total
						}
					}
				})
			},
			swpro() {
				this.pro = true
				this.water = false
				this.tra = false
				// this.current = 1
				this.search = ''
				// this.gainList()
			},
			swater() {
				this.pro = false
				this.water = true
				this.tra = false
				// this.current = 1
				this.search = ''
				// this.gainList()
			},
			swtra() {
				this.pro = false
				this.water = false
				this.tra = true
				// this.current = 1
				this.search = ''
				// this.gainList()
			}
		},
		created() {
			this.id = this.$route.query.id
			this.name = this.$route.query.name
			this.gainPro()
			this.gainWater()
			this.gainTra()
			// this.gainList()
		},
		components: {}
	}
</script>
<style lang="less">
	.intell {
		background-color: #fff;

		// padding-bottom: 50px;
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
			height: 56px;
			line-height: 56px;
			padding-left: 22px;
			font-weight: 550;

			.in-pdd {
				padding: 0 5px;
			}

			.in-po {
				cursor: pointer;
				// vertical-align: bottom;
			}

			.m-lr {
				margin: 0 5px;
			}
		}

		.new-nav {
			display: flex;
			justify-content: space-between;
			margin-right: 9px;
		}

		.e-page {
			display: flex;
			justify-content: center;
			// height: 150px;
			padding-top: 50px;
			padding-bottom: 75px;

			.paging {
				ul {
					li {
						height: 30px;
						line-height: 30px;
						padding: 0 8px;
						margin-right: 5px;
					}

					.put-jump {
						height: 30px;
						line-height: 30px;
					}
				}
			}
		}

		.in-tabler {
			margin: 0 9px;
			// border: 1px solid #f2f2f2;
			font-size: 12px;
			color: #333;
		}

	}
</style>
