<template>
	<div class="wdetail">
		<v-bread :breadList="[{ title: '交通'},{title:'交通部业绩详情'}]"></v-bread>
		<div class="irr-detail">
			<div class="irr-title">
						<i class="iconfont iconxiangmu" ></i> {{detail.proName}}
			</div>
				<table  cellspacing="0" >
					<tr>
						 <td width='220' class="ur-title" >施工单位</td>
						 <td width='180' >{{detail.comName}}</td>
						 <td width='120' class="ur-title"  >标段名称</td>
						 <td width='180' >{{detail.section}}</td>
						 <td width='120' class="ur-title" >所在省份</td>
						 <td width='210' >{{detail.proWhere}}</td>
					</tr>
					<tr>
						 <td width='220' class="ur-title" >建设状态</td>
						 <td width='180' >{{detail.build}}</td>
						 <td width='120' class="ur-title"  >项目类型</td>
						 <td width='180' >{{detail.proType}}</td>
						 <td width='120' class="ur-title" >技术等级</td>
						 <td width='210' >{{detail.technicalGrade}}</td>
					</tr>
					<tr>
						 <td width='220' class="ur-title" >开工日期</td>
						 <td width='180' >{{detail.begined}}</td>
						 <td width='120' class="ur-title"  >交工日期</td>
						 <td width='180' >{{detail.ended}}</td>
						 <td width='120' class="ur-title" >竣工日期</td>
						 <td width='210' >{{detail.ended}}</td>
					</tr>
						<tr>
						 <td width='220' class="ur-title" >质量评定情况</td>
						 <td width='180' >{{detail.assess}}</td>
						 <td width='120' class="ur-title"  >合同金额</td>
						 <td width='180' >{{detail.contractAmount + '万'}}</td>
						 <td width='120' class="ur-title" >结算金额</td>
						 <td width='210' >{{detail.clearingAmount}}</td>
					</tr>
					<tr>
						 <td width='220' class="ur-title" >开始桩号</td>
						 <td width='180' >{{detail.stakeBegin}}</td>
						 <td width='120' class="ur-title"  >结束桩号</td>
						 <td width='180' colspan='3' >{{detail.stakeEnd}}</td>
					</tr>

					<tr>
						 <td width='220' class="ur-title" >主要工程量</td>
						 <td  colspan='5' >{{detail.remark}}</td>
				  </tr>			 
				</table>
		</div>

		<div class="irr-in irr-b">
			<div class="irr-nav">
				人员履约信息
			</div>
			<div class="people-table">
				<div class="people-top">
					<div style="width:100px;">序号</div>
					<div style="width:300px;">姓名</div>
					<div style="width:300px;">担任岗位或专业负责人</div>
					<div style="width:300px;border:none">任职日期</div>
				</div>
				<div class="people-dea" v-for="(el,i) in detail.persons" :key="i">
					<div style="width:100px;">
						{{i + 1}}
					</div>
					<div style="width:300px;">
						{{el.name}}
					</div>
					<div style="width:300px;">
						{{el.post}}
					</div>
					<div style="width:300px;border:none">
						{{el.begined}} - {{el.ended}}
					</div>
				</div>

				<div class="no-pro" v-show="leader">
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
					tabType: 'jiaotong',
					id: this.id
				}).then(res => {
					if (res.code == 1) {
						console.log(res.data.persons);

						this.detail = res.data
						if (this.detail.persons.length == 0) {
							this.leader = true
						} else {
							this.leader = false
						}
					}
				})
			},
			junmpto() {
				this.$router.push('/')
			},
			junmpjiao() {
				this.$router.push('/perfor/road')
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
