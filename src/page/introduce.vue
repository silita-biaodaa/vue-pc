<template>
	<div class="introduce">
		<v-bread :breadList="[{ title: '企业'},{title:title},{title:name}]"></v-bread>
		<div class="com-head" >
			<div class="com-title" >
				<div class="com-name" >
					<i  class="iconfont icongongsi" ></i>{{details.comName}}
				</div>
				<div>
					更新时间:{{formatDate((details.updated)*1,1)}}
				</div>
			</div>
			<div class="com-state" >
				<div class="state-left" >
					{{details.subsist}}
				</div>
				<div>
					<button @click="updateFn" >更新</button>
					<button @click="gaincollect" >{{collect}}</button>
				</div>
			</div>
				<table  cellspacing="0" >
					<tr>
						 <td width='220' class="ur-title" >统一社会信用代码</td>
						 <td width='230' >{{details.creditCode}}</td>
						 <td width='210' class="ur-title" >网址</td>
						 <td width='360' ><a  @click="jumpTo(details.comUrl)" >{{details.comUrl}}</a></td>
					</tr>
					<tr>
						 <td width='220' class="ur-title" >企业法定代表人</td>
						 <td width='230' >{{details.legalPerson}}</td>
						 <td width='210' class="ur-title" >企业登记注册类型</td>
						 <td width='360' >{{details.comType}}</td>
					</tr>
					<tr>
						 <td width='220' class="ur-title" >邮箱</td>
						 <td  colspan='3' >{{ details.email == '(NULL)' || 'null' ? '--' : details.email }}</td>
				  </tr>
					<tr>
						 <td width='220' class="ur-title" >企业经营地址</td>
						 <td  colspan='3' >{{details.comAddress ? details.comAddress : '--' }}</td>
				  </tr>
					<tr>
						 <td width='220' class="ur-title" >联系方式</td>
						 <td  colspan='3' >{{details.phone == 'NULL-' ? '' : details.phone}} <a v-if="isVip" style="marginLeft:30px;" > <i  class="iconfont iconVIPbiaozhi" ></i> VIP用户可见</a> </td>
				  </tr>			 
				</table>
		</div>

		<div class="left-right-box">
			<div class="user-tab bor-r">
				<div v-for="(el,i) in navs" class="tab" :key="i" :class="el.name == name ? 'current':''" @click="anchor(el)">
					{{el.name}}
				</div>
			</div>
			<div class="right-box">
				<router-view />
			</div>
		</div>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>

	</div>
