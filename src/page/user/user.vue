<template>
	<div class="user">
		<div class="user-nav">
			<div class="in-nav">
				<img src="../../assets/img/uselogo.png" alt="" @click="jump" style="cursor: pointer;">
				<el-dropdown>
					<span class="el-dropdown-link">
						<span class="user-name">用户中心<i class="user-info" v-show="ishow"></i></span><i class="el-icon-arrow-down el-icon-caret-bottom"></i>
					</span>
					<el-dropdown-menu slot="dropdown" trigger="click">
						<el-dropdown-item @click.native="gotoUser()">个人设置</el-dropdown-item>
						<el-dropdown-item @click.native="toinf()"><span class="user-name">我的消息<i class="user-info" v-show="ishow"></i></span></el-dropdown-item>
						<el-dropdown-item @click.native="tocol()">我的关注</el-dropdown-item>
						<el-dropdown-item @click.native="amend()">修改密码</el-dropdown-item>
						<el-dropdown-item @click.native="order()">我的订单</el-dropdown-item>
						<el-dropdown-item @click.native="quit()">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="user-new" >
			<span >首页</span> <i>/</i><span style="color:#000" >{{name}}</span>
		</div>
		<div class="user-text">
			<div class="text-nav">
				<div class='user-news'>
					<el-upload action="http://pre.biaodaa.com/userCenter/updateHeadPortrait" :on-success="upLoadFn" auto-upload
					 :show-file-list="false">
						<template v-if="userData.imageUrl">
							<img :src="userData.imageUrl" alt="">
						</template>
						<template v-else>
							<img src="../../assets/img/pic-toux.png@2x.png" alt="">
						</template>
					</el-upload>

					<div class="user-first">
						<div class="user-name left">
							{{userData.nikeName}}
						</div>
						<div class="user-state left">
							<i class="iconfont iconVIPbiaozhi" :class="state == '会员' ? 'have' : 'noh'" ></i>
						
						</div>
					</div>
					<div class="user-day">
						剩余天数: <span class="use-color">{{day}}天</span>
					</div>
					<div class="user-btn" @click="jumpapp">{{vipname}}
					</div>
				</div>
				<div class="user-line" > 
					<div class="division" >

					</div>
				</div>
				<div class="user-tab">
					<div class="tab dfcc" v-for="(el,i) in tab" :key="i" :class="el.i ? 'current' : '' " @click='jumpto(el)'>
						<!-- <i class="iconfont" :class="el.icon" ></i> -->
						<v-icon :iconClass="el.i?el.icon1:el.icon"></v-icon>
						<span>{{el.name}}</span>
					</div>
				</div>
			</div>
			<div class="text-right">
				<router-view @refresh='rename' />
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getUserTemp,
		Cmessage
	} from '@/api/index'
	export default {
		data() {
			return {
				tab: [{
						name: '个人信息',
						to: 'pDet',
						i: true,
						icon:'icongerenxinxi',
						icon1:'icongerenxinxi1'
					},
					{
						name: '我的消息',
						to: 'info',
						i: false,
						icon:'iconwodexiaoxi',
						icon1:'iconwodexiaoxi1'
					},
					{
						name: '我的关注',
						to: 'fcoll',
						i: false,
						icon:'iconwodeguanzhu1',
						icon1:'iconwodeguanzhu'
					}, {
						name: '修改密码',
						to: 'root',
						i: false,
						icon:'iconxiugaimima1',
						icon1:'iconxiugaimima',
					}, {
						name: '我的订单',
						to: 'order',
						i: false,
						icon:'iconwodedingdan1',
						icon1:'iconwodedingdan'
					}, {
						name: '退出登录',
						i: false,
						icon:'icontuichudenglu1',
						icon1:'icontuichudenglu'
					}
				],
				name: '个人信息',
				userData: {},
				day: 0,
				state: '非会员',
				vipname: '开通会员',
				ishow: false
			}
		},
		methods: {
			upLoadFn(e) {
				this.userData.imageUrl = e.imgPath;
				let that = this;
				this.$http({
					method: 'post',
					url: '/userCenter/updateUserInfo',
					data: this.userData
				}).then(function(res) {
					if (res.data.code == 1) {
						that.$notify({
							title: '提示',
							message: '用户信息更新成功',
							offset: 100
						});

					}
				})
			},
			rename(val) {
				this.userData.nikeName = localStorage.getItem('Bname')
			},
			jump() {
				this.$router.push('/')
			},
			getUser() {
				let that = this;
				getUserTemp({}).then(res => {
					if (res.code == 1) {
						this.userData = res.data
						let gap = new Date(this.userData.expiredDate).getTime() - new Date().getTime()
						if (gap >= 0) {
							that.day = Math.ceil(gap / 3600 / 24 / 1000)
						} else {
							that.day = 1
						}
						//  this.day = Math.ceil(gap/3600/24/1000) >= 0 ? Math.ceil(gap/3600/24/1000) : 0;
						if (this.userData.roleName == '会员用户') {
							this.state = '会员'
							this.vipname = '会员续费'
						} else {
							this.state = '非会员'
							this.vipname = '开通会员'
							that.day = 0
						}

					}else if(res.code==401){
						this.$alert(res.msg).then(function(){
							that.$router.push('/logo')
						})
					}else{
						this.$alert(res.msg)
					}
				})
			},
			jumpto(el) {
				if (el.name == '退出登录') {
					sessionStorage.removeItem('xtoken')
					localStorage.removeItem('Bname')
					localStorage.removeItem('Xtoken')
					localStorage.removeItem('0658544ac523fca9ec78a5f607fdd7ee')
					this.$router.push('/')
				} else {
					this.name = el.name
					this.tab.forEach(li => {
						li.i = false
					})
					el.i = true
					this.$router.push({
						path: el.to
					})
				}
			},
			jumpapp() {
				this.$router.push('/buy')
			},
			amend() {
				this.tab.forEach(li => {
					li.i = false
				})
				this.tab[3].i = true;
				this.$router.push('/user/root')
			},
			gotoUser() {
				this.tab.forEach(li => {
					li.i = false
				})
				this.tab[0].i = true;
				this.$router.push('/user/pDet')
			},
			tocol() {
				this.tab.forEach(li => {
					li.i = false
				})
				this.tab[2].i = true;
				this.$router.push('/user/fcoll')

			},
			toinf() {
				this.tab.forEach(li => {
					li.i = false
				})
				this.tab[1].i = true;
				this.$router.push('/user/info')
			},
			order() {
				this.tab.forEach(li => {
					li.i = false
				})
				this.tab[4].i = true;
				this.$router.push('/user/order')
			},
			quit() {
				sessionStorage.removeItem('xtoken')
				localStorage.removeItem('Bname')
				localStorage.removeItem('Xtoken')
				localStorage.removeItem('valid')
				localStorage.removeItem('0658544ac523fca9ec78a5f607fdd7ee')
				this.$router.push('/')
			},
			isroot() {
				this.name = this.tab[this.$route.meta.i].name
				this.tab.forEach(li => {
					li.i = false
				})
				this.tab[this.$route.meta.i].i = true
			},
			gainCo() {
				Cmessage({}).then(res => {
					if (res.code == 1) {
						if (res.data >= 1) {
							this.ishow = true
						} else {
							this.ishow = false
						}

					}
				})
			}
		},
		watch: {
			$route: {
				handler: function(val, oldVal) {
					this.gainCo()
				},
				deep: true
			}
		},
		created() {
			this.isroot()
			this.getUser()
			this.gainCo()
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.user {
		width: 100%;
		background-color: #fff;
		.el-dropdown-link {
			color:#fff;
		}
		//  padding-top: 100px;
		.user-nav {
			width: 100%;
			height: 58px;
			background-color: #EB651B;
			.in-nav {
				width: 1020px;
				margin: 0 auto;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
		.user-new {
				width: 1020px;
				margin: 0 auto;
				line-height: 60px;
				font-size: 14px;
				color: #666;
				i {
					margin: 0 2px;
				}
		}

		.user-text {
			width: 1020px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
		
			.text-nav {
				.user-news {
					width: 280px;
					height: 366px;
					background-color: #FFEEE5;
					display: flex;
					align-items: center;
					flex-direction: column;
					// margin-bottom: 16px;
					padding-top: 21px;

					img {
						border-radius: 50%;
						width: 108px;
						height: 108px;
					}
				}

				.user-first {
					margin-top: 30px;
					margin-bottom: 25px;
					display: flex;
					align-items: center;
				}

				.user-line {
					background-color: #FFEEE5;
					padding-bottom: 25px;
					.division {
						width:224px;
						height:1px;
						background:rgba(221,223,228,1);
						margin: 0 auto;
					}
				}
				.user-name {
					max-width: 180px;
					font-size: 14px;
					font-weight: 500;
					margin-right: 14px;
					text-align: center;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.user-state {
					i {
						 font-size: 28px;
					}
					.have {
						color: #FE6603;
					}
					.noh {
						color: #ccc;
					} 
				}

				.user-day {
					width: 100%;
					font-size: 14px;
					color: #5A5A5A;
					text-align: center;
					box-sizing: border-box;
					margin-bottom: 60px;
				}
				.use-color {
					color: #46BF72;
				}
				.user-btn {
					width: 148px;
					height: 48px;
					border: 1px solid #FE6603;
					border-radius: 4px;
					text-align: center;
					line-height: 48px;
					font-size: 18px;
					color: #FE6603;
					font-weight: 400;
					background-color: #fff;
					cursor: pointer;
				}

				.user-tab {
					width: 280px;
					font-size: 18px;
					padding-bottom: 20px;
					margin-bottom: 387px;
				  background-color: #FFEEE5;
					.tab {
						width: 280px;
						height: 55px;
						line-height: 50px;
						text-align: center;
						font-weight: 500;
						background-color: #FFEEE5;
						position: relative;
						cursor: pointer;
						// i {
						// 	font-size: 22px;
						// 	margin-right: 20px;
						// }
						/deep/ .svg-icon{
							font-size: 22px;
							margin-right: 20px;
						}
					}

					.current {
						background-color: #FE6603;
						color: #fff;
					}
				}
			}

			.text-right {
				width: 100%;
				margin-left: 29px;
				margin-bottom: 150px;
			}
		}

		.user-name {
			position: relative;

			.user-info {
				position: absolute;
				right: -6px;
				top: -2px;
				border: 1px solid #fff;
				border-radius: 50%;
				width: 6px;
				height: 6px;
				background-color: #FF4343;
			}
		}
	}
</style>
