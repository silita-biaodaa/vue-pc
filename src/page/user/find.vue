<template>
	<div class="logo find">
		<logo-Nav></logo-Nav>
		<div class="l-enter">
			<div class="e-title e-color">
				找回密码
			</div>
			<div class="l-error" v-show="error">
				提示：{{msg}}
			</div>
			<!-- <div class="l-error" v-show="erro" >
              提示：请确保两次密码一致
            </div> -->
			<div class="e-ipt ">
				<el-input v-model="mobile" placeholder="请输入您的手机号" autocomplete="new-password"></el-input>
			</div>
			<div class="e-ipt l-find">
				<el-input v-model="note" autocomplete="new-password" type='text' placeholder="短信验证码"></el-input>
				<div class="e-code" @click="gainCode" :class="Message == '获取验证码' ? '' : (Message == '重新发送' ? '' : 'e-co')">
					{{Message}}
				</div>
			</div>
			<div class="e-ipt">
				<el-input v-model="password" type="password" placeholder="请设置密码(不低于8位)" autocomplete="new-password"></el-input>
			</div>
			<div class="e-ipt">
				<el-input v-model="password1" type="password" placeholder="再次确认密码" autocomplete="new-password"></el-input>
			</div>
			<el-button class="e-btn" @click="register">确定</el-button>

			<div class="e-color e-mb" @click="jump">
				返回登录
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getVerifyCode,
		updatePwd
	} from '@/api/index'
	let sha1 = require("sha1");
	export default {
		data() {
			return {
				Message: '获取验证码',
				error: false,
				erro: false,
				mobile: '',
				note: '',
				password: '',
				password1: '',
				msg: '请重新输入正确手机号码格式和密码,短信验证码',
			}
		},
		methods: {
			jump() {
				this.$router.push('/logo')
			},
			register() {
				if (this.mobile.trim() == '') {
					this.msg = '请输入手机号'
					this.error = true
					return false
				}
				if (!(/^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\d{8}$/.test(this.mobile.trim()))) {
					this.msg = '请输入正确的手机号码'
					return this.error = true
				}
				if (this.note.trim() == '') {
					this.msg = '请输入验证码'
					this.error = true
					return false
				}
				if (this.password.trim() == '') {
					this.msg = '请输入密码'
					this.error = true
					return false
				}
				if (this.password1.trim() == '') {
					this.msg = '请确认密码'
					this.error = true
					return false
				}

				if (!(/[0-9A-Za-z]{8}$/.test(this.password))) {
					this.msg = '请设置不低于8位数的密码'
					return this.error = true

				} else if (this.password.trim() !== this.password1.trim()) {
					this.error = true
					return this.msg = '请确保两次密码一致'
				}
				updatePwd({
					loginPwd: sha1(this.password1.trim()),
					verifyCode: this.note.trim(),
					phoneNo: this.mobile.trim(),
					channel: '1003'
				}).then(res => {
					if (res.code == 1) {
						this.error = true
						this.msg = res.msg
						this.$router.push('/logo')
					} else if (res.code == 202) {
						this.error = true
						this.msg = '验证码失效或错误'
					} else {
						this.error = true
						this.msg = res.msg
					}
				})
			},
			gainCode() {
				if (this.mobile.trim() == '') {
					this.msg = '请输入手机号'
					this.error = true
					return false
				}
				if (!(/^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(147,145))\d{8}$/.test(this.mobile.trim()))) {
					this.error = true
					this.msg = '请输入正确的手机号'
					return false
				}
				if (!(this.Message == '获取验证码') && !(this.Message == '重新发送')) {
					return
				} else {
					getVerifyCode({
						type: 2,
						invitationPhone: this.mobile.trim()
					}).then(res => {
						if (res.code == 1) {

						} else {
							this.error = true
							this.msg = res.msg
						}
						this.Message = 60
						var myVar = setInterval(() => {
							if (this.Message == 0) {
								this.Message = '重新发送'
								return clearInterval(myVar);
							} else {
								this.Message = this.Message - 1
							}
						}, 1000)
					})

				}
			},
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.find {
		background-color: #FAFAFA;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		.l-enter {
			width: 350px;
			height: 436px;
			margin: 78px auto 200px;
			background-color: #fff;
			padding: 18px 25px 0;
			box-sizing: border-box;

			.e-color {
				color: #FE6603;
			}

			.e-mb {
				margin-top: 25px;
				font-size: 14px;
				cursor: pointer;
			}

			.e-title {
				font-size: 18px;
				font-weight: 500;
				text-align: center;
				margin-bottom: 25px;
			}

			.e-ipt {
				height: 42px;
				box-sizing: border-box;
				width: 100%;
				border: 1px solid #CFCFCF;
				display: flex;
				align-items: center;
				margin-bottom: 18px;

				.e-code {
					width: 40%;
					height: 30px;
					line-height: 30px;
					text-align: center;
					font-size: 14px;
					color: #FE6603;
					border-left: 1px solid #CFCFCF;
					cursor: pointer;
				}

				.e-co {
					color: #999;
				}
			}

			.e-btn {
				width: 100%;
				background-color: #FE6603;
				color: #fff;
			}
		}
	}
</style>
