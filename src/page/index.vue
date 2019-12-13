<template>
	<div class="home">
		<en-search></en-search>
		<!-- 专查 -->
		<div class="query-box">
			<div @click="jumpQuery('ZJquery')">
				<img src="../assets/img/zj.png"/>
				<h5>住建信息专查</h5>
				<p>全国住建企业资质、人员、业绩、备案、信息 综合查询</p>
			</div>
			<div @click="jumpQuery('GLquery')">
				<img src="../assets/img/gl.png"/>
				<h5>公路信息专查</h5>
				<p>全国公路企业资质、人员、业绩、信用等级综合查询</p>
			</div>
			<div @click="jumpQuery('SLquery')">
				<img src="../assets/img/sl.png"/>
				<h5>水利信息专查</h5>
				<p>全国水利企业资质、人员、业绩、信用等级综合查询</p>
			</div>
		</div>
		<!-- 平台公示/行业资讯 -->
		<div class="ptgs-hyzx">
			<h4>
				<div class="tit-left">
					<span :class="tabNum==0?'active':''" @click="tabNum=0;showList=zxList">行业资讯</span>
					<span :class="tabNum==1?'active':''"  @click="tabNum=1;showList=ptList">平台公示</span>
				</div>
				<!-- <div class="tit-right" @click="seeMore">查看更多></div> -->
			</h4>
			<ul>
				<li v-for="(o,i) of showList" :key="i" @click="jump(o)">
					<div class="title">{{o.title}}</div>
					<div class="time">
						发布日期：
						<template v-if="tabNum==0">{{o.time}}</template>
						<template v-else>{{o.releaseTime}}</template>
					</div>
					<div class="remark">
						<template v-if="tabNum==0">{{o.contentDescribe}}</template>
						<template v-else>{{o.remark}}</template>
						...<font>[详情]</font>
					</div>
				</li>
			</ul>
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
		},
		methods: {
			jumpQuery(path){//专查
				if (sessionStorage.getItem('xtoken') || localStorage.getItem('Xtoken')) {
					const { href } = this.$router.resolve({
						path:path
					})
					window.open(href, '_blank', )
				}else{
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
			//平台公示
			this.$http({
				method:'post',
				url:'/platform/notice/list',
				data:{
					pageNo:1,
					pageSize:5,
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
					pageSize:5,
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
		},
		components: {}
	}
</script>
<style lang="less">
.home {
	width: 100%;
	margin-bottom: 200px;
	padding-top: 88px;
	// 平台公示/行业资讯
	.ptgs-hyzx{
		background: #fff;
		h4{
			height: 113px;
			border-bottom: 1px solid #DDDFE4;
			font-size: 28px;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			font-weight: normal;
			span{
				display: inline-block;
				border-bottom: 6px solid transparent;
				padding: 20px 18px;
				box-sizing: border-box;
				color: #424040;
				cursor: pointer;
			}
			span:first-child{
				margin-right: 74px;
			}
			.active{
				font-weight: 600;
				color: #EB651B;
				border-color: #EB651B;
			}
		}
		ul{
			width: 1020px;
			margin: 40px auto 0;
			padding: 0 20px;
			box-sizing: border-box;
			li{
				padding: 20px 0;
				border-bottom: 1px solid #DDDFE4;
				margin-bottom: 20px;
				font-size: 14px;
				.title{
					font-size: 18px;
				}
				.time{
					color: #999;
					margin: 10px 0 20px;
				}
				.remark{
					color: #5A5A5A;
					font{
						color: #4494F0;
						cursor: pointer;
					}
				}
			}
			li:hover .title{
				color: #EB651B
			}
		}
	}
	// 专查
	.query-box{
		display: flex;
		width: 1020px;
		justify-content: space-between;
		margin: 20px auto;
		div{
			width: calc((100% - 60px)/3);
			background: #fff;
			text-align: center;
			box-sizing: border-box;
			padding: 30px 40px;
			cursor: pointer;
			img{
				width: 50px;
				height: 50px;
				margin-bottom: 20px;
			}
			h5{
				font-size: 20px;
				color: #333;
				margin-bottom: 15px;
				font-weight: normal;
			}
			p{
				font-size: 14px;
				text-align: left;
			}
		}
	}
	//广告图
	.poster-box{
		height: 200px;
		background: url(../assets/img/gg.png);
		background-size: 100% 100%;
	}
}
</style>
