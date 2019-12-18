<template>
	<div class="personnel">
		<v-bread :breadList="[{ title: '人员'},{title:name},{title:names}]"></v-bread>
		<div class="people-msg">
			<h3 class="mb20">
				<i class="iconfont iconshenfen mr20"></i>
				{{name}}
			</h3>
			<div class="dfrcb borde">
				<p class="bg-color bor-r fw600">身份证号</p>
				<p class="bor-r">{{idCard}}</p>
				<p class="bg-color bor-r fw600">性别</p>
				<p>{{sex ? sex : '男'}}</p>
			</div>
		</div>
		<div class="personnel-text">
			<div class="user-tab bor-r">
				<div class="tab" v-for="(el,i) in tab" :key="i" :class="el.i ? 'current' : '' " @click='jumpto(el)'>
					{{el.name}}
				</div>
			</div>
			<div class="personnel-right">
				<router-view />
			</div>
		</div>
		<f-vip @toChildEvent='closeload' v-if='svip'></f-vip>
	</div>
</template>
<script>
// import publicBread from "@/components/customize/publicBread";
	export default {
		data() {
			return {
				name: '',
				sex: '',
				idCard: '',
				certNo: '',
				comId: '',
				comName: '',
				tabCode: '',
				tab: [{
						name: '证书信息',
						to: 'sign',
						i: false
					},
					{
						name: '个人业绩',
						to: 'private',
						i: false
					},
					{
						name: '不良记录',
						to: 'dys',
						i: false
					},
					{
						name: '变更记录',
						to: 'modify',
						i: false
					},
					{
						name: '押证详情',
						to: 'escort',
						i: false
					},
				],
				innerid: '',
				svip: false,
			}
			// this.tab[this.$route.mate.i]
		},
		methods: {
			closeload(val) {
				this.svip = val.cur
			},
			jumpto(el) {
				if (el.name == '押证详情') {
					if (localStorage.getItem('0658544ac523fca9ec78a5f607fdd7ee')=='false') {
						this.svip = true
						this.modalHelper.afterOpen();
						return
					}
				}
				this.$router.push({
					path: el.to,
				})
				this.tab.forEach(el => {
					el.i = false
				});
				el.i = true
				this.names = el.name
			},
			search() {
				this.tab.forEach(el => {
					el.i = false
				});
				this.tab[this.$route.meta.i].i = true
				this.names = this.tab[this.$route.meta.i].name
			}
		},
		watch: {
			$route(to, form) {
				this.tab.forEach(el => {
					el.i = false
				});
				this.tab[this.$route.meta.i].i = true
				this.names = this.tab[this.$route.meta.i].name
			}
		},
		created() {
			let data=JSON.parse(sessionStorage.getItem('peopleData'));
			this.name = data.name
			this.idCard = data.idCard
			this.sex = data.sex
			this.search()
		},
		// components: {
		// 	"v-bread": publicBread,
		// }
	}
</script>
<style lang="less" scoped>
	.personnel {
		// min-height: calc(~"100vh - 395px");
		overflow: hidden;
		width: 1020px;
		box-sizing: border-box;
		margin: 0 auto 20px;
		/*人员信息*/
		.people-msg{
			h3{
				font-size: 34px;
				.iconfont{
					font-size: 34px;
				}
			}
			div{
				p{
					width: 25%;
					line-height: 48px;
					text-align: center;
					font-size: 18px;
				}
			}
		}
		/*左侧tab*/
		.personnel-text {
			width: 1020px;
			margin: 40px auto 0;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			.user-tab {
				font-size: 18px;
				.tab {
					width: 140px;
					line-height: 20px;
					border-left: 4px solid transparent;
					cursor: pointer;
					padding-left: 10px;
					margin-bottom: 30px;
					box-sizing: border-box;
				}
				.current {
					border-color: #EB651B;
					color: #EB651B;
					font-weight: 600;
				}
			}
			.personnel-right {
				width: 100%;
				margin-left: 30px;
				padding-bottom: 266px;
			}
		}
	}
</style>
