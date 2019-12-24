<template>
	<v-maxw :type="'notice'">
		<div class="article" slot="left">
			<div class="top-box">
				<div class="maxw">
					<v-bread :breadList="[{ title: '招标'},{title:'招标详情'}]"></v-bread>
					<h3 class="mb10">{{articles.title}}</h3>
					<div class="dfrcb information-box mb20">
						<div class="drc">
							<i class="iconfont iconshijian"></i>
							<span>发布时间：{{articles.openDate}}</span>
						</div>
						<div class="drc">
							<i class="iconfont iconliulan"></i>
							<span>浏览数量：{{clickCount}}</span>
						</div>
						<div @click="anchorJump" class="drc">
							<i class="iconfont iconpinglun"></i>
							<span>评论数量：{{allC}}</span>
						</div>
						<div class="attention drc" :class="iscollect ? 'collect' : ''" @click="gaincollect">
							<i class="el-icon-plus"></i>{{collect}}
						</div>
					</div>
					<div class="term dfrcb">
						<span>
							项目地区：{{articles.projDq}}
						</span>
						<span>
							评标办法：{{articles.pbMode ? articles.pbMode : '详见原文'}}
						</span>
					</div>
					<div class="term">资质要求：{{articles.zzRank ? articles.zzRank : '详见原文' }}</div>
					<div class="fs18 bor-t">符合资质要求企业：<a class="color-eb6" @click="breakto">{{relCompanySize ? relCompanySize + '家 >' : 0 }}</a></div>
				</div>
			</div>
			<div class="main">
				<div class="maxw">
					<div class="link bor-b dfrb mb20">
						<span class="fs18 fw600">原文</span>
						<span class="color-449 txt-un cp fs14" @click="text">访问原文出处>></span>
					</div>
					<div class="essay bor-b pb20" v-html="articles.content"></div>
					<com-ment id="divId" :type="'zhaobiao'" ref="comment"></com-ment>
				</div>
				<!-- 相关公告 -->
				<div class="positionBox" v-if="list.length>0">
					<h6 class="fs18 mb10">相关公告({{list.length}})</h6>
					<dl>
						<dd v-for="(o,i) in list" :key="i" @click="jumpNotice(o)" class="pt20 pb20" :class="{'bor-b':i!=list.length-1}">
							<p class="cp">{{i+1}}、{{o.title}}</p>
						</dd>
					</dl>
				</div>
			</div>
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
				list:[]
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
						if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
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
			},
			jumpNotice(o){//跳到公告详情
				let path='/notice'
				if(o.type==1){
					path='/article'
				}
				const {
					href
				} = this.$router.resolve({
					path: path,
					query: {
						id: o.id,
						source: o.source
					}
				})
				window.open(href, '_blank')
			},
		},
		mounted() {
			this.toskip()
			this.$nextTick(function() {

			})
		},
		created() {
			let that=this;
			this.skip = this.$route.query.skip ? this.$route.query.skip : false;
			this.id = this.$route.query.id;
			this.source = this.$route.query.source;
			/*相关公告*/
			this.$http({
                method:'post',
                url:'/newnocite/correlation/list',
                data:{
                    source:this.$route.query.source,
                    ntId:this.$route.query.id,
                }
            }).then(res =>{
                if(res.data.code==1){
                    that.list=res.data.data
                }
            })
			this.gainDetail()

		},
		components: {
			'v-maxw':maxWfixBox
		}
	}
</script>
<style lang="less" scoped>
	.article {
		.top-box{
			background: #F3F5F9;
			.maxw{
				width: 1020px;
				margin: 0 auto;
				h3{
					font-size: 28px;
				}
				.information-box{
					color: #666;
					.iconfont{
						font-size: 14px;
						margin-right: 6px;
					}
					span{
						font-size: 14px;
					}
					/*关注按钮*/
					.attention{
						padding: 0 7px;
						line-height: 18px;
						border: 1px solid #EB651B;
						color: #EB651B;
						border-radius: 4px;
						font-size: 14px;
						text-align: center;
						.el-icon-plus{
							transform: scale(0.8);
							font-size: 12px;
							margin-left: 6px;
						}
					}
					.collect{
						background: #EB651B;
						color: #fff
					}
				}
				
				.term{
					margin-bottom: 10px;
					font-size: 18px;
				}
				//符合二要求企业
				.fs18{
					line-height: 54px;
				}
			}
		}
		.main{
			width: 1020px;
			margin: 0 auto;
			position: relative;
			.link{
				line-height: 65px;
			}
			.positionBox{
				position: absolute;
				top: 20px;
				left: 790px;
			}
		}
	}
</style>
