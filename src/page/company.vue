<template>
	<div class="company">
		<en-search @vague='entitle' :all='total' @company='entitle'></en-search>
		<div class="option-box">
			<all-city :city='last' @Cnext='eval'></all-city>
			<!-- <div class="select">
				<el-row>
					<el-col :span="2" class="t-5">
						注册资金:
					</el-col>
					<el-col :span="14">
						<ul class='pro'>
							<li v-for='(el,i) in sums' :key='i' class='left l-30' :class="el.s==start? 'current':''" @click='evalsum(el)'>{{el.name}}</li>
						</ul>
					</el-col>
					<el-col :span="8" class="ttt">
						<el-input placeholder="最低价" v-model="low" @change="fade" clearable>
						</el-input>
						<div class="in-line">
						</div>
						<el-input placeholder="最高价" v-model="high" @change="fade" clearable>
						</el-input>
						<div class="t-btn" @click='gainList'>
							确定
						</div>
					</el-col>
				</el-row>
			</div> -->
			<div class="select" v-if="data.regisAddress.indexOf('湖南省')>-1">
				<el-row>
					<el-col :span="2" class="t-5">备案地区：</el-col>
					<el-col :span="14">
						<div class='left c-isbei t-5' v-for="(el,i) in recordList" :key='i' :class="el.code==data.isBei?'current':''" @click='isBeiFn(el)'>{{el.name}}</div>
					</el-col>
				</el-row>
			</div>
			<div class="select" v-if="data.regisAddress.indexOf('湖南省')>-1">
				<el-row>
					<el-col :span="2" class="t-5">荣誉类别：</el-col>
					<el-col :span="14">
						<div class='left c-isbei t-5' v-for="(el,i) in honoraryList" :key='i' :class="el.istap?'current':''" @click='honorCateFn(el)'>{{el.name}}</div>
					</el-col>
				</el-row>
			</div>
			<div class="select" v-if="data.regisAddress.indexOf('湖南省')>-1&&honoraryList[0].istap">
				<el-row>
					<el-col :span="2" class="t-5">等&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp级：</el-col>
					<el-col :span="14">
						<div class='left c-isbei t-5' v-for="(el,i) in levelList" :key='i' :class="el.istap?'current':''" @click='levelFn(el)'>{{el.name}}</div>
					</el-col>
				</el-row>
			</div>
			<!-- 资质 -->
			<div class="select">
				<span>资质要求:</span>&nbsp&nbsp
				<el-select v-model="companyQual" placeholder="选择资质类型" clearable @change='first'>
					<el-option v-for="item in companyQuals" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<el-select v-model="major" placeholder="请选择" clearable @change='firsts' v-if="majors.length>0">
					<el-option v-for="item in majors" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<el-select v-model="grade" placeholder="请选择" clearable @change='firstss' v-if="grades.length>0">
					<el-option v-for="item in grades" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>

				<div class='right com-btn' :class="isSerach?'isSerach':''" @click='changeapi'>资质查询</div>
			</div>
			<div class="select" v-show='two'>
				<span class='op-c'>资质要求:</span>&nbsp&nbsp
				<el-select v-model="twoQual" placeholder="选择资质类型" clearable @change='twoq'>
					<el-option v-for="item in companyQuals" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<el-select v-model="twot" placeholder="请选择" clearable @change='twoqs' v-if="twots.length>0">
					<el-option v-for="item in twots" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<el-select v-model="twott" placeholder="请选择" clearable @change='twoqss' v-if="twotts.length>0">
					<el-option v-for="item in twotts" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<span class='sty-del' @click='twof'>删除</span>
			</div>
			<div class="select" v-show='three'>
				<span class='op-c'>资质要求:</span>&nbsp&nbsp
				<el-select v-model="threeQual" placeholder="选择资质类型" clearable @change='threeq'>
					<el-option v-for="item in companyQuals" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<el-select v-model="threet" placeholder="请选择" clearable @change='threeqs' v-if="threets.length>0">
					<el-option v-for="item in threets" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<el-select v-model="threett" placeholder="请选择" clearable @change='threeqss' v-if="threetts.length>0">
					<el-option v-for="item in threetts" :key="item.name" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
				<span class='sty-del' @click='threef'>删除</span>
			</div>
			<div class='select m-20'>
				<div class='op-c left'>资质要求:&nbsp&nbsp&nbsp</div>
				<div class='left c-btn' @click='transt' v-if="!three">
					<i class='el-icon-plus'></i>增加条件
				</div>

			</div>
			<div class='select m-20 c-red' v-show='five'>
				<div class='op-c left'>资质要求:&nbsp&nbsp&nbsp</div>
				资质最多只可添加3条
			</div>
			<div class="select" v-show='five'>
				<el-row>
					<el-col :span="2" class="t-5">
						资质关系:
					</el-col>
					<el-col :span="14">
						<div class='left c-rela t-5' v-for="(el,i) in rela" :key='i' :class="el.key == rangeType? 'current':''" @click='crela(el)'>
							{{el.name}}
						</div>
					</el-col>
				</el-row>
			</div>
			<!-- 资质end -->
		</div>

		<div class="total">
			共找到<span>{{total}}</span>家企业
		</div>

		<!-- 判断是否加载中 -->
		<template v-if="isajax">
			<!-- 有数据 -->
			<template v-if="companylisy&&companylisy.length>0">
				<div>
					<div class="firm">
						<div class='firm-ul'>
							<div>
								<div class="left t-size" style="width:80px;">
									序号
								</div>
								<div class="left t-size" style="width:300px;">
									企业名称
								</div>
								<div class="left t-size" style="width:120px;">
									法定代表
								</div>
								<div class="left t-size" style="width:180px;">
									注册资本
								</div>
								<div class="left t-size" style="width:200px;">
									联系方式
								</div>
								<div class="left t-size" style="width:140px;">
									所属地区
								</div>
							</div>
							<!-- <router-link v-for='(el,i) in companylisy' :key='i' tag='a' :to="{path:'/introduce',query:{id:el.comId,name:el.comName,source:el.regisAddress}}" target='_blank'   > -->
							<a v-for='(el,i) in companylisy' :key='i' @click='decide(el)'>
								<div class="left " style="width:80px;">
									{{(data.pageNo-1)*20+(i+1)}}
								</div>
								<div class="left" style="width:300px;">
									<span class='c-col'>{{el.comName}}</span>
								</div>
								<div class="left" style="width:120px;">
									{{el.legalPerson}}
								</div>
								<div class="left" style="width:180px;">
									{{el.regisCapital ? el.regisCapital : '暂无'}}
								</div>
								<div class="left" style="width:200px;">
									{{el.phone ? el.phone : '暂无'}}
								</div>
								<div class="left" style="width:140px;">
									{{el.regisAddress}}
								</div>
							</a>
						</div>
					</div>
					<div class="c-page">
						<nav-page :all='total' :currents='data.pageNo' @skip='Goto'></nav-page>
					</div>
				</div>
			</template>
			<!-- 无数据  -->
			<template v-else-if="companylisy&&companylisy.length==0">
				<div class="no-toast">
					<img src="../assets/img/bank_card @2x.png" alt="">
					<span>Sorry，没有找到符合条件的企业信息</span>
				</div>
			</template>
			<!-- 加载失败 -->
			<template v-else-if="!companylisy">
				<div class="ajax-erroe">
					<img src="../assets/img/pic-zoudiu.png" />
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
	import {
		filter,
		companys
	} from '@/api/index'
	export default {
		data() {
			return {
				svip: false,
				isajax: false,
				loading: true,
				isSerach: false,
				// sums: [{
				// 		name: '全部',
				// 		i: 0,
				// 		s: '0',
				// 		e: ''
				// 	},
				// 	{
				// 		name: '500万-1000万',
				// 		i: 1,
				// 		s: '500',
				// 		e: '1000'
				// 	},
				// 	{
				// 		name: '1000万-5000万',
				// 		i: 0,
				// 		s: '1000',
				// 		e: '5000'
				// 	},
				// 	{
				// 		name: '5000万-10000万',
				// 		i: 0,
				// 		s: '5000',
				// 		e: '10000'
				// 	},
				// 	{
				// 		name: '10000万以上',
				// 		i: 0,
				// 		s: '10000',
				// 		e: ''
				// 	}
				// ],
				two: false,
				three: false,
				// rank: 0,
				// start: '0',
				// end: '',
				// low: '',
				// high: '',
				companyQuals: [],
				companyQual: '',
				majors: [],
				major: '',
				grade: '',
				grades: [],
				twoQual: '',
				twot: '',
				twots: [],
				twott: '',
				twotts: [],
				threeQual: '',
				threet: '',
				threets: [],
				threett: '',
				threetts: [],
				firstarr: [],
				firststr: '',
				twoarr: [],
				twostr: '',
				threearr: [],
				threestr: '',
				allarr: [],
				allstr: '',
				rangeType: 'and',
				rela: [{
						name: '和',
						key: 'and'
					},
					{
						name: '或',
						key: 'or'
					}
				],
				companylisy: [],
				five: false,
				total: 0,
				//  current:1,
				title: '',
				present: 9,
				last: '',
				recordList:[//备案地区
					{
						name:'湘内企业',
						code:'hunan'
					},{
						name:'入湘企业',
						code:'enterCompany'
					},{
						name:'湘内企业+入湘企业',
						code:'enterHunan'
					},
				],
				honoraryList:[//荣誉类别
					{
						name:'安全认证',
						istap:false,
						code:'aqrz||省级优秀/省级合格/市级优秀/市级合格'
					},{
						name:'安全考评优良企业',
						istap:false,
						code:'reviewFine'
					}
				],
				levelList:[
					{
						name:'全部',
						istap:true,
					},{
						name:'省级优秀',
						istap:false,
					},{
						name:'省级合格',
						istap:false,
					},{
						name:'市级优秀',
						istap:false,
					},{
						name:'市级合格',
						istap:false,
					},
				],
				data: { // 传参条件  
					regisAddress: '', // 多地区
					// minCapital: '', // 最小资金
					// maxCapital: '', // 最大资金
					qualCode: '', // 资质
					pageNo: 1, // 页码
					pageSize: 20,
					levelRank: '',
					rangeType: '', // 资质关联
					keyWord: this.title, // 关键字 
					isBei:'hunan',//备案地区
					honorCate:'',//荣誉类别
				},
			}
		},
		props: {
			state: ''
		},
		inject: ['reload'],
		watch: {
			companyQual(val) { // 资质第一个得
				this.major = ''
				this.majors = []
				this.companyQuals.forEach(el => {
					if (el.code == val) {
						this.majors = el.data
					}
				});
			},
			twoQual(val) {
				this.twot = ''
				this.twots = []
				this.companyQuals.forEach(el => {
					if (el.code == val) {
						this.twots = el.data
					}
				});
			},
			threeQual(val) {
				this.threet = ''
				this.threets = []
				this.companyQuals.forEach(el => {
					if (el.code == val) {
						this.threets = el.data
					}
				});
			},
			major(val) {
				this.grade = ''
				this.grades = []
				this.majors.forEach(el => {
					if (el.code == val) {
						this.grades = el.data
					}
				});
			},
			twot(val) {
				this.twott = ''
				this.twotts = []
				this.twots.forEach(el => {
					if (el.code == val) {
						this.twotts = el.data
					}
				});
			},
			threet(val) {
				this.threett = ''
				this.threetts = []
				this.threets.forEach(el => {
					if (el.code == val) {
						this.threetts = el.data
					}
				});
			},
			state(val) {
				this.companylisy = []
				this.last = val
				this.data.regisAddress = this.last
				this.data.pageNo = 1
				this.isajax = false;
				this.again()
			},
			data:{
				deep:true,
				handler(val,old){
					sessionStorage.setItem('comselect',JSON.stringify(val));
				}
			}
		},
		methods: {
			isBeiFn(el){//备案地区
				this.data.isBei=el.code;
				// sessionStorage.setItem('comselect', JSON.stringify(this.data))
				this.again()
			},
			honorCateFn(el){//荣誉类别
				el.istap=!el.istap;
				this.honorCateEnter();
			},
			honorCateEnter(){//荣誉类别入参
				let arr=[];
				for(let x of this.honoraryList){
					if(x.istap){
						arr.push(x.code);
					}
				}
				let str=arr.join(',');
				this.data.honorCate=str;
				// sessionStorage.setItem('comselect', JSON.stringify(this.data))
				this.again()
			},
			levelFn(el){//等级
				if(el.name=='全部'){//全部
					this.levelList[1].istap=false;
					this.levelList[2].istap=false;
					this.levelList[3].istap=false;
					this.levelList[4].istap=false;
					el.istap=true;
					this.honoraryList[0].code='aqrz||省级优秀/省级合格/市级优秀/市级合格';
				}else{
					this.levelList[0].istap=false;
					el.istap=!el.istap;
					let arr=[];
					for(let x of this.levelList){
						if(x.istap){
							arr.push(x.name)
						}
					}
					this.honoraryList[0].code='aqrz||'+arr.join('/');
				}
				if(this.forLevel()==0){
					this.levelList[0].istap=true;
					this.honoraryList[0].code='aqrz||省级优秀/省级合格/市级优秀/市级合格';
				}
				this.honorCateEnter();
			},
			forLevel(){//反选
				for(let x of this.levelList){
					if(x.istap){
						return 1
					}
				}
				return 0
			},
			closeload(val) {
				this.svip = val.cur
			},
			gainFilter() {
				let data = JSON.parse(sessionStorage.getItem('filter'));
				this.areas = data.area;
				this.companyQuals = data.comQua;
			},
			gainCompany() {
				let data = {}
				let that = this;
				data = this.data
				if (localStorage.getItem('permissions')) {
					data.isVip = 1
				} else {
					data.isVip = 0
				}
				companys(data).then(res => {
					this.isajax = true;
					this.isSerach = false;
					if (localStorage.getItem('permissions')) {
						let arr = []
						res.data.forEach(el => {
							if (el.phone) {
								arr = el.phone.split(';')
								el.phone = arr[0]
								arr.length = 0
							}
						});
					}
					this.companylisy = res.data
					this.present = res.pageNum
					this.total = res.total
					// if(this.total == 0 ) {
					//   this.Snone = true
					// } else {
					//   this.Snone = false
					// }
				}).catch(function(res) {
					that.isajax = true;
					that.isSerach = false;
					that.companylisy = null;
				})
			},
			// 获取公司企业列表
			changeapi() {
				// if(this.allarr.length==0){
				//   this.$alert('至少选择两级资质哦')
				//   return false
				// }
				if (this.allarr.length > 1) {
					this.data.rangeType = this.rangeType;
				} else {
					this.data.rangeType = ''
				}
				if (this.isSerach) {
					return false
				}
				this.isSerach = true;
				this.allstr = this.allarr.join(",")
				this.data.qualCode = this.allstr
				// sessionStorage.setItem('Rank', this.rank) // 页面刷新用于判断资金值得从哪里来
				// sessionStorage.setItem('comselect', JSON.stringify(this.data))
				this.again()
			},
			again() {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					if (localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('comFilter') == -1) {
						this.svip = true
						this.modalHelper.afterOpen();
					} else {
						this.data.pageNo = 1;
						this.isajax = false;
						this.companylisy = [];
						//  this.allstr = this.allarr.join(",")
						//  this.loading = true
						//  if(this.rank == 0 ) {
						this.gainCompany()
						//  } else {
						//    let data = this.data 
						//    data.minCapital = this.low
						//    data.maxCapital = this.high
						//    companys(data).then(res => {
						//    this.companylisy = res.data
						//    this.total = res.total
						//    this.loading = false
						//    this.present = res.pageNum
						//    if(this.total == 0 ) {
						//       this.Snone = true
						//     } else {
						//       this.Snone = false
						//     }
						//   })
						//  }
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
			add() {
				if (this.two) {
					this.three = true
				}
				this.two = true

			},
			eval(val) {
				if (!this.isajax) {
					return
				}
				//每次切换省份，重置备案地区等值
				this.data.honorCate='';
				if(val.cur=='湖南省'){
					this.data.isBei='hunan';
				}else{
					this.data.isBei='';
				}
				this.companylisy = [];
				this.data.pageNo = 1;
				this.isajax = false;
				this.data.regisAddress = val.cur
				this.allstr = this.allarr.join(",");
				this.data.qualCode = this.allstr;
				// if (this.rank == 0) { // 判断注册资金是否获取方式
				// 	data.minCapital = this.start
				// 	data.maxCapital = this.end
				// 	sessionStorage.setItem('comselect', JSON.stringify(data))
				// } else {
				// 	data.minCapital = this.low
				// 	data.maxCapital = this.high
				// 	sessionStorage.setItem('comselect', JSON.stringify(data))
				// }
				this.gainCompany()
			},
			// evalsum(el) {
			// 	if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
			// 		if (localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('comFilter') == -1) {
			// 			this.svip = true
			// 			this.modalHelper.afterOpen();
			// 		} else {
			// 			if (!this.isajax) {
			// 				return
			// 			}
			// 			this.rank = 0
			// 			this.low = '',
			// 				this.high = '',
			// 				this.start = el.s,
			// 				this.end = el.e
			// 			this.data.minCapital = this.start
			// 			this.data.maxCapital = this.end
			// 			this.allstr = this.allarr.join(",")
			// 			this.data.qualCode = this.allstr
			// 			this.isajax = false;
			// 			this.data.pageNo = 1
			// 			// this.loading = true
			// 			sessionStorage.setItem('Rank', '0') // 页面刷新用于判断资金值得从哪里来
			// 			sessionStorage.setItem('comselect', JSON.stringify(this.data))
			// 			this.again()
			// 		}
			// 	} else {
			// 		this.$confirm(this.qjTipTxt, '提示', {
			// 			confirmButtonText: '确定',
			// 			cancelButtonText: '取消',
			// 			type: 'warning'
			// 		}).then(() => {
			// 			this.$router.push('/logo')
			// 		}).catch(() => {

			// 		});
			// 	}


			// },
			// gainList() {
			// 	if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
			// 		if (localStorage.getItem('permissions') == '' || localStorage.getItem('permissions').indexOf('comFilter') == -1) {
			// 			this.svip = true
			// 			this.modalHelper.afterOpen();
			// 		} else {
			// 			this.data.pageNo = 1
			// 			// this.rank = 1
			// 			// this.start = ''
			// 			// this.end = ''
			// 			this.isajax = false;
			// 			// this.loading = true
			// 			this.allstr = this.allarr.join(",")
			// 			this.data.qualCode = this.allstr
			// 			// this.data.minCapital = this.low
			// 			// this.data.maxCapital = this.high
			// 			// sessionStorage.setItem('Rank', '1') // 页面刷新用于判断资金值得从哪里来
			// 			sessionStorage.setItem('comselect', JSON.stringify(this.data))
			// 			this.again()
			// 		}
			// 	} else {
			// 		this.$confirm(this.qjTipTxt, '提示', {
			// 			confirmButtonText: '确定',
			// 			cancelButtonText: '取消',
			// 			type: 'warning'
			// 		}).then(() => {
			// 			this.$router.push('/logo')
			// 		}).catch(() => {

			// 		});
			// 	}
			// },
			transt() {
				this.five = true
				if (this.two) {
					this.three = true
				} else {
					this.two = true
				}
			},
			twof() {
				this.two = false
				this.allarr.splice(1, 1);
				if (!this.three) {
					this.five = false
				}
			},
			threef() {
				this.three = false
				if (this.allarr.length == 3) {
					this.allarr.splice(2, 1);
				} else if (this.allarr.length == 2) {
					this.allarr.splice(1, 1);
				}
				if (!this.two) {
					this.five = false
				}
			},
			// fade() {
			// 	this.rank = 1
			// 	this.start = ''
			// 	this.end = ''
			// 	this.data.pageNo = 1
			// 	this.isajax = false;
			// 	// this.again()
			// },
			ftwo() {
				this.two = false
			},
			fthree() {
				this.three = false
			},
			first(val) {
				this.firstarr = [],
					this.allarr = []
				if (val == '') {
					if (this.twostr) {
						if (this.threestr) {
							this.allarr.push(this.twostr, this.threestr)
						} else {
							this.allarr.push(this.twostr)
						}
					} else {
						if (this.threestr) {
							this.allarr.push(this.threestr)
						}
					}
				}

			},
			firsts(val) {
				this.allarr = [];
				this.firstarr = [];
				this.firstarr.push(val)
				this.firststr = this.firstarr.join('/')
				this.fisrtpush()
			},
			firstss(val) {
				this.allarr = []
				this.firstarr.length = 1;
				this.firstarr.push(val)
				this.firststr = this.firstarr.join('/')
				if (this.firststr == this.twostr || this.firststr == this.threestr) {
					this.grade = ''
					this.$confirm('当前条件已选择，请重新选择资质条件', '提示', {
						type: 'warning',
						showCancelButton: false,
						showConfirmButton: false
					})
				} else {
					this.fisrtpush()
				}
			},
			fisrtpush() {
				if (this.twostr) {
					if (this.threestr) {
						this.allarr.push(this.firststr, this.twostr, this.threestr)
					} else {
						this.allarr.push(this.firststr, this.twostr)
					}
				} else {
					if (this.threestr) {
						this.allarr.push(this.firststr, this.threestr)
					} else {
						this.allarr.push(this.firststr)
					}
				}
			},
			twoq(val) {
				this.twoarr = []
				this.allarr = []
				if (val == '') {
					if (this.firstarr) {
						if (this.threestr) {
							this.allarr.push(this.firstarr, this.threestr)
						} else {
							this.allarr.push(this.firstarr)
						}
					} else {
						if (this.threestr) {
							this.allarr.push(this.threestr)
						}
					}
				}

			},
			twoqs(val) {
				this.twoarr = []
				this.allarr = []
				this.twoarr.push(val)
				this.twostr = this.twoarr.join("/")
				this.twopush()

			},
			twoqss(val) {
				this.twoarr.length = 1
				this.allarr = []
				this.twoarr.push(val)
				this.twostr = this.twoarr.join("/")
				if (this.twostr == this.firststr || this.twostr == this.threestr) {
					this.twott = ''
					this.$confirm('当前条件已选择，请重新选择资质条件', '提示', {
						type: 'warning',
						showCancelButton: false,
						showConfirmButton: false
					})
				} else {
					this.twopush()
				}
			},
			twopush() {
				if (this.firststr) {
					if (this.threestr) {
						this.allarr.push(this.firststr, this.twostr, this.threestr)
					} else {
						this.allarr.push(this.firststr, this.twostr)
					}
				} else {
					if (this.threestr) {
						this.allarr.push(this.threestr, this.twostr)
					} else {
						this.allarr.push(this.twostr)
					}
				}
			},
			threeq(val) {
				this.threearr = []
				this.allarr = []
				if (val == '') {
					if (this.firststr) {
						if (this.twostr) {
							this.allarr.push(this.twostr, this.firststr)
						} else {
							this.allarr.push(this.firststr)
						}
					} else {
						if (this.twostr) {
							this.allarr.push(this.twostr)
						}
					}
				}

			},
			threeqs(val) {
				this.threearr = []
				this.allarr = []
				this.threearr.push(val)
				this.threestr = this.threearr.join("/")
				this.threepush()
			},
			threeqss(val) {
				if (this.threestr == this.firststr || this.threestr == this.twostr) {
					this.threett = ''
					this.$confirm('当前条件已选择，请重新选择资质条件', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						showCancelButton: false,
						showConfirmButton: false
					})
				} else {
					this.threearr.length = 1
					this.allarr = []
					this.threearr.push(val)
					this.threestr = this.threearr.join("/")
					this.threepush()
				}

			},
			threepush() {
				if (this.firststr) {
					if (this.twostr) {
						this.allarr.push(this.firststr, this.twostr, this.threestr)
					} else {
						this.allarr.push(this.firststr, this.threestr)
					}
				} else {
					if (this.twostr) {
						this.allarr.push(this.threestr, this.twostr)
					} else {
						this.allarr.push(this.threestr)
					}
				}
			},
			crela(el) {
				this.rangeType = el.key
				this.data.rangeType = el.key
				this.allstr = this.allarr.join(",")
				this.data.qualCode = this.allstr
				// sessionStorage.setItem('Rank', this.rank) // 页面刷新用于判断资金值得从哪里来
				// sessionStorage.setItem('comselect', JSON.stringify(this.data))
			},
			Goto(val) {
				// this.current = val.cur;
				this.data.pageNo = val.cur;
				sessionStorage.setItem('pageNo', val.cur);
				this.funcom.toList(590)
				this.companylisy = [];
				this.isajax = false;
				// this.loading = true
				this.allstr = this.allarr.join(",")
				this.data.qualCode = this.allstr
				// sessionStorage.setItem('Rank', this.rank) // 页面刷新用于判断资金值得从哪里来
				// sessionStorage.setItem('comselect', JSON.stringify(this.data))
				// if(this.rank == 0 ) {
				this.gainCompany()
				// } else {
				//    let data = this.data 
				//   data.minCapital = this.low
				//   data.maxCapital = this.high
				//   companys(data).then(res => {
				//   this.companylisy = res.data
				//   this.total = res.total
				//   this.loading = false
				//   this.present = res.pageNum
				//   if(this.total == 0 ) {
				//      this.Snone = true
				//    } else {
				//      this.Snone = false
				//    }
				//  })
				// }
			},
			entitle(val) {
				this.title = val.cur;
				this.data.keyWord = val.cur;
				this.data.pageNo = 1;
				// this.loading = true;
				this.companylisy = [];
				this.isajax = false;
				this.allstr = this.allarr.join(",")
				this.data.qualCode = this.allstr
				// sessionStorage.setItem('Rank', this.rank) // 页面刷新用于判断资金值得从哪里来
				// sessionStorage.setItem('comselect', JSON.stringify(this.data))
				this.gainCompany()
				// 下面得是废代码

				// if(this.rank == 0 ) {

				// } else {
				//   let data = this.data 
				//   data.minCapital = this.low
				//   data.maxCapital = this.high
				//   companys(data).then(res => {
				//   this.companylisy = res.data
				//   this.total = res.total
				//   this.loading = false
				//   this.present = res.pageNum
				//   if(this.total == 0 ) {
				//      this.Snone = true
				//    } else {
				//      this.Snone = false
				//    }
				//  })
				// }
			},
			store(el) {
				localStorage.removeItem('id')
				localStorage.removeItem('name')
				localStorage.setItem('id', el.comId)
				localStorage.setItem('name', el.comName)
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
						path: '/introduce',
						query: {
							id: el.comId,
							name: el.comName,
							source: el.regisAddress
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
			gainAera() {
				if (!sessionStorage.getItem('comselect')) { // 根据是否本地有保存筛选数据来选择地址
					console.log(this.state);
					this.last = this.state
					this.data.regisAddress = this.state.source
				} else {
					this.data = JSON.parse(sessionStorage.getItem("comselect"))
					this.last = {
            source:this.data.regisAddress
          }
					// if (sessionStorage.getItem('Rank')) { // 注册资金的选项
					// 	let isRank = sessionStorage.getItem('Rank')
					// 	if (isRank == 0) {
					// 		this.start = this.data.minCapital
					// 		this.end = this.data.maxCapital
					// 		this.low = ''
					// 		this.high = ''
					// 	} else {
					// 		this.low = this.data.minCapital
					// 		this.high = this.data.maxCapital
					// 		this.start = ''
					// 		this.end = ''
					// 	}
					// }
				}
			},
			GqualCode() { // 资质得填充
				if (sessionStorage.getItem('comselect')) {
					let arr = []
					if (this.data.qualCode) {
						arr = this.data.qualCode.split(",")
						this.allarr = arr
						this.firststr = arr[0]
						this.firstarr = arr[0].split("/")
						let fList = arr[0].split("/")
						for (let x of this.companyQuals) {
							for (let y of x.data) {
								if (y.code == fList[0]) {
									this.companyQual = x.code;
									break
								}
							}
						}
						setTimeout(() => {
							this.major = fList[0] ? fList[0] : ''
						}, 100);
						setTimeout(() => {
							this.grade = fList[1] ? fList[1] : ''
						}, 100);
					}

					if (arr.length >= 2) {
						this.two = true
						this.five = true
						this.twostr = arr[1]
						this.twoarr = arr[1].split("/")
						let TList = arr[1].split("/")
						for (let x of this.companyQuals) {
							for (let y of x.data) {
								if (y.code == TList[0]) {
									this.twoQual = x.code;
									break
								}
							}
						}
						setTimeout(() => {
							this.twot = TList[0] ? TList[0] : ''
						}, 100);
						setTimeout(() => {
							this.twott = TList[1] ? TList[1] : ''
						}, 100);
						this.rangeType = this.data.rangeType ? this.data.rangeType : 'and'
					}
					if (arr.length == 3) {
						this.two = true
						this.three = true
						this.five = true
						this.threestr = arr[2]
						this.threearr = arr[2].split("/")
						let ThList = arr[2].split("/")
						for (let x of this.companyQuals) {
							for (let y of x.data) {
								if (y.code == ThList[0]) {
									this.threeQual = x.code;
									break
								}
							}
						}
						setTimeout(() => {
							this.threet = ThList[0] ? ThList[0] : ''
						}, 100);
						setTimeout(() => {
							this.threett = ThList[1] ? ThList[1] : ''
						}, 100);

					}

				}
			},
			//刷新
			recoldFn() {
				this.reload();
			}
		},
		created() {
			this.gainFilter()
			this.gainAera()
			this.GqualCode()
			// this.last = this.state
			// this.data.regisAddress = this.state
			if (sessionStorage.getItem('pageNo')) {
				this.data.pageNo = sessionStorage.getItem('pageNo') * 1;
			}
			this.data.keyWord = localStorage.getItem('title') ? localStorage.getItem('title') : ''
			if(sessionStorage.getItem("comselect")){
				let data=JSON.parse(sessionStorage.getItem("comselect"));
				if(data.honorCate.indexOf('reviewFine')>-1){
					this.honoraryList[1].istap=true
				}
				if(data.honorCate.indexOf('aqrz')>-1){
					this.honoraryList[0].istap=true
					let arr=data.honorCate.split(',')[0].split('||')[1].split('/');
					console.log(arr);
					if(arr.length!=4){
						this.levelList[0].istap=false;
						for(let x of arr){
							for(let y of this.levelList){
								if(x==y.name){
									y.istap=true
									break
								}
							}
						}
					}
				}
				this.data=data;
			}
			this.toTop()
			this.gainCompany()
		},
		beforeDestroy() {
			sessionStorage.removeItem('comselect');
			// sessionStorage.removeItem('Rank');
		},
	}
</script>
<style lang="less">
	.company {
		background: #FAFAFA;
		width: 100%;
		padding-top: 86px;

		.el-loading-spinner .path {
			stroke: #FE6603;
		}

		.el-loading-spinner .el-loading-text {
			color: #FE6603;
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

		.c-red {
			color: #FE0303;
			font-size: 12px;
		}

		.select {
			font-size: 16px;
			margin-bottom: 10px;

			.el-select {
				width: 225px;
				margin-right: 10px;
			}

			.el-checkbox-button__inner {
				border: none;
				margin-bottom: 12px;
				font-size: 15px;
				padding: 5px 10px;
				color: #000;
			}

			.el-checkbox-button.is-checked .el-checkbox-button__inner {
				color: #000;
				background-color: #FE6603;
				border-color: #FE6603;
				box-shadow: -1px 0 0 0 #fff;
			}

			.el-checkbox-button:first-child .el-checkbox-button__inner {
				border-radius: 0;
			}

			.t-5 {
				margin-top: 5px;
			}

			// .ttt {
			// 	display: flex;

			// 	.el-input {
			// 		width: 30%;
			// 	}

			// 	.el-input__inner {
			// 		height: 30px;
			// 		line-height: 30px;
			// 	}

			// 	.in-line {
			// 		width: 26px;
			// 		height: 1px;
			// 		background-color: #999;
			// 		margin: auto 14px;
			// 	}

			// 	.t-btn {
			// 		width: 50px;
			// 		height: 26px;
			// 		text-align: center;
			// 		line-height: 26px;
			// 		margin-left: 30px;
			// 		background-color: #FE6603;
			// 		font-size: 14px;
			// 		color: #fff;
			// 		border-radius: 5px;
			// 		margin-top: 2px;
			// 		cursor: pointer;
			// 	}
			// }

			.el-select {
				width: 225px;
				margin-right: 10px;
			}

			.com-btn {
				cursor: pointer;
				height: 40px;
				line-height: 40px;
				color: #fff;
				background-color: #FE6603;
				width: 100px;
				text-align: center;
				border-radius: 8px;
			}

			.isSerach {
				opacity: .8;
				cursor: wait;
			}

			.op-c {
				color: #fff;
			}

			.sty-del {
				color: #FE6603;
				cursor: pointer;
			}

			.current {
				background-color: #FE6603 !important;
				color: #fff !important;
			}

			.c-btn {
				color: #FE6603;
				height: 28px;
				line-height: 28px;
				border: 1px solid #FE6603;
				width: 92px;
				border-radius: 5px;
				text-align: center;
				font-size: 14px;
				cursor: pointer;
				margin-right: 30px;
			}

			.c-rela {
				width: 60px;
				height: 25px;
				line-height: 25px;
				background-color: #DDDDDD;
				text-align: center;
				font-size: 14px;
				margin-right: 30px;
				cursor: pointer;
			}
			.c-isbei{
				height: 25px;
				line-height: 25px;
				text-align: center;
				font-size: 14px;
				margin-right: 15px;
				cursor: pointer;
				padding: 0 9px;
				color: #666;
			}
		}

		.m-20 {
			margin-top: 20px;
			overflow: hidden;
		}

		.firm {
			width: 1020px;
			background: #fff;
			margin: 0 auto;
			overflow: hidden;

			.firm-ul {
				a {
					cursor: pointer;
				}

				a:hover .left {
					color: #FE6603;
				}

				div,
				a {
					height: 70px;
					line-height: 70px;
					border-bottom: 1px solid #f2f2f2;
					text-align: center;
					overflow: hidden;
					color: #999;

					.t-size {
						font-size: 14px;
						color: #000;
					}
				}
			}
		}
	}
</style>
