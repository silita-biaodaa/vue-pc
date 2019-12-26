<template>
	<div class="intell"  @keyup.enter="searchFn" >
		<div class="in-nav new-nav">

			<div class="nav-in" >
				<div class="in-po" :class="pro ? 'current' : ''" @click="swpro">住建部 ({{proT}}) <div class="po-b" v-if="pro" ></div> </div>
				<div class="in-po" :class="water ? 'current' : ''" @click="swater">水利部 ({{waterT}}) <div class="po-b" v-if="water" ></div> </div>
				<div class="in-po" :class="tra ? 'current' : ''" @click="swtra">交通部 ({{traT}}) <div class="po-b" v-if="tra" ></div> </div>
			</div>

			<div>
				<el-input placeholder="请输入关键字搜索" prefix-icon="el-icon-search" v-model="search">
				</el-input>
			</div>

		</div>
		<div class="in-tabler">
			<v-bur :search='search' v-if="pro" ref="burRef"></v-bur>
			<v-water :search='search' v-if="water" ref="waterRef"></v-water>
			<v-traffic :search='search' v-if="tra" ref="traRef"></v-traffic>
		</div>
	</div>
</template>
<script>
import bur from '@/page/companys/bur'
import water from '@/page/companys/water'
import traffic from '@/page/companys/traffic'
	import {
		Project
	} from '@/api/index'
	export default {
		data() {
			return {
				id: '',
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
		components: {
			'v-bur':bur,
			'v-water':water,
			'v-traffic':traffic
		}
	}
</script>
<style lang="less">
	.intell {
		.current {
			color: #EB651B;
			font-weight: 550;
		}
		.el-loading-spinner .path {
			stroke: #FE6603;
		}
		.el-loading-spinner .el-loading-text {
			color: #FE6603;
		}
		.in-nav {
			font-size: 14px;
			color: #000;
			.in-pdd {
				padding: 0 5px;
			}
			.nav-in {
				display: flex;
			}
			.in-po {
				cursor: pointer;
				height: 38px;
				line-height: 38px;
				position: relative;
				margin-right: 30px;
				.po-b {
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-55%);
					background-color: #EB651B;
					height: 4px;
					width: 30px;
				}
			}
			.el-input__inner {
				background-color: #F4F4F4;
				i {
					color: #B6B6B6;
				}
			}
			.m-lr {
				margin: 0 5px;
			}
		}
		.new-nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
		}
		.e-page {
			display: flex;
			justify-content: center;
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
			font-size: 14px;
			color: #000;
		}
	}
</style>
