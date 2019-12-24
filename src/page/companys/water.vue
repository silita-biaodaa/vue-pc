<template>
	<div class="bur">
		<!-- 判断是否加载中 -->
		<template v-if="isajax">
			<!-- 有数据 -->
			<template v-if="allArr&&allArr.length>0">
					<table class="table-content">
						<tr>
							<td style="width:54px">序号</td>
							<td style="width:180px">项目名称</td>
							<td style="width:140px">施工单位</td>
							<td style="width:120px">合同金额</td>
							<td style="width:70px">业绩级别</td>
							<td style="width:90px">完工日期</td>
							<td style="width:120px">项目属地</td>
						</tr>
						<tr v-for="(el,i) in allArr" :key="i" @click="decide(el)">
							<td>{{(current-1)*20+(i+1)}}</td>
							<td>{{el.proName ? el.proName: '--'}}</td>
							<td>{{el.comName ? el.comName: '--'}}</td>
							<td>{{el.amount ? el.amount : '--'}}</td>
							<td>{{el.proType ? el.proType: '--'}}</td>
							<td>{{el.build ? el.build: '--'}}</td>
							<td>{{el.proWhere ? el.proWhere: '--'}}</td>
						</tr>
					</table>
				<div class="e-page" v-if="total>20">
					<nav-page :all='total' :currents='current' @skip='Goto'></nav-page>
				</div>
			</template>
			<!-- 无数据  -->
			<template v-else-if="allArr&&allArr.length==0">
				<div class="no-toast">
					<img src="../../assets/img/bank_card @2x.png" alt="">
					<span>Sorry，暂未查询到该公司的水利部业绩信息</span>
				</div>
			</template>
			<!-- 加载失败 -->
			<template v-else-if="!allArr">
				<div class="ajax-erroe">
					<img src="../../assets/img/pic-zoudiu.png" />
					<span @click="recoldFn">刷新</span>
				</div>
			</template>
		</template>
		<template v-else>
			<div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
		</template>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
	</div>
</template>
<script>
	import {Project} from '@/api/index'
	export default {
		data() {
			return {
				allArr: [],
				svip: false,
				current: 1,
				total:0,
				loading:true,
				isajax:false,
			}
		},
		props: ['search'],
		inject: ['reload'],
		methods: {
			Goto(val) {
				this.allArr=[];
				this.isajax=false;
				this.current = val.cur
				this.ajax()
				this.funcom.toList(180)
			},
			searchFn(){
				this.allArr=[];
				this.isajax=false;
				this.current = 1
				this.ajax()
				this.funcom.toList(180)
			},
			decide(el) {
				if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
					this.svip = true
					this.modalHelper.afterOpen();
				} else {
					const {
						href
					} = this.$router.resolve({
						path: '/irrigation',
						query: {
							id: el.pkid
						}
					})
					window.open(href, '_blank', )
				}
			},
			closeload(val) {
				this.svip = val.cur
			},
			ajax(){
				let that=this;
				Project({
					comId: this.$route.query.id,
					type: 'page',
					comName: this.$route.query.name,
					pageNo: this.current,
					tabType: 'shuili',
					pageSize: 20,
					proName: this.search
				}).then(res => {
					that.isajax=true;
					if (res.code == 1) {
						this.total = res.total
						this.allArr = res.data
					}
				}).catch(function(){
					that.isajax=true;
					that.allArr=null;
				})
			},
			//刷新
			recoldFn() {
				this.reload();
			}
		},
		created() {
			this.ajax();
		},
	}
</script>
<style lang="less">
	.bur {
		.no-search {
			width: 100%;
			height: 500px;
			border-top-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
