<template>
	<div class="reply">
		<div class="info-pop" v-show="pop">
			{{msg}}
		</div>
		<!-- 判断是否加载中 -->
		<template v-if="isajax">
			<!-- 有数据 -->
			<template v-if="textList&&textList.length>0">
				<div v-for="(el,i) in textList" :key="i" class="re-bor" @click="jumA(el)" :class="textList.length == i +1 ? 'no-bor' :  ''" >

					<!-- 评论 -->
					<template v-if="el.msgType=='reply'">
						<div class=" all-text">
							<div class="re-title">
								<p :title="el.noticeTitle">{{el.relatedType == 'zhongbiao' ? '中标公告：' : '招标公告：'}}{{el.noticeTitle}}</p>
							</div>
							<div class="re-new" v-if="current == 1 && i == 0">
								<span>最新回答</span>
								<div class="triangle">
								</div>
							</div>
							<div style="padding:10px 0">
								<div class="re-list">
									<div class="list-cli">
										<div class="list-true" v-show="!el.textShow"></div>
										<img src="../../assets/img/icon-dui.png" alt="" v-show="el.textShow">
									</div>
									<div class='list-img'>
										<img :src="el.reImage != null ? el.reImage : avatar" alt="">
										<div class="no-read" v-if="el.isRead == 0"></div>
									</div>
									<div class="list-text">
										<p><span class="clor-3">{{el.reNikename}}</span><span v-if="el.reCompany">（{{el.reCompany}}）</span>回复了<span
											 class="clor-3">你</span>：</p>
										<div style="margin: 5px 0;" v-html="el.replyContent"></div>
										<p>{{el.pushd}}</p>
									</div>
								</div>
							</div>
						</div>
					</template>
					<!-- 企业更新 -->
					<template v-else-if="el.msgType=='company'">
						<div class="msg-company-box">
							<div class="msg-tit">
								<p>{{el.msgTitle}}</p>
								<p>{{el.pushd}}</p>
							</div>
							<div class="msg-con">
								<div class="list-cli">
									<div class="list-true" v-if="!el.textShow"></div>
									<img src="../../assets/img/icon-dui.png" alt="" v-else>
								</div>
								<div>
									<div class="no-read" v-if="el.isRead == 0"></div>
									{{el.msgContent}}
								</div>
							</div>
							<div class="msg-btn">
								<button class="right" @click="jumpCom(el)">查看详情 ></button>
							</div>
						</div>
					</template>
					<!-- 会员到期 -->
					<template v-else-if="el.msgType=='vip'">
						<div class="msg-company-box">
							<div class="msg-tit">
								<p>{{el.msgTitle}}</p>
								<p>{{el.pushd}}</p>
							</div>
							<div class="msg-con">
								<div class="list-cli">
									<div class="list-true" v-if="!el.textShow"></div>
									<img src="../../assets/img/icon-dui.png" alt="" v-else>
								</div>
								<div>
									<div class="no-read" v-if="el.isRead == 0"></div>
									{{el.msgContent}}
								</div>
							</div>
						</div>
					</template>
					<!-- 其他 -->
					<template v-else>
						<div class="msg-company-box">
							<div class="msg-tit">
								<p>{{el.msgTitle}}</p>
								<p>{{el.pushd}}</p>
							</div>
							<div class="msg-con">
								<div class="list-cli">
									<div class="list-true" v-if="!el.textShow"></div>
									<img src="../../assets/img/icon-dui.png" alt="" v-else>
								</div>
								<div>
									<div class="no-read" v-if="el.isRead == 0"></div>
									{{el.msgContent}}
								</div>
							</div>
							<!-- <div class="msg-btn">
								<button class="right">查看详情 ></button>
							</div> -->
						</div>
					</template>
				</div>
				<div class="page" v-if="total>10">
					<nav-page :all='total' :currents='pageNo' :pageSize='pageSize' @skip='Goto'></nav-page>
				</div>
			</template>
			<!-- 无数据  -->
			<template v-else-if="textList&&textList.length==0">
				<div class="no-toast">
					<img src="../../assets/img/bank_card @2x.png" alt="">
					<span>暂未收到消息通知</span>
				</div>
			</template>
			<!-- 加载失败 -->
			<template v-else-if="!textList">
				<div class="ajax-erroe">
					<img src="../../assets/img/pic-zoudiu.png" />
					<span @click="recoldFn">刷新</span>
				</div>
			</template>
		</template>
		<template v-else>
			<div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
		</template>
	</div>
