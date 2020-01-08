<template>
	<div class="home bg-f4f">
		<en-search></en-search>
		<!-- 专查 -->
		<ul class="query-box">
			<li @click="jumpQuery('ZJquery')" class="cp">
				<div class="img-box">
					<img src="../assets/img/zj.png"/>
				</div>
				<div class="text-c">
					<h5 class="mb10 fw600 fs18">住建信息专查</h5>
					<p class="fs14 mb20 text-l">全国住建企业资质、人员、业绩、备案、信息综合查询</p>
					<button class="fs14 cp">
						去查询
						<i class="iconfont iconjiantou ml10 fs12"></i>
					</button>
				</div>
			</li>
			<li @click="jumpQuery('GLquery')" class="cp">
				<div class="img-box">
					<img src="../assets/img/gl.png"/>
				</div>
				<div class="text-c">
					<h5 class="mb10 fw600 fs18">公路信息专查</h5>
					<p class="fs14 mb20 text-l">全国公路企业资质、人员、业绩、信用等级综合查询</p>
					<button class="fs14 cp">
						去查询
						<i class="iconfont iconjiantou ml10 fs12"></i>
					</button>
				</div>
			</li>
			<li @click="jumpQuery('SLquery')" class="cp">
				<div class="img-box">
					<img src="../assets/img/sl.png"/>
				</div>
				<div class="text-c">
					<h5 class="mb10 fw600 fs18">水利信息专查</h5>
					<p class="fs14 mb20 text-l">全国水利企业资质、人员、业绩、信用等级综合查询</p>
					<button class="fs14 cp">
						去查询
						<i class="iconfont iconjiantou ml10 fs12"></i>
					</button>
				</div>
			</li>
			<li @click="jumpQuery('screenPage')" class="cp">
				<div class="img-box">
					<img src="../assets/img/cq.png"/>
				</div>
				<div class="text-c">
					<h5 class="mb10 fw600 fs18">重庆定制版专查</h5>
					<p class="fs14 mb20 text-l">全国住建和重庆本地企业资质、人员、业绩多数据综合查询</p>
					<button class="fs14 cp">
						去查询
						<i class="iconfont iconjiantou ml10 fs12"></i>
					</button>
				</div>
			</li>
		</ul>
		<!-- 广告图 -->
		<div class="poster-box"></div>
		<!-- 平台公示/行业资讯 -->
		<div class="ptgs-hyzx">
			<h4>
				<div class="tit-left">
					<span class="cp" :class="tabNum==0?'active':''" @click="tabNum=0;showList=zxList">行业资讯</span>
					<span class="cp" :class="tabNum==1?'active':''"  @click="tabNum=1;showList=ptList">平台公示</span>
				</div>
			</h4>
			<ul>
				<li v-for="(o,i) of showList" class="mb20" :key="i" @click="jump(o)">
					<div class="title">{{o.title}}</div>
					<div class="time">
						发布日期：
						<template v-if="tabNum==0">{{o.time}}</template>
						<template v-else>{{o.releaseTime}}</template>
					</div>
					<div class="remark">
						<template v-if="tabNum==0">{{o.contentDescribe}}</template>
						<template v-else>{{o.remark}}</template>
						...<font class="color-449 cp">[详情]</font>
					</div>
				</li>
			</ul>
			<button  class="color-449 cp fs20" @click="seeMore">查看更多 ></button>
		</div>
	</div>
</template>
<script>
	import {
		foundation,
		queryList,
		companyList
	} from '@/api/index'
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
@import "../style/publicCSS";
.home {
	// 平台公示/行业资讯
	.ptgs-hyzx{
		background: #fff;
		padding-bottom: 40px;
		h4{
			height: 113px;
			border-bottom: 1px solid @initColor;
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
				border-bottom: 1px solid @initColor;
				font-size: 14px;
				.title{
					font-size: 18px;
				}
				.time{
					color: #999;
					margin: 10px 0;
				}
				.remark{
					color: #5A5A5A;
				}
			}
			li:hover .title{
				color: #EB651B
			}
		}
		button{
			width: 220px;
			height: 54px;
			display: block;
			margin: 40px auto 0;
			border-radius:28px;
			border: 1px solid @initColor;
			background: #fff;
		}
	}
	// 专查
	.query-box{
		display: flex;
		width: 1020px;
		justify-content: space-between;
		margin: 40px auto;
		li{
			background: #fff;
			width: calc((100% - 60px)/4);
			border: 1px solid transparent;
			.img-box{
				overflow: hidden;
				img{
					width: 100%;
				}
			}
			.text-c{
				padding: 20px;
				button{
					width: 128px;
					line-height: 34px;
					border:1px solid @initColor;
					border-radius: 18px;
					background: #fff;
					color: #424040;
				}
			}
		}
		li:hover{
			border-color: @themeColor;
			box-shadow:0px 0px 9px 0px rgba(235,101,27,0.27);
		}
		li:hover button{
			border-color: @themeColor;
			background: @themeColor;
			color: #fff;
		}
		li:hover img{
			transform: scale(1.2);
			transition: all .5s;
		}
	}
	//广告图
	.poster-box{
		width: 1020px;
		height: 160px;
		margin: 0 auto 40px;
		background: url(../assets/img/gg.png);
		background-size: 100% 100%;
		border-radius: 4px;
	}
}
</style>
