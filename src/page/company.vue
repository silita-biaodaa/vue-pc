<template>
	<div class="company">
		<en-search @vague='entitle' :title="data.keyWord" :all='total' @company='entitle'></en-search>
		<div class="option-box">
			<all-city :city='last' :type="1" @Cnext='eval'></all-city>
			<div class="select" v-if="data.regisAddress!=''">
				<el-row>
					<el-col :span="2">备案地区：</el-col>
					<el-col :span="14">
						<div class='left c-isbei' v-for="(el,i) in recordList" :key='i' :class="el.code==data.joinRegion?'current':''" @click='isBeiFn(el)'>{{el.name}}</div>
					</el-col>
				</el-row>
			</div>
			<div class="select" v-if="data.regisAddress.indexOf('湖南省')>-1">
				<el-row>
					<el-col :span="2" >荣誉类别：</el-col>
					<el-col :span="14">
						<div class='left c-isbei' v-for="(el,i) in honoraryList" :key='i' :class="el.istap?'current':''" @click='honorCateFn(el)'>{{el.name}}</div>
					</el-col>
				</el-row>
			</div>
			<div class="select" v-if="data.regisAddress.indexOf('湖南省')>-1&&honoraryList[0].istap">
				<el-row>
					<el-col :span="2">等&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp级：</el-col>
					<el-col :span="14">
						<div class='left c-isbei' v-for="(el,i) in levelList" :key='i' :class="el.istap?'current':''" @click='levelFn(el)'>{{el.name}}</div>
					</el-col>
				</el-row>
			</div>
			<!-- 资质 -->
			<v-screenzz :qualList='companyQuals' @contentChange='screenzzFn' :type='data.rangeType' :zztype='data.qualCode'></v-screenzz>
			<!-- 资质end -->
		</div>

		<div class="total">
			共找到<span>{{total}}</span>家企业
		</div>

		<!-- 判断是否加载中 -->
		<template v-if="isajax">
			<!-- 有数据 -->
			<template v-if="companylisy&&companylisy.length>0">
				<div style="margin-bottom: 125px;">
					<div class="firm">
						<div class='firm-ul'>
							<div>
								<div class="left t-size" style="width:70px;">
									序号
								</div>
								<div class="left t-size" style="width:310px;">
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
							<a v-for='(el,i) in companylisy' :key='i' @click='decide(el)'>
								<div class="left " style="width:70px;">
									{{(data.pageNo-1)*20+(i+1)}}
								</div>
								<div class="left" style="width:310px;">
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
	import screenZZ from '@/components/screenZZ'
	export default {
		data() {
			return {
				svip: false,
				isajax: false,
				loading: true,
				isSerach: false,
				companyQuals: [],
				companylisy: [],
				five: false,
				total: 0,
				present: 9,
				last: '',
				recordList:[//备案地区
					{
						name:'湘内企业+入湘企业',
						code:'all_in'
					},{
						name:'湘内企业',
						code:'in'
					},{
						name:'入湘企业',
						code:'enter'
					},{
						name:'长沙资源交易中心',
						code:'changsha'
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
					keyWord:'', // 关键字 
					joinRegion:'all_in',//备案地区
					honorCate:'',//荣誉类别
				},
			}
		},
		components:{
			'v-screenzz':screenZZ
		},
		props: {
			state: ''
		},
		inject: ['reload'],
		watch: {
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
			},
			'data.regisAddress':function(name,old){
				if(name==''){
					return
				}
				let str=''
				for(let x of this.areas){
					if(x.name==name){
						str=x.shortName
						break
					}
				}
				this.recordList[0].name='入'+str+'+'+str+'内企业';
				this.recordList[1].name=str+'内企业';
				this.recordList[2].name='入'+str+'企业';
				if(name=='湖南省'){
					this.recordList[3]={
						name:'长沙资源交易中心',
						code:'changsha'
					}
				}else{
					this.recordList.length=3;
				}
			}
		},
		methods: {
			screenzzFn(val){//接受资质变化抛出的值
				this.data.qualCode=val.str;
				this.data.rangeType=val.type;
				this.data.pageNo = 1
				this.isajax = false;
				this.gainCompany()
			},
			isBeiFn(el){//备案地区
				if (!sessionStorage.getItem('xtoken')&&!localStorage.getItem('Xtoken')){
					this.$confirm(this.qjTipTxt, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					}).catch(() => {

					});
					return false
				}
				if (localStorage.getItem('isvip')=='false') {
					this.svip = true
					this.modalHelper.afterOpen();
					return false
				}
				this.data.joinRegion=el.code;
				this.again()
			},
			honorCateFn(el){//荣誉类别
				if (!sessionStorage.getItem('xtoken')&&!localStorage.getItem('Xtoken')){
					this.$confirm(this.qjTipTxt, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					}).catch(() => {

					});
					return false
				}
				if (localStorage.getItem('isvip')=='false') {
					this.svip = true
					this.modalHelper.afterOpen();
					return false
				}
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
				this.again()
			},
			levelFn(el){//等级
				if (!sessionStorage.getItem('xtoken')&&!localStorage.getItem('Xtoken')){
					this.$confirm(this.qjTipTxt, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					}).catch(() => {

					});
					return false
				}
				if (localStorage.getItem('isvip')=='false') {
					this.svip = true
					this.modalHelper.afterOpen();
					return false
				}
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
				if (localStorage.getItem('isvip')=='true') {
					data.isVip = 1
				} else {
					data.isVip = 0
				}
				companys(data).then(res => {
					this.isajax = true;
					this.isSerach = false;
					if (localStorage.getItem('isvip')=='true') {
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
				}).catch(function(error) {
					that.isajax = true;
					that.isSerach = false;
					that.companylisy = null;
					console.log(error);
					that.$alert(error.data.msg)
				})
			},
			// 获取公司企业列表
			changeapi() {
				if (this.allarr.length > 1) {
					this.data.rangeType = this.rangeType;
				} else {
					this.data.rangeType = ''
				}
				if (this.isSerach) {
					return false
				}
				this.isSerach = true;
				this.again()
			},
			again() {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					if (localStorage.getItem('isvip')=='false') {
						this.svip = true
						this.modalHelper.afterOpen();
					} else {
						this.data.pageNo = 1;
						this.isajax = false;
						this.companylisy = [];
						this.gainCompany()
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
				//每次切换省份，重置备案地区等值
					// this.data.regisAddress=val.cur.name;
					// this.recordList[0].name='入'+val.cur.shortName+'+'+val.cur.shortName+'内企业';
					// this.recordList[1].name=val.cur.shortName+'内企业';
					// this.recordList[2].name='入'+val.cur.shortName+'企业';
					// if(this.data.regisAddress=='湖南省'){
					// 	this.recordList[3]={
					// 		name:'长沙资源交易中心',
					// 		code:'changsha'
					// 	}
					// }else{
					// 	this.recordList.splice(3,1)
					// }
				this.data.honorCate='';
				this.companylisy = [];
				this.data.pageNo = 1;
				this.isajax = false;
				this.data.regisAddress = val.cur
				this.gainCompany()
			},
			newRecordList(name){
				let str=''
				for(let x of this.areas){
					if(x.name==name){
						str=x.shortName
						break
					}
				}
				this.recordList[0].name='入'+str+'+'+str+'内企业';
				this.recordList[1].name=str+'内企业';
				this.recordList[2].name='入'+str+'企业';
				if(name=='湖南省'){
					this.recordList[3]={
						name:'长沙资源交易中心',
						code:'changsha'
					}
				}
			},
			Goto(val) {
				this.data.pageNo = val.cur;
				sessionStorage.setItem('pageNo', val.cur);
				this.funcom.toList(590)
				this.companylisy = [];
				this.isajax = false;
				this.gainCompany()
			},
			entitle(val) {
				this.data.keyWord = val.cur;
				this.data.pageNo = 1;
				this.companylisy = [];
				this.isajax = false;
				this.gainCompany()
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
					this.last = this.state
					this.data.regisAddress = this.state.source
				} else {
					this.data = JSON.parse(sessionStorage.getItem("comselect"))
					this.last = {
						source:this.data.regisAddress
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
			// this.GqualCode()
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
		.select {
			font-size: 16px;
			margin-bottom: 10px;
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
			.el-select {
				width: 225px;
				margin-right: 10px;
			}

			.isSerach {
				opacity: .8;
				cursor: wait;
			}
			.current {
				background-color: #FE6603 !important;
				color: #fff !important;
			}
			.c-isbei{
				height: 25px;
				line-height: 25px;
				text-align: center;
				font-size: 14px;
				margin-right: 5px;
				margin-bottom: 6px;
				cursor: pointer;
				padding: 0 9px;
				color: #666;
			}
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
