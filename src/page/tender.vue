<template>
	<div class="tender">
		<en-search @vague='entitle' :title="serach" @company="companyFn"></en-search>
		<div class="option-box">
			<div class="select">
				<el-row>
					<el-col :span="2">省&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp份:
					</el-col>
					<el-col :span="22">
						<ul class='pro'>
							<li v-for='(el,i) in areas' :key='i' class='left' :class="el.code==area? 'current':''" @click='eval(el)'>{{el.name}}</li>
						</ul>
					</el-col>
				</el-row>
			</div>
			<c-ity @nextC='gainC' v-show='Scity' :citystr="city"></c-ity>
			<div class="select">
				<el-row>
					<el-col :span="2" class="t-5">中标金额:
					</el-col>
					<el-col :span="14">
						<ul class='pro'>
							<li v-for='(el,i) in sums' :key='i' class='left l-30' :class="el.s==data.projSumStart? 'current':''" @click='evalsum(el)'>{{el.name}}</li>
						</ul>
					</el-col>
					<el-col :span="8" class="ttt">
						<el-input placeholder="最低价" v-model="data.low" clearable>
						</el-input>
						<div class="in-line">
						</div>
						<el-input placeholder="最高价" v-model="data.high" clearable>
						</el-input>
						<div class="t-btn" @click='fade'>
							确定
						</div>
					</el-col>
				</el-row>
			</div>
			<!-- <div class="select cc-btn ">
          <div class="c-sure"  @click="gainList" >
             查询
          </div>
        </div> -->
		</div>
		<div class="total">
			共找到<span>{{total}}</span>条中标公告
		</div>
		<!-- 判断是否加载中 -->
		<template v-if="isajax">
			<!-- 有数据 -->
			<template v-if="queryLists&&queryLists.length>0">
				<div class="t-list">
					<a v-for="(el,i ) of queryLists" :key="i" @click="decide(el)">
						<div class="m-bt">
							<p class="left m-rg">
								{{(data.pageNo-1)*20+(i+1)}}
							</p>
							<p class="left super" :title="el.title">
								{{el.title}}
							</p>
							<p class="right">
								{{el.openDate}}
							</p>
						</div>
						<div class="aptitude">
							<p class="left surplus">
								<span :title='el.oneName'>第一候选人:{{el.oneName ? el.oneName : '详见原文' }}</span>
							</p>
							<p class="right">
								<span>中标金额:{{el.oneOffer ? el.oneOffer + '万' : '详见原文'}}</span>
							</p>
						</div>
					</a>
					<div class="page">
						<nav-page :all='total' :currents='data.pageNo' @skip='Goto'></nav-page>
					</div>
				</div>
			</template>
			<!-- 无数据  -->
			<template v-else-if="queryLists&&queryLists.length==0">
				<div class="no-toast">
					<img src="../assets/img/bank_card @2x.png" alt="">
					<span>Sorry，没有找到符合条件的公告信息</span>
				</div>
			</template>
			<!-- 加载失败 -->
			<template v-else-if="!queryLists">
				<div class="ajax-erroe">
					<img src="../assets/img/pic-zoudiu.png" />
					<span @click="recoldFn">刷新</span>
				</div>
			</template>
		</template>
		<!-- loading -->
		<template v-else>
			<div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
		</template>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
	</div>
