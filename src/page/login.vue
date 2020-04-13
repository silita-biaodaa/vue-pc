<template>
	<div class="logo">
        <header class="dfrb">
            <div class="img-box cp" @click="$router.push('/')"><img src="../assets/img/logo.png"/></div>
            <div class="drc">
                <span class="btn mr20 fs14 cp"  @click="tabNum=1">登录</span>
                <span class="btn fs14 cp"  @click="tabNum=2">注册</span>
            </div>
        </header>
        <div class="main">
            <div class="box">
                <!-- 登录 -->
                <template v-if="tabNum==1">
                    <from @keydown.13="login">
                        <h4 class="mb20 color-150 fs18">登录</h4>
                        <div class="ipt-box mb20">
                            <h5 class="mb10 color-150 fs14 fw500">账号</h5>
                            <el-input v-model="dldata.mobile" placeholder="请输入您的手机号"></el-input>
                        </div>
                        <div class="ipt-box mb10">
                            <h5 class="mb10 color-150 fs14 fw500">登陆密码</h5>
                            <el-input v-model="dldata.password" type="password" placeholder="请输入登录密码"></el-input>
                        </div>
                        <div class="dfrb mb40">
                            <div>
                                <el-checkbox v-model="dldata.checked" class="fs14">15天免登录</el-checkbox>
                            </div>
                            <span class="color-449 txt-un fs14 cp" @click="tabNum=3">忘记密码? </span>
                        </div>
                        <template v-if="!dldata.loading">
                            <div class="btn mb20 fs18 cp" @click="login">登录</div>
                        </template>
                        <template v-else>
                            <div class="btn mb20 fs18 cp ban">正在登录...</div>
                        </template>
                        <img src="../assets/img/wx.png" class="wximg cp" @click="towechat"/>
                        <p class="fs14">
                            没有账号？<span class="color-449 txt-un cp" @click="tabNum=2">马上注册</span>
                        </p>
                    </from>
                    
                </template>
                <!-- 注册 -->
                <template v-else-if="tabNum==2">
                    <h4 class="mb20 color-150 fs18">用户注册</h4>
                    <div class="ipt-box mb20">
                        <h5 class="mb10 color-150 fs14 fw500">手机号</h5>
                        <el-input v-model="zcdata.mobile" placeholder="请输入您的手机号" autocomplete="new-password"></el-input>
                    </div>
                    <div class="ipt-box mb20">
                        <h5 class="mb10 color-150 fs14 fw500">验证码</h5>
                        <div class="code-box dfrb">
                            <input type="text" v-model="zcdata.note" placeholder="短信验证码" autocomplete="new-password"/>
                            <!-- <el-input v-model="zcdata.note" placeholder="短信验证码" autocomplete="off"></el-input> -->
                            <div class="color-449 txt-un cp" :class="(zcdata.codeTxt!='获取验证码'&&zcdata.codeTxt!='重新发送')?'notap':''" @click="getCode(zcdata,1)">{{zcdata.codeTxt}}</div>
                        </div>
                    </div>
                    <div class="ipt-box mb10">
                        <h5 class="mb10 color-150 fs14 fw500">密码</h5>
                        <el-input v-model="zcdata.password" type="password" placeholder="请设置密码（不低于8位）" autocomplete="new-password"></el-input>
                    </div>
                    <div class="mb40">
                        <div>
                            <el-checkbox v-model="zcdata.checked" class="fs14">我已仔细阅读并接受<span class="color-449 txt-un fs14 cp" @click.stop.self="openNewLink('/protocol')">《标大大用户协议》</span></el-checkbox>
                        </div>
                    </div>
                    <template v-if="!zcdata.loading">
                        <div class="btn mb20 fs18 cp" @click="register">立即注册</div>
                    </template>
                    <template v-else>
                        <div class="btn mb20 fs18 cp ban">注册中...</div>
                    </template>
                    <p class="fs14">
                        已有账号？<span class="color-449 txt-un cp" @click="tabNum=1">返回登录</span>
                    </p>
                </template>
                <!-- 找回密码 -->
                <template v-else-if="tabNum==3">
                    <h4 class="mb20 color-150 fs18">找回密码</h4>
                    <div class="ipt-box mb20">
                        <h5 class="mb10 color-150 fs14 fw500">手机号</h5>
                        <el-input v-model="zhmmdata.mobile" placeholder="请输入您的手机号" autocomplete="new-password"></el-input>
                    </div>
                    <div class="ipt-box mb20">
                        <h5 class="mb10 color-150 fs14 fw500">验证码</h5>
                        <div class="code-box dfrb">
                            <input type="text" v-model="zhmmdata.note" placeholder="短信验证码" autocomplete="new-password"/>
                            <!-- <el-input v-model="zcdata.note" placeholder="短信验证码" autocomplete="off"></el-input> -->
                            <div class="color-449 txt-un cp" :class="(zhmmdata.codeTxt!='获取验证码'&&zhmmdata.codeTxt!='重新发送')?'notap':''" @click="getCode(zhmmdata,2)">{{zhmmdata.codeTxt}}</div>
                        </div>
                    </div>
                    <div class="ipt-box mb40">
                        <h5 class="mb10 color-150 fs14 fw500">密码</h5>
                        <el-input class="mb10" v-model="zhmmdata.password" type="password" placeholder="请设置密码（不低于8位）" autocomplete="new-password"></el-input>
                        <el-input v-model="zhmmdata.password1" type="password" placeholder="再次确认密码" autocomplete="new-password"></el-input>
                    </div>
                    <div class="btn mb20 fs18 cp" @click="retrievePwd" :class="zhmmdata.loading?'ban':''">确定</div>
                    <div class="color-449 fs14 goback cp" @click="tabNum=1">
                        <i class="iconfont iconjiantou"></i>
                        <span class="txt-un">返回登录</span>
                    </div>
                </template>
            </div>
            <div class="bottom">© 2017 思利他, Inc. All rights reserved . 湘ICP备17019911号-1</div>
        </div>
	</div>
