<template>
	<div class="certifi">
		<div class="certifi-nav">
			<span @click="$router.push('/')">首页</span>> <span @click="$router.push('/build')">在建</span>> {{detail.name}} > 在建详情
		</div>
		<div class="certifi-text">
			<div>
				<img src="../../assets/img/icon-nvxing.png" alt="" v-if="detail.sex == '女'">
				<img src="../../assets/img/icon-nanxing.png" alt="" v-else>

			</div>
			<div class="certifi-del">
				<p class="cer-name">{{detail.name}}</p>
				<p>身份证号码：<span>{{detail.idCard}}</span></p>
				<!-- <span v-if="detail.sex">性别：<span>{{detail.sex}}</span></p> -->
			</div>
		</div>
		<div class="certifi-list">
			<div class="certifi-top">
				押证详情
			</div>
			<div class="certifi-table">
				<div style="width:200px;">
					单位名称
				</div>
				<div style="width:150px;">
					岗位类别
				</div>
				<div style="width:230px;">
					工程名称
				</div>
				<!-- <div style="width:200px;" >
         建设单位
       </div>
       <div style="width:120px;" >
         所在市州
       </div> -->
				<div style="width:120px;">
					押证时间
				</div>
			</div>
			<div class="certifi-in" v-for="(el,i) in list" :key="i">
				<div style="width:200px;">
					{{el.unitOrg}}
				</div>
				<div style="width:150px;">
					{{el.type}}
				</div>
				<div style="width:230px;">
					{{el.proName}}
				</div>
				<!-- <div style="width:200px;" >
         {{el.proOrg}}
       </div>
       <div style="width:120px;" >
         {{el.city}}
       </div> -->
				<div style="width:120px;">
					{{el.date}}
				</div>
			</div>
		</div>
		<div class="cer-no" v-show="ishow">
			暂无数据
		</div>
	</div>
</template>
<script>
	import {
		underq
	} from '@/api/index';
	export default {
		data() {
			return {
				name: '',
				card: '',
				id: '',
				detail: {},
				list: [],
				ishow: false
			}
		},
		methods: {
			gaindel() {
				if (this.$route.query.card == null) {
					this.id = this.$route.query.id
					underq({
						pkid: this.id,
						type: 'detail'
					}).then(res => {
						if (res.code == 1) {
							this.detail = res.data[0]
							this.list = res.data
							if (this.list.length == 0) {
								this.ishow = true
							} else {
								this.ishow = false
							}
						}
					})
				} else {
					this.card = this.$route.query.card
					underq({
						name: 'aaaa',
						idCard: this.card,
						type: 'api'
					}).then(res => {
						if (res.code == 1) {
							this.detail = res.data[0]
							this.name = res.data[0].name
							this.list = res.data
							if (this.list.length == 0) {
								this.ishow = true
							} else {
								this.ishow = false
							}
						}
					})
				}

			}
		},
		created() {
			this.gaindel()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.certifi {
		min-height: calc(~"100vh - 195px");
		overflow: hidden;
		width: 1020px;
		box-sizing: border-box;
		margin: 0 auto;
		padding-bottom: 200px;

		.certifi-nav {
			line-height: 40px;
			font-size: 12px;
			color: #666;
			cursor: pointer;
		}

		.certifi-text {
			height: 130px;
			padding: 17px 20px;
			background-color: #fff;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;

			.certifi-del {
				margin-left: 20px;
				font-size: 12px;
				color: #333;

				p {
					margin-bottom: 6px;
				}

				.cer-name {
					font-size: 18px;
					font-weight: 550;
					color: #000;
					margin-bottom: 16px;
				}
			}
		}

		.certifi-list {
			background-color: #fff;
			margin-top: 28px;

			.certifi-top {
				line-height: 60px;
				padding-left: 20px;
				font-size: 18px;
				color: #FE6603;
				font-weight: 550;
				border-bottom: 1px solid #f2f2f2;
			}

			.certifi-table {
				display: flex;
				flex-direction: row;
				align-items: center;
				text-align: center;
				justify-content: space-around;
				height: 56px;
				color: #333;
				font-size: 14px;
				font-weight: 550;
				border-bottom: 1px solid #f2f2f2;
			}

			.certifi-in {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				text-align: center;
				min-height: 56px;
				color: #999;
				font-size: 14px;
				border-bottom: 1px solid #f2f2f2;
			}
		}

		.cer-no {
			height: 56px;
			line-height: 56px;
			text-align: center;
			border-bottom: 1px solid #f2f2f2;
			background-color: #fff;
			font-size: 14px;
			color: #999;
		}
	}
</style>
