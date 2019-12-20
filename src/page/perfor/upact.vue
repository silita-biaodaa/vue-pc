<template>
	<div class="ubid">
		<div class="ub-table">
			<div class="ub-top">
				<div class="left ub-right" style="width:60px;">
					序号
				</div>
				<div class="left ub-right" style="width:260px;">
					承包单位名称
				</div>
				<div class="left ub-right" style="width:250px;">
					发包单位名称
				</div>
				<div class="left ub-right" style="width:100px;">
					合同类别
				</div>
				<div class="left ub-right" style="width:130px;">合同金额（万元）
				</div>
				<div class="left ub-right" style="width:110px;">合同签订日期
				</div>
				<div class="left" style="width:90px;">
					查看
				</div>
			</div>
			<div class="ub-text" v-for="(el,i) in company" :key="i">
				<div class="show-l">
					<div class="ub-full ub-right" style="width:60px;">
						{{i+1}}
					</div>
					<div class="ub-full ub-right" style="width:260px;">
						{{el.contractComName}}
					</div>
					<div class="ub-full ub-right" style="width:250px;">
						{{el.letContractComName}}
					</div>
					<div class="ub-full ub-right" style="width:100px;">
						{{el.type}}
					</div>
					<div class="ub-full ub-right" style="width:130px;">
						{{el.amount ? el.amount + '万元' : '' }}
					</div>
					<div class="ub-full ub-right" style="width:110px;">{{el.signDate}}
					</div>
					<div class="" style="width:90px;">
						<!-- <img src="../../assets/img/icon-chakan.png" alt="" @click="gainPeo(el)"> -->
						<div @click="gainPeo(el)" class="ub-look" >
								<i class="iconfont iconchakan" ></i> 查看
						</div>
					</div>
				</div>
			</div>
			<div class="show-nou" v-show="ubl">Sorry，暂未查询到该业绩的合同备案信息</div>
		</div>

		<div class="black-pop" v-if="isshow">
			<div class="ur-pop">
				<div class="ur-title">
					<div>
						{{titles}}
					</div>
					<div>
						<i class="el-icon-close" @click="close"></i>
					</div>
				</div>
				<div class="ur-name" >
					基本信息
				</div>
				<div class="auto-pop">
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							合同备案编号
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.recordCode}}
						</div>
						<div class="show-text blur" style="width:207px;">
							省级合同备案编号
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.provRecordCode}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							合同编号
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.code}}
						</div>
						<div class="show-text blur" style="width:207px;">
							合同分类
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.category}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							合同类别
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.type}}
						</div>
						<div class="show-text blur" style="width:207px;">
							合同金额（万元）
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.amount ? debid.amount + '万元' : '' }}
						</div>
					</div>

					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							合同签订日期
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.signDate}}
						</div>
						<div class="show-text blur" style="width:207px;">
							记录登记时间
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.recordDate}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							发包单位名称
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.letContractComName}}
						</div>
						<div class="show-text blur" style="width:207px;">
							发包单位组织机构代码
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.letOrgCode}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							承包单位名称
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.contractComName}}
						</div>
						<div class="show-text blur" style="width:207px;">
							承包单位组织机构代码
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.contractOrgCode}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							联合体承包单位名称
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.jointComName}}
						</div>
						<div class="show-text blur" style="width:207px;">
							联合体承包单位组织机构代码
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.jointOrgCode}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							建设规模
						</div>
						<div class="show-text" style="width:791px;">{{debid.buildScale}}
						</div>
					</div>


				</div>

			</div>
		</div>


	</div>