</template>
<script>
	import {
		queryList,
		filter
	} from '@/api/index';
	export default {
		data() {
			return {
				svip: false,
				area: '',
				loading: true,
				isajax: false,
				Stroke: true,
				areas: [],
				sums: [{
						name: '全部',
						i: 0,
						s: '',
						e: ''
					},
					{
						name: '500万-1000万',
						i: 1,
						s: '500',
						e: '1000'
					},
					{
						name: '1000万-5000万',
						i: 0,
						s: '1000',
						e: '5000'
					},
					{
						name: '5000万-10000万',
						i: 0,
						s: '5000',
						e: '10000'
					},
					{
						name: '10000万以上',
						i: 0,
						s: '10000',
						e: ''
					}
				],
				queryLists: [],
				rank: 0,
				total: 0,
				present: 0,
				Scity: true,
				city: '',
				data: {
					pageNo: 1,
					pageSize: 20,
					type: 2,
					projSumStart: '',
					projSumEnd: '',
					title: '',
					regions: 'hunan',
					// sumType:"zhongbiao",
					high: '',
					low: '',
					comName: ''
				},
				searchType: 0,
				serach: '',
			}
		},
		inject: ['reload'],
		methods: {
			gainC(val) {
				if (val.cur.length == 0) {
					this.data.regions = this.area
					this.current = 1
					this.isajax = false
					this.gainList()
				} else {
					let str = val.cur.join(',')
					this.data.regions = this.area + "||" + str
					this.current = 1
					this.isajax = false
					this.gainList()
				}
			},
			gainFilter() {
				let data = JSON.parse(sessionStorage.getItem('filter'));
				this.areas = data.area;
			},
			closeload(val) {
				this.svip = val.cur
			},
			Goto(val) {
				this.data.pageNo = val.cur;
				sessionStorage.setItem('pageNo', val.cur);
				this.funcom.toList(470)
				this.queryLists = [];
				this.isajax = false
				this.gainList()
			},
			eval(el) {
				if (this.Stroke) {
					this.Stroke = false
				} else {
					return
				}
				if (el.name == '湖南省') {
					this.Scity = true
				} else {
					this.Scity = false
				}
				this.area = el.code
				// sessionStorage.setItem('address', el.name)
				/* 地址修改后   重置serach以及type*/
				this.serach = '';
				this.searchType = 0;
				/*end*/
				this.data.regions = this.area
				this.isajax = false;
				this.data.pageNo = 1
				this.gainList()
				setTimeout(() => {
					this.Stroke = true
				}, 1000);

			},
			evalsum(el) {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
						this.svip = true
						this.modalHelper.afterOpen();
					} else {
						if (this.Stroke) {
							this.Stroke = false
						} else {
							return
						}
						this.rank = 0
						this.data.low = '',
							this.data.high = '',
							this.data.projSumStart = el.s,
							this.data.projSumEnd = el.e
						this.data.pageNo = 1
						this.isajax = false
						this.gainList()
						setTimeout(() => {
							this.Stroke = true
						}, 500);
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
			gainList() {
				let data = this.data;
				let that = this;
				if (sessionStorage.getItem('searchType') || this.searchType == 1) {
					data.comName = this.serach
					data.title = ''
				} else {
					data.title = this.serach
					data.comName = ''
				}
				if (this.rank == 0) {
					queryList(data).then(res => {
						if (res.code == 1) {
							if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
								res.data.forEach(el => {
									if (el.oneName) {
										if (el.oneName.indexOf('公司') == -1) {
											let xin = el.oneName.length
											el.oneName = '*'
											for (var i = 1; i < xin; i++) {
												el.oneName = el.oneName + '*'
											}
										} else {
											let xin = el.oneName.length
											el.oneName = '*'
											for (var i = 1; i < xin; i++) {
												el.oneName = el.oneName + '*'
											}
											el.oneName = el.oneName + '公司'
										}
									}
									el.oneOffer = el.oneOffer + '';
									// el.oneOffer=el.oneOffer.replace(/\d/g,'*'); 
									if (el.oneOffer) {
										let mm = el.oneOffer.length
										el.oneOffer = '*'
										for (var i = 1; i < mm; i++) {
											el.oneOffer = el.oneOffer + '*'
										}
									}
								})
							}
							this.isajax = true;
							this.queryLists = res.data
							this.present = res.pageNo
							this.total = res.total
							//  if(this.total == 0 ) {
							//    this.Snone = false
							//  } else {
							//    this.Snone = true
							//  }
						}
					}).catch(function(res) {
						that.isajax = true;
						that.queryLists = null;
					})
				} else {
					data.projSumStart = data.low;
					data.projSumEnd = data.high;
					queryList(data).then(res => {
						if (res.code == 1) {
							if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
								res.data.forEach(el => {
									if (el.oneName) {
										if (el.oneName.indexOf('公司') == -1) {
											el.oneName = '***********'
										} else {
											el.oneName = '***********' + '公司'
										}
									} else {
										el.oneName = '***********'
									}
								})
								el.oneOffer = '***'
							}
							this.isajax = true;
							this.queryLists = res.data
							this.present = res.pageNo
							this.total = res.total
							// if(this.total == 0 ) {
							//   this.Snone = false
							// } else {
							//   this.Snone = true
							// }
						}
					}).catch(function(res) {
						that.isajax = true;
						that.queryLists = null;
					})
				}
			},
			entitle(val) {
				this.searchType = 0;
				this.serach = val.cur
				this.queryLists = [];
				this.data.pageNo = 1
				this.isajax = false
				// this.queryLists = []
				this.gainList()
			},
			fade() {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
						this.svip = true
						this.modalHelper.afterOpen();
					} else {
						this.isajax = false
						this.rank = 1
						this.data.projSumStart = ''
						this.data.projSumEnd = ''
						this.data.pageNo = 1
						this.gainList()
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
			toTop() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			decide(el) {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					const {
						href
					} = this.$router.resolve({
						path: '/notice',
						query: {
							id: el.id,
							source: el.source
						}
					})
					window.open(href, '_blank', )
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
			SHcity() {
				if (this.area == 'hunan') {
					this.Scity = true
				} else {
					this.Scity = false
				}
			},
			//企业搜索
			companyFn(val) {
				this.searchType = 1;
				this.serach = val.cur;
				this.queryLists = [];
				this.data.pageNo = 1
				this.isajax = false
				this.gainList()
			},
			//刷新
			recoldFn() {
				this.reload();
			}
		},
		beforeDestroy() { //销毁前删除本地
			sessionStorage.removeItem('tenderSerach')
		},
		watch: {
			state(val) {
				if (val.source == '湖南省') {
					this.Scity = true
				} else {
					this.Scity = false
				}
				this.area = val.code
				this.data.regions = this.area
				this.data.pageNo = 1
				this.gainList()
			},
			data: {
				deep: true,
				handler(val, old) {
					sessionStorage.setItem('tenderSerach', JSON.stringify(val));
				}
			}

		},
		props: {
			state: ''
		},
		created() {
			if (sessionStorage.getItem('pageNo')) {
				this.data.pageNo = sessionStorage.getItem('pageNo') * 1;
			}
			this.serach = localStorage.getItem('title') ? localStorage.getItem('title') : '';
			this.area = this.state.code
			this.data.regions = this.area
			this.gainFilter()
			//如果是刷新操作，则复现上次
			if (sessionStorage.getItem('tenderSerach')) {
				let data = JSON.parse(sessionStorage.getItem('tenderSerach'));
				this.serach = data.title != '' ? data.title : data.comName;
				if (data.comName != '') {
					this.searchType = 1
				} else {
					this.searchType = 0
				}
				this.data = data;
				if (data.regions.indexOf('||') > -1) { //省市
					let arr = data.regions.split('||');
					this.area = arr[0];
					this.city = arr[1];
				} else {
					this.area = data.regions;
				}
			}
			this.SHcity()
			this.toTop()
			this.gainList()
		},
	}
</script>
<style lang="less">
	.tender {
		width: 100%;
		padding-top: 84px;

		.el-loading-spinner .path {
			stroke: #FE6603;
		}

		.el-loading-spinner .el-loading-text {
			color: #FE6603;
		}

		.t-btn {
			width: 50px;
			height: 26px;
			text-align: center;
			line-height: 26px;
			margin-left: 30px;
			background-color: #FE6603;
			font-size: 14px;
			color: #fff;
			border-radius: 5px;
			margin-top: 2px;
			cursor: pointer;
		}

		.noneS {
			width: 1020px;
			margin: 0 auto;
			background-color: #fff;
			height: 582px;
			margin-bottom: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.select {
			font-size: 16px;
			margin-bottom: 12px;

			.t-5 {
				// margin-top: 5px;
			}

			.ttt {
				display: flex;

				.el-input {
					width: 30%;
				}

				.el-input__inner {
					height: 30px;
					line-height: 30px;
				}

				.in-line {
					width: 26px;
					height: 1px;
					background-color: #999;
					margin: auto 14px;
				}

				.t-btn {
					width: 50px;
					height: 26px;
					text-align: center;
					line-height: 26px;
					margin-left: 30px;
					background-color: #FE6603;
					font-size: 14px;
					color: #fff;
					border-radius: 5px;
					margin-top: 2px;
				}
			}

			.el-select {
				width: 225px;
				margin-right: 10px;
			}
		}

		.t-list {
			width: 1020px;
			margin: 0 auto;
			background-color: #fff;
			box-sizing: border-box;
			margin-bottom: 125px;
			font-size: 16px;

			a {
				height: 80px;
				box-sizing: border-box;
				padding: 20px 22px 0 20px;
				border-bottom: 1px solid #f2f2f2;
				overflow: hidden;
				display: block;
				cursor: pointer;
				text-decoration: none;
				out-line: none;
				color: #333;

				.m-rg {
					width: 34px;
				}

				.m-bt {
					margin-bottom: 5px;
					overflow: hidden;
					height: 25px;
					line-height: 25px;
				}

				.super {
					width: 750px;
					text-overflow: ellipsis;
					overflow: hidden;
					margin-left: 10px;
					white-space: nowrap;
				}

				.aptitude {
					color: #EC7522;
					font-size: 14px;
					margin-left: 50px;

					.surplus {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						width: 260px;
					}
				}
			}
		}
	}
</style>
