<template>
	<div class="bur">
		<div class="law-nav">
			<div class="left" style="width:54px">
				序号
			</div>
			<div class="left" style="width:200px">
				项目名称
			</div>
			<div class="left" style="width:140px">
				项目类别
			</div>
			<div class="left" style="width:140px">
				合同金额
			</div>
			<div class="left" style="width:120px">
				竣工时间
			</div>
			<div class="left" style="width:120px">
				项目属地
			</div>
		</div>
		<!-- 判断是否加载中 -->
		<template v-if="isajax">
			<!-- 有数据 -->
			<template v-if="allArr&&allArr.length>0">
				<div class="law-text" v-for="(el,i) in allArr" :key="i" @click="decide(el)">
					<div class="left" style="width:54px">
						{{(current-1)*20+(i+1)}}
					</div>
					<div class="left  p-10" style="width:200px">
						{{el.proName ? el.proName: '--'}}
					</div>
					<div class="left" style="width:140px">
						{{el.proType ? el.proType: '--'}}
					</div>
					<div class="left" style="width:140px">
						{{el.amount ? el.amount + '万': '--'}}
					</div>
					<div class="left" style="width:120px">
						{{el.buildEnd ? el.buildEnd: '--'}}
					</div>
					<div class="left" style="width:120px">
						{{el.province ? el.province: '--'}}
					</div>
				</div>
				<div class="e-page" v-if="total>20">
					<nav-page :all='total' :currents='current' @skip='Goto'></nav-page>
				</div>
			</template>
			<!-- 无数据  -->
			<template v-else-if="allArr&&allArr.length==0">
				<div class="no-toast">
					<img src="../../assets/img/bank_card @2x.png" alt="">
					<span>Sorry，暂未查询到该公司住建部业绩信息</span>
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
				if (localStorage.getItem('isvip')=='false') {
					this.svip = true
					this.modalHelper.afterOpen();
				} else {
					const {
						href
					} = this.$router.resolve({
						path: '/urban',
						query: {
							id: el.proId
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
					tabType: 'project',
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
		border: 1px solid #f2f2f2;

		.law-nav {
			height: 40px;
			border-bottom: 1px solid #f2f2f2;
			line-height: 40px;
			font-size: 12px;
			color: #333;
			text-align: center;
			font-weight: 550;
		}

		.law-text {
			min-height: 40px;
			border-bottom: 1px solid #f2f2f2;
			font-size: 12px;
			color: #333;
			font-weight: 550;
			display: flex;
			align-items: center;
			text-align: center;
			cursor: pointer;
		}

		.p-10 {
			padding: 6px 0;
		}

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
