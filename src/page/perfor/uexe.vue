<template>
	<div class="ubid">
		<div class="ub-table">
			<div class="ub-top">
				<div class="left" style="width:60px;">
					序号
				</div>
				<div class="left" style="width:240px;">
					勘察单位名称
				</div>
				<div class="left" style="width:200px;">
					设计单位名称
				</div>
				<div class="left" style="width:305px;">
					施工图审查机构名称
				</div>
				<div class="left" style="width:110px;">审查完成日期
				</div>
				<div class="left" style="width:80px;">
					查看
				</div>
			</div>
			<div class="ub-text" v-for="(el,i) in company" :key="i">
				<div class="show-l">
					<div class="" style="width:60px;">
						{{i+1}}
					</div>
					<div class="" style="width:240px;">
						{{el.exploreOrg}}
					</div>
					<div class="" style="width:200px;">
						{{el.designOrg}}
					</div>
					<div class="" style="width:305px;">
						{{el.checkOrg}}
					</div>
					<div class="" style="width:110px;">{{el.checkFinishDate}}
					</div>
					<div class="" style="width:80px;">
						<img src="../../assets/img/icon-chakan.png" alt="" @click="gainPeo(el)">
					</div>
				</div>
			</div>
			<div class="show-nou" v-show="ubl">Sorry，暂未查询到该业绩的施工图审查信息</div>
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
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							施工图审查机构名称
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.checkOrg}}
						</div>
						<div class="show-text blur" style="width:207px;">
							施工图审查机构组织机构代码
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.checkOrgCode}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							施工图审查合格书编号
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.checkNo}}
						</div>
						<div class="show-text blur" style="width:207px;">
							省级施工图审查合格书编号
						</div>
						<div class="show-text " style="width:291px;border:none">
							{{debid.checkNumber}}
						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							审查完成日期
						</div>
						<div class="show-text" style="width:293px;">
							{{debid.checkFinishDate}}
						</div>
						<div class="show-text blur" style="width:207px;">

						</div>
						<div class="show-text " style="width:291px;border:none">

						</div>
					</div>
					<div class="show-del">
						<div class="show-text blur " style="width:207px;">
							建设规模
						</div>
						<div class="show-text" style="width:791px;">{{debid.proScope}}
						</div>
					</div>

					<div class="ur-main">
						企业主体信息
					</div>
					<div class="main-table">
						<div style="width:205px;" class="bor">
							涉及单位
						</div>
						<div style="width:310px;" class="bor">
							企业名称
						</div>
						<div style="width:300px;" class="bor">
							组织机构代码
						</div>
						<div style="width:150px;border:none" class="bor">
							所在省份
						</div>
					</div>

					<div class="main-table" style="backgroundColor: #fff;" v-show="pect">
						<div style="width:205px;" class="bor">
							勘察单位
						</div>
						<div style="width:310px;" class="bor">
							{{debid.exploreOrg}}
						</div>
						<div style="width:300px;" class="bor">
							{{debid.exploreOrgCode}}
						</div>
						<div style="width:150px;border:none" class="bor">
							{{debid.exploreProvince}}
						</div>
					</div>
					<div class="main-table" style="backgroundColor: #fff;" v-show="design">
						<div style="width:205px;" class="bor">
							设计单位
						</div>
						<div style="width:310px;" class="bor">
							{{debid.designOrg}}
						</div>
						<div style="width:300px;" class="bor">
							{{debid.designOrgCode}}
						</div>
						<div style="width:150px;border:none" class="bor">
							{{debid.designProvince}}
						</div>
					</div>
					<div class="main-no" v-show="noPeo">
						暂无数据
					</div>
					<div class="ur-main">
						从业人员信息
					</div>
					<div class="main-table">
						<div style="width:205px;" class="bor">
							所在企业
						</div>
						<div style="width:100px;" class="bor">
							专业名称
						</div>
						<div style="width:90px;" class="bor">
							担任角色
						</div>
						<div style="width:80px;" class="bor">
							姓名
						</div>
						<div style="width:175px;" class="bor">
							证件号码
						</div>
						<div style="width:160px;" class="bor">
							注册类型及等级
						</div>
						<div style="width:140px;border:none" class="bor">
							执业印章号
						</div>
					</div>
					<div class="main-table" v-for="(el,i) in debid.personList" :key="i">
						<div style="width:205px;" class="bor">
							{{el.comName}}
						</div>
						<div style="width:100px;" class="bor">
							--
						</div>
						<div style="width:90px;" class="bor">
							{{el.role}}
						</div>
						<div style="width:80px;" class="bor">
							{{el.name}}
						</div>
						<div style="width:175px;" class="bor">
							{{el.idCard}}
						</div>
						<div style="width:160px;" class="bor">
							{{el.category}}
						</div>
						<div style="width:140px;border:none" class="bor">
							{{el.safeNo}}
						</div>
					</div>
					<div class="main-no" v-show="noPeoL">
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
				design: true,
				pect: true,
				noPeoL: false
			}
		},
		methods: {
			gaindet() {
				cprodet({
					proId: this.id,
					tabType: 'design',
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
					tabType: 'design',
					pkid: el.pkid
				}).then(res => {
					if (res.code == 1) {
						this.debid = res.data
						if (this.debid.designOrg == '' && this.debid.designOrgCode == '' && this.debid.designProvince == '') {
							this.design = false
						} else {
							this.design = true
						}
						if (this.debid.exploreProvince == '' && this.debid.exploreOrgCode == '' && this.debid.exploreOrg == '') {
							this.pect = false
						} else {
							this.pect = true
						}
						if (this.pect || this.design) {
							this.noPeo = false
						} else {
							this.noPeo = true
						}
						if (this.debid.personList.length == 0) {
							this.noPeoL = true
						} else {
							this.noPeoL = false
						}

					}
				})
			},
			close() {
				this.modalHelper.beforeClose();
				this.isshow = false
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.gaindet()
		},
		props: ['titles'],
		components: {}
	}
</script>
<style lang="less" scoped>
	.ubid {
		background-color: #fff;
		padding: 0 10px 30px;
		margin-bottom: 200px;

		.ub-table {
			border: 1px solid #F2F2F2;

			.ub-top {
				height: 40px;
				line-height: 40px;
				border-bottom: 1px solid #F2F2F2;
				text-align: center;
				font-size: 14px;
				color: #333;
				font-weight: 550;
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
				padding: 10px;
				box-sizing: border-box;

				.auto-pop {
					overflow-x: auto;
					height: 420px;
				}

				.ur-title {
					height: 60px;
					line-height: 60px;
					display: flex;
					justify-content: space-between;
					font-size: 20px;
					color: #EC7522;
					font-weight: 550;

					i {
						font-size: 30px;
						cursor: pointer;
					}
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
					border: 1px solid #F2F2F2;

				}

				.show-del {
					display: flex;
					flex-direction: row;
					min-height: 40px;
					border: 1px solid #F2F2F2;
					font-size: 14px;

					.show-text {
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 5px 0;
						border-right: 1px solid #F2F2F2;

					}
				}
			}
		}

	}
</style>