</template>
<script>
	import {
		CQdetails,
		getJsonData,
		collectionCompany,
		nocollectionCompany
	} from '@/api/index'
	export default {
		data() {
			return {
				navs: [{
						name: '工商信息',
						i: 0,
						show: true,
						to: 'icbc',
						id: 1
					},
					{
						name: '法务信息',
						i: 1,
						show: false,
						to: 'law'
					}, {
						name: '资质信息',
						i: 2,
						show: false,
						to: 'intell'
					}, {
						name: '人员信息',
						i: 3,
						show: false,
						to: 'personnel'
					}, {
						name: '业绩信息',
						i: 4,
						show: false,
						to: 'centre'
					}, {
						name: '中标信息',
						i: 5,
						show: false,
						to: 'achievement'
					}, {
						name: '诚信信息',
						i: 6,
						show: false,
						to: 'good'
					}
				],
				svip: false,
				name: '工商信息',
				details: {},
				id: '',
				title: '',
				source: '',
				collect: '关注',
				iscollect: false,
				isVip:false
			}
		},
		watch: {
			$route(to, form) {
				this.navs.forEach(el => {
					el.show = false
				})
				this.name = this.navs[this.$route.meta.i].name
				this.navs[this.$route.meta.i].show = true
			}
		},
		methods: {
			gaincollect() {
				if (this.iscollect) {
					nocollectionCompany({
						companyid: this.id
					}).then(res => {

						if (res.code = 1) {
							this.iscollect = false
							this.collect = '关注'
						}
					})
				} else {
					collectionCompany({
						companyid: this.id
					}).then(res => {
						if (res.code = 1) {
							this.iscollect = true
							this.collect = '已关注'
						}
					})
				}
			},
			closeload(val) {
				this.svip = val.cur
			},
			anchor(el) {
				this.name = el.name
				this.navs.forEach(el => {
					el.show = false
				})
				el.show = true
				this.$router.push({
					path: el.to,
					query: {
						id: el.id,
						name: el.title,
						source: el.source
					}
				})
			},
			resetPhone(phone) {
				var str = String(phone)
				var len = str.length;
				if (len >= 7) {
					if (len == 11) {
						var reg = str.slice(3, 7)
						return str.replace(reg, "****")
					} else {
						var reg = str.slice(5, 9)
						return str.replace(reg, "****")
					}

				} else if (len < 7 && len >= 6) {
					//1234567
					var reg = str.slice(-4, -2)
					return str.replace(reg, "**")
				}
			},
			gainDetail() {
				this.id = this.$route.query.id
				let dataParam = JSON.stringify({});
				getJsonData("/company/" + this.id).then(res => {
					if (res.code == 1) {
						this.$route.query.source=res.data.regisAddress
						this.details = res.data
						this.iscollect = res.data.collected
						if (this.iscollect) {
							this.collect = '已关注'
						} else {
							this.collect = '关注'
						}
						var arr = []
						var str = []
						if (this.details.phone) {
							arr = this.details.phone.split(';')
							if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
								this.isVip = true
								for (const i of arr) {
									str.push(this.resetPhone(i))
								}
								this.details.phone = str.join(';')
							} else {
								this.isVip = false
							}
						}
					}
				});
			},
			gainNav() {
				var is = this.$route.meta.i
				this.name = this.navs[is].name
				this.navs[0].show = false
				this.navs[is].show = true
			},
			deploy() {
				this.navs.forEach(el => {
					el.id = this.id
					el.title = this.title
					el.source = this.source
				})
			},
			jump() {
				if (!this.details.comUrl) {
					return
				}
				if (this.details.comUrl.indexOf('http://') == -1) {
					window.open('http://' + this.details.comUrl)
				} else {
					window.open(this.details.comUrl)
				}
			},
			jumpapp() {
				const {
					href
				} = this.$router.resolve({
					path: '/download'
				})
				window.open(href, '_blank')
			},
			updateFn() { //更新
				if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
					this.svip = true
					this.modalHelper.afterOpen();
					this.pbMode = [];
					return false
				}
				let that = this;
				this.$http({
					method: 'post',
					url: '/updated/company',
					data: {
						comName: that.$route.query.name,
						comId: that.$route.query.id
					}
				}).then(function(res) {
					that.$alert(res.data.msg, '提示')
				})
			},
			jumpTo(uri) {
				if (uri.indexOf('http://') == -1) {
					uri = 'http://' + uri;
				}
				window.open(uri, '_blank')
			}
		},
		created() {
			this.source = this.$route.query.source
			this.title = this.$route.query.name
			this.gainDetail()
			this.gainNav()
			this.deploy()

		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.introduce {
		width: 1020px;
		margin: 0 auto 20px;
		.user-tab {
			padding-top: 8px;
		}
		.com-head {
			.com-title {
				display: flex;
				justify-content: space-between;
				line-height: 48px;
				.com-name {
					font-size: 34px;
					font-weight: 550;
					i {
						font-size: 34px;
						margin-right: 12px;
					}
				}
			}
			.com-state {
				display: flex;
				justify-content: space-between;
				padding-left: 50px;
				margin: 10px 0 20px;
				.state-left {
					padding: 5px 20px;
					font-size: 14px;
					color: #46BF72;
					background-color: #E6FFEF;
				}
				button {
					background-color: #fff;
					padding: 5px 20px;
					border: 1px solid #DDDFE4;
					margin-left: 40px;
					font-weight: 550;
					cursor: pointer;
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
					a {
						color: #4494F0;
						text-decoration: underline;
						cursor: pointer;
						i{
							color:#EB651B;
							margin-right: 8px;
						}
					}
				}
				  .ur-title {
    		  text-align: center;
    		  font-weight: 550;
    		  background:#F4F4F4;
    		}
			 }
		}
	}
</style>