</template>
<script>
	import {
        authorize,
        getVerifyCode,
        memberRegister,
        updatePwd
	} from '@/api/index'
	let sha1 = require("sha1");
	export default {
		data() {
			return {
                tabNum:1,//1登录,2注册,3找回密码
                t:null,
                dldata:{
                    mobile:'',
                    password:'',
                    checked:false,
                    loading:false,
                },
                zcdata:{
                    loading:false,
                    mobile:'',
                    password:'',
                    checked:false,
                    note:"",
                    codeTxt:'获取验证码'
                },
                zhmmdata:{
                    loading:false,
                    mobile:'',
                    password:'',
                    password1:'',
                    note:"",
                    codeTxt:'获取验证码'
                }

			}
		},
		methods: {
            phoneFn(phone){
                if(phone.trim() == '') {
                    this.$notify.info({
                        title: '消息',
                        message: '请输入手机号'
                    });
                    return false
                }
                if(this.funcom.textIP(phone.trim())) {
                    this.$notify.info({
                        title: '消息',
                        message: '请输入正确的手机号'
                    });
                    return false
                }
                return true
            },
            /**微信登录 */
			towechat() {
				let appid = 'wxcfaea301018d9721';
				let url = encodeURIComponent('http://www.biaodaa.com/#/');
				let uri = this.weixinauth(appid, url);
				window.open(uri)
			},
			weixinauth(appid, url) {
				let str = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + url +
					'&response_type=code&scope=snsapi_login&state=biaodaaPC#wechat_redirect'
				return str
            },
            /**微信登录 end*/
            /*登录*/
            login() {
                if(!this.phoneFn(this.dldata.mobile)){
                    return false
                }
				if (this.dldata.password.trim() == '') {
                    this.$notify.info({
                        title: '消息',
                        message: '请输入密码'
                    });
                    return
				}
				this.dldata.loading = true;
				let that = this;
				authorize({
					phoneNo: this.dldata.mobile.trim(),
					loginPwd: sha1(this.dldata.password.trim()),
					channel: '1003',
					clientVersion: '3.0'
				}).then(res => {
					this.dldata.loading = false;
					if (res.code == 1) {
						that.$http({
							method:'post',
							url:'/foundation/version',
							data:{
								loginChannel:'1003'
							}
						}).then();
						let name = res.data.nikeName ? res.data.nikeName : res.data.phoneNo
						sessionStorage.setItem('ip', res.data.pkid)
						localStorage.setItem('phoneNo', res.data.phoneNo)
						localStorage.setItem('0658544ac523fca9ec78a5f607fdd7ee', res.data.isVip)
						localStorage.setItem('isFirst', res.data.isFirst)
						localStorage.setItem('Bname', name)
						if (this.dldata.checked) {
							localStorage.setItem('Xtoken', res.data.xtoken)
							let time = new Date().getTime()
							localStorage.setItem('valid', time)
							sessionStorage.removeItem('xtoken')
						} else {
							sessionStorage.setItem('xtoken', res.data.xtoken)
							localStorage.removeItem('Xtoken')
						}
						if (sessionStorage.getItem('path') && sessionStorage.getItem('path') != null && sessionStorage.getItem('path') !=
							'null' && sessionStorage.getItem('path') != '/protocol') {
							let uri = sessionStorage.getItem('path');
							this.$router.replace(uri)
						} else {
							this.$router.replace('home')
						}

					} else {
                        this.$notify.info({
                            title: '消息',
                            message:res.msg
                        });
					}
				}).catch(req => {
					that.dldata.loading = false;
					that.$alert('您的网络不稳定，请重新登录');
                })
            },
            /*注册*/
            register(){
                if(!this.phoneFn(this.zcdata.mobile)){
                    return false
                }
                if(this.zcdata.note.trim() == '') {
                    this.$notify.info({
                        title: '消息',
                        message: '请输入验证码'
                    });
                    return
                }
                if(this.zcdata.password.trim()==''){
                    this.$notify.info({
                        title: '消息',
                        message: '请输入密码'
                    });
                    return
                }
                if(!(/[0-9A-Za-z]{8}$/.test(this.zcdata.password)))  {
                    this.$notify.info({
                        title: '消息',
                        message: '请设置不低于8位数的密码'
                    });
                    return
                }
                if(this.zcdata.checked) {
                    this.zcdata.loading = true;
                    memberRegister({verifyCode:this.zcdata.note.trim(),phoneNo:this.zcdata.mobile.trim(),channel:'1003',clientVersion:'3.0',loginPwd:sha1(this.zcdata.password.trim())}).then( res => {
                        this.zcdata.loading = false;
                        if(res.code == 1) {
                            this.$notify({
                                title: '成功',
                                message: '注册成功',
                                type: 'success'
                            });
                            let token = res.data.xtoken
                            let name = res.data.nikeName
                            let time = new Date().getTime()
                            localStorage.setItem('valid',time)
                            localStorage.setItem('Bname',name)
                            localStorage.setItem('Xtoken',token)
                            localStorage.setItem('isFirst',res.data.isFirst)
                            this.$router.push('/')
                        } else if( res.code == 202) {
                            this.$notify.info({
                                title: '消息',
                                message: '验证码失效或错误'
                            });
                        } else {
                            this.$notify.info({
                                title: '消息',
                                message: res.msg
                            });
                        }
                    })
                } else {
                    if(!this.zcdata.checked) {
                        this.$notify.info({
                            title: '消息',
                            message: '请查阅并同意用户协议'
                        });
                    }  
                }
            },
            /*获取验证码*/
            getCode(d,type){
                if(!this.phoneFn(d.mobile)){
                    return false
                }
                if(d.codeTxt=='获取验证码'||d.codeTxt=='重新发送'){
                    getVerifyCode({type:type,invitationPhone:d.mobile.trim()}).then( res => {
                        if(res.code == 1) {
                            this.$notify({
                                title: '成功',
                                message: '短信已发送，请查收',
                                type: 'success'
                            });
                            d.codeTxt=60;
                            this.t = setInterval(() =>{
                                if(d.codeTxt == 0) {
                                    d.codeTxt = '重新发送'
                                    return clearInterval(this.t);
                                } else {
                                    d.codeTxt --
                                }
                            },1000 )
                        } else {
                            this.$notify.info({
                                title: '消息',
                                message: res.msg
                            });
                        }
                    })
                }
            },
            /**找回密码 */
            retrievePwd(){
                if(!this.phoneFn(this.zhmmdata.mobile)){
                    return false
                }
                if(this.zhmmdata.note.trim() == '') {
                    this.$notify.info({
                        title: '消息',
                        message: '请输入验证码'
                    });
                    return
                }
                if(this.zhmmdata.password.trim()==''){
                    this.$notify.info({
                        title: '消息',
                        message: '请输入密码'
                    });
                    return
                }
                if (this.zhmmdata.password1.trim() == '') {
                    this.$notify.info({
                        title: '消息',
                        message: '请确认密码'
                    });
					return
				}
                if(!(/[0-9A-Za-z]{8}$/.test(this.zhmmdata.password)))  {
                    this.$notify.info({
                        title: '消息',
                        message: '请设置不低于8位数的密码'
                    });
                    return
                }else if (this.zhmmdata.password.trim() !== this.zhmmdata.password1.trim()) {
					this.$notify.info({
                        title: '消息',
                        message: '请确保两次密码一致'
                    });
					return
                }
                this.zhmmdata.loading = true;
                updatePwd({
					loginPwd: sha1(this.zhmmdata.password1.trim()),
					verifyCode: this.zhmmdata.note.trim(),
					phoneNo: this.zhmmdata.mobile.trim(),
					channel: '1003'
				}).then(res => {
                    this.zhmmdata.loading = false;
					if (res.code == 1) {
                        this.$notify({
                            title: '成功',
                            message:res.msg,
                            type: 'success'
                        });
						this.tabNum=1;
					} else if (res.code == 202) {
                        this.$notify.info({
                            title: '消息',
                            message: '验证码失效或错误'
                        });
					} else {
						this.$notify.info({
                            title: '消息',
                            message: res.msg
                        });
					}
				})
            }
		},
		created() {
            if(this.$route.query.type){
                this.tabNum=this.$route.query.type;
            }
        },
        beforeDestroy(){
            clearInterval(this.t);    
        },
		mounted() {
		}
	}
