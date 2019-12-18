<template>
	<div class="wdetail">
		<v-bread :breadList="[{ title: '水利'},{title:'水利部业绩详情'}]"></v-bread>

		<div class="irr-detail">
				<div class="irr-title">
						<i class="iconfont iconxiangmu" ></i> {{detail.proName}}
				</div>
				<table  cellspacing="0" >
					<tr>
						 <td width='220' class="ur-title" >施工单位</td>
						 <td width='180' >{{detail.comName}}</td>
						 <td width='120' class="ur-title"  >建设单位</td>
						 <td width='180' >{{detail.proOrg}}</td>
						 <td width='120' class="ur-title" >所在地区</td>
						 <td width='210' >{{detail.proWhere}}</td>
					</tr>
					<tr>
						 <td width='220' class="ur-title" >工程状态</td>
						 <td width='180' >{{detail.proStatus}}</td>
						 <td width='120' class="ur-title"  >合同金额</td>
						 <td width='180' >{{detail.contractAmount}}</td>
						 <td width='120' class="ur-title" >结算金额</td>
						 <td width='210' >{{detail.clearingAmount}}</td>
					</tr>
					<tr>
						 <td width='220' class="ur-title" >开工日期</td>
						 <td width='180' >{{detail.worked}}</td>
						 <td width='120' class="ur-title"  >完工日期</td>
						 <td width='180' >{{detail.finished}}</td>
						 <td width='120' class="ur-title" >合同工期</td>
						 <td width='210' >{{detail.duration}}</td>
					</tr>
					<tr>
						 <td width='220' class="ur-title" >项目负责人</td>
						 <td width='180' >{{prizes}}</td>
						 <td width='120' class="ur-title"  >技术负责人</td>
						 <td width='180' colspan='3' >{{leaders}}</td>
					</tr>

					<tr>
						 <td width='220' class="ur-title" >关键指标</td>
						 <td  colspan='5' >{{detail.majorTarget}}</td>
				  </tr>	

					<tr>
						 <td width='220' class="ur-title" >合同主要内容</td>
						 <td  colspan='5' >{{detail.contractContent}}</td>
				  </tr>				 
				</table>
		</div>

		<div class="irr-in">
			<div class="irr-nav">
				主要参与人员
			</div>
			<div class="people-table">
				<div class="people-top">
					<div style="width:80px;">
						姓名
					</div>
					<div style="width:160px;">
						身份证号
					</div>
					<div style="width:100px;">
						职务
					</div>
					<div style="width:100px;">
						职称
					</div>
					<div style="width:190px;">
						证书名称
					</div>
					<div style="width:170px;">
						证书编号
					</div>
					<div style="width:126px;">
						证书专业
					</div>
					<div style="width:70px;border:none">
						等级
					</div>
				</div>
				<div class="people-dea" v-for="(el,i) in detail.mainPersons" :key="i">
					<div style="width:80px;">
						{{el.姓名}}
					</div>
					<div style="width:160px;">
						{{el.身份证号}}
					</div>
					<div style="width:100px;">
						{{el.职务}}
					</div>
					<div style="width:100px;">
						{{el.职称}}
					</div>
					<div style="width:190px;">
						{{el.证书名称}}
					</div>
					<div style="width:170px;">
						{{el.证书编号}}
					</div>
					<div style="width:126px;">
						{{el.证书专业 ? el.证书专业 : '/'}}
					</div>
					<div style="width:70px;border:none">
						{{el.等级}}
					</div>
				</div>

				<div class="no-pro" v-show="!leader">
					暂无数据
				</div>

			</div>
		</div>

		<div class="irr-in irr-pro">
			<div class="irr-nav">
				工程获奖
			</div>
			<div class="people-table">
				<div class="people-top">
					<div style="width:225px;">
						奖项名称
					</div>
					<div style="width:110px;">
						奖项类别
					</div>
					<div style="width:100px;">
						奖项级别
					</div>
					<div style="width:140px;">
						奖项等级
					</div>
					<div style="width:200px;">
						颁奖单位
					</div>
					<div style="width:116px;">
						颁奖文号
					</div>
					<div style="width:100px;border:none">
						颁奖时间
					</div>
				</div>
				<div class="people-dea" v-for="(el,i) in detail.proPrizes" :key="i">
					<div style="width:225px;">
						{{el.奖项名称}}
					</div>
					<div style="width:110px;">
						{{el.奖项类别}}
					</div>
					<div style="width:100px;">
						{{el.奖项级别}}
					</div>
					<div style="width:140px;">
						{{el.奖项等级}}
					</div>
					<div style="width:200px;">
						{{el.颁奖单位}}
					</div>
					<div style="width:116px;">
						{{el.颁奖文号}}
					</div>
					<div style="width:100px;border:none">
						{{el.颁奖时间}}
					</div>
				</div>
				<div class="no-pro" v-show="!prize">
					暂无数据
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import {
		prodet
	} from '@/api/index';
	export default {
		data() {
			return {
				detail: {},
				leader: true,
				prize: true,
				leaders: '',
				prizes: '',
				id: ''
			}
		},
		methods: {
			gainshui() {
				prodet({
					tabType: 'shuili',
					id: this.id
				}).then(res => {
					console.log(res);
					if (res.code == 1) {
						this.detail = res.data
						if (this.detail.mainPersons) {
							this.leader = true
						} else {
							this.leader = false
						}
						if (this.detail.proPrizes) {
							this.prize = true
						} else {
							this.prize = false
						}
						if (this.detail.duration.indexOf('天') == -1) {
							this.detail.duration = this.detail.duration + '天'
						}
						let arr1 = [],
							arr2 = []
						this.detail.leaderPersons.forEach(el => {
							if (el.职务 == '技术负责人') {
								arr1.push(el.姓名)
							} else {
								arr2.push(el.姓名)
							}
						})
						this.leaders = arr1.join(',')
						this.prizes = arr2.join(',')
					}
				})
			},
			junmpto() {
				this.$router.push('/')
			},
			junmpshui() {
				this.$router.push('/perfor/water')
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.gainshui()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.wdetail {
		padding: 6px 0 200px;
		width: 1020px;
		box-sizing: border-box;
		margin: 0 auto;
		.irr-nav {
			height: 40px;
			line-height: 40px;
			font-size: 12px;
			color: #666;
			cursor: pointer;
		}
		.irr-detail {
			background-color: #fff;
			.irr-title {
				font-size: 34px;
				color: #000;
				font-weight: 550;
				margin-bottom: 20px;
				white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
				i {
					font-size: 34px;
				}
			}
			table {
				 border:1px solid rgba(221,223,228,1);
				 border-collapse: collapse;
					  td {
      	  height: 48px;
      	  line-height: 20px;
      	  font-size: 14px;
      	  border:1px solid rgba(221,223,228,1);
					padding: 5px 15px;
					color: #000;
      	  box-sizing: border-box;
				}
				  .ur-title {
    		  text-align: center;
    		  font-weight: 550;
    		  background:#F4F4F4;
    		}
			 }

		}
		.irr-in {
			background-color: #fff;
			.irr-nav {
				height: 60px;
				line-height: 60px;
				font-size: 14px;
				color: #000;
				font-weight: 550;
			}
			.people-table {
				border: 1px solid #DDDFE4;
				border-collapse: collapse;
				.people-top {
					background: #F4F4F4;
					border-bottom: 1px solid #DDDFE4;
					display: flex;
					flex-direction: row;
					height: 40px;
					font-size: 14px;
					font-weight: 550;
					line-height: 40px;
					div {
						text-align: center;
						border-right: 1px solid #DDDFE4;
						border-collapse: collapse;
					}
				}
				.people-dea {
					border-bottom: 1px solid #DDDFE4;
					display: flex;
					flex-direction: row;
					min-height: 40px;
					font-size: 14px;
					div {
						text-align: center;
						border-right: 1px solid #DDDFE4;
						border-collapse: collapse;
						height: auto;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.no-pro {
					height: 40px;
					line-height: 40px;
					text-align: center;
					font-size: 14px;
					color: #999;
				}
			}
		}
	}
</style>
