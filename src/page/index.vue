<template>
	<div class="home">

		<en-search></en-search>
		<!-- banner -->
		<div class="carousel">
			<el-carousel>
				<el-carousel-item v-for="item in imgs" :key="item.id">
					<img :src="item.imagesrc" alt="">
				</el-carousel-item>
			</el-carousel>
		</div>
		<!-- 平台公示/行业资讯 -->
		<div class="ptgs-hyzx">
			<h4>
				<div class="tit-left">
					<span :class="tabNum==0?'active':''" @click="tabNum=0;showList=zxList">行业资讯</span>
					/
					<span :class="tabNum==1?'active':''"  @click="tabNum=1;showList=ptList">平台公示</span>
				</div>
				<div class="tit-right" @click="seeMore">查看更多></div>
			</h4>
			<ul>
				<li v-for="(o,i) of showList" :key="i" @click="jump(o)">
					<div class="list-l">
						<i>{{i+1}}</i>
						<span>{{o.title}}</span>
					</div>
					<div class="list-r">
						<template v-if="tabNum==0">{{o.time}}</template>
						<template v-else>{{o.releaseTime}}</template>
					</div>
				</li>
			</ul>
		</div>
		<!-- 最新招标 -->
		<div class="b-content" v-show="biding">
			<div class="title">
				<p>
					最新招标
				</p>
				<router-link class="right-20" to="/bid" tag="span">
					查看更多>
				</router-link>
			</div>
			<div class="matter">
				<a class="left h-i" v-for="el of queryLists" :key="'zb'+el.id" @click='bidto(el)'>
					<p class="t-line" :title='el.title'>
						<span>{{el.title}}</span>
					</p>
					<div class="m-detail">
						<p :title='el.certificate'>资质要求: {{el.certificate ? el.certificate : '详见原文'}}</p>
						<p>评标办法：<span>{{el.pbMode ? el.pbMode : '详见原文'}}</span></p>
						<p>发布时间：{{el.openDate}}</p>
					</div>
				</a>
			</div>
		</div>
		<!-- 最新中标 -->
		<div class="b-content" v-show="tendering">
			<div class="title">
				<p>
					最新中标
				</p>
				<router-link class="right-20" to="/tender" tag="span">
					查看更多>
				</router-link>
			</div>
			<div class="matter">
				<a class="left" v-for="el of biddings" :key="'zhongb'+el.id" @click='decide(el)'>
					<p class="t-line" :title='el.title'>
						<span>{{el.title}}</span>
					</p>
					<div class="m-detail">
						<p :title='el.oneName'>第一候选人:{{el.oneName ? el.oneName : '详见原文'}}</p>
						<p>中标金额：<span>{{el.oneOffer ? el.oneOffer + '万' : '详见原文'}}</span></p>
						<p>发布时间：{{el.openDate}}</p>
					</div>
				</a>

			</div>
		</div>
		<!--热门企业-->
		<div class="b-content">
			<div class="title">
				<p>
					热门企业
				</p>
				<router-link class="right-20" to="/company" tag="span">
					查看更多>
				</router-link>
			</div>
			<div class="matter">
				<a class="left" v-for="el of companys" :key="'com'+el.comId" @click='comto(el)'>
					<p class="t-line" :title='el.comName'>
						<span>{{el.comName}}</span>
					</p>
					<div class="m-detail">
						<p>法人: {{el.legalPerson ? el.legalPerson : '详见原文'}}</p>
						<p>电话：<span>{{el.phone ? el.phone : '暂无' }}</span></p>
						<p :title='el.comAddress'>地址：{{el.comAddress}}</p>
					</div>
				</a>
			</div>
		</div>
		<!-- 活动入口 -->
		<div class="hd-mask" v-if="hdMask">
			<div class="hd-box">
				<img src="../assets/img/hd.png"/>
				<i class="el-icon-circle-close-outline" @click="closeFix"></i>
				<button @click="jumpDetail"></button>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		foundation,
		queryList,
		companyList
	} from '@/api/index'
	let moment = require("moment");
	export default {
		data() {
			return {
				area: '',
				duanwu: false,
				areas: [{
						region: '东北',
						chidren: [{
								province: '辽宁',
								key: 'liaoning'
							},
							{
								province: '吉林',
								key: 'jilin'
							},
							{
								province: '黑龙江',
								key: 'heilongjiang'
							}
						]
					},
					{
						region: '华中',
						chidren: [{
								province: '河南',
								key: 'henan'
							},
							{
								province: '湖北',
								key: 'hubei'
							},
							{
								province: '湖南',
								key: 'hunan'
							}
						]
					},
					{
						region: '华北',
						chidren: [{
								province: '北京',
								key: 'beijing'
							},
							{
								province: '天津',
								key: 'tianjin'
							},
							{
								province: '河北',
								key: 'hebei'
							},
							{
								province: '山西',
								key: 'shanxi'
							},
							{
								province: '内蒙古',
								key: 'neimenggu'
							}
						]
					},
					{
						region: '华南',
						chidren: [{
								province: '广东',
								key: 'guangdong'
							},
							{
								province: '广西',
								key: 'guangxi'
							},
							{
								province: '海南',
								key: 'hainan'
							}
						]
					},
					{
						region: '西北',
						chidren: [{
								province: '陕西',
								key: 'shanxi'
							},
							{
								province: '甘肃',
								key: 'gansu'
							},
							{
								province: '青海',
								key: 'qinghai'
							},
							{
								province: '宁夏',
								key: 'ningxia'
							},
							{
								province: '新疆',
								key: 'xinjiang'
							}
						]
					},
					{
						region: '西南',
						chidren: [{
								province: '重庆',
								key: 'chongqin'
							},
							{
								province: '四川',
								key: 'sichuan'
							},
							{
								province: '贵州',
								key: 'guizhou'
							},
							{
								province: '云南',
								key: 'yunnan'
							},
							{
								province: '西藏',
								key: 'xizang'
							}
						]
					}

				],
				provinces: false,
				province: '湖南',
				select: '',
				imgs: [],
				queryLists: [],
				biddings: [],
				companys: [],
				biding: true,
				tendering: true,
				hdMask:false,//被前端控制
				showList:[],//用于显示
				ptList:[],//平台公示
				zxList:[],//行业资讯
				tabNum:0
			}
		},
		props: {
			state: ''
		},
		watch: {
			state(val) {
				this.gainqueryList()
				this.gainten()
				this.gainCompany()
			}
		},
		methods: {
			comto(el) {
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
			bidto(el) {
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					const {
						href
					} = this.$router.resolve({
						path: '/article',
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
			seaI(el) {
				this.rank = el.i
			},
			shArea() {
				this.provinces = !this.provinces
			},
			changes(val) {
				this.area = val.province,
					this.province = val.key
			},
			gainfoundation() {
				foundation({
					type: 4,
					showType: 3
				}).then(res => {
					if (res.code == 1) {
						this.imgs = res.data
					}
				})
			},
			gainqueryList() {
				let data = {
					pageNo: 1,
					type: '1',
					pageSize: 8,
					regions: this.state.code,
					pbModes: "",
					projectType: "",
					rangeType: "",
					title: "",
					zzType: "",
				};
				let that = this;
				this.$http({
					method: 'post',
					data: data,
					url: '/newnocite/zhaobiao/list'
				}).then(res => {
					if (res.data.code == 1) {
						//  this.loading = false
						if (localStorage.getItem('isvip')=='false') {
							for (let x of res.data.data) {
								if (x.certificate) {
									x.certificate = x.certificate.replace(/特|一|二|三|四|五|甲|乙|丙|丁/g, '*')

								}
								if (x.pbMode) {
									let xin = x.pbMode.length
									x.pbMode = '*'
									for (var i = 1; i < xin; i++) {
										x.pbMode = x.pbMode + '*'
									}
								}
							}
						}
						that.queryLists = res.data.data
						if (that.queryLists.length == 0) {
							return that.biding = false
						} else {
							that.biding = true
						}
					}
				})
			},
			gainten() {
				let data = {
					pageNo: 1,
					type: '2',
					pageSize: 8,
					regions: this.state.code
				};
				queryList(data).then(res => {
					if (res.code == 1) {
						this.biddings = res.data
						if (this.biddings.length == 0) {
							this.tendering = false
						} else {
							this.tendering = true
						}
						if (localStorage.getItem('isvip')=='false') {
							this.biddings.forEach(el => {
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
								if (el.oneOffer) {
									let mm = el.oneOffer.length
									el.oneOffer = '*'
									for (var i = 1; i < mm; i++) {
										el.oneOffer = el.oneOffer + '*'
									}
								}
							})
						}
					}
				})
			},
			gainCompany() {
				let data = {
					regisAddress: this.state.source,
					limit: 8
				}
				if (localStorage.getItem('isvip')=='true') {
					data.isVip = 1
				} else {
					data.isVip = 0
				}
				companyList(data).then(res => {
					if (res.code == 1) {
						res.data.splice(8, 22)
						res.data.forEach(el => {
							el.data = moment(el.created).format('YYYY年MM月DD日')
						})
						if (localStorage.getItem('isvip')=='true') {
							let arr = []
							res.data.forEach(el => {
								if (el.phone) {
									arr = el.phone.split(';')
									el.phone = arr[0]
									// arr.length = 0
								}
							});
						}
						this.companys = res.data
					}
				})
			},
			store(el) {
				localStorage.removeItem('id')
				localStorage.removeItem('name')
				localStorage.setItem('id', el.comId)
				localStorage.setItem('name', el.comName)
			},
			//活动
			closeFix(){
				this.hdMask=false;
			},
			jumpDetail(){
				this.hdMask=false;
				const { href } = this.$router.resolve({
				path:'/hdDetail'
				})
				window.open(href, '_blank', )
			},
			seeMore(){//查看更多
				if(this.tabNum==0){//行业资讯
					this.$router.push('/information')
				}else{
					this.$router.push('/publicity')
				}
			},
			jump(o){
				let data='';
				if(this.tabNum==0){//行业资讯
					data = this.$router.resolve({
						path:'/detail',
						query:{
							id:o.id
						}
					})
				}else{//平台公示
					data = this.$router.resolve({
						path:'/detail',
						query:{
							id:o.pkid,
							type:o.type,
							types:'ptgs'
						}
					})
				}
				window.open(data.href, '_blank', )
			}
		},
		beforeCreate(){
			let that=this;
			this.$http({
				method:'post',
				url:'/activity/entrance',
				data:{}
			}).then(res =>{
				if(res.data.data){
					that.hdMask=true
				}
			})

			//平台公示
			this.$http({
				method:'post',
				url:'/platform/notice/list',
				data:{
					pageNo:1,
					pageSize:10,
					type:'version'
				}
			}).then(res =>{
				if(res.data.code==1){
					that.ptList=res.data.data;
				}
			})
			//行业资讯
			this.$http({
				method:'post',
				url:'/notice/queryArticleList',
				data:{
					pageNo:1,
					pageSize:10,
					type:'0'
				}
			}).then(res =>{
				if(res.data.code==1){
					that.zxList=res.data.data;
					that.showList=that.zxList;
				}
			})
		},
		created() {
			this.area = localStorage.getItem('area')
			this.gainfoundation()

			this.gainqueryList()
			this.gainten()
			this.gainCompany()
		},
		components: {}
	}
</script>
<style lang="less">
	.home {
		width: 100%;
		margin-bottom: 200px;
		padding-top: 86px;
		.over {
			overflow: hidden;
		}

		.right-20 {
			margin-right: 18px;
			cursor: pointer;
		}

		.b-content {
			margin-top: 10px;
			width: 1020px;
			margin: 0 auto;
			clear: both;
			background: #fff;
			overflow: hidden;
			margin-bottom: 20px;

			.title {
				height: 63px;
				padding-left: 15px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2px solid #F2F2F2;

				p {
					padding-left: 15px;
					font-size: 22px;
					font-weight: 500;
					height: 28px;
					position: relative;
					border-left: 2px solid #FF6000;
				}

				span {
					color: #999;
					font-size: 12px;
				}
			}

			.matter {
				padding: 15px 15px 0;

				p {
					font-family: "SourceHanSansCN-Regular";
					font-weight: 550;
					color: #333;
				}

				.t-line::after {
					position: absolute;
					content: '';
					bottom: 0;
					height: 2px;
					background-color: #F2F2F2;
					width: calc(100% - 56px);
					right: 0;
				}

				.t-line::before {
					position: absolute;
					content: '';
					bottom: 0;
					height: 2px;
					left: 0;
					width: 56px;
					background-color: #EC7522;
				}

				.t-line {
					position: relative;
					box-sizing: border-box;
					padding: 5px 0;

				}

				a {
					width: 20%;
					margin-left: 62px;
					display: block;
					box-sizing: border-box;
					margin-bottom: 45px;

					p {
						font-size: 14px;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						padding: 4px 0;
						cursor: pointer;
					}

					.m-detail {
						margin-top: 18px;
						width: 90%;

						p {
							padding-bottom: 4px;
							font-size: 12px;
							color: #333;
						}

						span {
							color: #EC7522;
						}
					}
				}

				a:first-child {
					margin-left: 0;
				}

				a:nth-child(5) {
					margin-left: 0;
				}
			}
		}

		.carousel {
			width: 1020px;
			margin: 0 auto;
			height: 390px;
			margin-bottom: 16px;
			overflow: hidden;

			img {
				width: 100%;
			}
		}

		.el-carousel__container {
			height: 390px;
		}

		.el-carousel__arrow {
			height: 56px;
			width: 56px;
			font-size: 28px;
		}

		.el-carousel__indicator {
			padding: 10px 6px;
		}

		.el-carousel__indicators {
			bottom: 30px;
		}

		.el-carousel__button {
			width: 14px;
			height: 14px;
			border-radius: 50%;
			opacity: 0.5;
		}
		.hd-mask{
			width: 100%;
			height: 100vh;
			position: fixed;
			background: rgba(0, 0, 0, .5);
			top: 0;
			z-index: 9999;
			.hd-box{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				text-align: center;
				img{
					width: 500px;
					display: block;
					margin-bottom: 24px;
				}
				.el-icon-circle-close-outline{
					cursor: pointer;
					font-size: 40px;
					color: #fff;
				}
				button{
					opacity: 0;
					position: absolute;
					left: calc(50% - 5px);
					width: 227px;
					height: 60px;
					bottom: 95px;
					cursor: pointer;
					transform: translateX(-50%);
				}
			}
		}

		// 平台公示/行业资讯
		.ptgs-hyzx{
			width: 1020px;
			margin: 0 auto;
			background: #fff;
			margin-bottom: 20px;
			h4{
				height: 72px;
				font-size: 22px;
				color: #999;
				font-weight: normal;
				padding: 0 20px;
				display: flex;
				justify-content: space-between;
				.tit-left{
					span{
						display: inline-block;
						padding: 16px 0;
						cursor: pointer;
					}
					.active{
						color: #FE6603;
						border-bottom: 2px solid #FE6603
					}
				}
				.tit-right{
					font-size: 12px;
					color: #999;
					line-height: 72px;
					cursor: pointer;
				}
			}
			li{
				border-top: 1px solid #F2F2F2;
				display: flex;
				padding: 0 20px;
				justify-content: space-between;
				height: 64px;
				align-items: center;
				cursor: pointer;
				.list-l{
					display: flex;
					align-items: center;
					color: #333;
					i{
						font-style: normal;
						color: #fff;
						width: 20px;
						height: 20px;
						background: #FFA317;
						display: inline-block;
						text-align: center;
						line-height: 20px;
						border-radius: 5px;
						font-size: 12px;
						margin-right: 14px;
					}
					span{
						font-weight: 550;
						max-width: 800px;
						display: inline-block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						cursor: pointer;
					}
				}
				.list-r{
					color: #999
				}
			}
		}
	}
</style>
