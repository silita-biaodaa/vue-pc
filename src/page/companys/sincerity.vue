<template>
	<div class="icbc">
		<div class="ic-nav">
			<div v-for="(o,i) of navlist" class="navspan" :key="i" :class="{'ic-dark':navNum==i}" @click="navTapFn(i,o.isAjax)">
				{{o.name}}
				<span class="nav-line" v-if="navNum==i" ></span>
			</div>
		</div>
		<template v-if="isajax">
			<!-- 企业荣誉 -->
			<template v-if="navNum==0">
				<v-honor :data="honorList"></v-honor>
			</template>
			<!-- 工程获奖 -->
			<template v-else-if="navNum==1">
				<v-prize :data="prizeList"></v-prize>
			</template>
			<!-- 公路信用等级 -->
			<template v-else-if="navNum==2">
				<v-highway :data="highwayList"></v-highway>
			</template>
			<!-- 水利信用等级 -->
			<template v-else-if="navNum==3">
				<v-water :data="shuiliList"></v-water>
			</template>
			<!-- 不良信息 -->
			<template v-else-if="navNum==4">
				<v-bad :data="badList"></v-bad>
			</template>
		</template>
		<template v-else>
			<div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
		</template>
	</div>
</template>
<script>
	import honor from '@/components/sincerity/honor'
	import prize from '@/components/sincerity/prize'
	import highway from '@/components/sincerity/highway'
	import water from '@/components/sincerity/water'
	import bad from '@/components/sincerity/bad'
	export default {
		data() {
			return {
				id: '',
				navNum: 0,
				navlist: [{
					name: '企业荣誉',
					length: 0,
					isAjax: true,
				}, {
					name: '工程获奖',
					length: 0,
					isAjax: false,
				}, 
				{
					name: '公路信用等级',
					length: 0,
					isAjax: false,
				}, {
					name: '水利信用等级',
					length: 0,
					isAjax: false,
				}, 
				{
					name: '不良信息',
					length: 0,
					isAjax: false,
				}],
				honorList:[],
				prizeList:[],
				highwayList:[],
				shuiliList:[],
				badList:[],
				isajax:false,
				loading:true,
			}
		},
		watch: {

		},
		methods: {
			navTapFn(i) {
				this.navNum = i;
			},
			getData(){
				let data={
					comId:this.$route.query.id,
					source:this.$route.query.source,
					reqType:'PC'
				}
				let that=this;
				this.$http({
					method:'post',
					url:'/reputation/new/company',
					data:data
				}).then(res =>{
					that.isajax=true;
					if(res.data.code==1){
						that.honorList=res.data.data.companyAwards
						that.prizeList=res.data.data.projectAwards
						that.highwayList=res.data.data.highway
						that.shuiliList=res.data.data.shuili
						that.badList=res.data.data.under
					}else{
						that.$alert(res.data.msg);
					}
				}).catch(function(){
					that.isajax=true;
				})
			}
		},
		created() {
			this.getData();
		},
		components: {
			'v-honor':honor,
			'v-prize':prize,
			'v-highway':highway,
			'v-water':water,
			'v-bad':bad
		}
	}
</script>
<style lang="less" scoped>
	.icbc {
		background-color: #fff;
		// overflow: hidden;
		padding: 1px 0;
		.ic-nav {
			font-size: 14px;
			color: #000;
			cursor: pointer;
			display: flex;
			margin-bottom: 20px;
			.navspan {
				margin-right: 30px;
				line-height: 38px;
				position: relative;
				.nav-line {
					position: absolute;
					height: 4px;
					width: 30px;
					bottom: 0;
					left: 50%;
					transform: translateX(-52%);
					background-color: #FE6603;
				}
			}

			.navspan:last-child {
				border-right: none;
			}
		}

		.ic-dark {
			color: #FE6603;
		}

	}

	.f-color {
		background-color: #fff;

	}
</style>
