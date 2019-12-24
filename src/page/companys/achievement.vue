<template>
	<div class="achievement" v-loading="loading" element-loading-text="拼命加载中" @keyup.enter="searchBid">
		<div class="e-nav">
			<span class="e-wei">
				中标公告({{total}})
			</span>
			<div>
				<el-input placeholder="请输入关键字搜索" prefix-icon="el-icon-search" @change="searchBid" v-model="search">
				</el-input>
			</div>
		</div>
		<dl class="bid-content">
			<dd v-for="(el,i ) of bidList" :key="'3'+i" @click='jump(el)' v-show="!result">
				<div class="dfrcb mb10">
					<div class="dfrcb">
						<span class="fs18 mr20 fw600" style="min-width:20px">{{(current-1)*20+(i+1)}}</span>
						<span class="fs18 fw600 text-over" :title='el.title' style="max-width:574px;display: inline-block;">{{el.title}}</span>
					</div>
					<div class="fs14">
						{{el.openDate}}
					</div>
				</div>
				<div class="dfrcb" style="color:#666;padding-left:40px">
					<p class="fs14" :title='el.oneName'>
						第一候选人:{{el.oneName ? el.oneName : '详见原文' }}
					</p>
					<p class="fs14">
						中标金额:{{el.oneOffer ? el.oneOffer + '万' : '详见原文'}}
					</p>
				</div>
			</dd>
		</dl>
		<div class="no-toast" v-show="result">
			<img src="../../assets/img/bank_card @2x.png" alt="">
			<span>Sorry，暂未查询到该公司的中标信息</span>
		</div>
		<div class="page" v-show="!result">
			<nav-page :all='total' :currents='current' @skip='Goto'></nav-page>
		</div>
	</div>
</template>
<script>
	import {
		queryList
	} from '@/api/index';
	export default {
		data() {
			return {
				search: '',
				bidList: [],
				current: 1,
				total: 0,
				name: '',
				result: false,
				source: '',
				loading: true
			}
		},
		methods: {
			gainList() {
				let that = this;
				this.name = this.$route.query.name
				this.$http({
					method: 'post',
					data: {
						comName: this.name,
						pageNo: this.current,
						title: this.search,
						pageSize: 20,
					},
					url: '/newnocite/company/zhongbiao/list'
				}).then(res => {
					if (res.data.code == 1) {
						that.bidList = res.data.data
						that.current = res.data.pageNo
						that.total = res.data.total
						if (this.bidList.length == 0) {
							that.result = true
						} else {
							that.result = false
						}
						that.loading = false
					} else {
						that.$alert(res.data.msg);
					}
				})
				// queryList({pageNo:this.current,pageSize:20,type:2,regions:'hunan',com_name:this.name,title:this.search,sumType:"zhongbiao"}).then(res => {
				//   if(res.code == 1) {
				//      this.bidList = res.data
				//      this.current = res.pageNo
				//      this.total = res.total
				//      if(this.bidList.length ==0 ) {
				//        this.result = true
				//      } else {
				//        this.result = false
				//      }
				//      this.loading = false
				//   }
				// })
			},
			Goto(val) {
				this.current = val.cur
				this.gainList()
				this.funcom.toList(200)
			},
			searchBid() {
				this.current = 1
				this.gainList()
			},
			jump(el) {
				const {
					href
				} = this.$router.resolve({
					path: '/notice',
					query: {
						id: el.id,
						source: el.source
					}
				})
				window.open(href, '_blank')
			}
		},
		created() {
			this.source = this.$route.query.source
			this.gainList()
		},
		components: {}
	}
</script>
<style lang="less">
	.achievement {
		.bid-content{
			width: 844px;
			border: 1px solid #DDDFE4;
		}
		.e-nav {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20px;
			align-items: center;
			.e-wei {
				font-size: 14px;
				font-weight: 550;
			}
			.el-input__inner {
				background-color: #F4F4F4;
				i {
					color: #B6B6B6;
				}
			}
		}
	}
</style>