</script>
<style lang="less" scoped>
@color: #EB651B;
@borderColor:#DDDFE4;
.logo{
    .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color: @color;
        border-color: @color;
    }
    header{
        width: 1020px;
        margin: 0 auto;
        height: 64px;
        .img-box{
            width: 141px;
            display: flex;
            align-items: center;
            img{
                width:100%;
            }
        }
        .btn{
            width: 66px;
            height: 26px;
            display: inline-block;
            border: 1px solid @color;
            background: #fff;
            line-height: 26px;
            text-align: center;
            color: @color;
        }
        .btn:first-child{
            background: @color;
            color: #fff;
        }
    }
    .main{
        height: calc(100vh - 64px);
        background: url("../assets/img/bg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        .box{
            position: absolute;
            width: 400px;
            height: 565px;
            background: rgba(255,255,255,.9);
            transform: translate(-50%,-50%);
            left: 50%;
            top: 50%;
            padding: 30px;
            box-sizing: border-box;
            /deep/ .el-input__inner{
                height: 48px;
                padding: 0 20px;
            }
            /deep/ .el-checkbox__label{
                color: #666
            }
            .btn{
                background: #150000;
                color: #fff;
                border-radius: 4px;
                line-height: 48px;
                text-align: center;
            }
            .ban{
				cursor: wait;
				opacity: .8;
            }
            .code-box{
                position: relative;
                border-radius: 4px;
                background: #fff;
                border: 1px solid @borderColor;
                height:48px;
                padding: 0 20px;
                ::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
                    color: #c0c4cc;
                    font-size: 14px;
                }
                ::-moz-placeholder { /* Firefox 19+ */  
                    color: #c0c4cc;
                    font-size: 14px;
                }
                :-ms-input-placeholder { /* IE 10+ */ 
                    color: #c0c4cc;
                    font-size: 14px;
                }
                :-moz-placeholder { /* Firefox 18- */ 
                    color: #c0c4cc;
                    font-size: 14px;
                }
                input{
                    color: #606266;
                    font-size: 14px;
                }
                .txt-un{
                    line-height: 48px;
                    width: 80px;
                    text-align: center;
                }
                .notap{
                    color: #666;
                    text-decoration:none;
                }
            }
            .code-box::after{
                content: '';
                position: absolute;
                width: 1px;
                height: 31px;
                background: @borderColor;
                top: 9px;
                right: 117px;
            }
            .wximg{
                display: block;
                margin: 0 auto 20px;
                width: 36px;
            }
            p{
                color: #666;
                text-align: center;
            }
            .goback{
                .iconfont{
                    font-size: 12px;
                    transform: rotateY(180deg);
                    display: inline-block;
                }
            }
        }
        .bottom{
            position: absolute;
            bottom: 22px;
            font-size: 14px;
            color: #fff;
            transform: translateX(-50%);
            left: 50%;
        }
    }
}
@media screen and (max-width:1919px){
    .logo{
        .main{
            min-height: calc(100vh - 58px);
            height: 100%;
            padding-top: 100px;
            padding-bottom: 22px;
            box-sizing: border-box;
            .box{
                position: static;
                transform: translateX(0);
                margin:0 auto 135px;
            }
            .bottom{
                position: static;
                transform: translateX(0);
                text-align: center
            }
        }
    }
}
</style>