</template>
<script>
	import {
		message,
		Dmessage,
		commentP,
		Rmessage
	} from "@/api/index";
	export default {
		data() {
			return {
				msg: '',
				pop: false,
				textList: [],
				total: 0,
				pageSize: 10,
				loading: true,
				isajax: false,
				noList: false,
				allArr: [],
				allChe: true,
				avatar: require('../../assets/img/pic-toux.png@2x.png'),
			}
		},
		inject: ['reload'],
		methods: {
			//刷新
			recoldFn() {
				this.reload();
			},
			jumA(el) {
				el.textShow = !el.textShow
				if (el.textShow) {
					this.allArr.push(el.pkid)
				} else {
					if (this.allArr.indexOf(el.pkid) != -1) {
						this.allArr.splice(this.allArr.indexOf(el.pkid), 1)
					}
				}
			},
			Goto(val) {
				this.pageNo = val.cur
				this.isajax = false;
				this.allArr = []
				this.allChe = true
				this.funcom.toList(0)
				this.gaiaList()
				this.$emit('page', {
					state: val.cur
				})
			},
			gaiaList() {
				let that = this;
				message({
					pageNum: this.pageNo,
					pageSize: 10
				}).then(res => {
					this.isajax = true;
					if (res.code == 1) {
						res.data.forEach(el => {
							el.textShow = false
							if (el.msgType == 'reply') {
								el.replyContent = el.replyContent.replace(/\n/g, '<br/>');
							}
						})
						this.total = res.total
						this.textList = res.data
						if (this.textList.length == 0) {
							this.noList = true
						} else {
							this.noList = false
						}
						this.$emit('hide', {
							state: !this.noList
						})
					}

				}).catch(function(res) {
					that.isajax = true;
					that.textList = null;
				})
			},
			//跳转至会员服务
			jumpVip() {
				const {
					href
				} = this.$router.resolve({
					path: '/buy'
				})
				window.open(href, '_blank')
			},
			//跳转至公司详情
			jumpCom(el) {
				const {
					href
				} = this.$router.resolve({
					path: '/introduce',
					query: {
						id: el.replyId,
						name: el.comName
					}
				})
				window.open(href, '_blank', )
			}
		},
		created() {
			this.pageNo = this.current
			this.gaiaList()
		},
		props: {
			current: 0,
			alles: {
				type: Number,
				default: 1,
			},
			allre: {
				type: Number,
				default: 1,
			},
			allde: {
				type: Number,
				default: 1,
			}
		},
		watch: {
			allde(val) {
				if (this.allArr.length == 0) {
					return
				} else {
					let str = this.allArr.join(',')
					Dmessage({
						ids: str
					}).then(res => {
						if (res.code == 1) {
							this.msg = '删除成功'
							this.pop = true
							this.allArr = []
							this.allChe = true
							this.gaiaList()
							setTimeout(() => {
								this.pop = false
							}, 1500);
						}
					})
				}
			},
			allre(val) {
				if (this.allArr.length == 0) {
					return
				} else {
					let str = this.allArr.join(',')
					Rmessage({
						pkid: str
					}).then(res => {
						if (res.code == 1) {
							this.msg = '设置成功'
							this.pop = true
							this.textList.forEach(el => {
								if (this.allArr.indexOf(el.pkid) >= 0) {
									el.isRead = 1
								}
							})
							// this.$router.replace({
							//    path: '/user/info',
							//    query: {
							//      t: Date.now()
							//    }
							//   })
							setTimeout(() => {
								this.pop = false
							}, 1500);
						}
					})
				}
			},
			current(val) {
				this.pageNo = val
			},
			alles(val) {
				if (val == 1) {
					return
				} else {
					if (this.allChe) {
						this.allArr = []
						this.textList.forEach(el => {
							el.textShow = true
							if (this.allArr.indexOf(el.pkid) == -1) {
								this.allArr.push(el.pkid)
							}
						})
						this.allChe = false
					} else {
						this.allChe = true
						this.allArr = []
						this.textList.forEach(el => {
							el.textShow = false
						})
					}

				}

			}
		},
		components: {}
	}
</script>
<style lang="less">
	.reply {
		.list-cli {
			display: flex;
			align-items: center;
			margin-right: 14px;

			.list-true {
				width: 15px;
				height: 15px;
				border: 1px solid #999;
				border-radius: 50%;
			}

			img {
				width: 17px;
				height: 17px;
			}
		}
	}
	.msg-con {
		display: flex;
		align-items: center;

		div:last-child {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
