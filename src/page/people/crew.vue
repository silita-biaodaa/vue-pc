<template>
	<div class="crew">
		<en-search @vague='entitle' :title="serach" @company="companyFn"></en-search>
		<div class="option-box">
			<per-por :state='state' @perPor='gainPor' :address="data.province"></per-por>
			<div class="select">
				<el-row>
					<el-col :span='2'>注册类别:
					</el-col>
					<el-col :span='22'>
						<ul class='left pro'>
							<li v-for='(el,i) in list' :key='i' class='left' :class="el.category == data.category ? 'current':''" @click='evalclass(el)'>{{el.category}}</li>
						</ul>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="total">
			共找到<span>{{total}}</span>条人员信息
		</div>
		<div class="build-list">
			<!-- 判断是否加载中 -->
			<template v-if="isajax">
				<!-- 有数据 -->
				<template v-if="person&&person.length>0">
					<table class="table-content">
						<tr>
							<td style="width:84px">序号</td>
							<td style="width:108px">姓名</td>
							<td style="width:calc(100% - 784px)">注册单位</td>
							<td style="width:182px">注册类别</td>
							<td style="width:166px">证书编号</td>
							<td style="width:136px">专业</td>
							<td style="width:108px">操作</td>
						</tr>
						<tr v-for='(el,i) in person' :key='i' @click='toPer(el)'>
							<td>{{(data.pageNo-1)*20+(i+1)}}</td>
							<td>{{el.name}}</td>
							<td>{{el.comName}}</td>
							<td>{{el.category}}</td>
							<td>{{el.certNo}}</td>
							<td>{{el.major ? el.major : '--'}}</td>
							<td>
								<span class="isUnder" @click.stop="jumpya(el)" v-if="el.isUnder">押证</span>
							</td>
						</tr>
					</table>
					<div class="page">
						<nav-page :all='total' :currents='data.pageNo' @skip='Goto'></nav-page>
					</div>
				</template>
				<!-- 无数据  -->
				<template v-else-if="person&&person.length==0">
					<div class="no-toast">
						<img src="../../assets/img/bank_card @2x.png" alt="">
						<span>Sorry，没有找到符合条件的人员信息</span>
					</div>
				</template>
				<!-- 加载失败 -->
				<template v-else-if="!person">
					<div class="ajax-erroe">
						<img src="../../assets/img/pic-zoudiu.png" />
						<span @click="recoldFn">刷新</span>
					</div>
				</template>
			</template>
			<!-- loading -->
			<template v-else>
				<div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
			</template>
		</div>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
	</div>
</template>
<script>
	import {
		getJsonData,
		Person
	} from '@/api/index'
	export default {
		data() {
			return {
				list: [],
				total: 0,
				person: [],
				isajax: false,
				loading: true,
				svip: false,
				data: {
					keyWord: '',
					category: '全部',
					pageNo: 1,
					pageSize: 20,
					province: '',
					comName: ''
				},
				searchType: 0,
				serach: '',
			}
		},
		inject: ['reload'],
		created() {
			this.serach = localStorage.getItem('title') ? localStorage.getItem('title') : ''
			this.gainDetail();
			//如果是刷新操作，则复现上次
			if (sessionStorage.getItem('peopleSerach')) {
				let data = JSON.parse(sessionStorage.getItem('peopleSerach'));
				this.serach = data.keyWord != '' ? data.keyWord : data.comName;
				if (data.comName != '') {
					this.searchType = 1
				} else {
					this.searchType = 0
				}
				if (data.category == '') {
					data.category = '全部'
				}
				this.state={
					source:data.province
				}
				this.data = data;
			}
			this.gainList()
		},
		props: {
			state: '',
		},
		methods: {
			closeload(val) {
				this.svip = val.cur
			},
			entitle(val) {
				this.searchType = 0;
				this.serach = val.cur;
				this.person = [];
				this.isajax = false;
				this.data.pageNo = 1
				this.gainList()
			},
			gainPor(val) {
				this.data.province = val.cur
				this.person = [];
				this.isajax = false;
				this.data.pageNo = 1
				this.gainList()
			},
			gainDetail() {
				let dataParam = JSON.stringify({});
				getJsonData("/company/personCategory/0", dataParam).then(res => {
					if (res.code == 1) {
						this.list = res.data
						this.list.unshift({
							category: '全部'
						})
					}
				});
			},
			gainList() {
				let that = this;
				if (sessionStorage.getItem('searchType') || this.searchType == 1) {
					this.data.comName = this.serach
					this.data.keyWord = ''
				} else {
					this.data.keyWord = this.serach
					this.data.comName = ''
				}
				let data = JSON.parse(JSON.stringify(this.data));
				data.category = data.category == '全部' ? '' : data.category;

				Person(data).then(res => {
					if (res.code == 1) {
						this.total = res.total
						this.person = res.data
						this.isajax = true;
					}
				}).catch(function(res) {
					that.isajax = true;
					that.person = null;
				})
			},
			Goto(val) {
				this.person = [];
				this.data.pageNo = val.cur;
				this.isajax = false;
				this.funcom.toList(480)
				this.gainList()
			},
			toPer(el) {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					// if(localStorage.getItem('isvip')=='false') {
					//   this.svip = true
					//   this.modalHelper.afterOpen();
					// } else {
					let data= {
						certNo: el.certNo,
						comId: el.comId,
						comName: el.comName,
						idCard: el.idCard,
						sex: el.sex,
						tabCode: el.tabCode,
						name: el.name,
						innerid: el.innerid,
						sealNo:el.sealNo
					}
					sessionStorage.setItem('peopleData',JSON.stringify(data));
					const {
						href
					} = this.$router.resolve({
						path: '/personnel',
					})
					window.open(href, '_blank', )
					// }
				} else {
					this.$confirm(this.qjTipTxt, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					})
				}
			},
			jumpya(el) {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
						this.svip = true
						this.modalHelper.afterOpen();
					} else {
						let data= {
							certNo: el.certNo,
							comId: el.comId,
							comName: el.comName,
							idCard: el.idCard,
							sex: el.sex,
							tabCode: el.tabCode,
							name: el.name,
							innerid: el.innerid,
							sealNo:el.sealNo
						}
						sessionStorage.setItem('peopleData',JSON.stringify(data));
						const {
							href
						} = this.$router.resolve({
							path: '/personnel/escort',
						})
						window.open(href, '_blank', )
					}
				} else {
					this.$confirm(this.qjTipTxt, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					})
				}
			},
			evalclass(el) {
				this.data.category = el.category
				this.person = [];
				this.isajax = false;
				this.data.pageNo = 1
				this.gainList()
			},
			//企业搜索
			companyFn(val) {
				this.person = [];
				this.searchType = 1;
				this.isajax = false;
				this.serach = val.cur;
				this.data.pageNo = 1
				this.gainList()
			},
			//刷新
			recoldFn() {
				this.reload();
			}
		},
		watch: {
			data: { //监听data变化，并实时保存
				deep: true,
				handler(val, old) {
					sessionStorage.setItem('peopleSerach', JSON.stringify(val));
				}
			}
		},
		beforeDestroy() {
			sessionStorage.removeItem('peopleSerach')
		},
	}
</script>
<style lang="less" scoped>
.crew {
	.isUnder{
		border: 1px solid #EB651B;
		color: #EB651B;
		border-radius: 8px;
		padding: 4px 14px;
	}
}
</style>
