<template>
	<div class="sign">
		<div class="sign-top">
			<span>执业注册信息（{{total}}）</span>
		</div>
		<ul v-if="list&&list.length>0">
			<li v-for="(el,i) in list" :key="i">
				<div class="box">
					<div>
						<span>注册类别：</span>
						{{el.category}}
					</div>
					<div>
						<span>注册专业：</span>
						{{el.major}}
					</div>
					<div></div>
					<div>
						<span>证书编号：</span>
						{{el.certNo}}
					</div>
					<div>
						<span>执业印章号：</span>
						{{el.sealNo}}
					</div>
					<div>
						<span>有效期：</span>
						{{el.validDate}}
					</div>
					<div>
						<span>注册单位：</span>
						<v-comjump :name="el.comName"></v-comjump>
					</div>
				</div>
				<div class="num">{{i+1}}</div>
			</li>
		</ul>
		<template v-else>
			<div class="no-toast">
				<img src="../../assets/img/bank_card @2x.png" alt="">
				<span>Sorry，没有找到该人员的证书信息</span>
			</div>
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
				name: '',
				sex: '',
				idCard: '',
				certNo: '',
				comId: '',
				comName: '',
				tabCode: '',
				list: [],
				total: 0,
				ishow: false
			}
		},
		methods: {
			gainList() {
				persond({
					certNo: this.certNo,
					comId: this.comId,
					comName: this.comName,
					idCard: this.idCard,
					sex: this.sex,
					tabCode: this.tabCode,
					tabType: 'registerCert',
					name: this.name
				}).then(res => {
					if (res.code == 1) {
						this.total = res.data.personQualificat.length
						this.list = res.data.personQualificat
						if (this.total == 0) {
							this.ishow = true
						} else {
							this.ishow = false
						}
					}

				})
			}
		},
		created() {
			this.name = this.$route.query.name
			this.idCard = this.$route.query.idCard
			this.sex = this.$route.query.sex
			this.certNo = this.$route.query.certNo
			this.comId = this.$route.query.comId
			this.comName = this.$route.query.comName
			this.tabCode = this.$route.query.tabCode
			this.gainList()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.sign {
		background-color: #fff;
		padding: 0 20px 30px;
		box-sizing: border-box;
		width: 100%;
		.sign-top {
			line-height: 44px;
			font-size: 14px;
			font-weight: 550;
			color: #333;

			span {
				border-left: 2px solid #FE6603;
				padding-left: 10px;
			}
		}
		li{
			display: flex;
			padding: 20px 0;
			padding-left: 30px;
			margin-top: 15px;
			box-shadow: 2px 3px 9px 2px rgba(4,0,0,0.1);
			.box{
				width: 660px;
				height: 120px;
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				grid-template-rows: 1fr 1fr 1fr;
				align-items:center;
				div{
					font-size: 12px;
					color: #333;
					span{
						color: #999
					}
				}
			}
			.num{
				font-size: 104px;
				color:rgba(204,204,204,.5);
				font-style: italic;

			}
		}
	}
	
</style>