</template>
<script>
	import {
		cprodet,
		lprodet
	} from '@/api/index';
	export default {
		data() {
			return {
				id: '',
				company: [],
				isshow: false,
				title: '',
				debid: {},
				noPeo: false,
				ubl: false,
				design: true,
				pect: true,
				noPeoL: false
			}
		},
		methods: {
			gaindet() {
				cprodet({
					proId: this.id,
					tabType: 'contract',
					pageNo: '1',
					pageSize: '1000'
				}).then(res => {
					this.company = res.data
					if (this.company.length == 0) {
						this.ubl = true
					} else {
						this.ubl = false
					}
				})
			},
			gainPeo(el) {
				this.isshow = true
				this.modalHelper.afterOpen();

				lprodet({
					proId: this.id,
					tabType: 'contract',
					pkid: el.pkid
				}).then(res => {
					if (res.code == 1) {
						this.debid = res.data
					}
				})
			},
			close() {
				this.modalHelper.beforeClose();
				this.isshow = false
			}
		},
		props: ['titles'],
		created() {
			this.id = this.$route.query.id;
			this.gaindet()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.ubid {
		background-color: #fff;
		padding: 0 0 30px;
		margin-bottom: 200px;

		.ub-table {
			border: 1px solid #DDDFE4;

			.ub-top {
				height: 48px;
				line-height: 48px;
				border-bottom: 1px solid #DDDFE4;
				text-align: center;
				font-size: 14px;
				color: #333;
				font-weight: 550;
				background-color: #F4F4F4;
			}
			.ub-right {
				border-right: 1px solid #DDDFE4;
				box-sizing: border-box;
			}
			.ub-full{
				min-height: 55px;
				display: flex;
				align-items: center;
				line-height:20px;
				justify-content: center;
			
			}
			.ub-look {
				color:#4494F0;
				cursor: pointer;
			}
			.ub-text {
				min-height: 56px;
				overflow: hidden;
				text-align: center;
				font-size: 14px;
				color: #333;

				.show-l {
					overflow: hidden;
					display: flex;
					flex-direction: row;
					min-height: 55px;
					align-items: center;
					border-bottom: 1px solid #F2F2F2;
				}

				img {
					vertical-align: bottom;
					cursor: pointer;
				}

			}

		}

		.show-nou {
			min-height: 55px;
			line-height: 55px;
			color: #999;
			font-size: 14px;
			text-align: center;
			border-bottom: 1px solid #F2F2F2;
		}

		.black-pop {
			z-index: 99999;
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			left: 0;
			background: rgba(0, 0, 0, .5);
			.ur-pop {
				width: 998px;
				height: auto;
				position: fixed;
				top: 110px;
				left: 50%;
				transform: translateX(-50%);
				background-color: #fff;
				border: 1px solid rgba(242, 242, 242, 1);
				border-radius:12px;
				box-sizing: border-box;
				.auto-pop {
					overflow-x: auto;
					max-height: 420px;
					padding: 10px 30px;
				}

				.ur-title {
					height: 60px;
					line-height: 60px;
					display: flex;
					justify-content: space-between;
					font-size: 20px;
					color: #150000;
					padding: 0 30px;
					border-bottom: 1px solid #DDDFE4;
					font-weight: 550;
					i {
						font-size: 30px;
						cursor: pointer;
					}
				}
				.ur-name{
					line-height: 50px;
					padding-left: 30px;
					font-size: 14px;
					color: #000;
					font-weight: 550;
				}
				.ur-main {
					height: 60px;
					line-height: 60px;
					text-align: center;
					font-size: 18px;
					color: #FE6603;
				}

				.main-table {
					min-height: 45px;
					display: flex;
					flex-direction: row;
					font-size: 14px;
					color: #999;
					border: 1px solid #F2F2F2;
					background-color: #fafdff;

					.bor {
						border-right: 1px solid #F2F2F2;
						padding: 5px 6px;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
					}
				}

				.main-no {
					height: 45px;
					line-height: 45px;
					font-size: 14px;
					color: #999;
					text-align: center;
					border: 1px solid #DDDFE4;

				}

				.show-del {
					display: flex;
					flex-direction: row;
					min-height: 40px;
					border: 1px solid #DDDFE4;
					font-size: 14px;

					.show-text {
						display: flex;
						align-items: center;
						padding: 5px 10px;
						border-right: 1px solid #DDDFE4;
						box-sizing: border-box;
						text-align: center;

					}
				}
			}
		}
	}
	.blur {
		 background-color: #F4F4F4;
		 color:#000;
		 font-weight: 550;
		justify-content: center;

	}
</style>
