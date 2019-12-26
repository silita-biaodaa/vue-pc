<template>
	<div class="sign">
		<div class="sign-top">
			<span class="fw600 fs14 mb20">执业注册信息（{{total}}）</span>
		</div>
		<template v-if="isajax">
			<ul v-if="list&&list.length>0">
				<li v-for="(el,i) in list" class="mt20" :key="i">
					<div class="num fw600 fs14 mb10">证书{{i+1}}</div>
					<div class="box">
						<p class="bg-color borde">
							<span>注册类别</span>
						</p>
						<p class="zclb borde">
							<span>{{el.category}}</span>
						</p>
						<p class="bg-color borde">
							<span>注册专业</span>
						</p>
						<p class="borde">
							<span>{{el.major}}</span>
						</p>
						<p class="bg-color borde">
							<span>证书编号</span>
						</p>
						<p class=" borde">
							<span>{{el.certNo}}</span>
						</p>
						<p class="bg-color borde">
							<span>执业印章号</span>
						</p>
						<p class=" borde">
							<span>{{el.sealNo}}</span>
						</p>
						<p class="bg-color borde">
							<span>有效期</span>
						</p>
						<p class=" borde">
							<span>{{el.validDate}}</span>
						</p>
						<p class="bg-color borde">
							<span>注册单位</span>
						</p>
						<p class="company-people borde">
							<span><v-comjump :name="el.comName"></v-comjump></span>
						</p>
					</div>
				</li>
			</ul>
			<template v-else-if="list">
				<div class="no-toast">
					<img src="../../assets/img/bank_card @2x.png" alt="">
					<span>Sorry，没有找到该人员的证书信息</span>
				</div>
			</template>
			<!-- 加载失败 -->
			<template v-else-if="!list">
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
</template>
<script>
	import {
		persond
	} from '@/api/index'
	export default {
		data() {
			return {
				list: [],
				total: 0,
				ishow: false,
				loading:true,
				isajax:false,
			}
		},
		inject: ['reload'],
		methods: {
			gainList() {
				let data=JSON.parse(sessionStorage.getItem('peopleData'));
				data.tabType='registerCert';
				let that=this;
				persond(data).then(res => {
					this.isajax=true;
					if (res.code == 1) {
						this.total = res.data.personQualificat.length
						this.list = res.data.personQualificat
						if (this.total == 0) {
							this.ishow = true
						} else {
							this.ishow = false
						}
					}
				}).catch(function(){
					that.isajax=true;
					that.list=null;
				})
			},
			//刷新
			recoldFn() {
				this.reload();
			}
		},
		created() {
			this.gainList()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.sign {
		li{
			.box{
				width: 844px;
				display: grid;
				grid-template-columns: 116px 166px 116px 166px 116px 166px;
    			font-size: 14px;
				align-items:stretch;
				grid-template-rows:48px auto 48px;
				p{
					box-sizing: border-box;
					height: 100%;
					min-height: 48px;
					// position: relative;
					span{
						position: relative;
						transform: translate(0,-50%);
						top: 50%;
						left: 20px;
						display: block;
						width: calc(100% - 40px)
					}
				}
				.bg-color{
					width: 116px;
					text-align: center;
					padding-left: 0;
					font-weight: 600;
					span{
						transform: translate(-50%,-50%);
						left: 50%;
						width: 100%;
					}
				}
				.company-people{
					grid-column-start: 2;
					grid-column-end: 7;
				}
				.zclb{
					grid-column-start:2;
					grid-column-end: 5;	
				}
			}
		}
	}
	
</style>
