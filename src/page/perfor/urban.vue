<template>
	<div class="all-b" >
			<div class="wdetail">
				<div class="irr-nav">
					<span @click="junmpto">首页</span>
					<span> / </span>
					<span @click="junmpjiao">业绩</span>
					<span> / </span>
					<span>住建部业绩详情</span>
				</div>
				<div class="irr-detail">
					<div class="irr-title">
						<i class="iconfont iconxiangmu" ></i> {{detail.proName}}
					</div>
				<table  cellspacing="0" >
					<tr>
						 <td width='220' class="ur-title" >项目编号</td>
						 <td width='180' >{{detail.projectNo}}</td>
						 <td width='120' class="ur-title"  >省级项目编号</td>
						 <td width='180' >{{detail.proNo}}</td>
						 <td width='120' class="ur-title" >所在区域</td>
						 <td width='210' >{{detail.proWhere}}</td>
					</tr>

					 <tr>
						 <td width='220' class="ur-title" >建设单位组织机构代码 &nbsp&nbsp&nbsp&nbsp&nbsp（统一盛会信用代码）</td>
						 <td colspan='3' >{{detail.orgCode}}</td>
						 <td width='120' class="ur-title" >建设单位</td>
						 <td  >{{detail.proOrg}}</td>
				   </tr>

					 <tr>
						 <td width='220' class="ur-title" >项目类别</td>
						 <td >{{detail.proType}}</td>
						 <td width='120' class="ur-title"  >建设性质</td>
						 <td>{{detail.buildType}}</td>
						 <td width='120' class="ur-title" >工程用途</td>
						 <td  >{{detail.proUse }}</td>
				   </tr>

					 <tr>
						 <td width='220' class="ur-title" >投资总额</td>
						 <td >{{detail.investAmount?detail.investAmount + '万':''}}</td>
						 <td width='120' class="ur-title"  >总面积</td>
						 <td>{{detail.acreage}}</td>
						 <td width='120' class="ur-title" >立项级别</td>
						 <td  >{{detail.proLevel }}</td>
				   </tr>
						
						<tr>
						 <td width='220' class="ur-title" >立项文号</td>
						 <td  colspan='5' >{{detail.approvalNum}}</td>
						
				   </tr>					 
							
				</table>

				</div>
				<div class="ub-left" >
					<div class="ub-nav">
						<span v-for="(el,i) in navs" :key="i" :class="el.i  ? 'p-color' : '' " @click="jump(el)">{{el.name}} <span v-if="el.to">({{el.all}})</span>
						</span>
					</div>
					<div class="ub-nav ub-form"  >
						<i class="iconfont iconchakan" ></i> 查看数据来源
					</div>
				</div>
			
				<router-view :titles='detail.proName' :area='detail.proWhere'></router-view>

			</div>
	</div>

</template>
<script>
	import {
		prodet,
		count
	} from '@/api/index';
	export default {
		data() {
			return {
				detail: {},
				id: '',
				navs: [{
						name: '招投标',
						to: 'ubid',
						all: 0,
						i: false
					},
					{
						name: '|',
					},
					{
						name: '施工图审查',
						to: 'execu',
						all: 0,
						i: false
					},
					{
						name: '|',
					},
					{
						name: '合同备案',
						to: 'upact',
						all: 0,
						i: false
					},
					{
						name: '|',
					},
					{
						name: '施工许可',
						to: 'uallow',
						all: 0,
						i: false
					},
					{
						name: '|',
					},
					{
						name: '竣工验收备案',
						to: 'ulete',
						all: 0,
						i: false
					}
				],
			}
		},
		methods: {
			gainshui() {
				prodet({
					id: this.id
				}).then(res => {
					if (res.code == 1) {

						this.detail = res.data

					}
				})
			},
			gaincount() {
				count({
					proId: this.id
				}).then(res => {
					if (res.code == 1) {
						console.log(res, 1);
						this.navs[0].all = res.data.zhaotoubiao // 招投标
						this.navs[2].all = res.data.desin // 审查
						this.navs[4].all = res.data.contract // 合同
						this.navs[6].all = res.data.build // 许可
						this.navs[8].all = res.data.completion // 竣工
					}

				})
			},
			junmpto() {
				this.$router.push('/')
			},
			junmpjiao() {
				this.$router.push('/perfor/perlist')
			},
			jump(el) {
				if (el.to == null) {
					return
				}
				this.$router.push({
					path: el.to,
					query: {
						id: this.id
					}
				})
			}
		},
		watch: {
			$route: {
				handler: function(val, oldVal) {
					this.navs.forEach(el => {
						el.i = false
					})
					this.navs[val.meta.i].i = true
				},
				deep: true
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.navs[this.$route.meta.i].i = true
			this.gainshui()
			this.gaincount()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
.all-b {
	background-color: #fff;
	width: 100%;
}
	.wdetail {
		min-height: calc(~"100vh - 195px");
		overflow: hidden;
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
			padding: 1px 0 24px;
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
		.ub-left {
			display: flex;
			justify-content: space-between;
		}
		.ub-nav {
			height: 60px;
			line-height: 60px;
			font-size: 18px;
			color: #999;
			cursor: pointer;
			margin-top: 40px;
			background-color: #fff;
			span {
				margin-right: 15px;
			}
		}
		.ub-form {
			font-size: 14px;
			cursor: pointer;
			color: #4494F0;
			i {
				margin-right: 4px;
			}
		}
	}
</style>
