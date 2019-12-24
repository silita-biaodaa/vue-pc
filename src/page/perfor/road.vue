<template>
	<div class="perlist">
		<div class="option-box">
			<per-por :state='data.area' @perPor='gainPor'></per-por>
			<div class="select dfrb bor-b mb20">
				<h6>信息来源</h6>
				<ul>
					<li v-for='(el,i) in classif' :key='i' :class="el.value == data.proType ? 'current':''" @click='levelif(el)'>{{el.name}}
					</li>
				</ul>
			</div>
			<m-oney @amount='gainMon'></m-oney>
			<per-time @time='gaintime'></per-time>
		</div>
		<div class="total">
			共找到<span>{{total}}</span>条交通部业绩信息
		</div>


		<div class="per-lists">
			<!-- 判断是否加载中 -->
			<template v-if="isajax">
				<!-- 有数据 -->
				<template v-if="perlist&&perlist.length>0">
					<table class="table-content">
						<tr>
							<td style="width:84px">序号</td>
							<td style="width:calc(100% - 770px)">项目名称</td>
							<td style="width:180px">标段名称</td>
							<td style="width:176px">施工单位</td>
							<td style="width:112px">合同金额</td>
							<td style="width:112px">交工日期</td>
							<td style="width:106px">项目属地</td>
						</tr>
						<tr v-for='(el,i) in perlist' :key='i' @click='decide(el)'>
							<td>{{(data.pageNo-1)*20+(i+1)}}</td>
							<td class="key-text">{{el.proName}}</td>
							<td>{{el.section?el.section:'暂无'}}</td>
							<td>{{el.comName}}</td>
							<td>{{el.amount ? el.amount +"万元" : '暂无'}}</td>
							<td>{{el.buildEnd ? el.buildEnd : '--'}}</td>
							<td>{{el.proWhere}}</td>
						</tr>
					</table>
					<div class="page">
						<nav-page :all='total' :currents='data.pageNo' @skip='Goto'></nav-page>
					</div>
				</template>
				<!-- 无数据  -->
				<template v-else-if="perlist&&perlist.length==0">
					<div class="no-toast">
						<img src="../../assets/img/bank_card @2x.png" alt="">
						<span>Sorry，没有找到符合条件的业绩信息</span>
					</div>
				</template>
				<!-- 加载失败 -->
				<template v-else-if="!perlist">
					<div class="ajax-erroe">
						<img src="../../assets/img/pic-zoudiu.png" />
						<span @click="recoldFn">刷新</span>
					</div>
				</template>
			</template>
			<template v-else>
				<div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
			</template>

		</div>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
	</div>
</template>
<script>
	import {
		project
	} from '@/api/index'
	export default {
		data() {
			return {
				svip: false,
				classif: [{
						name: '全部',
						value: null
					},
					{
						name: '省厅审核',
						value: '省厅审核',
					},
					{
						name: '省厅录入',
						value: '省厅录入',
					}
				],
				amountEnd: '',
				total: 0,
				perlist: [],
				loading: true,
				isajax: false,
				data: {
					pageNo: 1,
					proName: '',
					pageSize: 20,
					amountStart: '',
					amountEnd: '',
					proType: null,
					area: '',
					tabType: "jiaotong",
					buildStart: '',
					buildEnd: ''
				}
			}
		},
		inject: ['reload'],
		methods: {
			closeload(val) {
				this.svip = val.cur
			},
			gainPor(val) {
				this.data.area = val.cur
				this.perlist = [];
				this.data.pageNo = 1
				this.isajax = false;
				this.gainList()
			},
			levelif(el) {
				if (el.value == '') {
					this.data.proType = null
				} else {
					this.data.proType = el.value
				}
				this.perlist = [];
				this.data.pageNo = 1
				this.isajax = false;
				this.gainList()
			},
			gainMon(val) {
				this.data.amountStart = val.state
				this.data.amountEnd = val.end
				this.perlist = [];
				this.data.pageNo = 1
				this.isajax = false;
				this.gainList()
			},
			gaintime(val) {
				this.data.buildStart = val.old
				this.data.buildEnd = val.new
				this.perlist = [];
				this.data.pageNo = 1
				this.isajax = false;
				this.gainList()
			},
			gainList() {
				let that = this;
				project(this.data).then(res => {
					this.isajax = true;
					if (res.code == 1) {
						res.data.forEach(el => {
							el.is = false
						})
						this.total = res.total
						this.perlist = res.data
						// if(res.data.length == 0 ) {
						//   this.Snone = false
						// } else {
						//     this.Snone = true
						// }
					}
				}).catch(function(res) {
					that.isajax = true;
					that.perlist = null;
				})
			},
			Goto(val) {
				this.data.pageNo = val.cur;
				this.perlist = [];
				this.isajax = false;
				this.gainList()
				this.funcom.toList(530)
			},
			decide(el) {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='true') {
						el.is = true
						const {
							href
						} = this.$router.resolve({
							path: '/traffic',
							query: {
								id: el.pkid
							}
						})
						window.open(href, '_blank', )
					} else {
						this.svip = true
						this.modalHelper.afterOpen();
					}

				} else {
					this.$confirm(this.qjTipTxt, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					}).catch(() => {

					});
				}
			},
			//刷新
			recoldFn() {
				this.reload();
			}
		},
		props: {
			state: '',
			title: ''
		},
		watch: {
			title(val) {
				this.perlist = [];
				if (this.$parent.searchType == 1) {
					this.data.comName = val
					this.data.comId = sessionStorage.getItem('companyId');
				} else {
					this.data.proName = val
				}
				this.data.pageNo = 1
				this.perlist = [];
				this.isajax = false;
				this.gainList()
			},
			data: {
				handler(val, old) {
					sessionStorage.setItem('jtSerach', JSON.stringify(val));
				},
				deep: true
			}
		},
		created() {
			// this.search = localStorage.getItem('title') ? localStorage.getItem('title') : ''
			//如果是刷新操作，则复现上次
			if (sessionStorage.getItem('jtSerach')) {
				let data = JSON.parse(sessionStorage.getItem('jtSerach'));
				this.$parent.title = data.proName != '' ? data.proName : data.comName;
				if (data.comName != '') {
					this.$parent.searchType = 1
				} else {
					this.$parent.searchType = 0
				}
				this.data = data;
			} else {
				this.data.area = this.state.source
			}
			this.gainList();
		},
		beforeDestroy() {
			sessionStorage.removeItem('jtSerach')
		},
	}
</script>
<style lang="less" scoped>
</style>
