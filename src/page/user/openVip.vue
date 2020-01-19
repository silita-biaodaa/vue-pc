<template>
	<div class="openVip">
        <!-- 头 -->
		<v-head></v-head>
		<div class="main">
			<h1>立即成为标大大会员 优享更多特权</h1>
			<ul class="dr">
				<li  v-for="(el,i) in list" :key="i" >
					<h5 class="fs18 color-150 borde">
						{{el.stdDesc}}
						<v-icon iconClass="iconVIPbiaozhi"></v-icon>
					</h5>
					<div class="borde pt30 pb30">
						<div class="price">
							<font class="fs14 color-150">¥</font>
							<span class="fs36 color-150 fw600 ml10">{{el.price}}</span>
						</div>
						<div class="discount">
							<font>{{el.altInfo}}</font>
							<span class="fs14 color-150">已节省{{el.primePrice - el.price }}元</span>
						</div>
					</div>
					<div class="btn-box borde pt20 pb20">
						<button class="fs14 cp" @click="goOpen(i)">立即开通</button>
					</div>
				</li>
			</ul>
			<div class="table-box">
				<h4 class="fs24 color-150 text-c mb20">标大大会员 专享特权</h4>
				<table class="mb40 color-150">
					<thead>
						<th style="width:18.75%">特权项目</th>
						<th style="width:31.25%">特权服务介绍</th>
						<th style="width:12.75%">月度会员<p>(318元)</p></th>
						<th style="width:12.75%">季度会员<p>(898元)</p></th>
						<th style="width:12.75%">半年会员<p>(1498元)</p></th>
						<th style="width:12.75%">年度会员<p>(2298元)</p></th>
					</thead>
					<tbody>
						<tr>
							<td class="tit">招标公告</td>
							<td class="con">提供全国各省的招标公告，会员可根据地区、项目类型、项目资质和评标办法等筛选条件查询出自己想要的信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">变更公告</td>
							<td class="con">提供招标过程中的补充公告、变更公告、废标公告、重新招标等信息，使用户可以及时获知并有效的对投标工作做出相应方案调整。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">中标公告</td>
							<td class="con">提供建筑行业即时的中标资讯，帮助会员用户即时获取实时的中标公示，掌握市场行情。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">竞价谈判公告</td>
							<td class="con">提供全国各省有关服务、货物的谈判采购信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">询价采购公告</td>
							<td class="con">提供全国各省有关服务、货物的询价采购信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">招标数据统计</td>
							<td class="con">根据会员单位需求,以列表的形式定期汇总各行业、各领域招标采购数据信息,并以PDF格式提供给会员单位，为会员单位做数据分析提供支持服务。</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>1次</td>
							<td>5次</td>
						</tr>
						<tr>
							<td class="tit">企业信息</td>
							<td class="con">提供300W+家企业的基本信息，包括企业工商信息、企业联系方式、分支机构、法务信息、资质信息、人员信息、业绩信息、中标信息、诚信信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit" style="position: relative;">工商信息<span class="buy-new">New</span></td>
							<td class="con">接入全国工商信息网站，提供企业的工商信息。包括企业基本信息、分支机构、股东信息、主要人员、变更记录、企业年报、行政处罚等信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">人员信息</td>
							<td class="con">提供全国注册人员的证书信息、个人业绩、变更记录、不良记录等信息，查找信息更加快速精准。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">业绩信息</td>
							<td class="con">提供全国住建部、交通部、水利部的业绩信息，可根据地区、合同金额、日期、关键词快速查找想要的业绩信息。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td style="position: relative;" class="tit">法务信息<span class="buy-new">New</span></td>
							<td class="con">可查看自身风险信息和企业的关联风险信息</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">综合查询（限APP和网页端使用）</td>
							<td class="con">可通过设置地区、资质、业绩关键字等条件，查询出符合条件的建筑企业业绩信息，快捷方便，为用户提供个性化的信息查询服务。</td>
							<td>按次收费</td>
							<td>按次收费</td>
							<td>按次收费</td>
							<td>按次收费</td>
						</tr>
						<tr>
							<td class="tit">在建信息</td>
							<td class="con">可根据姓名和身份证号，精准查询湖南省内人员的在建情况。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">保证金业务</td>
							<td class="con">为我们的会员用户提供相关的保证金业务</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">人工服务</td>
							<td class="con">提供一对一的客服经理服务模式。在服务期间内为会员单位提供全方位立体式的服务，及时解决会员单位使用过程中遇到的问题和困难。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
						<tr>
							<td class="tit">企业定制化数据查询</td>
							<td class="con">为会员用户提供私人定制化企业数据查询</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>另行收费</td>
						</tr>
						<tr>
							<td class="tit">企业定制化开发</td>
							<td class="con">公司有非常强大的技术团队、并且再建筑行业中有多年经验。可以针对性的为我们会员用户提供建筑相关的app、小程序、公众号、网页定制服务。</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>另行收费</td>
							<td>另行收费</td>
						</tr>
						<tr>
							<td class="tit">移动客户端</td>
							<td class="con">提供手机app（标大大）、标大大移动端、标大大网页端，三端可用同一账号登录、浏览招投标项目信息，第一时间便捷查看项目不错失商机，大大提高工作效率。</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
							<td>免费</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- 付款弹窗 -->
		<div class="re-loading" v-if="showPop">
			<div class="re-puy ">
				<div class="puy-title">
					<span>会员支付</span>
					<i class="el-icon-close" @click="closeFn"></i>
				</div>

				<div class="re-auto">
					<div class="puy-title" style="fontSize:14px;">
						<span>订单详情</span>
					</div>

					<div class="puy-detail">
						<div>
							<div class="puy-name">
								<span>手机号码:</span>{{phone}}
							</div>
							<div class="puy-name">
								<span>标大大{{currentData.stdDesc}}</span>
							</div>
						</div>
						<div class="puy-price">
							<div class="puy-name">
								<span>应付金额:</span><span class="price">{{currentData.price}}</span>元
							</div>
						</div>
					</div>
					<div class="puy-title" style="fontSize:14px;">
						<span>支付方式</span>
					</div>
					<div class="puy-code">
						<div class="puy-img" id="qrcode" v-loading='isload' element-loading-text="二维码生成中">
						</div>
						<div class="puy-hint">
							<img src="../../assets/img/icon-weixin.png" alt="">&nbsp&nbsp微信扫码支付
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import QRCode from 'qrcodejs2'
	import {
		vipPay,
		nowxPay,
		getUserTemp,
	} from '@/api/index'
	export default {
		data() {
			return {
				list:[],
				showPop:false,//控制弹窗
				phone:'',//用户手机号
				currentData:'',//当前选中项
				isload:true,//二维码load
				orderNo:'',//订单号
				t:null,//承载定时器
			}
		},
		filters: {
		},
		methods: {
			closeFn(){
				this.isload=true;
				this.showPop=false;
				let that = this;
        		clearTimeout(that.t);
			},
			goOpen(i){//开通会员
				if (!sessionStorage.getItem('xtoken') && !localStorage.getItem('Xtoken')) {
					this.$confirm('暂无权限，请先登录', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push('/logo')
					}).catch(() => {

					});
					return false
				}
				this.showPop=true;
				this.currentData=this.list[i];
				vipPay({
					channel: '1003',
					userId: sessionStorage.getItem('ip'),
					stdCode: this.currentData.stdCode,
					tradeType: 'NATIVE'
				}).then(res => {
					if (res.code == 1) {
						this.orderNo = res.orderNo
						let code = new QRCode("qrcode", {
							text: res.data.codeUrl,
							width: 180,
							height: 180,
							colorDark: "#000000",
							colorLight: "#ffffff",
						});
						this.isload=false;
						this.getState(res.orderNo)
					}
				})
			},
			getState(orderNo){//获取支付状态
				let that=this;
				nowxPay({
					orderNo: orderNo,
					type: 'vip'
				}).then(res =>{
					if(res.code==1){
						if(res.trade_state == "SUCCESS"){
							that.$message({
								message: '支付成功',
								type: 'success'
							});
							clearTimeout(that.t);
							that.$router.replace('/user/order');
						}else{
							that.t=setTimeout(that.getState(that.orderNo), 1000);
						}
					}else{
						this.$alert(res.msg)
					}
				})
			}
		},
		created() {
			this.phone=localStorage.getItem('phoneNo');
			if(sessionStorage.getItem('vipdata')){
				this.list=JSON.parse(sessionStorage.getItem('vipdata'))
			}
		},
		beforeDestroy(){
			let that = this;
        	clearTimeout(that.t);
		}
	}
