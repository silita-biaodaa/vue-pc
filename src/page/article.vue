<template>
	<v-maxw :type="'notice'">
		<div class="article" slot="left">
			<div style="height:126px;"></div>
			<div class="title" style="padding:32px 60px 0">
				<p class="font-18">
					{{articles.title}}
				</p>
				<div class="date">
					<span>{{articles.openDate}}</span>
					<span>浏览量：<i>{{clickCount}}</i></span>
					<span style="cursor: pointer;" @click="anchorJump">评论数：<i>{{allC}}</i></span>
					<!-- <div> -->
					<div class="attention" :class="iscollect ? 'collect' : ''" @click="gaincollect">
						<i class="el-icon-plus"></i>{{collect}}
					</div>
					<!-- </div> -->

				</div>
			</div>

			<div class="detail">
				<div class="area a-f">
					<span>
						项目地区：{{articles.projDq}}
					</span>
					<span class="m-d">
						评标办法：{{articles.pbMode ? articles.pbMode : '详见原文'}}
					</span>

				</div>
				<div class="a-t a-f">
					资质要求：{{articles.zzRank ? articles.zzRank : '详见原文' }}
				</div>
				<div class="font-18">
					符合资质要求企业：<a class="a-color" @click="breakto">{{relCompanySize ? relCompanySize + '家>' : 0 }}</a>
				</div>
			</div>

			<div class="conten">
				<div class="link">
					<span>原文</span>
					<span @click="text">访问原文出处>></span>
				</div>
				<div class="essay" v-html="articles.content">

				</div>
			</div>
			<!-- <div > -->
			<com-ment id="divId" :type="'zhaobiao'" ref="comment"></com-ment>
			<!-- </div> -->
		</div>
	</v-maxw>
</template>
<script>
	import {
		getJsonData,
		collectionNotice,
		nocollectionNotice
	} from '@/api/index'
	import maxWfixBox from '@/components/maxWfixBox'
	export default {
		data() {
			return {
				id: '',
				articles: {},
				clickCount: 0,
				relCompanySize: 0,
				source: '',
				iscollect: true,
				collect: '关注',
				skip: false,
				allC: 0,
				collType: '',
			}
		},
		methods: {
			gainDetail() {
				let dataParam = JSON.stringify({
					type: '1',
					source: this.source
				});
				getJsonData("/newnocite/nociteDetails/" + this.id, dataParam).then(res => {
					if (res.code == 1) {
						this.allC = res.data.commentCount
						this.articles = res.data
						this.clickCount = res.clickCount
						this.relCompanySize = res.relCompanySize
						this.iscollect = res.data.collected
						this.collType = res.data.type
						if (this.iscollect) {
							this.collect = '已关注'
						} else {
							this.collect = '关注'
						}
						if (localStorage.getItem('permissions') == null || localStorage.getItem('permissions') == '' || localStorage.getItem(
								'permissions').indexOf('bidFilter') == -1) {
							if (this.articles.zzRank) {
								this.articles.zzRank = this.articles.zzRank.replace(/特|一|二|三|四|五|甲|乙|丙|丁/g, '*')
							}
							if (this.articles.pbMode) {
								let xin = this.articles.pbMode.length
								this.articles.pbMode = '*'
								for (var i = 1; i < xin; i++) {
									this.articles.pbMode = this.articles.pbMode + '*'
								}
							}

						}
						this.toTop()
					}
				});
			},
			text() {
				window.open(this.articles.url, "_blank")
			},
			breakto() {
				if (!this.relCompanySize || this.relCompanySize == 0 || this.relCompanySize == '') {
					return
				} else {
					const {
						href
					} = this.$router.resolve({
						path: '/conform',
						query: {
							source: this.source,
							id: this.id
						}
					})
					window.open(href, '_blank', )
				}

			},
			gaincollect() {
				if (this.iscollect) {
					nocollectionNotice({
						noticeid: this.id,
						source: this.source
					}).then(res => {
						if (res.code = 1) {
							this.iscollect = false
							this.collect = '关注'
						}
					})
				} else {
					collectionNotice({
						noticeid: this.id,
						type: this.collType,
						source: this.source
					}).then(res => {
						if (res.code = 1) {
							this.iscollect = true
							this.collect = '已关注'
						}
					})
				}

			},
			toskip() {
				if (this.skip) {
					setTimeout(() => {
						document.getElementById("divId").scrollIntoView(true);
					}, 400);

				}
			},
			toTop() {
				if (!this.skip) {
					document.body.scrollTop = 0
					document.documentElement.scrollTop = 0
				}
			},
			anchorJump() {
				if (this.allC == 0) {
					return false
				}
				let h = this.$refs.comment.$el.offsetTop;
				document.documentElement.scrollTop = h - 108;
			}
		},
		mounted() {
			this.toskip()
			this.$nextTick(function() {

			})
		},
		created() {
			this.skip = this.$route.query.skip ? this.$route.query.skip : false;
			this.id = this.$route.query.id;
			this.source = this.$route.query.source;
			this.gainDetail()

		},
		components: {
			'v-maxw':maxWfixBox
		}
	}
</script>
<style lang="less" scoped>
	.article {
		.a-color {
			color: #EC7522;
			cursor: pointer;
		}
		.font-18{
			font-size: 18px;
			color: #333;
		}
		.title {
			background: #fff;
			padding-top: 27px;
			p {
				text-align: center;
				margin-bottom: 17px;
				//  height: 40px;
			}

			.date {
				//  margin-left: 275px;
				display: -webkit-box;
				/* OLD - iOS 6-, Safari 3.1-6 */
				display: -moz-box;
				/* OLD - Firefox 19- (buggy but mostly works) */
				display: -ms-flexbox;
				/* TWEENER - IE 10 */
				display: -webkit-flex;
				/* NEW - Chrome */
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-size: 12px;
				color: #999;
				i {
					color: #EC7522;
				}
				.attention {
					margin-left: 20px;
					width: 50px;
					line-height: 20px;
					border: 1px solid #FE6603;
					text-align: center;
					font-size: 14px;
					border-radius: 5px;
					color: #FE6603;
					cursor: pointer;
					i {
						font-size: 12px;
					}
				}

				.collect {
					color: #fff;
					background-color: #FE6603;

					i {
						color: #fff;
					}
				}
			}
		}

		.detail {
			background: #fff;
			box-sizing: border-box;
			height: 163px;
			margin-bottom:28px;
			padding: 15px 19px 0;

			.area {
				width: 100%;
				font-size: 18px;
				padding-bottom: 15px;
			}
			.a-t {
				padding-bottom: 20px;
				border-bottom: 1px solid #F2F2F2;
				margin-bottom: 20px;
			}

			.a-f {
				color: #999;
				font-size: 14px;
				font-weight: 550;
				display: flex;
				justify-content: space-between;
			}
		}

		.conten {
			background: #fff;
			padding: 0 20px;
			box-sizing: border-box;

			.link {
				height: 69px;
				line-height: 69px;
				font-size: 20px;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #F2F2F2;

				span:nth-child(2) {
					color: #EC7522;
					cursor: pointer;
				}
			}

			.essay {
				padding: 26px 0 80px;
				overflow: hidden;
			}
		}
	}
</style>
