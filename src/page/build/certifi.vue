<template>
	<div class="certifi">
		<v-bread :breadList="[{ title: '在建'},{title:xx},{title:'在建详情'}]"></v-bread>
		<div class="certifi-name" >
			<i class="iconfont iconshenfen" ></i> {{detail.name}}
		</div>
		<div class="certifi-idcard" >
			<div style="width:220px;" >
				身份证号
			</div>
			<span>
				{{detail.idCard}}
			</span>
		</div>
		<!-- <div class="certifi-text">
			<div>
				<img src="../../assets/img/icon-nvxing.png" alt="" v-if="detail.sex == '女'">
				<img src="../../assets/img/icon-nanxing.png" alt="" v-else>

			</div>
			<div class="certifi-del">
				<p class="cer-name">{{detail.name}}</p>
				<p>身份证号码：<span>{{detail.idCard}}</span></p>
			</div>
		</div> -->
		<div class="certifi-list">
			<div class="certifi-top">
				押证详情
			</div>
			<div class="certifi-table">
				<div style="width:326px;">
					单位名称
				</div>
				<div style="width:200px;">
					岗位类别
				</div>
				<div style="width:330px;">
					工程名称
				</div>
				<div style="width:175px;border:none">
					押证时间
				</div>
			</div>
			<div class="certifi-in" v-for="(el,i) in list" :key="i">
				<div style="width:326px;">
					{{el.unitOrg}}
				</div>
				<div style="width:200px;">
					{{el.type}}
				</div>
				<div style="width:330px;">
					{{el.proName}}
				</div>
				<div style="width:175px;border:none">
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
import publicBread from "@/components/customize/publicBread";
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
				ishow: false,
				xx:''
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
							this.xx=res.data[0].name
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
		components: {
			"v-bread": publicBread,
		}
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
		.certifi-name {
			font-size: 34px;
			font-weight: 550;
			color: #150000;
			i {
				font-size: 34px;
				margin-right: 7px;
			}
		}
		.certifi-idcard {
				 border: 1px solid #DDDFE4;
				 display: flex;
				 align-items: center;
				 font-size: 18px;
				 color: #000;
				 margin-top: 20px;
				 div {
					 height: 48px;
					 text-align: center;
					 line-height: 48px;
					 border-right: 1px solid #DDDFE4;
					 font-weight: 550;
					 background-color: #F4F4F4;
					 margin-right: 20px;
				 }
		}

		.certifi-list {
			.certifi-top {
				line-height: 57px;
				font-size: 14px;
				color: #150000;
				font-weight: 550;
			}

			.certifi-table {
				display: flex;
				flex-direction: row;
				align-items: center;
				text-align: center;
				height: 48px;
				color: #333;
				font-size: 14px;
				font-weight: 550;
				border: 1px solid #DDDFE4;
				background-color: #F4F4F4;
				border-bottom: none;
				font-size: 14px;
				div {
					height: 100%;
					line-height: 48px;
					border-right: 1px solid #DDDFE4;
				}
			}

			.certifi-in {
				display: flex;
				flex-direction: row;
				color: #000;
				font-size: 14px;
				border: 1px solid #DDDFE4;
				div {
					min-height: 68px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-right: 1px solid #DDDFE4;
					line-height: 20px;
				
				}
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