</script>
<style lang="less" scoped>
.openVip{
    background: url("../../assets/img/vipbg.png") no-repeat;
	background-size: 100% 370px;
	/deep/ .heads{
		background: transparent;
		margin-bottom: 47px
	}
	.main{
		width: 1020px;
		margin: 0 auto;
		h1{
			text-align: center;
			font-size: 48px;
			color: #fff;
			margin-bottom: 88px;
		}
		.dr{
			margin-bottom: 60px;
			li{
				transition: all .5s;
				width: 255px;
				background: #fff;
				border-radius: 4px;
				h5{
					line-height: 48px;
					background: #FFD5B9;
					text-align: center;
					border-bottom: none;
					/deep/ .svg-icon{
						margin-left: 10px;
						font-size: 18px;
					}
				}
				.price,.discount{
					display: flex;
					justify-content: center;
				}
				.discount{
					font{
						font-size: 14px;
						color: #fff;
						background: #039E3B;
						display: inline-block;
						margin-right: 10px;
						width: 46px;
						line-height: 20px;
						text-align: center;
						border-radius: 4px;
					}
				}
				.btn-box{
					border-top: none;
					text-align: center;
					button{
						width: 108px;
						background: #EB651B;
						color: #fff;
						line-height: 28px;
						text-align: center;
						border-radius: 28px;
					}
					button:hover{
						box-shadow:0px 0px 13px 0px rgba(0,0,0,0.23);
					}
				}
			}
			li:hover{
				z-index: 99;
				transform: scale(1.2);
				box-shadow:0px 0px 13px 0px rgba(0,0,0,0.23);
				h5{
					// padding-top: 16px;
					background: #fff;
					border: none
				}
				.pb30{
					border: none;
				}
				.btn-box{
					border: none
				} 
			}
		}
		.table-box{
			table{
				border-collapse: collapse;
				font-size: 14px;
				thead{
					background: #F4F4F4;
					font-size: 18px;
					font-weight: 600;
					th{
						border: 1px solid #DDDFE4;
						text-align: center;	
						padding: 12px 20px;
						p{
							font-size: 14px;
						}
					}
				}
				td{
					border: 1px solid #DDDFE4;
					text-align: center;
					padding: 12px 20px;
					position: relative;
				}
				.con{
					text-align: left;
				}
				.tit{
					color: #EB651B
				}
				.buy-new {
					display: inline-block;
					width: 40px;
					background: #FF4343;
					position: absolute;
					font-size: 12px;
					color: #fff;
					border-radius: 12px;
					font-weight: 550;
					right: 8px;
					top: 10px;
				}
			}
		}
	}
	.re-loading {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 5000;
		top: 0;
		left: 0;
		.re-puy {
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			width: 500px;

			box-sizing: border-box;
			top: 100px;
			background-color: #fff;
			box-shadow: 4px 3px 9px 1px rgba(4, 0, 0, 0.05);
			border: 1px solid rgba(242, 242, 242, 1);

			.puy-title {
				height: 45px;
				font-size: 16px;
				border-bottom: 1px solid #F2F2F2;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 18px;
				font-size: 16px;

				i {
					font-size: 24px;
					cursor: pointer;
				}
			}

			.puy-iphone {
				padding: 0 18px;
				height: 120px;
				display: flex;
				justify-content: center;
				flex-direction: column;
				width: 100%;
				font-size: 14px;
				border-bottom: 1px solid #F2F2F2;
				font-weight: 550;
				box-sizing: border-box;

				.puy-iput {
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.puy-hint {
					margin-top: 5px;
					font-size: 11px;
					color: red;
					font-weight: 400;
					padding-left: 110px;

					.puy-pos {
						position: relative;
						color: #999;
						overflow: hidden;
						padding-left: 12px;

						.puy-star {
							position: absolute;
							left: 0;
							top: 2px;
							font-size: 22px;
							color: red;
							line-height: 23px;
						}
					}

				}

				.puy-iti {
					line-height: 40px;
					width: 60px;
					background: rgba(254, 102, 3, 1);
					border-radius: 5px;
					text-align: center;
					color: #fff;
					font-weight: 400;
					margin-left: 10px;
					cursor: pointer;
				}
			}

			.puy-detail {
				padding: 18px 18px 10px;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #F2F2F2;

				.puy-name {
					margin-bottom: 15px;

					span {
						font-weight: 550;
						margin-right: 10px;
					}

					.price {
						font-weight: 400;
						font-size: 18px;
						color: #FE6603;
					}
				}
			}

			.puy-code {
				margin: 10px 0;
				display: flex;
				align-items: center;
				flex-direction: column;
				overflow: hidden;

				.puy-img {
					width: 180px;
					height: 180px;
				}

				.puy-hint {
					display: flex;
					align-items: center;
					font-size: 12px;
					color: #FE6603;
					margin-top: 10px;
				}
			}
		}
	}
}
</style>
