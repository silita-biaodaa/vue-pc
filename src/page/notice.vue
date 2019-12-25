<template>
	<v-maxw :type="'notice'">
		<div class="notice"  slot="left">
			<div class="top-box">
				<div class="maxw">
					<v-bread :breadList="[{ title: '中标'},{title:'中标详情'}]"></v-bread>
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
						<div class="attention drc cp" :class="iscollect ? 'collect' : ''" @click="gaincollect">
							<i class="el-icon-plus"></i>{{collect}}
						</div>
					</div>
					<div class="term dfrcb pb20 fs18">
						<span>
							<template v-if="articles.oneName">
								<v-comjump :type="1" :name="articles.oneName"></v-comjump>
							</template>
							<template v-else>第一候选人：详见原文</template>
						</span>
						<span>
							中标金额：{{articles.oneOffer ? articles.oneOffer +'万元': '详见原文'}}
						</span>
					</div>
				</div>
			</div>
			<div class="main">
				<div class="maxw">
					<div class="link bor-b dfrb mb20" ref="position">
						<span class="fs18 fw600">原文</span>
						<span class="color-449 txt-un cp fs14" @click="text">访问原文出处>></span>
					</div>
					<div class="essay bor-b pb20" v-html="articles.content"></div>
					<com-ment id="divId" :type="'zhaobiao'" ref="comment"></com-ment>
				</div>
				<!-- 相关公告 -->
				<happy-scroll resize hide-vertical  v-if="list.length>0">
					<div class="positionBox">
						<h6 class="fs18 mb10">相关公告({{list.length}})</h6>
						<dl>
							<dd v-for="(o,i) in list" :key="i" @click="jumpNotice(o)" class="pt20 pb20" :class="{'bor-b':i!=list.length-1}">
								<p class="cp">{{i+1}}、{{o.title}}</p>
							</dd>
						</dl>
					</div>
				</happy-scroll>
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
				id: '2003264',
				clickCount: 0,
				articles: [],
				source: 'hunan',
				collect: '关注',
				iscollect: false,
				allC: 0,
				collType: '',
				list:[]
			}
		},
		methods: {
			gainDetail() {
				let dataParam = JSON.stringify({
					type: '2',
					source: this.source
				});
				getJsonData("/newnocite/nociteDetails/" + this.id, dataParam).then(res => {
					if (res.code == 1) {
						this.allC = res.data.commentCount
						this.articles = res.data
						this.clickCount = res.clickCount
						this.iscollect = res.data.collected
						this.collType = res.data.type
						if (this.iscollect) {
							this.collect = '已关注'
						} else {
							this.collect = '关注'
						}
						if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
							if (this.articles.oneName) {
								if (this.articles.oneName.indexOf('公司') == -1) {
									this.articles.oneName = '***********'
								} else {
									this.articles.oneName = '***********' + '公司'
								}
							}
							if (this.articles.oneOffer) {
								let mm = this.articles.oneOffer.length
								this.articles.oneOffer = '*'
								for (var i = 1; i < mm; i++) {
									this.articles.oneOffer = this.articles.oneOffer + '*'
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
		mounted() {
			this.toskip()
		},
		components: {
			'v-maxw':maxWfixBox
		}
	}
</script>
<style lang="less" scoped>
	.notice {
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
						}
					}
					.collect{
						background: #EB651B;
						color: #fff
					}
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
			/deep/ .happy-scroll{
				position: absolute;
				top: 20px;
				left: 790px;
				width: 230px;
			}
			.positionBox{
				width: 230px;
			}
		}
	}
</style>
