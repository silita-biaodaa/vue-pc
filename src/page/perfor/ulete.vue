<template>
	<div class="ubid">
		<div class="ub-table">
			<div class="ub-top">
				<div class="left ub-right" style="width:60px;">
					序号
				</div>
				<div class="left ub-right" style="width:220px;">
					竣工备案编号
				</div>
				<div class="left ub-right" style="width:200px;">
					省级竣工备案编号
				</div>
				<div class="left ub-right" style="width:150px;">
					实际造价（万元）
				</div>
				<div class="left ub-right" style="width:150px;">实际面积（平方米）
				</div>
				<div class="left ub-right" style="width:130px;">实际竣工验收日期
				</div>
				<div class="left " style="width:100px;">
					查看
				</div>
			</div>
			<div class="ub-text" v-for="(el,i) in company" :key="i">
				<div class="show-l">
					<div class="ub-full ub-right " style="width:60px;">
						{{i+1}}
					</div>
					<div class="ub-full ub-right " style="width:220px;">
						{{el.code}}
					</div>
					<div class="ub-full ub-right " style="width:200px;">
						{{el.provCode}}
					</div>
					<div class="ub-full ub-right " style="width:150px;">
						{{el.cost ? el.cost + '万元' : ''}}
					</div>
					<div class="ub-full ub-right " style="width:150px;">{{el.area}}
					</div>
					<div class="left ub-full ub-right " style="width:130px;">
						{{el.buildEnd}}
					</div>
					<div class="" style="width:100px;">
						<!-- <img src="../../assets/img/icon-chakan.png" alt="" @click="gainPeo(el)"> -->
						<div @click="gainPeo(el)" class="ub-look" >
								<i class="iconfont iconchakan" ></i> 查看
						</div>
					</div>
				</div>
			</div>
			<div class="show-nou" v-show="ubl">Sorry，暂未查询到该业绩的竣工备案信息</div>
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
				<div class="auto-pop">
					<div class="ur-main">
						基本信息
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							竣工备案编号
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.code}}
						</div>
						<div class="show-text blur" style="width:207px;">
							省级竣工备案编号
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.provCode}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							实际造价（万元）
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.cost ?  debid.cost + '万元' : '' }}
						</div>
						<div class="show-text blur" style="width:207px;">
							实际面积（平方米）
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.area ?  debid.area + '万元' : '' }}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							实际开工日期
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.buildStart}}
						</div>
						<div class="show-text blur" style="width:207px;">
							实际竣工验收日期
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.buildEnd}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							记录登记时间
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.recordDate}}
						</div>
						<div class="show-text blur" style="width:207px;">
							备注
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.pdIdCard}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							实际建设规模
						</div>
						<div class="show-text" style="width:791px;">
							{{debid.buildScale}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							结构体系
						</div>
						<div class="show-text" style="width:791px;">
							{{debid.struct}}
						</div>
					</div>

					<div class="ur-main">
						企业主体信息
					</div>
					<div class="main-table">
						<div style="width:205px;" class="bor cure">
							涉及单位
						</div>
						<div style="width:310px;" class="bor cure">
							企业名称
						</div>
						<div style="width:300px;" class="bor cure">
							统一社会信用代码
						</div>
						<div style="width:150px;border:none" class="bor cure">
							所在省份
						</div>
					</div>

					<div class="main-table" style="backgroundColor: #fff;" v-for="(el,i) in debid.companys" :key="i">
						<div style="width:205px;" class="bor">
							{{el.role}}
						</div>
						<div style="width:310px;" class="bor">
							{{el.comName}}
						</div>
						<div style="width:300px;" class="bor">
							{{el.orgCode}}
						</div>
						<div style="width:150px;border:none" class="bor">
							{{el.province}}
						</div>
					</div>
					<div class="main-no" v-show="noPeo">
						暂无数据
					</div>

					<div class="ur-main">
						从业人员信息
					</div>
					<div class="main-table">
						<div style="width:205px;" class="bor cure">
							担任角色
						</div>
						<div style="width:110px;" class="bor cure">
							姓名
						</div>
						<div style="width:300px;" class="bor cure">
							证件号码
						</div>
						<div style="width:150px;" class="bor cure">
							注册类型及等级
						</div>
						<div style="width:200px;border:none" class="bor cure">
							执业印章号
						</div>
					</div>

					<div class="main-table" style="backgroundColor: #fff;" v-for="(el) in debid.persons" :key="el.idCard">
						<div style="width:205px;" class="bor">
							{{el.role}}
						</div>
						<div style="width:110px;" class="bor">
							{{el.name}}
						</div>
						<div style="width:300px;" class="bor">
							{{el.idCard}}
						</div>
						<div style="width:150px;" class="bor">
							{{el.category}}
						</div>
						<div style="width:200px;border:none" class="bor">
							{{el.certNo}}
						</div>
					</div>
					<div class="main-no" v-show="noRol">
						暂无数据
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
				noRol: false,
				noPeoL: false,
				name: '',
			}
		},
		methods: {
			gaindet() {
				cprodet({
					proId: this.id,
					tabType: 'completion',
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
					tabType: 'completion',
					pkid: el.pkid
				}).then(res => {
					if (res.code == 1) {
						console.log(res);
						this.debid = res.data
						if (this.debid.companys.length == 0) {
							this.noPeoL = true
						} else {
							this.noPeoL = false
						}
						if (this.debid.persons.length == 0) {
							this.noRol = true
						} else {
							this.noRol = false
						}

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
				box-sizing: border-box;
				.auto-pop {
					overflow-x: auto;
					padding: 10px 30px;
					height: 420px;
				}

				.ur-title {
					height: 60px;
					line-height: 60px;
					display: flex;
					justify-content: space-between;
					font-size: 18px;
					color: #150000;
					font-weight: 550;
					padding: 0 30px;
					border-bottom: 1px solid #DDDFE4;
					overflow: hidden;
					i {
						font-size: 28px;
						cursor: pointer;
					}
				}
				.ur-main {
					height: 60px;
					line-height: 60px;
					font-size: 14px;
					color: #000;
					font-weight: 550;
				}
				.main-table {
					min-height: 45px;
					display: flex;
					flex-direction: row;
					font-size: 14px;
					color: #000;
					border: 1px solid #DDDFE4;
					background-color: #F4F4F4;
					.bor {
						border-right: 1px solid #DDDFE4;
						padding: 5px 6px;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
					}
					.cure {
						font-weight: 550;
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
						justify-content: center;
						padding: 5px 0;
						border-right: 1px solid #DDDFE4;
					}
				}
			}
		}
	}
		.blur {
		 background-color: #F4F4F4;
		 color:#000;
		 font-weight: 550;
	}
</style>
