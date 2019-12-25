<template>
	<div class="perfor">
		<en-search @vague='entitle' :title="title" @company="companyFn"></en-search>
		<div class="per-nav">
			<span @click="jumpper" :class="i == 0 ? 'current' : ''">住建部</span>
			<span @click="jumpwa" :class="i == 1 ? 'current' : ''">水利部</span>
			<span @click="jumptra" :class="i == 2 ? 'current' : ''">交通部</span>
		</div>
		<div class="per-list">
			<router-view :state='state' :title='title' />
			<!-- <per-list :state='state' ></per-list> -->
			<!-- <per-water  :state='state' ></per-water> -->
			<!-- <road :state='state' ></road> -->

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: '',
				i: 0,
				searchType: 0,
			}
		},
		props: {
			state: ''
		},

		methods: {
			entitle(val) {
				this.title = val.cur
				this.searchType = 0;
			},
			jumpper() {
				this.$router.push('perlist')
				this.i = 0
			},
			jumpwa() {
				this.$router.push('water')
				this.i = 1
			},
			jumptra() {
				this.$router.push('road')
				this.i = 2
			},
			//企业搜索
			companyFn(val) {
				this.searchType = 1;
				this.title = val.cur;
			}
		},
		watch: {
			$route(to, form) {
				this.title = ''
			},
			title(newVal, old) {
				this.title = newVal;
			}
		},
		created() {
			this.i = this.$route.meta.i
			this.title = localStorage.getItem('title') ? localStorage.getItem('title') : ''
		},
		components: {}
	}
</script>
<style lang="less" scoped>
	.perfor {
		width: 100%;
		display: flex;
		flex-direction: column;
		.per-nav {
			width: 1020px;
			margin: 0 auto 20px;
			box-sizing: border-box;
			font-size: 18px;
			cursor: pointer;
			span{
				position: relative;
				padding: 0 20px;
			}
			span:first-child{
				padding-left: 0
			}
			span:last-child:after{
				width: 0;
			}
			span::after{
				content: '';
				position: absolute;
				width: 1px;
				height: 12px;
				background: #DDDFE4;
				transform: translateY(-50%);
				top: 50%;
				right: 0;
			}
			.current{
				color: #EB651B;
				font-weight: 600;
			}
		}
		
		.per-list {
			width: 1020px;
			margin: 0 auto;
		}
	}
</style>
